import React, {FormEvent} from "react";
import AuthService from "../services/authService";
import {IAccountData, IChangeEmailData, IEditAccountPropertiesData} from "../util/data";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import AccountService from "../services/accountService";
import ProfileCard from "../components/ProfileCard";
import OpinionCard from "../components/OpinionCard";
import OpinionService from "../services/OpinionService";
import {IOpinionData} from "../util/opinionData";

const ProfilePage = () => {
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

    const [opinions, setOpinions] = useState<IOpinionData[]>([]);
    const [ownOpinions, setOwnOpinions] = useState<IOpinionData[]>([]);

    const getOpinionsForTeacher = (username: string | undefined) => {
        OpinionService.getOpinionsForTeacher(username).then(response => {
            setOpinions(response.data);
        }).catch(error => {
            console.log(error);
        })
    }

    const [refreshOpinions, setRefreshOpinions] = useState<boolean>(false);
    const handleRefreshOpinions = () => {
        setRefreshOpinions(prevState => !prevState);
    }
    const getOwnOpinions = () => {
        OpinionService.getOpinionsByStudent().then(response => {
            setOwnOpinions(response.data);
        }).catch(error => {
            console.log(error);
        })
    }


    useEffect(() => {
        getOpinionsForTeacher(account?.username);
        getOwnOpinions();
    }, [account, refreshOpinions])

    return (
        <>
            <ProfileCard
                account={account}
                onEmailChange={handleEmailChange}
                onAccountEdit={handleAccountEdit}
                onPropertiesEdit={handleAccountPropertiesEdit}
            />
            {/*Wyświetlanie opinii o nauczycielu*/}
            {account?.roles.some(role => role.permissionLevel === 'TEACHER') && (
                <OpinionCard
                    account={account}
                    opinions={opinions}
                    setOwnOpinions={setOpinions}
                />
            )}
            {/*Wyświetlanie własnych opinii gdy uczeń wchodzi na swój profil*/}
            {account?.roles.some(role => role.permissionLevel === 'STUDENT') && (
                <OpinionCard
                    account={account}
                    opinions={ownOpinions}
                    setOwnOpinions={setOwnOpinions}
                    refreshOpinions={handleRefreshOpinions}
                />
            )}
        </>
    )
}

export default ProfilePage;