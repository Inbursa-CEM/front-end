import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { useState, useCallback, useEffect } from 'react';

export default function PromedioCalidadServicio() {

  const [url, setUrl] = useState("http://10.48.81.212:8080/llamada/numLlamadas");
  const [data, setData] = useState([]);

  const descargar = useCallback(() => {
    console.log("Descargando datos");
    fetch(url)
      .then((response) => response.json())
      .then((data) => {

        const dataFormateada = data.map((agente, index) => ({
          id: index,
          value: agente.numLlamadas,
          label: agente.idAgente,
        }));
        
        setData(dataFormateada);
      })
      .catch((error) => console.log(error));
  });

  useEffect(() => {
    descargar();
  }, []);

  return (
    <PieChart
      series={[
        {
          data,
          highlightScope: { faded: 'global', highlighted: 'item' },
          faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
        },
      ]}
      height={200}
      width={500}
    />
  );
}
                         