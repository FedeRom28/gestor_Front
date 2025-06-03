import React, { Component } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import "./RegistroUsuario.css";

class LoginUsuario extends Component {
  constructor(props) {
    super(props);
    this.state = {
      User: "",
      Password: "",
      mensaje: "",
      error: false,
      redirect: false,
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { User, Password } = this.state;

    try {
      const res = await axios.post("http://localhost:3000/api/usuario/login", {
        User,
        Password,
      });

      localStorage.setItem("token", res.data.token);

      this.setState({
        mensaje: "Inicio de sesión exitoso",
        error: false,
        redirect: true,
      });
    } catch (err) {
      const mensaje =
        err.response?.data || "Error de red o servidor";
      this.setState({
        mensaje: `Error: ${mensaje}`,
        error: true,
      });
    }
  };

  render() {
    const { User, Password, mensaje, error, redirect } = this.state;

    if (redirect) {
      return <Navigate to="/home" replace />;
    }

    return (
      <div className="container">
        <h2 className="heading">Iniciar Sesión</h2>
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
          <button type="submit" className="button">Ingresar</button>
        </form>

        {mensaje && (
          <p className={error ? "message-error" : "message-success"}>
            {mensaje}
          </p>
        )}

        <p>
          ¿No tenés cuenta? <Link to="/registro">Registrarse</Link>
        </p>
      </div>
    );
  }
}

export default LoginUsuario;