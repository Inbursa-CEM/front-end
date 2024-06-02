import * as React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { axisClasses } from "@mui/x-charts";
import { useState, useCallback, useEffect } from "react";

export default function PromedioDuracionLlamadasAgente() {
  const idSupervisor = sessionStorage.getItem("supervisorId"); // Obtener el ID del supervisor

  const [url, setUrl] = useState(
    `http://localhost:8080/llamada/promedioDuracionPorAgente?idSupervisor=${idSupervisor}`
  );

  const [agentes, setAgentes] = useState([]);
  const [promedios, setPromedios] = useState([]);

  const descargar = useCallback(() => {
    console.log("Descargando datos");
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const nombresAgentes = data.map((agente) => agente.Usuario.nombre);
        setAgentes(nombresAgentes);
        const promedios = data.map((agente) => parseFloat(agente.promedioDuracion));
        setPromedios(promedios);
      })
      .catch((error) => console.log(error));
  }, [url]); // Añadir url como dependencia

  useEffect(() => {
    descargar();

    const interval = setInterval(() => {
      descargar();
    }, 600000);

    return () => clearInterval(interval);
  }, [descargar]); // Añadir descargar como dependencia

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
