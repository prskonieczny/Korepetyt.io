import React, {useEffect, useState} from "react";
import {IAccountData} from "../../util/data";
import {useNavigate} from "react-router-dom";
import AccountService from "../../services/accountService";
import {Box, Paper} from "@mui/material";
import AccountsTable from "../../components/AdminView/AccountsTable";

const AccountsPage = () => {

    const [accounts, setAccounts] = useState<IAccountData[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        AccountService.getAllUsers().then(response => {
            setAccounts(response.data)
        }).catch(error => {
            console.log(error);
        });
    }, []);

    function addAdminRoleHandler(id: number) {
        AccountService.addAdminRole(id).then(() => {
            setAccounts(accounts.map((elem: any, index: number) => {
                return index === id - 1
                    ? {...elem, roles: [...elem.roles, {id: 1, permissionLevel: "ADMIN"}]}
                    : elem;
            }));
        });
    }

    function removeAdminRoleHandler(id: number) {
        AccountService.removeAdminRole(id).then(() => {
            const newAccounts = [...accounts]
            newAccounts.forEach((account) => {
                if (account.id === id) {
                    account.roles = account.roles.filter((role) => {
                        return role.permissionLevel !== "ADMIN";
                    })
                }
                setAccounts(newAccounts);
            });
        });
    }

    return (
        <Box>
            <Paper>
                <AccountsTable
                    accounts={accounts}
                    addAdminRoleHandler={addAdminRoleHandler}
                    removeAdminRoleHandler={removeAdminRoleHandler}
                />
            </Paper>
        </Box>
    );
}
export default AccountsPage;