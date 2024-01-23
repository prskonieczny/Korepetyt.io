import {Typography} from "@mui/material";
import {useEffect, useState} from "react";
import AnnouncementService from "../services/announcementService";
import {IAnnouncementData} from "../util/announcementData";

const AnnouncementsPage = () => {

    const [announcements, setAnnouncements] = useState<IAnnouncementData[]>([]);

    useEffect(() => {
        AnnouncementService.getAllAnnouncements().then(response => {
            setAnnouncements(response.data);
        }).catch(error => {
            console.log(error);
        });
    }, []);

    return (
        <Typography>{announcements.map(announcement => announcement.studentName)}</Typography>
    )
}
export default AnnouncementsPage;