import {IAccountData} from "../util/data";
import {useNavigate} from "react-router-dom";
import AuthService from "../services/authService";
import {DataGrid, GridCellParams, GridColDef} from "@mui/x-data-grid";
import React from "react";
import Box from "@mui/material/Box";
import {Typography} from "@mui/material";

export interface TeachersListProps {
    accounts: IAccountData[]
}

const convertAccountsToRows = (accounts: IAccountData[]) => {
    return accounts.map((acc) => ({
        id: acc.id,
        username: acc.username,
        email: acc.email,
        phone: acc.phone,
        city: acc.city,
        street: acc.street,
        subjects: acc.subjects.map(subject => subject.toLowerCase()).join(", ")
    }));
};

const TeachersTable = ({
                           accounts
                       }: TeachersListProps) => {
    const rows = convertAccountsToRows(accounts);
    const navigate = useNavigate()
    const loggedUserId = AuthService.getCurrentUserId();
    const columns: GridColDef[] = [
        { field: 'id', renderHeader: () => <strong>{"ID"}</strong>, width: 50 },
        {
            field: 'username',
            renderHeader: () => <strong>{"Username"}</strong>,
            width: 150,
            editable: false,
        },
        {
            field: 'email',
            renderHeader: () => <strong>{"Email"}</strong>,
            width: 200,
            editable: false,
        },
        {
            field: 'phone',
            renderHeader: () => <strong>{"Phone"}</strong>,
            width: 110,
            editable: false,
        },
        {
            field: 'city',
            renderHeader: () => <strong>{"City"}</strong>,
            width: 150,
            editable: false,
        },
        {
            field: 'street',
            renderHeader: () => <strong>{"Street"}</strong>,
            width: 150,
            editable: false,
        },
        {
            field: 'subjects',
            renderHeader: () => <strong>{"Subjects"}</strong>,
            width: 200,
            editable: false,
        },
    ];

    const handleCellClick = (params: GridCellParams) => {
            const accountId = params.row.id;
            if (loggedUserId === accountId) {
                navigate("../profile")
            } else {
                navigate("../users/account/" + accountId);
            }
    };

    return (
        <Box>
            <DataGrid
                onCellClick={handleCellClick}
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 10,
                        },
                    },
                }}
                disableColumnMenu={true}
                autoHeight
            />
        </Box>
    );
}
export default TeachersTable;