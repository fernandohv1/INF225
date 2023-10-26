import logo from './logo.svg';
import './App.css';

function App() {
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
    
    /*
    <div>
      <div className="Titulo">
        <h1>Citas Hospital</h1>
      </div>

      <div className="App">
        <h1>Indique lo que desee hacer</h1>
        <button id="Reserva">Reservar horas</button>
        <script>
          document.getElementById("redireccionar").addEventListener("click", function() { window.location.href = "Reserva.js";});
        </script>
        <button>Modificar horas</button>
      </div>
    </div>*/
  );
}

export default App;
