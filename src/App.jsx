import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import RegistroUsuario from "./componentes/RegistroUsuario";
import LoginUsuario from "./componentes/LoginUsuario";
import Home from "./componentes/home";

class App extends Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<LoginUsuario />} />
          <Route path="/registro" element={<RegistroUsuario />} />
          {/* Ruta por defecto: redirige todo lo no definido a /login */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    );
  }
}

export default App;