import axios from "axios";
import {IChangePasswordData} from "../util/data";
const API_URL = "http://localhost:8082/api/accounts/";
const token = localStorage.getItem("token");

const getAllUsers = () => {
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

const deleteAccount = (id: number) => {
    return axios.delete(API_URL + "delete/" + id, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    });
}

const getCurrentUser = () => {
    return axios.get(API_URL + 'self', {
        headers: {
            Authorization: 'Bearer ' + token
        }
    });
}

const changeOwnPassword = (data: IChangePasswordData) => {
    return axios.post(API_URL + 'self/password', data, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    });
}

const AccountService = {
    getAllUsers,
    addAdminRole,
    removeAdminRole,
    deleteAccount,
    getCurrentUser,
    changeOwnPassword
}
export default AccountService;