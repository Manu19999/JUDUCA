import React from "react";
import "../../styles/Inicio/EventCard.css";
const EventCard = ({ event, onClick }) => {
  return (
    <div className="cardevent" onClick={() => onClick(event)}>
      <img
        src={event.image}
        alt={event.title}
        className="imagenevent"
        style={{ cursor: "pointer" }} // Cambia el cursor para indicar que es clicable
      />
      <div className="conteevent">
        <h3 className="titleevent">{event.title}</h3>
        <p className="dateevent">{event.date}</p>
        <p className="descripevent">{event.description}</p>
      </div>
    </div>
  );
};

export default EventCard;
