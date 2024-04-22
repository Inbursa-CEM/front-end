import '../../Styles/App.css';
import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const EmpleadosTabla = () => {
  // Datos de ejemplo de empleados
  const empleados = [
    { nombre: 'Juan', calificacion: 8, estado: 'Libre', animo: '😊' },
    { nombre: 'María', calificacion: 9, estado: 'Ocupado', animo: '😐' },
    { nombre: 'Pedro', calificacion: 7, estado: 'En llamadas', animo: '😕' },
  ];

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Calificación</TableCell>
            <TableCell>Estado</TableCell>
            <TableCell>Estado de Ánimo</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {empleados.map((empleado, index) => (
            <TableRow key={index}>
              <TableCell>{empleado.nombre}</TableCell>
              <TableCell>{empleado.calificacion}</TableCell>
              <TableCell>{empleado.estado}</TableCell>
              <TableCell>{empleado.animo}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default EmpleadosTabla;
