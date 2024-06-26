//Autor: Gustavo Alejandro Gutiérrez Valdes Fecha: 10 de mayo de 2024

import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { useState, useCallback, useEffect } from "react";

//NumeroLlamadasPorAgente es un componente que muestra la cantidad de llamadas que ha realizado cada agente
export default function NumeroLlamadasPorAgente() {
  const idSupervisor = sessionStorage.getItem("userId");
  const url = `http://${process.env.REACT_APP_BACK_HOST}:8080/llamada/numLlamadasPorAgente?idSupervisor=${idSupervisor}`;
  const [data, setData] = useState([]);

  //Esta función se encarga de descargar los datos de la API y actualizar el estado de la variable data que alimenta al componente gráfico
  const descargar = useCallback(() => {
    console.log("Descargando datos");
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const dataFormateada = data.map((agente, index) => ({
          id: index,
          value: agente.numLlamadas,
          label: agente.nombre,
        }));

        setData(dataFormateada);
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

  console.log("Data Formateada: ", data);
  return (
    <PieChart
      series={[
        {
          data,
          highlightScope: { faded: "global", highlighted: "item" },
          faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
        },
      ]}
      height={250}
      width={500}
      slotProps={{ legend: { hidden: true } }}
    />
  );
}
