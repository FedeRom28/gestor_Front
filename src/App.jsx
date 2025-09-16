import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegistroUsuario from "./componentes/FormularioUsuario/RegistroUsuario.jsx";
import LoginUsuario from "./componentes/FormularioUsuario/LoginUsuario.jsx";
import Inicio from "./componentes/Inicio/Inicio.jsx";
import ListadoCompletadas from "./componentes/ListaTareas/ListadoCompletadas.jsx";
import PaginaNoExiste from "./componentes/NoExiste.jsx";

class App extends Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route path="/registro" element={<RegistroUsuario />} />
          <Route path="/login" element={<LoginUsuario />} />
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/listar-tareas-completas" element={<ListadoCompletadas />} />

          {/* Ruta para páginas que no existen */}
          <Route path="*" element={<PaginaNoExiste />} />
        </Routes>
      </Router>
    );
  }
}

export default App;