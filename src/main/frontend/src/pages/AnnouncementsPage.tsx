import {Box, Pagination, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import AnnouncementService from "../services/announcementService";
import {IAnnouncementData} from "../util/announcementData";
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import {palette} from "../colors";

const AnnouncementsPage = () => {

    const [announcements, setAnnouncements] = useState<IAnnouncementData[]>([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };
    const startIdx = (page - 1) * pageSize;
    const endIdx = startIdx + pageSize;
    const displayedAnnouncements = announcements.slice(startIdx, endIdx);

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
            <Typography variant="h5" gutterBottom>
                Explore students announcements:
            </Typography>
            <br/>
            <div>
                {displayedAnnouncements.map((announcement) => (
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
            <Pagination
                count={Math.ceil(announcements.length / pageSize)}
                page={page}
                onChange={handlePageChange}
                sx={{color: palette.current}}
                style={{ marginTop: '20px' }}
            />
        </Box>
    );
}
export default AnnouncementsPage;