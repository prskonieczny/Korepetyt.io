import {Grid, TextField, Typography, Button, Box, InputAdornment, Paper} from "@mui/material";
import { Link, useNavigate } from "react-router-dom"
import { palette } from "../colors";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {useState} from "react";

interface LoginFormProps {
    loginFormEntries: { username: string, password: string },
    setLoginFormEntries: React.Dispatch<React.SetStateAction<{
        username: string,
        password: string,
    }>>,
    loginFormSubmit: (event: React.FormEvent) => void,
    error: { username: string, password: string },
    setError: React.Dispatch<React.SetStateAction<{ username: string, password: string }>>,
    isLoading: boolean,
    errorMessage: string
}

const LoginForm = ({
    loginFormEntries,
    setLoginFormEntries,
    loginFormSubmit,
    error,
    setError,
    isLoading,
    errorMessage,
}: LoginFormProps) => {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

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
                    Welcome back!
                </Typography>
                <Typography variant="h5" fontFamily={"Nunito"} fontStyle={palette.gray} sx={{ alignContent: 'left' }}>
                    Continue learning
                </Typography>
            </Box>
            <br />
            <form onSubmit={loginFormSubmit}>
                <div>
                    <TextField
                        required={true}
                        label={"Username"}
                        variant="standard"
                        name={"username"}
                        value={loginFormEntries.username}
                        onChange={(event) => {
                            setLoginFormEntries((prev) => ({ ...prev, username: event.target.value }));
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
                        type={showPassword ? "text" : "password"}
                        value={loginFormEntries.password}
                        onChange={(event) => {
                            setLoginFormEntries((prev) => ({ ...prev, password: event.target.value }));
                        }}
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
export default LoginForm;