import React, { Component } from "react";
import axios from "axios";
import { withAuth } from "../middlewares/auth"; // importa tu HOC

class ListaTareas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tareas: [],
      error: "",
    };
  }

  componentDidMount() {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:3000/api/tareas/obtenerTareas", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log("QUE LLEGA", res.data)
        this.setState({ tareas: res.data, error: "" });
      })
      .catch((err) => {
        this.setState({ error: err.response?.data || "Error al cargar tareas" });
      });
  }

  render() {
    const { tareas, error } = this.state;

    return (
      <div>
        <h2>Lista de Tareas</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <ul>
          {tareas.map((tarea) => (
            <li key={tarea.ID}>
              {tarea.Titulo} - {tarea.Categoria} - {tarea.Estado ? "Completada" : "Pendiente"}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

// Envolver el componente con el HOC para protegerlo
export default withAuth(ListaTareas);