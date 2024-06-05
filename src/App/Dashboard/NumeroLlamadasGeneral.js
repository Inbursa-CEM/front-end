//Autor: Gustavo Alejandro Gutiérrez Valdes Fecha: 11 de mayo de 2024

import { Button, TextField } from "@mui/material";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import * as React from "react";
import { useState, useCallback, useEffect } from "react";

//NumeroLlamadasGeneral es un componente funcional que se encarga de mostrar el número total de llamadas atendidas por el conjunto de agentes
export default function NumeroLlamadasGeneral() {
  const idSupervisor = sessionStorage.getItem("userId");
  const [url, setUrl] = useState(
    `http://${process.env.REACT_APP_BACK_HOST}:8080/llamada/numLlamadasTotales?idSupervisor=${idSupervisor}`
  );

  const [metaUrl, setMetaUrl] = useState(
    `http://${process.env.REACT_APP_BACK_HOST}:8080/usuario/meta?idSupervisor=${idSupervisor}`
  );

  const [llamadas, setLlamadas] = useState([0]);
  const [meta, setMeta] = useState([100]);
  const [inputVisible, setInputVisible] = useState(false);

  //Esta función se encarga de descargar los datos de la API y actualizar el estado de la variable data que alimenta al componente gráfico.
  const descargar = useCallback(() => {
    console.log("Descargando datos");
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setLlamadas(data.totalLlamadasHoy);
      })
      .catch((error) => console.log(error));
  });

  const descargarMeta = useCallback(() => {
    console.log("Descargando datos");
    fetch(metaUrl)
      .then((response) => response.json())
      .then((data) => {
        setMeta(data.meta);
      })
      .catch((error) => console.log(error));
  });

  const cambiarMeta = useCallback(() => {
    console.log("Cambiando meta");
    fetch(
      `http://${process.env.REACT_APP_BACK_HOST}:8080/usuario/meta/actualizar?idSupervisor=${idSupervisor}&meta=${meta}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.log(error));
  });

  //Primero se llama a la función descargar inmediatamente al montar el componente, Configura el intervalo para llamar a descargar cada 5
  //minutos (300000 ms) y se limpia el intervalo al desmontar el componente
  useEffect(() => {
    descargar();
    descargarMeta();
    console.log("Console log de meta", meta);
    const interval = setInterval(() => {
      descargar();
    }, 300000);

    return () => clearInterval(interval);
  }, []);

  //Esta función se encarga de actualizar el estado que determina si el campo de texto es visible o no

  const mostrarInput = () => {
    setInputVisible(!inputVisible);
  };

  //Esta función se encarga de cambiar la meta de llamadas y ocultar el campo de texto cuando se da Enter en el campo de texto
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setInputVisible(false);
      cambiarMeta();
    }
  };
  return (
    <div>
      {inputVisible ? (
        <TextField
          className="textInputMeta"
          label="Ingrese una meta"
          size="small"
          onChange={(e) => setMeta(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      ) : null}
      <Gauge
        width={250}
        height={200}
        value={llamadas}
        valueMax={meta}
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
      {inputVisible ? null : (
        <Button className="botonMetas" onClick={mostrarInput}>
          Personalizar Meta
        </Button>
      )}
    </div>
  );
}
