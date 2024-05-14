import * as React from "react";
import { BarChart } from "@mui/x-charts";
import { useState } from "react";

export default function PromedioDuracionLlamadas() {
  const [agentes, setAgentes] = useState([
    "Diego Manja",
    "Alan Ávila",
    "Gerardo Dominguez",
    "Irene Paredes",
  ]);

  const xAxisData = agentes.map((_, index) => index);
  const seriesData = [2, 5.5, 2, 8.5];

  return (
    <BarChart
      series={[
        { data: [35, 44, 24, 34] },
      ]}
      height={280}
      width={600}
      xAxis={[{ data: agentes, scaleType: 'band' }]}
    />
  );
}
