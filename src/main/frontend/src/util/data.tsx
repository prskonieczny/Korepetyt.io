export interface IAccountData {
    id: number;
    username: string;
    email: string;
    phone: string;
    city: string;
    street: string;
    roles: IRoleData[];
    levels: string[];
    subjects: string[];
}

export interface IRoleData {
    id: number,
    permissionLevel: string
}