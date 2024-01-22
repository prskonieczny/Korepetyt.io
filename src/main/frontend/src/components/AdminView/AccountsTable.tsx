import React from 'react';
import Box from '@mui/material/Box';
import AuthService from "../../services/authService";
import {IAccountData} from "../../util/data";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import {DataGrid, GridCellParams, GridColDef} from '@mui/x-data-grid';


export interface AccountsListProps {
    accounts: IAccountData[],
    addAdminRoleHandler: (id: number) => void,
    removeAdminRoleHandler: (id: number) => void
}

const convertAccountsToRows = (accounts: IAccountData[]) => {
    return accounts.map((acc) => ({
        id: acc.id,
        username: acc.username,
        email: acc.email,
        phone: acc.phone,
        city: acc.city,
        street: acc.street,
        roles: acc.roles.map(role => role.permissionLevel).join(", "),
    }));
};

const AccountsTable = ({
                           accounts,
                           addAdminRoleHandler,
                           removeAdminRoleHandler
                       }: AccountsListProps) => {
    const rows = convertAccountsToRows(accounts);
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
            field: 'roles',
            renderHeader: () => <strong>{"Roles"}</strong>,
            width: 200,
            editable: false,
        },
        {
            field: 'actionsAdd',
            headerName: '',
            width: 40,
            sortable: false,
            renderCell: (params) => (
                <>
                    {!(AuthService.getCurrentUser() === params.row.username) && (
                        <AddCircleIcon onClick={() => addAdminRoleHandler(params.row.id)} />
                    )}
                </>
            ),
        },
        {
            field: 'actionsRemove',
            headerName: '',
            width: 40,
            sortable: false,
            renderCell: (params) => (
                <>
                    {!(AuthService.getCurrentUser() === params.row.username) && (
                        <RemoveCircleIcon onClick={() => removeAdminRoleHandler(params.row.id)} />
                    )}
                </>
            ),
        },
    ];

    const handleCellClick = (params: GridCellParams) => {
        if (params.field != "actions") {
            const accountId = params.row.id;
        }
    };

    return (
        <Box>
            <br/><br/>
                <DataGrid
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
                    rowHeight={80}
                />
        </Box>
    );
}

export default AccountsTable;