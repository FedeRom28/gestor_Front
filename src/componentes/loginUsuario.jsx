import React, { Component } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
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
      const res = await fetch("http://localhost:3000/api/usuario/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ User, Password }),
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("token", data.token);
        this.setState({
          mensaje: "Inicio de sesión exitoso",
          error: false,
          redirect: true,
        });
      } else {
        const error = await res.text();
        this.setState({ mensaje: `Error: ${error}`, error: true });
      }
    } catch (err) {
      console.error(err);
      this.setState({ mensaje: "Error de red o servidor", error: true });
    }
  };

  render() {
    const { User, Password, mensaje, error, redirect } = this.state;

    if (redirect) {
      // Redirige a la ruta principal o dashboard luego del login
      return <Navigate to="/" />;
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
          <button type="submit" className="button">
            Ingresar
          </button>
        </form>
        {mensaje && (
          <p className={error ? "message-error" : "message-success"}>{mensaje}</p>
        )}
        <p>
          ¿No tenés cuenta? <Link to="/registro">Registrarse</Link>
        </p>
      </div>
    );
  }
}

export default LoginUsuario;