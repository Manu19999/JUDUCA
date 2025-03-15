import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Inicio/EventCard.css";

const TargetaEstado = ({ Estado, selectedFicha }) => {
  const navigate = useNavigate();

  if (!Estado) return null;

  const handleClick = () => {
    if (Estado.url) {
      navigate(Estado.url, { state: { selectedFicha } }); // Pasar el estado de la ficha seleccionada
    }
  };

  return (
    <div className="eventcard" onClick={handleClick} style={{ cursor: "pointer", marginTop: '20px', }}>
      <img
        src={Estado.image}
        alt={Estado.title}
        className="eventimage"
        loading="lazy" // Carga diferida para mejorar el rendimiento

      />
      <div className="eventcontent">
        <h3 className="titleCredencial">{Estado.title}</h3>
        <p className="eventdescription">{Estado.description}</p>
      </div>
    </div>
  );
};

export default TargetaEstado;
