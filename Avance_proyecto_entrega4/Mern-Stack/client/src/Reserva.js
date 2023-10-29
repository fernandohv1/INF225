import './Reserva.css';
import {Calendar3} from './Calendario3';

function Reserva() {
    return (
        <div className="position">
            <h2>Para añadir una hora cambie el mes o año en el calendario, luego seleccione el día que desea</h2>
            <Calendar3 />
        </div>
    );
}

export default Reserva;