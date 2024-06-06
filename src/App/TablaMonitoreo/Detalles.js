import React, { useState, useEffect } from 'react';
import { Card, Avatar } from '@mui/material';
import '../../Styles/Detalles.css';


const ProfileCard = ({ idAgente }) => {
  const [telefono, setTelefono] = useState();
  const [correo, setCorreo] = useState();
  const [nombre, setNombre] = useState();
  const [promedioCalificacion, setPromedioCalificacion] = useState();
  const [duracionPromedio, setDuracionPromedio] = useState();
  const [llamadasAtendidas, setLlamadasAtendidas] = useState();
  const [recomendacion, setRecomendacion] = useState('');  // Asegúrate de definir esta variable de estado
  const [error, setError] = useState(null);

  const descargar = () => {
    fetch(`http://localhost:8080/usuario/getTarjeta?idAgente=${idAgente}`)
      .then((response) => response.json())
      .then((data) => {
        setTelefono(data.telefono);
        setCorreo(data.correo);
        setNombre(data.nombre);
        setPromedioCalificacion(data.promedioCalificacion);
        setDuracionPromedio(data.duracionPromedio);
        setLlamadasAtendidas(data.llamadasAtendidas);
      })
      .catch((error) => console.log(error));
  };

  const descargarRecomendacion = () => {
    fetch(`http://localhost:8080/recomendaciones/${idAgente}`)
      .then((response) => response.json())
      .then((data) => {
        setRecomendacion(data.recomendacion);  // Asegúrate de usar la función setRecomendacion
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    descargar();
    descargarRecomendacion();
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
          <p className="value">{duracionPromedio} 56 minutos</p>
          <p className="label">Promedio de calificación de llamadas:</p>
          <p className="value">{promedioCalificacion}45%</p>
          <p className="label">Número de llamadas atendidas al día:</p>
          <p className="value">{llamadasAtendidas} 35</p>
          <p className="label">Recomendaciones</p>
          <p className="value">{recomendacion} Mejorar al paciente</p>
        </div>
      </div>
    </Card>
  );
};

export default ProfileCard;
