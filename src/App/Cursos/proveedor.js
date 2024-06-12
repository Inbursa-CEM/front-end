import { createContext, useState } from "react";

export const contextoGlobal = createContext(); //Espacio global

const Proveedor = ({ children }) => {
  const [arrCursos, setArrCursos] = useState([]);

  //Funcion para agregar una nueva tarea
  const agregarCurso = (curso_nuevo) => {
    setArrCursos([curso_nuevo, ...arrCursos]);
  };

  //Funcion para eliminar una tarea
  const eliminarCurso = (id) => {
    const arrCursosNuevo = arrCursos.filter((curso) => curso.idCurso !== id);
    setArrCursos(arrCursosNuevo);
    
  };

  return (
    <contextoGlobal.Provider value={[arrCursos, setArrCursos, agregarCurso, eliminarCurso]}>
      {children}
    </contextoGlobal.Provider>
  );
};

export default Proveedor;
