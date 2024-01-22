import {IAccountData} from "../../util/data";
import {Box, Typography} from "@mui/material";

export interface ProfileCardProps {
    account: IAccountData | undefined
}

const ProfileCard = ({account}: ProfileCardProps) => {
    return (
        <Box>
            <Typography>{account?.username}</Typography>
            <Typography>{account?.email}</Typography>
            <Typography>{account?.city}</Typography>
            <Typography>{account?.subjects}</Typography>
        </Box>
    )
}
export default ProfileCard;