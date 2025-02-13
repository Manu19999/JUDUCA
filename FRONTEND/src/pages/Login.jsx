import React, { useState } from "react";
import { FaUser, FaLock, FaEye, FaEyeSlash, FaArrowCircleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../styles/Login/Login.css";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="login-container">
      <Link to="/inicio" className="back-to-home-button">
        <FaArrowCircleLeft /> Ir al inicio
      </Link>
      <div className="login-box">
        <h1 className="login-title">Iniciar Sesión</h1>
        <form className="login-form">
          <div className="input-group">
            <FaUser className="input-icon" />
            <input type="text" placeholder="Correo electrónico o usuario" required />
          </div>

          <div className="input-group">
            <FaLock className="input-icon" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Contraseña"
              required
              className="password-input"
            />
            <span
              className="eye-icon"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <a href="#forgot-password" className="forgot-password">
            ¿Olvidaste tu contraseña?
          </a>
          <button type="submit" className="login-button">
            Acceder
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;