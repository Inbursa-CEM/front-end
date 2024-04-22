import '../../Styles/App.css'
import '../../Styles/cursos.css'
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Header from '../Comunes/header';
import CursosTabla from './tablaCursos';

const Cursos = () => {
    return (
        <div>
            <div className='cursos'>
                <Header />
                <div className='tablaCursos'>
                    <CursosTabla />
                </div>    
            </div>
        </div>
    );
}

export default Cursos;