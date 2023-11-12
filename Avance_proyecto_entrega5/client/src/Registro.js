import React, { useState, useEffect } from 'react';

const CitaMedica = ({ cita, onModificar, rut }) => {
  const fechaServidor = new Date(cita.fecha);
  // Obtener día, mes y año
  const dia = fechaServidor.getDate();
  const mes = fechaServidor.getMonth() + 1; 
  const año = fechaServidor.getFullYear();

  // Obtener hora y minutos con dos dígitos
  const hora = fechaServidor.getHours().toString().padStart(2, '0');
  const minutos = fechaServidor.getMinutes().toString().padStart(2, '0');

  // Formatear fecha y hora como strings
  const fechaFormateada = `${dia}-${mes}-${año}`;
  const horaFormateada = `${hora}:${minutos}`;

  const [nuevaHora, setNuevaHora] = useState("");
  const [nuevaFecha, setNuevaFecha] = useState("");
  const [nuevoRut, setNuevoRut] = useState("");
  const [nuevoExamen, setNuevoExamen] = useState("");
  const [nuevoMotivo, setNuevoMotivo] = useState("");
  const [nuevoDoctor, setNuevoDoctor] = useState("");
  const [nuevoEquipo, setNuevoEquipo] = useState("");
  

  const handleModificar = () => {
    onModificar(
      cita._id,
      nuevaFecha,
      nuevaHora,
      nuevoRut,
      nuevoExamen,
      nuevoMotivo,
      nuevoDoctor,
      nuevoEquipo,
      rut
    );
  };

  return (
    <div className="cita-medica">
      
      <h2>Resultados de su búsqueda</h2>
      <h2>{cita.paciente}</h2>
      <p>Doctor: {cita.idmedico}</p>
      <input
        type="text"
        value={nuevoDoctor}
        onChange={(e) => setNuevoDoctor(e.target.value)}
      />

      <p>Fecha: {fechaFormateada}</p>
      <input
        type="date"
        value={nuevaFecha}
        onChange={(e) => setNuevaFecha(e.target.value)}
      />

      <p>Hora: {horaFormateada}</p>
      <input
        type="time"
        value={nuevaHora}
        onChange={(e) => setNuevaHora(e.target.value)}
      />

      <p>Rut del paciente: {cita.rutp}</p>
      <input
        type="text"
        placeholder="Nuevo rut"
        value={nuevoRut}
        onChange={(e) => setNuevoRut(e.target.value)}
      />

      <p>Equipo: {cita.equipo}</p>
      <input
        type="number"
        value={nuevoEquipo}
        onChange={(e) => setNuevoEquipo(e.target.value)}
      />

      <p>Examen: {cita.idex}</p>
      <input
        type="text"
        placeholder="Nuevo examen"
        value={nuevoExamen}
        onChange={(e) => setNuevoExamen(e.target.value)}
      />

      <p>Observaciones: {cita.motivo}</p>
      <input
        type="text"
        placeholder="Nuevas observaciones"
        value={nuevoMotivo}
        onChange={(e) => setNuevoMotivo(e.target.value)}
      />
      <button onClick={handleModificar}>Modificar</button>
    </div>
  );
};


function Registro({ rut }) {
  const [citasFiltradas, setCitasFiltradas] = useState(null);

  const [busqueda, setBusqueda] = useState({
    rut: '',
    fecha: '',
    hora: '',
  });

  const handleBusquedaChange = (campo, valor) => {
    setBusqueda((prevBusqueda) => ({ ...prevBusqueda, [campo]: valor }));
  };

  const modificarCita = async (id, nuevaFecha, nuevaHora, nuevoRut, nuevoExamen, nuevoMotivo, nuevoIdMedico, nuevoEquipo, rut) => {
    try {
      const nuevaFechaHora = new Date(`${nuevaFecha}T${nuevaHora}`);
      
      const url = `http://localhost:5000/Citaup/${id}`;  // Agregar el id a la URL
      console.log('URL de la solicitud:', url);
  
      const requestBody = {
        fecha: nuevaFechaHora,
        nuevoRut: nuevoRut,
        nuevoExamen: nuevoExamen,
        nuevoMotivo: nuevoMotivo,
        nuevoIdMedico: nuevoIdMedico,
        nuevoEquipo: nuevoEquipo,
        nuevoRutm: rut,
      };
  
      console.log('Cuerpo de la solicitud:', requestBody);
  
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
  
      if (!response.ok) {
        throw new Error(`Error al actualizar la cita: ${response.statusText}`);
      }
  
      const citaActualizada = await response.json();
      console.log('Cita actualizada:', citaActualizada);
      alert("Modificación realizada exitosamente.");
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const handleBuscar = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:5000/Citaf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(busqueda),
      });
  
      if (!response.ok) {
        throw new Error('Error al buscar citas');
      }
  
      const resultado = await response.json();

      if (resultado === false) {
        console.log('No se encontraron citas.');
        setCitasFiltradas(null);
      } else {
        console.log('Citas filtradas:', resultado);
        setCitasFiltradas(resultado);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <div className="position">
      <h2>Indique el rut del paciente, fecha y hora de la cita que desea modificar.</h2>
      <form onSubmit={handleBuscar}>
        <label>Rut</label>
        <input
          type="text"
          name="rut"
          value={busqueda.rut}
          onChange={(e) => handleBusquedaChange('rut', e.target.value)}
        />

        <label>Fecha</label>
        <input
          type="date"
          name="fecha"
          value={busqueda.fecha}
          onChange={(e) => handleBusquedaChange('fecha', e.target.value)}
        />

        <label>Hora</label>
        <input
          type="time"
          name="hora"
          value={busqueda.hora}
          onChange={(e) => handleBusquedaChange('hora', e.target.value)}
        />

        <button type="submit">Buscar</button>
      </form>
      <div className="citas-container">
        {citasFiltradas !== null && citasFiltradas.length > 0 ? (
          citasFiltradas.map((cita) => (
            <CitaMedica key={cita._id} cita={cita} onModificar={modificarCita} rut={rut} />
          ))
        ) : (
          <p>No se encontraron citas.</p>
        )}
      </div>
    </div>
  );
}

export default Registro;