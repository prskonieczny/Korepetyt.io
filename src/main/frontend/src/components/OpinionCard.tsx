import {
    Alert,
    Box,
    Button,
    Dialog, DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Grid, MenuItem,
    Rating, Select,
    Snackbar, TextField,
    Typography
} from "@mui/material";
import React, {Dispatch, FormEvent, SetStateAction, useEffect, useState} from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import {IAddOpinionData, IOpinionData} from "../util/opinionData";
import {IAccountData} from "../util/data";
import OpinionService from "../services/OpinionService";
import {palette} from "../colors";
import {IAddAnnouncementData} from "../util/announcementData";
import AnnouncementService from "../services/announcementService";
import AuthService from "../services/authService";

export interface OpinionCardProps {
    account: IAccountData | undefined,
    opinions: IOpinionData[],
    setOwnOpinions?: Dispatch<SetStateAction<IOpinionData[]>>,
    refreshOpinions?: () => void
}

const OpinionCard = ({
                         account, opinions, setOwnOpinions, refreshOpinions
}: OpinionCardProps) => {

    const loggedUser = AuthService.getCurrentUser();
    const roles = AuthService.getUserRoles();

    const getStarRatingFromEnum = (starReview: string): number => {
        switch (starReview) {
            case 'ONE':
                return 1;
            case 'TWO':
                return 2;
            case 'THREE':
                return 3;
            case 'FOUR':
                return 4;
            case 'FIVE':
                return 5;
            default:
                return 0;
            }
        }

    //Snackbars
    const [snackbarInfo, setSnackbarInfo] = useState({ open: false, message: ""});
    const [snackbarErrorInfo, setSnackbarErrorInfo] = useState({ open: false, message: ""});
    const handleCloseSnackbar = () => {
        setSnackbarInfo({ ...snackbarInfo, open: false });
    };
    const handleCloseErrorSnackbar = () => {
        setSnackbarErrorInfo({ ...snackbarInfo, open: false });
    };

    function deleteOpinionHandler(id: number) {
        OpinionService.deleteOpinion(id)
            .then(() => {
                console.log("usunieto ogloszenie " + id);
                if (setOwnOpinions) {
                    setOwnOpinions((prevOpinions) => {
                        return prevOpinions.filter((opinion) => opinion.opinionId !== id);
                    });
                }
                setSnackbarInfo({ open: true, message: "Opinion deleted successfully"});
            })
            .catch((error) => {
                setSnackbarErrorInfo({ open: true, message: "Opinion could not be deleted"});
            });
    }

    // dodanie opinii
    const [starReview, setStarReview] = useState<string>('THREE');
    const [opinionContent, setOpinionContent] = useState('');
    const [opinionPros, setOpinionPros] = useState('');
    const [opinionCons, setOpinionCons] = useState('');

    const [addOpen, setAddOpen] = useState(false);
    const handleAddClose = () => {
        setAddOpen(false);
    };
    const handleAddOpen = () => {
        setAddOpen(true);
    }

    const addOpinionHandler = async (
        e: FormEvent,
        starReview: string,
        opinionContent: string,
        opinionPros: string,
        opinionCons: string,
        teacherUsername: string | undefined
    ) => {
        e.preventDefault();
        const newOpinionData: IAddOpinionData = {
            starReview,
            opinionContent,
            opinionPros,
            opinionCons,
            teacherUsername,
        };
        try {
            await OpinionService.addOpinion(newOpinionData).then(() => {
                if (refreshOpinions) {
                    refreshOpinions();
                }
                setSnackbarInfo({ open: true, message: "Opinion added successfully" });
            })
        } catch (error) {
            setSnackbarErrorInfo({ open: true, message: "Opinion could not be added" });
        }
    };

    function convertStarReviews(rating: string) {
        if(rating === "ONE") {
            return 1;
        }
        if(rating === "TWO") {
            return 2;
        }
        if(rating === "THREE") {
            return 3;
        }
        if(rating === "FOUR") {
            return 4;
        }
        if(rating === "FIVE") {
            return 5;
        }
        return 5;
    }

    const convertNumberToStarReview = (value: number | null): string => {
        switch (value) {
            case 1:
                return "ONE";
            case 2:
                return "TWO";
            case 3:
                return "THREE";
            case 4:
                return "FOUR";
            case 5:
                return "FIVE";
            default:
                return "FIVE";
        }
    };

    const AddOpinionDialog = (
        <Dialog open={addOpen}
                onClose={handleAddClose}
                sx={{color: palette.current}}
                PaperProps={{
                    component: 'form',
                    onSubmit: async (event: React.FormEvent<HTMLFormElement>) => {
                        event.preventDefault();
                        await addOpinionHandler(
                            event,
                            starReview,
                            opinionContent,
                            opinionPros,
                            opinionCons,
                            account?.username
                        ).then(handleAddClose);
                    },
                }}
        >
            <DialogTitle>Create new opinion</DialogTitle>
            <DialogContent>
                <Rating
                    name="starReview"
                    value={convertStarReviews(starReview)}
                    onChange={(event, value) => {
                        setStarReview(convertNumberToStarReview(value));
                    }}
                />
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="opinionContent"
                    name="opinionContent"
                    label="Opinion Content"
                    fullWidth
                    variant="standard"
                    multiline
                    value={opinionContent}
                    onChange={(e) => setOpinionContent(e.target.value)}
                />
                <TextField
                    margin="dense"
                    id="opinionPros"
                    name="opinionPros"
                    label="Pros"
                    fullWidth
                    variant="standard"
                    multiline
                    value={opinionPros}
                    onChange={(e) => setOpinionPros(e.target.value)}
                />
                <TextField
                    margin="dense"
                    id="opinionCons"
                    name="opinionCons"
                    label="Cons"
                    fullWidth
                    variant="standard"
                    multiline
                    value={opinionCons}
                    onChange={(e) => setOpinionCons(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleAddClose}>Cancel</Button>
                <Button type="submit" onClick={() => {
                    handleAddClose();
                }}>Submit</Button>
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
            {AddOpinionDialog}
            <Snackbar
                open={snackbarInfo.open}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
            >
                <Alert onClose={handleCloseSnackbar} severity="success">
                    {snackbarInfo.message}
                </Alert>
            </Snackbar>
            <Snackbar
                open={snackbarErrorInfo.open}
                autoHideDuration={6000}
                onClose={handleCloseErrorSnackbar}
            >
                <Alert onClose={handleCloseErrorSnackbar} severity="error">
                    {snackbarErrorInfo.message}
                </Alert>
            </Snackbar>

            {account?.roles.some(role => role.permissionLevel === 'TEACHER') && (
                <Typography variant={"h6"}>Other student's opinions:</Typography>
            )}
            {(
                roles.includes('STUDENT')
                && account?.username !== loggedUser
            ) && (
                <div>
                    <Button
                        sx={{backgroundColor: palette.umber, color: 'white'}}
                        onClick={() => {
                            handleAddOpen();
                            console.log("dodaj opnie dla: " + account?.username)
                        }}
                    >
                        Rate this teacher
                    </Button>
                </div>
            )}
            {opinions.map((opinion) => (
                <Grid container key={opinion.opinionId}>
                    <Grid xs={10}>
                        <Typography>{opinion.creationDate.toString()}</Typography>
                        <Rating value={getStarRatingFromEnum(opinion.starReview)} readOnly />
                        <Typography>{opinion.opinionContent}</Typography>
                        <Typography>+ {opinion.opinionPros}</Typography>
                        <Typography>- {opinion.opinionCons}</Typography>
                        <Divider/>
                    </Grid>
                    {account?.roles.some(role => role.permissionLevel === 'STUDENT') && (
                        <Grid xs={2}>
                            <Button onClick={() => {
                                deleteOpinionHandler(opinion.opinionId);
                                console.log(opinion.opinionId);
                            }}>
                                <DeleteIcon
                                    style={{
                                        fontSize: 'xx-large',
                                        color: palette.umber,
                                    }}
                                />
                            </Button>
                        </Grid>
                    )}
                </Grid>
            ))}
        </Box>
    );
}
export default OpinionCard;