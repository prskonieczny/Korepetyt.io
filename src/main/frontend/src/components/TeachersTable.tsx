import {IAccountData} from "../util/data";
import {useNavigate} from "react-router-dom";
import AuthService from "../services/authService";
import {DataGrid, GridCellParams, GridColDef} from "@mui/x-data-grid";
import React, {useState} from "react";
import Box from "@mui/material/Box";
import {Grid, MenuItem, Select, TextField, Typography} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';
import {palette} from "../colors";

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

    // filtrowanie
    const [filterText, setFilterText] = useState("");
    const [selectedSubject, setSelectedSubject] = useState("");
    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilterText(event.target.value);
    };
    const handleSubjectChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setSelectedSubject(event.target.value as string);
    };

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

    const filteredRows = rows.filter((row) => {
        // Filtrowanie po REGEXIE
        const regex = new RegExp(filterText, "i");
        if (!regex.test(row.username) && !regex.test(row.email)) {
            return false;
        }
        // Filtrowanie po przedmiotach
        return (!selectedSubject || row.subjects.toLowerCase().includes(selectedSubject.toLowerCase()));
    });

    const allSubjects = accounts.flatMap((acc) => acc.subjects.map((subject) => subject.toLowerCase()));
    const uniqueSubjects = Array.from(new Set(allSubjects));

    return (
        <Box>

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
                    <SchoolIcon fontSize={"large"} sx={{color: palette.current}}/>
                    <Select
                        value={selectedSubject}
                        onChange={(e) => setSelectedSubject(e.target.value)}
                        sx={{width: '224px'}}
                        variant={"outlined"}
                    >
                        <MenuItem value={""}>
                            All subjects
                        </MenuItem>
                        {uniqueSubjects.map((s, index) => (
                            <MenuItem key={index} value={s}>
                                {s.replace('_', ' ')}
                            </MenuItem>
                        ))}
                    </Select>
                </Grid>
            </Grid>

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
            />
        </Box>
    );
}
export default TeachersTable;