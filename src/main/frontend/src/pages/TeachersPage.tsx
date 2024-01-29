import React, {useEffect, useState} from "react";
import {IAccountData} from "../util/data";
import AccountService from "../services/accountService";
import {palette} from "../colors";
import {Box, Typography} from "@mui/material";
import TeachersTable from "../components/TeachersTable";

const TeachersPage = () => {

    const [accounts, setAccounts] = useState<IAccountData[]>([]);
    useEffect(() => {
        AccountService.getAllTeachers().then(response => {
            setAccounts(response.data);
            console.log(accounts);
        }).catch(error => {
            console.log(error);
        });
    }, []);

    return (
        <>
            <Box sx={{
                height: 600,
                width: "70%",
                overflow: "hidden",
                margin: "auto",
                marginTop: "50px",
                backgroundColor: palette.champagne
            }}>
                <Typography fontFamily={"Nunito"} fontStyle={palette.gray} variant="h5" gutterBottom>
                    Our teachers:
                </Typography>
                <br/>
                <TeachersTable
                    accounts={accounts}
                />
            </Box>
        </>
    )
}
export default TeachersPage;