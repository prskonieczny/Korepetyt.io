import {Box, Typography, TextField, Button, InputAdornment, FormGroup, FormControlLabel, Checkbox, Grid} from "@mui/material";
import React, { useState } from "react";
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
        levels: string[],
        subjects: string[]
    },
    setRegisterFormEntries: React.Dispatch<React.SetStateAction<{
        username: string,
        password: string,
        email: string,
        phone: string,
        city: string,
        street: string,
        levels: string[],
        subjects: string[]
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

    const [subjectState, setSubjectState] = React.useState({
        mathematics: false,
        physics: false,
        chemistry: false,
        english: false,
        geography: false,
        literacy: false,
        music: false,
        information_technology: false,
    });

    const [levelState, setLevelState] = React.useState({
        primary_school: false,
        middle_school: false,
        high_school: false,
        university: false,
    });

    const handleChangeLevels = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLevelState({
            ...levelState,
            [event.target.name]: event.target.checked,
        });
    };

    const handleChangeSubjects = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSubjectState({
            ...subjectState,
            [event.target.name]: event.target.checked,
        });
    };

    const { mathematics, physics, chemistry, english, geography, literacy, music, information_technology } = subjectState;
    const {primary_school, middle_school, high_school, university} = levelState;

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
                <Grid container>
                    <Grid xs={6}>
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
                            sx={{ textTransform: "none", width: "70%", mb: { xs: 3, md: 3 } }}
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
                                textTransform: "none", width: "70%", mb: { xs: 3, md: 3 },
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
                                textTransform: "none", width: "70%", mb: { xs: 3, md: 3 },
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
                                textTransform: "none", width: "70%", mb: { xs: 3, md: 3 },
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
                                textTransform: "none", width: "70%", mb: { xs: 3, md: 3 },
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
                                textTransform: "none", width: "70%", mb: { xs: 3, md: 3 },
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
                                textTransform: "none", width: "70%", mb: { xs: 3, md: 3 },
                            }}
                        />
                    </div>
                        </Grid>
                        <Grid xs={5}>
                    <div>
                        <Typography variant="h6" fontFamily={"Nunito"} fontStyle={palette.gray} sx={{ alignContent: 'left' }}>Choose subjects you are interested in *:</Typography>
                        <FormGroup>
                            <Grid container>
                                <Grid xs={5}>
                            <FormControlLabel
                                control={
                                    <Checkbox sx={{
                                        color: palette.umber,
                                        '&.Mui-checked': {
                                            color: palette.umber,
                                        },
                                    }} checked={mathematics} onChange={handleChangeSubjects} name="mathematics" />
                                }
                                label="Mathematics"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox sx={{
                                        color: palette.umber,
                                        '&.Mui-checked': {
                                            color: palette.umber,
                                        },
                                    }}  checked={physics} onChange={handleChangeSubjects} name="physics" />
                                }
                                label="Physics"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox sx={{
                                        color: palette.umber,
                                        '&.Mui-checked': {
                                            color: palette.umber,
                                        },
                                    }}  checked={chemistry} onChange={handleChangeSubjects} name="chemistry" />
                                }
                                label="Chemistry"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox sx={{
                                        color: palette.umber,
                                        '&.Mui-checked': {
                                            color: palette.umber,
                                        },
                                    }}  checked={english} onChange={handleChangeSubjects} name="english" />
                                }
                                label="English"
                            />
                                </Grid>
                                <Grid xs={4}>
                            <FormControlLabel
                                control={
                                    <Checkbox sx={{
                                        color: palette.umber,
                                        '&.Mui-checked': {
                                            color: palette.umber,
                                        },
                                    }}  checked={geography} onChange={handleChangeSubjects} name="geography" />
                                }
                                label="Geography"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox sx={{
                                        color: palette.umber,
                                        '&.Mui-checked': {
                                            color: palette.umber,
                                        },
                                    }}  checked={literacy} onChange={handleChangeSubjects} name="literacy" />
                                }
                                label="Literacy"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox sx={{
                                        color: palette.umber,
                                        '&.Mui-checked': {
                                            color: palette.umber,
                                        },
                                    }}  checked={music} onChange={handleChangeSubjects} name="music" />
                                }
                                label="Music"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox sx={{
                                        color: palette.umber,
                                        '&.Mui-checked': {
                                            color: palette.umber,
                                        },
                                    }}  checked={information_technology} onChange={handleChangeSubjects} name="information_technology" />
                                }
                                label="IT"
                            />
                                </Grid>
                            </Grid>
                        </FormGroup>
                        <br />
                        <Typography variant="h6" fontFamily={"Nunito"} fontStyle={palette.gray} sx={{ alignContent: 'left' }}>Choose your levels: *</Typography>
                        <FormGroup>
                            <Grid container>
                            <Grid xs={5}>
                            <FormControlLabel
                                control={
                                    <Checkbox sx={{
                                        color: palette.umber,
                                        '&.Mui-checked': {
                                            color: palette.umber,
                                        },
                                    }}  checked={primary_school} onChange={handleChangeLevels} name="primary_school" />
                                }
                                label="Primary school"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox sx={{
                                        color: palette.umber,
                                        '&.Mui-checked': {
                                            color: palette.umber,
                                        },
                                    }}  checked={middle_school} onChange={handleChangeLevels} name="middle_school" />
                                }
                                label="Middle school"
                            />
                            </Grid>
                            <Grid xs={5}>
                            <FormControlLabel
                                control={
                                    <Checkbox sx={{
                                        color: palette.umber,
                                        '&.Mui-checked': {
                                            color: palette.umber,
                                        },
                                    }}  checked={high_school} onChange={handleChangeLevels} name="high_school" />
                                }
                                label="High school"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox sx={{
                                        color: palette.umber,
                                        '&.Mui-checked': {
                                            color: palette.umber,
                                        },
                                    }}  checked={university} onChange={handleChangeLevels} name="university" />
                                }
                                label="University"
                            />
                            </Grid>
                            </Grid>
                        </FormGroup>
                        <br /><br />
                        <Typography variant="h5" fontFamily={"Nunito"} fontStyle={palette.gray} sx={{ alignContent: 'left' }}>Remember!</Typography>
                        <Typography variant="h6" fontFamily={"Nunito"} fontStyle={palette.gray} sx={{ alignContent: 'left' }}>All of your choices can be changed
                            later in your account settings.</Typography>

                    </div>
                        </Grid>
                    <div>
                        <Button
                            variant="contained"
                            type="submit"
                            sx={{
                                textTransform: "none",
                                alignItems: "center",
                                width: "42vh",
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
                </Grid>
            </form>
        </>
    );
}
export default RegisterForm;