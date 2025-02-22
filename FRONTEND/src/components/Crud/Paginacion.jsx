// Paginacion.js
import React from 'react';

const Paginacion = ({ paginaActual, totalPaginas, cambiarPagina }) => {
  return (
    <div className="paginacion">
      <button onClick={() => cambiarPagina(paginaActual - 1)} disabled={paginaActual === 1}>
        Anterior
      </button>

      {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((numero) => (
        <button
          key={numero}
          onClick={() => cambiarPagina(numero)}
          className={paginaActual === numero ? "activo" : ""}
        >
          {numero}
        </button>
      ))}

      <button onClick={() => cambiarPagina(paginaActual + 1)} disabled={paginaActual === totalPaginas}>
        Siguiente
      </button>
    </div>
  );
};

export default Paginacion;