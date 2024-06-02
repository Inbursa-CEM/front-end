import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { useState, useCallback, useEffect } from "react";

export default function NumeroLlamadasPorAgente() {
  const idSupervisor = sessionStorage.getItem("userId");
  const [url, setUrl] = useState(
    `http://localhost:8080/llamada/numLlamadasPorAgente?idSupervisor=${idSupervisor}`
  );
  const [data, setData] = useState([]);

  const descargar = useCallback(() => {
    console.log("Descargando datos");
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const dataFormateada = data.map((agente, index) => ({
          id: index,
          value: agente.numLlamadas,
          label: agente.nombre,
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

  console.log("Data Formateada: ", data);
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