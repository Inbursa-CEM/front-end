import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Fab from "@mui/material/Fab";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { useCallback, useState, useEffect } from "react";
import Collapse from "@mui/material/Collapse";
import Checkbox from "@mui/material/Checkbox";

import "../../Styles/listaNotis.css";

const Notificaciones = ({ id }) => {
  const [notificaciones, setNotificaciones] = useState([]);
  const [show, setShow] = useState(false);

  const showList = () => {
    setShow(!show);
    descarga();
  };

  const url = `${process.env.REACT_APP_BACK_HOST}/notificacion/obtenerNotificaciones?idUsuario=${id}`;

  const descarga = useCallback(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const format = data.map((item) => ({
          idNotificacion: item.idNotificacion,
          contenido: item.contenido,
          fechaHora: item.fechaHora,
          leido: item.leido || false, // Añadimos un estado "leido"
        }));
        setNotificaciones(format);
      })
      .catch((error) => console.error("Error recuperando la info:", error));
  }, [url]);

  useEffect(() => {
    descarga();
  }, [descarga]);

  const actualizarStatus = (idNotificacion) => {
    const updateUrl = `${process.env.REACT_APP_BACK_HOST}/notificacion/actualizarStatusNotificacion?idNotificacion=${idNotificacion}`;
    
    fetch(updateUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Respuesta del servidor:", data);
        // Actualizar el estado de las notificaciones
        setNotificaciones((prevNotificaciones) =>
          prevNotificaciones.map((notif) =>
            notif.idNotificacion === idNotificacion ? { ...notif, leido: true } : notif
          )
        );
      })
      .catch((error) => console.error("Error:", error.message));
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
                <Checkbox
                  className="checkbox"
                  sx={{ "& .MuiSvgIcon-root": { fontSize: 28 } }}
                  checked={notif.leido}
                  onChange={() => actualizarStatus(notif.idNotificacion)} // Pasar función anónima
                  inputProps={{ "aria-label": "controlled" }}
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
