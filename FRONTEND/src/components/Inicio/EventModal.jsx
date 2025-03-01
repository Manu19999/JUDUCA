import React from "react";
import { Modal } from "antd";
import styles from "../../styles/Inicio/EventModal.module.css"; // Importa CSS Module

const EventModal = ({ event, show, onHide }) => {
  if (!event) return null; // Si no hay evento, no renderizar nada

  return (
    <Modal
      open={show} // Controla la visibilidad del modal
      onCancel={onHide} // Cierra el modal al hacer clic fuera o en la "X"
      footer={null} // Elimina el footer por defecto
      className={styles.customModal} // Aplica estilos personalizados
    >
      {/* Encabezado del modal */}
      <div className={styles.modalHeader}>
        <h2>{event.title}</h2>
      </div>

      {/* Cuerpo del modal */}
      <div className={styles.modalBody}>
        <img
          src={event.image}
          alt={event.title}
          className={styles.modalImage}
        />
        <p className={styles.modalDate}>{event.date}</p>
        <p className={styles.modalDescription}>{event.description}</p>
      </div>

      {/* Pie del modal */}
      <div className={styles.modalFooter}>
        <button className={styles.closeButton} onClick={onHide}>
          Cerrar
        </button>
      </div>
    </Modal>
  );
};

export default EventModal;