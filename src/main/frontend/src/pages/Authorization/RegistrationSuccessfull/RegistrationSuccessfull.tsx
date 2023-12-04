import React, {useEffect, useState} from "react";
import {Box, Typography} from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {palette} from "../../../colors";
import {useNavigate} from "react-router-dom";
const RegistrationSuccessfull = () => {

    const navigate = useNavigate();
    const [remainingTime, setRemainingTime] = useState(10);

    useEffect(() => {
        const redirectTimeout = setTimeout(() => {
            navigate('/login');
        }, remainingTime * 1000);

        const interval = setInterval(() => {
            setRemainingTime(prevTime => prevTime - 1);
        }, 1000);

        return () => {
            clearTimeout(redirectTimeout);
            clearInterval(interval);
        };
    }, [navigate, remainingTime]);

    return (
        <Box sx={{
            backgroundColor: palette.champagne,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
        }}>
            <CheckCircleIcon sx={{ fontSize: 100 }}></CheckCircleIcon>
            <br />
            <Typography variant="h2" fontFamily={"Nunito"} fontStyle={palette.gray}>
                Congratulations
            </Typography>
            <Typography variant="h4" fontFamily={"Nunito"} fontStyle={palette.gray}>
                Your account has been created successfully.
            </Typography>
            <Typography variant="h4" fontFamily={"Nunito"} fontStyle={palette.gray}>
                Please wait as you will be redirected soon.
            </Typography>
            <Typography variant="h4" fontFamily={"Nunito"} fontStyle={palette.gray}>
                Redirecting in {remainingTime} seconds.
            </Typography>
        </Box>
    );
};
export default RegistrationSuccessfull;
