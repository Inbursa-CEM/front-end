import { useNavigate } from "react-router-dom";
import "../../Styles/App.css";
import { Button } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import { useState } from "react";

const TagEmpleado = ({ icono, nombre, rol }) => {
  const [desplegar, setDesplegar] = useState(false);
  const navegar = useNavigate();
  const host = process.env.REACT_APP_BACK_HOST;
  const url = `http://${host}:8080/auth/logout`;

  const showCerrarSesion = () => {
    setDesplegar(!desplegar);
  };

  const cerrarSesion = (evento) => {
    evento.preventDefault();
    const accessToken = sessionStorage.getItem("userToken");

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        accessToken: accessToken,
      }),
    };

    fetch(url, options)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Error en la petición");
      })
      .then(() => {
        sessionStorage.clear();
        navegar("/");
      })
      .catch((error) => console.log(error));
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
