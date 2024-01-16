import {IAccountData} from "../../util/data";
import React, {useEffect, useState} from "react";
import AuthService from "../../services/authService";
import {
    Box,
    Collapse,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export interface AccountsListProps {
    accounts: IAccountData[],
    addAdminRoleHandler: (id: number) => void,
    removeAdminRoleHandler: (id: number) => void
}

const AccountsTable = ({
                      accounts,
                      addAdminRoleHandler,
                      removeAdminRoleHandler
    }: AccountsListProps) => {

    const [loggedUsername] = useState<string | null>(AuthService.getCurrentUser());
    const roles = ["ADMIN", "TEACHER", "STUDENT"];
    const [filteredData, setFilteredData] = useState(accounts);

    function Row(props: { row: IAccountData }) {
        const { row } = props;
        const [open, setOpen] = useState(false);

        return (
            <>
                <TableRow sx={{'& > *': {borderBottom: 'unset'}}}>
                    <TableCell>
                        <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => setOpen(!open)}
                        >
                            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    </TableCell>
                    <TableCell component="th" scope="row">
                        {row.username}
                    </TableCell>
                    <TableCell align="right">{row.email}</TableCell>
                    <TableCell align="right">{row.phone}</TableCell>
                    <TableCell align="right">{row.city}</TableCell>
                    <TableCell align="right">{row.street}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box sx={{ margin: 1 }}>
                                <Typography variant="h6" gutterBottom component="div">
                                    User Details
                                </Typography>
                                <Table size="small" aria-label="user-details">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Role</TableCell>
                                            <TableCell>Levels</TableCell>
                                            <TableCell>Subjects</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>{row.roles.join(", ")}</TableCell>
                                            <TableCell>{row.levels.join(", ")}</TableCell>
                                            <TableCell>{row.subjects.join(", ")}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
            </>
        );
    }

    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>Username</TableCell>
                        <TableCell align="right">Email</TableCell>
                        <TableCell align="right">Phone</TableCell>
                        <TableCell align="right">City</TableCell>
                        <TableCell align="right">Street</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {accounts.map((acc) => (
                        <Row key={acc.id} row={acc} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
export default AccountsTable;