import * as React from "react";
import { useState, useCallback, useEffect } from "react";
import { LineChart, axisClasses } from "@mui/x-charts";

export default function PromedioServicioPorAgente() {
  const idSupervisor = sessionStorage.getItem("userId");

  const [url, setUrl] = useState(
    `http://10.48.81.212:8080/llamada/promedioServicioPorAgente=${idSupervisor}`
  );
  const [agentes, setAgentes] = useState([]);
  const [promedios, setPromedios] = useState([]);

  const descargar = useCallback(() => {
    console.log("Descargando datos");
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const nombresAgente = data.map((agente) => agente.idUsuario + ' ' +agente.Usuario.nombre);
        setAgentes(nombresAgente);
        const promedios = data.map((agente) => agente.promedioProblemasResueltos);
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
      width={900}
      height={250}
      sx={{
        [`.${axisClasses.bottom} .${axisClasses.tickLabel}`]: {
          transform: "rotateZ(-70deg) translateX(-90px)",
          fontSize: "20px !important",
        },
      }}
    />
  );
}
