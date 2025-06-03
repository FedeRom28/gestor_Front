import React, { Component } from "react";

class ListaTarea extends Component {
  handleEliminar = (indice) => {
    this.props.onEliminarTarea(indice);
  };

  render() {
    const { tareas } = this.props;

    return (
      <ul>
        {tareas.map((tarea, index) => (
          <li key={index}>
            {tarea}
            <button onClick={() => this.handleEliminar(index)}>Eliminar</button>
          </li>
        ))}
      </ul>
    );
  }
}

export default ListaTarea;