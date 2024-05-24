import * as React from "react";
import { useState, useCallback, useEffect } from "react";
import { LineChart, axisClasses } from "@mui/x-charts";

export default function PromedioServicioPorAgente() {
  const [url, setUrl] = useState(
    "http://10.48.81.212:8080/llamada/promedioServicioPorAgente"
  );
  const [agentes, setAgentes] = useState([]);
  const [promedios, setPromedios] = useState([]);

  const descargar = useCallback(() => {
    console.log("Descargando datos");
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const idsAgente = data.map((agente) => agente.idUsuario);
        setAgentes(idsAgente);
        const promedios = data.map(
          (agente) => agente.promedioProblemasResueltos
        );
        setPromedios(promedios);
      })
      .catch((error) => console.log(error));
  });

  useEffect(() => {
    descargar()

    const intervalId = setInterval(() => {
      descargar();
    }, 30 * 60 * 1000);

    return () => clearInterval(intervalId); 
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
      width={900}
      height={250}
      sx={{
        [`.${axisClasses.bottom} .${axisClasses.tickLabel}`]: {
          transform: "rotateZ(-70deg) translateY(60px) translateX(-60px)",
          fontSize: "20px !important",
        },
      }}
    />
  );
}
