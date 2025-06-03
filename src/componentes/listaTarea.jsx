import React, { Component } from "react";

class ListaTarea extends Component {
  render() {
    const { tareas } = this.props;

    if (tareas.length === 0) return <p>No hay tareas.</p>;

    return (
      <ul style={{ listStyle: "none", padding: 0 }}>
        {tareas.map((tarea) => (
          <li
            key={tarea.ID}
            style={{
              border: "1px solid #ccc",
              borderRadius: 6,
              padding: 12,
              marginBottom: 10,
              backgroundColor:
                tarea.Estado === 1 ? "#d4edda" : "#f8d7da",
            }}
          >
            <h3>{tarea.Titulo}</h3>
            <p>{tarea.Descripcion}</p>
            <small>
              Estado: {tarea.Estado === 0 ? "Pendiente" : "Completada"}
            </small>
          </li>
        ))}
      </ul>
    );
  }
}

export default ListaTarea;