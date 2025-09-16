import React from "react"
import { Component } from "react"
import { LogOut, LogIn, UserPlus, Menu, X } from "lucide-react"
import "./header.css"

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      logueado: !!localStorage.getItem("token"), // true si existe token
      mobileMenuOpen: false,
    }
  }

  toggleMobileMenu = () => {
    this.setState({ mobileMenuOpen: !this.state.mobileMenuOpen })
  }

  cerrarSesion = () => {
    localStorage.removeItem("token")
    this.setState({ logueado: false })
    window.location.href = "/login" // redirige al login
  }

  iniciarSesion = () => {
    window.location.href = "/login" // redirige al login
  }

  irRegistro = () => {
    window.location.href = "/registro" // redirige a registro
  }

  render() {
    return (
      <header className="header">
        <h2 className="header-title">Gestión Tareas</h2>

        <button className="mobile-menu-btn" onClick={this.toggleMobileMenu}>
          {this.state.mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <nav className={`nav ${this.state.mobileMenuOpen ? "nav-mobile-open" : ""}`}>
          {this.state.logueado ? (
            <button onClick={this.cerrarSesion} className="btn btn-logout">
              <LogOut size={18} />
              <span>Cerrar Sesión</span>
            </button>
          ) : (
            <>
              <button onClick={this.iniciarSesion} className="btn btn-login">
                <LogIn size={18} />
                <span>Iniciar Sesión</span>
              </button>
              <button onClick={this.irRegistro} className="btn btn-register">
                <UserPlus size={18} />
                <span>Registrarse</span>
              </button>
            </>
          )}
        </nav>
      </header>
    )
  }
}

export default Header