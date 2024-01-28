import axios from "axios";
const API_URL = "http://localhost:8082/api/statistics/";
const token = localStorage.getItem("token");

const getStatisticsForTeacher = (id: number | undefined) => {
    return axios.get(API_URL + "lessons/" + id , {
        headers: {
            Authorization: 'Bearer ' + token
        }
    });
}
const StatisticsService = {
    getStatisticsForTeacher,
}
export default StatisticsService;