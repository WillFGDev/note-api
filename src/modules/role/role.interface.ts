export interface IRole {
    id: number;          
    name: string;
    createdAt?: Date;    
    updatedAt?: Date;    
}

export interface IRoleScopes extends IRole {
    Scopes: number[];
}