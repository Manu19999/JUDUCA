import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Tooltip } from "antd";
import "../styles/Login/Login.css";
import logo from '../assets/mascota.png';
import LoginForm from "../components/Login/LoginForm";
import TwoFA from "../components/Login/TwoFA";
import { validateEmail, validatePassword } from "../components/Login/validaciones";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState({ email: false, password: false });
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [show2FAPopup, setShow2FAPopup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

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
    setErrorMessage("");
    setEmail("");
    setPassword("");
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    const emailValidation = validateEmail(email);
    const passwordValidation = validatePassword(password);

    setEmailError(emailValidation);
    setPasswordError(passwordValidation);

    if (emailValidation || passwordValidation) {
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          contraseña: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.errors?.[0] || "Credenciales inválidas");
        return;
      }

      // Solo guardar token si pasa 2FA luego
      localStorage.setItem("usuarioEmail", email);
      localStorage.setItem("tokenPending", data.data.token);

      setShow2FAPopup(true);

    } catch (error) {
      console.error("Error en la solicitud:", error);
      setErrorMessage("Error en el servidor. Por favor, inténtalo de nuevo más tarde.");
    }
  };

  const handle2FASubmit = async (code) => {
    const email = localStorage.getItem("usuarioEmail");

    try {
      const response = await fetch("http://localhost:4000/api/twofactor/verificarCodigo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, codigo: code }),
      });

      const data = await response.json();

      if (response.ok && data.valido) {
        console.log("✅ Código 2FA válido");
        const token = localStorage.getItem("tokenPending");
        localStorage.setItem("token", token);
        localStorage.removeItem("usuarioEmail");
        localStorage.removeItem("tokenPending");
        setShow2FAPopup(false);
        navigate("/dashboard");
      } else {
        setErrorMessage("Código inválido o expirado.");
      }
    } catch (error) {
      console.error("Error al verificar 2FA:", error);
      setErrorMessage("Error al verificar el código.");
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
            emailError={emailError}
            passwordError={passwordError}
          />
        </div>
      </div>

      {show2FAPopup && (
        <TwoFA
          onClose={() => setShow2FAPopup(false)}
          onSubmit={handle2FASubmit}
        />
      )}
    </div>
  );
};

export default Login;
