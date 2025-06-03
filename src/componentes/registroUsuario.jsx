import React, { Component } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import "./RegistroUsuario.css";

class RegistroUsuario extends Component {
  constructor(props) {
    super(props);
    this.state = {
      User: "",
      Password: "",
      Nombre: "",
      Apellido: "",
      mensaje: "",
      error: false,
      redirectToLogin: false,
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { User, Password, Nombre, Apellido } = this.state;

    try {
      const res = await axios.post("http://localhost:3000/api/usuario/registro", {
        User,
        Password,
        Nombre,
        Apellido,
      });

      this.setState({
        User: "",
        Password: "",
        Nombre: "",
        Apellido: "",
        mensaje: "Usuario registrado con éxito. Redirigiendo a login...",
        error: false,
        redirectToLogin: true,
      });
    } catch (error) {
      const mensaje =
        error.response?.data || "Error de red o del servidor";
      this.setState({
        mensaje: `Error al registrar: ${mensaje}`,
        error: true,
      });
    }
  };

  render() {
    const { User, Password, Nombre, Apellido, mensaje, error, redirectToLogin } = this.state;

    if (redirectToLogin) {
      return <Navigate to="/login" replace />;
    }

    return (
      <div className="container">
        <h2 className="heading">Registro de Usuario</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label className="label">Usuario:</label>
            <input
              type="text"
              name="User"
              value={User}
              onChange={this.handleChange}
              required
              className="input"
            />
          </div>
          <div className="form-group">
            <label className="label">Contraseña:</label>
            <input
              type="password"
              name="Password"
              value={Password}
              onChange={this.handleChange}
              required
              className="input"
            />
          </div>
          <div className="form-group">
            <label className="label">Nombre:</label>
            <input
              type="text"
              name="Nombre"
              value={Nombre}
              onChange={this.handleChange}
              required
              className="input"
            />
          </div>
          <div className="form-group">
            <label className="label">Apellido:</label>
            <input
              type="text"
              name="Apellido"
              value={Apellido}
              onChange={this.handleChange}
              required
              className="input"
            />
          </div>
          <button type="submit" className="button">Registrarse</button>
        </form>

        {mensaje && (
          <p className={error ? "message-error" : "message-success"}>
            {mensaje}
          </p>
        )}

        <p style={{ marginTop: "20px", textAlign: "center" }}>
          ¿Ya tienes una cuenta?{" "}
          <Link to="/login" style={{ color: "#007bff", textDecoration: "none" }}>
            Iniciar sesión
          </Link>
        </p>
      </div>
    );
  }
}

export default RegistroUsuario;