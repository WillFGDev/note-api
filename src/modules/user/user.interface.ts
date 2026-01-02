export interface IUser {
    id: number;          
    role: number;
    name: string;        
    email: string;       
    password: string;
    createdAt?: Date;    
    updatedAt?: Date;    
}

export interface ICreateUser extends Omit<IUser, "id" | "createdAt" | "updatedAt"> {}

export interface IUpdateUser extends Partial<Omit<IUser, "id" | "createdAt" | "updatedAt">> { }

export interface IGetUser extends Omit<IUser, "password"> {}
