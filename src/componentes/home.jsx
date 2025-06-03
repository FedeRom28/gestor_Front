import React, { Component } from "react";
import axios from "axios";
import FormularioTarea from "./FormularioTarea";
import ListaTarea from "./ListaTarea";

class Home extends Component {
  state = {
    tareas: [],
    error: "",
  };

  componentDidMount() {
    this.cargarTareas();
  }

  cargarTareas = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      this.setState({ error: "Token no encontrado" });
      return;
    }

    axios
      .get("http://localhost:3000/api/tareas", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        this.setState({ tareas: res.data });
      })
      .catch((err) => {
        const mensaje =
          err.response?.data || "Error al cargar tareas";
        this.setState({ error: mensaje });
      });
  };

  agregarTarea = (nuevaTarea) => {
    this.setState((prevState) => ({
      tareas: [...prevState.tareas, nuevaTarea],
    }));
  };

  cerrarSesion = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  render() {
    const { tareas, error } = this.state;
    return (
      <div style={{ maxWidth: 600, margin: "auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h1>Mis Tareas</h1>
          <button onClick={this.cerrarSesion}>Cerrar Sesión</button>
        </div>

        <FormularioTarea onTareaCreada={this.agregarTarea} />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <ListaTarea tareas={tareas} onActualizarTarea={this.cargarTareas} />
      </div>
    );
  }
}

export default Home;