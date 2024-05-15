import { Link, useNavigate } from "react-router-dom";
import "../../Styles/App.css";
import { Button } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import { useState } from "react";

const TagEmpleado = ({ icono, texto, subtexto }) => {
  const [desplegar, setDesplegar] = useState(false);
  const navegar = useNavigate();

  const showCerrarSesion = () => {
    setDesplegar(!desplegar);
  };

  const cerrarSesion = () => {
    navegar("/");
  };

  return (
    <div className="tagEmpleado">
      <Button onClick={showCerrarSesion} className="botonGris">
        {icono} {texto} {subtexto}
      </Button>
      <Collapse in={desplegar} style={{ transitionDuration: ".4s" }}>
        <Button className="botonAzulClaro" onClick={cerrarSesion}>
          Cerrar sesión
        </Button>
      </Collapse>
    </div>
  );
};

export default TagEmpleado;
