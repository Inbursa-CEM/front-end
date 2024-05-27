import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { useState, useCallback, useEffect } from "react";

export default function NumeroLlamadasPorAgente() {
  const [url, setUrl] = useState(
    "http://10.48.81.212:8080/llamada/numLlamadasPorAgente"
  );
  const [data, setData] = useState([]);

  const descargar = useCallback(() => {
    console.log("Descargando datos");
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const dataFormateada = data.map((agente, index) => ({
          id: agente.idUsuario,
          value: agente.numLlamadas,
          label: agente.Usuario.nombre,
        }));

        setData(dataFormateada);
      })
      .catch((error) => console.log(error));
  },[url]);

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
    <PieChart
      series={[
        {
          data,
          highlightScope: { faded: "global", highlighted: "item" },
          faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
        },
      ]}
      height={250}
      width={500}
      slotProps={{legend: {hidden: true}}}
    />
  );
}
