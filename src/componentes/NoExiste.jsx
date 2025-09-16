import React from "react";
import { Link } from "react-router-dom";

const PaginaNoExiste = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>¡OH RAYOS!</h1>
      <h2 style={styles.subtitle}>Página no encontrada</h2>
      <p style={styles.text}>
        La ruta que intentás visitar no existe.  
      </p>
      <Link to="/inicio" style={styles.button}>
        Volver al inicio
      </Link>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    marginTop: "80px",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    fontSize: "100px",
    margin: "0",
    color: "#d32f2f",
  },
  subtitle: {
    fontSize: "28px",
    margin: "10px 0",
    color: "#555",
  },
  text: {
    fontSize: "18px",
    marginBottom: "20px",
  },
  button: {
    display: "inline-block",
    padding: "10px 20px",
    backgroundColor: "#1976d2",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "5px",
  },
};

export default PaginaNoExiste;