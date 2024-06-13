//Autores: Carlos Alberto Sánchez Calderón, Alonso Segura De Lucio
import "../../Styles/App.css";
import "../../Styles/cursos.css";
import Header from "../Layouts/header";
import Principal from "./principal";

//Componente que encapsula la funcionalidad de recomendaciones
const Cursos = () => {
  return (
    <div>
      <div className="cursos">
        <Header />
        <div className="tablaCursos">
          <Principal />

        </div>
      </div>
    </div>
  );
};

export default Cursos;
