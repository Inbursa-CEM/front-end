import React, { useRef, useCallback, useEffect, useState } from "react";
import "../Styles/login.css";
import { useNavigate } from "react-router-dom";

const LogIn = () => {
  const url = "http://localhost:8080/usuario/iniciarSesion";

  const refCorreo = useRef();
  const refContrasena = useRef();
  const navegar = useNavigate();

  const iniciarSesion = (evento) => {
    evento.preventDefault();
    const correo = refCorreo.current.value;
    const password = refContrasena.current.value;

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correo, password }),
    };

    console.log("Enviando datos al servidor:", options.body)

    fetch(url, options)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Error en la petición");
      })
      .then((data) => {
        console.log("Datos obtenidos del servidor:", data);
      })
      .then(() => {
        navegar("/monitoreo");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="contenedor-login">
      <img
        className="logo"
        alt="Logo de Inbursa"
        src="https://inbursa-lau.s3.amazonaws.com/inbursa.png"
      ></img>
      <div className="caja-contenedora">
        <form onSubmit={iniciarSesion}>
          <input
            className="input"
            type="email"
            required
            placeholder="Correo electrónico"
            ref={refCorreo}
          ></input>
          <input
            className="input"
            type="password"
            required
            placeholder="Contraseña"
            ref={refContrasena}
          ></input>

          <div className="contenedor-boton">
            <button className="boton" type="submit">
              Iniciar sesión
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
