import React, { useState, useEffect } from "react";
import './Tabla.css';
import BotonesAccion from "./BotonesAccion"; // Importa el componente de boton nuevo y generar reporte
import BotonesAccionFila from "./BotonesAccionFila"; // Importa el componente de boton actualizar, eliminar
import Paginacion from './Paginacion';
import Filtros from './Filtros';

const Tabla = ({ columnas, datos, titulo, icono, onNuevoRegistro, onGenerarReporte, onPermisos,onEstados, onEdit, onDelete, onDetails }) => {
  const [paginaActual, setPaginaActual] = useState(1);
  const [registrosPorPagina, setRegistrosPorPagina] = useState(8);
  const [busqueda, setBusqueda] = useState('');
  const [datosFiltrados, setDatosFiltrados] = useState(datos);
  const [busquedaCambiada, setBusquedaCambiada] = useState(false); // Nuevo estado para rastrear cambios en la búsqueda

  useEffect(() => {
    const datosFiltrados = datos.filter((fila) =>
      Object.values(fila).some((valor) =>
        valor !== null && 
        valor !== undefined &&
        valor.toString().toLowerCase().includes(busqueda.toLowerCase())
      )
    );
    setDatosFiltrados(datosFiltrados);
   // Reiniciar la página solo si la búsqueda ha cambiado
    if (busquedaCambiada) {
      setPaginaActual(1);
      setBusquedaCambiada(false); // Restablecer el estado de búsqueda cambiada
    }
  }, [busqueda, datos, busquedaCambiada]);

  const indiceUltimoRegistro = paginaActual * registrosPorPagina;
  const indicePrimerRegistro = indiceUltimoRegistro - registrosPorPagina;
  const registrosActuales = datosFiltrados.slice(indicePrimerRegistro, indiceUltimoRegistro);
  const totalPaginas = Math.ceil(datosFiltrados.length / registrosPorPagina);
  const mostrarMensajeVacio = datosFiltrados.length === 0;

  const cambiarPagina = (numeroPagina) => setPaginaActual(numeroPagina);
  const cambiarRegistrosPorPagina = (e) => {
    setRegistrosPorPagina(Number(e.target.value));
    setPaginaActual(1); // Resetea la página al cambiar los registros por página
  };

  const handleBusquedaChange = (nuevaBusqueda) => {
    setBusqueda(nuevaBusqueda);
    setBusquedaCambiada(true); // Indicar que la búsqueda ha cambiado
  };

  return (
    <>
      {/* Título y botones de acción */}
      <div className="titulo-contenedor">
        <h2 className="titulo-tabla">{icono} {titulo}</h2>
        {(onNuevoRegistro || onGenerarReporte) && (
          <BotonesAccion
            onNuevoRegistro={onNuevoRegistro}
            onGenerarReporte={onGenerarReporte}
            onPermisos={onPermisos}
            onEstados={onEstados}
          />
        )}
      </div>

      {/* Contenedor de la tabla */}
      <div className="tabla-container">
        <Filtros
          registrosPorPagina={registrosPorPagina}
          cambiarRegistrosPorPagina={cambiarRegistrosPorPagina}
          busqueda={busqueda}
          setBusqueda={handleBusquedaChange} // Usar la función personalizada para manejar la búsqueda
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
            {mostrarMensajeVacio ? (
                <tr>
                  <td colSpan={columnas.length} className="mensaje-vacio">
                    <div className="contenido-mensaje-vacio">
                      <p>{busqueda ? "No se encontraron resultados" : "No hay registros disponibles"}</p>
                    </div>
                  </td>
                </tr>
              ) : (
              registrosActuales.map((fila, index) => (
                <tr key={index}>
                  {columnas.map((col, i) => (
                    <td key={i}>
                      {col.campo === "accion" ? ( // Si la columna es "accion", mostramos botones
                        <BotonesAccionFila
                          id={fila.id}
                          onEdit={onEdit}
                          onDelete={onDelete}
                          onDetails={onDetails} // Pasamos onDetails solo si está definido
                        />
                      ) : col.campo === "indice" ? (
                        datos.findIndex(d => d.id === fila.id) + 1 // Encuentra el índice original
                      ) : col.render ? ( // Si la columna tiene un render personalizado, lo usamos
                        col.render(fila[col.campo], fila) // Pasamos el valor y la fila completa
                      ) : (
                        fila[col.campo] // Si no, mostramos el valor directamente
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
            </tbody>
          </table>
        </div>
        {!mostrarMensajeVacio && totalPaginas > 1 && (
          <Paginacion
            paginaActual={paginaActual}
            totalPaginas={totalPaginas}
            cambiarPagina={cambiarPagina}
          />
        )}
      </div>
    </>
  );
};

export default Tabla;