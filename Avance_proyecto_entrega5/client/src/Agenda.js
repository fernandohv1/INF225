import React, { useState } from 'react';
import './Agenda.css';

function Agenda2() {
  const [selectedDate, setSelectedDate] = useState('');
  const [citasForSelectedDate, setCitasForSelectedDate] = useState([]);
  
  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleSearch = () => {
    buscarCitasPorFecha(selectedDate);
  };

  const buscarCitasPorFecha = async (fecha) => {
    try {
      const response = await fetch(`http://localhost:5000/Citafind/${fecha}`);

      // Verifica si la respuesta es exitosa (código 200)
      if (response.ok) {
        const citas = await response.json();
        
        console.log('Citas encontradas:', citas);
        setCitasForSelectedDate(citas);
      } else {
        console.error('Error al obtener citas:', response.statusText);
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  };

  return (
    <div className="position">
      <h2>Indica la fecha del día que desea consultar</h2>
      <label>Fecha:</label>
      <input type="date" value={selectedDate} onChange={handleDateChange} />
      <button onClick={handleSearch}>Search</button>

      {/* Display citasForSelectedDate */}
      <div>
        <h2>Citas reservadas o completadas para el dia seleccionado</h2>
        {citasForSelectedDate.length === 0 ? (
          <p>No se encontraron citas</p>
        ) : (
            citasForSelectedDate.map((cita) => {
                // Crear un objeto Date a partir de la cadena de fecha en la cita
                const fechaCompleta = new Date(cita.fecha);

                // Obtener día, mes y año en formato UTC
                const dia = fechaCompleta.getUTCDate();
                const mes = fechaCompleta.getUTCMonth() + 1; // Sumar 1 porque los meses van de 0 a 11
                const ano = fechaCompleta.getUTCFullYear();

                // Formatear la fecha como "dd-mm-yyyy"
                const nuevaFecha = `${dia < 10 ? '0' : ''}${dia}-${mes < 10 ? '0' : ''}${mes}-${ano}`;

                // Obtener la hora y los minutos en formato UTC
                const hora = fechaCompleta.getUTCHours();
                const minutos = fechaCompleta.getUTCMinutes();

                // Formatear la hora como "hh:mm"
                const nuevaHora = `${hora < 10 ? '0' : ''}${hora}:${minutos < 10 ? '0' : ''}${minutos}`;

                return (
                    <div key={cita._id} className="cita-container">
                        <p>Fecha: {nuevaFecha}</p>
                        <p>Paciente: {cita.rutp}</p>
                        <p>Doctor: {cita.idmedico}</p>
                        <p>Hora: {nuevaHora}</p>
                        <p>Tipo examen: {cita.idex}</p>
                        <p>Observaciones: {cita.motivo}</p>
                        <br />
                    </div>
                );
            })
        )}
      </div>
    </div>
  );
}

export default Agenda2;