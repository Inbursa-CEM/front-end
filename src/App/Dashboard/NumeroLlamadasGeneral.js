import { Button,TextField } from "@mui/material";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import * as React from "react";
import { useState, useCallback, useEffect } from "react";

//NumeroLlamadasGeneral es un componente funcional que se encarga de mostrar el número total de llamadas atendidas por el conjunto de agentes
export default function NumeroLlamadasGeneral() {
  const idSupervisor = sessionStorage.getItem("userId");
  const [url, setUrl] = useState(
    `http://${process.env.REACT_APP_BACK_HOST}:8080/llamada/numLlamadasTotales?idSupervisor=${idSupervisor}`
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

  //Primero se llama a la función descargar inmediatamente al montar el componente, Configura el intervalo para llamar a descargar cada 10 
  //minutos (600000 ms) y se limpia el intervalo al desmontar el componente
  useEffect(() => {
    descargar();
    const interval = setInterval(() => {
      descargar();
    }, 600000);

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
