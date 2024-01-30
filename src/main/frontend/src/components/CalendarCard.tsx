import {
    Alert,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    MenuItem,
    Select, Snackbar,
    TextField
} from "@mui/material";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from "@fullcalendar/react";
import React, {useEffect, useState} from "react";
import {ICreateLessonData, IShowLessonsData} from "../util/lessonData";
import {IAccountData} from "../util/data";
import LessonService from "../services/lessonService";
import Typography from "@mui/material/Typography";
import moment from "moment/moment";
import {palette} from "../colors";
import AuthService from "../services/authService";

export interface CalendarCardProps {
    account: IAccountData | undefined,
    cancelLessonHandler?: (id: number | undefined) => void,
}

const CalendarCard = ({account, cancelLessonHandler}: CalendarCardProps) => {

    const roles = AuthService.getUserRoles();
    const [teacherLessons, setTeacherLessons] = useState<IShowLessonsData[]>([]);
    const [events, setEvents] = useState<IShowLessonsData[]>([]);

    //Snackbars
    const [snackbarInfo, setSnackbarInfo] = useState({ open: false, message: ""});
    const [snackbarErrorInfo, setSnackbarErrorInfo] = useState({ open: false, message: ""});
    const handleCloseSnackbar = () => {
        setSnackbarInfo({ ...snackbarInfo, open: false });
    };
    const handleCloseErrorSnackbar = () => {
        setSnackbarErrorInfo({ ...snackbarInfo, open: false });
    };

    const getTeacherLessons = (username: string | undefined) => {
        LessonService.getTeacherLessons(username).then(response => {
            setTeacherLessons(response.data);
            setEvents(response.data);
        }).catch(error => {
            console.log(error);
        })
    }
    useEffect(() => {
        getTeacherLessons(account?.username);
    }, []);

    const [open, setOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<IShowLessonsData | null>(null);
    const handleEventClick = (clickInfo: any) => {
        setOpen(true);
        const clickedEvent = clickInfo.event;
        const selected = events.find(event =>
            moment(event.startTime, 'DD/MM/YYYY HH:mm').toDate().getTime() === clickedEvent.start.getTime() &&
            moment(event.endTime, 'DD/MM/YYYY HH:mm').toDate().getTime() === clickedEvent.end.getTime()
        );
        if (selected) {
            setSelectedEvent(selected);
        }
    };
    const handleCloseDialog = () => {
        setOpen(false);
    };

    const handleSelect = (selectionInfo: any) => {
        const start = moment(selectionInfo.start).format('DD/MM/YYYY HH:mm');
        const end = moment(selectionInfo.end).format('DD/MM/YYYY HH:mm');
        setNewLessonData({
            startTime: moment(selectionInfo.start).format('DD/MM/YYYY HH:mm'),
            endTime: moment(selectionInfo.end).format('DD/MM/YYYY HH:mm'),
            subject: '',
            description: '',
            image: ''
        });
        setReserveOpen(true);
        console.log('Zaznaczono zakres od', start, 'do', end);
    };

    const [reserveOpen, setReserveOpen] = useState(false);
    const handleCloseReserveDialog = () => {
        setReserveOpen(false);
    };
    const [newLessonData, setNewLessonData] = useState<ICreateLessonData>({
        startTime: '',
        endTime: '',
        subject: '',
        description: '',
        image: ''
    });
    const subjects = account?.subjects || [];
    const [subject, setSubject] = useState('');
    const ReserveLessonHandler = () => {
        LessonService.reserveLesson(account?.id, newLessonData).then(response => {
            console.log('Lekcja zarezerwowana');
            setSnackbarInfo({ open: true, message: "Lesson reserved successfully"});
            getTeacherLessons(account?.username);
            handleCloseDialog();
        }).catch(error => {
            setSnackbarErrorInfo({ open: true, message: error.response.data});
        });
        console.log('Nowa lekcja:', newLessonData);
    }

    //PLIK
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]; // Pobierz pierwszy plik
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewLessonData({
                    ...newLessonData,
                    image: reader.result as string
                });
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <Box
            margin="50px auto"
            padding="20px"
            border="3px solid #772E25"
            borderRadius="8px"
            maxWidth="1000px"
        >
            {/*Jak rola to nauczyciel to z selectable false a jak nie to true*/}
            {roles.includes('STUDENT') && (
            <FullCalendar
                plugins={[ timeGridPlugin, interactionPlugin ]}
                initialView="timeGridWeek"
                selectable={true}
                select={handleSelect}
                height={"600px"}
                events={events.map(event => ({
                    title: event.subject,
                    start: moment(event.startTime, 'DD/MM/YYYY HH:mm').toDate(),
                    end: moment(event.endTime, 'DD/MM/YYYY HH:mm').toDate(),
                    student: event.studentUsername,
                    backgroundColor: palette.current
                }))}
                eventClick={handleEventClick}
            />)}
            {/*{account?.roles.some(role => role.permissionLevel === 'TEACHER') && (*/}
            {roles.includes('TEACHER') && (
            <FullCalendar
                plugins={[ timeGridPlugin, interactionPlugin ]}
                initialView="timeGridWeek"
                height={"600px"}
                events={events.map(event => ({
                    title: event.subject,
                    start: moment(event.startTime, 'DD/MM/YYYY HH:mm').toDate(),
                    end: moment(event.endTime, 'DD/MM/YYYY HH:mm').toDate(),
                    student: event.studentUsername,
                    backgroundColor: palette.current
                }))}
                eventClick={handleEventClick}
            />)}

            <Dialog open={open} onClose={handleCloseDialog}>
                <DialogTitle>Event Details</DialogTitle>
                <DialogContent>
                    {selectedEvent && (
                        <div>
                            <Typography>Subject: {selectedEvent.subject}</Typography>
                            <Typography>Start time: {selectedEvent.studentUsername}</Typography>
                            <Typography>Description: {selectedEvent.description}</Typography>
                            <Typography>Lesson status: {selectedEvent.lessonStatus}</Typography>
                            <Typography>Student: {selectedEvent.studentUsername}</Typography>
                            {selectedEvent.image && (
                                <img src={`${selectedEvent.image}`} alt="Lesson Image" style={{ maxWidth: '100%', height: 'auto' }} />
                            )}
                        </div>
                    )}
                </DialogContent>
                <DialogActions>
                    {account?.roles.some(role => role.permissionLevel === 'TEACHER') && (cancelLessonHandler) && (
                        <Button onClick={() => {
                            cancelLessonHandler(selectedEvent?.lessonId);
                            setEvents(prevEvents => prevEvents.filter(event => event.lessonId !== selectedEvent?.lessonId));
                            handleCloseDialog();
                        }}
                            sx={{backgroundColor: palette.champagne, color: 'black'}}>
                            Cancel lesson
                        </Button>
                    )}
                    <Button onClick={handleCloseDialog} sx={{backgroundColor: palette.champagne, color: 'black'}}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={reserveOpen} onClose={handleCloseReserveDialog}>
                <DialogTitle>Reserve lesson</DialogTitle>
                <DialogContent>
                    <Select
                        required
                        value={subject}
                        onChange={(e) => {
                            setSubject(e.target.value);
                            setNewLessonData({...newLessonData, subject: e.target.value});
                        }}
                        fullWidth
                        sx={{ marginBottom: '16px', color: palette.umber, backgroundColor: palette.champagne, width: '500px'}}
                    >
                        {subjects.map((sub) => (
                            <MenuItem key={sub} value={sub}>
                                {sub.replace('_', ' ')}
                            </MenuItem>
                        ))}
                    </Select>
                    <br/>
                    <TextField
                        required
                        label="Description"
                        value={newLessonData.description}
                        onChange={(e) => setNewLessonData({...newLessonData, description: e.target.value})}
                        fullWidth
                        sx={{ marginBottom: '16px', color: palette.umber, backgroundColor: palette.champagne, width: '500px'}}
                    />
                    <br/>
                    <Typography>Dodaj materiały do lekcji: </Typography>
                    <input type="file" onChange={handleFileChange} accept="image/*" />
                </DialogContent>
                <DialogActions>
                    <Button type="submit" onClick={() => {
                        ReserveLessonHandler();
                        handleCloseReserveDialog();
                        setSubject('');
                    }}
                            sx={{backgroundColor: palette.champagne, color: 'black'}}>
                        Reserve Lesson
                    </Button>
                    <Button onClick={handleCloseReserveDialog} sx={{backgroundColor: palette.champagne, color: 'black'}}>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
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
        </Box>
    );
}
export default CalendarCard;