import * as React from "react";

import Button from '@mui/material/Button';
import { useState,useEffect } from "react";

import { v4 as uuidv4 } from "uuid";
import Paper from '@mui/material/Paper';
import Area from "./area";


const Areas = (props) => {
  const [arrAreas,setArrAreas] = useState([]);
  const url = "http://localhost:8080/areaOportunidad/all"
  
  const descargar = React.useCallback(async () => {
    const response = await fetch(url);
    const data = await response.json();
    const arrNuevo = (await data).map((area) => {
      const areaNueva = {
        id:uuidv4(),
        idArea: area.idArea,
        nombre: area.nombre
      };
      return areaNueva;
    });
    setArrAreas(arrNuevo);
  },[url, setArrAreas]);

  useEffect(() => {
    descargar();
  }, [descargar]);

  return (
    <div>
      <Paper style={{margin:"20px",overflow:'auto',maxHeight:250}}>
          {arrAreas.map((area) => {
            return(
              <Area
              key = {area.id}
              idArea = {area.idArea}
              nombre = {area.nombre}
              setArea={props.setArea}
              ></Area>
            )
          })}
      </Paper>
          
    </div>
  );
};



export default Areas;