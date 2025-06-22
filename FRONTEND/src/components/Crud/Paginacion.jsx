import React from 'react';

const Paginacion = ({ paginaActual, totalPaginas, cambiarPagina }) => {
  const maxPaginasVisibles = 5; // Máximo de números de página visibles
  let paginas = [];

  // Lógica para mostrar un rango de páginas alrededor de la actual
  if (totalPaginas <= maxPaginasVisibles) {
    paginas = Array.from({ length: totalPaginas }, (_, i) => i + 1);
  } else {
    const mitad = Math.floor(maxPaginasVisibles / 2);
    let inicio = Math.max(1, paginaActual - mitad);
    let fin = Math.min(totalPaginas, inicio + maxPaginasVisibles - 1);

    if (fin - inicio < maxPaginasVisibles - 1) {
      inicio = Math.max(1, fin - maxPaginasVisibles + 1);
    }

    // Agregar primera página y puntos suspensivos si es necesario
    if (inicio > 1) {
      paginas.push(1);
      if (inicio > 2) {
        paginas.push('...');
      }
    }

    // Agregar páginas del rango actual
    for (let i = inicio; i <= fin; i++) {
      paginas.push(i);
    }

    // Agregar última página y puntos suspensivos si es necesario
    if (fin < totalPaginas) {
      if (fin < totalPaginas - 1) {
        paginas.push('...');
      }
      paginas.push(totalPaginas);
    }
  }

  return (
    <div className="paginacion">
      <button 
        onClick={() => cambiarPagina(paginaActual - 1)} 
        disabled={paginaActual === 1}
      >
        &laquo; Anterior
      </button>

      {paginas.map((numero, index) => (
        numero === '...' ? (
          <span key={`ellipsis-${index}`} >...</span>
        ) : (
          <button
            key={numero}
            onClick={() => cambiarPagina(numero)}
            className={`numero-pagina ${paginaActual === numero ? "activo" : ""}`}
          >
            {numero}
          </button>
        )
      ))}

      <button 
        onClick={() => cambiarPagina(paginaActual + 1)} 
        disabled={paginaActual === totalPaginas}
      >
        Siguiente &raquo;
      </button>
    </div>
  );
};

export default Paginacion;