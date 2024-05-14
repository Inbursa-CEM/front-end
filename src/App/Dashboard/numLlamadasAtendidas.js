import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

export default function NumeroLlamadasAtendidas() {
  return (
    <PieChart
      series={[
        {
          data: [
            { id: 0, value: 10, label: 'Angel Rodriguez' },
            { id: 1, value: 15, label: 'Esteban Arce' },
            { id: 2, value: 20, label: 'Rodolfo Cota' },
          ],
        },
      ]}
      width={450}
      height={200}
    />
  );
}
                         