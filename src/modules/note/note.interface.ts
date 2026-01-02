export interface INote {
    id: number;          
    title: string;        
    content: string;
    ownerId: number;      
    createdAt?: Date;    
    updatedAt?: Date;    
}

export interface ICreateNote extends Omit<INote, "id" | "ownerId" | "createdAt" | "updatedAt"> {}
export interface IUpdateNote extends Partial<Omit<INote, "id" | "createdAt" | "updatedAt">> {}