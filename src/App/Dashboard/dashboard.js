import "../../Styles/App.css";
import "../../Styles/dashboard.css";
import React from "react";
import Header from "../Layouts/header";
import { useState } from "react";
import { Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import NumeroLlamadasPorAgente from "./NumeroLlamadasAgente";
import PromedioDuracionLlamadasAgente from "./PromedioDuracionAgente";
import EstatusAgentes from "./EstatusAgentes";
import PromedioServicioPorAgente from "./PromedioServicioAgente";
import SentimientoPromedioAgente from "./SentimientoPromedioAgente";
import TotalProblemasAtendidos from "./ProblemasAtendidosAgente";
import VelocidadPromedioRespuesta from "./VelocidadPromedioRespuesta";
import PromedioServicioGeneral from "./PromedioServicioGeneral";
import ProblemasAtendidosAgente from "./ProblemasAtendidosAgente";
import NumeroLlamadasGeneral from "./NumeroLlamadasGeneral";



const Dashboard = () => {
  return (
    <div>
      <Header />
      <div className="PaginaDashboard">
        <div className="dashboard">
          <div className="item">
            <h4>Llamadas atendidas por agente</h4>
            <div className="indicador">
              <NumeroLlamadasPorAgente />
            </div>
          </div>
          <div className="item">
            <h4> Promedio de duración de llamadas por agente</h4>
            <div className="indicador">
              <PromedioDuracionLlamadasAgente />
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
              <PromedioServicioPorAgente />
            </div>
          </div>
          <div className="item">
            <h4>Sentimientos en llamadas por agente</h4>
            <div className="indicador">
              <SentimientoPromedioAgente />
            </div>
          </div>
          <div className="item">
            <h4>Promedio de reportes resueltos por agente</h4>
            <div className="indicador">
              <ProblemasAtendidosAgente />
            </div>
          </div>
          <div className="item">
            <h4>Total de llamadas atendidas</h4>
            <div className="indicador">
              <NumeroLlamadasGeneral  />
            </div>
          </div>
          <div className="item">
            <h4>Velocidad promedio de respuesta</h4>
            <div className="indicador">
              <VelocidadPromedioRespuesta />
            </div>
          </div>
          <div className="item">
            <h4>Promedio de Servicio General</h4>
            <div className="indicador">
              <PromedioServicioGeneral />
            </div>
          </div>
        </div>
        <div className="botonesReportes"></div>
      </div>
    </div>
  );
};

export default Dashboard;
