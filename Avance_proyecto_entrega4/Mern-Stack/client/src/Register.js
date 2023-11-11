import React, { useState } from 'react';
import CitaMedica from './CitaMedica';

function Registro() {
  const [citas, setCitas] = useState([
    {
      id: 1,
      paciente: 'Juanito Perez',
      doctor: 'Dr. Esteban Mujica',
      hora: '10:00 AM',
      fecha: '10-11-23',
      rut: '20911322-3',
      examen: 'neurologico',
      motivo: 'demencia',
    },
  ]);

  const [busqueda, setBusqueda] = useState({
    rut: '',
    fecha: '',
    hora: '',
  });

  const [citasFiltradas, setCitasFiltradas] = useState([]);

  const handleBusquedaChange = (campo, valor) => {
    setBusqueda((prevBusqueda) => ({ ...prevBusqueda, [campo]: valor }));
  };

  const handleBuscar = (e) => {
    e.preventDefault();
    const citasFiltradas = citas.filter((cita) =>
      Object.entries(busqueda).every(
        ([campo, valor]) =>
          valor === '' || cita[campo].toLowerCase().includes(valor.toLowerCase())
      )
    );
  
    setCitasFiltradas(citasFiltradas);
  };

  const modificarCita = (id, nuevaHora, nuevaFecha, nuevoRut, nuevoExamen, nuevoMotivo) => {
    setCitasFiltradas((prevCitas) =>
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
      <form onSubmit={handleBuscar}>
        <div className="buscador">
          <label>Rut</label>
          <input type="text" name="rut" onChange={(e) => handleBusquedaChange('rut', e.target.value)} value={busqueda.rut}/>
          <label>Fecha</label>
          <input type="text" name="fecha" onChange={(e) => handleBusquedaChange('fecha', e.target.value)} value={busqueda.fecha} />
          <label>Hora</label>
          <input type="text" name="hora" onChange={(e) => handleBusquedaChange('hora', e.target.value)} value={busqueda.hora} />
          <button type="submit">Buscar</button>
        </div>
      </form>
      <div className="citas-container">
        {citasFiltradas.length > 0 ? (
          citasFiltradas.map((cita) => (
            <CitaMedica key={cita.id} cita={cita} onModificar={modificarCita} />
          ))
        ) : (
          <p>No se encontraron citas.</p>
        )}
      </div>
    </div>
  );
}

export default Registro;
