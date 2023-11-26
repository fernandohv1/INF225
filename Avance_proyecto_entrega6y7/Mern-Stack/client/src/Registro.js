import React, { useState, useEffect } from 'react';

const CitaMedica = ({ cita, onModificar, rut, busqueda }) => {

  /*
  const fechaServidor = new Date(cita.fecha);
  // Obtener día, mes y año
  const dia = fechaServidor.getDate();
  const mes = fechaServidor.getMonth() + 1; 
  const año = fechaServidor.getFullYear();

  // Obtener hora y minutos con dos dígitos
  const hora = fechaServidor.getHours().toString().padStart(2, '0');
  const minutos = fechaServidor.getMinutes().toString().padStart(2, '0');*/

  // Cortar los componentes de la fecha
  const año = busqueda.fecha.substring(0, 4);
  const mes = busqueda.fecha.substring(5, 7);
  const dia = busqueda.fecha.substring(8, 10);

  // Formatear fecha y hora como strings
  const fechaFormateada = `${dia}-${mes}-${año}`;
  //const horaFormateada = `${hora}:${minutos}`;

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

  const obtenerNombreExamen = (idex) => {
    switch (idex) {
        case 1:
            return 'Radiografía';
        case 2:
            return 'Ecografía';
        case 3:
            return 'Resonancia Magnética';
        case 4:
            return 'Scanner';
        default:
            return 'Tipo de examen desconocido';
    }
  };

  const obtenerNombreMedico = (idmedico) => {
    switch (idmedico) {
        case "1":
            return 'Dr. JAN DAVID JORQUERA CONTRERAS';
        case "2":
            return 'Dr. MATIAS ISRAEL VILLAVERDE POBLETE';
        case "3":
            return 'Dr. NICOLÁS SCHIAFFINO MELLADO';
        case "4":
            return 'Dr. JUAN CARLOS RODRÍGUEZ LÓPEZ';
        case "5":
            return 'Dr. ANA SOFÍA MARTÍNEZ RAMÍREZ';
        case "6":
            return 'Dr. LUIS ALBERTO HERRERA CASTILLO';
        case "7":
            return 'Dr. JOSE LINO CONTRERAS VÉLIZ';
        default:
            return 'Dr. No identificado';
    }
  };

  const handleModificar = () => {
    if (nuevaCita.fecha &&
      nuevaCita.hora &&
      nuevaCita.paciente &&
      nuevaCita.examen &&
      nuevaCita.motivo &&
      nuevaCita.doctor &&
      nuevaCita.equipo)
    {
      onModificar(
        cita._id,
        nuevaCita.fecha,
        nuevaCita.hora,
        nuevaCita.paciente,
        nuevaCita.examen,
        nuevaCita.motivo,
        nuevaCita.doctor,
        nuevaCita.equipo,
        rut
      );
    } else {
      alert("Por favor, complete todos los campos");
    }
  };

  return (
    <div className="cita-medica">
      <div>
        <h2>Modificar cita</h2>
        <div>
          <h3>Datos actuales</h3>
            <p>Rut del paciente: {cita.rutp}</p>
            <p>Doctor: {obtenerNombreMedico(cita.idmedico)}</p>
            <p>Examen: {obtenerNombreExamen(cita.idex)}</p>
            <p>Fecha: {fechaFormateada}</p>
            <p>Hora: {busqueda.hora}</p>
            <p>Equipo: {cita.equipo}</p>
            <p>Observacion: {cita.motivo}</p>
        </div>
        <div>
          <h3>Nuevos datos</h3>
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
              <button type="button" onClick={handleModificar}>Modificar cita</button>
          </form>
          </div>
      </div>
    </div>
  );
};


function Registro({ rut }) {
  const [citasFiltradas, setCitasFiltradas] = useState(null);
  const [intervalosHora, setIntervalos] = useState(['08:30', '09:00', '09:30', '10:00','10:30','11:00','11:30','12:00', '12:30',
  '14:00', '14:30','15:00','15:30', '16:00']);

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
        fecha: nuevaFecha,
        hora: nuevaHora,
        rutp: nuevoRut,
        idex: nuevoExamen,
        motivo: nuevoMotivo,
        idmedico: nuevoIdMedico,
        equipo: nuevoEquipo,
        rutm: rut,
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
      setBusqueda({rut: nuevoRut, fecha: nuevaFecha, hora: nuevaHora});
      handleBuscar1();
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const handleBuscar1 = async () => {
    try {
      if ( 
        busqueda.fecha &&
        busqueda.hora &&
        busqueda.rut
      ) {
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
      } else {
        alert("Por favor, complete todos los campos");
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const handleBuscar = async (e) => {
    e.preventDefault();
  
    try {
      if ( 
        busqueda.fecha &&
        busqueda.hora &&
        busqueda.rut
      ) {
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
      } else {
        alert("Por favor, complete todos los campos");
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
        {/*
        <input
          type="time"
          name="hora"
          value={busqueda.hora}
          onChange={(e) => handleBusquedaChange('hora', e.target.value)}
        />*/}

        <select
          name="hora"
          onChange={(e) => handleBusquedaChange('hora', e.target.value)}
          value={busqueda.hora}
        >
          <option value="" disabled>
            Selecciona una hora
          </option>
          {intervalosHora.map((hora) => (
            <option key={hora} value={hora}>
              {hora}
            </option>
          ))}
        </select>

        

        <button type="submit">Buscar</button>
      </form>
      <div className="citas-container">
        {citasFiltradas !== null && citasFiltradas.length > 0 ? (
          citasFiltradas.map((cita) => (
            <CitaMedica key={cita._id} cita={cita} onModificar={modificarCita} rut={rut} busqueda={busqueda}/>
          ))
        ) : (
          <p>No se encontraron citas.</p>
        )}
      </div>
    </div>
  );
}

export default Registro;