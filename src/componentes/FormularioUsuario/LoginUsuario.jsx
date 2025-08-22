// LoginUsuario.jsx
import React, { Component } from "react";
import axios from "axios";

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

      // Guardar token en localStorage
      localStorage.setItem("token", response.data.token);

      this.setState({ mensaje: response.data.mensaje, error: "" });

      // Redirigir a /inicio
      window.location.href = "/inicio";
    } catch (err) {
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
      </div>
    );
  }
}

export default LoginUsuario;