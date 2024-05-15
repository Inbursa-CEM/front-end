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

const EmpleadosTabla = () => {
  const [arrAgentes, setArrAgentes] = useState([]);
  const url = "http://localhost:8080/usuario/infoActualAgentes?supervisor=1";

  const sentimientoPositivo =
    "https://inbursa-lau.s3.us-east-1.amazonaws.com/calidad-buena.svg?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDYaCXVzLWVhc3QtMSJHMEUCIQDZthFodCFhi8gyVWBmqv2fwZzBXumI%2FrNlqvD2enz%2B9AIgRJekB6Lanq6ePPOZJg7p41Sg3V1u4k%2F%2BGwJL%2FtOttWAqiQMIn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARABGgwyMDY3MTMxMTQ5OTEiDIkqy95c0zwdoA2z1yrdAmA3jof1eDQAmj3If7XkJ89bDQyoeEIQV%2Fdeh4pc0kIPb6swkeFzYRQOWcEpa51dFjWg%2FOdo6I%2Fl28gdhLGzI5fA9agE8LvwJeQBvGODmEzCtZUIiu1ICXy0pgT0pcBNFiYE%2B3DA9r42Add6HyiFAGVfesHyOzNhYT5apwAIrNXW5RcOxY4FWaAYEnHoAUmx99G1EhDWBo4gf5momMD25wWKsjWuA0jcM%2BafDt03H7MDdcwJ4ThWjWSMDb%2FUFbcFpzGdK1kmiskDyYVZWNTPDP01tmmcR%2FyOunahpxEpp%2FnosPDyyfVf0ueCtGoKSzS19ZquUE6D14SP1LPWF9zq5Q1VlaaFMZE0v8Z6dj9X9bXsPVT1o3xnbRQT%2FO16ND3dSRY4Cu9rH2%2FzRUgdOV%2BJOI3N9GADfS%2FcinQLkEGYTkKUSunF%2BIYL8Fl8TILx2dlkhlpqz99Ylhzr6DtvzvYw15SRsgY6hwIQ4B6Bk4xGO0NsT%2Fckl1HENbpPWSOzEr%2FDD4nzCDNriDQoPEPKz8UXINiNQ5YTBSg73Cu79waKqgMsUb84BJi6hN2Vs60Jk6m8WDhcx4u5lTFObEWQb1nLKePx91vmgvmjQJ0jK90yzSVVaMkcMoaTE85LK8kP%2B2N%2B1dnTYpXA6Pb13Y5%2BEWRo2WdB9oDlZgMJ2OYtHiKC5WG4pSKwuAaSzorf8P%2FWfq6%2Fh%2BmwB49qsEFzobIJHBlDyOwCUcIgFYJTylKPICxnTrLMDLCBQ3fWJNbDcgZ0H1pH72vqUbygnlX7FT6nNfKQT5oyAmBi42jcOKk8DUpUzOF6Uu7%2FiIP8D5ppr7i2yA%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240515T075031Z&X-Amz-SignedHeaders=host&X-Amz-Expires=43200&X-Amz-Credential=ASIATAIIP2FXY3U2VR74%2F20240515%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=892bac612105f2087166c7da9caadb6004ddcb87a7e2a3a30b6be3735efb4e41";
  const sentimientoNeutro =
    "https://inbursa-lau.s3.us-east-1.amazonaws.com/calidad-neutra.svg?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDYaCXVzLWVhc3QtMSJHMEUCIQDZthFodCFhi8gyVWBmqv2fwZzBXumI%2FrNlqvD2enz%2B9AIgRJekB6Lanq6ePPOZJg7p41Sg3V1u4k%2F%2BGwJL%2FtOttWAqiQMIn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARABGgwyMDY3MTMxMTQ5OTEiDIkqy95c0zwdoA2z1yrdAmA3jof1eDQAmj3If7XkJ89bDQyoeEIQV%2Fdeh4pc0kIPb6swkeFzYRQOWcEpa51dFjWg%2FOdo6I%2Fl28gdhLGzI5fA9agE8LvwJeQBvGODmEzCtZUIiu1ICXy0pgT0pcBNFiYE%2B3DA9r42Add6HyiFAGVfesHyOzNhYT5apwAIrNXW5RcOxY4FWaAYEnHoAUmx99G1EhDWBo4gf5momMD25wWKsjWuA0jcM%2BafDt03H7MDdcwJ4ThWjWSMDb%2FUFbcFpzGdK1kmiskDyYVZWNTPDP01tmmcR%2FyOunahpxEpp%2FnosPDyyfVf0ueCtGoKSzS19ZquUE6D14SP1LPWF9zq5Q1VlaaFMZE0v8Z6dj9X9bXsPVT1o3xnbRQT%2FO16ND3dSRY4Cu9rH2%2FzRUgdOV%2BJOI3N9GADfS%2FcinQLkEGYTkKUSunF%2BIYL8Fl8TILx2dlkhlpqz99Ylhzr6DtvzvYw15SRsgY6hwIQ4B6Bk4xGO0NsT%2Fckl1HENbpPWSOzEr%2FDD4nzCDNriDQoPEPKz8UXINiNQ5YTBSg73Cu79waKqgMsUb84BJi6hN2Vs60Jk6m8WDhcx4u5lTFObEWQb1nLKePx91vmgvmjQJ0jK90yzSVVaMkcMoaTE85LK8kP%2B2N%2B1dnTYpXA6Pb13Y5%2BEWRo2WdB9oDlZgMJ2OYtHiKC5WG4pSKwuAaSzorf8P%2FWfq6%2Fh%2BmwB49qsEFzobIJHBlDyOwCUcIgFYJTylKPICxnTrLMDLCBQ3fWJNbDcgZ0H1pH72vqUbygnlX7FT6nNfKQT5oyAmBi42jcOKk8DUpUzOF6Uu7%2FiIP8D5ppr7i2yA%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240515T075122Z&X-Amz-SignedHeaders=host&X-Amz-Expires=43200&X-Amz-Credential=ASIATAIIP2FXY3U2VR74%2F20240515%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=4d8e55dc34e37d86602a9879bb1ace4bf1917985996c192711b6475f7804a36f";
  const sentimientoNegativo =
    "https://inbursa-lau.s3.us-east-1.amazonaws.com/calidad-pesima.svg?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDYaCXVzLWVhc3QtMSJHMEUCIQDZthFodCFhi8gyVWBmqv2fwZzBXumI%2FrNlqvD2enz%2B9AIgRJekB6Lanq6ePPOZJg7p41Sg3V1u4k%2F%2BGwJL%2FtOttWAqiQMIn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARABGgwyMDY3MTMxMTQ5OTEiDIkqy95c0zwdoA2z1yrdAmA3jof1eDQAmj3If7XkJ89bDQyoeEIQV%2Fdeh4pc0kIPb6swkeFzYRQOWcEpa51dFjWg%2FOdo6I%2Fl28gdhLGzI5fA9agE8LvwJeQBvGODmEzCtZUIiu1ICXy0pgT0pcBNFiYE%2B3DA9r42Add6HyiFAGVfesHyOzNhYT5apwAIrNXW5RcOxY4FWaAYEnHoAUmx99G1EhDWBo4gf5momMD25wWKsjWuA0jcM%2BafDt03H7MDdcwJ4ThWjWSMDb%2FUFbcFpzGdK1kmiskDyYVZWNTPDP01tmmcR%2FyOunahpxEpp%2FnosPDyyfVf0ueCtGoKSzS19ZquUE6D14SP1LPWF9zq5Q1VlaaFMZE0v8Z6dj9X9bXsPVT1o3xnbRQT%2FO16ND3dSRY4Cu9rH2%2FzRUgdOV%2BJOI3N9GADfS%2FcinQLkEGYTkKUSunF%2BIYL8Fl8TILx2dlkhlpqz99Ylhzr6DtvzvYw15SRsgY6hwIQ4B6Bk4xGO0NsT%2Fckl1HENbpPWSOzEr%2FDD4nzCDNriDQoPEPKz8UXINiNQ5YTBSg73Cu79waKqgMsUb84BJi6hN2Vs60Jk6m8WDhcx4u5lTFObEWQb1nLKePx91vmgvmjQJ0jK90yzSVVaMkcMoaTE85LK8kP%2B2N%2B1dnTYpXA6Pb13Y5%2BEWRo2WdB9oDlZgMJ2OYtHiKC5WG4pSKwuAaSzorf8P%2FWfq6%2Fh%2BmwB49qsEFzobIJHBlDyOwCUcIgFYJTylKPICxnTrLMDLCBQ3fWJNbDcgZ0H1pH72vqUbygnlX7FT6nNfKQT5oyAmBi42jcOKk8DUpUzOF6Uu7%2FiIP8D5ppr7i2yA%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240515T075224Z&X-Amz-SignedHeaders=host&X-Amz-Expires=43200&X-Amz-Credential=ASIATAIIP2FXY3U2VR74%2F20240515%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=75cb08dea55432e85c02fad1b160e406dd52eeeab0efbc60b7e2c64289cbe952";

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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EmpleadosTabla;
