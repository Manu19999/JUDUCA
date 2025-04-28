import React from "react";
import { Modal as AntModal, Button } from "antd";
import "./Modal.css"; // Importa los estilos

const ModalDetalles = ({ show, onHide, titulo, detalles, width }) => {
  return (
    <AntModal
      title={titulo}
      open={show}
      onCancel={onHide}
      footer={[
        <Button key="cerrar" onClick={onHide}>
          Cerrar
        </Button>,
      ]}
      className="custom-modal-card"
      width={width || 600}
    >
      {/* Contenedor de detalles */}
      <div className="detalle-container">
        {Object.entries(detalles).map(([key, value]) => (
          <div key={key} className="detalle-fila">
            <span className="detalle-clave">{key}:</span>
            <span className="detalle-valor">{value}</span>
          </div>
        ))}
      </div>
    </AntModal>
  );
};

export default ModalDetalles;