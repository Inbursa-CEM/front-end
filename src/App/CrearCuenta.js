// Autora: Lauren Lissette Llauradó Reyes
// Componente que permite a un usuario crear una cuenta en el sistema

import React, {
  useRef,
  useState,
  useCallback,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/crearCuenta.css";

const CrearCuenta = () => {
  const refNombre = useRef();
  const refCorreo = useRef();
  const refTelefono = useRef();
  const refContrasena = useRef();
  const refDepartamento = useRef();
  const navegar = useNavigate();

  const [rolSelected, setRolSelected] = useState("");
  const [supervisorSelected, setSupervisorSelected] = useState("");
  const [rolFontColor, setRolFontColor] = useState("rgb(116, 116, 116)");
  const [supervisorFontColor, setSupervisorFontColor] = useState("rgb(116, 116, 116)");

  const handleRolDropdownChange = (event) => {
    setRolSelected(event.target.value);
    if (event.target.value !== "") {
      setRolFontColor("var(--azul-oscuro)")
    } else {
      setRolFontColor("rgb(116, 116, 116)")
    }
  };

  const handleSupervisorDropdownChange = (event) => {
    setSupervisorSelected(event.target.value);
    if (event.target.value !== "") {
      setSupervisorFontColor("var(--azul-oscuro)")
    } else {
      setSupervisorFontColor("rgb(116, 116, 116)")
    }
  };

  const [arrSupervisores, setArrSupervisores] = useState([]);
  const host = process.env.REACT_APP_BACK_HOST;
  const urlSupervisores = `http://${host}:8080/usuario/supervisores`;
  const urlCrearCuenta = `http://${host}:8080/auth/signup`;

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

  const crearCuenta = (evento) => {
    evento.preventDefault();
    const nombre = refNombre.current.value;
    const correo = refCorreo.current.value;
    const telefono = refTelefono.current.value;
    const password = refContrasena.current.value;
    const departamento = refDepartamento.current.value;
    const rol = rolSelected;
    const supervisor = supervisorSelected !== "" ? supervisorSelected : null;
    const idConnect = "IDC123";
    const urlFoto = "url_foto_yo.jpg";

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
        supervisor,
        idConnect,
        urlFoto,
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
        sessionStorage.setItem("userEmail", correo);
        navegar("/verificacion");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="contenedor-cuenta">
      <div className="contenedor-logo-cuenta">
        <img
          className="logo-cuenta"
          alt="Logo de Inbursa"
          src="https://inbursa-lau.s3.amazonaws.com/inbursa.png"
        ></img>
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
            required
            placeholder="Contraseña *"
            ref={refContrasena}
          ></input>
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

          <label htmlFor="rol" className="etiqueta-cuenta">Rol *</label>
          <select
            className="select-cuenta"
            id="rol"
            value={rolSelected}
            onChange={handleRolDropdownChange}
            style={{color: rolFontColor}}
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
            style={{color: supervisorFontColor}}
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
