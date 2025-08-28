// ListarTareas.jsx
import React, { Component } from "react";

class Listado extends Component {
  render() {
    const { tareas, error } = this.props;

    return (
      <div style={{ padding: "20px" }}>
        <h2>Mis Tareas</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {tareas.length === 0 ? (
          <p>No tienes tareas aún.</p>
        ) : (
          <table border="1" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th>Titulo</th>
                <th>Descripción</th>
                <th>Estado</th>
                <th>Categoría</th>
              </tr>
            </thead>
            <tbody>
              {tareas.map((tarea) => (
                <tr key={tarea.ID}>
                  <td>{tarea.Titulo}</td>
                  <td>{tarea.Descripcion}</td>
                  <td>{tarea.Estado === 1 ? "Completada" : "Pendiente"}</td>
                  <td>{tarea.Categoria || "Sin categoría"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  }
}

export default Listado;