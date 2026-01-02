import jwt from "jsonwebtoken";
import { IUser } from '../../modules/user/user.interface';
import { DecodedUser } from '../interfaces/token.interface';

export const tokenSign = (user: IUser): string => {
  return jwt.sign(
    {
      id: user.id,
      role: user.role
    }, 
    process.env.JWT_SECRET_KEY as string,
    {
      expiresIn: process.env.JWT_TOKEN_TIME as jwt.SignOptions["expiresIn"],
    }
  );
}

export const verifyToken = (token: string): DecodedUser => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);

  if (typeof decoded === "string") {
    throw new Error("Token inválido. No se puede decodificar.");
  }

  return decoded as DecodedUser;
};