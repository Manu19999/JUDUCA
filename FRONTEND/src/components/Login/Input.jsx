import React, { useState } from "react";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

const Input = ({
  type,
  placeholder,
  icon,
  isPassword,
  value,
  onChange,
  onFocus,
  onBlur,
  isFocused,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
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
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
      )}
    </div>
  );
};

export default Input;