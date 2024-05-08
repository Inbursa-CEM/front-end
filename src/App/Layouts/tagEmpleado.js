import { Link } from 'react-router-dom';
import '../../Styles/App.css'
import { Button } from '@mui/material';

const TagEmpleado = ({ imagenEmpleado, texto, subtexto, icono1, icono2 }) => {
    return (
        <div className="tagEmpleado">
            <div className='tarjetaEmpleado' >
                {imagenEmpleado} {texto} {subtexto} {icono1} {icono2}
            </div>
        </div>
    );
}

export default TagEmpleado;