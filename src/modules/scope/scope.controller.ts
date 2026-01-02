import { NextFunction, Request, Response } from "express";
import scopeService from "./scope.service";
import { sendSuccessResponse, sendErrorResponse } from '../../common/utils/response.util';

const scopeController = {
    getAll: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try 
        {
            const scopes = await scopeService.getAllScopes();
            if (scopes.length === 0)
            {
                sendErrorResponse(res, 404, "Permisos no encontrados");
                return;
            }
            sendSuccessResponse(res, 200, "Se obtuvo todos los permisos del sistema", scopes);    
        } 
        catch (error) 
        {
            next(error);    
        }
    }
};

export default scopeController;