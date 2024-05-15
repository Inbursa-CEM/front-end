import * as React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { useRef } from "react";



const Sugerencia = ({ idCurso, nombre, descripcion, url, idUsuario }) => {
  
    
  
  const options = {
    method: 'POST',
    headers:{
        'Content-type' : 'application/json',
    },
    body:JSON.stringify({idCurso,idUsuario})

  };

  const Asignar = () => {
    
    fetch("http://localhost:8080/curso/asignar",options)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
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
