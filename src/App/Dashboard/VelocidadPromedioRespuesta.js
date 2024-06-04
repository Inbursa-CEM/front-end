import * as React from "react";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import { useState, useCallback, useEffect } from "react";

//VelocidadPromedioRespuesta es un componente que muestra la velocidad promedio que tarda un agente en dar resultado a un reporte o llamada
export default function VelocidadPromedioRespuesta() {
  const idSupervisor = sessionStorage.getItem("userId");
  const [url, setUrl] = useState(
    `http://${process.env.REACT_APP_BACK_HOST}:8080/llamada/velocidadPromedio?idSupervisor=${idSupervisor}`
  );
  const [velocidadPromedio, setVelocidadPromedio] = useState([0]);

  //Esta función se encarga de descargar los datos de la API y actualizar el estado de la variable data que alimenta al componente gráfico
  const descargar = useCallback(() => {
    console.log("Descargando datos");
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setVelocidadPromedio(data.velocidadPromedio);
      })
      .catch((error) => console.log(error));
  });

  //Primero se llama a la función descargar inmediatamente al montar el componente, Configura el intervalo para llamar a descargar cada 5 
  //minutos (300000 ms) y se limpia el intervalo al desmontar el componente
  useEffect(() => {
    descargar();

    const interval = setInterval(() => {
      descargar();
    }, 300000);

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
