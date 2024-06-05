//Autor: Gustavo Alejandro Gutiérrez Valdes Fecha: 9 de mayo de 2024

import * as React from "react";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import { useState, useCallback, useEffect } from "react";

//EstatusAgentes es un componente que muestra la cantidad de agentes que están activos e inactivos
export default function EstatusAgentes() {
  const idSupervisor = sessionStorage.getItem("userId");
  const [url, setUrl] = useState(`http://${process.env.REACT_APP_BACK_HOST}:8080/usuario/estatusAgente?idSupervisor=${idSupervisor}`)
  const [data, setData] = useState([]);

  const size = {
    width: 400,
    height: 200,
  };
//Esta función se encarga de descargar los datos de la API y actualizar el estado de la variable data que alimenta al componente gráfico
  const descargar = useCallback(() => {
    console.log("Descargando datos");
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const activos = data.activos
        const inactivos = data.inactivos

        console.log(activos, inactivos)

        setData([
          { value: inactivos, label: "Inactivos" },
          { value: activos, label: "Activos" },
        ]);
      })
      .catch((error) => console.log(error));
  });

  //Primero se llama a la función descargar inmediatamente al montar el componente, Configura el intervalo para llamar a descargar cada 1 
  //minuto (60000 ms) y se limpia el intervalo al desmontar el componente
  useEffect(() => {
    descargar();

    const interval = setInterval(() => {
      descargar();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <PieChart
      colors={["#CD0101", "#07B11E"]}
      series={[
        {
          data,
          highlightScope: { faded: "global", highlighted: "item" },
          faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
        },
      ]}
      sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fill: "white",
          fontWeight: "bold",
        },
      }}
      {...size}
    />
  );
}
