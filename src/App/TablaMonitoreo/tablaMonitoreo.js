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
import LightModeIcon from '@mui/icons-material/LightMode';
import OneOnOne from "./OneOnOne";

const EmpleadosTabla = () => {
  const [arrAgentes, setArrAgentes] = useState([]);
  const url = "http://localhost:8080/usuario/infoActualAgentes?supervisor=1";

  const sentimientoPositivo =
    "https://inbursa-lau.s3.amazonaws.com/calidad-buena.svg";
  const sentimientoNeutro =
    "https://inbursa-lau.s3.amazonaws.com/calidad-neutra.svg";
  const sentimientoNegativo =
    "https://inbursa-lau.s3.amazonaws.com/calidad-pesima.svg";

  function getSentimientoRandom() {
    const randomNumber = Math.random();

    if (randomNumber < 0.33) {
      return sentimientoPositivo;
    } else if (randomNumber < 0.66) {
      return sentimientoNeutro;
    } else {
      return sentimientoNegativo;
    }
  }

  function getSemaforoRandom() {
    const randomNumber = Math.random();

    if (randomNumber < 0.33) {
      return {color: "#43C257"};
    } else if (randomNumber < 0.66) {
      return {color: "#D7920C"};
    } else {
      return {color: "#E42424"};
    }
  }

  function formatearDuracion(totalSegundos) {
    const horas = Math.floor(totalSegundos / 3600);
    const minutosRestantes = totalSegundos % 3600;
    const minutos = Math.floor(minutosRestantes / 60);
    const segundos = minutosRestantes % 60;
    return `${horas}:${minutos}:${segundos}`;
  }

  const descargar = useCallback(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log("Datos obtenidos del servidor:", data);
        const arrNuevo = data.map((agente) => {
          const agenteNuevo = {
            id: agente.id,
            nombre: agente.nombreAgente,
            duracion: agente.duracion ? formatearDuracion(agente.duracion) : "-",
            cliente: agente.nombreCliente ? agente.nombreCliente : "-",
            saldo: agente.saldoCliente ? agente.saldoCliente : "-",
          };
          return agenteNuevo;
        });
        setArrAgentes(arrNuevo);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    console.log("Descargando datos");
    descargar();
  }, [descargar]);

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
          {arrAgentes.map((agente) => (
            <TableRow key={agente.id}>
              <TableCell className="tabla-celda">{agente.nombre}</TableCell>
              <TableCell className="tabla-celda"><LightModeIcon style={getSemaforoRandom()}></LightModeIcon></TableCell>
              <TableCell className="tabla-celda">
                <img src={getSentimientoRandom()}></img>
              </TableCell>
              <TableCell className="tabla-celda">{agente.cliente}</TableCell>
              <TableCell className="tabla-celda">{`$${agente.saldo}`}</TableCell>
              <TableCell className="tabla-celda">{agente.duracion}</TableCell>
              <TableCell><OneOnOne></OneOnOne></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EmpleadosTabla;
