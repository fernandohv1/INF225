import './Reserva.css';
import React, { useState, useEffect } from 'react';

function Reserva({ rut }) {
    const [nuevaCita, setNuevaCita] = useState({
        paciente: '',
        doctor: '',
        hora: '',
        fecha: '',
        examen: '',
        motivo: '',
        rutm: rut, 
        equipo: '',
    });

    const [opcionesEquipo, setOpcionesEquipo] = useState([]);
    const [opcionesHora, setOpcionesHora] = useState([]);

    const handleNuevaCitaChange = (campo, valor) => {
        let valorAAlmacenar = valor;
    
        if (campo === 'examen') {
            valorAAlmacenar = parseInt(valor, 10);
    
            switch (valor) {
                case '1': // Radiografía
                    setOpcionesHora(['08:30', '09:00', '09:30', '10:00','10:30','11:00','11:30','12:00', '12:30',
                     '14:00', '14:30','15:00','15:30', '16:00']);
                    setOpcionesEquipo([1, 2, 3, 4, 5, 6, 7]);
                    break;
                case '2': // Ecografía
                    setOpcionesHora(['08:30', '09:00','09:30', '10:00','10:30','11:00','11:30','12:00', '12:30',
                    '14:00', '14:30','15:00','15:30', '16:00']);
                    setOpcionesEquipo([1, 2, 3, 4, 5]);
                    break;
                case '3': // Resonancia Magnética
                    setOpcionesHora(['08:30', '10:00', '11:30', '14:00']);
                    setOpcionesEquipo([1, 2]);
                    break;
                case '4': // Scanner
                    setOpcionesHora(['08:30','9:30','10:30', '11:30', '14:00']);
                    setOpcionesEquipo([1, 2, 3]);
                    break;
                default:
                    setOpcionesHora([]);
                    setOpcionesEquipo([]);
                    break;
            }
        }
    
        setNuevaCita((prevNuevaCita) => ({ ...prevNuevaCita, [campo]: valorAAlmacenar }));
    };
    /*
    const handleNuevaCitaChange = (campo, valor) => {
        let valorAAlmacenar = valor;
    
        // Verifica si el campo es 'examen' y realiza la conversión a número
        if (campo === 'examen') {
            valorAAlmacenar = parseInt(valor, 10);
            switch (valor) {
                case '1': // Radiografía
                    setOpcionesEquipo([1, 2, 3, 4, 5, 6, 7]);
                    break;
                case '2': // Ecografía
                    setOpcionesEquipo([1, 2, 3, 4, 5]);
                    break;
                case '3': // Resonancia Magnética
                    setOpcionesEquipo([1, 2]);
                    break;
                case '4': // Scanner
                    setOpcionesEquipo([1, 2, 3]);
                    break;
                default:
                    setOpcionesEquipo([]);
                    break;
            }
        }
    
        setNuevaCita((prevNuevaCita) => ({ ...prevNuevaCita, [campo]: valorAAlmacenar }));
    };*/
    
    const verificarExistenciaCita = async (event) => {
        event.preventDefault(); // Evita que el formulario recargue la página
        try {
            console.log(nuevaCita.examen);
          const response = await fetch('http://localhost:5000/Citaex', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              idex: nuevaCita.examen,
              fecha: nuevaCita.fecha,
              hora: nuevaCita.hora,
              equipo: parseInt(nuevaCita.equipo, 10),
            }),
          });
      
          if (!response.ok) {
            throw new Error(`Error al verificar existencia de la cita: ${response.status} - ${response.statusText}`);
          }
      
          const data = await response.json();
          console.log(data);
      
          if (data.existe) {
            alert("No se puede crear la cita, ya existe una cita con esos detalles.");
          } else {
            // Si la cita no existe, entonces crea la cita
            crearCita();
          }
        } catch (error) {
          console.error('Error al verificar existencia de la cita:', error.message);
        }
      };


    const crearCita = async () => {
        try {
            // Verificar si todos los campos requeridos están llenos
            if (
                nuevaCita.paciente &&
                nuevaCita.doctor &&
                nuevaCita.examen &&
                nuevaCita.fecha &&
                nuevaCita.hora &&
                nuevaCita.equipo &&
                nuevaCita.motivo
            ) {

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
                alert("Cita creada exitosamente.");
            } else {
                // Mostrar un mensaje de error indicando que faltan campos
                console.log(nuevaCita);
                alert("Por favor, complete todos los campos");
            }
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
                        <select name="doctor" onChange={(e) => handleNuevaCitaChange('doctor', e.target.value)} value={nuevaCita.doctor}>
                            <option value="" disabled selected>Selecciona un doctor</option>
                            <option value="1">Dr. JAN DAVID JORQUERA CONTRERAS</option>
                            <option value="2">Dr. MATIAS ISRAEL VILLAVERDE POBLETE</option>
                            <option value="3">Dr. NICOLÁS SCHIAFFINO MELLADO</option>
                            <option value="4">Dr. JUAN CARLOS RODRÍGUEZ LÓPEZ</option>
                            <option value="5">Dr. ANA SOFÍA MARTÍNEZ RAMÍREZ</option>
                            <option value="6">Dr. LUIS ALBERTO HERRERA CASTILLO</option>
                            <option value="7">Dr. JOSE LINO CONTRERAS VÉLIZ</option>
                        </select>
                    </div>
                    <div>
                        <label>Examen:</label>
                        <select name="examen" onChange={(e) => handleNuevaCitaChange('examen', e.target.value)} value={nuevaCita.examen}>
                            <option value="" disabled selected>Selecciona un examen</option>
                            <option value="1">Radiografía</option>
                            <option value="2">Ecografía</option>
                            <option value="3">Resonancia Magnética</option>
                            <option value="4">Scanner</option>
                        </select>
                    </div>
                    <div>
                        <label>Fecha:</label>
                        <input type="date" name="fecha" onChange={(e) => handleNuevaCitaChange('fecha', e.target.value)} value={nuevaCita.fecha}/>
                    </div>
                    <div>
                        <label>Hora:</label>
                            <select name="hora" onChange={(e) => handleNuevaCitaChange('hora', e.target.value)} value={nuevaCita.hora}>
                                <option value="" disabled selected>
                                    Selecciona una hora
                                </option>
                            {opcionesHora.map((hora) => (
                                <option key={hora} value={hora}>
                                    {hora}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label>Equipo:</label>
                        <select name="equipo" onChange={(e) => handleNuevaCitaChange('equipo', e.target.value)} value={nuevaCita.equipo}>
                            <option value="" disabled selected>Seleccione un equipo</option>
                            {opcionesEquipo.map((opcion) => (
                                <option key={opcion} value={opcion}>
                                    {opcion}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label>Observaciones:</label>
                        <input type="text" name="motivo" onChange={(e) => handleNuevaCitaChange('motivo', e.target.value)} value={nuevaCita.motivo}/>
                    </div>
                    <button type="button" onClick={verificarExistenciaCita}>Crear Nueva Cita</button>
                </form>
            </div>
        </div>
    );
}

export default Reserva;