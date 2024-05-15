import List from "@mui/material/List";
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Fab from "@mui/material/Fab";
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { useCallback, useState } from "react";
import Collapse from "@mui/material/Collapse";

import "../../Styles/listaNotis.css";

const Notificaciones = () => {
    const [notificaciones, setNotificaciones] = useState(false);

    const showList = () => {
        setNotificaciones(!notificaciones);
    }

    // const [url, setUrl] = useState("http://localhost:3000/obtenerNotificaciones");

    // const descarga = useCallback(() => {
    //     fetch(url)
    //         .then(response => response.json())
    //         .then(data => {

    //             const format = data.map((item) => {
    //                 return item;
    //             });
    //         })
    // }, []);

    return (
        <div className="container">
            <Fab onClick={showList} className="button">
                <NotificationsActiveIcon className="icon" />
            </Fab>
            <div className="collapse-container">
                <Collapse in={notificaciones} style={{ transitionDuration: ".4s" }}>
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

        </div>

    );
};

export default Notificaciones;