import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Tooltip } from "antd";
import "../styles/Login/Login.css";
import logo from '../assets/mascota.png';
import LoginForm from "../components/Login/LoginForm";
import TwoFA from "../components/Login/TwoFA";
import { validateEmail, validatePassword } from "../components/Login/validaciones";
import CambiarContrasena from '../components/Login/CambiarContrasena';
const Login = () => {
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [show2FAPopup, setShow2FAPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [twoFAError, setTwoFAError] = useState("");

  const [showResetPassword, setShowResetPassword] = useState(false);
  const [resetPasswordEmail, setResetPasswordEmail] = useState('');

  const [isPasswordReset, setIsPasswordReset] = useState(false);
  const navigate = useNavigate();

  // Estados para el formulario de login
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginEmailError, setLoginEmailError] = useState("");
  const [loginPasswordError, setLoginPasswordError] = useState("");
  const [loginIsFocused, setLoginIsFocused] = useState({ email: false, password: false });

  // Estados para el formulario de recuperación
  const [recoveryEmail, setRecoveryEmail] = useState("");
  const [recoveryEmailError, setRecoveryEmailError] = useState("");
  const [recoveryIsFocused, setRecoveryIsFocused] = useState(false);

  const handleLoginFocus = (field) => {
    setLoginIsFocused(prev => ({ ...prev, [field]: true }));
  };

  const handleLoginBlur = (field, e) => {
    // Solo quitar el foco si el campo está vacío
    if (!e.target.value) {
      setLoginIsFocused(prev => ({ ...prev, [field]: false }));
    }
  };

  const handleRecoveryFocus = () => {
    setRecoveryIsFocused(true);
  };
  
  const handleRecoveryBlur = (e) => {
    // Solo quitar el foco si el campo está vacío
    if (!e.target.value) {
      setRecoveryIsFocused(false);
    }
  };

  const handleForgotPasswordClick = (e) => {
    e.preventDefault();
    setShowForgotPassword(!showForgotPassword);
    setErrorMessage("");
    // Limpiar estados específicos
    setLoginEmail("");
    setLoginPassword("");
    setLoginEmailError("");
    setLoginPasswordError("");
    setLoginIsFocused(false); 

    // Limpiar campos de recuperación si se vuelve al login
    if (showForgotPassword) {
      setRecoveryEmail("");
      setRecoveryEmailError("");
      setRecoveryIsFocused(false);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    const emailValidation = validateEmail(loginEmail);
    const passwordValidation = validatePassword(loginPassword);

    setLoginEmailError(emailValidation);
  setLoginPasswordError(passwordValidation);


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
              email: loginEmail, 
              contrasena: loginPassword, 
            }),
            credentials: 'include' // Necesario para enviar/recibir cookies
        });

        const data = await response.json();

        if (!response.ok) {
            setErrorMessage(data.errors?.[0] || "Credenciales inválidas");
            return;
        }

        // Guardar solo el email para el 2FA (no el token)
        localStorage.setItem("usuarioEmail", loginEmail);
        setShow2FAPopup(true);

    } catch (error) {
        console.error("Error en la solicitud:", error);
        setErrorMessage("Error en el servidor. Por favor, inténtalo de nuevo más tarde.");
    }
};

const handleForgotPasswordSubmit = async (e) => {
  e.preventDefault();
  setErrorMessage("");
  
  const emailValidation = validateEmail(recoveryEmail);
  setRecoveryEmailError(emailValidation);
  
  if (emailValidation) return;

  try {
    // 1. Verificar email (auth/forgot-password)
    const verifyResponse = await fetch("http://localhost:4000/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: recoveryEmail }),
    });

    const verifyData = await verifyResponse.json();
    
    if (!verifyResponse.ok) {
      setErrorMessage(verifyData.errors?.[0] || "Error al verificar email");
      return;
    }

    // Validación extra: verificar si el email existe
    if (!verifyData.data?.emailExists) {
      setErrorMessage("Si el email existe, recibirás un código de verificación");
      return;
    }

    // 2. Solo si la verificación fue exitosa, enviar código (twofactor/enviarCodigoReset)
    const codeResponse = await fetch("http://localhost:4000/api/twofactor/enviarCodigoReset", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: recoveryEmail }),
    });

    const codeData = await codeResponse.json();
    
    if (!codeResponse.ok) {
      throw new Error(codeData.errors?.[0] || "Error al enviar código");
    }

    localStorage.setItem("resetPasswordEmail", recoveryEmail);
    setIsPasswordReset(true);
    setShow2FAPopup(true);
    
  } catch (error) {
    console.error("Error:", error);
    setErrorMessage(error.message || "Error en el servidor");
  }
};

