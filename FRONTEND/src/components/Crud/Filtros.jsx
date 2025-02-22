// Filtros.js
import React from 'react';

const Filtros = ({ registrosPorPagina, cambiarRegistrosPorPagina, busqueda, setBusqueda }) => {
  return (
    <div className="filtros">
      <label>
        Mostrar{" "}
        <select value={registrosPorPagina} onChange={cambiarRegistrosPorPagina}>
          <option value="8">8</option>
          <option value="15">15</option>
          <option value="20">20</option>
          <option value="30">30</option>
        </select>{" "}
        registros
      </label>
      <input
        type="text"
        placeholder="Buscar..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />
    </div>
  );
};

export default Filtros;