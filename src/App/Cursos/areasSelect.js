//Autores: Carlos Alberto Sánchez Calderón, Alonso Segura De Lucio

import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState, useEffect } from "react";
import Chip from '@mui/material/Chip';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
//Propiedades del selector
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

//Componente que despliega un menu de las areas de oportunidad
const AreaSelect = (props) => {
  const [arrAreas, setArrAreas] = useState([]);
  const [temp, setTemp] = useState([]);

  const url = `http://${process.env.REACT_APP_BACK_HOST}:8080/areaOportunidad/all`;

  const descargar = React.useCallback(async () => {
    const response = await fetch(url);
    const data = await response.json();
    const arrNuevo = (await data).map((area) => {
      const areaNueva = {nombre:area.nombre,idArea:area.idArea};
      return areaNueva;
    });
    setArrAreas(arrNuevo);
  }, [url, setArrAreas]);

  useEffect(() => {
    descargar();
  }, [descargar]);

  const theme = useTheme();
  

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setTemp(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
    const arrNuevo = temp.map((person) => {
      const id = person.substring(0,1);
      return id;
    });
    props.setPersonName(arrNuevo);
    
    

  };

  return (
    
    <div>
      <FormControl sx={{ m: 1, width: 500, color:'white'}}>
        <InputLabel id="demo-multiple-chip-label" sx={{color:'white'}}>Areas de Oportunidad</InputLabel>
        <Select
          sx={{color:'white'}}
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={temp}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Areas" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, background:'white'}}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
                
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {arrAreas.map((area) => (
            <MenuItem
              
              key={area.nombre}
              value={area.idArea + ":"+ area.nombre}
              style={getStyles(area.nombre, temp, theme)}
            >
              {area.nombre}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default AreaSelect;