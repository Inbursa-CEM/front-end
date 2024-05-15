
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
// import { useState, useEffect } from 'react';
// import dayjs from 'dayjs';
// import "dayjs/locale/es-mx";

// import "../../Styles/OneOnOne.css";

// const OneOnOne = () => {
//     const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
//     const [fechaFinal, setFechaFinal] = useState(null);

//     const cambiosFecha = (newValue) => {
//         setFechaSeleccionada(newValue);

//         if (newValue) {
//             const fecha = newValue.format("DD/MM/YYYY HH:mm");
//         }
//     };

//     useEffect(() => {
//         if (fechaFinal) {
//             console.log("Final date: ", fechaFinal.format("DD/MM/YYYY HH:mm"));
//         }
//     }, [fechaFinal]);

//     const handleAccept = () => {
//         setFechaFinal(fechaSeleccionada);
//     };

//     return (
//         <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es-mx">
//             <DemoContainer components={['DateTimePicker']}>
//                 <DateTimePicker
//                     className="select"
//                     label="Agendar un 1:1"
//                     value={fechaSeleccionada}
//                     onChange={cambiosFecha}
//                     onAccept={handleAccept}
//                 />
//             </DemoContainer>
//         </LocalizationProvider>
//     );
// };

// export default OneOnOne;

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import "dayjs/locale/es-mx";

import "../../Styles/OneOnOne.css";

const OneOnOne = () => {
    const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
    const [fechaFinal, setFechaFinal] = useState(null);

    const cambiosFecha = (newValue) => {
        setFechaSeleccionada(newValue);

        if (newValue) {
            const fecha = newValue.format("DD/MM/YYYY HH:mm");
        }
    };

    useEffect(() => {
        if (fechaFinal) {
            console.log("Final date: ", fechaFinal.format("DD/MM/YYYY HH:mm"));
        }
    }, [fechaFinal]);

    const mandarOneonOne = async (fechaFinal) => {
        try {
            const response = await fetch('http://localhost:8080/notificacion/mandarOneonOne', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    idUsuario: 1,
                    contenido: "La fecha para tu sesión con el supervisor es el " + fechaFinal.format("DD/MM/YYYY HH:mm")
                })
            });
            
            if (!response.ok) {
                throw new Error('Error al llamar al API');
            }
            
            const data = await response.json();
            console.log('Respuesta del servidor:', data);
            
            // Aquí puedes manejar la respuesta del servidor según tus necesidades
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    const handleAccept = () => {
        setFechaFinal(fechaSeleccionada);
        mandarOneonOne(fechaSeleccionada);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es-mx">
            <DemoContainer components={['DateTimePicker']}>
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
