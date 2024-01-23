import {IAccountData, IChangePasswordData} from "../util/data";
import {
    Box,
    Button, Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, InputAdornment,
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

export interface ProfileCardProps {
    account: IAccountData | undefined
}

const ProfileCard = ({account}: ProfileCardProps) => {

    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setNewShowPassword] = useState(false);
    const [showRPassword, setShowRPassword] = useState(false);

    const handleChangeOwnPassword = async (e: FormEvent) => {
        e.preventDefault();
        const changePasswordData: IChangePasswordData = {
            oldPassword, newPassword,
        }
        if (newPassword !== repeatPassword) {
            console.log("XD")
        }
        try {
            await AccountService.changeOwnPassword(changePasswordData).then(() => {

            })
        } catch (error) {
            console.log("zle");
        }
    }

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
                        onChange={(e) => setOldPassword(e.target.value)}
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
                        onChange={(e) => setNewPassword(e.target.value)}
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
                        onChange={(e) => setRepeatPassword(e.target.value)}
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
                <Button onClick={handleClose} sx={{backgroundColor: palette.champagne, color: 'black'}} >Cancel</Button>
                <Button type="submit" sx={{backgroundColor: palette.champagne, color: 'black'}} >Apply</Button>
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
            {changePasswordDialog}
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
                    <AlternateEmailIcon fontSize={"large"} sx={{color: palette.current}}>Edit email</AlternateEmailIcon>
                </Button>
            </Box>
        </Box>
    )
}
export default ProfileCard;