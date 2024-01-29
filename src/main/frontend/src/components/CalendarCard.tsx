import {Box} from "@mui/material";
import timeGridPlugin from "@fullcalendar/timegrid";
import FullCalendar from "@fullcalendar/react";
import React from "react";

const CalendarCard = () => {
    return (
        <Box
            margin="50px auto"
            padding="20px"
            border="3px solid #772E25"
            borderRadius="8px"
            maxWidth="1000px"
        >
            <FullCalendar
                plugins={[ timeGridPlugin ]}
                initialView="timeGridWeek"
                height={"400px"}
            />
        </Box>
    );
}
export default CalendarCard;