import React from "react"
import { Component } from "react"
import axios from "axios"
import { jwtDecode } from "jwt-decode" // ✅ Import nombrado
import Header from "../header"
import "./LoginUsuario.css" // importing CSS styles

class LoginUsuario extends Component {
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
      try {
        const decoded = jwtDecode(token)
        const ahora = Date.now() / 1000
        if (decoded.exp > ahora) {
          console.log("Token válido al montar componente:", decoded)
          window.location.href = "/inicio"
        } else {
          console.log("Token expirado, borrando token")
          localStorage.removeItem("token")
        }
      } catch (err) {
        console.log("Token inválido, borrando token", err)
        localStorage.removeItem("token")
      }
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    const { User, Password } = this.state

    try {
      const response = await axios.post("http://localhost:3000/api/usuario/login", {
        User,
        Password,
      })

      const token = response.data.token
      localStorage.setItem("token", token)

      const decoded = jwtDecode(token)
      console.log("Token recibido y decodificado:", decoded)

      window.location.href = "/inicio"
    } catch (err) {
      console.error("Error de login:", err.response || err.message)
      this.setState({
        error: err.response?.data || "Error al iniciar sesión",
        mensaje: "",
      })
    }
  }

  render() {
    const { User, Password, mensaje, error } = this.state

    return (
      <div>
        <Header />
      <div className="login-container">
        <div className="login-content">
          <div className="login-card">
            <h2 className="login-title">Login de Usuario</h2>

            {mensaje && <div className="message message-success">{mensaje}</div>}
            {error && <div className="message message-error">{error}</div>}

            <form onSubmit={this.handleSubmit} className="login-form">
              <div className="form-group">
                <label className="form-label">Usuario:</label>
                <input
                  type="text"
                  name="User"
                  value={User}
                  onChange={this.handleChange}
                  required
                  className="form-input"
                  placeholder="Ingresa tu usuario"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Contraseña:</label>
                <input
                  type="password"
                  name="Password"
                  value={Password}
                  onChange={this.handleChange}
                  required
                  className="form-input"
                  placeholder="Ingresa tu contraseña"
                />
              </div>

              <button type="submit" className="submit-button">
                Iniciar Sesión
              </button>
            </form>

            <p className="register-link">
              No tenes cuenta? <a href="/registro">Registrarme</a>
            </p>
          </div>
        </div>
      </div>
      </div>
    )
  }
}

export default LoginUsuario