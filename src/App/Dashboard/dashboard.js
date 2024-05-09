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

const Dashboard = () => {
  const [opcionesAnalisis, setOpcionesAnalisis] = useState(false);
  const [opcionesTranscripciones, setOpcionesTranscripciones] = useState(false);

  const handleAnalisis = () => {
    setOpcionesAnalisis(!opcionesAnalisis);
  };

  const handleTranscripciones = () => {
    setOpcionesTranscripciones(!opcionesTranscripciones);
  };

  return (
    <div>
      <Header />
      <div className="PaginaDashboard">
        <div className="dashboard">
          <div className="item">
            <h4>Llamadas promedio por agente</h4>
            <h1>5</h1>
            <div className="indicador">
              <KeyboardDoubleArrowUpIcon
                sx={{ color: green[900], fontSize: 60 }}
              />
              <h3 className="porcentajeUp">0.56%</h3>
            </div>
          </div>
          <div className="item">
            <h4> Promedio de probelmas resueltos por agente</h4>
            <h1>3</h1>
            <div className="indicador">
              <KeyboardDoubleArrowDownIcon
                sx={{ color: red[900], fontSize: 60 }}
              />
              <h3 className="porcentajeDown">0.56%</h3>
            </div>
          </div>
          <div className="item">
            <h4>Velocidad promedio de respuesta</h4>
            <h1>2 min</h1>
            <div className="indicador">
              <KeyboardDoubleArrowUpIcon
                sx={{ color: green[900], fontSize: 60 }}
              />
              <h3 className="porcentajeUp">0.56%</h3>
            </div>
          </div>
          <div className="item">
            <h4>Promedio de servicio</h4>
            <PromedioServicioCliente />
          </div>
          <div className="item">
            <h4>Duración promedio de llamadas</h4>
            <DuracionPromedioLlamada />
          </div>
          <div className="item">
            <h4>Número de llamadas atendidas</h4>
            <NumeroLlamadasAtendidas />
          </div>
          <div className="item">
            <h4>Total de problemas resuletos</h4>
            <ProblemasResueltos />
          </div>
          <div className="item">
            <h4>Total de problemas no resueltos</h4>
            <ProblemasNoResueltos />
          </div>
          <div className="item">
            <h4>Resolución del primer contacto</h4>
            <ResolucionPrimerContacto />
          </div>
        </div>
        <div className="botonesReportes">
          {opcionesAnalisis ? (
            <div className="ventanaReportes">
              <OpcionesDocumentos />
              <button className="botonAzulMarino" onClick={handleAnalisis}>
                Descargar
              </button>
            </div>
          ) : (
            <button className="botonAzulMarino" onClick={handleAnalisis}>
              Descargar análisis
            </button>
          )}
          {opcionesTranscripciones ? (
            <div className="ventanaTranscripciones">
              <OpcionesTranscripciones />
              <button className="botonAzulMarino" onClick={handleTranscripciones}>
                Descargar
              </button>
            </div>
          ) : (
            <button className="botonAzulMarino" onClick={handleTranscripciones}>
              Descargar transcripciones
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
