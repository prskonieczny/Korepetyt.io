import React from 'react';
import MainLayout from "../mainLayout/MainLayout";
import { Outlet } from "react-router-dom";
import {palette} from "../colors";
function RootLayout() {
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "spece-between",
            height: "125vh",
            backgroundColor: palette.champagne,
        }}>
            <MainLayout />
            <main>
                <Outlet />
            </main>
        </div>
    )
}
export default RootLayout;