import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Inicio/EventCard.css";

const TargetaMantenimiento = ({ mantenimiento }) => {
  const navigate = useNavigate();

  if (!mantenimiento) return null;

  const handleClick = () => {
    if (mantenimiento.url) {
      navigate(mantenimiento.url);
    }
  };

  return (
    <div className="eventcard" onClick={handleClick} style={{ cursor: "pointer" }}>
      <img
        src={mantenimiento.image}
        alt={mantenimiento.title}
        className="eventimage"
      />
      <div className="eventcontent">
        <h3 className="titleCredencial">{mantenimiento.title}</h3>
        <p className="eventdescription">{mantenimiento.description}</p>
      </div>
    </div>
  );
};

export default TargetaMantenimiento;
