import './Registro.css';
import React, { useState } from 'react';
import CitaMedica from './CitaMedica';



function Registro() {
    const [citas, setCitas] = useState([
      { id: 1, paciente: 'Juanito Perez', doctor: 'Dr. Esteban Mujica', hora: '10:00 AM',fecha:'10-11-23',rut:'20911322-3',examen:'neurologico',motivo:'demencia'}
    ]);

    const modificarCita = (id, nuevaHora, nuevaFecha, nuevoRut, nuevoExamen, nuevoMotivo) => {
        setCitas((prevCitas) =>
          prevCitas.map((cita) =>
            cita.id === id
              ? {
                  ...cita,
                  hora: nuevaHora,
                  fecha: nuevaFecha,
                  rut: nuevoRut,
                  examen: nuevoExamen,
                  motivo: nuevoMotivo,
                }
              : cita
          )
        );
      };
      
  
    return (
      <div className="position">
        <h1>Registro de hora</h1>
        <div className="citas-container">
          {citas.map((cita) => (
            <CitaMedica key={cita.id} cita={cita} onModificar={modificarCita} />
          ))}
        </div>
      </div>
    );
  }
  
  export default Registro;
  