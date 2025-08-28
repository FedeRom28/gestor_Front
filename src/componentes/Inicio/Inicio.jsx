// Inicio.jsx
import React, { Component } from "react";
import CrearTarea from "./CrearTarea";
import Header from "../header";
import Listado from "../ListaTareas/Listado";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

class Inicio extends Component {
  state = {
    tareas: [], // estado compartido para las tareas
  };

  componentDidMount() {
    this.verificarToken();
    this.cargarTareas(); // cargar tareas al iniciar
  }

  verificarToken = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const ahora = Date.now() / 1000;
      if (decoded.exp < ahora) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    } catch (error) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
  };

  cargarTareas = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:3000/api/tareas/obtenerTareas", {
        headers: { Authorization: `Bearer ${token}` },
      });
      this.setState({ tareas: response.data });
      console.log("📥 Tareas recibidas:", response.data);
    } catch (error) {
      console.error("❌ Error al cargar tareas:", error);
    }
  };

  agregarTarea = (nuevaTarea) => {
    // Igual que antes, agregamos la tarea nueva sin esperar al backend
    this.setState((prevState) => ({
      tareas: [...prevState.tareas, nuevaTarea],
    }));
  };

  render() {
    return (
      <div>
        <Header />
        <h1>Inicio</h1>
        {/* Pasamos la función agregarTarea como prop */}
        <CrearTarea onTareaCreada={this.agregarTarea} />
        {/* Listado recibe las tareas y la función para recargar */}
        <Listado
          tareas={this.state.tareas}
          onEstadoActualizado={this.cargarTareas} // 👈 ahora recarga desde backend
        />
      </div>
    );
  }
}

export default Inicio;