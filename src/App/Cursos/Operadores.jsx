//Autores: Carlos Alberto Sánchez Calderón, Alonso Segura De Lucio

import * as React from "react";
import { v4 as uuidv5 } from "uuid";
import Paper from "@mui/material/Paper";
import Operador from "./Operador";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

//Componente que muestra la lista de los operadores
const Operadores = (props) => {
  const [arrOperadores, setArrOperadores] = useState([]);
  const url =
    `http://${process.env.REACT_APP_BACK_HOST}:8080/usuario/agentesDeSupervisor?idSupervisor=` +
    props.idSupervisor;
  const navegar = useNavigate();

  const descargar = React.useCallback(async () => {
    const token = sessionStorage.getItem("userToken");

    // Objeto con las opciones de la petición
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(url, options);
    if (response.status === 401) {
      navegar("/");
    }
    const data = await response.json();
    const arrNuevo = (await data).map((usuario) => {
      const operadorNuevo = {
        id: uuidv5(),
        idUsuario: usuario.idUsuario,
        nombre: usuario.nombre,
      };
      return operadorNuevo;
    });
    setArrOperadores(arrNuevo);
  }, [url, setArrOperadores, navegar]);

  useEffect(() => {
    descargar();
  }, [descargar]);

  return (
    <div className="operadores">
      <Paper style={{ margin: "20px", overflow: "auto", maxHeight: 600 }}>
        {arrOperadores.map((operador) => {
          return (
            <Operador
              idUsuario={operador.idUsuario}
              nombre={operador.nombre}
              key={operador.id}
              setOperador={props.setIdOperador}
            />
          );
        })}
      </Paper>
    </div>
  );
};

export default Operadores;
