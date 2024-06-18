//Autor: Gustavo Alejandro Gutiérrez Valdes Fecha: 11 de mayo de 2024

import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import * as React from "react";
import { useState, useCallback, useEffect } from "react";

//PromedioServicioGeneral es un componente que muestra el promedio de calificación de servicio general (todos los agentes)
export default function PromedioServicioGeneral() {
  const idSupervisor = sessionStorage.getItem("userId");
  const url = `http://${process.env.REACT_APP_BACK_HOST}:8080/llamada/promedioServicioGeneral?idSupervisor=${idSupervisor}`;
  const [promedio, setPromedio] = useState([0]);

  //Esta función se encarga de descargar los datos de la API y actualizar el estado de la variable data que alimenta al componente gráfico
  const descargar = useCallback(() => {
    console.log("Descargando datos");
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setPromedio(data.promedioServicioGeneral.toFixed(2));
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
    <Gauge
      width={250}
      height={200}
      value={promedio}
      startAngle={-110}
      endAngle={110}
      sx={{
        [`& .${gaugeClasses.valueText}`]: {
          fontSize: 40,
          transform: "translate(0px, 0px)",
        },
      }}
      text={({ value, valueMax }) => `${value} %`}
    />
  );
}
