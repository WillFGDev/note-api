import { Response, NextFunction } from "express";
import { verifyToken } from "../utils/token.util";
import { sendErrorResponse } from "../utils/response.util";
import userService from "../../modules/user/user.service";
import roleService from "../../modules/role/role.service";
import { AuthRequest } from "../interfaces/token.interface";

export const authSession = (req: AuthRequest, res: Response, next: NextFunction) => {
    try 
    {
        const token = req.cookies["authToken"];
      
        if (!token) {
            sendErrorResponse(res, 401, "Acceso denegado. Token no proporcionado.");
            return
        }
            
        const decoded = verifyToken(token);
        if (!decoded?.id) {
            sendErrorResponse(res, 401, "Token inválido.");
            return;
        }

        req.user = decoded;
        
        next();
    } 
    catch (error) 
    {
        next(error);
    }
};

export const authScopes = (scopes: number[]) => async (req: AuthRequest, res: Response, next: NextFunction) => {
    try 
    {
        const user = await userService.getUserById(req.user!.id);
    
        if (!user) {
            sendErrorResponse(res, 401, "Acceso denegado. El usuario no tiene permiso de acceder al sistema.");
            return
        }

        const roleScopes = await roleService.getAllRoleScopes(user.role);
        const isPermit = scopes.some(scope => roleScopes.includes(scope));

        if (!isPermit) 
        {
            sendErrorResponse(res, 403, "El usuario no tiene permiso para realizar esta acción.");
            return
        }

        next();
    } 
    catch (error) 
    {
        next(error);
    }
};