import Box from '@mui/material/Box';
import Header from './header';
import React, {useState} from "react";
import Sidebar from "./sidebar.tsx";
import {Container} from "@mui/material";

type Props = {
    children: React.ReactNode;
};

export default function DashboardLayout({ children }: Props) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    return (
        <>
            <Header onMenuClick={toggleSidebar} />
            <Sidebar open={sidebarOpen} onClose={toggleSidebar}/>
            <Container sx={{ mt: 4 }}>
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        minHeight: 1,
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    {children}
                </Box>
            </Container>
        </>
    );
}
