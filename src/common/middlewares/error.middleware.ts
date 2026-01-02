import { Request, Response, NextFunction } from 'express';
import { sendErrorResponse } from '../utils/response.util';

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    sendErrorResponse(
        res, 
        err.status || 500,
        err.message || "Internal Server Error",
        err.details || {}
    );
};

export default errorHandler;