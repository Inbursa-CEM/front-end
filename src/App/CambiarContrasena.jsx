// Autora: Lauren Lissette Llauradó Reyes
// Componente que verifica al usuario en Cognito

import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/cambiarContrasena.css";
import logo from "../Assets/inbursa.png";

const CambiarContrasena = () => {
  // Se obtiene el correo del usuario de la sesión
  const correo = sessionStorage.getItem("userEmail");

  // Referencias a los campos del formulario
  const refCodigo = useRef();
  const refContrasena = useRef();

  const host = process.env.REACT_APP_BACK_HOST;
  const url = `http://${host}:8080/auth/changepassword`;
  const navegar = useNavigate();

  // Función que se encarga de enviar los datos al servidor para cambiar la contraseña
  const cambiarContrasena = (evento) => {
    evento.preventDefault();
    const email = correo;
    const code = refCodigo.current.value;
    const password = refContrasena.current.value;

    // Objeto con las opciones de la petición
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        code,
        password,
      }),
    };

    console.log("Enviando datos al servidor:", options.body);

    fetch(url, options)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Error en la petición");
      })
      .then(() => {
        sessionStorage.removeItem("userEmail"); // Se elimina el correo de la sesión
        navegar("/"); // Se redirige al usuario a la página de inicio de sesión
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="contenedor-cambiar-contrasena">
      <div className="contenedor-logo-cambiar-contrasena">
        <img
          className="logo-cambiar-contrasena"
          alt="Logo de Inbursa"
          src={logo}
        ></img>
      </div>
      <div className="caja-contenedora-cambiar-contrasena">
        <form onSubmit={cambiarContrasena}>
          <div>
            <label htmlFor="codigo" className="etiqueta-cambiar-contrasena">
              Por favor, ingrese el código de verificación enviado a su correo:{" "}
              {correo}
            </label>
          </div>

          <input
            className="input-cambiar-contrasena"
            id="codigo"
            type="text"
            required
            placeholder="Código de verificación *"
            ref={refCodigo}
          ></input>

          <div>
            <label htmlFor="contrasena" className="etiqueta-cambiar-contrasena">
              Por favor, ingrese la nueva contraseña:
            </label>
          </div>

          <input
            className="input-cambiar-contrasena"
            id="contrasena"
            type="password"
            required
            placeholder="Contraseña *"
            ref={refContrasena}
          ></input>

          <div className="contenedor-boton-cambiar-contrasena">
            <button className="boton-cambiar-contrasena" type="submit">
              Cambiar contraseña
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CambiarContrasena;
