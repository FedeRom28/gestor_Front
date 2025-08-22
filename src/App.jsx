import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import RegistroUsuario from "./componentes/FormularioUsuario/RegistroUsuario";
import LoginUsuario from "./componentes/FormularioUsuario/LoginUsuario";

class App extends Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route path="/registro" element={<RegistroUsuario />} />
          <Route path="/login" element={<LoginUsuario />} />
        </Routes>
      </Router>
    );
  }
}

export default App;