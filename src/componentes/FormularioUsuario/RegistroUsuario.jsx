import React from "react"
import { Component } from "react"
import axios from "axios"
import Header from "../header"
import "./registro.css"

class RegistroUsuario extends Component {
  constructor(props) {
    super(props)
    this.state = {
      User: "",
      Password: "",
      mensaje: "",
      error: "",
    }
  }

  componentDidMount() {
    const token = localStorage.getItem("token")
    if (token) {
      console.log("Token encontrado:", token)
      window.location.href = "/inicio" // Redirige si ya hay token
    } else {
      console.log("No hay token en localStorage")
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    const { User, Password } = this.state

    if (!User || !Password) {
      this.setState({ error: "Faltan datos", mensaje: "" })
      return
    }

    try {
      const response = await axios.post("http://localhost:3000/api/usuario/registro", { User, Password })

      // Mostramos mensaje de éxito
      this.setState({ mensaje: response.data.mensaje, error: "" })

      // Redirigir a /login después de 1 segundo
      setTimeout(() => {
        window.location.href = "/login"
      }, 1000)
    } catch (err) {
      this.setState({
        error: err.response?.data || "Error al registrar usuario",
        mensaje: "",
      })
    }
  }

  render() {
    const { User, Password, mensaje, error } = this.state

    return (
      <div>
        <Header/>
      <div className="registro-container">
        <div className="registro-content">
          <div className="registro-card">
            <h2 className="registro-title">Registro de Usuario</h2>
            {mensaje && <div className="registro-message success">{mensaje}</div>}
            {error && <div className="registro-message error">{error}</div>}
            <form className="registro-form" onSubmit={this.handleSubmit}>
              <div className="registro-input-group">
                <label className="registro-label">Usuario:</label>
                <input
                  className="registro-input"
                  type="text"
                  name="User"
                  value={User}
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className="registro-input-group">
                <label className="registro-label">Contraseña:</label>
                <input
                  className="registro-input"
                  type="password"
                  name="Password"
                  value={Password}
                  onChange={this.handleChange}
                  required
                />
              </div>
              <button className="registro-button" type="submit">
                Registrarse
              </button>
            </form>
            <p className="registro-link">
              Ya tenes tu cuenta? <a href="/login">Iniciar sesión</a>
            </p>
          </div>
        </div>
      </div>
      </div>
    )
  }
}

export default RegistroUsuario