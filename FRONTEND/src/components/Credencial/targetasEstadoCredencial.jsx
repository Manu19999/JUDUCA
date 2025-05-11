import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Inicio/EventCard.css";

const TargetaEstado = ({ Estado, selectedFicha, onClickEspecial }) => {
  const navigate = useNavigate();

  if (!Estado) return null;

  const handleClick = async () => {
    if (onClickEspecial) {
      await onClickEspecial(); // Ejecuta lógica especial antes de redirigir
    }

    if (Estado.url) {
      navigate(Estado.url, { state: { selectedFicha } });
    }
  };

  return (
    <div
      className="cardevent"
      onClick={handleClick}
      style={{ cursor: "pointer", marginTop: "20px" }}
    >
      <img
        className="eventimage"
        src={Estado.image}
        alt={Estado.title}
        loading="lazy"
        style={{
          width: "100%",
          height: "250px",
        }}
      />
      <div className="conteevent">
        <h3 className="titleevent">{Estado.title}</h3>
        <p className="descripevent">{Estado.description}</p>
      </div>
    </div>
  );
};

export default TargetaEstado;
