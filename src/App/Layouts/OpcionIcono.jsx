// Autor: Gustavo Alejandro Gutiérrez Valdes
// Componente que muestra una opción de menú con un icono y un texto

import { Link } from "react-router-dom";
import "../../Styles/App.css";
import { Button } from "@mui/material";

const OpcionIcono = ({ icono, texto, ruta }) => {
  return (
    <div className="opcionIcono">
      <Link to={ruta} className="link">
        <Button className="botonGris">
          {icono} {texto}
        </Button>
      </Link>
    </div>
  );
};

export default OpcionIcono;
