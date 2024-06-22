import './stylesheets/Reserva.css';
import React, { useState, useEffect } from 'react';
import RegistroUsuario from './RegistroUsuario';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';

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

  const [userRegister, setUserRegister] = useState(false);
  const [opcionesEquipo, setOpcionesEquipo] = useState([]);
  const [opcionesHora, setOpcionesHora] = useState([]);
  const [displayModal, setDisplayModal] = useState(false);
  
  const setFlag = (value)=>{
    setUserRegister(value);
    setDisplayModal(false);
  }

  const handleNuevaCitaChange = (campo, valor) => {
    let valorAAlmacenar = valor;

    if (campo === 'examen') {
      valorAAlmacenar = parseInt(valor, 10);

      switch (valor) {
        case '1': // Radiografía
          setOpcionesHora(['08:30', '08:45', '09:00', '09:15', '09:30', '09:45', '10:00', '10:15', '10:30', '10:45', '11:00', '11:15', '11:30', '11:45', '12:00', '12:15', '12:30', '12:45', '14:00', '14:15', '14:30', '14:45', '15:00', '15:15', '15:30', '15:45', '16:00']);
          setOpcionesEquipo([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
          break;
        case '2': // Ecografía
          setOpcionesHora(['08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '14:00', '14:30', '15:00', '15:30', '16:00']);
          setOpcionesEquipo([1, 2, 3, 4, 5]);
          break;
        case '3': // Resonancia Magnética
          setOpcionesHora(['08:30', '09:30', '10:30', '11:30', '14:00', '15:00', '16:00']);
          setOpcionesEquipo([1, 2, 3]);
          break;
        case '4': // Scanner
          setOpcionesHora(['08:30', '09:15', '10:00', '10:45', '11:30', '12:15', '14:00', '14:45', '15:30', '16:00']);
          setOpcionesEquipo([1, 2, 3]);
          break;

        default:
          setOpcionesHora([]);
          setOpcionesEquipo([]);
          break;
      }
    }

    if (campo === 'paciente'){
      setDisplayModal(false);
    }

    setNuevaCita((prevNuevaCita) => ({ ...prevNuevaCita, [campo]: valorAAlmacenar }));
  };

  const verificarExistenciaCita = async (event) => {
    event.preventDefault(); // Evita que el formulario recargue la página
    try {
      console.log(nuevaCita.examen);
      const response = await fetch(`http://localhost:5000/Citas/${nuevaCita.examen}/${nuevaCita.fecha}/${nuevaCita.hora}/${parseInt(nuevaCita.equipo, 10)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
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

        const response = await fetch('http://localhost:5000/Citas/crear', {
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

  const handleUser = async (e)=>{
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/Persona/${nuevaCita.paciente}`, {
        method: "GET",
        headers: {
          "Content-Type" : "application/json",
        }
      });

      const data = await response.json();

      if (data.existe) {
        setUserRegister(true);
      } else {
        alert("El paciente no está registrado. Ingresa sus datos.")
        setUserRegister(false);
        setDisplayModal(true);
      }
    } catch(e) {
      console.error(e);
    }
    
  }

  return (
    <div className='reserva-main-container'>
      <div className='reserva-second-container'>
        <h2>Crear Nueva Cita</h2>
        <form className='form-reserva'>
          <div className='reserva-espaciado'>
            <label className='reserva-espaciado'>Rut del paciente:</label>
            <input className='reserva-input' type="text" name="paciente" onChange={(e) => handleNuevaCitaChange('paciente', e.target.value)} value={nuevaCita.paciente}/>
            <button onClick={handleUser} className='confirm_paciente_button'>Confirmar paciente</button>
          </div>
          
          {userRegister && (
            <>
              <div className='reserva-espaciado'>
                <label className='reserva-espaciado'>Doctor:</label>
                <select className='reserva-input' name="doctor" onChange={(e) => handleNuevaCitaChange('doctor', e.target.value)} value={nuevaCita.doctor}>
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

              <div className='reserva-espaciado'>
                <label className='reserva-espaciado'>Examen:</label>
                <select className='reserva-input' name="examen" onChange={(e) => handleNuevaCitaChange('examen', e.target.value)} value={nuevaCita.examen}>
                  <option value="" disabled selected>Selecciona un examen</option>
                  <option value="1">Radiografía</option>
                  <option value="2">Ecografía</option>
                  <option value="3">Resonancia Magnética</option>
                  <option value="4">Scanner</option>
                </select>
              </div>

              <div className='reserva-espaciado'>
                <label className='reserva-espaciado'>Fecha:</label>
                <input className='reserva-input' type="date" name="fecha" onChange={(e) => handleNuevaCitaChange('fecha', e.target.value)} value={nuevaCita.fecha}/>
              </div>

              <div className='reserva-espaciado'>
                <label>Hora:</label>
                  <select className='reserva-input' name="hora" onChange={(e) => handleNuevaCitaChange('hora', e.target.value)} value={nuevaCita.hora}>
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

              <div className='reserva-espaciado'>
                <label>Equipo:</label>
                <select className='reserva-input' name="equipo" onChange={(e) => handleNuevaCitaChange('equipo', e.target.value)} value={nuevaCita.equipo}>
                  <option value="" disabled selected>Seleccione un equipo</option>
                  {opcionesEquipo.map((opcion) => (
                    <option key={opcion} value={opcion}>
                      {opcion}
                    </option>
                  ))}
                </select>
              </div>

              <div className='reserva-espaciado'>
                <label className='reserva-espaciado'>Observaciones:</label>
                <input className='reserva-input' type="text" name="motivo" onChange={(e) => handleNuevaCitaChange('motivo', e.target.value)} value={nuevaCita.motivo}/>
              </div>

              <button type="button" className="button-form-reserva" onClick={verificarExistenciaCita}>Crear Nueva Cita</button>
            </>
          )}
        </form>
      </div>
      {displayModal && (
        <div className='modal'>
          <FontAwesomeIcon className='reserva_close-txt' icon={faCircleXmark} onClick={() => setDisplayModal(false)} />
          <div className='reserva_modal-block'>
            <div className='modal-titulo'>Crear paciente</div>
            <RegistroUsuario rut={nuevaCita.paciente} setFlag={setFlag}/>
          </div>
        </div>
      )}
    </div>
  );
}

export default Reserva;
