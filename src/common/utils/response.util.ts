import { Response } from 'express';
import { IOkResponse, IErrorResponse } from '../interfaces/response.interface';

export const sendSuccessResponse = <T>(res: Response, status: number, message: string, data: T) => {
    const response: IOkResponse<T> = {
        status,
        message,
        timestamp: new Date().toISOString(),
        data
    };
    res.status(status).json(response);
};

export const sendErrorResponse = (res: Response, status: number, message: string, errorDetails?: any) => {
    const errorResponse: IErrorResponse = {
        status,
        message,
        timestamp: new Date().toISOString(),
        errorDetails: errorDetails || {}
    };
    res.status(status).json(errorResponse);
};