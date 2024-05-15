import * as React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";





const Operador = ({idUsuario, nombre, setOperador }) => {
  const changeOperador = () => {
    setOperador(idUsuario);
  };

  return (
    <ListItem disablePadding>
      <ListItemButton onClick={changeOperador}>
        <ListItemIcon>
          <AccountCircleRoundedIcon />
        </ListItemIcon>
        <ListItemText primary={nombre} />
      </ListItemButton>
    </ListItem>
  );
};

export default Operador;