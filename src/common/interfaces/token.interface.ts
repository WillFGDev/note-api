import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface DecodedUser {
  id: number;
  email: string;
}

export interface AuthRequest extends Request {
    user?: JwtPayload;
    cookies: { [key: string]: string };
}