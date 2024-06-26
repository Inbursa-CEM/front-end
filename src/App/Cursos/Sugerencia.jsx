//Autores: Carlos Alberto Sánchez Calderón, Alonso Segura De Lucio

import * as React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { contextoGlobal } from "./Proveedor";
import { v4 as uuidv4 } from "uuid";

//Componente que muestra la informacion de la sugerencia
const Sugerencia = ({ idCurso, nombre, descripcion, url, idUsuario }) => {
  const [, , agregarCurso, ] =
    React.useContext(contextoGlobal);

  const options = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ idCurso, idUsuario }),
  };

  const Asignar = () => {
    fetch(
      `http://${process.env.REACT_APP_BACK_HOST}:8080/curso/asignar`,
      options
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Asignado");

        SendNoti();
      })
      .catch((error) => console.log(error));
  };

  const SendNoti = () => {
    fetch(
      `http://${process.env.REACT_APP_BACK_HOST}:8080/notificacion/mandarOneonOne`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          idUsuario,
          contenido: "Curso Asignado: " + nombre,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data.idNotificacion);
        const curso_temp = {
          id: uuidv4(),
          idCurso: idCurso,
          nombre: nombre,
          url: url,
          descripcion: descripcion,
          prioridad: 0,
          idNoti: 5,
        };
        agregarCurso(curso_temp);
      })
      .catch((error) => console.log(error));
  };

  return (
    <ListItem disablePadding>
      <ListItemButton onClick={Asignar}>
        <ListItemIcon>
          <MenuBookIcon />
        </ListItemIcon>
        <ListItemText primary={nombre} />
      </ListItemButton>
    </ListItem>
  );
};

export default Sugerencia;
