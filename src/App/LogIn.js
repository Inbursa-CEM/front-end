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
    <div className="contenedor">
      <img
        className="logo"
        alt="Logo de Inbursa"
        src="https://inbursa-lau.s3.us-east-1.amazonaws.com/inbursa.png?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDYaCXVzLWVhc3QtMSJHMEUCIQDZthFodCFhi8gyVWBmqv2fwZzBXumI%2FrNlqvD2enz%2B9AIgRJekB6Lanq6ePPOZJg7p41Sg3V1u4k%2F%2BGwJL%2FtOttWAqiQMIn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARABGgwyMDY3MTMxMTQ5OTEiDIkqy95c0zwdoA2z1yrdAmA3jof1eDQAmj3If7XkJ89bDQyoeEIQV%2Fdeh4pc0kIPb6swkeFzYRQOWcEpa51dFjWg%2FOdo6I%2Fl28gdhLGzI5fA9agE8LvwJeQBvGODmEzCtZUIiu1ICXy0pgT0pcBNFiYE%2B3DA9r42Add6HyiFAGVfesHyOzNhYT5apwAIrNXW5RcOxY4FWaAYEnHoAUmx99G1EhDWBo4gf5momMD25wWKsjWuA0jcM%2BafDt03H7MDdcwJ4ThWjWSMDb%2FUFbcFpzGdK1kmiskDyYVZWNTPDP01tmmcR%2FyOunahpxEpp%2FnosPDyyfVf0ueCtGoKSzS19ZquUE6D14SP1LPWF9zq5Q1VlaaFMZE0v8Z6dj9X9bXsPVT1o3xnbRQT%2FO16ND3dSRY4Cu9rH2%2FzRUgdOV%2BJOI3N9GADfS%2FcinQLkEGYTkKUSunF%2BIYL8Fl8TILx2dlkhlpqz99Ylhzr6DtvzvYw15SRsgY6hwIQ4B6Bk4xGO0NsT%2Fckl1HENbpPWSOzEr%2FDD4nzCDNriDQoPEPKz8UXINiNQ5YTBSg73Cu79waKqgMsUb84BJi6hN2Vs60Jk6m8WDhcx4u5lTFObEWQb1nLKePx91vmgvmjQJ0jK90yzSVVaMkcMoaTE85LK8kP%2B2N%2B1dnTYpXA6Pb13Y5%2BEWRo2WdB9oDlZgMJ2OYtHiKC5WG4pSKwuAaSzorf8P%2FWfq6%2Fh%2BmwB49qsEFzobIJHBlDyOwCUcIgFYJTylKPICxnTrLMDLCBQ3fWJNbDcgZ0H1pH72vqUbygnlX7FT6nNfKQT5oyAmBi42jcOKk8DUpUzOF6Uu7%2FiIP8D5ppr7i2yA%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240515T060118Z&X-Amz-SignedHeaders=host&X-Amz-Expires=43200&X-Amz-Credential=ASIATAIIP2FXY3U2VR74%2F20240515%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=3759b9c00782439565cc78fd52060cdcebfd6908c991c33bbf65f277c5b0cd48"
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
