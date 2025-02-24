import React, { useState } from "react";
import { FaUser, FaLock, FaEye, FaEyeSlash, FaArrowCircleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../styles/Login/Login.css";
import logo from '../assets/mascota.png';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState({ email: false, password: false });
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleFocus = (field) => {
    setIsFocused((prev) => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field, e) => {
    if (!e.target.value) {
      setIsFocused((prev) => ({ ...prev, [field]: false }));
    }
  };

  const handleForgotPasswordClick = (e) => {
    e.preventDefault();
    setShowForgotPassword(!showForgotPassword);
  };

  return (
    <div className="login-container">

      {/* Contenedor principal para el logo y el login-box */}
      <div className="login-wrapper">
        {/* Logo que actúa como botón para ir a inicio */}
        <Link to="/" className="login-image-container">
          <img src={logo} alt="Logo" className="login-image" />
        </Link>
        
        {/* Tarjeta del formulario */}
        <div className="login-box">
          <h1 className="login-title">
            {showForgotPassword ? "Recuperar Contraseña" : "Iniciar Sesión"}
          </h1>
          <h6 className="login-subtitle">
            {showForgotPassword
              ? "Ingresa tu correo electrónico para recuperar tu contraseña"
              : "Ingresa tus datos para acceder a la plataforma"}
          </h6>
          <form className="login-form">
            {!showForgotPassword ? (
              <>
                <div className="input-group">
                  <FaUser className="input-icon" />
                  <input
                    type="text"
                    required
                    onFocus={() => handleFocus("email")}
                    onBlur={(e) => handleBlur("email", e)}
                    className={isFocused.email ? "input-focused" : ""}
                  />
                  <label className={`floating-label ${isFocused.email ? "active" : ""}`}>
                    Correo electrónico o usuario
                  </label>
                </div>

                <div className="input-group">
                  <FaLock className="input-icon" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    onFocus={() => handleFocus("password")}
                    onBlur={(e) => handleBlur("password", e)}
                    className={isFocused.password ? "input-focused" : ""}
                    autoComplete="new-password"
                  />
                  <label className={`floating-label ${isFocused.password ? "active" : ""}`}>
                    Contraseña
                  </label>
                  <span
                    className="eye-icon"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
                <a href="#forgot-password" className="forgot-password" onClick={handleForgotPasswordClick}>
                  ¿Olvidaste tu contraseña?
                </a>
                <button type="submit" className="login-button">
                  Iniciar Sesión
                </button>
              </>
            ) : (
              <>
                <div className="input-group">
                  <FaUser className="input-icon" />
                  <input
                    type="email"
                    required
                    onFocus={() => handleFocus("email")}
                    onBlur={(e) => handleBlur("email", e)}
                    className={isFocused.email ? "input-focused" : ""}
                  />
                  <label className={`floating-label ${isFocused.email ? "active" : ""}`}>
                    Correo electrónico
                  </label>
                </div>
                <button type="submit" className="login-button">
                  Recuperar Contraseña
                </button>
                <a href="#back-to-login" className="forgot-password" onClick={handleForgotPasswordClick}>
                  Volver a iniciar sesión
                </a>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;