import React, { Component } from "react";
import CrearTarea from "./CrearTarea";
import Header from "../header";
import { jwtDecode } from "jwt-decode";

class Inicio extends Component {
  componentDidMount() {
    this.verificarToken();
  }

  verificarToken = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.log("No hay token, redirigiendo a /login");
      window.location.href = "/login";
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const ahora = Date.now() / 1000;

      if (decoded.exp < ahora) {
        console.log("Token expirado, redirigiendo a /login");
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    } catch (error) {
      console.log("Token inválido, redirigiendo a /login");
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
  };

  render() {
    return (
      <div>
        <Header /> {/* ✅ aparece en todas las páginas */}
        <h1>Inicio</h1>
        <CrearTarea />
      </div>
    );
  }
}

export default Inicio;