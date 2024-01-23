import {useEffect, useState} from "react";
import {IAccountData} from "../util/data";
import AccountService from "../services/accountService";
import {useNavigate, useParams} from "react-router-dom";
import OtherUserProfileCard from "../components/OtherUserProfileCard";
import AuthService from "../services/authService";

const OtherUserProfilePage = () => {
    const navigate = useNavigate();
    const loggedUser = AuthService.getCurrentUser();
    const roles = AuthService.getUserRoles();
    const [account, setAccount] = useState<IAccountData>();
    const accountId = useParams().id as unknown as number;

    useEffect(() => {
        AccountService.getOtherUserAccount(accountId).then(response => {
            setAccount(response.data);
        }).catch(error => {
            if (error.response.status === 404) {
                console.log(error);
            }
        })
    }, []);

    return (
        <>
            <OtherUserProfileCard
                account={account}
            />
        </>
    )
}

export default OtherUserProfilePage;