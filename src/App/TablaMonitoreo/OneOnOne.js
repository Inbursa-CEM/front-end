import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker, onChange } from '@mui/x-date-pickers/DateTimePicker';
import { useState } from 'react';
import "dayjs/locale/es-mx";

import "../../Styles/OneOnOne.css";

const OneOnOne = () => {

    const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
    const [fechaFinal, setFechaFinal] = useState(null);

    const cambiosFecha = (newValue) => {
        setFechaSeleccionada(newValue);

        const valores = [newValue.$D, newValue.$M, newValue.$y, newValue.$H, newValue.$m];
        const fecha = valores[0] + "/" + valores[1] + "/" + valores[2] + " " + valores[3] + ":" + valores[4];
        console.log(fecha);

    }

    const handleAccept = () => {
        setFechaFinal(fechaSeleccionada);
        console.log("Final date: ", fechaFinal);
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es-mx">
            <DemoContainer components={['DateTimePicker']}>
                <DateTimePicker
                    className="select"
                    label="Agendar un 1:1"
                    onChange={cambiosFecha}
                    onAccept={handleAccept}
                />
            </DemoContainer>
        </LocalizationProvider>
    );
};

export default OneOnOne;