import * as React from 'react';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { useState, useCallback } from 'react';

const data = [
  { value: 5, label: 'En llamada' },
  { value: 10, label: 'Libre' }
];

const size = {
  width: 500,
  height: 250,
};

export default function EstatusAgentes() {

const [url, setUrl] = useState("https://jsonplaceholder.typicode.com/todos");
const [dataDummy, setData] = useState([]);

const descargar = useCallback(() => {
    console.log("Descargando datos");
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const arrNuevo = data.map((usuario) => {
          const tareaNueva = {
            descripcion: usuario.title,
            completada: usuario.completed,
          };
          return tareaNueva;
        });
        setData(dataDummy);
      })
      .catch((error) => console.log(error));
})

  return (
    <PieChart
    colors={['#CD0101','#07B11E']}
      series={[
        {
          arcLabel: (item) => `${item.label} (${item.value})`,
          arcLabelMinAngle: 45,
          data,
        },
      ]}
      sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fill: 'white',
          fontWeight: 'bold',
        },
      }}
      {...size}
    />
  );
}
