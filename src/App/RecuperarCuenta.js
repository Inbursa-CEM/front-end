// Autora: Lauren Lissette Llauradó Reyes
// Componente que permite a un usuario recuperar su cuenta

import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/recuperarCuenta.css";

const RecuperarCuenta = () => {
  const host = process.env.REACT_APP_BACK_HOST;
  const url = `http://${host}:8080/auth/forgotpassword`;
  const refCorreo = useRef();
  const navegar = useNavigate();

  const verificar = (evento) => {
    evento.preventDefault();
    const email = refCorreo.current.value;

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
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
        sessionStorage.setItem("userEmail", email);
        navegar("/cambiarcontrasena");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="contenedor-recuperacion">
      <div className="contenedor-logo-recuperacion">
        <img
          className="logo-recuperacion"
          alt="Logo de Inbursa"
          src="https://inbursa-lau.s3.amazonaws.com/inbursa.png"
        ></img>
      </div>
      <div className="caja-contenedora-recuperacion">
        <form onSubmit={verificar}>
          <div className="texto">
            <p>
              Le enviaremos un código de verificación a su correo electrónico
              <br></br>para que pueda recuperar su cuenta.
            </p>
          </div>
          <div className="etiqueta-recuperacion">
            <label htmlFor="correo">
              Por favor, ingrese su correo electrónico:
            </label>
          </div>

          <input
            className="input-recuperacion"
            id="correo"
            type="text"
            required
            placeholder="Correo electrónico *"
            ref={refCorreo}
          ></input>

          <div className="contenedor-boton-recuperacion">
            <button className="boton-recuperacion" type="submit">
              Enviar código
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RecuperarCuenta;
