//import logo from './logo.svg';
import hospital from './hospital.jpg';
import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Link, Route, Routes} from 'react-router-dom';
//import { Link, Routes, Route, BrowserRouter as Router } from 'react-router-dom';
//import { useNavigate } from 'react-router-dom';

import Reserva from './Reserva';
import Registro from './Registro';

function App() {
  /*
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginStatus = (status) => {
    setIsLoggedIn(status); // Actualiza el estado
    console.log('Estado de inicio de sesión:', status);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              {!isLoggedIn ? (
                <div className="texto-centrado">
                  <Link to="/Login">Login</Link>
                  <Link to="/Register">Registrarse</Link>
                </div>
              ) : (
                <div>
                  <Routes>
                    <Route
                      index
                      element={
                        <div>
                          <div className="PosIm">
                            <img src={hospital} alt="hospital" className="imagen" />
                          </div>

                          <div className="Titulo">
                            <h1>Citas Hospital</h1>
                          </div>

                          <div className="texto">
                            <h1>Indique lo que desee hacer</h1>
                            <li><Link to="/Reserva">Reservar horas</Link></li>
                            <li><Link to="/Registro">Modificar horas</Link></li>
                          </div>
                        </div>
                      }
                    />
                    <Route path="/Reserva" element={<Reserva />} />
                    <Route path="/Registro" element={<Registro />} />
                  </Routes>
                </div>
              )}
            </div>
          }
        />
        <Route path="/Login" element={<Login />} />

      </Routes>
    </Router>
  );*/
  
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegistroForm, setShowRegistroForm] = useState(false);
  const [isLoged, setisLoged] = useState(false);
  const [showButtons, setButtons] = useState(true);
  const [reservaRenderizado, setReservaRenderizado] = useState(false);
  const [registroRenderizado, setRegistroRenderizado] = useState(false);

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
  };

  const handleLogin = (event) => {
    event.preventDefault(); // Evita que el formulario recargue la página
    const username = event.target.username.value;
    const password = event.target.password.value;

    if (username === 'u' && password === 'c') {
        alert('Inicio de sesión exitoso');
        setisLoged(true);
    } else {
        alert('Credenciales incorrectas');
    }
  };

  const handleRegistro = (event) => {
    event.preventDefault(); // Evita que el formulario recargue la página
    setisLoged(true);
    alert('Registro exitoso');
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
                <div className="position">
                  <h1>Iniciar Sesión</h1>
                  <form onSubmit={handleLogin}>
                    <div className="form-group">
                      <label>Usuario:</label>
                      <input type="text" name="username" />
                    </div>
                    <div className="form-group">
                      <label>Contraseña:</label>
                      <input type="password" name="password" />
                    </div>
                    <button type="submit">Iniciar Sesión</button>
                  </form>
                </div>
              )}

              {showRegistroForm && (
                <div className="position">
                  <h1>Registrarse</h1>
                  <form onSubmit={handleRegistro}>
                    <div className="form-group">
                      <label>Usuario:</label>
                      <input type="text" name="username" />
                    </div>
                    <div className="form-group">
                      <label>Contraseña:</label>
                      <input type="password" name="password" />
                    </div>
                    <button type="submit">Registrarse</button>
                  </form>
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
            </div>
          </div>
        )}

      <Routes>
        <Route path="/Reserva" element={reservaRenderizado ? <Reserva /> : null} />
        <Route path="/Registro" element={registroRenderizado ? <Registro /> : null} />
      </Routes>

      </div>
    </Router>
  );
  
  /*
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginClicked, setLoginClicked] = useState(false);
  const navigate = useNavigate();

  const handleLoginClick = () => {
    setLoginClicked(true);
    navigate('/Login');
  };

  return (
    <Router>
      <div>
        <div className="texto-centrado">
          {!isLoggedIn && !loginClicked ? (
            <button onClick={handleLoginClick}>Login</button>
          ) : null}
          <Link to="/Register">Registrarse</Link>
        </div>

        <Routes>
          <Route
            path="/Login"
            element={loginClicked && <Login />}
          />
          <Route
            index
            element={
              <div>
                <div className="PosIm">
                  <img src={hospital} alt="hospital" className="imagen" />
                </div>

                <div className="Titulo">
                  <h1>Citas Hospital</h1>
                </div>

                <div className="texto">
                  <h1>Indique lo que desee hacer</h1>
                  <li><Link to="/Reserva">Reservar horas</Link></li>
                  <li><Link to="/Registro">Modificar horas</Link></li>
                </div>
              </div>
            }
          />
          <Route path="/Reserva" element={<Reserva />} />
          <Route path="/Registro" element={<Registro />} />
        </Routes>
      </div>
    </Router>
  );*/


  /*
  return (
    
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>

    <Router>
      <div>
        <div className="Esquina">
        </div>

        <div className="PosIm">
          <img src={hospital} alt="hospital" className="imagen"/>
        </div>

        <div className="Titulo">
          <h1>Citas Hospital</h1>
        </div>
        
        <div className="texto">
          <h1>Indique lo que desee hacer</h1>
          <li><Link to="/Reserva">Reservar horas</Link></li>
          <li><Link to="/Registro">Modificar horas</Link></li>
        </div>

        <Routes>
          <Route path="/Reserva" element={<Reserva />} />
          <Route path="/Registro" element={<Registro />} />
        </Routes>

      </div>
    </Router>
    );*/
}

export default App;



/*
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import Reserva from './Reserva';
import Registro from './Registro';

function App() {
  return (
    <Router>
      <div>
        <div className="Titulo">
          <h1>Citas Hospital</h1>
        </div>
        <div className="App">
          <h1>Indique lo que desee hacer</h1>
          <Link to="/reserva">Reservar horas</Link>
          <Link to="/registro">Modificar horas</Link>
        </div>
        <Switch>
          <Route path="/reserva" component={Reserva} />
          <Route path="/registro" component={Registro} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;*/
