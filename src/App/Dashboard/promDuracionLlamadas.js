import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { axisClasses } from "@mui/x-charts";
import { useState, useCallback, useEffect } from 'react';

export default function PromedioDuracionLlamadas() {


  const [url, setUrl] = useState("http://192.168.1.34:8080/llamada/promedioDuracionPorAgente");
  const [agentes, setAgentes] = useState([]);
  const [promedios, setPromedios] = useState([]);

  const descargar = useCallback(() => {
      console.log("Descargando datos");
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          const arrNuevo = data.map((agente) => {
            const infoAgente = {
              agente: agente.idAgente,
              promedioDuracion: agente.tiempoPromedio,
            };
            return infoAgente;
          });
          const idsAgente = data.map((agente) => agente.idAgente);
          setAgentes(idsAgente);
          const promedios = data.map((agente) => agente.tiempoPromedio);
          setPromedios(promedios);
        })
        .catch((error) => console.log(error));
  })

  useEffect(() => {
    descargar();
  }, []);

  return (
    <LineChart
      xAxis={[{ data: agentes, scaleType: 'band'}]}
      series={[
        
        {
          data: promedios,
          area: true
        },
      ]}
      width={900}
      height={250}
      sx={{[`.${axisClasses.bottom} .${axisClasses.tickLabel}`]: {
        transform: "rotateZ(-70deg) translateY(60px) translateX(-60px)",
        fontSize: "20px !important",
      }}}
    />
  );
}