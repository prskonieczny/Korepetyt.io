import {Box, Divider, Grid, Rating, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import OpinionService from "../services/OpinionService";
import {IOpinionData} from "../util/opinionData";
import {IAccountData} from "../util/data";

export interface OpinionCardProps {
    account: IAccountData | undefined,
}

const OpinionCard = ({
                         account,
}: OpinionCardProps) => {

    const [opinions, setOpinions] = useState<IOpinionData[]>([]);

    const getOpinionsForTeacher = (username: string | undefined) => {
        OpinionService.getOpinionsForTeacher(username).then(response => {
            setOpinions(response.data);
        }).catch(error => {
            console.log(error);
        })
    }

    useEffect(() => {
        getOpinionsForTeacher(account?.username);
    }, [account])

    const getStarRatingFromEnum = (starReview: string): number => {
        switch (starReview) {
            case 'ONE':
                return 1;
            case 'TWO':
                return 2;
            case 'THREE':
                return 3;
            case 'FOUR':
                return 4;
            case 'FIVE':
                return 5;
            default:
                return 0;
            }
        }


        return (
        <Box
            margin="50px auto"
            padding="20px"
            border="3px solid #772E25"
            borderRadius="8px"
            maxWidth="400px"
        >
            {opinions.map((opinion) => (
                <Grid>
                    <Typography>{opinion.id}</Typography>
                    <Typography>{opinion.creationDate.toString()}</Typography>
                    <Rating value={getStarRatingFromEnum(opinion.starReview)} readOnly />
                    <Typography>{opinion.opinionContent}</Typography>
                    <Divider/>
                </Grid>
            ))}
        </Box>
    );
}
export default OpinionCard;