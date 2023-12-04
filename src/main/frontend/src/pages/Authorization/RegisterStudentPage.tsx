import { useState, FormEvent } from "react";
import { FormEncType, useNavigate } from "react-router-dom";
import AuthService from "../../services/authService";
import { Snackbar, Alert, Box, Grid } from "@mui/material";
import { palette } from "../../colors";
import image from '../../assets/images/registerpage.svg';
import RegisterForm from "../../components/RegisterForm";


const RegisterStudentPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const registrationCredentials = {
        username: "",
        password: "",
        email: "",
        phone: "",
        city: "",
        street: "",
        levels: [] as string[],
        subjects: [] as string[],
    };

    const [registerFormEntries, setRegisterFormEntries] = useState(registrationCredentials);
    const [isOpen, setIsOpen] = useState(false);
    const [snackbarMsg, setSnackBarMsg] = useState("");
    const [loading, setLoading] = useState(false);

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setIsOpen(false);
    };

    const registerFormSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        let { username
            , password
            , email
            , phone
            , city
            , street
            , levels
            , subjects
        } = registerFormEntries;
        try {
            await AuthService.registerStudent(username, password, email, phone, city, street, levels, subjects).then(r => {
                navigate("/registrationSuccessfull")
                console.log("zarejestrowano")
            });
        } catch (error) {
            // @ts-ignore
            if (error.response) {
                setIsOpen(true);
                setSnackBarMsg("Sorry, we could not register your account")
                // @ts-ignore
                if (error.response.data === "Error: Username is already taken!") {
                    setIsOpen(true);
                    setSnackBarMsg("Sorry, we could not register your account: username is already taken")
                }
                //@ts-ignore
                if (error.response.data === "Error: Email is already in use!") {
                    setIsOpen(true);
                    setSnackBarMsg("Sorry, we could not register your account - email is already taken")
                }
                //@ts-ignore
                if (error.response.data === "Error: Phone number is already in use!") {
                    setIsOpen(true);
                    setSnackBarMsg("Sorry, we could not register your account: phone number is already taken")
                }
            }
        } finally {
            setLoading(false);
        }
    }

    const RegisterSnackBarFail = (
        <Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                {snackbarMsg}
            </Alert>
        </Snackbar>
    );

    return (
        <>
            <Grid container sx={{
                display: 'flex'
            }}>
                <Grid xs={5}>
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
                                marginTop: '-10vh'
                            }}
                        />
                    </Box>
                </Grid>
                <Grid xs={7}>
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
                        <RegisterForm
                            loading={loading}
                            registerFormEntries={registerFormEntries}
                            setRegisterFormEntries={setRegisterFormEntries}
                            registerFormSubmit={registerFormSubmit}
                        />
                    </Box>
                </Grid>
            </Grid>
            {RegisterSnackBarFail}
        </>
    );
}
export default RegisterStudentPage;