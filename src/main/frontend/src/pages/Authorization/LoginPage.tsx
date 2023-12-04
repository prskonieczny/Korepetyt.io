import React, { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/authService";
import { Snackbar, Alert, Grid, Box, Paper } from "@mui/material";
import LoginForm from "../../components/LoginForm";
import { palette } from "../../colors";
import image from '../../assets/images/loginpage.svg';

const LoginPage = () => {
    const credentials = {
        username: "",
        password: "",
    }
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const [error, setError] = useState(credentials);
    const [loginFormEntries, setLoginFormEntries] = useState(credentials);
    const [isOpen, setIsOpen] = useState(false);
    const [snackbarMsg, setSnackBarMsg] = useState("");
    const [isFailOpen, setIsFailOpen] = useState(false);
    const [failMsg, setFailMsg] = useState("");

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setIsOpen(false);
    };

    const handleFailClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setIsFailOpen(false);
    };

    const loginFromSubmit = async (e: FormEvent) => {
        e.preventDefault();
        let {
            username, password
        } = loginFormEntries;
        try {
            await AuthService.login(username, password, setErrorMessage).then(r => {
                navigate("/");
                setIsOpen(true)
                setSnackBarMsg("Logged in successfully")
            })
        } catch (error) {
            // @ts-ignore
            if (error.response.status === 401 || error.response.status === 400) {
                setIsFailOpen(true);
                setFailMsg("Wrong credentials")
            } else {
                setIsFailOpen(true);
                setFailMsg("Unknown error, try again later")
            }
        }
    }

    const LoginSnackBarSuccess = (
        <Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                {snackbarMsg}
            </Alert>
        </Snackbar>
    );
    const LoginSnackBarFail = (
        <Snackbar open={isFailOpen} autoHideDuration={6000} onClose={handleFailClose}>
            <Alert onClose={handleFailClose} severity="error" sx={{ width: '100%' }}>
                {failMsg}
            </Alert>
        </Snackbar>
    );

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
                                borderRadius: '8px',
                                marginTop: '-25vh'
                            }}
                        />
                    </Box>
                </Grid>
                <Grid xs={6}>
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
                        <LoginForm
                            loginFormEntries={loginFormEntries}
                            setLoginFormEntries={setLoginFormEntries}
                            loginFormSubmit={loginFromSubmit}
                            error={error}
                            setError={setError}
                            isLoading={isLoading}
                            errorMessage={errorMessage}
                        />
                    </Box>
                </Grid>
            </Grid>
            {LoginSnackBarSuccess}
            {LoginSnackBarFail}
        </>
    );
}
export default LoginPage;