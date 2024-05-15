import "./Styles/App.css";
import Dashboard from "./App/Dashboard/dashboard";
import Monitoreo from "./App/TablaMonitoreo/monitoreo";
import Cursos from "./App/Cursos/cursos";
import { Route, Routes } from "react-router-dom";
import DetallesAgente from "./App/TablaMonitoreo/Detalles";

function App() {
  return (
    <div className="App">
     {/*  <Routes>
        <Route path="/" element={<Monitoreo />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/cursos" element={<Cursos />} />
      </Routes> */}
      <DetallesAgente />
    </div>
  );
}

export default App;
