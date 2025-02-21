import React from "react";
import "./Modal.css"; // Archivo de estilos
import { FaSave } from "react-icons/fa"; 

const Modales = ({ show, onHide, titulo, children, onGuardar }) => {
  if (!show) return null; // Si no está activo, no renderiza nada

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h3>{titulo}</h3>
          <button className="close-btn" onClick={onHide}>✖</button>
        </div>
        <div className="modal-body">{children}</div>
        <div className="modal-footer">
          <button className="btn cancel" onClick={onHide}>Cerrar</button>
          <button className="btn save" onClick={onGuardar}>  <FaSave />Guardar</button>
        </div>
      </div>
    </div>
  );
};

export default Modales;
