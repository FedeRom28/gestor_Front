import React, { Component } from "react";
import CrearTarea from "./CrearTarea";

class Inicio extends Component {
  render() {
    return (
      <div>
        <h1>Inicio</h1>
        <CrearTarea />
      </div>
    );
  }
}

export default Inicio;