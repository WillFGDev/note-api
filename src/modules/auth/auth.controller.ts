import { NextFunction, Request, Response } from "express";
import { compare } from "bcrypt";
import { tokenSign } from "../../common/utils/token.util";
import { sendSuccessResponse, sendErrorResponse } from "../../common/utils/response.util";
import userService from "../user/user.service";
import roleService from "../role/role.service";
import logService from "../log/log.service";

const authController = {
    
    login: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try 
        {
            const { email, password } = req.body;
            if (!email || !password)
            {
                sendErrorResponse(res, 400, "Faltan campos requeridos");
                return;
            }

            const user = await userService.getUserByEmail(email);
            if (!user)
            {
                sendErrorResponse(res, 401, "Correo incorrecto");
                return;
            }

            const isMatch = await compare(password, user.password);
            if (!isMatch) 
            {
                sendErrorResponse(res, 401, "Contraseña incorrecta");
                return;
            }

            const scopes = await roleService.getAllRoleScopes(user.role);

            const token = tokenSign(user);
            res.cookie('authToken', token, {
                httpOnly: true,
                secure: false,
                sameSite: 'lax',
                maxAge: 8 * 60 * 60 * 1000, // 8 horas
                path: '/'
            });

            sendSuccessResponse(res, 200, "Inicio sesion correctamente", { id: user.id, role: user.role, scopes: scopes });

            await logService.log({
                userId: user.id,
                action: "LOGIN",
                description: `Inicio sesion`,
                entity: "auth",
                entityId: user.id,
                after: {
                    ip: req.ip,
                    userAgent: req.headers["user-agent"],
                }
            });
        } 
        catch (error) 
        {
            next(error);
        }
    },
    
    logout: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try 
        {
            res.clearCookie('authToken', { httpOnly: true, secure: true, sameSite: 'lax', path: '/' });
            sendSuccessResponse(res, 200, "Sesion cerrada correctamente", {});
        } 
        catch (error) 
        {
            next(error);
        }    
    },
    
    register: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try 
        {
            const { name, email, password, confirmPassword } = req.body;
            if (!name || !email || !password || !confirmPassword) 
            {
                sendErrorResponse(res, 400, "Faltan campos requeridos");
                return;
            }
            if(password !== confirmPassword)
            {
                sendErrorResponse(res, 400, "Ambas contraseñas son diferentes");
                return;
            }
            const user = await userService.getUserByEmail(email);
            if(user)
            {
                sendErrorResponse(res, 409, "Correo ya registrado, intente registrarse con otro correo");
                return;
            }
            const newUser = await userService.createUser({ name, email, password, role: 2 });
            sendSuccessResponse(res, 201, "Usuario registrado", newUser);  
        } 
        catch (error) 
        {
            next(error);
        }
        
    },
};

export default authController;