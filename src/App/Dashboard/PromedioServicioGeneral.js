import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import * as React from "react";
import { useState, useCallback, useEffect } from "react";

export default function PromedioServicioGeneral() {
  const [url, setUrl] = useState(
    "http://10.48.81.212:8080/llamada/promedioServicioGeneral"
  );
  const [promedio, setPromedio] = useState([0]);

  const descargar = useCallback(() => {
    console.log("Descargando datos");
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setPromedio((data.promedioServicioGeneral).toFixed(2));
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
    
    <Gauge
      width={250}
      height={200}
      value={promedio}
      startAngle={-110}
      endAngle={110}
      sx={{
        [`& .${gaugeClasses.valueText}`]: {
          fontSize: 40,
          transform: "translate(0px, 0px)",
        },
      }}
      text={({ value, valueMax }) => `${value} %`}
    />
  );
}
