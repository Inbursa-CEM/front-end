import * as React from "react";
import { BarChart } from "@mui/x-charts";
import { useState, useCallback, useEffect } from "react";

export default function SentimientoPromedioAgente() {
  const [url, setUrl] = useState(
    "http://localhost:8080/llamada/sentimientoPorAgente"
  );
  const [data, setData] = useState([]);
  const [agentes, setAgentes] = useState([]);

  const descargar = useCallback(() => {
    console.log("Descargando datos");
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const dataFormateada = data.map((agente) => ({
          data: [agente.positivo, agente.negativo, agente.neutral],
        }));
        const agentes = data.map((agente) => agente.idUsuario);
        setAgentes(agentes);
        setData(dataFormateada);
        console.log(dataFormateada);
      })
      .catch((error) => console.log(error));
  });
  console.log(data);
  useEffect(() => {
    descargar();
  }, []);

  return (
    <BarChart
      xAxis={[{ scaleType: "band", data: agentes }]}
      series={data}
      width={500}
      height={250}
    />
  );
}
