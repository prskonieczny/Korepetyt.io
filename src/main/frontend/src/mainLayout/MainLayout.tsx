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

function MainLayout() {
    const navigationTreeOut = [
        {
            name: "home",
            label: "Home",
            actionProps: { to: "/" }
        },
        {
            name: "login",
            label: "Login",
            actionProps: { to: "/login" }
        }
    ];
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
                        {/* Przyciski */}
                        {navigationTreeOut.map((item) => (
                            <Button
                                key={item.name}
                                component={Link}
                                to={item.actionProps.to}
                                sx={{ my: 2, color: 'white', display: { xs: 'none', md: 'block' } }}
                            >
                                {item.label}
                            </Button>
                        ))}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default MainLayout;