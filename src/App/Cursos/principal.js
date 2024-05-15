import "../../Styles/prueba.css";
import Lista_Cursos from "./list_cursos";
import Operadores from "./operadores";
import Area from "./areas";
import Sugerencias from "./sugerencias";
import { useState } from "react";
import AgregarCurso from "./agregarCurso";

const Principal = () => {
  const [idOperador, setIdOperador] = useState(0);
  const [idSupervisor, setIdSupervisor] = useState(1);
  const [idArea, setArea] = useState(0);

  return (
    <div>
      <div className="container">
        <div className="box-1">
          <h2 className="texto">Operadores</h2>
          <Operadores
            idSupervisor={idSupervisor}
            setIdOperador={setIdOperador}
          />
        </div>
        <div className="box-2">
          <div className="box-3">
            <h2 className="texto">Cursos y Recomendaciones Asignadas</h2>

            <Lista_Cursos idOperador={idOperador}></Lista_Cursos>
          </div>
          <div className="box-4">
            <div className="box-5">
              <h2 className="texto">Areas de Oportunidad</h2>
              <Area setArea={setArea}></Area>
            </div>
            <div className="box-6">
              <h2 className="texto">Cursos y Recomendaciones</h2>
 
              <Sugerencias area={idArea} idOperador={idOperador}></Sugerencias>
            </div>
          </div>
        </div>
        
      </div>
      <div className="box-7">
        <h2 className="texto">Agregar Cursos</h2>
        <AgregarCurso></AgregarCurso>
      </div>
    </div>
  );
};

export default Principal;
