import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts";
import { useState, useCallback, useEffect } from "react";
import { Box } from "@mui/material";

//ProblemasAtendidosAgente es un componente que se encarga de mostrar la cantidad de problemas resueltos, no resueltos y el promedio de problemas resueltos por agente
export default function ProblemasAtendidosAgente() {
  const idSupervisor = sessionStorage.getItem("userId");
  const [url, setUrl] = useState(
    `http://${process.env.REACT_APP_BACK_HOST}:8080/llamada/reportesAtendidosPorAgente?idSupervisor=${idSupervisor}`
  );
  const [data, setData] = useState([]);
  const [agentes, setAgentes] = useState([]);

  //Esta función se encarga de descargar los datos de la API y actualizar el estado de la variable data que alimenta al componente gráfico
  const descargar = useCallback(() => {
    console.log("Descargando datos");
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const agentes = data.map((agente) => agente.Usuario.nombre);
        const Resueltos = data.map((agente) => agente.problemasResueltos);
        const NoResueltos = data.map((agente) => agente.problemasNoResueltos);
        const promedioResueltos = data.map((agente) => agente.promedioProblemasResueltos);

        setAgentes(agentes);
        setData([
          { label: 'Resueltos', data: Resueltos },
          { label: 'No Resueltos', data: NoResueltos },
          { label: 'Promedio Resueltos', data: promedioResueltos }
        ]);
      })
      .catch((error) => console.log(error));
  });

  //Primero se llama a la función descargar inmediatamente al montar el componente, Configura el intervalo para llamar a descargar cada 5 
  //minutos (300000 ms) y se limpia el intervalo al desmontar el componente
  useEffect(() => {
    descargar();

    const interval = setInterval(() => {
      descargar();
    }, 300000);

    return () => clearInterval(interval);
  }, []);

  return (
    <BarChart
      xAxis={[{ scaleType: "band", data: agentes }]}
      series={data.map((item) => ({
        label: item.label,
        data: item.data,
      }))}
      width={500}
      height={230}
      sx={{
        [`.${axisClasses.bottom} .${axisClasses.tickLabel}`]: {
          transform: "rotateZ(-70deg) translateX(-90px)",
          fontSize: "10px !important",
        },
      }}
    />
  );
}