export interface IOkResponse<T = any> {
    status: number;
    message: string;
    timestamp: string;
    data: T;
}

export interface IErrorResponse {
    status: number;
    message: string;
    timestamp: string;
    errorDetails?: any;
}