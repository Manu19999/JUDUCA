import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PageHeader = ({ title }) => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h2>{title}</h2>
        <p className="text-muted">Estás en: {location.pathname}</p>
      </div>
      <button
        onClick={() => navigate(-1)} // Regresa a la página anterior
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
        }}
      >
        <img
          src={require("../../assets/izquierda.png")} // Ruta al ícono de regresar
          alt="Regresar"
          style={{ width: "32px", height: "32px" }} // Ajusta el tamaño del ícono
        />
      </button>
    </div>
  );
};

export default PageHeader;