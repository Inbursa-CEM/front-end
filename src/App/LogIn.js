// Autora: Lauren Lissette Llauradó Reyes
// Componente que permite a un usuario iniciar sesión en el sistema

import React, { useRef, useState } from "react";
import "../Styles/login.css";
import { Link, useNavigate } from "react-router-dom";

const LogIn = () => {
  const host = process.env.REACT_APP_BACK_HOST;
  const url = `http://${host}:8080/auth/signin`;

  const refCorreo = useRef();
  const refContrasena = useRef();
  const navegar = useNavigate();
  const [mensajeError, setMensajeError] = useState("");

  const iniciarSesion = (evento) => {
    evento.preventDefault();
    const email = refCorreo.current.value;
    const password = refContrasena.current.value;

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    };

    console.log("Enviando datos al servidor:", options.body);

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
        sessionStorage.setItem("userId", data.usuario.idUsuario);
        sessionStorage.setItem("userName", data.usuario.nombre);
        sessionStorage.setItem("userRole", data.usuario.rol);
        sessionStorage.setItem("userPhoto", data.usuario.urlFoto);
        // sessionStorage.setItem("userToken", data.AccessToken);
      })
      .then(() => {
        navegar("/monitoreo");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="contenedor-login">
      <div className="contenedor-logo-login">
        <img
          className="logo-login"
          alt="Logo de Inbursa"
          src="https://inbursa-lau.s3.amazonaws.com/inbursa.png"
        ></img>
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
