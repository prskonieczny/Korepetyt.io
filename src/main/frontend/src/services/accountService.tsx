import axios from "axios";
import {
    IChangeAccountDetailsData,
    IChangeEmailData,
    IChangePasswordData,
    IEditAccountPropertiesData
} from "../util/data";
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

const changeOwnEmail = (data: IChangeEmailData) => {
    return axios.put(API_URL + 'self/email', data, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    });
}

const changeOwnAccountDetails = (data: IChangeAccountDetailsData) => {
    return axios.put(API_URL + 'self/details', data, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
}

const editAccountProperties = (id: number | undefined, data: IEditAccountPropertiesData) => {
    return axios.put(API_URL + id + '/editAccountProperties', data, {
            headers: {
                Authorization: 'Bearer ' + token
            }
    });
}

const getOtherUserAccount = (id: number) => {
    return axios.get(API_URL + "otherUser/" + id, {
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
    changeOwnPassword,
    changeOwnEmail,
    changeOwnAccountDetails,
    editAccountProperties,
    getOtherUserAccount
}
export default AccountService;