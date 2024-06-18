import "./Styles/App.css";
import Dashboard from "./App/Dashboard/dashboard";
import Monitoreo from "./App/TablaMonitoreo/monitoreo";
import Cursos from "./App/Cursos/cursos";
import { Route, Routes } from "react-router-dom";
import LogIn from "./App/LogIn";
import CrearCuenta from "./App/CrearCuenta";
import Verificacion from "./App/Verificacion";
import RecuperarCuenta from "./App/RecuperarCuenta";
import CambiarContrasena from "./App/CambiarContrasena";
import PageNotFound from "./App/PageNotFound";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/monitoreo" element={<Monitoreo />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/cursos" element={<Cursos />} />
        <Route path="/crearcuenta" element={<CrearCuenta />} />
        <Route path="/verificacion" element={<Verificacion />} />
        <Route path="/recuperarcuenta" element={<RecuperarCuenta />} />
        <Route path="/cambiarcontrasena" element={<CambiarContrasena />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
