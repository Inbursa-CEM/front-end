import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import * as React from "react";
import { useState, useCallback, useEffect } from "react";

export default function PromedioServicioGeneral() {
  const [url, setUrl] = useState(
    "http://localhost:8080/llamada/promedioServicioGeneral"
  );
  const [promedio, setPromedio] = useState([0]);

  const descargar = useCallback(() => {
    console.log("Descargando datos");
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setPromedio(data.promedioServicioGeneral);
      })
      .catch((error) => console.log(error));
  });

  useEffect(() => {
    descargar();
  }, []);

  return (
    <Gauge
      width={250}
      height={200}
      value={promedio}
      startAngle={-110}
      endAngle={110}
      valueMax={100}
      sx={{
        [`& .${gaugeClasses.valueText}`]: {
          fontSize: 40,
          transform: "translate(0px, 0px)",
        },
      }}
      text={({ value, valueMax }) => `${value} / ${valueMax}`}
    />
  );
}
