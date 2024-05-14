import List from "@mui/material/List";
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Fab from "@mui/material/Fab";
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { useState } from "react";
import Collapse from "@mui/material/Collapse";

import "../../Styles/listaNotis.css";

const Notificaciones = () => {
    const [notificaciones, setNotificaciones] = useState(false);

    const showList = () => {
        setNotificaciones(!notificaciones);
    }

    return (
        <div className="container">
            <Fab onClick={showList} className="button">
                <NotificationsActiveIcon className="icon" />
            </Fab>
            <Collapse in={notificaciones} style={{ transitionDuration: ".4s"}}>
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
            </Collapse>
        </div>

    );
};

export default Notificaciones;