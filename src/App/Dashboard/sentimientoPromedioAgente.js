import * as React from "react";
import { BarChart } from "@mui/x-charts";
import { useState, useCallback, useEffect } from "react";

export default function SentimientoPromedioAgente() {
  const [url, setUrl] = useState(
    "http://10.48.81.212:8080/llamada/sentimientoPorAgente"
  );
  const [data, setData] = useState([]);
  const [agentes, setAgentes] = useState([]);

  const descargar = useCallback(() => {
    console.log("Descargando datos");
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const agentes = data.map((agente) => agente.idUsuario);
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
    descargar()

    const intervalId = setInterval(() => {
      descargar();
    }, 30 * 60 * 1000);

    return () => clearInterval(intervalId); 
  }, [descargar]);

  return (
    <BarChart
      xAxis={[{ scaleType: "band", data: agentes }]}
       series={data.map((item) => ({
        label: item.label,
        data: item.data,
      }))}
      width={500}
      height={250}
    />
  );
}