const handle2FASubmit = async (code) => {
  const email = isPasswordReset 
    ? localStorage.getItem("resetPasswordEmail")
    : localStorage.getItem("usuarioEmail");

  try {
    const endpoint = isPasswordReset 
      ? "http://localhost:4000/api/twofactor/verificarCodigoReset"
      : "http://localhost:4000/api/twofactor/verificarCodigo";

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, codigo: code }),
      credentials: 'include'
    });

    const data = await response.json();

    if (response.ok && data.valido) {
      console.log("✅ Código 2FA válido");
      
      if (isPasswordReset) {
        localStorage.removeItem("resetPasswordEmail");
        setResetPasswordEmail(email);
        setShowResetPassword(true); // Mostrar popup de cambio de contraseña
        setShow2FAPopup(false);
      } else {
        localStorage.removeItem("usuarioEmail");
        navigate("/dashboard");
      }
    } else {
      setTwoFAError("Código inválido o expirado.");
    }
  } catch (error) {
    console.error("Error al verificar 2FA:", error);
    setTwoFAError("Error al verificar el código.");
  }
};

const handleResetPasswordSubmit = async (newPassword) => {
  try {
    const response = await fetch('http://localhost:4000/api/auth/reset-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        email: resetPasswordEmail, 
        newPassword 
      }),
      credentials: 'include'
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.errors?.[0] || 'Error al cambiar la contraseña');
    }

    // Limpiar todos los estados relevantes
    localStorage.removeItem("resetPasswordEmail");
    setResetPasswordEmail('');
    setShowResetPassword(false);
    setShowForgotPassword(false);
    setIsPasswordReset(false);
    
    // Mostrar mensaje de éxito y resetear el formulario de login
    setErrorMessage('Tu contraseña ha sido actualizada correctamente. Ahora puedes iniciar sesión."');
    setLoginEmail(resetPasswordEmail); // Autorellenar el email
    setLoginPassword(''); // Limpiar contraseña
    
    // Añade esto para activar el estado de enfoque
    setLoginIsFocused(prev => ({ ...prev, email: true }));
    
  } catch (err) {
    console.error('Error:', err);
    setErrorMessage(err.message || 'Error en el servidor');
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
            handleForgotPasswordSubmit={handleForgotPasswordSubmit}
            
            // Props para login
            loginEmail={loginEmail}
            setLoginEmail={setLoginEmail}
            setLoginEmailError={setLoginEmailError}
            loginPassword={loginPassword}
            setLoginPassword={setLoginPassword}
            setLoginPasswordError={setLoginPasswordError}
            loginIsFocused={loginIsFocused}
            handleLoginFocus={handleLoginFocus}
            handleLoginBlur={handleLoginBlur}
            loginEmailError={loginEmailError}
            loginPasswordError={loginPasswordError}
            
            // Props para recuperación
            recoveryEmail={recoveryEmail}
            setRecoveryEmail={setRecoveryEmail}
            setRecoveryEmailError={setRecoveryEmailError}
            recoveryIsFocused={recoveryIsFocused}
            handleRecoveryFocus={handleRecoveryFocus}
            handleRecoveryBlur={handleRecoveryBlur}
            recoveryEmailError={recoveryEmailError}
          />
        </div>
      </div>

      {show2FAPopup && (
        <TwoFA
          onClose={() => {
            setShow2FAPopup(false);
            setTwoFAError(""); // Limpiar error al cerrar
          }}
          onSubmit={handle2FASubmit}
          mensajeError={twoFAError}
          isPasswordReset={isPasswordReset}
        />
      )}
      {showResetPassword && (
        <CambiarContrasena
          email={resetPasswordEmail}
          onClose={() => setShowResetPassword(false)}
          onSubmit={handleResetPasswordSubmit}
        />
      )}
    </div>
  );
};

export default Login;
