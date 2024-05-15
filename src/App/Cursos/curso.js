import * as React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { IconButton } from "@mui/material";
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { useState } from "react";



const Curso = ({idCurso, nombre,url,descripcion,prioridad,estado,fecha,idUsuario }) => {
  
  const [newFecha,setFecha] = useState(fecha);
  const [newPrioridad,setPrioridad] = useState(prioridad);
  const [newEstado,setEstado] = useState(estado);
  const [idAgente,setAgente] = useState(idUsuario);

  const modificarFecha = (evento) => {
    setFecha(evento.target.value);
  }
  const modificarPrioridad= (evento) => {
    setPrioridad(100);
  }

  const modificarEstado = (evento) => {
    setEstado("URGENTE");
  }


  const options = {
    method: 'POST',
    headers:{
        'Content-type' : 'application/json',
    },
    body:JSON.stringify({idCurso,idUsuario})

  };
  
  const Eliminar = () => {
    console.log(options.body);
    fetch("http://localhost:8080/curso/desasignar",options)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.log(error));
  };
  
  const options2 = {
    method: 'POST',
    headers:{
        'Content-type' : 'application/json',
    },
    body:JSON.stringify({idCurso,idAgente,newPrioridad,newEstado,newFecha})

  };
  
  const Guardar = () => {
    console.log(options2.body);
    fetch("http://localhost:8080/curso/modificarAsignacion",options2)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.log(error));
  };


  return (
    <ListItem disablePadding>
      <ListItemButton>
        <ListItemIcon>
          <AccountCircleRoundedIcon />
        </ListItemIcon>
        <ListItemText primary={nombre} />
      </ListItemButton>
      <TextField label={newFecha} onChange={modificarFecha}></TextField>
      <TextField label={newPrioridad} onChange={modificarPrioridad}></TextField>
      <TextField label={newEstado} onChange={modificarEstado}></TextField>
      <IconButton onClick={Eliminar}>
        <DeleteRoundedIcon />
      </IconButton>
      <IconButton onClick={Guardar}>
        <SaveAltIcon/>
      </IconButton>

          
      
    </ListItem>
  );
};

export default Curso;