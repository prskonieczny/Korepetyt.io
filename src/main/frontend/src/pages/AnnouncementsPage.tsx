import {Box, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import AnnouncementService from "../services/announcementService";
import {IAnnouncementData} from "../util/announcementData";
import {DataGrid, GridColDef} from "@mui/x-data-grid";

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
        <Box
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginTop: '60px',
            }}
        >
            <Typography variant="h4" gutterBottom>
                Announcements
            </Typography>
            <div>
                {announcements.map((announcement) => (
                    <Box
                        key={announcement.id}
                        style={{
                            border: '1px solid #ccc',
                            borderRadius: '8px',
                            padding: '10px',
                            marginBottom: '10px',
                            width: '800px',
                        }}
                    >
                        <Typography variant="h6">{announcement.studentName}</Typography>
                        <Typography>{announcement.subjects}</Typography>
                        <Typography>{announcement.levels}</Typography>
                        <Typography>{announcement.description}</Typography>
                    </Box>
                ))}
            </div>
        </Box>
    );
}
export default AnnouncementsPage;