import React, { Component } from "react";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logueado: !!localStorage.getItem("token"), // true si existe token
    };
  }

  cerrarSesion = () => {
    localStorage.removeItem("token");
    this.setState({ logueado: false });
    window.location.href = "/login"; // redirige al login
  };

  iniciarSesion = () => {
    window.location.href = "/login"; // redirige al login
  };

  irRegistro = () => {
    window.location.href = "/registro"; // redirige a registro
  };

  render() {
    return (
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 20px",
          backgroundColor: "#282c34",
          color: "white",
        }}
      >
        <h2>Gestion Tareas</h2>
        <nav style={{ display: "flex", gap: "10px" }}>
          {this.state.logueado ? (
            <button
              onClick={this.cerrarSesion}
              style={{
                backgroundColor: "#ff4d4d",
                border: "none",
                padding: "8px 16px",
                borderRadius: "4px",
                color: "white",
                cursor: "pointer",
              }}
            >
              Cerrar Sesión
            </button>
          ) : (
            <>
              <button
                onClick={this.iniciarSesion}
                style={{
                  backgroundColor: "#4CAF50",
                  border: "none",
                  padding: "8px 16px",
                  borderRadius: "4px",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                Iniciar Sesión
              </button>
              <button
                onClick={this.irRegistro}
                style={{
                  backgroundColor: "#2196F3",
                  border: "none",
                  padding: "8px 16px",
                  borderRadius: "4px",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                Registrarse
              </button>
            </>
          )}
        </nav>
      </header>
    );
  }
}

export default Header;