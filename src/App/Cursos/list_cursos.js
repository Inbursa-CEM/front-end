//Autores: Carlos Alberto Sánchez Calderón, Alonso Segura De Lucio
import * as React from "react";
import { v4 as uuidv4 } from "uuid";
import Paper from "@mui/material/Paper";
import { useState, useEffect } from "react";
import Curso from "./curso";
import Proveedor, { contextoGlobal } from "./proveedor";

//Componente que muestra los cursos que se han asignado
const Lista_Cursos = (props) => {
  const [arrCursos, setArrCursos,eliminarCurso] = React.useContext(contextoGlobal);
  const url =
  `http://${process.env.REACT_APP_BACK_HOST}:8080/curso/asignados?idAgente=` + props.idOperador;

  const descargar = React.useCallback(async () => {
    const response = await fetch(url);
    const data = await response.json();
    const arrNuevo = (await data).map((curso) => {
      const cursoNuevo = {
        id: uuidv4(),
        idCurso: curso.idCurso,
        nombre: curso.nombre,
        url: curso.url,
        descripcion: curso.descripcion,
        prioridad: curso.prioridad,
        estado: curso.estado,
        fecha: curso.fecha,
      };
      return cursoNuevo;
    });
    setArrCursos(arrNuevo);
  }, [url, setArrCursos]);

  useEffect(() => {
    descargar();
  }, [descargar]);

  return (
    <div>
      
      <Paper style={{ margin: "20px", overflow: "auto", maxHeight: 250 }}>
        {arrCursos.map((curso) => {
         
          return (
           
            <Curso
              idCurso={curso.idCurso}
              nombre={curso.nombre}
              url={curso.url}
              descripcion={curso.descripcion}
              prioridad={curso.prioridad}
              estado={curso.estado}
              fecha={curso.fecha}
              idUsuario={props.idOperador}
              key={curso.id}
              borrar={eliminarCurso}
            ></Curso>
           
          );
        })}
      </Paper>
    </div>
  );
};

export default Lista_Cursos;
