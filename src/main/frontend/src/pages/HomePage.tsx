import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { palette } from "../colors";
import Typography from '@mui/material/Typography';
import image from '../assets/images/mainpage.svg';
import Grid from '@mui/material/Unstable_Grid2';
import './HomePage.css';
import { Dialog, DialogTitle, List, ListItem, ListItemButton } from "@mui/material";
import React from "react";

const HomePage = () => {

    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Grid container sx={{
                display: 'flex'
            }}>
                <Grid xs={6}>
                    <Box sx={{
                        backgroundColor: palette.champagne,
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'right',
                        alignItems: 'center',
                        padding: '0'
                    }}>
                        <img
                            src={image}
                            alt="Main page"
                            style={{
                                width: '80vh',
                                height: '80vh',
                                borderRadius: '8px'
                            }}
                        />
                    </Box>
                </Grid>
                <Grid xs={6} sx={{
                    alignItems: 'left',
                    textAlign: 'left'
                }}>
                    <Box sx={{
                        backgroundColor: palette.champagne,
                        height: '100vh',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'left',
                        textAlign: 'left',
                        padding: '0 0',
                        marginBottom: '0px'
                    }}>
                        <Typography variant="h2" fontFamily={"Nunito"} fontStyle={palette.gray} sx={{
                            alignContent: 'left', mt: -25,
                        }}>
                            Start your journey!
                        </Typography>
                        <Link to='/login'>
                        </Link>
                        <Typography variant="h4" fontFamily={"Nunito"} fontStyle={palette.gray}>
                            Already have account? {
                                <Link to='/login' style={{ textDecoration: 'none' }}>
                                    <span className="login-link">Login here</span>
                                </Link>
                            }
                        </Typography>
                        <Typography variant="h4" fontFamily={"Nunito"}>
                            Join us&nbsp;
                            <Link
                                style={{ textDecoration: 'none' }}
                                onClick={handleClickOpen} to={""}                            >
                                <span className="register-link">here</span>
                            </Link>
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
            <Dialog onClose={handleClose} open={open}>
                <DialogTitle fontFamily={"Nunito"} variant="h5" sx={{
                    backgroundColor: palette.umber,
                    color: palette.champagne
                }}>
                    Who are you?
                </DialogTitle>
                <List sx={{
                    pt: 0,
                    width: '300px',
                    backgroundColor: palette.umber,
                    color: palette.champagne
                }}>
                    <ListItem disableGutters>
                        <ListItemButton onClick={
                            () => {
                                navigate("/registerStudent");
                                handleClose();
                            }
                        }
                        >
                            Student
                        </ListItemButton>
                    </ListItem>
                    <ListItem disableGutters>
                        <ListItemButton
                            autoFocus
                            onClick={
                                () => {
                                    navigate("/registerTeacher");
                                    handleClose();
                                }
                            }
                        >
                            Teacher
                        </ListItemButton>
                    </ListItem>
                </List>
            </Dialog >
        </>
    )
}
export default HomePage;