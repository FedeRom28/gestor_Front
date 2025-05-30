import React, { Component } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import RegistroUsuario from "./componentes/registroUsuario.jsx";
import LoginUsuario from "./componentes/loginUsuario.jsx";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Routes>
            <Route path="/login" element={<LoginUsuario />} />
            <Route path="/registro" element={<RegistroUsuario />} />
            {/* Redirige cualquier otra ruta a /login */}
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;