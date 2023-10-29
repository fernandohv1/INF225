import './Login.css';
import App from './App';
import { useNavigate } from 'react-router-dom';

function Login(props) { // Agrega "props" como parámetro
    const navigate = useNavigate();
  const handleLogin = (event) => {
    event.preventDefault(); // Evita que el formulario recargue la página
    const username = event.target.username.value;
    const password = event.target.password.value;

    if (username === 'u' && password === 'c') {
        alert('Inicio de sesión exitoso');
        navigate('/App'); // Redirige al usuario a la ruta '/menu'
    } else {
        alert('Credenciales incorrectas');
    }
  };

  return (
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
  );
}

export default Login;