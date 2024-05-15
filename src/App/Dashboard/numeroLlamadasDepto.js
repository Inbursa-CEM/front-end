import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import * as React from "react";

export default function NumeroLlamadasDepartamento() {
  return (
    <Gauge
      width={250}
      height={200}
      value={75}
      startAngle={-110}
      endAngle={110}
      sx={{
        [`& .${gaugeClasses.valueText}`]: {
          fontSize: 40,
          transform: "translate(0px, 0px)",
        },
      }}
      text={({ value, valueMax }) => `${value} / ${valueMax}`}
    />
  );
}
