import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import RegistroUsuario from "./componentes/FormularioUsuario/RegistroUsuario.jsx";
import LoginUsuario from "./componentes/FormularioUsuario/LoginUsuario.jsx";
import Inicio from "./componentes/Inicio/Inicio.jsx"
import ListadoCompletadas from "./componentes/ListaTareas/ListadoCompletadas.jsx";

class App extends Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route path="/registro" element={<RegistroUsuario />} />
          <Route path="/login" element={<LoginUsuario />} />
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/listar-tareas-completas" element={<ListadoCompletadas />} />
        </Routes>
      </Router>
    );
  }
}

export default App;