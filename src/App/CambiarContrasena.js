// Autora: Lauren Lissette Llauradó Reyes
// Componente que verifica al usuario en Cognito

import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/cambiarContrasena.css";

const CambiarContrasena = () => {
  const correo = sessionStorage.getItem("userEmail");
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

    // Se crea un objeto con los datos a enviar al servidor
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
        sessionStorage.removeItem("userEmail");
        navegar("/");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="contenedor-cambiar-contrasena">
      <div className="contenedor-logo-cambiar-contrasena">
        <img
          className="logo-cambiar-contrasena"
          alt="Logo de Inbursa"
          src="https://inbursa-lau.s3.amazonaws.com/inbursa.png"
        ></img>
      </div>
      <div className="caja-contenedora-cambiar-contrasena">
        <form
        onSubmit={cambiarContrasena}
        >
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
