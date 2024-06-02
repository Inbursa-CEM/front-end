import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts";
import { useState, useCallback, useEffect } from "react";
import { Box } from "@mui/material";

export default function ProblemasAtendidosAgente() {
  const idSupervisor = sessionStorage.getItem("userId");
  const [url, setUrl] = useState(
    `http://localhost:8080/llamada/reportesAtendidosPorAgente?idSupervisor=${idSupervisor}`
  );
  const [data, setData] = useState([]);
  const [agentes, setAgentes] = useState([]);

  const descargar = useCallback(() => {
    console.log("Descargando datos");
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const agentes = data.map((agente) => agente.Usuario.nombre);
        const Resueltos = data.map((agente) => agente.promedioProblemasResueltos);
        const NoResueltos = data.map((agente) => agente.promedioProblemasResueltos);
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

  useEffect(() => {
    // Llama a la función descargar inmediatamente al montar el componente
    descargar();

    // Configura el intervalo para llamar a descargar cada 10 minutos (600000 ms)
    const interval = setInterval(() => {
      descargar();
    }, 600000);

    // Limpia el intervalo al desmontar el componente
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