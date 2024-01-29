import React from 'react';
import Box from '@mui/material/Box';
import AuthService from "../../services/authService";
import {IAccountData} from "../../util/data";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import {DataGrid, GridCellParams, GridColDef} from '@mui/x-data-grid';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, Grid, MenuItem, Select, TextField, Typography,
} from "@mui/material";
import {palette} from "../../colors";
import {useNavigate} from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';


export interface AccountsListProps {
    accounts: IAccountData[],
    addAdminRoleHandler: (id: number) => void,
    removeAdminRoleHandler: (id: number) => void,
    deleteAccountHandler: (id: number) => void,
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
                           removeAdminRoleHandler,
                           deleteAccountHandler,
                       }: AccountsListProps) => {

    const rows = convertAccountsToRows(accounts);
    const [open, setOpen] = React.useState(false);
    const [accountId, setAccountId] = React.useState(0);
    const navigate = useNavigate()
    const loggedUserId = AuthService.getCurrentUserId();
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    function handleDeleteAccount(id: number) {
        deleteAccountHandler(id);
    }

    const [filterText, setFilterText] = React.useState("");
    const [selectedRole, setSelectedRole] = React.useState("");
    const roles = ["ADMIN", "TEACHER", "STUDENT"];
    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilterText(event.target.value);
    };
    const handleRoleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setSelectedRole(event.target.value as string);
    };
    const filteredRows = rows.filter((row) => {
        // Filtrowanie po REGEXIE
        const regex = new RegExp(filterText, "i");
        if (!regex.test(row.username) && !regex.test(row.email)) {
            return false;
        }
        // Filtrowanie po roli
        return (!selectedRole || row.roles.toLowerCase().includes(selectedRole.toLowerCase()));
    });

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
            width: 60,
            sortable: false,
            renderCell: (params) => (
                <>
                    {!(AuthService.getCurrentUser() === params.row.username) && (
                        <Button sx={{color: palette.umber}}
                                onClick={() => addAdminRoleHandler(params.row.id)}>
                            <AddCircleIcon />
                        </Button>
                    )}
                </>
            ),
        },
        {
            field: 'actionsRemove',
            headerName: '',
            width: 60,
            sortable: false,
            renderCell: (params) => (
                <>
                    {!(AuthService.getCurrentUser() === params.row.username) && (
                        <Button sx={{color: palette.umber}}
                                onClick={() => removeAdminRoleHandler(params.row.id)}>
                            <RemoveCircleIcon />
                        </Button>
                    )}
                </>
            ),
        },
        {
            field: 'actionsDelete',
            headerName: '',
            width: 70,
            sortable: false,
            renderCell: (params) => (
                <>
                    {!(AuthService.getCurrentUser() === params.row.username) && (
                        <Button sx={{color: palette.umber}}
                                onClick={() => {
                                    setOpen(true);
                                    setAccountId(params.row.id);
                                }}>
                            <DeleteForeverIcon />
                        </Button>
                    )}
                </>
            ),
        },
    ];

    const handleCellClick = (params: GridCellParams) => {
        if (params.field !== 'actionsAdd' && params.field !== 'actionsRemove' && params.field !== 'actionsDelete') {
            const accountId = params.row.id;
            if (loggedUserId === accountId) {
                navigate("../profile")
            } else {
                navigate("account/" + accountId);
            }
        }
    };

    const deleteAccountDialog = (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Delete this account?"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <p>Are you sure you want to delete this account?</p>
                    <p>You can not take this action back.</p>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button sx={{backgroundColor: palette.champagne, color: 'black'}} onClick={handleClose}>Cancel</Button>
                <Button sx={{backgroundColor: palette.champagne, color: 'black'}} onClick={() => {
                    handleDeleteAccount(accountId);
                    handleClose();
                }} autoFocus>
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );

    return (
        <Box marginTop={"50px"}>
            <Typography fontFamily={"Nunito"} fontStyle={palette.gray} variant="h5" gutterBottom>
                Manage accounts:
            </Typography><br/>
            <Grid container>
                <Grid>
                    <PersonIcon fontSize={"large"} sx={{color: palette.current}}/>
                    <TextField
                        type="text"
                        value={filterText}
                        onChange={handleFilterChange}
                        placeholder="Username..."
                    />
                </Grid>
                &emsp;
                <Grid>
                    <AdminPanelSettingsIcon fontSize={"large"} sx={{color: palette.current}}/>
                    <Select
                        value={selectedRole}
                        onChange={(e) => setSelectedRole(e.target.value)}
                        sx={{width: '224px'}}
                        variant={"outlined"}
                    >
                        <MenuItem value={""}>
                            All roles
                        </MenuItem>
                        {roles.map((r, index) => (
                            <MenuItem key={index} value={r}>
                                {r}
                            </MenuItem>
                        ))}
                    </Select>
                </Grid>
            </Grid>
            {deleteAccountDialog}
            <br/><br/>
                <DataGrid
                    onCellClick={handleCellClick}
                    rows={filteredRows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 10,
                            },
                        },
                    }}
                    autoHeight
                    rowHeight={80}
                />
        </Box>
    );
}

export default AccountsTable;