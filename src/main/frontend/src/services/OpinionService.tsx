import axios from "axios";
const API_URL = "http://localhost:8082/api/opinion/";
const token = localStorage.getItem("token");

const getOpinionsForTeacher = (username: string | undefined) => {
    return axios.get(API_URL + "teacher/" + username , {
        headers: {
            Authorization: 'Bearer ' + token
        }
    });
}

const AnnouncementService = {
    getOpinionsForTeacher,
}
export default AnnouncementService;