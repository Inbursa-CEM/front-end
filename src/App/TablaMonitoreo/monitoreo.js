// Autores:
// Gustavo Alejandro Gutiérrez Valdes
// Lauren Lissette Llauradó Reyes
// Componente de la pestaña de la tabla de monitoreo

import "../../Styles/App.css";
import Header from "../Layouts/header";
import EmpleadosTabla from "./tablaMonitoreo";

const Monitoreo = () => {
  return (
    <div>
      <div className="monitoreo">
        <Header />
        <div className="tablaMonitoreo">
          <EmpleadosTabla />
        </div>
      </div>
    </div>
  );
};

export default Monitoreo;
