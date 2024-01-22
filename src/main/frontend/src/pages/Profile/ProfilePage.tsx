import AuthService from "../../services/authService";
import {IAccountData} from "../../util/data";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import AccountService from "../../services/accountService";
import ProfileCard from "../../components/ProfileCard/ProfileCard";

const ProfilePage = () => {
    const loggedUser = AuthService.getCurrentUser();
    const roles = AuthService.getUserRoles();
    const [account, setAccount] = useState<IAccountData>();
    const navigate = useNavigate();

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

    useEffect(() => {
        AccountService.getCurrentUser().then(response => {
            setAccount(response.data);
        }).catch(error => {
            if (error.response.status === 404) {
                navigate("/login");
            } else if (error) {
                navigate("/");
            }
        })
    },[])

    return (
        <>
            <ProfileCard
                account={account}
            />
        </>
    )
}

export default ProfilePage;