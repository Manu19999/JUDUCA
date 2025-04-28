//validaciones login
export const validateEmail = (value) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!value) return "El correo es obligatorio.";
  if (!emailRegex.test(value)) return "Correo electrónico no válido.";
  return "";
};
  
export const validatePassword = (value) => {
  if (!value) return "La contraseña es obligatoria.";
  if (value.length < 8) return "Debe tener al menos 8 caracteres.";
  if (!/[A-Z]/.test(value)) return "Debe incluir al menos una mayúscula.";
  if (!/[a-z]/.test(value)) return "Debe incluir al menos una minúscula.";
  if (!/[0-9]/.test(value)) return "Debe incluir al menos un número.";
  if (!/[@$!%*?&]/.test(value)) return "Debe incluir un carácter especial (@, $, !, %, *, ?, &).";
  return "";
};

