import { notification } from "antd";

// Estilos mejorados
const notificationStyles = {
  customNotification: {
    width: "480px",
    padding: "1.6rem",
    borderRadius: "8px",
    backgroundColor: "#fff6f6", // Fondo rojo claro
    borderLeft: "6px solid #ff4d4f", // Borde rojo en el lado izquierdo
  },
  title: {
    fontSize: "18px",
    color: "#d32f2f", // Rojo más oscuro para el título
  },
  description: {
    fontSize: "14px",
    color: "#333",
  },
};

// Función reusable para mostrar mensajes de error
export const mostrarMensajeError = (mensaje) => {
  notification.error({
    message: "Error",
    description: mensaje,
    duration: 4.5, // Duración en segundos
    placement: "top", // Posición de la notificación
    className: "custom-notification", // Clase personalizada para CSS adicional
    style: notificationStyles.customNotification, // Aplicar estilos en línea
  });
};
