//Autores: Carlos Alberto Sánchez Calderón, Alonso Segura De Lucio
import "../../Styles/prueba.css";
import ListaCursos from "./ListaCursos";
import Operadores from "./Operadores";
import Area from "./Areas";
import Sugerencias from "./Sugerencias";
import { useState } from "react";
import AgregarCurso from "./AgregarCurso";
import Proveedor from "./Proveedor";

//Componente que incluye las distintas funcionalidades de recomendaciones
const Principal = () => {
  const [idOperador, setIdOperador] = useState(0);
  const idSupervisor = sessionStorage.getItem("userId");
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
          <Proveedor>
            <div className="box-4">
              <div className="box-5">
                <h2 className="texto">Areas de Oportunidad</h2>
                <Area setArea={setArea}></Area>
              </div>
              <div className="box-6">
                <h2 className="texto">Cursos y Recomendaciones</h2>

                <Sugerencias
                  area={idArea}
                  idOperador={idOperador}
                ></Sugerencias>
              </div>
            </div>

            <div className="box-3">
              <h2 className="texto">Cursos y Recomendaciones Asignadas</h2>

              <ListaCursos idOperador={idOperador}></ListaCursos>
            </div>
          </Proveedor>
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
