import { NextFunction, Request, Response } from "express";
import roleService from "./role.service";
import { sendSuccessResponse, sendErrorResponse } from '../../common/utils/response.util';

const roleController = {
    getAll: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try 
        {
            const roles = await roleService.getAllRoles();
            if (roles.length === 0) 
            {
                sendErrorResponse(res, 404, "Roles no encontrados");
                return;
            }
            sendSuccessResponse(res, 200, "Se obtuvo todos los roles", roles);
        } 
        catch (error) 
        {
            next(error);    
        }
    },

    getOne: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try 
        {
            const id = parseInt(req.params.id);
            const role = await roleService.getRoleById(id);
            if (!role) 
            {
                sendErrorResponse(res, 404, "Rol no encontrado");
                return;
            }
            sendSuccessResponse(res, 200, `Rol con ID: ${id}`, role);            
        } 
        catch (error) 
        {
            next(error);    
        }
    },

    create: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try 
        {
            const { name } = req.body;
            if (!name) 
            {
                sendErrorResponse(res, 400, "Falta un campo requerido");
                return;
            }
            const newRole = await roleService.createRole(name);
            sendSuccessResponse(res, 201, `Rol ${name} creado`, newRole);    
        } 
        catch (error) 
        {
            next(error);    
        }
    },

    update: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try 
        {
            const id = parseInt(req.params.id);
            const { scopes } = req.body;
            if(id === 1)
            {
                sendErrorResponse(res, 403, "El rol de admin no puede ser modificado");
                return; 
            }
            if (!scopes) 
            {
                sendErrorResponse(res, 400, "Falta un campo requerido");
                return;
            }
            const role = await roleService.updateRole(id, scopes);
            if (!role) 
            {
                sendErrorResponse(res, 404, "Rol no encontrado");
                return;
            }
            sendSuccessResponse(res, 200, "Rol actualizado", role);    
        } 
        catch (error) 
        {
            next(error);    
        }
    },

    delete: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try 
        {
            const id = parseInt(req.params.id);
            const deletedRole = await roleService.deleteRole(id);
            if (!deletedRole) 
            {
                sendErrorResponse(res, 404, "Rol no encontrado");
                return;
            }
            sendSuccessResponse(res, 200, `Rol con ID: ${id} eliminado`, deletedRole);    
        } 
        catch (error) 
        {
            next(error);    
        }
    }
};

export default roleController;