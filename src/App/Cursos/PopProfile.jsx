//Autores: Carlos Alberto Sánchez Calderón, Alonso Segura De Lucio
import * as React from "react";
import Box from "@mui/material/Box";
import { ClickAwayListener } from "@mui/base/ClickAwayListener";
import ProfileCard from "../TablaMonitoreo/ProfileCard";
import { Unstable_Popup as BasePopup } from "@mui/base/Unstable_Popup";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { IconButton } from "@mui/material";

//Componente para el pop up del agente
const PopProfile = ({ usuario }) => {
  const [open, setOpen] = React.useState(false);
  const [anchor, setAnchor] = React.useState(null);

  const handleClick = (event) => {
    setOpen((prev) => !prev);
    setAnchor(anchor ? null : event.currentTarget);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box sx={{ position: "relative" }}>
        <IconButton onClick={handleClick}>
          <AccountCircleRoundedIcon type="button"></AccountCircleRoundedIcon>
        </IconButton>

        {open ? (
          <BasePopup open={true} anchor={anchor}>
            <ProfileCard idAgente={usuario}></ProfileCard>
          </BasePopup>
        ) : null}
      </Box>
    </ClickAwayListener>
  );
};

export default PopProfile;
