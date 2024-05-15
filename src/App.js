import "./Styles/App.css";
import Dashboard from "./App/Dashboard/dashboard";
import Monitoreo from "./App/TablaMonitoreo/monitoreo";
import Cursos from "./App/Cursos/cursos";
import { Route, Routes } from "react-router-dom";
import LogIn from "./App/LogIn";
import ProfileCard from "./App/TablaMonitoreo/ProfileCard";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/monitoreo" element={<Monitoreo />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/cursos" element={<Cursos />} />
        <Route path="/profile" element={<ProfileCard />} />
      </Routes>
    </div>
  );
}

export default App;
