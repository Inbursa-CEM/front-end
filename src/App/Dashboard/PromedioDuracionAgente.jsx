//Autor: Gustavo Alejandro Gutiérrez Valdes Fecha: 13 de mayo de 2024

import * as React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { axisClasses } from "@mui/x-charts";
import { useState, useCallback, useEffect } from "react";

//PromedioDuracionLlamadasAgente es un componente que muestra el promedio de duración de las llamadas por agente
export default function PromedioDuracionLlamadasAgente() {
  const idSupervisor = sessionStorage.getItem("userId");
  const url = `http://${process.env.REACT_APP_BACK_HOST}:8080/llamada/promedioDuracionPorAgente?idSupervisor=${idSupervisor}`;
  const [agentes, setAgentes] = useState([]);
  const [promedios, setPromedios] = useState([]);

  //Esta función se encarga de descargar los datos de la API y actualizar el estado de la variable data que alimenta al componente gráfico
  const descargar = useCallback(() => {
    console.log("Descargando datos");
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const nombresAgentes = data.map((agente) => agente.nombre);
        setAgentes(nombresAgentes);
        const promedios = data.map((agente) => agente.tiempoPromedio);
        setPromedios(promedios);
      })
      .catch((error) => console.log(error));
  }, [url]);

  //Primero se llama a la función descargar inmediatamente al montar el componente, Configura el intervalo para llamar a descargar cada 5
  //minutos (300000 ms) y se limpia el intervalo al desmontar el componente
  useEffect(() => {
    descargar();

    const interval = setInterval(() => {
      descargar();
    }, 300000);

    return () => clearInterval(interval);
  }, [descargar]);

  return (
    <LineChart
      xAxis={[{ data: agentes, scaleType: "band" }]}
      series={[
        {
          data: promedios,
          area: true,
        },
      ]}
      width={1000}
      height={250}
      sx={{
        [`.${axisClasses.bottom} .${axisClasses.tickLabel}`]: {
          transform: "rotateZ(-70deg) translateY(60px) translateX(-190px)",
          fontSize: "15px !important",
        },
      }}
    />
  );
}
