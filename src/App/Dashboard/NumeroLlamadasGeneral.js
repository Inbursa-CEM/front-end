import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import * as React from "react";
import { useState, useCallback, useEffect } from "react";

export default function NumeroLlamadasGeneral() {
  const [url, setUrl] = useState(
    "http://10.48.81.212:8080/llamada/numLlamadasTotales"
  );
  const [llamadas, setLlamadas] = useState([0]);

  const descargar = useCallback(() => {
    console.log("Descargando datos");
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setLlamadas(data.LlamadasTotales);
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
      value={llamadas}
      valueMax={100}
      startAngle={-110}
      endAngle={110}
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
