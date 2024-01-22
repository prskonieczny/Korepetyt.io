import React, {useEffect, useState} from "react";
import {IAccountData} from "../../util/data";
import {useNavigate} from "react-router-dom";
import AccountService from "../../services/accountService";
import {Alert, Box, Snackbar} from "@mui/material";
import AccountsTable from "../../components/AdminView/AccountsTable";
import {palette} from "../../colors";

const AccountsPage = () => {

    const [accounts, setAccounts] = useState<IAccountData[]>([]);
    const navigate = useNavigate();
    const [snackbarInfo, setSnackbarInfo] = useState({ open: false, message: ""});
    const [snackbarErrorInfo, setSnackbarErrorInfo] = useState({ open: false, message: ""});

    const handleCloseSnackbar = () => {
        setSnackbarInfo({ ...snackbarInfo, open: false });
    };
    const handleCloseErrorSnackbar = () => {
        setSnackbarErrorInfo({ ...snackbarInfo, open: false });
    };

    useEffect(() => {
        AccountService.getAllUsers().then(response => {
            setAccounts(response.data);
            console.log(accounts);
        }).catch(error => {
            console.log(error);
        });
    }, []);

    function addAdminRoleHandler(id: number) {
        AccountService.addAdminRole(id)
            .then(() => {
                setAccounts((prevAccounts) =>
                    prevAccounts.map((elem) =>
                        elem.id === id ? { ...elem, roles: [...elem.roles, { id: 1, permissionLevel: "ADMIN" }] } : elem
                    )
                );
                setSnackbarInfo({ open: true, message: "Admin role added successfully"});
            })
            .catch((error) => {
                setSnackbarErrorInfo({ open: true, message: "User already have admin role"});
            });
    }

    function removeAdminRoleHandler(id: number) {
        AccountService.removeAdminRole(id)
            .then(() => {
                const newAccounts = [...accounts];
                newAccounts.forEach((account) => {
                    if (account.id === id) {
                        account.roles = account.roles.filter((role) => role.permissionLevel !== "ADMIN");
                    }
                });
                setAccounts(newAccounts);
                setSnackbarInfo({ open: true, message: "Admin role removed successfully"});
            })
            .catch((error) => {
                setSnackbarErrorInfo({ open: true, message: "User does not have admin role"});
            });
    }

    return (
        <>
        <Snackbar
            open={snackbarInfo.open}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
        >
            <Alert onClose={handleCloseSnackbar} severity="success">
                {snackbarInfo.message}
            </Alert>
        </Snackbar>
            <Snackbar
                open={snackbarErrorInfo.open}
                autoHideDuration={6000}
                onClose={handleCloseErrorSnackbar}
            >
                <Alert onClose={handleCloseErrorSnackbar} severity="error">
                    {snackbarErrorInfo.message}
                </Alert>
            </Snackbar>
        <Box sx={{
            height: 600,
            width: "70%",
            borderRadius: 10,
            overflow: "hidden",
            margin: "auto",
            backgroundColor: palette.champagne
        }}>
                <AccountsTable
                    accounts={accounts}
                    addAdminRoleHandler={addAdminRoleHandler}
                    removeAdminRoleHandler={removeAdminRoleHandler}
                />
        </Box>
        </>
    );
}
export default AccountsPage;