import axios from "axios";
import {ICreateLessonData} from "../util/lessonData";
const API_URL = "http://localhost:8082/api/lessons/";
const token = localStorage.getItem("token");

const getStudentLessons = () => {
    return axios.get(API_URL + "reservations/self" , {
        headers: {
            Authorization: 'Bearer ' + token
        }
    });
}
const cancelLesson = (id: number | undefined) => {
    return axios.delete(API_URL + "cancel/" + id, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    });
}
const getAllReservations = () => {
    return axios.post(API_URL + "reservations");
}
const getTeacherLessons = (username: string | undefined) => {
    return axios.get(API_URL + "teacher/" + username, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
}
const reserveLesson = (id: number | undefined, data: ICreateLessonData) => {
    return axios.post(API_URL + "reserve/" + id, data, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
}
const LessonService = {
    getStudentLessons,
    cancelLesson,
    getAllReservations,
    getTeacherLessons,
    reserveLesson
}
export default LessonService;
