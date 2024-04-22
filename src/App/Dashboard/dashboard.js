import "../../Styles/App.css";
import "../../Styles/dashboard.css";
import React from "react";
import Header from "../Comunes/header";
import PromedioServicioCliente from "./promServClien";
import DuracionPromedioLlamada from "./promDuraCall";
import NumeroLlamadasAtendidas from "./numCallsAtend";
import ProblemasResueltos from "./probResueltos";
import ProblemasNoResueltos from "./probNoResueltos";
import ResolucionPrimerContacto from "./resoluPrimerCont";
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import { red,green } from "@mui/material/colors";

const Dashboard = () => {
  return (
    <div>
      <Header />
      <div className="dashboard">
        <div className="item">
          <h4>Llamadas promedio por agente</h4>
          <h1>5</h1>
          <div className="indicador">
            <KeyboardDoubleArrowUpIcon sx={{color:green[900],fontSize:60}}/>
            <h3 className="porcentajeUp">0.56%</h3>
          </div>
        </div>
        <div className="item">
          <h4> Promedio de probelmas resueltos por agente</h4>
          <h1>3</h1>
          <div className="indicador">
            <KeyboardDoubleArrowDownIcon sx={{color:red[900],fontSize:60}}/>
            <h3 className="porcentajeDown">0.56%</h3>
          </div>
        </div>
        <div className="item">
          <h4>Velocidad promedio de respuesta</h4>
          <h1>2 min</h1>
          <div className="indicador">
            <KeyboardDoubleArrowUpIcon sx={{color:green[900],fontSize:60}}/>
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
    </div>
  );
};

export default Dashboard;
