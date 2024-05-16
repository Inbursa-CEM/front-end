import { Link, useNavigate } from "react-router-dom";
import "../../Styles/App.css";
import { Button } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import { useState } from "react";

const TagEmpleado = ({ icono, nombre, rol }) => {
  const [desplegar, setDesplegar] = useState(false);
  const navegar = useNavigate();

  const showCerrarSesion = () => {
    setDesplegar(!desplegar);
  };

  const cerrarSesion = () => {
    navegar("/");
  };

  return (
    <div>
      <Button onClick={showCerrarSesion} className="botonGris">
        {icono} {nombre} {rol}
      </Button>
      <div className="collapse-cerrar-sesion">
        <Collapse in={desplegar} style={{ transitionDuration: ".4s" }}>
          <Button
            className="botonAzulClaro boton-cerrar-sesion"
            onClick={cerrarSesion}
          >
            Cerrar sesión
          </Button>
        </Collapse>
      </div>
    </div>
  );
};

export default TagEmpleado;
