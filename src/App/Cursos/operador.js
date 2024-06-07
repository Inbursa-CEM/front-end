//Autores: Carlos Alberto Sánchez Calderón, Alonso Segura De Lucio

import * as React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { IconButton } from "@mui/material";
import PopProfile from "./popProfile";

//Componente que tiene la informacion de un agente
const Operador = ({ idUsuario, nombre, setOperador }) => {
  const changeOperador = () => {
    setOperador(idUsuario);
  };

  return (
    <ListItem disablePadding>
      <PopProfile></PopProfile>
      <ListItemButton onClick={changeOperador}>
        <ListItemText primary={nombre} />
      </ListItemButton>
    </ListItem>
  );
};

export default Operador;
