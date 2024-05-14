import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

export default function totalProblemasAtendidos() {
  return (
    <BarChart
      xAxis={[{ scaleType: 'band', data: ['Agente 1', 'Agente 2', 'Agente 3']}]}
      series={[{ data: [4, 3, 5] }, { data: [1, 6, 3] }, { data: [2, 5, 6] }]}
      width={500}
      height={250}
    />
  );
}
