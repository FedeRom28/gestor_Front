// CrearTarea.jsx
import React, { Component } from "react";
import axios from "axios";

class CrearTarea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Titulo: "",
      Descripcion: "",
      Categoria_ID: "",
      categorias: [], // guardará las categorías traídas del backend
      mensaje: "",
      error: "",
    };
  }

  componentDidMount() {
    this.obtenerCategorias();
  }

  obtenerCategorias = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No hay token de autenticación");

      const response = await axios.get(
        "http://localhost:3000/api/categorias/obtenerCategorias",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      this.setState({ categorias: response.data });
    } catch (err) {
      console.error("Error al obtener categorías:", err);
    }
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { Titulo, Descripcion, Categoria_ID } = this.state;

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No hay token de autenticación");

      const response = await axios.post(
        "http://localhost:3000/api/tareas/crearTarea",
        { Titulo, Descripcion, Categoria_ID },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      this.setState({
        mensaje: response.data.mensaje,
        error: "",
        Titulo: "",
        Descripcion: "",
        Categoria_ID: "",
      });
    } catch (err) {
      this.setState({
        error: err.response?.data || err.message || "Error al crear tarea",
        mensaje: "",
      });
    }
  };

  render() {
    const { Titulo, Descripcion, Categoria_ID, categorias, mensaje, error } = this.state;

    return (
      <div>
        <h2>Crear Tarea</h2>
        {mensaje && <p style={{ color: "green" }}>{mensaje}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Título:</label>
            <input
              type="text"
              name="Titulo"
              value={Titulo}
              onChange={this.handleChange}
              required
            />
          </div>
          <div>
            <label>Descripción:</label>
            <input
              type="text"
              name="Descripcion"
              value={Descripcion}
              onChange={this.handleChange}
              required
            />
          </div>
          <div>
            <label>Categoría:</label>
            <select
              name="Categoria_ID"
              value={Categoria_ID}
              onChange={this.handleChange}
              required
            >
              <option value="">Seleccione una categoría</option>
              {categorias.map((cat) => (
                <option key={cat.ID} value={cat.ID}>
                  {cat.Tipo}
                </option>
              ))}
            </select>
          </div>
          <button type="submit">Crear Tarea</button>
        </form>
      </div>
    );
  }
}

export default CrearTarea;