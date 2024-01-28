import {Box, Button} from "@mui/material";
import {IAccountData} from "../util/data";
import {IShowLessonsData} from "../util/lessonData";
import AuthService from "../services/authService";
import React, {useState} from "react";
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import {palette} from "../colors";
import CancelIcon from '@mui/icons-material/Cancel';

export interface LessonsListProps {
    account: IAccountData | undefined,
    lessons: IShowLessonsData[],
    cancelLessonHandler: (id: number) => void,
}

const convertLessonsToRows = (lessons: IShowLessonsData[]) => {
    return lessons.map((l) => ({
        id: l.lessonId,
        startTime: l.startTime,
        endTime: l.endTime,
        studentUsername: l.studentUsername,
        teacherUsername: l.teacherUsername,
        description: l.description,
        subject: l.subject,
        lessonStatus: l.lessonStatus,
        isFinished: l.lessonStatus === 'FINISHED'
    }));
};


const LessonsList = ({
                        account, lessons, cancelLessonHandler
                     }: LessonsListProps) => {

    const loggedUser = AuthService.getCurrentUser();
    const roles = AuthService.getUserRoles();

    //Snackbars
    const [snackbarInfo, setSnackbarInfo] = useState({ open: false, message: ""});
    const [snackbarErrorInfo, setSnackbarErrorInfo] = useState({ open: false, message: ""});
    const handleCloseSnackbar = () => {
        setSnackbarInfo({ ...snackbarInfo, open: false });
    };
    const handleCloseErrorSnackbar = () => {
        setSnackbarErrorInfo({ ...snackbarInfo, open: false });
    };

    const rows = convertLessonsToRows(lessons);
    const columns: GridColDef[] = [
        { field: 'id', renderHeader: () => <strong>{"ID"}</strong>, width: 50 },
        {
            field: 'startTime',
            renderHeader: () => <strong>{"Start"}</strong>,
            width: 140,
            editable: false,
        },
        {
            field: 'endTime',
            renderHeader: () => <strong>{"End"}</strong>,
            width: 140,
            editable: false,
        },
        {
            field: 'studentUsername',
            renderHeader: () => <strong>{"Student"}</strong>,
            width: 110,
            editable: false,
        },
        {
            field: 'teacherUsername',
            renderHeader: () => <strong>{"Teacher"}</strong>,
            width: 150,
            editable: false,
        },
        {
            field: 'description',
            renderHeader: () => <strong>{"Description"}</strong>,
            width: 550,
            editable: false,
        },
        {
            field: 'subject',
            renderHeader: () => <strong>{"Subject"}</strong>,
            width: 150,
            editable: false,
        },
        {
            field: 'lessonStatus',
            renderHeader: () => <strong>{"Status"}</strong>,
            width: 100,
            editable: false,
        },
        {
            field: 'actionsDelete',
            headerName: '',
            width: 70,
            sortable: false,
            renderCell: (params) => (
                !params.row.isFinished && (
                    <Button sx={{color: palette.umber}}
                            onClick={() => {
                                cancelLessonHandler(params.row.id);
                            }}>
                        <CancelIcon />
                    </Button>
                )
            ),
        },
    ];

    return (
        <Box
            margin="50px auto"
            padding="20px"
            border="3px solid #772E25"
            borderRadius="8px"
            maxWidth="1500px"
        >
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5,
                        },
                    },
                }}
                autoHeight
            />
        </Box>
    );
}
export default LessonsList;