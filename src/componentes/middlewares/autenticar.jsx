import React, { Component } from "react";
import jwt_decode from "jwt-decode";

export function obtenerToken() {
  const token = localStorage.getItem("token");
  return token ? token : null;
}

export function tokenValido() {
  const token = obtenerToken();
  if (!token) return false;

  try {
    const decoded = jwt_decode(token);
    const ahora = Date.now() / 1000; // tiempo en segundos
    return decoded.exp > ahora; // true si no expiró
  } catch (error) {
    return false;
  }
}

export function withAuth(WrappedComponent) {
  return class extends Component {
    render() {
      if (!tokenValido()) {
        return <p>Acceso denegado. Por favor, inicia sesión.</p>;
      }

      return <WrappedComponent {...this.props} />;
    }
  };
}