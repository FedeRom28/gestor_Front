import React, { Component } from "react";
import axios from "axios";

class FormularioTarea extends Component {
  state = {
    titulo: "",
    descripcion: "",
    error: "",
    loading: false,
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { titulo, descripcion } = this.state;
    const token = localStorage.getItem("token");

    if (!titulo.trim() || !descripcion.trim()) {
      this.setState({ error: "Completa todos los campos" });
      return;
    }

    this.setState({ loading: true, error: "" });

    axios
      .post(
        "http://localhost:3000/api/tareas",
        { Titulo: titulo, Descripcion: descripcion },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        const nuevaTarea = {
          ID: res.data.tareaID,
          Titulo: titulo,
          Descripcion: descripcion,
          Estado: 0,
        };
        this.props.onTareaCreada(nuevaTarea);
        this.setState({
          titulo: "",
          descripcion: "",
          loading: false,
        });
      })
      .catch((err) => {
        const mensaje = err.response?.data || "Error al crear tarea";
        this.setState({ error: mensaje, loading: false });
      });
  };

  render() {
    const { titulo, descripcion, error, loading } = this.state;

    return (
      <form onSubmit={this.handleSubmit} style={{ marginBottom: 20 }}>
        <input
          type="text"
          name="titulo"
          placeholder="Título"
          value={titulo}
          onChange={this.handleChange}
          style={{ width: "100%", padding: 8, marginBottom: 8 }}
        />
        <textarea
          name="descripcion"
          placeholder="Descripción"
          value={descripcion}
          onChange={this.handleChange}
          style={{ width: "100%", padding: 8, marginBottom: 8 }}
          rows={3}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Creando..." : "Crear Tarea"}
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    );
  }
}

export default FormularioTarea;