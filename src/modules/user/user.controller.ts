import { NextFunction, Request, Response } from "express";
import userService from "./user.service";
import { sendSuccessResponse, sendErrorResponse } from '../../common/utils/response.util';

const userController = {
    getAll: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try 
        {
            const users = await userService.getAllUsers();
            if (users.length === 0)
            {
                sendErrorResponse(res, 404, "Usuarios no encontrados");
                return;
            }
            sendSuccessResponse(res, 200, "Se obtuvo todos los usuarios", users);
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
            const user = await userService.getUserById(id);
            if (!user)
            {
                sendErrorResponse(res, 404, "Usuario no encontrado");
                return;
            }
            sendSuccessResponse(res, 200, `Usuario con ID: ${id}`, user);            
        } 
        catch (error) 
        {
            next(error);    
        }
    },

    create: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try 
        {
            const { name, email, password, role } = req.body;
            if (!name || !email || !password || !role)
            {
                sendErrorResponse(res, 400, "Faltan campos requeridos");
                return;
            }
            if(role === 1)
            {
                sendErrorResponse(res, 401, "No se puede crear un usuario con rol de admin");
                return;
            }
            const newUser = await userService.createUser(req.body);
            sendSuccessResponse(res, 201, "Usuario creado", newUser);           
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
            const updatedUser = await userService.updateUser(id, req.body);
            if (!updatedUser)
            {
                sendErrorResponse(res, 404, "Usuario no encontrado");
                return;
            }
            sendSuccessResponse(res, 200, `Usuario con ID: ${id} actualizado`, updatedUser);            
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
            const deletedUser = await userService.deleteUser(id);
            if (!deletedUser)
            {
                sendErrorResponse(res, 404, "Usuario no encontrado");
                return;
            }
            sendSuccessResponse(res, 200, `Usuario con ID: ${id} eliminado`, deletedUser);
        } 
        catch (error) 
        {
            next(error);    
        }
    }
};

export default userController;