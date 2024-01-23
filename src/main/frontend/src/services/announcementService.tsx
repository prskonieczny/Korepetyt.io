import axios from "axios";
const API_URL = "http://localhost:8082/api/announcements/";
const token = localStorage.getItem("token");

const getAllAnnouncements = () => {
    return axios.get(API_URL + "all", {
        headers: {
            Authorization: 'Bearer ' + token
        }
    });
};
const AnnouncementService = {
    getAllAnnouncements,
}
export default AnnouncementService;