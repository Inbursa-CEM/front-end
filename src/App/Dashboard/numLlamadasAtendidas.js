import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

const data = [
  { id: 0, value: 10, label: 'Humberto Taboada' },
  { id: 1, value: 15, label: 'Cristian Nodal' },
  { id: 2, value: 20, label: 'Adolf Berterame' },
];

export default function PromedioCalidadServicio() {
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
                         