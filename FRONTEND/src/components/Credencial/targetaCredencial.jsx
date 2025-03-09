import React, { useState , useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye , faCog } from "@fortawesome/free-solid-svg-icons";

import "../../styles/Inicio/EventCard.css";

const TargetaCredencial = ({
  event,
  onImageClick,
  handleVerInfo,
  handleConfigurarCredencial,
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
        <h3 className="titleCredencial">{event.title}</h3>
        <p className="eventdate">{event.date}</p>
        <p className="eventdescription">{event.description}</p>
        <div className="eventicons">
          {showIcons && (
            <>
             {/* <FontAwesomeIcon
                icon={faEye}
                onClick={handleVerInfo}
                className="eventicon manage-btn-credencial"
                style={{ marginBottom: '10px', }} // Cambia el cursor para indicar que es clicable

              />
              <FontAwesomeIcon
                icon={faCog }
                onClick={handleConfigurarCredencial}
                className="eventicon manage-btn-credencial"
                style={{ marginBottom: '10px', marginInline: '10px'}} // Cambia el cursor para indicar que es clicable

              />*/}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TargetaCredencial;
