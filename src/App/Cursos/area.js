import * as React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';


const Area = ({ idArea, nombre,setArea}) => {
    const changeArea = () => {
        setArea(idArea);
      };
  return (
    <ListItem disablePadding>
      <ListItemButton onClick={changeArea}>
        <ListItemIcon>
          <ArrowRightIcon />
        </ListItemIcon>
        <ListItemText primary={nombre} />
      </ListItemButton>
    </ListItem>
  );
};

export default Area;
