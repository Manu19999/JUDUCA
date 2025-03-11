import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Tooltip } from "antd";
import "../styles/Login/Login.css";
import logo from '../assets/mascota.png';
import LoginForm from "../components/Login/LoginForm";
import TwoFA from "../components/Login/TwoFA";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState({ email: false, password: false });
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [show2FAPopup, setShow2FAPopup] = useState(false);
  const [twoFACode, setTwoFACode] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

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
    setErrorMessage(""); // Limpiar mensaje de error
    setEmail("");// Limpiar el input de email
    setPassword("")
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Limpiar mensajes de error anteriores
  
    try {
      const response = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          contraseña: password, // Asegúrate de usar el mismo campo que en el backend
        }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        // Si hay un error, mostrar el mensaje del backend
        setErrorMessage(data.errors?.[0] || "Credenciales inválidas");
        return;
      }
  
      console.log("Inicio de sesión exitoso:", data);
  
      // Guardar el token en localStorage o en un state manager
      localStorage.setItem("token", data.data.token);
  
      // Redirigir al dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error("Error en la solicitud:", error);
      setErrorMessage("Error en el servidor. Por favor, inténtalo de nuevo más tarde.");
    }
  };
  

  const handle2FASubmit = (code) => {
    if (code === "123456") {
      console.log("Código 2FA válido. Acceso concedido.");
      setShow2FAPopup(false);
      navigate("/dashboard");
    } else {
      console.log("Código 2FA inválido. Inténtalo de nuevo.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <Tooltip
          title={<span style={{ fontSize: "12px" }}>Vuelve al inicio haciendo clic en el logo</span>}
          placement="rightTop"
        >
          <Link to="/" className="login-image-container">
            <img src={logo} alt="Logo" className="login-image" />
          </Link>
        </Tooltip>
        <div className="login-box">
          <h1 className="login-title">
            {showForgotPassword ? "Recuperar Contraseña" : "Iniciar Sesión"}
          </h1>
          <h6 className="login-subtitle">
            {showForgotPassword
              ? "Ingresa tu correo electrónico para recuperar tu contraseña"
              : "Ingresa tus datos para acceder a la plataforma"}
          </h6>
           {/* Mostrar mensaje de error */}
            {errorMessage && (
              <div className="error-message">
                {errorMessage}
              </div>
            )}
          <LoginForm
            showForgotPassword={showForgotPassword}
            handleForgotPasswordClick={handleForgotPasswordClick}
            handleLoginSubmit={handleLoginSubmit}
            handleFocus={handleFocus}
            handleBlur={handleBlur}
            isFocused={isFocused}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />
        </div>
      </div>

      {show2FAPopup && <TwoFA onClose={() => setShow2FAPopup(false)} onSubmit={handle2FASubmit} />}
    </div>
  );
};

export default Login;