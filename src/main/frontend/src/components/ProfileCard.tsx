import {IAccountData, IChangeEmailData, IChangePasswordData} from "../util/data";
import {
    Alert,
    Box,
    Button, Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, InputAdornment, Snackbar,
    TextField,
    Typography
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {palette} from "../colors";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PasswordIcon from '@mui/icons-material/Password';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import React, {FormEvent, useState} from "react";
import AccountService from "../services/accountService";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ProfilePage from "../pages/ProfilePage";

export interface ProfileCardProps {
    account: IAccountData | undefined,
    onEmailChange: (email: string) => void
}

const ProfileCard = ({account, onEmailChange }: ProfileCardProps) => {
    //changePassword
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    //changeEmail
    const [emailOpen, setEmailOpen] = React.useState(false);
    const handleClickEmailOpen = () => {
        setEmailOpen(true);
    };
    const handleEmailClose = () => {
        setEmailOpen(false);
    };

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setNewShowPassword] = useState(false);
    const [showRPassword, setShowRPassword] = useState(false);

    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [repeatPasswordError, setRepeatPasswordError] = useState<string | null>(null);

    const [email, setEmail] = useState('');

    const [emailError, setEmailError] = useState<string | null>(null);

    const handleChangeOwnPassword = async (e: FormEvent) => {
        e.preventDefault();
        const changePasswordData: IChangePasswordData = {
            oldPassword, newPassword,
        }
        try {
            await AccountService.changeOwnPassword(changePasswordData).then(() => {
                setSnackbarInfo({ open: true, message: "Password changed successfully"});
            })
        } catch (error) {
            setSnackbarErrorInfo({ open: true, message: "Error changing password"});
        }
    }

    const handleChangeEmail = async (e: FormEvent) => {
        e.preventDefault();
        const changeEmailData: IChangeEmailData = {
            email,
        }
        try {
            await AccountService.changeOwnEmail(changeEmailData).then(() => {
                setSnackbarInfo({ open: true, message: "Email changed successfully"});
                if (onEmailChange) {
                    onEmailChange(email);
                }
            })
        } catch (error) {
            setSnackbarErrorInfo({ open: true, message: "Error changing email"});
        }
    }

    const [snackbarInfo, setSnackbarInfo] = useState({ open: false, message: ""});
    const [snackbarErrorInfo, setSnackbarErrorInfo] = useState({ open: false, message: ""});

    const handleCloseSnackbar = () => {
        setSnackbarInfo({ ...snackbarInfo, open: false });
    };
    const handleCloseErrorSnackbar = () => {
        setSnackbarErrorInfo({ ...snackbarInfo, open: false });
    };

    const passwordChangeSuccessSnackbar = (
        <Snackbar
            open={snackbarInfo.open}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
        >
            <Alert onClose={handleCloseSnackbar} severity="success">
                {snackbarInfo.message}
            </Alert>
        </Snackbar>
    )

    const passwordChangeErrorSnackbar = (
        <Snackbar
            open={snackbarErrorInfo.open}
            autoHideDuration={6000}
            onClose={handleCloseErrorSnackbar}
        >
            <Alert onClose={handleCloseErrorSnackbar} severity="error">
                {snackbarErrorInfo.message}
            </Alert>
        </Snackbar>
    )

    const changePasswordDialog = (
        <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{
                component: 'form',
                onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                    event.preventDefault();
                    handleChangeOwnPassword(event).then(handleClose);
                },
            }}
        >
            <DialogTitle>Change password</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Change your own password.
                </DialogContentText>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="old password"
                        name="old password"
                        label="Old password"
                        fullWidth
                        variant="standard"
                        onChange={(e) => {
                            setOldPassword(e.target.value);
                        }}
                        type={showPassword ? "text" : "password"}
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
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="new password"
                        name="new password"
                        label="New password"
                        fullWidth
                        variant="standard"
                        onChange={(e) => {
                            const passwordValue = e.target.value;
                            setNewPassword(passwordValue);
                            // Password validation
                            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}|:"<>?])[\w!@#$%^&*()_+{}|:"<>?]{8,16}$/;
                            if (!passwordRegex.test(passwordValue)) {
                                setPasswordError("Invalid password format. Password must be 8-16 characters, with at least one lowercase, one uppercase letter, and one special character.");
                            } else {
                                setPasswordError(null);
                            }
                        }}
                        error={!!passwordError}
                        helperText={passwordError}
                        type={showNewPassword ? "text" : "password"}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setNewShowPassword(!showNewPassword)}
                                        edge="end"
                                    >
                                        {showNewPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="repeatPassword"
                        name="repeatPassword"
                        label="Repeat Password"
                        fullWidth
                        variant="standard"
                        onChange={(e) => {
                            const repeatPasswordValue = e.target.value;
                            setRepeatPassword(repeatPasswordValue);
                            // Repeat password validation
                            if (repeatPasswordValue !== newPassword) {
                                setRepeatPasswordError("Passwords do not match.");
                            } else {
                                setRepeatPasswordError(null);
                            }
                        }}
                        error={!!repeatPasswordError}
                        helperText={repeatPasswordError}
                        type={showRPassword ? "text" : "password"}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setShowRPassword(!showRPassword)}
                                        edge="end"
                                    >
                                        {showRPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} sx={{backgroundColor: palette.champagne, color: 'black'}}
                >Cancel</Button>
                <Button type="submit" sx={{backgroundColor: palette.champagne, color: 'black'}}
                        disabled={(passwordError !== null || repeatPasswordError !== null || newPassword === '' || repeatPassword === '')}
                >Apply</Button>
            </DialogActions>
        </Dialog>
    )

    const changeEmailDialog = (
        <Dialog
            open={emailOpen}
            fullWidth
            onClose={handleEmailClose}
            PaperProps={{
                component: 'form',
                onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                    event.preventDefault();
                    handleChangeEmail(event).then(handleEmailClose);
                },
            }}
        >
            <DialogTitle>Change Email</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Change your own email
                </DialogContentText>
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="new email"
                    name="new email"
                    label="New email"
                    fullWidth
                    variant="standard"
                    onChange={(e) => {
                        const emailValue = e.target.value;
                        setEmail(emailValue);
                        // E-mail validation
                        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                        if (!emailRegex.test(emailValue)) {
                            setEmailError("Invalid email format");
                        } else {
                            setEmailError(null);
                        }
                        if (emailValue === account?.email) {
                            setEmailError("You already use this email");
                        } else {
                            setEmailError(null);
                        }
                    }}
                    error={!!emailError}
                    helperText={emailError}
                    type={"email"}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleEmailClose} sx={{backgroundColor: palette.champagne, color: 'black'}}
                >Cancel</Button>
                <Button type="submit" sx={{backgroundColor: palette.champagne, color: 'black'}}
                        disabled={(emailError !== null || email === '')}
                >Apply</Button>
            </DialogActions>
        </Dialog>
    )

    return (
        <Box
            margin="50px auto"
            padding="20px"
            border="3px solid #772E25"
            borderRadius="8px"
            maxWidth="400px"
        >
            {passwordChangeErrorSnackbar}
            {passwordChangeSuccessSnackbar}
            {changePasswordDialog}
            {changeEmailDialog}
            <Box textAlign="center">
                <AccountCircleIcon
                    sx={{ color: palette.current, fontSize: "50px", mr: 1.5 }}
                />
            </Box>
            <Typography sx={{ fontSize: "14px", color: palette.umber }}>
                Username: {account?.username}</Typography>
            <Typography sx={{ fontSize: "14px", color: palette.umber }}>
                Email: {account?.email}</Typography>
            <Typography sx={{ fontSize: "14px", color: palette.umber }}>Phone number: {account?.phone}</Typography>
            <Typography sx={{ fontSize: "14px", color: palette.umber }}>City: {account?.city}</Typography>
            <Typography sx={{ fontSize: "14px", color: palette.umber }}>Street: {account?.street}</Typography>
            <Typography sx={{ fontSize: "14px", color: palette.umber }}>
                Roles: {account?.roles.map(role => role.permissionLevel.toLowerCase()).join(", ")}</Typography>
            <Typography sx={{ fontSize: "14px", color: palette.umber }}>
                Levels: {account?.levels.map(level => level.replace("_", " ").toLowerCase()).join(", ")}</Typography>
            <Typography sx={{ fontSize: "14px", color: palette.umber }}>
                Subjects: {account?.subjects.map(subject => subject.toLowerCase()).join(", ")}</Typography>
            <br/>
            <Box textAlign="center">
                <Button>
                    <ManageAccountsIcon fontSize={"large"} sx={{color: palette.current}}>Edit account</ManageAccountsIcon>
                </Button>
                &emsp;
                <Button>
                    <PasswordIcon
                        fontSize={"large"}
                        sx={{color: palette.current}}
                        onClick={handleClickOpen}
                    >Edit password</PasswordIcon>
                </Button>
                &emsp;
                <Button>
                    <AlternateEmailIcon fontSize={"large"}
                                        sx={{color: palette.current}}
                                        onClick={handleClickEmailOpen}
                    >Edit email</AlternateEmailIcon>
                </Button>
            </Box>
        </Box>
    )
}
export default ProfileCard;