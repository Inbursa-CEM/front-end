import * as React from 'react';
import { BarChart } from '@mui/x-charts';
import { useState, useCallback, useEffect } from 'react';

export default function SentimientoPromedioAgente() {

  const [url, setUrl] = useState("http://10.48.81.212:8080/llamada/sentimientoPorAgente");
  const [data, setData] = useState([]);
  const [agentes, setAgentes] = useState([]);

  const descargar = useCallback(() => {
    console.log("Descargando datos");
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const dataFormateada = data.map((agente) => ({
          data: [agente.sentimientoPositivo, agente.sentimientoNegativo, agente.sentimientoNeutral],
        }));
        const agentes = data.map((agente) => agente.idAgente);
        setAgentes(agentes);
        setData(dataFormateada);
      })
      .catch((error) => console.log(error));
  });

  useEffect(() => {
    descargar();
  }, []);

  return (    
    <BarChart
      xAxis={[{ scaleType: 'band', data: agentes }]}
      series={data}
      width={500}
      height={250}
    />
  );
}
