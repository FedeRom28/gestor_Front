import React, { Component } from "react";
import axios from "axios";
import Header from "../header";

class RegistroUsuario extends Component {
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
      console.log("Token encontrado:", token);
      window.location.href = "/inicio"; // Redirige si ya hay token
    } else {
      console.log("No hay token en localStorage");
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { User, Password } = this.state;

    if (!User || !Password) {
      this.setState({ error: "Faltan datos", mensaje: "" });
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/usuario/registro",
        { User, Password }
      );

      // Mostramos mensaje de éxito
      this.setState({ mensaje: response.data.mensaje, error: "" });

      // Redirigir a /login después de 1 segundo
      setTimeout(() => {
        window.location.href = "/login";
      }, 1000);

    } catch (err) {
      this.setState({
        error: err.response?.data || "Error al registrar usuario",
        mensaje: "",
      });
    }
  };

  render() {
    const { User, Password, mensaje, error } = this.state;

    return (
      <div>
        <Header /> {/* ✅ Header en la parte superior */}
        <div style={{ padding: "20px" }}>
          <h2>Registro de Usuario</h2>
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
            <button type="submit">Registrarse</button>
          </form>
          <p>
            Ya tenes tu cuenta? <a href="/login">Iniciar sesión</a>
          </p>
        </div>
      </div>
    );
  }
}

export default RegistroUsuario;