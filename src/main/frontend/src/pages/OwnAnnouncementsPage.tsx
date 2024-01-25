import AuthService from "../services/authService";
import React, {useEffect, useMemo, useState} from "react";
import {IAnnouncementData} from "../util/announcementData";
import AnnouncementService from "../services/announcementService";
import {
    Alert,
    Box,
    Button,
    Dialog, DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, Pagination,
    Snackbar,
    Typography
} from "@mui/material";
import {palette} from "../colors";
import Grid from "@mui/material/Unstable_Grid2";
import image from "../assets/images/loginpage.svg";
import GroupsIcon from '@mui/icons-material/Groups';
import DeleteIcon from "@mui/icons-material/Delete";

const OwnAnnouncementsPage = () => {

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

    useEffect(() => {
        AnnouncementService.getOwnAnnouncements().then(response => {
            setAnnouncements(response.data);
        }).catch(error => {
            console.log(error);
        });
    }, []);

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

    const Divider = (
        <Box
            sx={{
                backgroundColor: palette.current,
                borderRadius: '20px',
                width: '800px',
                height: '10px'
            }}
        />
    );

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
                        marginTop: '10px'
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
                            marginBottom: '0px'
                        }}
                    >
                        <Typography fontFamily={"Nunito"} fontStyle={palette.gray} variant="h5" gutterBottom>
                            Explore students announcements:
                        </Typography>
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
                                    {Divider}
                                    <Grid container spacing={40}>
                                        <Grid xs={8}>
                                            <Typography>Subject: {announcement.subjects.toLowerCase()}</Typography>
                                            <Typography>Level: {announcement.levels.replace("_", " ").toLowerCase()}</Typography>
                                            <Typography>Description:</Typography>
                                            <Typography variant={"h6"}>{announcement.description}</Typography>
                                        </Grid>
                                        <Grid xs={2}>
                                            <Grid>
                                                    <Button
                                                        sx={{marginTop: '10px'}}
                                                        onClick={() => {
                                                            setActiveAnnouncementId(announcement.id);
                                                            console.log("lista nauczycielow")
                                                        }}
                                                    >
                                                        <GroupsIcon
                                                            style={{
                                                                fontSize: 'xx-large',
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
                                                                fontSize: 'xx-large',
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