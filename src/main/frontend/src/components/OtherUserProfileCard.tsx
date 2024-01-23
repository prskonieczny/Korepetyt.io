import {IAccountData} from "../util/data";
import {Box, Button, Typography} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {palette} from "../colors";
import React from "react";

export interface OtherUserProfileCardProps {
    account: IAccountData | undefined,
}

const OtherUserProfileCard = ({
                                  account,
                              }: OtherUserProfileCardProps) => {
    return (
        <Box
            margin="50px auto"
            padding="20px"
            border="3px solid #772E25"
            borderRadius="8px"
            maxWidth="400px"
        >
            <Box textAlign="center">
                <AccountCircleIcon
                    sx={{ color: palette.current, fontSize: "50px", mr: 1.5 }}
                />
            </Box>
            <Typography sx={{ fontSize: "14px", color: palette.umber }}>
                Username: {account?.username}</Typography>
            <Typography sx={{ fontSize: "14px", color: palette.umber }}>
                Email: {account?.email}</Typography>
            <Typography sx={{ fontSize: "14px", color: palette.umber }}>Phone number: {account?.phone}</Typography>
            <Typography sx={{ fontSize: "14px", color: palette.umber }}>City: {account?.city}</Typography>
            <Typography sx={{ fontSize: "14px", color: palette.umber }}>Street: {account?.street}</Typography>
            <Typography sx={{ fontSize: "14px", color: palette.umber }}>
                Roles: {account?.roles.map(role => role.permissionLevel.toLowerCase()).join(", ")}</Typography>
            <Typography sx={{ fontSize: "14px", color: palette.umber }}>
                Levels: {account?.levels.map(level => level.replace("_", " ").toLowerCase()).join(", ")}</Typography>
            <Typography sx={{ fontSize: "14px", color: palette.umber }}>
                Subjects: {account?.subjects.map(subject => subject.toLowerCase()).join(", ")}</Typography>
            <br/>
        </Box>
    )
}
export default OtherUserProfileCard;