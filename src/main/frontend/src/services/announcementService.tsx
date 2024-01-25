import axios from "axios";
import {IChangePasswordData} from "../util/data";
import {IAddAnnouncementData, IAnnouncementData} from "../util/announcementData";
const API_URL = "http://localhost:8082/api/announcements/";
const token = localStorage.getItem("token");

const getAllAnnouncements = () => {
    return axios.get(API_URL + "all", {
        headers: {
            Authorization: 'Bearer ' + token
        }
    });
};
const getOwnAnnouncements = () => {
    return axios.get(API_URL + "own", {
        headers: {
            Authorization: 'Bearer ' + token
        }
    });
};
const deleteAnnouncement = (id: number) => {
    return axios.delete(API_URL + id, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    });
};
const addTeacherToAnnouncement = (id: number) => {
    return axios.post(API_URL + id + "/assign", {}, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    });
};
const addAnnouncement = (data: IAddAnnouncementData) => {
    return axios.post(API_URL + 'add', data, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    });
}
const AnnouncementService = {
    getAllAnnouncements,
    deleteAnnouncement,
    addTeacherToAnnouncement,
    getOwnAnnouncements,
    addAnnouncement
}
export default AnnouncementService;