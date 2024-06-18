//Autores: Carlos Alberto Sánchez Calderón, Alonso Segura De Lucio
import * as React from "react";
import { v4 as uuidv5 } from "uuid";
import Paper from "@mui/material/Paper";
import { useState, useEffect } from "react";
import Sugerencia from "./Sugerencia";

//Componente que muestra las sugerencias dependiendo del area de oportunidad
const Sugerencias = (props) => {
  const [arrCursos, setArrCursos] = useState([]);
  const url =
    `http://${process.env.REACT_APP_BACK_HOST}:8080/curso/porArea?idArea=` +
    props.area;

  const descargar = React.useCallback(async () => {
    const response = await fetch(url);
    const data = await response.json();
    const arrNuevo = (await data).map((sug) => {
      const sugerencia = {
        id: uuidv5(),
        idCurso: sug.idCurso,
        nombre: sug.nombre,
        url: sug.url,
        descripcion: sug.url,
      };
      return sugerencia;
    });
    setArrCursos(arrNuevo);
  }, [url, setArrCursos]);

  useEffect(() => {
    descargar();
  }, [descargar]);

  return (
    <div>
      <Paper style={{ margin: "20px", overflow: "auto", maxHeight: 200 }}>
        {arrCursos.map((sug) => {
          return (
            <Sugerencia
              nombre={sug.nombre}
              url={sug.url}
              descripcion={sug.url}
              idCurso={sug.idCurso}
              idUsuario={props.idOperador}
              key={sug.id}
            />
          );
        })}
      </Paper>
    </div>
  );
};

export default Sugerencias;
