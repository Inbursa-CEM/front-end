import * as React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { IconButton } from "@mui/material";
import TextField from "@mui/material/TextField";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import { useState } from "react";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { useContext } from "react";
import { contextoGlobal } from "./proveedor";

const Curso = ({
  idCurso,
  nombre,
  url,
  descripcion,
  prioridad,
  estado,
  fecha,
  idUsuario,
  idNoti
}) => {
  const [newFecha, setFecha] = useState(fecha);
  const [newPrioridad, setPrioridad] = useState(prioridad);
  const [newEstado, setEstado] = useState(estado);
  const [idAgente, setAgente] = useState(idUsuario);
  const [arrCursos, setArrCursos, agregarCurso, eliminarCurso] = useContext(contextoGlobal);

  const modificarFecha = (evento) => {
    setFecha(evento.format("YYYY-MM-DD HH:mm:ss"));
  };
  const modificarPrioridad = (evento) => {
    setPrioridad(parseInt(evento.target.value));
  };

  const modificarEstado = (evento) => {
    setEstado(evento.target.value);
  };

  

  const options = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ idCurso, idAgente }),
  };

  const Eliminar = () => {
    console.log(idCurso);
    fetch("http://localhost:8080/curso/desasignar", options)
      .then((response) => response.json())
      .then((data) => {
        eliminarCurso(idCurso);
        
      })
      .catch((error) => console.log(error));
  };


  
 
  
  
  const options2 = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      idCurso,
      idAgente,
      newPrioridad,
      newEstado,
      newFecha,
    }),
  };

  const Guardar = () => {
    console.log(options2.body);
    fetch("http://localhost:8080/curso/modificarAsignacion", options2)
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
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es-mx">
      <DemoContainer components={["DateTimePicker"]}> 
      <DateTimePicker
          className="select"
          label={newFecha}
          onChange={modificarFecha}
          
        />
        </DemoContainer>
        </LocalizationProvider>
      <TextField label={newPrioridad} onChange={modificarPrioridad}></TextField>
      <TextField label={newEstado} onChange={modificarEstado}></TextField>
      <IconButton onClick={Eliminar}>
        <DeleteRoundedIcon />
      </IconButton>
      <IconButton onClick={Guardar}>
        <SaveAltIcon />
      </IconButton>
    </ListItem>
  );
};

export default Curso;
