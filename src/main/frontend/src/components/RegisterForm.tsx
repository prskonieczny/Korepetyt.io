import { Box, Typography, TextField, Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { palette } from "../colors";
import { defaultMaxListeners } from "events";

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

    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

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
                            setRegisterFormEntries((prev) => ({ ...prev, password: event.target.value }));
                        }}
                        sx={{
                            textTransform: "none", width: "40%", mb: { xs: 3, md: 3 },
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
                            setRegisterFormEntries((prev) => ({ ...prev, email: event.target.value }));
                        }}
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
                            setRegisterFormEntries((prev) => ({ ...prev, phone: event.target.value }));
                        }}
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
                            setRegisterFormEntries((prev) => ({ ...prev, city: event.target.value }));
                        }}
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