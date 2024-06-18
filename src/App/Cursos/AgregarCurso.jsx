//Autores: Carlos Alberto Sánchez Calderón, Alonso Segura De Lucio
import "../../Styles/agregar.css";
import Button from "@mui/material/Button";
import { useState, createContext } from "react";
import AreaSelect from "./AreasSelect";

export const contextoGlobal = createContext(); //Espacio global

const AgregarCurso = () => {
  const [nombre, setNombre] = useState(0);
  const [descripcion, setDescripcion] = useState(0);
  const [url, setUrl] = useState(0);
  const [personName, setPersonName] = useState([]);

  const modificarNombre = (evento) => {
    setNombre(evento.target.value);
  };

  const modificarDescripcion = (evento) => {
    setDescripcion(evento.target.value);
  };

  const modificarUrl = (evento) => {
    setUrl(evento.target.value);
  };

  const options = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      nombre,
      descripcion,
      url,
      idAreasOportunidad: personName,
    }),
  };

  const Guardar = () => {
    console.log(options.body);
    fetch("http://localhost:8080/curso/crear", options)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <form>
        <input
          className="ag-input"
          type="text"
          placeholder="Escribe el nombre "
          name="nombre"
          id="nombre"
          onChange={modificarNombre}
        />

        <input
          className="ag-input"
          type="text"
          placeholder="Escribe la descripción de la tarea"
          name="descripcion"
          id="descripcion"
          onChange={modificarDescripcion}
        />

        <input
          className="ag-input"
          type="text"
          placeholder="Escribe el url"
          name="url"
          id="url"
          onChange={modificarUrl}
        />
      </form>
      <AreaSelect setPersonName={setPersonName} personName={personName} />
      <Button variant="contained" style={{ margin: "10px" }} onClick={Guardar}>
        Agregar
      </Button>
    </div>
  );
};

export default AgregarCurso;
