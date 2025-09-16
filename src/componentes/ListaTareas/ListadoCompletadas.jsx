import React, { Component } from "react";
import axios from "axios";
import Header from "../header";
import { eliminarTarea } from "../utiles/eliminarTarea";
import "./TareasListas.css";

class ListadoCompletadas extends Component {
  state = {
    tareas: [],
    error: "",
  };

  componentDidMount() {
    this.obtenerTareasCompletadas();
  }

  obtenerTareasCompletadas = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
      return;
    }

    try {
      const response = await axios.get(
        "http://localhost:3000/api/tareas/obtenerTareasCompletadas",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      this.setState({ tareas: response.data });
      console.log("✅ Tareas completadas recibidas:", response.data);
    } catch (err) {
      console.error("❌ Error al obtener tareas completadas:", err.response || err.message);
      if (err.response && err.response.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      } else {
        this.setState({ error: "Error al cargar tareas completadas" });
      }
    }
  };

  eliminar = async (id) => {
    try {
      await eliminarTarea(id);
      this.setState((prevState) => ({
        tareas: prevState.tareas.filter((tarea) => tarea.ID !== id),
      }));
    } catch (error) {
      console.error("❌ Error al eliminar tarea:", error);
      this.setState({ error: "No se pudo eliminar la tarea" });
    }
  };

  render() {
    const { tareas, error } = this.state;

    return (
      <div>
        <Header />
        <div className="tareasListas-container">
          <div className="tareasListas-content">
            <h2 className="tareasListas-title">Tareas Completadas</h2>
            <a href="/inicio" className="tareasListas-back-link">
              ⬅ Volver al inicio
            </a>

            {error && <div className="tareasListas-error">{error}</div>}

            {tareas.length === 0 ? (
              <div className="tareasListas-empty">No hay tareas completadas.</div>
            ) : (
              <table className="tareasListas-table">
                <thead>
                  <tr>
                    <th>Título</th>
                    <th>Descripción</th>
                    <th>Estado</th>
                    <th>Categoría</th>
                    <th>Última actualización</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {tareas.map((tarea) => (
                    <tr key={tarea.ID}>
                      <td>{tarea.Titulo}</td>
                      <td>{tarea.Descripcion}</td>
                      <td>
                        {tarea.Estado === 1 ? (
                          <span className="tareasListas-estado-completada">Completada</span>
                        ) : (
                          <span className="tareasListas-estado-pendiente">Pendiente</span>
                        )}
                      </td>
                      <td>
                        {tarea.Categoria ? (
                          <span className="tareasListas-categoria">{tarea.Categoria}</span>
                        ) : (
                          "Sin categoría"
                        )}
                      </td>
                      <td className="tareasListas-fecha">
                        {new Date(tarea.Fecha_Cambio).toLocaleString()}
                      </td>
                      <td>
                        <button
                          className="tareasListas-delete-btn"
                          onClick={() =>
                            window.confirm("¿Seguro que quieres eliminar esta tarea?") &&
                            this.eliminar(tarea.ID)
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
        </div>
      </div>
    );
  }
}

export default ListadoCompletadas;