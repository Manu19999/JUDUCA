import React, { useState, useEffect } from "react";
import './Tabla.css';
import BotonesAccion from "./BotonesAccion"; // Importa el componente de boton nuevo y generar reporte
import BotonesAccionFila from "./BotonesAccionFila"; // Importa el componente de boton actualizar, eliminar
import Paginacion from './Paginacion';
import Filtros from './Filtros';

const Tabla = ({ columnas, datos, titulo, icono, onNuevoRegistro, onGenerarReporte, onEdit, onDelete, onDetails }) => {
  const [paginaActual, setPaginaActual] = useState(1);
  const [registrosPorPagina, setRegistrosPorPagina] = useState(8);
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
  const registrosActuales = datosFiltrados.slice(indicePrimerRegistro, indiceUltimoRegistro);
  const totalPaginas = Math.ceil(datosFiltrados.length / registrosPorPagina);

  const cambiarPagina = (numeroPagina) => setPaginaActual(numeroPagina);
  const cambiarRegistrosPorPagina = (e) => {
    setRegistrosPorPagina(Number(e.target.value));
    setPaginaActual(1); // Resetea la página al cambiar los registros por página
  };

  return (
    <>
      {/* Título y botones de acción */}
      <div className="titulo-contenedor">
        <h2 className="titulo-tabla">{icono} {titulo}</h2>
        <BotonesAccion
          onNuevoRegistro={onNuevoRegistro}
          onGenerarReporte={onGenerarReporte}
        />
      </div>

      {/* Contenedor de la tabla */}
      <div className="tabla-container">
        <Filtros
          registrosPorPagina={registrosPorPagina}
          cambiarRegistrosPorPagina={cambiarRegistrosPorPagina}
          busqueda={busqueda}
          setBusqueda={setBusqueda}
        />
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
              {registrosActuales.map((fila, index) => (
                <tr key={index}>
                  {columnas.map((col, i) => (
                    <td key={i}>
                      {col.campo === "accion" ? ( // 👈 Si la columna es "accion", mostramos botones
                        <BotonesAccionFila
                          id={fila.id}
                          onEdit={onEdit}
                          onDelete={onDelete}
                          onDetails={onDetails} // 👈 Pasamos onDetails solo si está definido
                        />
                      ) : (
                        fila[col.campo]
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Paginacion
          paginaActual={paginaActual}
          totalPaginas={totalPaginas}
          cambiarPagina={cambiarPagina}
        />
      </div>
    </>
  );
};

export default Tabla;