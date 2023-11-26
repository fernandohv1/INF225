import React, { useState } from 'react';

const CitaMedica = ({ cita, onModificar }) => {
  const [nuevaHora, setNuevaHora] = useState(cita.hora);
  const [nuevaFecha, setNuevaFecha] = useState(cita.fecha);
  const [nuevoRut, setNuevoRut] = useState(cita.rut);
  const [nuevoExamen, setNuevoExamen] = useState(cita.examen);
  const [nuevoMotivo, setNuevoMotivo] = useState(cita.motivo);

  const handleModificar = () => {
    onModificar(
      cita.id,
      nuevaHora,
      nuevaFecha,
      nuevoRut,
      nuevoExamen,
      nuevoMotivo
    );
  };

  return (
    <div className="cita-medica">
      <h2>{cita.paciente}</h2>
      <p>Doctor: {cita.doctor}</p>
      <p>Hora: {cita.hora}</p>
      <input
        type="text"
        placeholder="Nueva hora"
        value={nuevaHora}
        onChange={(e) => setNuevaHora(e.target.value)}
      />
      <p>Fecha: {cita.fecha}</p>
      <input
        type="text"
        placeholder="Nueva fecha"
        value={nuevaFecha}
        onChange={(e) => setNuevaFecha(e.target.value)}
      />
      <p>Rut: {cita.rut}</p>
      <input
        type="text"
        placeholder="Nuevo rut"
        value={nuevoRut}
        onChange={(e) => setNuevoRut(e.target.value)}
      />
      <p>Examen: {cita.examen}</p>
      <input
        type="text"
        placeholder="Nuevo examen"
        value={nuevoExamen}
        onChange={(e) => setNuevoExamen(e.target.value)}
      />
      <p>Motivo: {cita.motivo}</p>
      <input
        type="text"
        placeholder="Nuevo motivo"
        value={nuevoMotivo}
        onChange={(e) => setNuevoMotivo(e.target.value)}
      />
      <button onClick={handleModificar}>Modificar</button>
    </div>
  );
};

export default CitaMedica;
