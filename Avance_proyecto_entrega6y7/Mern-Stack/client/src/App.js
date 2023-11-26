import hospital from './hospital.jpg';
import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Link, Route, Routes} from 'react-router-dom';

import Reserva from './Reserva';
import Registro from './Registro';
import Agenda from './Agenda';

function App() {
  
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegistroForm, setShowRegistroForm] = useState(false);
  const [isLoged, setisLoged] = useState(false);
  const [showButtons, setButtons] = useState(true);
  const [reservaRenderizado, setReservaRenderizado] = useState(false);
  const [registroRenderizado, setRegistroRenderizado] = useState(false);
  const [agendaRenderizada, setAgendaRenderizada] = useState(false);
  const [formulario, setFormulario] = useState({
    rut: '',
    nombre: '',
    telefono: '',
    clave: ''
  });
  const [formularioL, setFormularioL] = useState({
    rut: '',
    clave: ''
  });

  const handleLoginClick = () => {
    setShowLoginForm(true);
    setButtons(false);
  };

  const handleRegistroClick = () => {
    setShowRegistroForm(true);
    setButtons(false);
  };

  const handleLogoutClick = () => {
    setShowLoginForm(false);
    setShowRegistroForm(false);
    setButtons(true);
    setisLoged(false);
    setReservaRenderizado(false);
    setRegistroRenderizado(false);
    setAgendaRenderizada(false);
    setFormulario({
      ...formulario,
      rut: '',
      nombre: '',
      telefono: '',
      clave: ''
    });

    setFormularioL({
      ...formularioL,
      rut: '',
      clave: ''
    });
  };

  const handleLogin = async (event) => {
    event.preventDefault(); // Evita que el formulario recargue la página
    const User = {
      rut: formularioL.rut,
      clave: formularioL.clave
    }

    const response = await fetch('http://localhost:5000/Veruser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ rut: User.rut, clave: User.clave }),
    });

    const data = await response.json(); // Parsea la respuesta como JSON

    if (data.success) {
      // El RUT y la clave son válidos
      alert("Inicio de sesión exitoso.");
      setisLoged(true);
    } else {
      // El RUT y la clave no coinciden
      alert("Credenciales incorrectas.");
    }
  };

  const handleVerificarExistencia = async (event) => {
    event.preventDefault(); // Evita que el formulario recargue la página
    try {
      console.log(formulario);
      const response = await fetch("http://localhost:5000/Userver", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Ajusta el tipo de contenido según sea necesario
          // Puedes agregar más encabezados si es necesario
        },
        body: JSON.stringify(formulario), // Convierte el objeto a formato JSON
      });

      if (!response.ok) {
        throw new Error(`Error al verificar existencia del Rut: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      if (!data.existe) {
        handleRegistro();
      } else {
        alert("No puedes volver a crear un usuario que ya ha sido creado")
      }
    } catch (error) {
      console.error('Error al verificar existencia del Rut:', error.message);
    }
  };

  const handleRegistro = () => {
    const nuevaPersona = {
      rut: formulario.rut,
      nombre: formulario.nombre,
      telefono: formulario.telefono,
      personal: true,
    };

    const nuevoUsuario = {
      rut: formulario.rut,
      clave: formulario.clave
    }

    fetch("http://localhost:5000/NPersona", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nuevaPersona),
    })
      .then((response)=>{
        if (!response.ok){
          throw new Error("No se pudo completar la solicitud");
        }
      })
      .catch((error)=>{
        console.error(error);
      });
  
    fetch("http://localhost:5000/NUsuario", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nuevoUsuario),
    })
      .then((response)=>{
        if (!response.ok){
          throw new Error("No se pudo completar la solicitud");
        } else {
          alert('Registro exitoso');
          setisLoged(true);
        }
      })
      .catch((error)=>{
        console.error(error);
      });
  };

  const handleChange = (event) => {
    // Actualiza el estado del formulario cuando se ingresan datos
    const { name, value } = event.target;
    setFormulario({
      ...formulario,
      [name]: value,
    });
  };

  const handleChangeL = (event) => {
    // Actualiza el estado del formulario cuando se ingresan datos
    const { name, value } = event.target;
    setFormularioL({
      ...formularioL,
      [name]: value,
    });
  };

  return (
    <Router>
      <div>
        {!isLoged ? (
          <div className="texto-centrado">
            <div>
              {showButtons && (
              <div>
                <button onClick={handleLoginClick}>Login</button>
                <button onClick={handleRegistroClick}>Registro</button>
              </div>)}

              {showLoginForm && (
                <div>
                  <div className="position">
                    <h1>Iniciar Sesión</h1>
                    <form onSubmit={handleLogin}>
                      <div className="form-group">
                        <label>Rut:</label>
                        <input type="text" name="rut" onChange={handleChangeL} value={formularioL.rut}/>
                      </div>
                      <div className="form-group">
                        <label>Contraseña:</label>
                        <input type="password" name="clave" onChange={handleChangeL} value={formularioL.clave}/>
                      </div>
                      <button type="submit">Iniciar Sesión</button>
                    </form>
                    <button onClick={handleLogoutClick}>Volver al inicio</button>
                  </div>
                </div>
              )}

              {showRegistroForm && (
                <div>
                  <div className="position">
                    <h1>Registrarse</h1>
                    <form onSubmit={handleVerificarExistencia}>
                      <div className="form-group">
                        <label>Rut:</label>
                        <input type="text" name="rut" onChange={handleChange} value={formulario.rut} />
                      </div>
                      <div className="form-group">
                        <label>Nombre:</label>
                        <input type="text" name="nombre" onChange={handleChange} value={formulario.nombre} />
                      </div>
                      <div className="form-group">
                        <label>Teléfono (opcional):</label>
                        <input type="text" name="telefono" onChange={handleChange} value={formulario.telefono} />
                      </div>
                      <div className="form-group">
                        <label>Clave:</label>
                        <input type="password" name="clave" onChange={handleChange} value={formulario.clave}/>
                      </div>
                      <button type="submit">Registrarse</button>
                    </form>
                    <button onClick={handleLogoutClick}>Volver al inicio</button>
                  </div>
                </div>
              )}

            </div>
          </div>
        ) : (
          <div>
            <div className="corner">
              <button onClick={handleLogoutClick}>Cerrar sesión</button>
            </div>

            <div className="PosIm">
              <img src={hospital} alt="hospital" className="imagen" />
            </div>

            <div className="Titulo">
              <h1>Citas Hospital</h1>
            </div>

            <div className="texto">
              <h1>Indique lo que desee hacer</h1>
              <li>
                <Link to="/Reserva" onClick={() => setReservaRenderizado(true)}>Reservar hora</Link>
              </li>
              <li>
                <Link to="/Registro" onClick={() => setRegistroRenderizado(true)}>Modificar horas</Link>
              </li>
              <li>
                <Link to="/Agenda" onClick={() => setAgendaRenderizada(true)}>Visualizar horas</Link>
              </li>
            </div>
          </div>
        )}

      <Routes>
        <Route path="/Reserva" element={reservaRenderizado ? <Reserva rut={formularioL.rut || formulario.rut} /> : null} />
        <Route path="/Registro" element={registroRenderizado ? <Registro rut={formularioL.rut || formulario.rut} /> : null} />
        <Route path="/Agenda" element={agendaRenderizada ? <Agenda /> : null} />
      </Routes>

      </div>
    </Router>
  );
}

export default App;