import List from "@mui/material/List";
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Fab from "@mui/material/Fab";
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { useCallback, useState, useEffect } from "react";
import Collapse from "@mui/material/Collapse";

import "../../Styles/listaNotis.css";

const Notificaciones = () => {
    const [notificaciones, setNotificaciones] = useState([]);
    const [show, setShow] = useState(false);

    const showList = () => {
        setShow(!show);
        descarga();
    }

    const url = "http://localhost:8080/notificacion/obtenerNotificaciones?idUsuario=1";

    const descarga = useCallback(() => {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const format = data.map(item => ({
                    contenido: item.contenido,
                    fechaHora: item.fechaHora
                }));
                setNotificaciones(format);
            })
            .catch(error => console.error('Error recuperando la info:', error));
    }, [url]);

    useEffect(() => {
        descarga();
    }, [descarga]);

    return (
        <div className="container">
            <Fab onClick={showList} className="button">
                <NotificationsActiveIcon className="icon" />
            </Fab>
            <div className="collapse-container">
                <Collapse in={show} style={{ transitionDuration: ".4s" }}>
                    <List>
                        {notificaciones.map((notif, index) => (
                            <ListItem key={index}>
                                <ListItemText
                                    primary={notif.contenido}
                                    secondary={new Date(notif.fechaHora).toLocaleString()}
                                />
                            </ListItem>
                        ))}
                    </List>
                </Collapse>
            </div>
        </div>
    );
};

export default Notificaciones;
