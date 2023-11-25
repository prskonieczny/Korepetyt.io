import axios from "axios";
const API_URL = "http://localhost:8082/api/auth/";

const registerTeacher = (
    username: string,
    password: string,
    email: string,
    phone: string,
    city: string,
    street: string,
) => {
    return axios.post(API_URL + "register/teacher", {
        username, password, email, phone, city, street,
    })
};

const registerStudent = (
    username: string,
    password: string,
    email: string,
    phone: string,
    city: string,
    street: string,
) => {
    return axios.post(API_URL + "register/student", {
        username, password, email, phone, city, street,
    });
};

const login = (
    username: string,
    password: string,
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>,
) => {
    return axios.post(API_URL + "login", {
        username, password,
    }).then((response) => {
        if (response.data.token && response.status === 200) {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("username", JSON.stringify(response.data.username));
            localStorage.setItem("roles", JSON.stringify(response.data.roles));
        } else {
            setErrorMessage("Error");
        }
        return response.data;
    });
};

const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("roles");
}

const AuthService = {
    registerTeacher,
    registerStudent,
    login,
    logout,
}
export default AuthService;