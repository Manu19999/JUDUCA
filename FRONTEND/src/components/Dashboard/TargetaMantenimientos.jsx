import React from "react";
import "../../styles/Inicio/EventCard.css";

const TargetaMantenimiento = ({ mantenimiento, onImageClick }) => {
  // Verificar si mantenimiento es undefined antes de renderizar
  if (!mantenimiento) return null;

  return (
    <div className="eventcard">
      <img
        src={mantenimiento.image}
        alt={mantenimiento.title}
        className="eventimage"
        onClick={onImageClick}
        style={{ cursor: "pointer" }}
      />
      <div className="eventcontent">
        <h3 className="eventtitle">{mantenimiento.title}</h3>
        <p className="eventdescription">{mantenimiento.description}</p>
      </div>
    </div>
  );
};

export default TargetaMantenimiento;
