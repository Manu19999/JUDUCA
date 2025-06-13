import React, { useState, useEffect } from "react";
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
  maxLength,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isActive, setIsActive] = useState(false);

  // Actualiza el estado activo cuando cambia el valor o el foco
  useEffect(() => {
    setIsActive(isFocused || !!value);
  }, [isFocused, value]);

  const handleFocus = (e) => {
    setIsActive(true);
    if (onFocus) onFocus(e);
  };

  const handleBlur = (e) => {
    setIsActive(!!e.target.value);
    if (onBlur) onBlur(e);
  };

  return (
    <div className="input-wrapper">
      <div className={`input-group ${isActive ? 'active' : ''}`}>
        {icon}
        <input
          type={isPassword && !showPassword ? "password" : "text"}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={`input-login ${isFocused ? "input-focused" : ""}`}
          value={value}
          onChange={onChange}
          maxLength={maxLength}
        />
        <label className={`floating-label ${isActive ? "active" : ""}`}>
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
      {error && <span className="input-error-message">{error}</span>}
    </div>
  );
};

export default Input;