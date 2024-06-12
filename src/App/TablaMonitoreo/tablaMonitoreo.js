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
import buena from "../../Assets/calidad-buena.svg";
import neutra from "../../Assets/calidad-neutra.svg";
import pesima from "../../Assets/calidad-pesima.svg";
import PopProfile from "./popUp";

const EmpleadosTabla = () => {
  const host = process.env.REACT_APP_BACK_HOST;
  const [arrAgentes, setArrAgentes] = useState([]);
  const navegar = useNavigate();

  const url = `http://${host}:8080/usuario/infoActualAgentes?supervisor=${sessionStorage.getItem(
    "userId"
  )}`;

  // Función que obtiene el sentimiento real de una llamada a partir de su contactId
  const getSentimientoReal = useCallback((contactId) => {
    const urlSentimiento = `http://${host}:8080/llamada/transcripcion/${contactId}`;
    let sentimiento = "NEUTRAL";

    fetch(urlSentimiento)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Error en la petición");
      })
      .then((data) => {
        // console.log("Datos obtenidos del servidor:", data);
        const sentiments = data[0]?.Segments.map(
          (segment) => segment.Transcript.Sentiment
        );
        const latestSentiment = sentiments
          ? sentiments[sentiments.length - 1]
          : "NEUTRAL";
        if (latestSentiment !== sentimiento) {
          sentimiento = latestSentiment;
        }
      })
      .catch((error) => console.log(error));
    
    return sentimiento;
  });

  // Función que obtiene el sentimiento de una llamada a partir de su duración y contactId
  // Si se tiene un contactId, se obtiene el sentimiento real de la llamada
  // Si no se tiene un contactId, se asigna un sentimiento aleatorio
  function getSentimiento(duracion, contactId) {
    // Si no hay duración, se asigna 4 para indicar que no hay sentimiento
    if (!duracion) {
      return 4;
    }
    // Si no hay contactId, se asigna un sentimiento aleatorio
    if (!contactId) {
      const randomNumber = Math.random();
      if (randomNumber < 0.33) {
        return 1; // Sentimiento negativo
      } else if (randomNumber < 0.66) {
        return 2; // Sentimiento neutro
      } else {
        return 3; // Sentimiento positivo
      }
    }
    // Si hay contactId, se obtiene el sentimiento real de la llamada
    const sentimiento = getSentimientoReal(contactId);
    if (sentimiento === "NEGATIVE") {
      return 1; // Sentimiento negativo
    } else if (sentimiento === "NEUTRAL") {
      return 2; // Sentimiento neutro
    } else {
      return 3; // Sentimiento positivo
    }
  }

  // Función que regresa la imagen del sentimiento de una llamada
  function getImgSentimiento(sentimiento) {
    // console.log("Sentimiento:", sentimiento);
    if (sentimiento === 4) {
      return null; // No hay sentimiento
    } else if (sentimiento === 1) {
      return pesima; // Sentimiento negativo
    } else if (sentimiento === 2) {
      return neutra; // Sentimiento neutro
    } else {
      return buena; // Sentimiento positivo
    }
  }

  // Función que regresa el color del semáforo dependiendo de la duración de la llamada
  function getSemaforo(duracion) {
    if (duracion < 45) {
      return { color: "#43C257" }; // Semáforo verde
    } else if (duracion < 60) {
      return { color: "#D7920C" }; // Semáforo amarillo
    } else {
      return { color: "#E42424" }; // Semáforo rojo
    }
  }

  // Función que formatea la duración de la llamada en formato HH:MM:SS
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

  // Función que descarga los datos de los agentes del servidor
  const descargar = useCallback(() => {
    const token = sessionStorage.getItem("userToken");

    // Objeto con las opciones de la petición
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
        // console.log("Datos obtenidos del servidor:", data);
        const arrNuevo = data.map((agente) => {
          const sentimiento = getSentimiento(agente.duracion, agente.contactId);
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

  // Descargar los datos de los agentes y actualizar cada 5 segundos
  useEffect(() => {
    descargar();
    const intervalId = setInterval(descargar, 5000); // Repetir la descarga de datos cada 5 segundos

    return () => clearInterval(intervalId);
  }, [descargar]);

  // Incrementar la duración de la llamada cada segundo
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

  // Ordenar los agentes por sentimiento
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
              {/* Nombre del agente*/}
              <TableCell className="tabla-celda pointer-celda">
                <PopProfile idAgente={agente.id} nombreAgente={agente.nombre}></PopProfile>
              </TableCell>
              {/* Semáforo */}
              <TableCell className="tabla-celda">
                {agente.semaforo !== "-" ? (
                  <CircleIcon style={agente.semaforo}></CircleIcon>
                ) : (
                  "-"
                )}
              </TableCell>
              {/* Sentimiento */}
              <TableCell className="tabla-celda">
                {agente.sentimientoImg ? (
                  <img src={agente.sentimientoImg} alt="Sentimiento"></img>
                ) : (
                  "-"
                )}
              </TableCell>
              {/* Nombre del cliente */}
              <TableCell className="tabla-celda">{agente.cliente}</TableCell>
              {/* Saldo del cliente */}
              <TableCell className="tabla-celda">{`$${agente.saldo}`}</TableCell>
              {/* Duración de la llamada */}
              <TableCell className="tabla-celda">
                {formatearDuracion(agente.duracion)}
              </TableCell>
              {/* Agendar 1:1 */}
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
