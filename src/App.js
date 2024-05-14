import "./Styles/App.css";
import Dashboard from "./App/Dashboard/dashboard";
import Monitoreo from "./App/TablaMonitoreo/monitoreo";
import Cursos from "./App/Cursos/cursos";
import { Route, Routes } from "react-router-dom";
import JoinCall from "./App/TablaMonitoreo/botonCall";
import OneOnOne from "./App/TablaMonitoreo/OneOnOne";

function App() {
  return (
    <div className="App">
      <JoinCall />
      <OneOnOne />
    </div>
  );
}

export default App;
