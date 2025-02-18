import React, { useState, useEffect } from 'react';
import './Tabla.css';

const Tabla = ({ columnas, datos }) => {
  const [paginaActual, setPaginaActual] = useState(1);
  const [registrosPorPagina, setRegistrosPorPagina] = useState(5);
  const [busqueda, setBusqueda] = useState('');
  const [datosFiltrados, setDatosFiltrados] = useState(datos);

  useEffect(() => {
    const datosFiltrados = datos.filter((fila) =>
      Object.values(fila).some((valor) =>
        valor.toString().toLowerCase().includes(busqueda.toLowerCase())
      )
    );
    setDatosFiltrados(datosFiltrados);
    setPaginaActual(1); // Reinicia la página a 1 cuando se realiza una búsqueda
  }, [busqueda, datos]);

  const indiceUltimoRegistro = paginaActual * registrosPorPagina;
  const indicePrimerRegistro = indiceUltimoRegistro - registrosPorPagina;
  const registrosActuales = datosFiltrados.slice(indicePrimerRegistro, indiceUltimoRegistro); // Esto es lo que se debe mostrar
  const totalPaginas = Math.ceil(datosFiltrados.length / registrosPorPagina);

  const cambiarPagina = (numeroPagina) => setPaginaActual(numeroPagina);
  const cambiarRegistrosPorPagina = (e) => {
    setRegistrosPorPagina(Number(e.target.value));
    setPaginaActual(1); // Resetea la página al cambiar los registros por página
  };

  return (
    <div className="tabla-container">
      <div className="filtros">
        <label>
          Mostrar{" "}
          <select value={registrosPorPagina} onChange={cambiarRegistrosPorPagina}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
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

      <div className="tabla-wrapper">
        <table className="tabla">
          <thead>
            <tr>
              {columnas.map((col, index) => (
                <th key={index} style={{ width: col.ancho }}>
                  {col.nombre}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Aquí se usa registrosActuales en vez de datos */}
            {registrosActuales.map((fila, index) => (
              <tr key={index}>
                {columnas.map((col, i) => (
                  <td key={i}>{fila[col.campo]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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
    </div>
  );
};

export default Tabla;