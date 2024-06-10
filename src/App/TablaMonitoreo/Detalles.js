import React, { useState, useEffect } from 'react';
import { Card, Avatar } from '@mui/material';
import '../../Styles/Detalles.css';


const ProfileCard = ({ idAgente }) => {
  const [telefono, setTelefono] = useState();
  const [correo, setCorreo] = useState();
  const [nombre, setNombre] = useState();
  const [numLlamadas, setNumLlamadas] = useState('');
  const [promedioCalificacion, setPromedioCalificacion] = useState();
  const [duracionPromedio, setDuracionPromedio] = useState();
  const [asignaciones, setAsignaciones] = useState([]);
  const [PromedioServicio, setPromediosServicio] = useState();
  


  
  const [llamadasAtendidas, setLlamadasAtendidas] = useState();
  const [recomendacion, setRecomendacion] = useState('');  
  const [error, setError] = useState(null);

  const descargar = () => {
    fetch(`http://localhost:8080/usuario/getTarjeta?idAgente=${idAgente}`)
      .then((response) => response.json())
      .then((data) => {
        setTelefono(data.telefono); 
        setCorreo(data.correo);
        setNombre(data.nombre);
      })
      .catch((error) => console.log(error));
  };
  const descargarServiciopromedio = () => {
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

  const descargarNumLlamadasPorAgente = () => {
    fetch(`http://localhost:8080/numLlamadasPorAgente?idUsuario=${idAgente}`)
      .then(response => response.json())
      .then(data => {
        setNumLlamadas(data.totalLlamadasHoy);
      })
      .catch(error => {
        console.log(error);
        setError('Error al cargar el número de llamadas por agente');
      });
  };

  const descargarAsignacionesPorAgente = () => {
    fetch(`http://localhost:8080/asignadas?idUsuario=${idAgente}`)
      .then(response => response.json())
      .then(data => {
        setAsignaciones(data);
      })
      .catch(error => {
        console.log(error);
        setError('Error al cargar las asignaciones por agente');
      });
  };

  useEffect(() => {
    descargarServiciopromedio();
    descargarNumLlamadasPorAgente();
    descargarAsignacionesPorAgente();
    descargar();
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
          <p className="value">{telefono} 5539060844</p>
          <p className="label">Correo electrónico:</p>
          <p className="value">{correo}landerosluis15@hotmail.com</p>
          <p className='label'>Duración promedio de llamadas:</p>
          <p className="value">{duracionPromedio} 56 minutos</p> ----- Falta aquí

          <p className="label">Promedio de calificación de llamadas:</p>
          <p className="value">{PromedioServicio}45%</p>
          
          <p className="label">Número de llamadas atendidas al día:</p>
          <p className="value">{numLlamadas} 35</p>
          <p className="label">Recomendaciones</p>
          <p className="value">{asignaciones} Mejorar al paciente</p>
        </div>
      </div>  
    </Card>
  );
};

export default ProfileCard;
