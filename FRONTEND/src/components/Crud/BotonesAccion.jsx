import React from "react";
import { FaPlus, FaFilePdf } from "react-icons/fa";

const BotonesAccion = ({ onNuevoRegistro, onGenerarReporte }) => {
  return (
    <div className="botones-accion">
      <button onClick={onNuevoRegistro} className="btn-nuevo-registro">
        <FaPlus /> {/* Ícono */}
        <span>Nuevo</span> {/* Texto */}
      </button>
      <button onClick={onGenerarReporte} className="btn-generar-reporte">
        <FaFilePdf /> {/* Ícono */}
        <span>Generar Reporte</span> {/* Texto */}
      </button>
    </div>
  );
};

export default BotonesAccion;