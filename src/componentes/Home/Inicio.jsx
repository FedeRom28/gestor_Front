// Inicio.jsx
import React, { Component } from "react";
import CrearTarea from "./CrearTarea";
import ListaTareas from "./ListaTareas";

class Inicio extends Component {
  render() {
    return (
      <div>
        <h1>Inicio</h1>
        <CrearTarea />
        <ListaTareas />
      </div>
    );
  }
}

export default Inicio;