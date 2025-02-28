import React, { useState , useEffect } from "react";

import "../../styles/Inicio/EventCard.css";

const TargetaMantenimiento = ({
  event,
}) => {
  return (
    <div className="eventcard">
      <img
        src={event.image}
        alt={event.title}
        className="eventimage"
        onClick={onImageClick}
        style={{ cursor: "pointer" }} // Cambia el cursor para indicar que es clicable
      />
      <div className="eventcontent">
        <h3 className="eventtitle">{event.title}</h3>
        <p className="eventdate">{event.date}</p>
        <p className="eventdescription">{event.description}</p>
        <div className="eventicons">
        </div>
      </div>
    </div>
  );
};

export default TargetaMantenimiento;
