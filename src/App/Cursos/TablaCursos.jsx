//Autores: Carlos Alberto Sánchez Calderón, Alonso Segura De Lucio
import "../../Styles/App.css";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
//Componente que muestra los cursos
const CursosTabla = () => {
  // Datos de ejemplo de empleados
  const empleados = [
    {
      nombre: "Juan",
      fortalezas: "Organización, Comunicación",
      debilidades: "Procrastinación",
      cursos: ["Gestión del tiempo", "Comunicación efectiva"],
      fechaAsignacion: "2023-05-10",
    },
    {
      nombre: "María",
      fortalezas: "Creatividad, Trabajo en equipo",
      debilidades: "Gestión del tiempo",
      cursos: ["Liderazgo", "Resolución de conflictos"],
      fechaAsignacion: "2023-06-15",
    },
    {
      nombre: "Pedro",
      fortalezas: "Responsabilidad, Adaptabilidad",
      debilidades: "Resolución de problemas",
      cursos: ["Gestión del estrés", "Toma de decisiones"],
      fechaAsignacion: "2023-07-20",
    },
  ];

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Fortalezas</TableCell>
            <TableCell>Debilidades</TableCell>
            <TableCell>Cursos Asignados</TableCell>
            <TableCell>Fecha de Asignación</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {empleados.map((empleado, index) => (
            <TableRow key={index}>
              <TableCell>{empleado.nombre}</TableCell>
              <TableCell>{empleado.fortalezas}</TableCell>
              <TableCell>{empleado.debilidades}</TableCell>
              <TableCell>
                <ul>
                  {empleado.cursos.map((curso, i) => (
                    <li key={i}>{curso}</li>
                  ))}
                </ul>
              </TableCell>
              <TableCell>{empleado.fechaAsignacion}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CursosTabla;
