import {
    Alert,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, Snackbar,
    TextField
} from "@mui/material";
import React, {FormEvent, useState} from "react";
import {palette} from "../colors";
import {IAccountData, IChangeAccountDetailsData} from "../util/data";
import AccountService from "../services/accountService";

export interface EditAccountDetailsProps {
    account: IAccountData | undefined,
    onAccountEdit: (username: string | undefined) => void,
    handleClickEditAccountOpen: () => void,
    editOpen: boolean,
    handleEditAccountClose: () => void,
    handleAccountEditSnackbar: (isError: boolean, flag: boolean, msg: string) => void,
}


const EditAccountDetails = ({
                                account,
                                onAccountEdit,
                                handleClickEditAccountOpen,
                                editOpen,
                                handleEditAccountClose,
                                handleAccountEditSnackbar
                            }: EditAccountDetailsProps) => {

    const [open, setOpen] = React.useState(false);

    const [username, setUsername] = useState('');
    const [phone, setPhone] = useState('');
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');

    const [snackbarInfo, setSnackbarInfo] = useState({ message: ""});
    const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

    const handleChangeAccountDetails = async (e: FormEvent) => {
        e.preventDefault();
        const changeEmailData: IChangeAccountDetailsData = {
            username,
            phone,
            city,
            street
        }
        try {
            await AccountService.changeOwnAccountDetails(changeEmailData).then(() => {
                if (onAccountEdit) {
                    onAccountEdit(username);
                }
                if (handleAccountEditSnackbar) {
                    handleAccountEditSnackbar(false,true, "Account edited successfully");
                }
            })
        } catch (error) {
            if (handleAccountEditSnackbar) {
                handleAccountEditSnackbar(true, true, "Error editing account");
            }
        }
    }

    return (
        <Dialog
            open={editOpen}
            onClose={handleEditAccountClose}
            PaperProps={{
                component: 'form',
                onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                    event.preventDefault();
                    handleChangeAccountDetails(event).then(handleEditAccountClose);
                },
            }}
        >
            <DialogTitle>Edit account</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Change your account details.
                </DialogContentText>
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="username"
                    name="username"
                    label="Username"
                    fullWidth
                    variant="standard"
                    onChange={(e) => {
                        setUsername(e.target.value);
                    }}
                />
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="phone"
                    name="phone"
                    label="Phone"
                    fullWidth
                    variant="standard"
                    onChange={(e) => {
                        setPhone(e.target.value);
                    }}
                />
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="city"
                    name="city"
                    label="City"
                    fullWidth
                    variant="standard"
                    onChange={(e) => {
                        setCity(e.target.value);
                    }}
                />
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="street"
                    name="street"
                    label="Street"
                    fullWidth
                    variant="standard"
                    onChange={(e) => {
                        setStreet(e.target.value);
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleEditAccountClose} sx={{backgroundColor: palette.champagne, color: 'black'}}
                >Cancel</Button>
                <Button type="submit" sx={{backgroundColor: palette.champagne, color: 'black'}}
                        disabled={(
                            username === ''
                            || city === ''
                            || street === ''
                            || phone === ''
                        )}
                >Apply</Button>
            </DialogActions>
        </Dialog>
    )
}
export default EditAccountDetails;