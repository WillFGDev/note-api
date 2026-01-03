import { NextFunction, Request, Response } from "express";
import noteService from "./note.service";
import { sendSuccessResponse, sendErrorResponse } from '../../common/utils/response.util';
import { AuthRequest } from "../../common/interfaces/token.interface";
import logService from "../log/log.service";

const noteController = {
    getAll: async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
        try 
        {
            const userId = parseInt(req.user?.id);
            const notes = await noteService.getAllNotes(userId);
            const sharedNotes = await noteService.getAllShareNotes(userId);
            if (notes.length === 0 && sharedNotes.length === 0) 
            {
                sendErrorResponse(res, 404, "No hay notas registradas o compartidas");
                return;
            }

            const allNotes = [
                ...notes,
                ...sharedNotes
            ];
            
            sendSuccessResponse(res, 200, "Se obtuvo todas las notas registradas y compartidas", allNotes);
        } 
        catch (error) 
        {
            next(error);
        }
    },

    getOne: async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
        try 
        {
            const id = parseInt(req.params.id);
            const userId = parseInt(req.user?.id);
            const note = await noteService.getNoteById(id);
            if (!note) 
            {
                sendErrorResponse(res, 404, "Nota no encontrada");
                return;
            }
            
            if(note.ownerId !== userId){
                const isShared = await noteService.isShared(userId, note.id);
                if(!isShared)
                {
                    sendErrorResponse(res, 403, "No tienes permiso para leer esta nota");
                    return;
                }
            }

            sendSuccessResponse(res, 200, `Nota con ID: ${id}`, note); 
        } 
        catch (error) 
        {
            next(error);    
        }  
    },

    create: async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
        try 
        {
            const userId = Number(req.user?.id);
            const { title, content } = req.body;
            if (!title || !content) 
            {
                sendErrorResponse(res, 400, "Faltan campos requeridos");
                return;
            }
            const newNote = await noteService.createNote({
                ...req.body,
                ownerId: userId || 0
            });
            sendSuccessResponse(res, 201, "Nota añadida", newNote);
            
            await logService.log({
                userId,
                action: "CREATE",
                description: `Añadio una nota con el siguiente ID: ${newNote.id}`,
                entity: "Note",
                entityId: newNote.id,
            });
        } 
        catch (error) 
        {
            next(error);    
        }
    },

    update: async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
        try 
        {
            const id = parseInt(req.params.id);
            const userId = parseInt(req.user?.id);
            
            const note = await noteService.getNoteById(id);
            if (!note) 
            {
                sendErrorResponse(res, 404, "Nota no encontrada");
                return;
            }

            if(note.ownerId !== userId){
                const isShared = await noteService.isShared(userId, note.id);
                if(!isShared)
                {
                    sendErrorResponse(res, 403, "No tienes permiso para editar esta nota");
                    return;
                }
            }

            const updatedNote = await noteService.updateNote(note.id, req.body)
            
            sendSuccessResponse(res, 200, `Nota con ID: ${id} actualizada`, updatedNote);

            await logService.log({
                userId,
                action: "UPDATE",
                description: `Actualizó la nota con ID: ${id}`,
                entity: "Note",
                entityId: id,
                before: updatedNote?.before,
                after: updatedNote?.after,
            });
        } 
        catch (error) 
        {
            next(error);    
        }
    },

    delete: async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
        try 
        {
            const id = parseInt(req.params.id);
            const userId = parseInt(req.user?.id);
            
            const note = await noteService.getNoteById(id);
            if (!note) 
            {
                sendErrorResponse(res, 404, "Nota no encontrada");
                return;
            }

            if(note.ownerId !== userId){
                sendErrorResponse(res, 403, "No tienes permiso para eliminar esta nota");
                return;
            }

            const deletedNote = await noteService.deleteNote(note.id);
            sendSuccessResponse(res, 200, `Nota con ID: ${id} eliminada`, deletedNote);

            await logService.log({
                userId,
                action: "DELETE",
                description: `Eliminó la nota con ID: ${id}`,
                entity: "Note",
                entityId: id,
            });
        } 
        catch (error) 
        {
            next(error);    
        }
    },

    share: async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
        try 
        {
            const id = parseInt(req.params.id);
            const userId = parseInt(req.user?.id);
            const { usersId } = req.body
            const note = await noteService.getNoteById(id);
            if(!note)
            {
                sendErrorResponse(res, 404, "Nota no encontrada");
                return;
            }

            if(userId !== note.ownerId)
            {
                sendErrorResponse(res, 403, "No puedes compartir una nota que no te pertenece");
                return;
            }

            const sharedNote = await noteService.shareNote(id, usersId);
            if (!sharedNote)
            {
                sendErrorResponse(res, 400, "Se requiere al menos un usuario para poder compartir la nota");
                return;
            }
            sendSuccessResponse(res, 200, `Nota con ID: ${id} compartida`, note);

            await logService.log({
                userId,
                action: "SHARE",
                description: `Compartio la nota con ID: ${id}`,
                entity: "Note",
                entityId: id,
                after: { sharedWith: usersId },
            });
        } 
        catch (error) 
        {
            next(error);    
        }
    },
};

export default noteController;