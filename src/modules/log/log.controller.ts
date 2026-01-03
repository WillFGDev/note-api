import { NextFunction, Request, Response } from "express";
import logService from "./log.service";
import { sendSuccessResponse, sendErrorResponse } from '../../common/utils/response.util';

const scopeController = {
    getAll: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try 
        {
            const logs = await logService.getAllLogs();
            if (logs.length === 0)
            {
                sendErrorResponse(res, 404, "Logs no encontrados");
                return;
            }
            sendSuccessResponse(res, 200, "Se obtuvo todos los logs del sistema", logs);    
        } 
        catch (error) 
        {
            next(error);    
        }
    }
};

export default scopeController;