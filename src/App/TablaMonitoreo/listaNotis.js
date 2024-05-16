import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Fab from "@mui/material/Fab";
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { useCallback, useState, useEffect } from "react";
import Collapse from "@mui/material/Collapse";
import Checkbox from "@mui/material/Checkbox";

import "../../Styles/listaNotis.css";

const Notificaciones = ({ id }) => {
    const [notificaciones, setNotificaciones] = useState([]);
    const [show, setShow] = useState(false);

    const showList = () => {
        setShow(!show);
    }

    const url = `http://localhost:8080/notificacion/obtenerNotificaciones?idUsuario=${id}`;

    const updateUrl = "http://localhost:8080/notificacion/actualizarStatusNotificacion?idNotificacion="

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

    const actualizarStatus = (event) => {
        const idNotificacion = notificaciones[event.target.value]._id;
        fetch(updateUrl + idNotificacion, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                status: true
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log('Respuesta del servidor:', data);
            })
            .catch(error => console.error('Error:', error.message));
    };

    return (
        <div className="container-notis">
            <Fab onClick={showList} className="button-notis">
                <NotificationsActiveIcon className="icon-notis" />
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
                                <Checkbox className="checkbox"
                                    sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                                    // checked={checked}

                                    // onChange={actualizarStatus}
                                    
                                    inputProps={{ 'aria-label': 'controlled' }}
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
