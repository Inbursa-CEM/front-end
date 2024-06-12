// Autores:
// Carlos Alberto Sánchez Calderón
// Lauren Lissette Llauradó Reyes
// Componente que muestra la información de un agente al dar click en su nombre

import * as React from "react";
import Box from "@mui/material/Box";
import { ClickAwayListener } from "@mui/base/ClickAwayListener";
import ProfileCard from "./ProfileCard";
import { Unstable_Popup as BasePopup } from "@mui/base/Unstable_Popup";
import "../../Styles/Detalles.css";

const ProfilePop = ({ idAgente, nombreAgente }) => {
  const [open, setOpen] = React.useState(false);
  const [anchor, setAnchor] = React.useState(null);

  // Función que maneja el click en el nombre del agente
  const handleClick = (event) => {
    setOpen((prev) => !prev);
    setAnchor(anchor ? null : event.currentTarget);
  };

  // Función que maneja el click fuera del popup
  const handleClickAway = () => {
    setOpen(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box onClick={handleClick}>
        {nombreAgente}

        {open ? (
          <BasePopup open={true} anchor={anchor} className="card-parent">
            <ProfileCard idAgente={idAgente}></ProfileCard>
          </BasePopup>
        ) : null}
      </Box>
    </ClickAwayListener>
  );
};

export default ProfilePop;
