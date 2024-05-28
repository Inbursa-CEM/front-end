import * as React from "react";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import { useState, useCallback, useEffect } from "react";


export default function EstatusAgentes() {
  const idSupervisor = sessionStorage.getItem("userId");
  const [url, setUrl] = useState("http://10.48.81.212:8080/usuario/estatusAgente=${idSupervisor}")
  const [data, setData] = useState([]);

  const size = {
    width: 400,
    height: 200,
  };

  const descargar = useCallback(() => {
    console.log("Descargando datos");
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const activos = data.activos
        const inactivos = data.inactivos

        console.log(activos, inactivos)

        setData([
          { value: inactivos, label: "Inactivos" },
          { value: activos, label: "Activos" },
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
    <PieChart
      colors={["#CD0101", "#07B11E"]}
      series={[
        {
          data,
          highlightScope: { faded: "global", highlighted: "item" },
          faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
        },
      ]}
      sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fill: "white",
          fontWeight: "bold",
        },
      }}
      {...size}
    />
  );
}
