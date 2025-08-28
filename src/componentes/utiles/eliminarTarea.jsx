// utils/eliminarTarea.js
import axios from "axios";

export const eliminarTarea = async (id, onEliminada) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No hay token");

    console.log(`🗑️ Eliminando tarea con id: ${id}`);

    await axios.delete(
      `http://localhost:3000/api/tareas/eliminarTarea/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    console.log("✅ Tarea eliminada correctamente");

    // 🔄 Si el padre pasó una función, la ejecutamos
    if (onEliminada) {
      onEliminada();
    }
  } catch (error) {
    console.error("❌ Error al eliminar tarea:", error);
  }
};