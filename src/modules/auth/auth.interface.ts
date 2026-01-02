export interface ILogin {
    email: string;
    password: string;
}

export interface ILoginInfo {
    id: number;
    role: number;
    scopes: number[];
}

export interface IRegister {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}