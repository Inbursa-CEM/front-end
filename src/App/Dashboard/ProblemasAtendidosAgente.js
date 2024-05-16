import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { useState, useCallback, useEffect } from "react";

export default function ProblemasAtendidosAgente() {
  const [url, setUrl] = useState(
    "http://10.48.81.212:8080/llamada/reportesAtendidosPorAgente"
  );
  const [data, setData] = useState([]);
  const [agentes, setAgentes] = useState([]);
  const [resueltos, setResueltos] = useState([]);
  const [noResueltos, setNoResueltos] = useState([]);

  const descargar = useCallback(() => {
    console.log("Descargando datos");
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const agentes = data.map((agente) => agente.idUsuario);
        const resueltos = data.map((agente) => agente.problemasResueltos);
        const noResueltos = data.map((agente) => agente.problemasNoResueltos);

        setAgentes(agentes);
        setData([
          { label: 'Resueltos', data: resueltos },
          { label: 'Pendientes', data: noResueltos }
        ]);
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
       series={data.map((item) => ({
        label: item.label,
        data: item.data,
      }))}
      width={500}
      height={250}
    />
  );
}
