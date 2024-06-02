import { Button,TextField } from "@mui/material";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import * as React from "react";
import { useState, useCallback, useEffect } from "react";

export default function NumeroLlamadasGeneral() {
  const idSupervisor = sessionStorage.getItem("userId");
  const [url, setUrl] = useState(
    `http://10.48.81.212:8080/llamada/numLlamadasTotales=${idSupervisor}`
  );
  const [llamadas, setLlamadas] = useState([0]);
  const [meta, setMeta] = useState([100]);
  const [inputVisible, setInputVisible] = useState(false);

  const descargar = useCallback(() => {
    console.log("Descargando datos");
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setLlamadas(data.totalLlamadasHoy);
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

  const mostrarInput = () => {
    setInputVisible(!inputVisible);
  };

  const handleKeyDown = (event) => {
    if(event.key === 'Enter'){
      setInputVisible(false);
    }
  }
  return (
    <div>
      {/* {inputVisible ? (
        <TextField
          className="textInputMeta"
          label="Ingrese una meta"
          size="small"
          onChange={(e) => setMeta(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      ) : null} */}
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
      {/* {inputVisible ? null : (
        <Button className="botonMetas" onClick={mostrarInput}>
          Personalizar Meta
        </Button>
      )} */}
    </div>
  );
}
