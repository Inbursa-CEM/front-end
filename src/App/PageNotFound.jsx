// Autora: Lauren Lissette Llauradó Reyes
// Componente que muestra una página de error 404

import { useNavigate } from "react-router-dom";
import "../Styles/pagenotfound.css";

const PageNotFound = () => {
  const navegar = useNavigate();

  return (
    <div>
      <h1 className="titulo-error">404</h1>
      <p className="mensaje-error-404">Página no encontrada</p>
      <div className="contenedor-boton-error">
        <button className="boton-error" onClick={() => navegar("/")}>
          Regresar
        </button>
      </div>
    </div>
  );
};

export default PageNotFound;
