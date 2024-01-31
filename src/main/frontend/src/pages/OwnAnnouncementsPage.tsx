import React, {FormEvent, useEffect, useMemo, useState} from "react";
import {
    IAddAnnouncementData,
    IAnnouncementData,
    IEditAnnouncementData,
    IShowAnnouncementAccountResponse
} from "../util/announcementData";
import AnnouncementService from "../services/announcementService";
import {
    Alert,
    Box,
    Button,
    Dialog, DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, Divider, MenuItem, Pagination, Select,
    Snackbar, TextField,
    Typography
} from "@mui/material";
import {palette} from "../colors";
import Grid from "@mui/material/Unstable_Grid2";
import image from "../assets/images/loginpage.svg";
import GroupsIcon from '@mui/icons-material/Groups';
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import {DataGrid, GridCellParams, GridColDef} from "@mui/x-data-grid";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import {useNavigate} from "react-router-dom";

const convertAccountsToRows = (accounts: IShowAnnouncementAccountResponse[]) => {
    return accounts.map((acc) => ({
        id: acc.id,
        username: acc.username,
        email: acc.email,
        phone: acc.phone,
        city: acc.city,
        street: acc.street,
    }));
};

const OwnAnnouncementsPage = () => {

    const navigate = useNavigate();
    const [ accounts, setAccounts ] = useState<IShowAnnouncementAccountResponse[]>([]);
    const rows = convertAccountsToRows(accounts);
    const columns: GridColDef[] = [
        {
            field: 'icon',
            headerName: '',
            width: 70,
            sortable: false,
            renderCell: (params) => (
                    <AccountBoxIcon />
            ),
        },
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
            width: 100,
            editable: false,
        },
        {
            field: 'street',
            renderHeader: () => <strong>{"Street"}</strong>,
            width: 100,
            editable: false,
        },
        {
            field: 'actions',
            headerName: '',
            width: 70,
            sortable: false,
            renderCell: (params) => (
                <>
                        <Button sx={{color: palette.umber}}
                                onClick={() => {
                                    const teacherId = params.row.id;
                                    navigate("../users/account/" + teacherId);
                                }}>
                            <ArrowForwardIosIcon />
                        </Button>
                </>
            ),
        },
    ];

    const [announcements, setAnnouncements] = useState<IAnnouncementData[]>([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(3);
    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const [activeAnnouncementId, setActiveAnnouncementId] = useState<number | undefined>();
    const activeAnnouncement = useMemo(() => announcements.find(announcement => announcement.id === activeAnnouncementId),[activeAnnouncementId])

    const startIdx = useMemo(() => (page - 1) * pageSize,[page, pageSize])
    const endIdx = startIdx + pageSize;
    const displayedAnnouncements = announcements.slice(startIdx, endIdx);

    //Snackbars
    const [snackbarInfo, setSnackbarInfo] = useState({ open: false, message: ""});
    const [snackbarErrorInfo, setSnackbarErrorInfo] = useState({ open: false, message: ""});
    const handleCloseSnackbar = () => {
        setSnackbarInfo({ ...snackbarInfo, open: false });
    };
    const handleCloseErrorSnackbar = () => {
        setSnackbarErrorInfo({ ...snackbarInfo, open: false });
    };

    // lista nauczycieli
    const [teachersOpen, setTeachersOpen] = useState(false);
    const handleTeachersClose = () => {
        setTeachersOpen(false);
    }
    const handleTeachersOpen = () => {
        setTeachersOpen(true);
    }

    const getTeachersByAnnouncementId = (id: number | undefined) => {
        AnnouncementService.getTeachersByAnnouncementId(id).then(response => {
            setAccounts(response.data);
        }).catch(error =>{
            console.log(error);
        })
    }

   const getOwnAnnouncements = () => {
        AnnouncementService.getOwnAnnouncements().then(response => {
            setAnnouncements(response.data);
        }).catch(error => {
            console.log(error);
        });
    }

    useEffect(() => {
        getTeachersByAnnouncementId(activeAnnouncementId);
    }, [activeAnnouncementId]);

    // usuniecie ogloszenia
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    }

    function deleteAnnouncementHandler(id: number) {
        AnnouncementService.deleteAnnouncement(id)
            .then(() => {
                console.log("usunieto ogloszenie " + id);
                setAnnouncements((prevAnnouncements) => {
                    return prevAnnouncements.filter((announcement) => announcement.id !== id);
                });
                setSnackbarInfo({ open: true, message: "Announcement deleted successfully"});
            })
            .catch((error) => {
                setSnackbarErrorInfo({ open: true, message: "Announcement could not be deleted"});
            });
    }

    // dodanie ogloszenia
    const [level, setLevel] = useState('');
    const [subject, setSubject] = useState('');
    const [description, setDescription] = useState('');
    const [descError, setDescError] = useState('');
    const [addOpen, setAddOpen] = useState(false);
    const handleAddClose = () => {
        setAddOpen(false);
    };
    const handleAddOpen = () => {
        setAddOpen(true);
    }
    const levels = [
        'PRIMARY_SCHOOL',
        'MIDDLE_SCHOOL',
        'HIGH_SCHOOL',
        'UNIVERSITY'
    ];
    const subjects = [
        'MATHEMATICS',
        'PHYSICS',
        'BIOLOGY',
        'CHEMISTRY',
        'ENGLISH',
        'GEOGRAPHY',
        'LITERACY',
        'MUSIC',
        'INFORMATION_TECHNOLOGY',
    ];
    const addAnnouncementHandler = async (e: FormEvent, level: string, subject: string, description: string) => {
        e.preventDefault();
        const levelEnum = level.toUpperCase().replace(' ', '_');
        const subjectEnum = subject.toUpperCase().replace(' ', '_');
        const newAnnouncementData: IAddAnnouncementData = {
            levels: levelEnum,
            subjects: subjectEnum,
            description,
        };
        try {
            await AnnouncementService.addAnnouncement(newAnnouncementData)
                .then(() => {
                    getOwnAnnouncements();
                    setSnackbarInfo({ open: true, message: "Announcement added successfully"});
               });
        } catch (error) {
            setSnackbarErrorInfo({ open: true, message: "Announcement could not be added"});
        }
    };

    // edytowanie ogloszenia
    const [editOpen, setEditOpen] = useState(false);
    const [descEdit, setDescEdit] = useState('');
    const [descEditError, setDescEditError] = useState('');
    const handleEditClose = () => {
        setEditOpen(false);
    };
    const handleEditOpen = () => {
        setEditOpen(true);
    }
    const handleEditAnnouncement = async (e: React.FormEvent, id: number) => {
        e.preventDefault();
        const levelEnum = level.toUpperCase().replace(' ', '_');
        const subjectEnum = subject.toUpperCase().replace(' ', '_');
        const editAnnouncementData: IEditAnnouncementData = {
            levels: levelEnum,
            subjects: subjectEnum,
            description: descEdit,
        };
        try {
            await AnnouncementService.editOwnAnnouncement(id, editAnnouncementData).then(() => {
                console.log(descEdit)
                getOwnAnnouncements();
                setSnackbarInfo({ open: true, message: "Announcement edited successfully"});
            })
        } catch (error) {
            setSnackbarErrorInfo({ open: true, message: "Announcement could not be edited"});
        }
    }

    useEffect(() => {
        getOwnAnnouncements();
    }, []);

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
            <Grid container>
                <Grid xs={5}>
                    <Box sx={{
                        backgroundColor: palette.champagne,
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'right',
                        alignItems: 'center',
                        padding: '0',
                        marginTop: '5px',
                    }}>
                        <img
                            src={image}
                            alt="Main page"
                            style={{
                                width: '80vh',
                                height: '80vh',
                                borderRadius: '8px',
                                marginTop: '-10vh'
                            }}
                        />
                    </Box>
                </Grid>
                <Grid xs={5}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            marginTop: '100px',
                            textAlign: 'left',
                            padding: '0 0',
                            marginBottom: '0px',
                        }}
                    >
                        <Typography fontFamily={"Nunito"} fontStyle={palette.gray} variant="h5" gutterBottom>
                            Explore your announcements:
                        </Typography>
                        <Button
                            sx={{backgroundColor: palette.umber, color: 'white'}}
                            onClick={handleAddOpen}
                        >
                            Create new announcement
                        </Button>
                        <br/>
                        <div>
                            {displayedAnnouncements.map((announcement) => (
                                <Box
                                    key={announcement.id}
                                    style={{
                                        borderRadius: '8px',
                                        padding: '10px',
                                        marginBottom: '10px',
                                        width: '800px',
                                        height: '120px'
                                    }}
                                >
                                    <Divider/><br/>
                                    <Grid container spacing={40}>
                                        <Grid xs={8}>
                                            <Typography>Subject: {announcement.subjects.toLowerCase()}</Typography>
                                            <Typography>Level: {announcement.levels.replace("_", " ").toLowerCase()}</Typography>
                                            <Typography>Description:</Typography>
                                            <Typography>{announcement.description}</Typography>
                                        </Grid>
                                        <Grid xs={2}>
                                            <Grid>
                                                    <Button
                                                        sx={{marginTop: '10px'}}
                                                        onClick={() => {
                                                            setActiveAnnouncementId(announcement.id);
                                                            handleTeachersOpen();
                                                        }}
                                                    >
                                                        <GroupsIcon
                                                            style={{
                                                                fontSize: 'x-large',
                                                                color: palette.umber,
                                                            }}
                                                        />
                                                    </Button>
                                            </Grid>
                                            <Grid>
                                                    <Button
                                                        onClick={() => {
                                                            setActiveAnnouncementId(announcement.id);
                                                            handleOpen();
                                                        }}
                                                    >
                                                        <DeleteIcon
                                                            style={{
                                                                fontSize: 'x-large',
                                                                color: palette.umber,
                                                            }}
                                                        />
                                                    </Button>
                                            </Grid>
                                            <Grid>
                                                <Button
                                                    onClick={() => {
                                                        setActiveAnnouncementId(announcement.id);
                                                        console.log("edytowanie")
                                                        handleEditOpen();
                                                    }}
                                                >
                                                    <BorderColorIcon
                                                        style={{
                                                            fontSize: 'x-large',
                                                            color: palette.umber,
                                                        }}
                                                    />
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Box>
                            ))}

                            <Dialog
                                open={teachersOpen}
                                onClose={handleTeachersClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                                fullWidth
                                maxWidth="md"
                            >
                                <DialogTitle id="alert-dialog-title">
                                    {"Your teachers"}
                                </DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        {rows.length === 0 ? (
                                            <p>No teachers assigned yet.</p>
                                        ) : (
                                            <Grid>
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
                                                    rowHeight={40}
                                                />
                                            </Grid>
                                        )}
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button sx={{backgroundColor: palette.champagne, color: 'black'}} onClick={() => {
                                        handleTeachersClose();
                                        setActiveAnnouncementId(undefined);
                                    }} autoFocus>
                                        Close
                                    </Button>
                                </DialogActions>
                            </Dialog>

                            <Dialog
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title">
                                    {"Do you want to delete this announcement?"}
                                </DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        <p>Are you sure you want to delete this announcement?</p>
                                        <p>You can not take this action back.</p>
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button sx={{backgroundColor: palette.champagne, color: 'black'}} onClick={handleClose}>Cancel</Button>
                                    <Button sx={{backgroundColor: palette.champagne, color: 'black'}} onClick={() => {
                                        if (activeAnnouncement) {
                                            deleteAnnouncementHandler(activeAnnouncement.id);
                                        }
                                        handleClose();
                                        setActiveAnnouncementId(undefined);
                                    }} autoFocus>
                                        Delete
                                    </Button>
                                </DialogActions>
                            </Dialog>

                            <Dialog
                                open={addOpen}
                                onClose={handleAddClose}
                                sx={{color: palette.current}}
                                PaperProps={{
                                    component: 'form',
                                    onSubmit: async (event: React.FormEvent<HTMLFormElement>) => {
                                        event.preventDefault();
                                        await addAnnouncementHandler(event, level, subject, description).then(handleAddClose);
                                        },
                                }}
                            >
                                <DialogTitle>Create new announcement</DialogTitle>
                                <DialogContent>
                                    <br/>
                                    <p>Choose your level:</p>
                                    <Select
                                        required={true}
                                        value={level}
                                        onChange={(e) => setLevel(e.target.value)}
                                        fullWidth
                                        sx={{ marginBottom: '16px', color: palette.umber, backgroundColor: palette.champagne, width: '500px'}}
                                    >
                                        {levels.map((lvl) => (
                                            <MenuItem key={lvl} value={lvl}>
                                                {lvl.replace('_', ' ')}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    <br/>
                                    <p>Choose subject:</p>
                                    <Select
                                        required={true}
                                        value={subject}
                                        onChange={(e) => setSubject(e.target.value)}
                                        fullWidth
                                        sx={{ marginBottom: '16px', color: palette.umber, backgroundColor: palette.champagne, width: '500px'}}
                                    >
                                        {subjects.map((sub) => (
                                            <MenuItem key={sub} value={sub}>
                                                {sub.replace('_', ' ')}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    <TextField
                                        autoFocus
                                        required
                                        margin="dense"
                                        id="description"
                                        name="description"
                                        label="Description"
                                        fullWidth
                                        variant="standard"
                                        multiline={true}
                                        onChange={(e) => {
                                            const inputValue = e.target.value;
                                            if (inputValue.length <= 100) {
                                                setDescription(inputValue);
                                                setDescError('');
                                            } else {
                                                setDescError('Description cannot exceed 100 characters.');
                                            }
                                        }}
                                        error={!!descError}
                                        helperText={descError}
                                    />
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleAddClose} sx={{backgroundColor: palette.champagne, color: 'black'}}
                                    >Cancel</Button>
                                    <Button type="submit" sx={{backgroundColor: palette.champagne, color: 'black'}}
                                            disabled={description === ''}
                                    >Submit</Button>
                                </DialogActions>
                            </Dialog>

                            <Dialog
                                open={editOpen}
                                onClose={handleEditOpen}
                                sx={{color: palette.current}}
                                PaperProps={{
                                    component: 'form',
                                    onSubmit: async (event: React.FormEvent<HTMLFormElement>) => {
                                        event.preventDefault();
                                        if (activeAnnouncement) {
                                            await handleEditAnnouncement(event, activeAnnouncement.id).then(handleEditClose);
                                        }
                                    },
                                }}
                            >
                                <DialogTitle>Edit your announcement</DialogTitle>
                                <DialogContent>
                                    <br/>
                                    <p>Choose your level:</p>
                                    <Select
                                        required
                                        value={level}
                                        onChange={(e) => setLevel(e.target.value)}
                                        fullWidth
                                        sx={{ marginBottom: '16px', color: palette.umber, backgroundColor: palette.champagne, width: '500px'}}
                                    >
                                        {levels.map((lvl) => (
                                            <MenuItem key={lvl} value={lvl}>
                                                {lvl.replace('_', ' ')}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    <br/>
                                    <p>Choose subject:</p>
                                    <Select
                                        required
                                        value={subject}
                                        onChange={(e) => setSubject(e.target.value)}
                                        fullWidth
                                        sx={{ marginBottom: '16px', color: palette.umber, backgroundColor: palette.champagne, width: '500px'}}
                                    >
                                        {subjects.map((sub) => (
                                            <MenuItem key={sub} value={sub}>
                                                {sub.replace('_', ' ')}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    <TextField
                                        autoFocus
                                        required
                                        margin="dense"
                                        id="description"
                                        name="description"
                                        label="Description"
                                        fullWidth
                                        variant="standard"
                                        value={descEdit}
                                        multiline={true}
                                        onChange={(e) => {
                                            const inputValue = e.target.value;
                                            if (inputValue.length <= 100) {
                                                setDescription('');
                                                setDescEdit(inputValue);
                                                setDescEditError('');
                                            } else {
                                                setDescEditError('Description cannot exceed 100 characters.');
                                            }
                                        }}
                                        error={!!descEditError}
                                        helperText={descEditError}
                                    />
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={() => {
                                        handleEditClose();
                                        setActiveAnnouncementId(undefined);
                                    }} sx={{backgroundColor: palette.champagne, color: 'black'}}
                                    >Cancel</Button>
                                    <Button type="submit" sx={{backgroundColor: palette.champagne, color: 'black'}}
                                            disabled={descEdit === '' || descEditError !== ''}
                                    >Submit</Button>
                                </DialogActions>
                            </Dialog>

                        </div>
                        <Pagination
                            count={Math.ceil(announcements.length / pageSize)}
                            page={page}
                            onChange={handlePageChange}
                            sx={{color: palette.current}}
                            style={{ marginTop: '20px' }}
                        />
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}
export default OwnAnnouncementsPage;