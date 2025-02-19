import React from "react";
import "../../styles/Inicio/EventCard.css";

const EventCard = ({ event, onImageClick }) => {
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
      </div>
    </div>
  );
};

export default EventCard;
