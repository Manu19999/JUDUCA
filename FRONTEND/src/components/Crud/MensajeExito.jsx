import { notification } from "antd";

// Estilos en línea para la notificación
const notificationStyles = {
  customNotification: {
    width: "480px",
    padding: "1.6rem",
    borderRadius: "8px",
    backgroundColor: "#f6fff6",
    borderLeft: "6px solid #4dff59",
  },
  title: {
    fontSize: "18px",
    color: "#426a99",
  },
  description: {
    fontSize: "14px",
    color: "#333",
  },
};

// Función reusable para mostrar mensajes de éxito
export const mostrarMensajeExito = (mensaje) => {
  notification.success({
    message: "¡Éxito!", // Título de la notificación
    description: mensaje, // Texto del mensaje
    duration: 4.5, // Duración en segundos (opcional)
    placement: "top", // Posición de la notificación
    className: "custom-notification", // Clase personalizada
    style: notificationStyles.customNotification, // Aplicar estilos en línea
  });
};