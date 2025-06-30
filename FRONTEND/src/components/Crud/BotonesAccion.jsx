import React from "react";
import { FaPlus, FaFilePdf, FaUserShield, FaToggleOn, FaCreditCard  } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
const BotonesAccion = ({ 
  onNuevoRegistro, 
  onGenerarReporte,
  onPermisos,
  onEstados,
  onDiseñoCredencial,
  objetoNombre
}) => {
  const { hasPermission } = useAuth();
  return (
    <div className="botones-accion">
       {onNuevoRegistro && hasPermission(objetoNombre, 'insertar') && (
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
      {onEstados && (
        <button onClick={onEstados} className="btn-permisos">
          <FaToggleOn />
          <span>Estados</span>
        </button>
      )}
      {onGenerarReporte && (
        <button onClick={onGenerarReporte} className="btn-generar-reporte">
          <FaFilePdf />
          <span>Generar Reporte</span>
        </button>
      )}
      {onDiseñoCredencial && (
        <button onClick={onDiseñoCredencial} className="btn-nuevo-registro">
          <FaCreditCard />
          <span>Ver Diseño</span>
        </button>
      )}
      
      
    </div>
  );
};

export default BotonesAccion;