// Diego Manjarrez Viveros
// A01753486
// Description: Componente para agendar un 1:1
// Date: 17/05/2024

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import "dayjs/locale/es-mx";

import "../../Styles/OneOnOne.css";

// Componente para agendar un 1:1
const OneOnOne = ({ id }) => {
  const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
  const [fechaFinal, setFechaFinal] = useState(null);

  // Cambiar la fecha seleccionada
  const cambiosFecha = (newValue) => {
    setFechaSeleccionada(newValue);

    if (newValue) {
      setFechaFinal(newValue);
    }
  };

  // Mostrar la fecha final seleccionada
  useEffect(() => {
    if (fechaFinal) {
      console.log("Final date: ", fechaFinal.format("DD/MM/YYYY HH:mm"));
    }
  }, [fechaFinal]);

  // Función para mandar una notificación 1:1
  const mandarOneonOne = async (fechaFinal, id) => {
    try {
      const response = await fetch(
        `$http://${process.env.REACT_APP_BACK_HOST}:8080/notificacion/mandarOneonOne`,
        // "http://localhost:8080/notificacion/mandarOneonOne",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idUsuario: id,
            contenido:
              "La fecha para tu sesión con el supervisor es el " +
              fechaFinal.format("DD/MM/YYYY HH:mm"),
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Error al llamar al API");
      }
      const data = await response.json();
      console.log("Respuesta del servidor:", data);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  // Función para aceptar la fecha seleccionada
  const handleAccept = () => {
    setFechaFinal(fechaSeleccionada);
    if (fechaSeleccionada) {
      mandarOneonOne(fechaSeleccionada, id);
    }
  };

  // Determinar si la fecha seleccionada es anterior a la fecha actual
  const isDatePast = fechaSeleccionada && dayjs(fechaSeleccionada).isBefore(dayjs(), 'day');

  // Renderizado del componente
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es-mx">
      <DemoContainer components={["DateTimePicker"]}>
        <DateTimePicker
          className={`select ${isDatePast ? 'red-picker' : ''}`} // Aplicar clase condicionalmente
          label="Agendar un 1:1"
          value={fechaSeleccionada}
          onChange={cambiosFecha}
          onAccept={handleAccept}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default OneOnOne;
