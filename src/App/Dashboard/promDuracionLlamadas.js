import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { axisClasses } from "@mui/x-charts";
import { useState } from 'react';

export default function PromedioDuracionLlamadas() {

  const [agentes, setAgentes] = useState([
    "Diego Manja",
    "Alan Ávila",
    "Gerardo Dominguez",
    "Irene Paredes",
    "Gustavo Zamorano",
    "Luisa Paredes"
  ]);

  return (
    <LineChart
      xAxis={[{ data: agentes, scaleType: 'band'}]}
      series={[
        
        {
          data: [2, 5.5, 2, 8.5, 3, 6],
          area: true
        },
      ]}
      width={900}
      height={250}
      sx={{[`.${axisClasses.bottom} .${axisClasses.tickLabel}`]: {
        transform: "rotateZ(-70deg) translateY(60px) translateX(-60px)"
      }}}
    />
  );
}