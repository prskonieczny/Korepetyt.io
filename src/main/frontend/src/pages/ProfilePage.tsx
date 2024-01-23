import React from "react";
import AuthService from "../services/authService";
import {IAccountData} from "../util/data";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import AccountService from "../services/accountService";
import ProfileCard from "../components/ProfileCard";

const ProfilePage = () => {
    const loggedUser = AuthService.getCurrentUser();
    const roles = AuthService.getUserRoles();
    const [account, setAccount] = useState<IAccountData>();
    const navigate = useNavigate();

    useEffect(() => {
        AccountService.getCurrentUser().then(response => {
            setAccount(response.data);
        }).catch(error => {
            if (error.response.status === 404) {
                navigate("/login");
            }
        })
    });

    return (
        <>
            <ProfileCard
                account={account}
            />
        </>
    )
}

export default ProfilePage;