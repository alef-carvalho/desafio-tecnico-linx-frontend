import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PetsIcon from '@mui/icons-material/Pets';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import {useRouter} from "../../routes/hooks";
import {RouterLink} from "../../routes/components";
import Link from '@mui/material/Link';

interface SidebarProps {
    open: boolean;
    onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
    const router = useRouter();
    return (
        <Drawer anchor="left" open={open} onClose={onClose}>
            <List>
                <ListItem>
                    <ListItemIcon><HomeIcon /></ListItemIcon>
                    <ListItemText primary="Home" />

                    <Link component={RouterLink} href="/dashboard">

                    </Link>
                </ListItem>
                <ListItem>
                    <Link component={RouterLink} href="/dashboard/pets">
                        <ListItemIcon><PetsIcon /></ListItemIcon>
                        <ListItemText primary="Pets" />
                    </Link>
                </ListItem>
                <ListItem onClick={() => router.push("/dashboard/vacinas")}>
                    <ListItemIcon><VaccinesIcon /></ListItemIcon>
                    <ListItemText primary="Vacinas" />
                </ListItem>
            </List>
        </Drawer>
    );
};

export default Sidebar;
