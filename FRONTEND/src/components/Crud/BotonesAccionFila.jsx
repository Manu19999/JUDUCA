import React from "react";
import { FaEdit, FaTrashAlt, FaEye, FaCreditCard } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
const BotonesAccionFila = ({ id, onEdit, onDelete, onDetails, onPrintcredentials, objetoNombre }) => {
  const { hasPermission } = useAuth();
  return (
    <div className="d-flex flex-wrap gap-2 contenedor-botones">
       {/* Botón de Editar */}
       {onEdit && hasPermission(objetoNombre, 'actualizar') && (
        <button onClick={() => onEdit(id)} className="btn-actualizar">
          <FaEdit />
        </button>
      )}

      {/* Botón de Eliminar */}
      {onDelete && hasPermission(objetoNombre, 'eliminar') && (
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