import React, { Component } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // ✅ Import nombrado

class LoginUsuario extends Component {
  constructor(props) {
    super(props);
    this.state = {
      User: "",
      Password: "",
      mensaje: "",
      error: "",
    };
  }

  componentDidMount() {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode(token); // ✅ uso correcto
        const ahora = Date.now() / 1000;
        if (decoded.exp > ahora) {
          console.log("Token válido al montar componente:", decoded);
          window.location.href = "/inicio";
        } else {
          console.log("Token expirado, borrando token");
          localStorage.removeItem("token");
        }
      } catch (err) {
        console.log("Token inválido, borrando token", err);
        localStorage.removeItem("token");
      }
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { User, Password } = this.state;

    try {
      const response = await axios.post("http://localhost:3000/api/usuario/login", {
        User,
        Password,
      });

      const token = response.data.token;
      localStorage.setItem("token", token);

      // ✅ Decodificar token
      const decoded = jwtDecode(token);
      console.log("Token recibido y decodificado:", decoded);

      window.location.href = "/inicio";
    } catch (err) {
      console.error("Error de login:", err.response || err.message);
      this.setState({
        error: err.response?.data || "Error al iniciar sesión",
        mensaje: "",
      });
    }
  };

  render() {
    const { User, Password, mensaje, error } = this.state;

    return (
      <div>
        <h2>Login de Usuario</h2>
        {mensaje && <p style={{ color: "green" }}>{mensaje}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Usuario:</label>
            <input
              type="text"
              name="User"
              value={User}
              onChange={this.handleChange}
              required
            />
          </div>
          <div>
            <label>Contraseña:</label>
            <input
              type="password"
              name="Password"
              value={Password}
              onChange={this.handleChange}
              required
            />
          </div>
          <button type="submit">Iniciar Sesión</button>
        </form>
        <p>
          No tenes cuenta? <a href="/registro">Registrarme</a>
        </p>
      </div>
    );
  }
}

export default LoginUsuario;