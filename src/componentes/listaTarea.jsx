import React, { Component } from "react";
import axios from "axios";

class ListaTarea extends Component {
  formatearFecha = (fechaStr) => {
    const fecha = new Date(fechaStr);
    return fecha.toLocaleString("es-AR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  marcarComoFinalizado = async (tarea) => {
    const token = localStorage.getItem("token");

    try {
      await axios.put(
        `http://localhost:3000/api/tareas/${tarea.ID}`,
        {
          Titulo: tarea.Titulo,
          Descripcion: tarea.Descripcion,
          Estado: 1, // Estado finalizado
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Notificamos al padre que debe recargar tareas o actualizamos localmente
      if (this.props.onActualizarTarea) {
        this.props.onActualizarTarea();
      }
    } catch (error) {
      console.error("Error al actualizar tarea:", error);
      alert("No se pudo actualizar la tarea");
    }
  };

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
              backgroundColor: tarea.Estado === 1 ? "#d4edda" : "#f8d7da",
            }}
          >
            <h3>{tarea.Titulo}</h3>
            <p>{tarea.Descripcion}</p>
            <small>
              Estado: {tarea.Estado === 0 ? "Pendiente" : "Completada"}
            </small>
            <br />
            <small>Creado: {this.formatearFecha(tarea.Fecha_Creacion)}</small>
            <br />
            <small>
              Último cambio: {this.formatearFecha(tarea.Fecha_Cambio)}
            </small>
            <br />
            {tarea.Estado === 0 && (
              <button
                onClick={() => this.marcarComoFinalizado(tarea)}
                style={{
                  marginTop: 10,
                  padding: "6px 12px",
                  backgroundColor: "#28a745",
                  color: "#fff",
                  border: "none",
                  borderRadius: 4,
                  cursor: "pointer",
                }}
              >
                Marcar como Finalizado
              </button>
            )}
          </li>
        ))}
      </ul>
    );
  }
}

export default ListaTarea;