import {Box, Typography, TextField, Button, InputAdornment} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { palette } from "../colors";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import IconButton from "@mui/material/IconButton";

interface RegisterFormProps {
    registerFormEntries: {
        username: string,
        password: string,
        email: string,
        phone: string,
        city: string,
        street: string,
    },
    setRegisterFormEntries: React.Dispatch<React.SetStateAction<{
        username: string,
        password: string,
        email: string,
        phone: string,
        city: string,
        street: string,
    }>>,
    registerFormSubmit: (event: React.FormEvent) => void,
}

const RegisterForm = ({
    registerFormEntries,
    registerFormSubmit,
    setRegisterFormEntries,
}: RegisterFormProps) => {

    const [repeatPassword, setRepeatPassword] = useState<string>("");
    const navigate = useNavigate();
    const [emailError, setEmailError] = useState<string | null>(null);
    const [phoneError, setPhoneError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [cityError, setCityError] = useState<string | null>(null);
    const [repeatPasswordError, setRepeatPasswordError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: { xs: "center", md: "flex-start" },
                    justifyContent: { xs: "flex-start", md: "flex-start" },
                    mt: -15,
                }}
            >
                <Typography variant="h2" fontFamily={"Nunito"} fontStyle={palette.gray} sx={{ alignContent: 'left' }}>
                    Join us!
                </Typography>
                <Typography variant="h5" fontFamily={"Nunito"} fontStyle={palette.gray} sx={{ alignContent: 'left' }}>
                    Start your best learning journey
                </Typography>
            </Box>
            <br />
            <form onSubmit={registerFormSubmit}>
                <div>
                    <TextField
                        required={true}
                        label={"Username"}
                        variant="standard"
                        name={"username"}
                        value={registerFormEntries.username}
                        onChange={(event) => {
                            setRegisterFormEntries((prev) => ({ ...prev, username: event.target.value }));
                        }}
                        sx={{ textTransform: "none", width: "40%", mb: { xs: 3, md: 3 } }}
                    />
                </div>
                <div>
                    <TextField
                        required={true}
                        label={"Password"}
                        variant="standard"
                        name={"password"}
                        value={registerFormEntries.password}
                        onChange={(event) => {
                            const passwordValue = event.target.value;
                            setRegisterFormEntries((prev) => ({ ...prev, password: passwordValue }));
                            // Password validation
                            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}|:"<>?])[\w!@#$%^&*()_+{}|:"<>?]{8,16}$/;
                            if (!passwordRegex.test(passwordValue)) {
                                setPasswordError("Invalid password format. Password must be 8-16 characters, with at least one lowercase, one uppercase letter, and one special character.");
                            } else {
                                setPasswordError(null);
                            }
                        }}
                        type={showPassword ? "text" : "password"}
                        error={!!passwordError}
                        helperText={passwordError}
                        sx={{
                            textTransform: "none", width: "40%", mb: { xs: 3, md: 3 },
                        }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setShowPassword(!showPassword)}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </div>
                <div>
                    <TextField
                        required={true}
                        label={"Repeat Password"}
                        variant="standard"
                        name={"repeatPassword"}
                        value={repeatPassword}
                        onChange={(event) => {
                            const repeatPasswordValue = event.target.value;
                            setRepeatPassword(repeatPasswordValue);

                            // Repeat password validation
                            if (repeatPasswordValue !== registerFormEntries.password) {
                                setRepeatPasswordError("Passwords do not match.");
                            } else {
                                setRepeatPasswordError(null);
                            }
                        }}
                        type={showRepeatPassword ? "text" : "password"}
                        error={!!repeatPasswordError}
                        helperText={repeatPasswordError}
                        sx={{
                            textTransform: "none", width: "40%", mb: { xs: 3, md: 3 },
                        }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                                        edge="end"
                                    >
                                        {showRepeatPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </div>
                <div>
                    <TextField
                        required={true}
                        label={"Email"}
                        variant="standard"
                        name={"email"}
                        value={registerFormEntries.email}
                        onChange={(event) => {
                            const emailValue = event.target.value;
                            setRegisterFormEntries((prev) => ({ ...prev, email: emailValue }));
                            // E-mail validation
                            const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                            if (!emailRegex.test(emailValue)) {
                                setEmailError("Invalid email format");
                            } else {
                                setEmailError(null);
                            }
                        }}
                        error={!!emailError}
                        helperText={emailError}
                        sx={{
                            textTransform: "none", width: "40%", mb: { xs: 3, md: 3 },
                        }}
                    />
                </div>
                <div>
                    <TextField
                        required={true}
                        label={"Phone"}
                        variant="standard"
                        name={"phone"}
                        value={registerFormEntries.phone}
                        onChange={(event) => {
                            const phoneValue = event.target.value;
                            setRegisterFormEntries((prev) => ({ ...prev, phone: phoneValue }));

                            // Phone number validation
                            const phoneRegex = /^\d{9}$/;
                            if (!phoneRegex.test(phoneValue)) {
                                setPhoneError("Invalid phone number format. Please enter 9 digits.");
                            } else {
                                setPhoneError(null);
                            }
                        }}
                        error={!!phoneError}
                        helperText={phoneError}
                        sx={{
                            textTransform: "none", width: "40%", mb: { xs: 3, md: 3 },
                        }}
                    />
                </div>
                <div>
                    <TextField
                        required={true}
                        label={"City"}
                        variant="standard"
                        name={"city"}
                        value={registerFormEntries.city}
                        onChange={(event) => {
                            const cityValue = event.target.value;
                            setRegisterFormEntries((prev) => ({ ...prev, city: cityValue }));

                            // City validation
                            const cityRegex = /^[^\d]+$/;
                            if (!cityRegex.test(cityValue)) {
                                setCityError("City cannot contain numbers.");
                            } else {
                                setCityError(null);
                            }
                        }}
                        error={!!cityError}
                        helperText={cityError}
                        sx={{
                            textTransform: "none", width: "40%", mb: { xs: 3, md: 3 },
                        }}
                    />
                </div>
                <div>
                    <TextField
                        required={true}
                        label={"Street"}
                        variant="standard"
                        name={"street"}
                        value={registerFormEntries.street}
                        onChange={(event) => {
                            setRegisterFormEntries((prev) => ({ ...prev, street: event.target.value }));
                        }}
                        sx={{
                            textTransform: "none", width: "40%", mb: { xs: 3, md: 3 },
                        }}
                    />
                </div>
                <br />
                <div>
                    <Button
                        variant="contained"
                        type="submit"
                        sx={{
                            textTransform: "none",
                            width: "40%",
                            mb: { xs: 3, md: 3 },
                            backgroundColor: palette.umber,
                            '&:hover': {
                                backgroundColor: palette.current,
                            },
                        }}
                    >
                        Submit
                    </Button>
                </div>
            </form>
        </>
    );
}
export default RegisterForm;