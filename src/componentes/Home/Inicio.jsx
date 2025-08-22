// Inicio.jsx
import React, { Component } from "react";
import CrearTarea from "./CrearTarea";
import ListaTareas from "./ListaTareas";

class Inicio extends Component {
  componentDidMount() {
    // Revisar token al montar (opcional)
    if (this.props.verificarToken && !this.props.verificarToken()) {
      // Redirigir al login si no hay token
      window.location.href = "/login";
    }
  }

  render() {
    return (
      <div>
        <h1>Inicio</h1>
        <CrearTarea verificarToken={this.props.verificarToken} />
        <ListaTareas verificarToken={this.props.verificarToken} />
      </div>
    );
  }
}

export default Inicio;