import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { palette } from "../colors";
import Typography from '@mui/material/Typography';
import image from '../assets/images/mainpage.svg';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2

const HomePage = () => {
    return (
        <>
            <Grid container sx={{
                display: 'flex'
            }}>
                <Grid xs={8}>
                    <Box sx={{
                        backgroundColor: palette.champagne,
                        height: '100vh',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '0'
                    }}>
                        <img
                            src={image}
                            alt="Main page"
                            style={{
                                width: '50%',
                                height: '70vh',
                                borderRadius: '8px'
                            }}
                        />
                    </Box>
                </Grid>
                <Grid xs={4} sx={{
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
                        padding: '0 20px',
                    }}>
                        <div style={{ marginLeft: '20px' }}>
                            <Typography variant="h3" fontFamily={"Nunito"}>
                                Start your journey!
                            </Typography>
                            <Typography>
                                Already have account? Login here!
                            </Typography>
                            <Typography>
                                Join us here.
                            </Typography>
                        </div>
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}
export default HomePage;