import axios from "axios";
const API_URL = "http://localhost:8082/api/lessons/";
const token = localStorage.getItem("token");

const getStudentLessons = () => {
    return axios.get(API_URL + "reservations/self" , {
        headers: {
            Authorization: 'Bearer ' + token
        }
    });
}
const cancelLesson = (id: number) => {
    return axios.delete(API_URL + "cancel/" + id, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    });
}
const LessonService = {
    getStudentLessons,
    cancelLesson,
}
export default LessonService;
