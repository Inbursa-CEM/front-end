import '../../Styles/App.css'
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Header from '../Layouts/header';
import EmpleadosTabla from './tablaMonitoreo';

const Monitoreo = () => {
    return (
        <div>
            <div className='monitoreo'>
                <Header />
                <div className='tablaMonitoreo'>
                    <EmpleadosTabla />
                </div>    
                <div className='botonAgregar'>
                    <Button className='botonAgregar' variant='contained' color='primary'/>
                </div>
            </div>
        </div>
    );
}

export default Monitoreo;