import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker, onChange } from '@mui/x-date-pickers/DateTimePicker';
import { useState } from 'react';
import "dayjs/locale/es-mx"

import "../../Styles/OneOnOne.css";

const OneOnOne = () => {

    const [fechaSeleccionada, setFechaSeleccionada] = useState(null);

    const cambiosFecha = (newValue) => {
        setFechaSeleccionada(newValue);

        console.log(newValue);
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es-mx">
            <DemoContainer components={['DateTimePicker']}>
                <DateTimePicker
                    className="select"
                    label="Agendar un 1:1"
                    onChange={cambiosFecha}
                />
            </DemoContainer>
        </LocalizationProvider>
    );
};

export default OneOnOne;