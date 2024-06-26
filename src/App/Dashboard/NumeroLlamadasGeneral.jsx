//Autor: Gustavo Alejandro Gutiérrez Valdes Fecha: 11 de mayo de 2024

import { Button, TextField } from "@mui/material";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import * as React from "react";
import { useState, useCallback, useEffect } from "react";

//NumeroLlamadasGeneral es un componente funcional que se encarga de mostrar el número total de llamadas atendidas por el conjunto de agentes

export default function NumeroLlamadasGeneral() {
  const idSupervisor = sessionStorage.getItem("userId");
  const url = `http://${process.env.REACT_APP_BACK_HOST}:8080/llamada/numLlamadasTotales?idSupervisor=${idSupervisor}`;

  const metaUrl = `http://${process.env.REACT_APP_BACK_HOST}:8080/usuario/meta?idSupervisor=${idSupervisor}`;

  const [llamadas, setLlamadas] = useState([0]);
  const [meta, setMeta] = useState([0]);
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
  }, [url]);

  //Esta función se encarga de descargar la meta de llamadas de la base de datos y actualizar el estado de la variable meta

  const descargarMeta = useCallback(() => {
    const token = sessionStorage.getItem("userToken");

    // Objeto con las opciones de la petición
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    console.log("Descargando datos");
    fetch(metaUrl, options)
      .then((response) => response.json())
      .then((data) => {
        setMeta(data[0].meta);
        console.log("Meta", data[0].meta);
      })
      .catch((error) => console.log(error));
  }, [metaUrl]);

  //Esta función se encarga de cambiar la meta de llamadas en la base de datos

  const cambiarMeta = useCallback(() => {
    const token = sessionStorage.getItem("userToken");

    // Objeto con las opciones de la petición
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    console.log("Cambiando meta");
    fetch(
      `http://${process.env.REACT_APP_BACK_HOST}:8080/usuario/meta/actualizar?idSupervisor=${idSupervisor}&meta=${meta}`,
      options
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Datos para actualizar", data);
        descargarMeta();
      })
      .catch((error) => console.log(error));
  }, [meta, idSupervisor, descargarMeta]);

  //Primero se llama a la función descargar inmediatamente al montar el componente, Configura el intervalo para llamar a descargar cada 5
  //minutos (300000 ms) y se limpia el intervalo al desmontar el componente

  useEffect(() => {
    descargar();
    descargarMeta();
    console.log("Console log de meta", meta);
    const interval = setInterval(() => {
      descargar();
      descargarMeta();
    }, 300000);

    return () => clearInterval(interval);
  }, [descargar, descargarMeta, meta]);

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
