import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { palette } from "../colors";
import Typography from '@mui/material/Typography';
import image from '../assets/images/mainpage.svg';
import Grid from '@mui/material/Unstable_Grid2';
import './HomePage.css';

const HomePage = () => {
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
                                borderRadius: '8px'
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
                        marginBottom: '0px'
                    }}>
                        <Typography variant="h2" fontFamily={"Nunito"} fontStyle={palette.gray} sx={{
                            alignContent: 'left'
                        }}>
                            Start your journey!
                        </Typography>
                        <Link to='/login'>
                        </Link>
                        <Typography variant="h4" fontFamily={"Nunito"} fontStyle={palette.gray}>
                            Already have account? {
                                <Link to='/' style={{ textDecoration: 'none' }}>
                                    <span className="login-link">Login here</span>
                                </Link>
                            }
                        </Typography>
                        <Typography variant="h4" fontFamily={"Nunito"}>
                            Join us&nbsp;
                            <Link to='/' style={{ textDecoration: 'none' }}>
                                <span className="register-link">here</span>
                            </Link>
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}
export default HomePage;