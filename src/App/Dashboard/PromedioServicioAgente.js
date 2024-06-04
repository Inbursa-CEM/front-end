import * as React from "react";
import { useState, useCallback, useEffect } from "react";
import { LineChart, axisClasses } from "@mui/x-charts";

//PromedioServicioPorAgente es un componente que muestra el promedio de calificación de servicio por agente
export default function PromedioServicioPorAgente() {
  const idSupervisor = sessionStorage.getItem("userId");

  const [url, setUrl] = useState(
    `http://${process.env.REACT_APP_BACK_HOST}:8080/llamada/promedioServicioPorAgente?idSupervisor=${idSupervisor}`
  );
  const [agentes, setAgentes] = useState([]);
  const [promedios, setPromedios] = useState([]);

  //Esta función se encarga de descargar los datos de la API y actualizar el estado de la variable data que alimenta al componente gráfico
  const descargar = useCallback(() => {
    console.log("Descargando datos");
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const nombresAgente = data.map((agente) => agente.Usuario.nombre);
        setAgentes(nombresAgente);
        const promedios = data.map((agente) => agente.promedioProblemasResueltos);
        setPromedios(promedios);
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

  return (
    <LineChart
      xAxis={[{ data: agentes, scaleType: "band" }]}
      series={[
        {
          data: promedios,
          area: true,
        },
      ]}
      width={1000}
      height={250}
      sx={{
        [`.${axisClasses.bottom} .${axisClasses.tickLabel}`]: {
          transform: "rotateZ(-70deg) translateX(-170px)",
          fontSize: "20px !important",
        },
      }}
    />
  );
}
