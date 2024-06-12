//Autor: Luis Eduardo Landeros Hernández

import React, { useState, useEffect } from 'react';
import { Card, Avatar } from '@mui/material';
import '../../Styles/Detalles.css';

//Componente para mostrar información del agente.
const ProfileCard = ({ idAgente }) => {
  const [telefono, setTelefono] = useState();
  const [correo, setCorreo] = useState();
  const [duracionPromedio, setDuracionPromedio] = useState('');
  const [nombre, setNombre] = useState();
  const [numLlamadas, setNumLlamadas] = useState('');
  const [asignaciones, setAsignaciones] = useState([]);
  const [PromedioServicio, setPromediosServicio] = useState();
  const [error, setError] = useState(null);

//Función para obtener y establecer la duración promedio de llamadas del agente.
  const obtenerPromedioDuracionPorAgente = () => {
    fetch(`http://localhost:8080/promedioDuracionPorAgente?idUsuario=${idAgente}`)
      .then(response => response.json())
      .then(data => {
        setDuracionPromedio(data.promedioDuracion);
      })
      .catch(error => {
        console.log(error);
        setError('Error al cargar la duración promedio del agente');
      });
  };
//Función para obtener y establecer teléfono, correo y nombre.
  const obtenerDatos = () => {
    fetch(`http://localhost:8080/usuario/getTarjeta?idAgente=${idAgente}`)
      .then((response) => response.json())
      .then((data) => {
        setTelefono(data.telefono); 
        setCorreo(data.correo);
        setNombre(data.nombre);
      })
      .catch(error => {
        console.log(error);
        setError('Error al cargar los datos del qgente');
  });
};

  //Función para obtener y establecer la duración promedio del agente.
  const obtenerServiciopromedio = () => {
    fetch(`http://localhost:8080/promedioDuracion?idUsuario=${idAgente}`)
      .then(response => response.json())
      .then(data => {
        setPromediosServicio(data.promedioDuracion);
      })
      .catch(error => {
        console.log(error);
        setError('Error al cargar la duración promedio');
      });
  };
  //Función para obtener y establecer el número total de llamadas realizadas por un agente en el día.
  const obtenerNumLlamadasPorAgente = () => {
    fetch(`http://localhost:8080/numLlamadasPorAgente?idUsuario=${idAgente}`)
      .then(response => response.json())
      .then(data => {
        setNumLlamadas(data.totalLlamadasHoy);
      })
      .catch(error => {
        console.log(error);
        setError('Error al cargar el número de llamadas del agente');
      });
  };
  //Función para obtener y establecer el curso asignado al agente.

  const obtenerAsignacionesPorAgente = () => {
    fetch(`http://localhost:8080/asignadas?idUsuario=${idAgente}`)
      .then(response => response.json())
      .then(data => {
        setAsignaciones(data);
      })
      .catch(error => {
        console.log(error);
        setError('Error al cargar las asignaciones del agente');
      });
  }

  //Llamado de las funciones cada que cambia el id del agente.
  useEffect(() => {
    obtenerServiciopromedio();
    obtenerAsignacionesPorAgente
    obtenerDatos
    obtenerNumLlamadasPorAgente
    obtenerPromedioDuracionPorAgente
  


    
  }, [idAgente]);
  return (
    <Card className="card">
      <div className="header">
        <h1>{nombre}Luis Eduardo Landeros Hernández</h1>
      </div>
      <div className="contenedor">
        <div className="izquierda">
          <Avatar 
            src="/static/images/avatar/1.jpg" 
            sx={{ width: 150, height: 150 }} 
            className="avatar"
          />
        </div>
        <div className="derecha">
          <p className='label'>Teléfono:</p>
          <p className="value">{telefono}</p> 
          <p className="label">Correo electrónico:</p>
          <p className="value">{correo}</p>
          <p className='label'>Duración promedio de llamadas:</p>
          <p className="value">{duracionPromedio} </p> 
          <p className="label">Promedio de calificación de llamadas:</p>
          <p className="value">{PromedioServicio}</p>
          
          <p className="label">Número de llamadas atendidas al día:</p>
          <p className="value">{numLlamadas} </p>
          <p className="label">Recomendaciones</p>
          <p className="value">{asignaciones} </p>
        </div>
      </div>  
    </Card>
  );
};

export default ProfileCard;
