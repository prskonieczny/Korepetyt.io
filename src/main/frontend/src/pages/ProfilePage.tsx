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

    const [refreshAfterEmailChange, setRefreshAfterEmailChange] = useState('');
    const [refreshAfterAccountEdit, setRefreshAfterAccountEdit] = useState<string | undefined>('');

    useEffect(() => {
        AccountService.getCurrentUser().then(response => {
            setAccount(response.data);
        }).catch(error => {
            if (error.response.status === 404) {
                navigate("/login");
            }
        })
    }, [
        refreshAfterEmailChange,
        refreshAfterAccountEdit
    ]);

    const handleEmailChange = (newEmail: string) => {
        setRefreshAfterEmailChange(newEmail);
    }
    const handleAccountEdit = (newUsername: string | undefined) => {
        setRefreshAfterAccountEdit(newUsername);
    }

    return (
        <>
            <ProfileCard
                account={account}
                onEmailChange={handleEmailChange}
                onAccountEdit={handleAccountEdit}
            />
        </>
    )
}

export default ProfilePage;