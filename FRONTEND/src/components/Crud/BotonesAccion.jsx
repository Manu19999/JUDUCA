import React from "react";
import { FaPlus, FaFilePdf, FaUserShield } from "react-icons/fa";

const BotonesAccion = ({ 
  onNuevoRegistro, 
  onGenerarReporte,
  onPermisos // Nueva prop para el botón de permisos
}) => {
  return (
    <div className="botones-accion">
      {onNuevoRegistro && (
        <button onClick={onNuevoRegistro} className="btn-nuevo-registro">
          <FaPlus />
          <span>Nuevo</span>
        </button>
      )}
      {onPermisos && (
        <button onClick={onPermisos} className="btn-permisos">
          <FaUserShield />
          <span>Permisos</span>
        </button>
      )}
      {onGenerarReporte && (
        <button onClick={onGenerarReporte} className="btn-generar-reporte">
          <FaFilePdf />
          <span>Generar Reporte</span>
        </button>
      )}
      
      
    </div>
  );
};

export default BotonesAccion;