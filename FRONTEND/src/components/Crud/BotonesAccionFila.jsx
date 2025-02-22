import React from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const BotonesAccionFila = ({ id, onEdit, onDelete }) => {
  return (
    <div className="d-flex flex-wrap gap-2 justify-content-center">
      <button onClick={() => onEdit(id)} className="btn-actualizar ">
        <FaEdit />
      </button>
      <button onClick={() => onDelete(id)} className="btn-eliminar ">
        <FaTrashAlt />
      </button>
    </div>
  );
};

export default BotonesAccionFila;