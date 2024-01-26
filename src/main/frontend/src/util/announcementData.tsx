import {IRoleData} from "./data";

export interface IAnnouncementData {
    id: number;
    studentName: string,
    levels: string,
    subjects: string,
    description: string
}

export interface IAddAnnouncementData {
    levels: string,
    subjects: string,
    description: string,
}

export interface IShowAnnouncementAccountResponse {
    id: number;
    username: string;
    email: string;
    phone: string;
    city: string;
    street: string;
    levels: string[];
    subjects: string[];
}