import React from "react";
import { FaEdit, FaTrashAlt, FaEye, FaCreditCard } from "react-icons/fa";

const BotonesAccionFila = ({ id, onEdit, onDelete, onDetails, onPrintcredentials}) => {
  return (
    <div className="d-flex flex-wrap gap-2 contenedor-botones">
      {/* Botón de Editar */}
      {onEdit && (
        <button onClick={() => onEdit(id)} className="btn-actualizar">
          <FaEdit />
        </button>
      )}

      {/* Botón de Eliminar (Solo se muestra si onDelete está definido) */}
      {onDelete && (
        <button onClick={() => onDelete(id)} className="btn-eliminar">
          <FaTrashAlt />
        </button>
      )}

      {/* Botón de Ver Detalles (solo si onDetails está definido) */}
      {onDetails && (
        <button onClick={() => onDetails(id)} className="btn-detalles">
          <FaEye />
        </button>
      )}
      {/* Botón de Editar */}
      {onPrintcredentials && (
        <button onClick={() => onPrintcredentials(id)} className="btn-actualizar">
          <FaCreditCard />
        </button>
      )}
    </div>
  );
};

export default BotonesAccionFila;