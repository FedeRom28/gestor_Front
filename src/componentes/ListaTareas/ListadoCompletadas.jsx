// ListadoCompletadas.jsx
import React, { Component } from "react";
import axios from "axios";
import Header from "../header";
import { eliminarTarea } from "../utiles/eliminarTarea"; // ✅ usar el mismo nombre

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
      await eliminarTarea(id); // ✅ usamos la función importada
      // Actualizamos el estado para quitar la tarea eliminada
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
        <div style={{ padding: "20px" }}>
          <h2>Tareas Completadas</h2>
          <a href="/inicio">volver a inicio</a>
          {error && <p style={{ color: "red" }}>{error}</p>}
          {tareas.length === 0 ? (
            <p>No hay tareas completadas.</p>
          ) : (
            <table border="1" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th>Titulo</th>
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
                    <td>{tarea.Estado === 1 ? "Completada" : "Pendiente"}</td>
                    <td>{tarea.Categoria || "Sin categoría"}</td>
                    <td>{new Date(tarea.Fecha_Cambio).toLocaleString()}</td>
                    <td>
                      <button
                        onClick={() =>
                          window.confirm("¿Seguro que quieres eliminar esta tarea?") &&
                          this.eliminar(tarea.ID)
                        }
                        style={{ color: "red" }}
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
    );
  }
}

export default ListadoCompletadas;