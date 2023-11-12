import './Reserva.css';
import React, { useState, useEffect } from 'react';

function Reserva({ rut }) {
    const [nuevaCita, setNuevaCita] = useState({
        paciente: '',
        doctor: '',
        hora: '',
        fecha: '',
        rut: '',
        examen: '',
        motivo: '',
        rutm: rut, 
        equipo: '',
    });

    const handleNuevaCitaChange = (campo, valor) => {
        setNuevaCita((prevNuevaCita) => ({ ...prevNuevaCita, [campo]: valor }));
    };
    
    const crearCita = async () => {
        try {
          const response = await fetch('http://localhost:5000/Citac', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(nuevaCita),
          });
    
          if (!response.ok) {
            throw new Error(`Error al crear la cita: ${response.status} - ${response.statusText}`);
          }
    
          const citaCreada = await response.json();
          console.log('Cita creada:', citaCreada);
          alert("Cita creada exitosamente.")
        } catch (error) {
          console.error('Error al crear la cita:', error.message);
        }
    };

    return (
        <div className="position">
            <div>
                <h2>Crear Nueva Cita</h2>
                <form>
                    <div>
                        <label>Rut del paciente:</label>
                        <input type="text" name="paciente" onChange={(e) => handleNuevaCitaChange('paciente', e.target.value)} value={nuevaCita.paciente}/>
                    </div>
                    <div>
                        <label>Doctor:</label>
                        <input type="text" name="doctor" onChange={(e) => handleNuevaCitaChange('doctor', e.target.value)} value={nuevaCita.doctor}/>
                    </div>
                    <div>
                        <label>Examen:</label>
                        <input type="text" name="examen" onChange={(e) => handleNuevaCitaChange('examen', e.target.value)} value={nuevaCita.examen}/>
                    </div>
                    <div>
                        <label>Fecha:</label>
                        <input type="date" name="fecha" onChange={(e) => handleNuevaCitaChange('fecha', e.target.value)} value={nuevaCita.fecha}/>
                    </div>
                    <div>
                        <label>Hora:</label>
                        <input type="time" name="hora" onChange={(e) => handleNuevaCitaChange('hora', e.target.value)} value={nuevaCita.hora}/>
                    </div>
                    <div>
                        <label>Equipo:</label>
                        <input type="number" name="rut" onChange={(e) => handleNuevaCitaChange('equipo', e.target.value)} value={nuevaCita.equipo}/>
                    </div>
                    <div>
                        <label>Observaciones:</label>
                        <input type="text" name="motivo" onChange={(e) => handleNuevaCitaChange('motivo', e.target.value)} value={nuevaCita.motivo}/>
                    </div>
                    <button type="button" onClick={crearCita}>Crear Nueva Cita</button>
                </form>
            </div>
        </div>
    );
}

export default Reserva;