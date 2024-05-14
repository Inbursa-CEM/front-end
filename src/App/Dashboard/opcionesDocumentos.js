import React, { useState } from 'react'
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import Checkbox from '@mui/material/Checkbox';
import '../../Styles/dashboard.css'

const OpcionesDocumentos = () => {
    const [opciones, setOpciones] = useState({
        llamadasPromAgente: false,
        promedioProbResAgente: false,
        velPromRespuesta: false,
        promServicio: false,
        duracionPromLlamadas: false,
        numLlamadasAtendidas: false,
        totalProbResueltos: false
    })
    
    const handleOpciones = (opcion) => {
        setOpciones({
            ...opciones,
            [opcion.target.name]: opcion.target.checked
        })
    }

    const { llamadasPromAgente, promedioProbResAgente, velPromRespuesta, promServicio, duracionPromLlamadas, numLlamadasAtendidas, totalProbResueltos } = opciones;

    return (
        <div className="opcionesDocumentos">
            <FormControl component="fieldset">
                <FormLabel component="legend">Opciones de Documentos</FormLabel>
                <FormGroup>
                    <FormControlLabel 
                    control={
                        <Checkbox checked={llamadasPromAgente} onChange={handleOpciones} name="llamadasPromAgente" />
                    }
                    label="Llamadas promedio por agente"
                    />
                    <FormControlLabel 
                    control={
                        <Checkbox checked={promedioProbResAgente} onChange={handleOpciones} name="promedioProbResAgente" />
                    }
                    label="Promedio de problemas resueltos por Agente"
                    />
                    <FormControlLabel 
                    control={
                        <Checkbox checked={velPromRespuesta} onChange={handleOpciones} name="velPromRespuesta" />
                    }
                    label="Velocidad promedio de respuesta"
                    />
                     <FormControlLabel 
                    control={
                        <Checkbox checked={promServicio} onChange={handleOpciones} name="promServicio" />
                    }
                    label="Calidad de servicio promedio"
                    />
                     <FormControlLabel 
                    control={
                        <Checkbox checked={duracionPromLlamadas} onChange={handleOpciones} name="duracionPromLlamadas" />
                    }
                    label="Duración promedio de llamadas"
                    />
                     <FormControlLabel 
                    control={
                        <Checkbox checked={numLlamadasAtendidas} onChange={handleOpciones} name="numLlamadasAtendidas" />
                    }
                    label="Número de llamadas atendidas"
                    />
                     <FormControlLabel 
                    control={
                        <Checkbox checked={totalProbResueltos} onChange={handleOpciones} name="totalProbResueltos" />
                    }
                    label="Número total de problemas resueltos"
                    />
                </FormGroup>
            </FormControl>
        </div>
    )
}

export default OpcionesDocumentos;