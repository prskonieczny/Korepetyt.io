import React, {useEffect, useState} from "react";
import {IAccountData} from "../util/data";
import AccountService from "../services/accountService";
import {useNavigate, useParams} from "react-router-dom";
import OtherUserProfileCard from "../components/OtherUserProfileCard";
import AuthService from "../services/authService";
import OpinionCard from "../components/OpinionCard";
import {IOpinionData} from "../util/opinionData";
import OpinionService from "../services/OpinionService";
import CalendarCard from "../components/CalendarCard";
import LessonService from "../services/lessonService";
import {IShowLessonsData} from "../util/lessonData";
import {Grid} from "@mui/material";

const OtherUserProfilePage = () => {
    const navigate = useNavigate();
    const loggedUser = AuthService.getCurrentUser();
    const roles = AuthService.getUserRoles();
    const [account, setAccount] = useState<IAccountData>();
    const accountId = useParams().id as unknown as number;

    useEffect(() => {
        AccountService.getOtherUserAccount(accountId).then(response => {
            setAccount(response.data);
        }).catch(error => {
            if (error.response.status === 404) {
                console.log(error);
            }
        })
    }, []);

    const [opinions, setOpinions] = useState<IOpinionData[]>([]);

    const getOpinionsForTeacher = (username: string | undefined) => {
        OpinionService.getOpinionsForTeacher(username).then(response => {
            setOpinions(response.data);
        }).catch(error => {
            console.log(error);
        })
    }

    const [lessons, setLessons] = useState<IShowLessonsData[]>([]);
    function cancelLessonHandler(id: number | undefined) {
        LessonService.cancelLesson(id)
            .then(() => {
                setLessons((prevAccounts) => {
                    return prevAccounts.filter((lesson) => lesson.lessonId !== id);
                });
            })
            .catch((error) => {
                console.log("error " + id);
            });
    }

    const [refreshOpinions, setRefreshOpinions] = useState<boolean>(false);
    const handleRefreshOpinions = () => {
        setRefreshOpinions(prevState => !prevState);
    }

    useEffect(() => {
        getOpinionsForTeacher(account?.username);
    }, [account, refreshOpinions])

    return (
        <>
            <Grid
                container
                justifyContent="center"
                alignItems="center"
                spacing={3}
            >
                <Grid xs={4}>
                    <OtherUserProfileCard
                        account={account}
                    />
                </Grid>
                <Grid xs={4}>
                    {account?.roles.some(role => role.permissionLevel === 'TEACHER') && (
                        <OpinionCard
                            account={account}
                            opinions={opinions}
                            refreshOpinions={handleRefreshOpinions}
                        />
                    )}
                </Grid>
            </Grid>
            <Grid>
                {account?.roles.some(role => role.permissionLevel === 'TEACHER') && (
                    <CalendarCard
                        account={account}
                    />
                )}
            </Grid>
        </>
    )
}

export default OtherUserProfilePage;