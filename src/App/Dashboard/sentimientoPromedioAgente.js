import * as React from "react";
import { BarChart, axisClasses } from "@mui/x-charts";
import { useState, useCallback, useEffect } from "react";

export default function SentimientoPromedioAgente() {
  const idSupervisor = sessionStorage.getItem("userId");
  const [url, setUrl] = useState(
    `http://10.48.81.212:8080/llamada/sentimientoPorAgente=1`
  );
  const [data, setData] = useState([]);
  const [agentes, setAgentes] = useState([]);

  const descargar = useCallback(() => {
    console.log("Descargando datos");
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const agentes = data.map((agente) => agente.Usuario.nombre);
        const positivo = data.map((agente) => agente.positivo);
        const negativo = data.map((agente) => agente.negativo);
        const neutral = data.map((agente) => agente.neutral);

        setAgentes(agentes);
        setData([
          { label: 'Positivo', data: positivo },
          { label: 'Negativo', data: negativo },
          { label: 'Neutral', data: neutral },
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
          transform: "rotateZ(-70deg) translateX(-50px)",
          fontSize: "10px !important",
        },
      }}
    />
  );
}
