import React from "react";
import { Modal, Button } from "antd"; // Importar componentes de Ant Design
import "./Modal.css"; // Archivo de estilos personalizados

const ModalConfirmacion = ({ show, onHide, onConfirmar, mensaje }) => {
  return (
    <Modal
      title="Confirmar Eliminación" // Título del modal
      visible={show} // Controlar la visibilidad del modal
      onCancel={onHide} // Función para cerrar el modal
      footer={[
        <Button key="cancel" onClick={onHide} className="confirmacion-cancel-btn">
          Cancelar
        </Button>,
        <Button key="delete" type="primary" danger onClick={onConfirmar} className="confirmacion-delete-btn">
          Eliminar
        </Button>,
      ]}
      centered // Centrar el modal
      className="confirmacion-modal" // Clase personalizada para estilos adicionales
    >
      <p>{mensaje}</p> {/* Mensaje de confirmación */}
    </Modal>
  );
};

export default ModalConfirmacion;