import "../../Styles/App.css";
import Header from "../Layouts/header";
import TagEmpleado from "../Layouts/tagEmpleado";
import OneOnOne from "./OneOnOne";
import Notificaciones from "./listaNotis";
import EmpleadosTabla from "./tablaMonitoreo";
import FaceIcon from "@mui/icons-material/Face";

const Monitoreo = () => {
  return (
    <div>
      <div className="monitoreo">
        <Header />
        < OneOnOne id={1} />
        <div className="tablaMonitoreo">
          <EmpleadosTabla />
        </div>
      </div>
    </div>
  );
};

export default Monitoreo;
