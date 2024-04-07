import React, { useState } from 'react';
import "./stylesheets/CitasPendientes.css";

function CitasPendientes () {
  const [rutIngresado, setRutIngresado] = useState("");
  const [citasFiltradas, setCitasFiltradas] = useState(null);
  const [rutPaciente, setRutPaciente] = useState("");

  const handleRutChange = e => {
    setRutIngresado(e.target.value)
  }

  const getExamen = id => {
    switch (id) {
      case 1: // Radiografía
        return "Radiografía";
      case 2: // Ecografía
        return "Ecografía";
      case 3: // Scanner
        return "Scanner";
      case 4: // Resonancia Magnética
        return "Resonancia Magnética";
      default:
        return "";
    }
  }

  const handleSearch = async e =>{
    e.preventDefault();

    if (rutIngresado !== "") {
      try {
        const d = new Date();
        const response = await fetch(`http://localhost:5000/Citas/${rutIngresado}/${d}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          }
        });

        const data = await response.json();
        setRutPaciente(rutIngresado);
        setCitasFiltradas(data);

      } catch (e) {
        console.error(e)
      }
    }
  }

  return (
    <div>
      <h1>Ingrese el rut del paciente</h1>
      <form>
        <input type="text" onChange={handleRutChange}/>
        <input type="button" onClick={handleSearch} value="Buscar"/>
      </form>
      {
        citasFiltradas != null ? (
          <div className='main-cita-container'>
            <div className="titulo-citas">Citas de {rutPaciente}</div>
            { citasFiltradas.map( cita => {
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
                <div className="cita-container">
                  <div>Examen: {getExamen(cita.idex)}</div>
                  <div>Motivo: {cita.motivo}</div>
                  <div>Fecha: {nuevaFecha}</div>
                  <div>Hora: {nuevaHora}</div>
                  <div>Id Equipo: {cita.equipo}</div>
                </div>
              )
              }) 
            }
          </div>
        ) : (
          <></>
        )
      }
    </div>
  );
}

export default CitasPendientes;