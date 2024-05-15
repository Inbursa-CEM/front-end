import * as React from "react";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";

const settings = {
  width: 200,
  height: 200,
  value: 2,
  valueMax: 5,
  valueMin: 0,
};

export default function VelocidadPromedioRespuesta() {
  return (
    <Gauge
      {...settings}
      cornerRadius="50%"
      sx={(theme) => ({
        [`& .${gaugeClasses.valueText}`]: {
          fontSize: 40,
        },
        [`& .${gaugeClasses.valueArc}`]: {
          fill: "#52b202",
        },
        [`& .${gaugeClasses.referenceArc}`]: {
          fill: theme.palette.text.disabled,
        },
      })}
    >
      <text x="50%" y="65%" textAnchor="middle" dy="0.3em" fontSize="1.5em">
        {" "}
        min{" "}
      </text>
    </Gauge>
  );
}
