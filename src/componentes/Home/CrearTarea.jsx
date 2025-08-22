// CrearTarea.jsx
import React, { Component } from "react";
import axios from "axios";
import { withAuth } from "../middlewares/auth"; // si querés usar protección por componente

class CrearTarea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Titulo: "",
      Descripcion: "",
      Categoria_ID: "",
      mensaje: "",
      error: "",
      categorias: [], // para cargar opciones
    };
  }

  componentDidMount() {
    // Traer categorías desde el backend
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:3000/api/categorias/obtenerCategorias", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        this.setState({ categorias: res.data });
      })
      .catch((err) => {
        this.setState({ error: "Error al cargar categorías" });
      });
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { Titulo, Descripcion, Categoria_ID } = this.state;
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        "http://localhost:3000/api/tarea/crearTarea",
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
        error: err.response?.data || "Error al crear tarea",
        mensaje: "",
      });
    }
  };

  render() {
    const { Titulo, Descripcion, Categoria_ID, mensaje, error, categorias } = this.state;

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
            <textarea
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
              <option value="">Seleccione</option>
              {categorias.map((cat) => (
                <option key={cat.ID} value={cat.ID}>
                  {cat.Tipo}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" style={{ marginTop: "10px" }}>
            Crear Tarea
          </button>
        </form>
      </div>
    );
  }
}

// Exportar el componente protegido
export default withAuth(CrearTarea);