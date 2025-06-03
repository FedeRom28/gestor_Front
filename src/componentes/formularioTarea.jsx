import React, { Component } from "react";

class FormularioTarea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tarea: ""
    };
  }

  handleChange = (e) => {
    this.setState({ tarea: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { tarea } = this.state;
    if (tarea.trim() !== "") {
      this.props.onAgregarTarea(tarea);
      this.setState({ tarea: "" });
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          value={this.state.tarea}
          onChange={this.handleChange}
          placeholder="Nueva tarea"
        />
        <button type="submit">Agregar</button>
      </form>
    );
  }
}

export default FormularioTarea;