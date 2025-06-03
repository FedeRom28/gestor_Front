import React, { Component } from "react";
import FormularioTarea from "./FormularioTarea";
import ListaTarea from "./ListaTarea";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tareas: []
    };
  }

  agregarTarea = (nuevaTarea) => {
    this.setState((prevState) => ({
      tareas: [...prevState.tareas, nuevaTarea]
    }));
  };

  eliminarTarea = (indice) => {
    this.setState((prevState) => {
      const nuevasTareas = [...prevState.tareas];
      nuevasTareas.splice(indice, 1);
      return { tareas: nuevasTareas };
    });
  };

  render() {
    return (
      <div className="home">
        <h1>Lista de Tareas</h1>
        <FormularioTarea onAgregarTarea={this.agregarTarea} />
        <ListaTarea tareas={this.state.tareas} onEliminarTarea={this.eliminarTarea} />
      </div>
    );
  }
}

export default Home;