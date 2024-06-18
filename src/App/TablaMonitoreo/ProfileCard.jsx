// Autores:
// Luis Eduardo Landeros Hernández
// Lauren Lissette Llauradó Reyes
// Componente que muestra la información de un agente en específico

import React, { useState, useEffect, useCallback } from "react";
import { Card, Avatar } from "@mui/material";
import "../../Styles/Detalles.css";

const ProfileCard = ({ idAgente }) => {
  const host = process.env.REACT_APP_BACK_HOST;
  const [telefono, setTelefono] = useState();
  const [correo, setCorreo] = useState();
  const [duracionPromedio, setDuracionPromedio] = useState("");
  const [nombre, setNombre] = useState();
  const [numLlamadas, setNumLlamadas] = useState("");
  const [asignaciones, setAsignaciones] = useState([]);
  const [PromedioServicio, setPromediosServicio] = useState();

  //Función para obtener y establecer la duración promedio de llamadas del agente
  const obtenerPromedioDuracionLlamadas = useCallback(() => {
    fetch(`http://${host}:8080/llamada/promedioDuracion?idUsuario=${idAgente}`)
      .then((response) => response.json())
      .then((data) => {
        setDuracionPromedio(data.promedioDuracion);
      })
      .catch((error) => console.log(error));
  }, [host, idAgente]);

  //Función para obtener y establecer teléfono, correo y nombre
  const obtenerDatos = useCallback(() => {
    const token = sessionStorage.getItem("userToken");

    // Objeto con las opciones de la petición
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    fetch(
      `http://${host}:8080/usuario/especifico?idAgente=${idAgente}`,
      options
    )
      .then((response) => response.json())
      .then((data) => {
        setTelefono(data.telefono);
        setCorreo(data.correo);
        setNombre(data.nombre);
      })
      .catch((error) => console.log(error));
  }, [host, idAgente]);

  //Función para obtener y establecer el promedio de calificación de servicio del agente
  const obtenerServicioPromedio = useCallback(() => {
    fetch(
      `http://${host}:8080/llamada/problemasResueltos?idUsuario=${idAgente}`
    )
      .then((response) => response.json())
      .then((data) => {
        setPromediosServicio(data.problemaResuelto ?? "-");
      })
      .catch((error) => console.log(error));
  }, [host, idAgente]);

  //Función para obtener y establecer el número total de llamadas realizadas por un agente en el día
  const obtenerNumLlamadas = useCallback(() => {
    fetch(`http://${host}:8080/llamada/numLlamadas?idUsuario=${idAgente}`)
      .then((response) => response.json())
      .then((data) => {
        setNumLlamadas(data.numLlamadas);
      })
      .catch((error) => console.log(error));
  }, [host, idAgente]);

  //Función para obtener y establecer las recomendaciones y cursos de un agente
  const obtenerAsignaciones = useCallback(() => {
    fetch(`http://${host}:8080/recomendacion/asignadas?idAgente=${idAgente}`)
      .then((response) => response.json())
      .then((data) => {
        const recomendaciones = data.map((recomendacion) => {
          return recomendacion.nombre;
        });
        setAsignaciones(recomendaciones);
      })
      .catch((error) => console.log(error));

    fetch(`http://${host}:8080/curso/asignados?idAgente=${idAgente}`)
      .then((response) => response.json())
      .then((data) => {
        const cursos = data.map((curso) => {
          return curso.nombre;
        });
        setAsignaciones((prevAsignaciones) => [...prevAsignaciones, ...cursos]);
      })
      .catch((error) => console.log(error));
  }, [host, idAgente]);

  //Llamado de las funciones al cargar la página
  useEffect(() => {
    obtenerServicioPromedio();
    obtenerAsignaciones();
    obtenerDatos();
    obtenerNumLlamadas();
    obtenerPromedioDuracionLlamadas();
  }, [
    obtenerAsignaciones,
    obtenerDatos,
    obtenerNumLlamadas,
    obtenerPromedioDuracionLlamadas,
    obtenerServicioPromedio,
  ]);

  return (
    <Card className="card">
      <div className="header-card">
        <h1>{nombre}</h1>
      </div>
      <div className="contenedor-card">
        <div className="izquierda">
          <Avatar src="" sx={{ width: 150, height: 150 }} className="avatar" />
        </div>
        <div className="derecha">
          <p className="label">Teléfono:</p>
          <p className="value">{telefono}</p>
          <p className="label">Correo electrónico:</p>
          <p className="value">{correo}</p>
          <p className="label">Número de llamadas atendidas en el día:</p>
          <p className="value">{numLlamadas} </p>
          <p className="label">Promedio de calificación de llamadas del día:</p>
          <p className="value">{PromedioServicio}</p>
          <p className="label">Duración promedio de llamadas del día:</p>
          <p className="value">{duracionPromedio} </p>
          <p className="label">Recomendaciones y cursos:</p>
          {asignaciones.map((asignacion) => (
            <p className="value">{asignacion}</p>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default ProfileCard;
