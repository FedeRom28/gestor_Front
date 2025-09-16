import React from "react"
import { Component } from "react"
import CrearTarea from "./CrearTarea"
import Header from "../header"
import Listado from "../ListaTareas/Listado"
import { jwtDecode } from "jwt-decode"
import axios from "axios"
import "./Inicio.css"

class Inicio extends Component {
  state = { tareas: [] }

  componentDidMount() {
    this.verificarToken()
    this.cargarTareas()
  }

  verificarToken = () => {
    const token = localStorage.getItem("token")
    if (!token) {
      window.location.href = "/login"
      return
    }
    try {
      const decoded = jwtDecode(token)
      const ahora = Date.now() / 1000
      if (decoded.exp < ahora) {
        localStorage.removeItem("token")
        window.location.href = "/login"
      }
    } catch {
      localStorage.removeItem("token")
      window.location.href = "/login"
    }
  }

  // 🔎 Heurística para detectar "urgente" según distintos modelos de datos
  esUrgente = (t) => {
    const cat = (t.Categoria || t.Tipo || "").toString().toLowerCase()
    const prio = (t.Prioridad || t.Urgencia || "").toString().toLowerCase()
    return t.Urgente === 1 || t.Urgencia === 1 || t.Prioridad === 1 || prio === "alta" || /urgente|alta/.test(cat)
  }

  // 🧮 Orden total: Pendiente → Urgente → Más reciente
  ordenarTareas = (lista) =>
    [...lista].sort((a, b) => {
      if (a.Estado !== b.Estado) return a.Estado - b.Estado // 0 antes que 1
      const ua = this.esUrgente(a) ? 1 : 0
      const ub = this.esUrgente(b) ? 1 : 0
      if (ua !== ub) return ub - ua // urgentes primero
      const fa = Date.parse(a.Fecha_Cambio || a.Fecha_Creacion || 0) || 0
      const fb = Date.parse(b.Fecha_Cambio || b.Fecha_Creacion || 0) || 0
      return fb - fa // más nuevas primero
    })

  cargarTareas = async () => {
    try {
      const token = localStorage.getItem("token")
      const { data } = await axios.get("http://localhost:3000/api/tareas/obtenerTareas", {
        headers: { Authorization: `Bearer ${token}` },
      })
      this.setState({ tareas: this.ordenarTareas(data) })
      console.log("📥 Tareas recibidas:", data)
    } catch (error) {
      console.error("❌ Error al cargar tareas:", error)
    }
  }

  // ✅ Al crear, reordenamos la lista resultante
  agregarTarea = (nuevaTarea) => {
    this.setState((prev) => ({
      tareas: this.ordenarTareas([...prev.tareas, nuevaTarea]),
    }))
  }

  render() {
    return (
      <div>
        <Header/>
      <div className="inicio-container">
        <h1 className="inicio-title">Gestión de Notas</h1>

        <div className="formulario-section">
          <h2 className="formulario-title">📝 Crear Nueva Nota</h2>
          <CrearTarea onTareaCreada={this.agregarTarea} />
        </div>

        <div className="listado-section">
          <h2 className="listado-title">📋 Mis Notas</h2>
          <Listado
            tareas={this.state.tareas}
            onEstadoActualizado={this.cargarTareas} // recarga (y reordena) desde backend
          />
        </div>
      </div>
      </div>
    )
  }
}

export default Inicio