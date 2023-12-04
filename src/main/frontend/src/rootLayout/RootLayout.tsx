import React from 'react';
import MainLayout from "../mainLayout/MainLayout";
import { Outlet } from "react-router-dom";
import AuthService from "../services/authService";
function RootLayout() {
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "spece-between",
            height: "100vh"
        }}>
            <MainLayout />
            <main>
                <Outlet />
            </main>
        </div>
    )
}
export default RootLayout;