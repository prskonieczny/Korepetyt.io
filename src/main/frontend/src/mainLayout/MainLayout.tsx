import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { palette } from "../colors";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import MenuBookSharpIcon from "@mui/icons-material/MenuBookSharp";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import AppBar from "@mui/material/AppBar";
import LogoutIcon from '@mui/icons-material/Logout';
import AuthService from "../services/authService";
import HelpIcon from '@mui/icons-material/Help';
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogProps, DialogTitle} from "@mui/material";

function MainLayout() {

    const navigate = useNavigate();
    const loggedUser = AuthService.getCurrentUser();
    const roles = AuthService.getUserRoles();

    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');

    const handleClickOpen = (scrollType: DialogProps['scroll']) => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const descriptionElementRef = React.useRef<HTMLElement>(null);
    React.useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    const FAQDialog = (
        <Dialog
            open={open}
            onClose={handleClose}
            scroll={scroll}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
            sx={{color: palette.current}}
        >
            <DialogTitle id="scroll-dialog-title" sx={{backGroundColor: palette.current}}>FAQ</DialogTitle>
            <DialogContent dividers={scroll === 'paper'}>
                <DialogContentText
                    id="scroll-dialog-description"
                    ref={descriptionElementRef}
                    tabIndex={-1}
                    sx={{color: 'black'}}
                >
                    The scope of the project includes creating a web application for hiring tutors.
                    The work will involve implementing functionalities such as adding, browsing,
                    modifying, and deleting advertisements for both teachers and students.
                    Additionally, the application will feature a fast planning and reservation of lessons using a calendar.
                    The application will include a user login and registration system with different access levels.
                    Moreover,students will have the ability to personalize lessons according to their needs by uploading materials
                    to teachers after booking lessons. A database will be created to store information about advertisements, users, and transactions.
                    The project will also encompass a rating system for tutors, lesson management, sending notifications and reminders,
                    as well as generating statistics. The application will also provide
                    a system for assigning interested teachers to student advertisements.
                    The user interface design will consider intuitive browsing,
                    filtering, and hiring of teachers.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} sx={{backgroundColor: palette.champagne, color: 'black'}}>Close</Button>
            </DialogActions>
        </Dialog>
    );

    const navigationTreeOut = [
        {
            name: "login",
            label: "Login",
            actionProps: { to: "/login" }
        },
    ];

    const navigationTreeIn = [
        {
            name: "home",
            label: "Home",
            actionProps: { to: "/"}
        },
    ];

    if (roles !== null && roles.includes('STUDENT')) {
        navigationTreeIn.push(
            {
                name: "teachers",
                label: "Our teachers",
                actionProps: {to: "/teachers"}
            },
        )
    }

    if (roles !== null && roles.includes('TEACHER')) {
        navigationTreeIn.push(
            {
                name: "students",
                label: "Our students",
                actionProps: {to: "/students"}
            },
        )
    }

    if (roles !== null && roles.includes('ADMIN')) {
        navigationTreeIn.push(
            {
                name: "users",
                label: "Manage users",
                actionProps: {to: "/users"}
            },
        )
    }

    function handleProfileClick() {
        navigate("/profile");
    }

    const handleLogout = () => {
        AuthService.logout();
        navigate("/");
    }

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: palette.umber }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <MenuBookSharpIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        KOREPETYTIO.io
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
                        {(loggedUser ? navigationTreeIn : navigationTreeOut).map((item) => (
                            <Button
                                key={item.name}
                                component={Link}
                                to={item.actionProps.to}
                                sx={{ my: 2, color: 'white', display: { xs: 'none', md: 'block' }, verticalAlign: 'middle', marginRight: 2}}
                            >
                                {item.label}
                            </Button>
                        ))}
                        {loggedUser && (
                            <Button
                                onClick={handleLogout}
                                sx={{ my: 2, color: 'white', display: { xs: 'none', md: 'block' }, verticalAlign: 'middle'}}
                            >
                                Logout
                                <LogoutIcon
                                    sx={{ verticalAlign: 'middle', marginLeft: 1 }}
                                />
                            </Button>
                        )}
                        <Button onClick={handleClickOpen('paper')}>
                            <HelpIcon sx={{color: 'white'}}></HelpIcon>
                        </Button>
                    </Box>
                </Toolbar>
            </Container>
            {FAQDialog}
        </AppBar>
    );
};
export default MainLayout;