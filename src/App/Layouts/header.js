import "../../Styles/header.css";
import OpcionIcono from "./opcionIcono";
import TagEmpleado from "./tagEmpleado";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import FaceIcon from "@mui/icons-material/Face";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import ChatIcon from "@mui/icons-material/Chat";

const Header = () => {
  return (
    <div className="header">
      <div className="menuIconos">
        <OpcionIcono icono={<SupportAgentIcon />} texto="Monitoreo" ruta="/monitoreo" />
        <OpcionIcono icono={<QueryStatsIcon />} texto="Estadísticas" ruta="/dashboard" />
        <OpcionIcono icono={<ReceiptLongIcon />} texto="Cursos" ruta="/cursos" />
      </div>
      <div className="tagEmpleado">
        <TagEmpleado icono={<FaceIcon/>} texto="Carlos Sánchez" subtexto="Supervisor" />
      </div>
    </div>
  );
};

export default Header;
