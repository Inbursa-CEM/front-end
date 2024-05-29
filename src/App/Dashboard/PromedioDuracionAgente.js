import * as React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { axisClasses } from "@mui/x-charts";
import { useState, useCallback, useEffect } from "react";

export default function PromedioDuracionLlamadasAgente() {
  const idSupervisor = sessionStorage.getItem("userId");
  const [url, setUrl] = useState(
    `http://10.48.81.212:8080/llamada/promedioDuracionPorAgente?idSupervisor=${idSupervisor}`
  );

  const [agentes, setAgentes] = useState([]);
  const [promedios, setPromedios] = useState([]);

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
          transform: "rotateZ(-70deg) translateY(60px) translateX(-60px)",
          fontSize: "15px !important",
        },
      }}
    />
  );
}
