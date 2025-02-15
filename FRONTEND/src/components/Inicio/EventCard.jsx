import React from "react";
import "../../styles/Inicio/EventCard.css";

const EventCard = ({ event }) => {
  return (
    <div className="event-card">
      <img src={event.image} alt={event.title} className="event-image" />
      <div className="event-content">
        <h3 className="event-title">{event.title}</h3>
        <p className="event-date">{event.date}</p>
        <p className="event-description">{event.description}</p>
      </div>
    </div>
  );
};

export default EventCard;