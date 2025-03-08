import React from 'react';
import '../styles/Loader.css'; // Asegúrate de importar los estilos

const Loader = () => {
  return (
    <div className="containerloader">
      <div className="loaderrr"></div>
      <p className="textloader">Cargando...</p>
    </div>
  );
};

export default Loader;