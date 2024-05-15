import React, { useState, useEffect } from 'react';
import { Card, Avatar } from '@mui/material';
import '../../Styles/Detalles.css';

const ProfileCard = () => {
  const[telefono,setTelefono]=useState();
  const descargar= () =>{
    fetch("localhost:8080/usuario/getTarjeta?idAgente=3")
          .then((response) => response.json())
          .then((data) => {
        
            setTelefono(data.telefono);
          })
          .catch((error) => console.log(error));  
  }
  useEffect(() => {
    descargar();
  }, []);
    return (
        <Card className="card">
            <div className="header">
                <h1>Ares Ortiz Botello</h1>
            </div>
            <div className="contenedor">
                <div className="izquierda">
                    <p className='label'>Teléfono:</p>
                    <p className="value">{telefono}</p>
                    <p className="label">Correo electrónico:</p>
                    <p className="value">ares.ortizb@inbursa.mx</p>
                    <p className='label'>Duración promedio de llamadas:</p>
                    <p className="value">5 minutos</p>
                    <p className="label">Promedio de calificación de llamadas:</p>
                    <p className="value">58%</p>
                </div>
                <div className="derecha">
                    <Avatar 
                        src="/static/images/avatar/1.jpg" 
                        sx={{ width: 150, height: 150 }} 
                        className="avatar"
                    />
                    <p className="label">Número de llamadas atendidas al día:</p>
                    <p className="value">20</p>
                </div>
            </div>
        </Card>
    );
};

export default ProfileCard;
