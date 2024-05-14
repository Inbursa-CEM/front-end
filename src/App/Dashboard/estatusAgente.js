import * as React from 'react';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';

const data = [
  { value: 5, label: 'En llamada' },
  { value: 10, label: 'Libre' }
];

const size = {
  width: 500,
  height: 200,
};

export default function EstatusAgentes() {
  return (
    <PieChart
    colors={['#f44336', '#4caf50']}
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
