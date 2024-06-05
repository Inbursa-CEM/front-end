// Autora: Lauren Lissette Llauradó Reyes
// Componente que muestra una tabla con los datos, en tiempo real, de los agentes del supervisor

import "../../Styles/App.css";
import "../../Styles/tabla.css";
import React, { useCallback, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import OneOnOne from "./OneOnOne";
import { useNavigate } from "react-router-dom";

const EmpleadosTabla = () => {
  const host = process.env.REACT_APP_BACK_HOST;
  const [arrAgentes, setArrAgentes] = useState([]);
  const navegar = useNavigate();

  const url = `http://${host}:8080/usuario/infoActualAgentes?supervisor=${sessionStorage.getItem(
    "userId"
  )}`;

  function getSentimiento(duracion) {
    if (!duracion) {
      return 4; // BORRAR CUANDO SE IMPLEMENTE API
    }
    const randomNumber = Math.random();
    if (randomNumber < 0.33) {
      return 1; // Sentimiento negativo
    } else if (randomNumber < 0.66) {
      return 2; // Sentimiento neutro
    } else {
      return 3; // Sentimiento positivo
    }
  }

  function getImgSentimiento(sentimiento) {
    if (sentimiento === 4) {
      return null;
    } else if (sentimiento === 1) {
      return "https://inbursa-lau.s3.amazonaws.com/calidad-pesima.svg";
    } else if (sentimiento === 2) {
      return "https://inbursa-lau.s3.amazonaws.com/calidad-neutra.svg";
    } else {
      return "https://inbursa-lau.s3.amazonaws.com/calidad-buena.svg";
    }
  }

  function getSemaforo(duracion) {
    if (duracion < 45) {
      return { color: "#43C257" }; // Semáforo verde
    } else if (duracion < 60) {
      return { color: "#D7920C" }; // Semáforo amarillo
    } else {
      return { color: "#E42424" }; // Semáforo rojo
    }
  }

  function formatearDuracion(totalSegundos) {
    if (totalSegundos === "-" || totalSegundos === 0) {
      return "-";
    }
    const horas = Math.floor(totalSegundos / 3600);
    const minutosRestantes = totalSegundos % 3600;
    const minutos = Math.floor(minutosRestantes / 60);
    const segundos = minutosRestantes % 60;
    return `${horas}:${minutos}:${segundos}`;
  }

  const descargar = useCallback(() => {

    const token = sessionStorage.getItem("userToken");

    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    fetch(url, options)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      if (response.status === 401) {
        navegar("/"); // Redirigir al inicio de sesión si el token es inválido
      }
      throw new Error("Error en la petición");
    })
      .then((data) => {
        console.log("Datos obtenidos del servidor:", data);
        const arrNuevo = data.map((agente) => {
          const sentimiento = getSentimiento(agente.duracion);
          const agenteNuevo = {
            id: agente.id,
            nombre: agente.nombreAgente,
            duracion: agente.duracion || 0,
            cliente: agente.nombreCliente || "-",
            saldo: agente.saldoCliente || "-",
            sentimiento,
            sentimientoImg: getImgSentimiento(sentimiento),
            semaforo: agente.duracion ? getSemaforo(agente.duracion) : "-",
          };
          return agenteNuevo;
        });
        setArrAgentes(arrNuevo);
      })
      .catch((error) => console.log(error));
  }, [url, navegar]);

  useEffect(() => {
    descargar();
    const intervalId = setInterval(descargar, 5000); // Repetir la descarga de datos cada 5 segundos

    return () => clearInterval(intervalId);
  }, [descargar]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setArrAgentes((prevAgentes) =>
        prevAgentes.map((agente) => ({
          ...agente,
          duracion: agente.duracion > 0 ? agente.duracion + 1 : "-",
        }))
      );
    }, 1000); // Incrementar la duración cada segundo

    return () => clearInterval(intervalId);
  }, []);

  const sortedRows = arrAgentes.sort((a, b) => a.sentimiento - b.sentimiento);

  return (
    <TableContainer
      component={Paper}
      className="tabla"
      sx={{ maxWidth: "90%" }}
    >
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell className="tabla-head tabla-celda">Nombre</TableCell>
            <TableCell className="tabla-head tabla-celda">Semáforo</TableCell>
            <TableCell className="tabla-head tabla-celda">
              Sentimiento
            </TableCell>
            <TableCell className="tabla-head tabla-celda">
              Nombre del cliente
            </TableCell>
            <TableCell className="tabla-head tabla-celda">
              Saldo del cliente
            </TableCell>
            <TableCell className="tabla-head tabla-celda">
              Duración de llamada actual
            </TableCell>
            <TableCell className="tabla-head tabla-celda">
              Agendar 1:1
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedRows.map((agente) => (
            <TableRow key={agente.id}>
              <TableCell className="tabla-celda">{agente.nombre}</TableCell>
              <TableCell className="tabla-celda">
                {agente.semaforo !== "-" ? (
                  <CircleIcon style={agente.semaforo}></CircleIcon>
                ) : (
                  "-"
                )}
              </TableCell>
              <TableCell className="tabla-celda">
                {agente.sentimientoImg ? (
                  <img src={agente.sentimientoImg} alt="Sentimiento"></img>
                ) : (
                  "-"
                )}
              </TableCell>
              <TableCell className="tabla-celda">{agente.cliente}</TableCell>
              <TableCell className="tabla-celda">{`$${agente.saldo}`}</TableCell>
              <TableCell className="tabla-celda">
                {formatearDuracion(agente.duracion)}
              </TableCell>
              <TableCell>
                <OneOnOne id={agente.id}></OneOnOne>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EmpleadosTabla;
