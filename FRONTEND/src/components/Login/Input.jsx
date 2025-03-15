import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Input = ({
  placeholder,
  icon,
  isPassword,
  value,
  onChange,
  onFocus,
  onBlur,
  isFocused,
  error,
  maxLength, // <-- Prop para definir el máximo de caracteres
  
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="input-wrapper"> {/* Contenedor para input y mensaje de error */}
      <div className="input-group">
        {icon}
        <input
          type={isPassword && !showPassword ? "password" : "text"}
          required
          onFocus={onFocus}
          onBlur={onBlur}
          className={isFocused ? "input-focused" : ""}
          value={value}
          onChange={onChange}
          maxLength={maxLength} // <-- Aplica la restricción de caracteres
        />
        <label className={`floating-label ${isFocused ? "active" : ""}`}>
          {placeholder}
        </label>
        {isPassword && (
          <span
            className="eye-icon"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </span>
        )}
      </div>
      {/* Mensaje de error colocado fuera de .input-group para que aparezca debajo */}
      {error && <span className="input-error-message">{error}</span>}
    </div>
  );
};

export default Input;
