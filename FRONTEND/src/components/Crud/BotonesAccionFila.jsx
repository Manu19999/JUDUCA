import React from "react";
import { FaEdit, FaTrashAlt, FaEye } from "react-icons/fa";

const BotonesAccionFila = ({ id, onEdit, onDelete, onDetails }) => {
  return (
    <div className="d-flex flex-wrap gap-2 contenedor-botones">
      {/* Botón de Editar */}
      <button onClick={() => onEdit(id)} className="btn-actualizar">
        <FaEdit />
      </button>

      {/* Botón de Eliminar */}
      <button onClick={() => onDelete(id)} className="btn-eliminar">
        <FaTrashAlt />
      </button>

      {/* Botón de Ver Detalles (solo si onDetails está definido) */}
      {onDetails && (
        <button onClick={() => onDetails(id)} className="btn-detalles">
          <FaEye />
        </button>
      )}
    </div>
  );
};

export default BotonesAccionFila;