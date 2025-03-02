import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faCog } from "@fortawesome/free-solid-svg-icons";

import "../../styles/Inicio/EventCard.css";

/* ********** Componente para las imagenes, titulos y navegación de las distitas cajas ********** */
const EventoCaracteristica = ({
  event,
  onImageClick,
  onEditClick,
  onManageClick,
  showIcons, // Añadir esta prop
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
          {showIcons && (
            <>
              <FontAwesomeIcon
                icon={faEdit}
                onClick={onEditClick}
                className="eventicon edit-btn"
              />
              <FontAwesomeIcon
                icon={faCog}
                onClick={onManageClick}
                className="eventicon manage-btn"
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventoCaracteristica;
