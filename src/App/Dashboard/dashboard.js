import "../../Styles/App.css";
import "../../Styles/dashboard.css";
import React from "react";
import Header from "../Layouts/header";
import PromedioServicioCliente from "./promServClien";
import DuracionPromedioLlamada from "./promDuraCall";
import NumeroLlamadasAtendidas from "./numCallsAtend";
import ProblemasResueltos from "./probResueltos";
import ProblemasNoResueltos from "./probNoResueltos";
import ResolucionPrimerContacto from "./resoluPrimerCont";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import { red, green } from "@mui/material/colors";
import OpcionesDocumentos from "./opcionesDocumentos";
import OpcionesTranscripciones from "./opcionesTranscripciones";
import { useState } from "react";
import { Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const Dashboard = () => {
  const [opcionesAnalisis, setOpcionesAnalisis] = useState(false);
  const [opcionesTranscripciones, setOpcionesTranscripciones] = useState(false);

  const ocultarAnalisis = () => {
    setOpcionesAnalisis(!opcionesAnalisis);
  };

  const ocultarTranscripciones = () => {
    setOpcionesTranscripciones(!opcionesTranscripciones);
  };

  return (
    <div>
      <Header />
      <div className="PaginaDashboard">
        <div className="dashboard">
          <div className="item">
            <h4>Llamadas atendidas por agente</h4>
            <h1>5</h1>
            <div className="indicador">
              <KeyboardDoubleArrowUpIcon
                sx={{ color: green[900], fontSize: 60 }}
              />
              <h3 className="porcentajeUp">0.56%</h3>
            </div>
          </div>
          <div className="item">
            <h4> Promedio de duración de llamadas por agente</h4>
            <h1>3</h1>
            <div className="indicador">
              <KeyboardDoubleArrowDownIcon
                sx={{ color: red[900], fontSize: 60 }}
              />
              <h3 className="porcentajeDown">0.56%</h3>
            </div>
          </div>
          <div className="item">
            <h4>Estatus de agentes al momento</h4>
            <h1>2 min</h1>
            <div className="indicador">
              <KeyboardDoubleArrowUpIcon
                sx={{ color: green[900], fontSize: 60 }}
              />
              <h3 className="porcentajeUp">0.56%</h3>
            </div>
          </div>
          <div className="item">
            <h4>Promedio de calidad de servicio por agente</h4>
            <PromedioServicioCliente />
          </div>
          <div className="item">
            <h4>Sentimiento promedio en llamadas por agente</h4>
            <DuracionPromedioLlamada />
          </div>
          <div className="item">
            <h4>Total de reportes resueltos por agente</h4>
            <NumeroLlamadasAtendidas />
          </div>
          <div className="item">
            <h4>Total de llamadas atendidas a nivel departamento</h4>
            <ProblemasResueltos />
          </div>
          <div className="item">
            <h4>Velocidad promedio de respuesta</h4>
            <ProblemasNoResueltos />
          </div>
          <div className="item">
            <h4>KPI DE SKIAF</h4>
            <ResolucionPrimerContacto />
          </div>
        </div>
        <div className="botonesReportes">
          {opcionesAnalisis ? (
            <div className="ventanaReportes">
              <Button className="cerrarOpciones" onClick={ocultarAnalisis}> <CloseIcon /> </Button>
              <OpcionesDocumentos />
              <button className="botonAzulMarino" onClick={ocultarAnalisis}>
                Descargar
              </button>
            </div>
          ) : (
            <button className="botonAzulMarino" onClick={ocultarAnalisis}>
              Descargar análisis
            </button>
          )}
          {opcionesTranscripciones ? (
            <div className="ventanaTranscripciones">
              <Button className="cerrarOpciones" onClick={ocultarTranscripciones}> <CloseIcon /> </Button>
              <OpcionesTranscripciones />
              <button className="botonAzulMarino" onClick={ocultarTranscripciones}>
                Descargar
              </button>
            </div>
          ) : (
            <button className="botonAzulMarino" onClick={ocultarTranscripciones}>
              Descargar transcripciones
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
