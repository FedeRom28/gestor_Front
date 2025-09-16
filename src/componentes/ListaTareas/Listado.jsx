import React from "react"
import "./Listado.css"
import { Component } from "react"
import axios from "axios"

class Listado extends Component {
  cambiarEstado = async (tareaId, nuevoEstado) => {
    try {
      const token = localStorage.getItem("token")

      // Log del cambio de estado
      console.log(
        `Cambiando estado de la tarea ${tareaId} a: ${nuevoEstado === 1 ? "Completada ✅" : "Pendiente ⏳"}`
      )

      await axios.patch(
        `http://localhost:3000/api/tareas/actualizarEstado/${tareaId}`,
        { Estado: nuevoEstado },
        { headers: { Authorization: `Bearer ${token}` } }
      )

      // Notificar al componente padre para recargar las tareas
      this.props.onEstadoActualizado()

      // Log de confirmación
      console.log(`✅ Estado de la tarea ${tareaId} actualizado con éxito.`)
    } catch (error) {
      console.error("❌ Error al cambiar estado:", error)
    }
  }

  eliminarTarea = async (tareaId) => {
    try {
      const token = localStorage.getItem("token")
      await axios.delete(`http://localhost:3000/api/tareas/eliminarTarea/${tareaId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      // Notificar al componente padre para recargar las tareas
      this.props.onEstadoActualizado()
    } catch (error) {
      console.error("Error al eliminar tarea:", error)
    }
  }

  render() {
    const { tareas, error } = this.props

    const tareasOrdenadas = [...tareas].sort((a, b) => {
      if (a.Urgencia === b.Urgencia) return 0
      return b.Urgencia - a.Urgencia
    })

    return (
      <div className="listado-container">
        <div className="listado-header">
          <h2 className="listado-title">Mis Tareas</h2>
          <a href="/listar-tareas-completas" className="ver-completadas-link">
            ver mis tareas hechas
          </a>
        </div>

        {error && <p className="error-message">{error}</p>}

        {tareasOrdenadas.length === 0 ? (
          <p className="no-tareas-message">No tienes tareas aún.</p>
        ) : (
          <table className="tareas-table">
            <thead>
              <tr>
                <th>Título</th>
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
                  <td className="titulo-cell">{tarea.Titulo}</td>
                  <td className="descripcion-cell">{tarea.Descripcion}</td>
                  <td className="estado-cell">
                    <span className={tarea.Estado === 1 ? "estado-completada" : "estado-pendiente"}>
                      {tarea.Estado === 1 ? "Completada" : "Pendiente"}
                    </span>
                  </td>
                  <td className="categoria-cell">{tarea.Categoria || "Sin categoría"}</td>
                  <td className="urgencia-cell">
                    <span className={tarea.Urgencia === 1 ? "urgencia-urgente" : "urgencia-normal"}>
                      {tarea.Urgencia === 1 ? "Urgente 🚨" : "Normal"}
                    </span>
                  </td>
                  <td className="acciones-cell">
                    <button
                      className="btn-estado"
                      onClick={() => this.cambiarEstado(tarea.ID, tarea.Estado === 0 ? 1 : 0)}
                    >
                      {tarea.Estado === 0 ? "Completar" : "Descompletar"}
                    </button>
                    <button
                      className="btn-eliminar"
                      onClick={() =>
                        window.confirm("¿Seguro que quieres eliminar esta tarea?") ? this.eliminarTarea(tarea.ID) : null
                      }
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
    )
  }
}

export default Listado