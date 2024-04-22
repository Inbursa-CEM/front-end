import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

const chartSetting = {
  xAxis: [
    {
      label: 'Tiempo (min)',
    },
  ],
  width: 300,
  height: 200,
};
const dataset = [
  {
    london: 59,
    paris: 57,
    newYork: 86,
    seoul: 21,
    month: '1 ',
  },
  {
    london: 50,
    paris: 52,
    newYork: 78,
    seoul: 28,
    month: '2 ',
  },
  {
    london: 47,
    paris: 53,
    newYork: 106,
    seoul: 41,
    month: '5 ',
  },
  {
    london: 54,
    paris: 56,
    newYork: 92,
    seoul: 73,
    month: '10 ',
  },
  {
    london: 57,
    paris: 69,
    newYork: 92,
    seoul: 99,
    month: '15 ',
  }
];

const valueFormatter = (value) => `${value}mm`;

export default function ProblemasNoResueltos() {
  return (
    <BarChart
      dataset={dataset}
      yAxis={[{ scaleType: 'band', dataKey: 'month' }]}
      series={[{ dataKey: 'seoul', label: 'Tiempo en atención', valueFormatter }]}
      layout="horizontal"
      {...chartSetting}
    />
  );
}
