import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import {palette} from "../../colors";
import image from "../../assets/images/404page.svg";
import Typography from "@mui/material/Typography";
import {Link} from "react-router-dom";
import React from "react";

const NotFoundPage = () => {
    return (
        <>
            <Grid container sx={{
                display: 'flex'
            }}>
                <Grid xs={6}>
                    <Box sx={{
                        backgroundColor: palette.champagne,
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'right',
                        alignItems: 'center',
                        padding: '0'
                    }}>
                        <img
                            src={image}
                            alt="Main page"
                            style={{
                                width: '80vh',
                                height: '80vh',
                                borderRadius: '8px',
                                marginTop: '-25vh'
                            }}
                        />
                    </Box>
                </Grid>
                <Grid xs={6} sx={{
                    alignItems: 'left',
                    textAlign: 'left'
                }}>
                    <Box sx={{
                        backgroundColor: palette.champagne,
                        height: '100vh',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'left',
                        textAlign: 'left',
                        padding: '0 0',
                    }}>
                        <Typography variant="h3" fontFamily={"Nunito"} fontStyle={palette.gray} sx={{
                            alignContent: 'left', mt: -25,
                        }}>
                            404: Page not found
                        </Typography>
                        <Link to='/login'>
                        </Link>
                        <Typography variant="h3" fontFamily={"Nunito"} fontStyle={palette.gray}>
                            Go back to {
                            <Link to='/' style={{ textDecoration: 'none' }}>
                                <span className="login-link">home page</span>
                            </Link>
                        }
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </>
    );
}
export default NotFoundPage;