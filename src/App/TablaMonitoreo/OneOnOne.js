import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import "dayjs/locale/es-mx";

import "../../Styles/OneOnOne.css";

const OneOnOne = ({ id }) => {
  const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
  const [fechaFinal, setFechaFinal] = useState(null);

  const cambiosFecha = (newValue) => {
    setFechaSeleccionada(newValue);

    if (newValue) {
      setFechaFinal(newValue); 
    }
  };

  useEffect(() => {
    if (fechaFinal) {
      console.log("Final date: ", fechaFinal.format("DD/MM/YYYY HH:mm"));
    }
  }, [fechaFinal]);

  const mandarOneonOne = async (fechaFinal, id) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACK_HOST}/notificacion/mandarOneonOne`,
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

  const handleAccept = () => {
    setFechaFinal(fechaSeleccionada);
    if (fechaSeleccionada) {
      mandarOneonOne(fechaSeleccionada, id);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es-mx">
      <DemoContainer components={["DateTimePicker"]}>
        <DateTimePicker
          className="select"
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
