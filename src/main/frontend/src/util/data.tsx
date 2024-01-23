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

export interface IChangePasswordData {
    newPassword: string,
    oldPassword: string
}

export interface IChangeEmailData {
    email: string
}

export interface IChangeAccountDetailsData {
    username: string | undefined,
    phone: string | undefined,
    city: string | undefined,
    street: string | undefined
}

export interface IEditAccountPropertiesData {
    newLevels: string[],
    newSubjects: string[]
}