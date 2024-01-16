import axios from "axios";
const API_URL = "http://localhost:8082/api/accounts/";
const token = localStorage.getItem("token");

const getAllUsers = () => {
    console.log(token);
    return axios.get(API_URL + "all", {
        headers: {
            Authorization: 'Bearer ' + token
        }
    });
};

const addAdminRole = (id: number) => {
    return axios.post(API_URL + "addAdminRole/" + id, {}, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    });
};

const removeAdminRole = (id: number) => {
    return axios.post(API_URL + "removeAdminRole/" + id, {}, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    });
};


const AccountService = {
    getAllUsers,
    addAdminRole,
    removeAdminRole,
}
export default AccountService;