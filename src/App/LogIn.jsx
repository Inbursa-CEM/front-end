// Autora: Lauren Lissette Llauradó Reyes
// Componente que permite a un usuario iniciar sesión en el sistema

import React, { useRef, useState } from "react";
import "../Styles/login.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../Assets/inbursa.png";

const LogIn = () => {
  const host = process.env.REACT_APP_BACK_HOST;
  const url = `http://${host}:8080/auth/signin`;

  // Referencias a los campos del formulario
  const refCorreo = useRef();
  const refContrasena = useRef();

  const navegar = useNavigate();
  const [mensajeError, setMensajeError] = useState("");

  // Función que se encarga de enviar los datos al servidor para iniciar sesión
  const iniciarSesion = (evento) => {
    evento.preventDefault();
    const email = refCorreo.current.value;
    const password = refContrasena.current.value;

    // Objeto con las opciones de la petición
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    };

    // console.log("Enviando datos al servidor:", options.body);

    fetch(url, options)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        if (response.status === 404) {
          setMensajeError("Correo o contraseña incorrectos");
        }
        throw new Error("Error en la petición");
      })
      .then((data) => {
        // Se almacenan los datos del usuario en la sesión
        sessionStorage.setItem("userId", data.usuario.idUsuario);
        sessionStorage.setItem("userName", data.usuario.nombre);
        sessionStorage.setItem("userRole", data.usuario.rol);
        sessionStorage.setItem("userPhoto", data.usuario.urlFoto);
        sessionStorage.setItem("userToken", data.AccessToken);

        // Se redirige al usuario a la página correspondiente según su rol
        if (data.usuario.rol === "supervisor") {
          // Se almacenan los datos del usuario en la sesión
          sessionStorage.setItem("userId", data.usuario.idUsuario);
          sessionStorage.setItem("userName", data.usuario.nombre);
          sessionStorage.setItem("userRole", data.usuario.rol);
          sessionStorage.setItem("userPhoto", data.usuario.urlFoto);
          sessionStorage.setItem("userToken", data.AccessToken);

          navegar("/monitoreo");
        }
        if (data.usuario.rol === "agente") {
          const userId = data.usuario.idUsuario;
          window.location.href = `http://localhost:3000/?userId=${userId}`;
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="contenedor-login">
      <div className="contenedor-logo-login">
        <img className="logo-login" alt="Logo de Inbursa" src={logo}></img>
      </div>
      <div className="caja-contenedora-login">
        <form onSubmit={iniciarSesion}>
          <input
            className="input-login"
            type="email"
            required
            placeholder="Correo electrónico"
            ref={refCorreo}
          ></input>
          <input
            className="input-login"
            type="password"
            required
            placeholder="Contraseña"
            ref={refContrasena}
          ></input>

          <div className="contenedor-boton-login">
            <p className="mensaje-error">{mensajeError}</p>
            <button className="boton-login" type="submit">
              Iniciar sesión
            </button>
          </div>
        </form>
        <div>
          <p>
            <Link to="/crearcuenta" className="cuenta">
              Crear una cuenta
            </Link>
          </p>
          <p>
            <Link to="/recuperarcuenta" className="cuenta">
              Olvidé mi contraseña
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
