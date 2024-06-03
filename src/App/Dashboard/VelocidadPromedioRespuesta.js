import * as React from "react";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import { useState, useCallback, useEffect } from "react";

export default function VelocidadPromedioRespuesta() {
  const idSupervisor = sessionStorage.getItem("userId");
  const [url, setUrl] = useState(
    `http://localhost:8080/llamada/numLlamadasTotales?idSupervisor=${idSupervisor}`
  );
  const [velocidadPromedio, setVelocidadPromedio] = useState([0]);

  //Esta función se encarga de descargar los datos de la API y actualizar el estado de la variable data que alimenta al componente gráfico
  const descargar = useCallback(() => {
    console.log("Descargando datos");
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setVelocidadPromedio(data.promedioRespuesta);
      })
      .catch((error) => console.log(error));
  });

  //Primero se llama a la función descargar inmediatamente al montar el componente, Configura el intervalo para llamar a descargar cada 10 
  //minutos (600000 ms) y se limpia el intervalo al desmontar el componente
  useEffect(() => {
    descargar();

    const interval = setInterval(() => {
      descargar();
    }, 600000);

    return () => clearInterval(interval);
  }, []);

  const settings = {
    width: 200,
    height: 200,
    value: velocidadPromedio,
    valueMax: 5,
    valueMin: 0,
  };

  return (
    <Gauge
      {...settings}
      cornerRadius="50%"
      sx={(theme) => ({
        [`& .${gaugeClasses.valueText}`]: {
          fontSize: 40,
        },
        [`& .${gaugeClasses.valueArc}`]: {
          fill: "#52b202",
        },
        [`& .${gaugeClasses.referenceArc}`]: {
          fill: theme.palette.text.disabled,
        },
      })}
    >
      <text x="50%" y="65%" textAnchor="middle" dy="0.3em" fontSize="1.5em">
        {" "}
        min{" "}
      </text>
    </Gauge>
  );
}
