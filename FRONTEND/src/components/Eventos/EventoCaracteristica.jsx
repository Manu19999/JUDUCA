import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faCog } from "@fortawesome/free-solid-svg-icons";
import BotonRegresar from "../../components/Dashboard/BotonRegresar";

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
    <div className="cardevent" style={{ cursor: "pointer" ,marginTop: '20px', }}>
      <img
        src={event.image}
        alt={event.title}
        className="eventimage"
        onClick={onImageClick}
        loading="lazy"
        style={{ cursor: "pointer", width: "100%",height: "250px",  }} // Cambia el cursor para indicar que es clicable
      />
      <div className="conteevent">
        <h2 className="titleevent">{event.title}</h2>
        <p className="eventdate">{event.date}</p>
        <p className="descripevent">{event.description}</p>
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
