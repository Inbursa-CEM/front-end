import React, { useState } from 'react'
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import Checkbox from '@mui/material/Checkbox';
import '../../Styles/dashboard.css'

const OpcionesTranscripciones = () => {

    const [dias, setDias] = useState({
        Lunes: false,
        Martes: false,
        Miercoles: false,
        Jueves: false,
        Viernes: false
    })

    const [operadores, setOperadores] = useState({
        operador1: false,
        operador2: false,
        operador3: false,
        operador4: false,
        operador5: false
    })

    const handleDias = (dia) => {
        setDias({
            ...dias,
            [dia.target.name]: dia.target.checked
        })
    }

    const handleOperadores = (operador) => {
        setOperadores({
            ...operadores,
            [operador.target.name]: operador.target.checked
        })
    }


    const {Lunes, Martes, Miercoles, Jueves, Viernes } = dias;
    const {operador1, operador2, operador3, operador4, operador5 } = operadores;

    return (
        <div className="opcionesTranscripciones">
            <FormControl component="fieldset">
                <FormLabel component="legend">Seleccione los días:</FormLabel>
                <FormGroup>
                    <FormControlLabel 
                    control={
                        <Checkbox checked={Lunes} onChange={handleDias} name="Lunes" />
                    }
                    label="Lunes"
                    />
                    <FormControlLabel 
                    control={
                        <Checkbox checked={Martes} onChange={handleDias} name="Martes" />
                    }
                    label="Martes"
                    />
                    <FormControlLabel 
                    control={
                        <Checkbox checked={Miercoles} onChange={handleDias} name="Miercoles" />
                    }
                    label="Miercoles"
                    />
                     <FormControlLabel 
                    control={
                        <Checkbox checked={Jueves} onChange={handleDias} name="Jueves" />
                    }
                    label="Jueves"
                    />
                     <FormControlLabel 
                    control={
                        <Checkbox checked={Viernes} onChange={handleDias} name="Viernes" />
                    }
                    label="Viernes"
                    />
                </FormGroup>
            </FormControl>
            <FormControl component="fieldset">
                <FormLabel component="legend">Seleccione a los operadores</FormLabel>
                <FormGroup>
                    <FormControlLabel 
                    control={
                        <Checkbox checked={operador1} onChange={handleOperadores} name="operador1" />
                    }
                    label="Jorge Ramirez"
                    />
                    <FormControlLabel 
                    control={
                        <Checkbox checked={operador2} onChange={handleOperadores} name="operador2" />
                    }
                    label="Carlos Calderón"
                    />
                    <FormControlLabel 
                    control={
                        <Checkbox checked={operador3} onChange={handleOperadores} name="operador3" />
                    }
                    label="Ana Sánchez"
                    />
                     <FormControlLabel 
                    control={
                        <Checkbox checked={operador4} onChange={handleOperadores} name="operador4" />
                    }
                    label="María López"
                    />
                     <FormControlLabel 
                    control={
                        <Checkbox checked={operador5} onChange={handleOperadores} name="operador5" />
                    }
                    label="Pedro Pérez"
                    />
                </FormGroup>
            </FormControl>
        </div>
    )
}

export default OpcionesTranscripciones;