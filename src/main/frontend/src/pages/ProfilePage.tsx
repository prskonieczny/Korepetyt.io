import React, {FormEvent} from "react";
import AuthService from "../services/authService";
import {IAccountData, IChangeEmailData} from "../util/data";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import AccountService from "../services/accountService";
import ProfileCard from "../components/ProfileCard";
import {Alert, Snackbar} from "@mui/material";

const ProfilePage = () => {
    const loggedUser = AuthService.getCurrentUser();
    const roles = AuthService.getUserRoles();
    const [account, setAccount] = useState<IAccountData>();
    const navigate = useNavigate();

    const [refresAfterEmailChange, setRefresAfterEmailChange] = useState('');

    useEffect(() => {
        AccountService.getCurrentUser().then(response => {
            setAccount(response.data);
        }).catch(error => {
            if (error.response.status === 404) {
                navigate("/login");
            }
        })
    }, [refresAfterEmailChange]);

    const handleEmailChange = (newEmail: string) => {
        setRefresAfterEmailChange(newEmail);
    }

    return (
        <>
            <ProfileCard
                account={account}
                onEmailChange={handleEmailChange}
            />
        </>
    )
}

export default ProfilePage;