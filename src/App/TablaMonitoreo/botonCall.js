import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import PhoneDisabledIcon from '@mui/icons-material/PhoneDisabled';
import { Fab } from '@mui/material';
import "../../Styles/OneOnOne.css";
import { useState } from 'react';

const JoinCall = () => {
    // Estado de la llamada
    const [call, setCall] = useState(true);

    // Función para unirse a la llamada
    const joinCall = () => {
        setCall(false);
    }

    // Función para salir de la llamada
    const leaveCall = () => {
        setCall(true);
    }

    return (
        <div>
            {call ?  <Fab className="joinAvailable" onClick={joinCall}>
                <PhoneEnabledIcon />
            </Fab> : <Fab className="leaveCall" onClick={leaveCall}>
                <PhoneDisabledIcon />
            </Fab>}
        </div>
    );
}

export default JoinCall;