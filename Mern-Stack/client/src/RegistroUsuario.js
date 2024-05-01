import React, { useState, useEffect } from 'react';
import './stylesheets/RegistroUsuario.css';

function RegistroUsuario ({ rut, setFlag }) {
  const [nombre, setNombre] = useState("");
  const [fecha, setFecha] = useState("");
  const [alergia, setAlergia] = useState("");
  const [dir, setDir] = useState("");
  const [tel, setTel] = useState("");
  const [fon, setFon] = useState("");

  const handleRegister = async (e)=>{
    e.preventDefault();
    try {
      if (
        nombre && 
        tel &&
        fecha &&
        alergia &&
        dir &&
        fon
      ) {
        const response = await fetch(`http://localhost:5000/Persona/crear`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            rut: rut,
            nombre: nombre,
            telefono: tel,
            fecha: fecha,
            alergia: alergia,
            direccion: dir,
            fonasa: fon,
            personal: false
          }),
        });

        if (!response.ok) {
          throw new Error(`Error al crear el paciente: ${response.status} - ${response.statusText}`);
        }

        const pacienteCreado = await response.json();
        console.log('Paciente creado:', pacienteCreado);
        alert("Paciente creado exitosamente.");
        setFlag(true);
      } else {
        alert("Ingresa todos los campos");
      }
      
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className='register-container'>
      <div> Rut del paciente: {rut} </div>
      <form className='form-registro'>
        <div>
          <label>Nombre paciente: </label>
          <input type="text" onChange={(e) => {setNombre(e.target.value)}}></input>
        </div>

        <div>
          <label>Fecha de nacimiento: </label>
          <input type="date" onChange={(e) => {setFecha(e.target.value)}}></input>
        </div>

        <div>
          <label>Alergias: </label>
          <input type="text" onChange={(e) => {setAlergia(e.target.value)}}></input>
        </div>

        <div>
          <label>Dirección: </label>
          <input type="text" onChange={(e) => {setDir(e.target.value)}}></input>
        </div>

        <div>
          <label>Teléfono: </label>
          <input type="text" onChange={(e) => {setTel(e.target.value)}}></input>
        </div>

        <div>
          <label>Fonasa: </label>
          <input type="text" onChange={(e) => {setFon(e.target.value)}}></input>
        </div>

        <button onClick={handleRegister}>Registrar paciente</button>
      </form>
    </div>
  );
}

export default RegistroUsuario;