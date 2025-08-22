import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import RegistroUsuario from "./componentes/FormulariosUsuario/RegistroUsuario";
import LoginUsuario from "./componentes/FormulariosUsuario/LoginUsuario";
import Inicio from "./componentes/Home/Inicio";

class App extends Component {
  // Función para verificar si existe un token en localStorage
  verificarToken = () => {
    const token = localStorage.getItem("token");
    return token ? true : false;
  };

  render() {
    return (
      <Router>
        <Routes>
          {/* Redirige a /inicio si ya hay token */}
          <Route
            path="/registro"
            element={
              this.verificarToken() ? (
                <Navigate to="/inicio" />
              ) : (
                <RegistroUsuario verificarToken={this.verificarToken} />
              )
            }
          />
          <Route
            path="/login"
            element={
              this.verificarToken() ? (
                <Navigate to="/inicio" />
              ) : (
                <LoginUsuario verificarToken={this.verificarToken} />
              )
            }
          />
          <Route
            path="/inicios"
            element={
              this.verificarToken() ? (
                <Inicio verificarToken={this.verificarToken} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          {/* Ruta por defecto */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    );
  }
}

export default App;