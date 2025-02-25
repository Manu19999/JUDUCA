import { notification } from "antd";

// Estilos en línea para la notificación
const notificationStyles = {
  customNotification: {
    width: "480px",
    padding: "2rem",
  },
  title: {
    fontSize: "16px",
    color: "#426a99",
  },
  description: {
    fontSize: "14px",
    color: "#333",
  },
  button: {
    backgroundColor: "#426a99",
    borderColor: "#426a99",
    color: "white",
  },
  buttonHover: {
    backgroundColor: "#325880",
    borderColor: "#325880",
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