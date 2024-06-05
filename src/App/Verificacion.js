// Autora: Lauren Lissette Llauradó Reyes
// Componente que verifica al usuario en Cognito

import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/verificacion.css";

const Verificacion = () => {
  const correo = sessionStorage.getItem("userEmail");
  const refCodigo = useRef();
  const host = process.env.REACT_APP_BACK_HOST;
  const url = `http://${host}:8080/auth/verify`;
  const navegar = useNavigate();

  const verificar = (evento) => {
    evento.preventDefault();
    const email = correo;
    const code = refCodigo.current.value;

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        code,
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
    <div className="contenedor-verificacion">
      <div className="contenedor-logo-verificacion">
        <img
          className="logo-verificacion"
          alt="Logo de Inbursa"
          src="https://inbursa-lau.s3.amazonaws.com/inbursa.png"
        ></img>
      </div>
      <div className="caja-contenedora-verificacion">
        <form onSubmit={verificar}>
          <div>
            <label htmlFor="codigo" className="etiqueta-verificacion">
              Por favor, ingrese el código de verificación enviado a su correo:{" "}
              {correo}
            </label>
          </div>

          <input
            className="input-verificacion"
            id="codigo"
            type="text"
            required
            placeholder="Código de verificación *"
            ref={refCodigo}
          ></input>

          <div className="contenedor-boton-verificacion">
            <button className="boton-verificacion" type="submit">
              Verificar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Verificacion;
