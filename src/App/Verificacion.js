// Autora: Lauren Lissette Llauradó Reyes
// Componente que verifica al usuario en Cognito

import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/verificacion.css";
import logo from "../Assets/inbursa.png";

const Verificacion = () => {
  // Se obtiene el correo del usuario de la sesión
  const correo = sessionStorage.getItem("userEmail");

  // Referencia al campo del formulario
  const refCodigo = useRef();
  
  const host = process.env.REACT_APP_BACK_HOST;
  const url = `http://${host}:8080/auth/verify`;
  const navegar = useNavigate();

  // Función que se encarga de enviar los datos al servidor para verificar el código
  const verificar = (evento) => {
    evento.preventDefault();
    const email = correo;
    const code = refCodigo.current.value;

    // Objeto con las opciones de la petición
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
        sessionStorage.removeItem("userEmail"); // Se elimina el correo de la sesión
        navegar("/"); // Se redirige al usuario a la página de inicio
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="contenedor-verificacion">
      <div className="contenedor-logo-verificacion">
        <img
          className="logo-verificacion"
          alt="Logo de Inbursa"
          src={logo}
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
