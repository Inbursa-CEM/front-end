import "../../Styles/App.css";
import "../../Styles/dashboard.css";
import React from "react";
import Header from "../Layouts/header";
import OpcionesDocumentos from "./opcionesDocumentos";
import OpcionesTranscripciones from "./opcionesTranscripciones";
import { useState } from "react";
import { Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EstatusAgentes from "./estatusAgente";
import PromedioDuracionLlamadas from "./promDuracionLlamadas";
import PromedioCalidadServicio from "./promCalidadServicio";
import SentimientoPromedioAgente from "./sentimientoPromedioAgente";
import TotalProblemasAtendidos from "./totalProblemasAtendidos";
import VelocidadPromedioRespuesta from "./velPromedioRespuesta";
import NumeroLlamadasDepartamento from "./numeroLlamadasDepto";
import NumeroLlamadasAtendidas from "./numLlamadasAtendidas";
import PromedioServicioGeneral from "./promServicioGeneral";

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
            <div className="indicador">
              <NumeroLlamadasAtendidas />
            </div>
          </div>
          <div className="item">
            <h4> Promedio de duración de llamadas por agente</h4>
            <div className="indicador">
              <PromedioDuracionLlamadas />
            </div>
          </div>
          <div className="item">
            <h4>Estatus de agentes al momento</h4>
            <div className="indicador">
             <EstatusAgentes />
            </div>
          </div>
          <div className="item">
            <h4>Promedio de calidad de servicio por agente</h4>
            <div className="indicador">
              <PromedioCalidadServicio />
            </div>
          </div>
          <div className="item">
            <h4>Sentimiento promedio en llamadas por agente</h4>
            <div className="indicador">
              <SentimientoPromedioAgente />
            </div>
          </div>
          <div className="item">
            <h4>Total de reportes atendidos por agente</h4>
            <div className="indicador">
              <TotalProblemasAtendidos />
            </div>
          </div>
          <div className="item">
            <h4>Total de llamadas atendidas a nivel departamento</h4>
            <div className="indicador">
              <NumeroLlamadasDepartamento />
            </div>
          </div>
          <div className="item">
            <h4>Velocidad promedio de respuesta</h4>
            <div className="indicador">
              <VelocidadPromedioRespuesta />
            </div>
          </div>
          <div className="item">
            <h4>Promedio de Servicio a nivel departamento</h4>
            <div className="indicador">
              <PromedioServicioGeneral />
            </div>
          </div>
        </div>
        <div className="botonesReportes">
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
