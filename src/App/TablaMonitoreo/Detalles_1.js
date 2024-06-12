import React from 'react';
import { Card, CardContent, Typography, Avatar, Grid } from '@mui/material';
import '../../Styles/Detalles.css';

const ProfileCard = () => {
    return (
      <Card className="card">
        <CardContent>
          
            <Grid item>
              <div className="name-container">
                <Typography className="title" gutterBottom>
                  Ares Ortiz Botello
                </Typography>
              </div>
          </Grid>
         
          <Grid container spacing={2} className="content">
            <Grid item xs={6}>
              <Typography className="label">Teléfono:</Typography>
              <Typography className="value">55 1234 5678</Typography>
  
              <Typography className="label">Correo electrónico:</Typography>
              <Typography className="value">ares.ortizb@inbursa.mx</Typography>
  
              <Typography className="label">Duración promedio de llamada:</Typography>
              <Typography className="value">8 minutos</Typography>
  
              <Typography className="label">Promedio de calificación de llamada:</Typography>
              <Typography className="value">68%</Typography>
            </Grid>
            <Grid item xs={6}>
                 <Avatar
            className="avatar"
            alt="Ares Ortiz Botello"
            src="/static/images/avatar/1.jpg" // Reemplaza con la ruta correcta de la imagen
          />
              <Typography className="label">Número de llamadas atendidas:</Typography>
              <Typography className="value satisfaction">20</Typography>
  
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  };
  
  export default ProfileCard;