import React, { Component } from "react";
import axios from "axios";
import { eliminarTarea } from "../utiles/eliminarTarea"; // ✅ función reutilizable

class Listado extends Component {
  cambiarEstado = async (tarea) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No hay token");

      const nuevoEstado = tarea.Estado === 0 ? 1 : 0;

      console.log(`📡 Cambiando estado de tarea ${tarea.ID} a:`, nuevoEstado);

      await axios.patch(
        `http://localhost:3000/api/tareas/cambiarEstado/${tarea.ID}`,
        { Estado: nuevoEstado },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("✅ Estado cambiado en backend");

      // 🔄 Avisamos al padre que recargue
      if (this.props.onEstadoActualizado) {
        this.props.onEstadoActualizado();
      }
    } catch (error) {
      console.error("❌ Error al cambiar estado:", error);
    }
  };

  eliminar = async (id) => {
    try {
      await eliminarTarea(id); // ✅ usamos la función reutilizable
      console.log(`🗑️ Tarea ${id} eliminada`);

      if (this.props.onEstadoActualizado) {
        this.props.onEstadoActualizado();
      }
    } catch (error) {
      console.error("❌ Error al eliminar tarea:", error);
    }
  };

  render() {
    const { tareas, error } = this.props;

    // 🔀 Ordenar tareas: urgentes primero
    const tareasOrdenadas = [...tareas].sort((a, b) => {
      if (a.Urgencia === b.Urgencia) return 0;
      return b.Urgencia - a.Urgencia;
    });

    return (
      <div style={{ padding: "20px" }}>
        <h2>Mis Tareas</h2>
        <a href="/listar-tareas-completas">ver mis tareas hechas</a>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {tareasOrdenadas.length === 0 ? (
          <p>No tienes tareas aún.</p>
        ) : (
          <table
            border="1"
            cellPadding="10"
            style={{ width: "100%", borderCollapse: "collapse" }}
          >
            <thead>
              <tr>
                <th>Titulo</th>
                <th>Descripción</th>
                <th>Estado</th>
                <th>Categoría</th>
                <th>Urgencia</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {tareasOrdenadas.map((tarea) => (
                <tr key={tarea.ID}>
                  <td>{tarea.Titulo}</td>
                  <td>{tarea.Descripcion}</td>
                  <td>{tarea.Estado === 1 ? "Completada" : "Pendiente"}</td>
                  <td>{tarea.Categoria || "Sin categoría"}</td>
                  <td>{tarea.Urgencia === 1 ? "Urgente 🚨" : "Normal"}</td>
                  <td>
                    <button onClick={() => this.cambiarEstado(tarea)}>
                      {tarea.Estado === 0
                        ? "Marcar como completada"
                        : "Marcar como pendiente"}
                    </button>
                    <button
                      onClick={() =>
                        window.confirm("¿Seguro que quieres eliminar esta tarea?")
                          ? this.eliminar(tarea.ID)
                          : null
                      }
                      style={{ marginLeft: "10px", color: "red" }}
                    >
                      Eliminar 🗑️
                    </button>
                  </td>
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