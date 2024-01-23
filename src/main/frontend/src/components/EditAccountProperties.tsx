import React, {FormEvent, useState} from "react";
import {
    Button, Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, FormControlLabel, FormGroup, Grid,
    Paper,
    Typography
} from "@mui/material";
import {palette} from "../colors";
import {IAccountData, IEditAccountPropertiesData} from "../util/data";
import AccountService from "../services/accountService";

export interface EditAccountPropertiesProps {
    account: IAccountData | undefined,
    onPropertiesEdit: (key: string | any) => void,
    editPropertiesOpen: boolean,
    handleClickPropertiesAccountOpen: () => void,
    handleClickPropertiesAccountClose: () => void,
}

const EditAccountProperties = ({
                                   account,
                                   onPropertiesEdit,
                                   editPropertiesOpen,
                                   handleClickPropertiesAccountOpen,
                                   handleClickPropertiesAccountClose
}: EditAccountPropertiesProps) => {

    const [accountProperties, setAccountProperties] = useState<IEditAccountPropertiesData[]>([]);

    const [subjectState, setSubjectState] = React.useState({
        MATHEMATICS: false,
        PHYSICS: false,
        CHEMISTRY: false,
        ENGLISH: false,
        GEOGRAPHY: false,
        LITERACY: false,
        MUSIC: false,
        INFORMATION_TECHNOLOGY: false,
    });

    const [levelState, setLevelState] = React.useState({
        PRIMARY_SCHOOL: false,
        MIDDLE_SCHOOL: false,
        HIGH_SCHOOL: false,
        UNIVERSITY: false,
    });

    const { MATHEMATICS, PHYSICS, CHEMISTRY, ENGLISH, GEOGRAPHY, LITERACY, MUSIC, INFORMATION_TECHNOLOGY } = subjectState;
    const { PRIMARY_SCHOOL, MIDDLE_SCHOOL, HIGH_SCHOOL, UNIVERSITY} = levelState

    const handleChangeLevels = (event: React.ChangeEvent<HTMLInputElement>) => {
        const levelName = event.target.name;
        const isChecked = event.target.checked;
        setLevelState(prevState => ({
            ...prevState,
            [levelName]: isChecked,
        }));
        setAccountProperties(prevState => {
            const updatedProperties = [...prevState];
            const existingProperty = updatedProperties.find(property => property.newLevels.includes(levelName));
            if (existingProperty) {
                // Property with the same level already exists, update it
                existingProperty.newLevels = isChecked
                    ? [...existingProperty.newLevels, levelName]
                    : existingProperty.newLevels.filter(item => item !== levelName);
            } else {
                // No property with the level, create a new one
                updatedProperties.push({
                    newLevels: isChecked ? [levelName] : [],
                    newSubjects: [], // Add subjects or other properties if needed
                });
            }
            return updatedProperties;
        });
        console.log(accountProperties);
    };

    const handleChangeSubjects = (event: React.ChangeEvent<HTMLInputElement>) => {
        const subjectName = event.target.name;
        const isChecked = event.target.checked;
        setSubjectState(prevState => ({
            ...prevState,
            [subjectName]: isChecked,
        }));
        setAccountProperties(prevState => {
            const updatedProperties = [...prevState];
            const existingProperty = updatedProperties.find(property => property.newSubjects.includes(subjectName));
            if (existingProperty) {
                // Property with the same subject already exists, update it
                existingProperty.newSubjects = isChecked
                    ? [...existingProperty.newSubjects, subjectName]
                    : existingProperty.newSubjects.filter(item => item !== subjectName);
            } else {
                // No property with the subject, create a new one
                updatedProperties.push({
                    newLevels: [], // Add levels or other properties if needed
                    newSubjects: isChecked ? [subjectName] : [],
                });
            }
            return updatedProperties;
        });
        console.log(accountProperties);
    };

    const handleChangeAccountProperties = async (e: FormEvent) => {
        e.preventDefault();
        const changeAccountPropertiesData: IEditAccountPropertiesData = {
            newLevels: accountProperties.flatMap(property => property.newLevels),
            newSubjects: accountProperties.flatMap(property => property.newSubjects),
        };
        try {
            await AccountService.editAccountProperties(account?.id, changeAccountPropertiesData).then(() => {
                if (onPropertiesEdit) {
                    onPropertiesEdit({});
                }
            });
        } catch (error) {
            console.log("nie działa");
        }
    };

    return (
        <Dialog
            open={editPropertiesOpen}
            onClose={handleClickPropertiesAccountClose}
            PaperProps={{
                component: 'form',
                onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                    event.preventDefault();
                    handleChangeAccountProperties(event).then(handleClickPropertiesAccountClose);
                },
            }}
        >
            <DialogTitle>Choose your preferences</DialogTitle>
            <DialogContent>
                    <Typography fontStyle={palette.gray} sx={{ alignContent: 'left' }}>Choose subjects you are interested in:</Typography>
                    <FormGroup>
                        <Grid container>
                            <Grid xs={4}>
                                <FormControlLabel
                                    control={
                                        <Checkbox sx={{
                                            color: palette.umber,
                                            '&.Mui-checked': {
                                                color: palette.umber,
                                            },
                                        }} checked={MATHEMATICS} onChange={handleChangeSubjects} name="MATHEMATICS" />
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
                                        }} checked={PHYSICS} onChange={handleChangeSubjects} name="PHYSICS" />
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
                                        }} checked={CHEMISTRY} onChange={handleChangeSubjects} name="CHEMISTRY" />
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
                                        }} checked={ENGLISH} onChange={handleChangeSubjects} name="ENGLISH" />
                                    }
                                    label="English"
                                />
                            </Grid>
                            <Grid xs={3}>
                                <FormControlLabel
                                    control={
                                        <Checkbox sx={{
                                            color: palette.umber,
                                            '&.Mui-checked': {
                                                color: palette.umber,
                                            },
                                        }} checked={GEOGRAPHY} onChange={handleChangeSubjects} name="GEOGRAPHY" />
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
                                        }} checked={LITERACY} onChange={handleChangeSubjects} name="LITERACY" />
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
                                        }} checked={MUSIC} onChange={handleChangeSubjects} name="MUSIC" />
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
                                        }} checked={INFORMATION_TECHNOLOGY} onChange={handleChangeSubjects} name="INFORMATION_TECHNOLOGY" />
                                    }
                                    label="IT"
                                />
                            </Grid>
                        </Grid>
                    </FormGroup>
                    <Typography fontStyle={palette.gray} sx={{ alignContent: 'left' }}>Choose your levels:</Typography>
                    <FormGroup>
                        <Grid container>
                            <Grid xs={4}>
                                <FormControlLabel
                                    control={
                                        <Checkbox sx={{
                                            color: palette.umber,
                                            '&.Mui-checked': {
                                                color: palette.umber,
                                            },
                                        }} checked={PRIMARY_SCHOOL} onChange={handleChangeLevels} name="PRIMARY_SCHOOL" />
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
                                        }} checked={MIDDLE_SCHOOL} onChange={handleChangeLevels} name="MIDDLE_SCHOOL" />
                                    }
                                    label="Middle school"
                                />
                            </Grid>
                            <Grid xs={3}>
                                <FormControlLabel
                                    control={
                                        <Checkbox sx={{
                                            color: palette.umber,
                                            '&.Mui-checked': {
                                                color: palette.umber,
                                            },
                                        }} checked={HIGH_SCHOOL} onChange={handleChangeLevels} name="HIGH_SCHOOL" />
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
                                        }} checked={UNIVERSITY} onChange={handleChangeLevels} name="UNIVERSITY" />
                                    }
                                    label="University"
                                />
                            </Grid>
                        </Grid>
                    </FormGroup>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClickPropertiesAccountClose} sx={{backgroundColor: palette.champagne, color: 'black'}}
                >Cancel</Button>
                <Button type="submit" sx={{backgroundColor: palette.champagne, color: 'black'}}
                >Apply</Button>
            </DialogActions>
        </Dialog>
    );
}
export default EditAccountProperties;