import React from "react"
import { Component } from "react"
import axios from "axios"
import "./CrearTarea.css"

class CrearTarea extends Component {
  state = {
    Titulo: "",
    Descripcion: "",
    Categoria_ID: "",
    categorias: [],
    mensaje: "",
    error: "",
  }

  componentDidMount() {
    console.log("📌 Componente CrearTarea montado")
    this.obtenerCategorias()
  }

  handleChange = (e) => {
    console.log("✏️ Input cambiado:", e.target.name, "=", e.target.value)
    this.setState({ [e.target.name]: e.target.value })
  }

  obtenerCategorias = async () => {
    try {
      const token = localStorage.getItem("token")
      if (!token) throw new Error("No hay token de autenticación")

      console.log("📡 Solicitando categorías al backend...")
      const response = await axios.get("http://localhost:3000/api/categorias/obtenerCategorias", {
        headers: { Authorization: `Bearer ${token}` },
      })

      console.log("✅ Categorías recibidas:", response.data)
      this.setState({
        categorias: response.data,
        Categoria_ID: response.data.length > 0 ? response.data[0].ID : "",
      })
    } catch (err) {
      console.error("❌ Error al obtener categorías:", err)
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    const { Titulo, Descripcion, Categoria_ID, categorias } = this.state

    console.log("🚀 Enviando formulario:", { Titulo, Descripcion, Categoria_ID })

    try {
      const token = localStorage.getItem("token")
      const response = await axios.post(
        "http://localhost:3000/api/tareas/crearTarea",
        { Titulo, Descripcion, Categoria_ID }, // ✅ ahora incluye Titulo
        { headers: { Authorization: `Bearer ${token}` } },
      )

      console.log("✅ Respuesta del backend al crear tarea:", response.data)

      // Avisamos al componente padre que se creó la tarea
      const nuevaTarea = {
        ID: response.data.tareaID,
        Descripcion,
        Titulo,
        Estado: 0,
        Categoria: categorias.find((c) => c.ID === Number.parseInt(Categoria_ID))?.Tipo || "Sin categoría",
        Fecha_Creacion: new Date().toISOString(),
        Fecha_Cambio: new Date().toISOString(),
      }

      console.log("📤 Notificando al padre con nueva tarea:", nuevaTarea)
      this.props.onTareaCreada(nuevaTarea)

      this.setState({ mensaje: "Tarea creada", error: "", Titulo: "", Descripcion: "" })
    } catch (error) {
      console.error("❌ Error al crear tarea:", error)
      this.setState({ error: "Error al crear tarea", mensaje: "" })
    }
  }

  render() {
    const { Titulo, Descripcion, categorias, Categoria_ID, mensaje, error } = this.state

    return (
      <form onSubmit={this.handleSubmit} className="crear-tarea-form">
        <h2>Crear Nueva Tarea</h2>

        {mensaje && <p className="mensaje-exito">{mensaje}</p>}
        {error && <p className="mensaje-error">{error}</p>}

        <div className="form-group">
          <input type="text" name="Titulo" value={Titulo} onChange={this.handleChange} placeholder="Título" required />
        </div>

        <div className="form-group">
          <input
            type="text"
            name="Descripcion"
            value={Descripcion}
            onChange={this.handleChange}
            placeholder="Descripción"
            required
          />
        </div>

        <div className="form-group">
          <select name="Categoria_ID" value={Categoria_ID} onChange={this.handleChange} required>
            {categorias.map((cat) => (
              <option key={cat.ID} value={cat.ID}>
                {cat.Tipo}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">Crear Tarea</button>
      </form>
    )
  }
}

export default CrearTarea