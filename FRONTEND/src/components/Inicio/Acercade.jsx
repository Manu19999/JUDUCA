import React from 'react';
import "../../styles/Inicio/Acercade.css";

const Acercade = () => {
  return (
    <section id="acercade" className="about-section">
      <div className="about-container">
        <h2 className="about-title">Acerca de la plataforma</h2>
        <p className="about-description">
          Plataforma de eventos es el espacio oficial de la UNAH para la organización, 
          promoción y participación en eventos universitarios. Aquí podrás encontrar información 
          sobre actividades académicas, culturales y deportivas, así como inscribirte en los 
          próximos eventos de manera sencilla y rápida.
        </p>
      </div>
    </section>
  );
};

export default Acercade;