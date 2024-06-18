// Autora: Lauren Lissette Llauradó Reyes
// Componente que permite a un usuario crear una cuenta en el sistema

import React, { useRef, useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/crearCuenta.css";
import logo from "../Assets/inbursa.png";

const CrearCuenta = () => {
  // Referencias a los campos del formulario
  const refNombre = useRef();
  const refCorreo = useRef();
  const refTelefono = useRef();
  const refContrasena = useRef();
  const refDepartamento = useRef();

  const navegar = useNavigate();

  // Estados para los valores de los dropdowns
  const [rolSelected, setRolSelected] = useState("");
  const [supervisorSelected, setSupervisorSelected] = useState("");
  const [rolFontColor, setRolFontColor] = useState("rgb(116, 116, 116)");
  const [supervisorFontColor, setSupervisorFontColor] =
    useState("rgb(116, 116, 116)");

  // Funciones para manejar los cambios en los dropdowns
  const handleRolDropdownChange = (event) => {
    setRolSelected(event.target.value);
    if (event.target.value !== "") {
      setRolFontColor("var(--azul-oscuro)");
    } else {
      setRolFontColor("rgb(116, 116, 116)");
    }
  };

  const handleSupervisorDropdownChange = (event) => {
    setSupervisorSelected(event.target.value);
    if (event.target.value !== "") {
      setSupervisorFontColor("var(--azul-oscuro)");
    } else {
      setSupervisorFontColor("rgb(116, 116, 116)");
    }
  };

  const [arrSupervisores, setArrSupervisores] = useState([]);

  const host = process.env.REACT_APP_BACK_HOST;
  const urlSupervisores = `http://${host}:8080/usuario/supervisores`;
  const urlCrearCuenta = `http://${host}:8080/auth/signup`;

  // Función que descarga los supervisores registrados en la base de datos
  const descargarSupervisores = useCallback(() => {
    fetch(urlSupervisores)
      .then((response) => response.json())
      .then((data) => {
        console.log("Datos obtenidos del servidor:", data);
        const arrNuevo = data.map((supervisor) => {
          const supervisorNuevo = {
            value: supervisor.idUsuario,
            label: supervisor.nombre,
          };
          return supervisorNuevo;
        });
        setArrSupervisores(arrNuevo);
      })
      .catch((error) => console.log(error));
  }, [urlSupervisores]);

  useEffect(() => {
    descargarSupervisores();
  }, [descargarSupervisores]);

  // Función que se encarga de enviar los datos al servidor para crear una cuenta
  const crearCuenta = (evento) => {
    evento.preventDefault();
    const nombre = refNombre.current.value;
    const correo = refCorreo.current.value;
    const telefono = refTelefono.current.value;
    const password = refContrasena.current.value;
    const departamento = refDepartamento.current.value;
    const rol = rolSelected;
    const supervisor = rolSelected === "agente" ? supervisorSelected : null;
    const meta = rolSelected === "supervisor" ? 0 : null;
    const urlFoto = "url_foto_yo.jpg";

    // Objeto con las opciones de la petición
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre,
        correo,
        telefono,
        password,
        departamento,
        rol,
        idSupervisor: supervisor,
        urlFoto,
        meta,
      }),
    };

    console.log("Enviando datos al servidor:", options.body);

    fetch(urlCrearCuenta, options)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Error en la petición");
      })
      .then(() => {
        sessionStorage.setItem("userEmail", correo); // Se guarda el correo en la sesión
        navegar("/verificacion"); // Se redirige al usuario a la página de verificación
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="contenedor-cuenta">
      <div className="contenedor-logo-cuenta">
        <img className="logo-cuenta" alt="Logo de Inbursa" src={logo}></img>
      </div>
      <div className="caja-contenedora-cuenta">
        <form onSubmit={crearCuenta} className="form-cuenta">
          <input
            className="input-cuenta"
            type="text"
            required
            placeholder="Nombre completo *"
            ref={refNombre}
          ></input>
          <input
            className="input-cuenta"
            type="email"
            required
            placeholder="Correo electrónico *"
            ref={refCorreo}
          ></input>
          <input
            className="input-cuenta"
            type="password"
            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
            required
            placeholder="Contraseña *"
            ref={refContrasena}
          ></input>
          <p className="requerimientos-contraseña">
            La contraseña debe contener:
            <br />
            - Al menos 8 caracteres
            <br />
            - Al menos una letra minúscula
            <br />
            - Al menos una letra mayúscula
            <br />
            - Al menos un número
            <br />- Al menos un caracter especial
          </p>
          <input
            className="input-cuenta"
            type="tel"
            pattern="^\+?[1-9]\d{1,14}$"
            required
            placeholder="Teléfono (incluyendo el código del país) *"
            ref={refTelefono}
          ></input>
          <input
            className="input-cuenta"
            type="text"
            required
            placeholder="Departamento *"
            ref={refDepartamento}
          ></input>

          <label htmlFor="rol" className="etiqueta-cuenta">
            Rol *
          </label>
          <select
            className="select-cuenta"
            id="rol"
            value={rolSelected}
            onChange={handleRolDropdownChange}
            style={{ color: rolFontColor }}
            required
          >
            <option value="">Seleccione</option>
            <option value="supervisor">Supervisor</option>
            <option value="agente">Agente</option>
          </select>

          <label htmlFor="supervisor" className="etiqueta-cuenta">
            Supervisor (en caso de que sea agente)
          </label>
          <select
            className="select-cuenta"
            id="supervisor"
            value={supervisorSelected}
            onChange={handleSupervisorDropdownChange}
            style={{ color: supervisorFontColor }}
          >
            <option value="">Seleccione</option>
            {arrSupervisores.map((supervisor) => (
              <option key={supervisor.value} value={supervisor.value}>
                {supervisor.label}
              </option>
            ))}
          </select>

          <div className="contenedor-boton-cuenta">
            <button className="boton-cuenta" type="submit">
              Crear cuenta
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CrearCuenta;
