import React, { useState } from 'react';
import "./stylesheets/CitasPendientes.css";

function CitasPendientes() {
  const [rutIngresado, setRutIngresado] = useState("");
  const [citasFiltradas, setCitasFiltradas] = useState(null);
  const [rutPaciente, setRutPaciente] = useState("");

  const handleRutChange = e => {
    setRutIngresado(e.target.value);
  };

  const getExamen = id => {
    switch (id) {
      case 1:
        return "Radiografía";
      case 2:
        return "Ecografía";
      case 3:
        return "Scanner";
      case 4:
        return "Resonancia Magnética";
      default:
        return "";
    }
  };

  const handleSearch = async e => {
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
        console.error(e);
      }
    }
  };

  return (
    <div className="container">
      <h1>Ingrese el RUT del Paciente</h1>
      <form className='citaspendientes-form'>
        <input type="text" onChange={handleRutChange} placeholder="RUT" />
        <input type="button" onClick={handleSearch} className="button-citas" value="Buscar" />
      </form>
      {
        citasFiltradas != null ? (
          <div className='main-cita-container'>
            <div className="titulo-citas">Citas de {rutPaciente}</div>
            {citasFiltradas.map(cita => {

              // Crear un objeto Date a partir de la cadena de fecha en la cita
              const fechaCompleta = new Date(cita.fecha);

              // Obtener día, mes y año en formato UTC
              const dia = fechaCompleta.getUTCDate();
              const mes = fechaCompleta.getUTCMonth() + 1;
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
                  <div><strong>Examen:</strong> {getExamen(cita.idex)}</div>
                  <div><strong>Motivo:</strong> {cita.motivo}</div>
                  <div><strong>Fecha:</strong> {nuevaFecha}</div>
                  <div><strong>Hora:</strong> {nuevaHora}</div>
                  <div><strong>Id Equipo:</strong> {cita.equipo}</div>
                </div>
              );
            })}
          </div>
        ) : (
          <></>
        )
      }
    </div>
  );
}

export default CitasPendientes;
