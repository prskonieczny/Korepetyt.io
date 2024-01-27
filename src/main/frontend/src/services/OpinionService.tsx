import axios from "axios";
import {IAddOpinionData} from "../util/opinionData";
const API_URL = "http://localhost:8082/api/opinion/";
const token = localStorage.getItem("token");

const getOpinionsForTeacher = (username: string | undefined) => {
    return axios.get(API_URL + "teacher/" + username , {
        headers: {
            Authorization: 'Bearer ' + token
        }
    });
}
const getOpinionsByStudent = () => {
    return axios.get(API_URL + "self", {
        headers: {
            Authorization: 'Bearer ' + token
        }
    });
}
const addOpinion = (data: IAddOpinionData) => {
    return axios.post(API_URL + "add", data, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
}
const deleteOpinion = (id: number) => {
    return axios.delete(API_URL + id, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    });
};

const AnnouncementService = {
    getOpinionsForTeacher,
    getOpinionsByStudent,
    deleteOpinion,
    addOpinion
}
export default AnnouncementService;