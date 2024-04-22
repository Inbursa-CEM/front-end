import { Link } from 'react-router-dom';
import '../../Styles/App.css'
import { Button } from '@mui/material';

const TagEmpleado = ({ icono, texto, subtexto }) => {
    return (
        <div className="tagEmpleado">
            <Button className='botonGris' >
                {icono} {texto} {subtexto}
            </Button>
        </div>
    );
}

export default TagEmpleado;