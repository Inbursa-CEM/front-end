import List from "@mui/material/List";
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Fab from "@mui/material/Fab";
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { useState } from "react";

const Notificaciones = () => {
    const [notificaciones, setNotificaciones] = useState(false);

    const showList = () => {
        setNotificaciones(!notificaciones);
    }

    return (
        <div>
            <Fab onClick={showList}>
                <NotificationsActiveIcon />
            </Fab>
            {/* if (notificaciones) */}
            <List>
                <ListItem>
                    <ListItemText primary="Notificación 1" secondary="Hace 10 minutos" />
                </ListItem>
                <ListItem>
                    <ListItemText primary="Notificación 2" secondary="Hace 20 minutos" />
                </ListItem>
                <ListItem>
                    <ListItemText primary="Notificación 3" secondary="Hace 30 minutos" />
                </ListItem>
            </List>
        </div>

    );
};

export default Notificaciones;