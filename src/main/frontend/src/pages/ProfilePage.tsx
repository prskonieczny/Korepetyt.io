import React, {FormEvent} from "react";
import AuthService from "../services/authService";
import {IAccountData, IChangeEmailData, IEditAccountPropertiesData} from "../util/data";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import AccountService from "../services/accountService";
import ProfileCard from "../components/ProfileCard";

const ProfilePage = () => {
    const loggedUser = AuthService.getCurrentUser();
    const roles = AuthService.getUserRoles();
    const [account, setAccount] = useState<IAccountData>();
    const navigate = useNavigate();

    const [refreshAfterEmailChange, setRefreshAfterEmailChange] = useState('');
    const [refreshAfterAccountEdit, setRefreshAfterAccountEdit] = useState<string | undefined>('');
    const [refreshAfterPropertiesEdit, setRefreshAfterPropertiesEdit] = useState<Record<string, any>>({});

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
        refreshAfterAccountEdit,
        refreshAfterPropertiesEdit
    ]);

    const handleEmailChange = (newEmail: string) => {
        setRefreshAfterEmailChange(newEmail);
    }
    const handleAccountEdit = (newUsername: string | undefined) => {
        setRefreshAfterAccountEdit(newUsername);
    }
    const handleAccountPropertiesEdit = () => {
        setRefreshAfterPropertiesEdit({});
    }

    return (
        <>
            <ProfileCard
                account={account}
                onEmailChange={handleEmailChange}
                onAccountEdit={handleAccountEdit}
                onPropertiesEdit={handleAccountPropertiesEdit}
            />
        </>
    )
}

export default ProfilePage;