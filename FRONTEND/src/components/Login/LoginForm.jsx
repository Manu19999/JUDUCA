import React, { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import Input from "./Input";
import { validateEmail, validatePassword } from "./validaciones";

const LoginForm = ({
  showForgotPassword,
  handleForgotPasswordClick,
  handleLoginSubmit,
  handleFocus,
  handleBlur,
  isFocused,
  email,
  setEmail,
  password,
  setPassword,
  showPassword,
  setShowPassword,
}) => {
  // Estados para errores de validación
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  return (
    <form className="login-form" onSubmit={handleLoginSubmit}>
      {!showForgotPassword ? (
        <>
          <Input
            type="text"
            placeholder="Correo electrónico"
            icon={<FaUser className="input-icon" />}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError(validateEmail(e.target.value)); // Validación en tiempo real
            }}
            onFocus={() => handleFocus("email")}
            onBlur={(e) => setEmailError(validateEmail(e.target.value))}
            isFocused={isFocused.email}
            error={emailError}
            maxLength={50} // <-- Restringe a 50 caracteres
          />
          <Input
            type="password"
            placeholder="Contraseña"
            icon={<FaLock className="input-icon" />}
            isPassword
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordError(validatePassword(e.target.value)); // Validación en tiempo real
            }}
            onFocus={() => handleFocus("password")}
            onBlur={(e) => setPasswordError(validatePassword(e.target.value))}
            isFocused={isFocused.password}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            error={passwordError}
            maxLength={20}
          />
          <a href="#forgot-password" className="forgot-password" onClick={handleForgotPasswordClick}>
            ¿Olvidaste tu contraseña?
          </a>
          <button type="submit" className="login-button">
            Iniciar Sesión
          </button>
        </>
      ) : (
        <>
          <Input
            type="email"
            placeholder="Correo electrónico"
            icon={<FaUser className="input-icon" />}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError(validateEmail(e.target.value));
            }}
            onFocus={() => handleFocus("email")}
            onBlur={(e) => setEmailError(validateEmail(e.target.value))}
            isFocused={isFocused.email}
            error={emailError}
          />
          <button type="submit" className="login-button">
            Recuperar Contraseña
          </button>
          <a href="#back-to-login" className="forgot-password" onClick={handleForgotPasswordClick}>
            Volver a iniciar sesión
          </a>
        </>
      )}
    </form>
  );
};

export default LoginForm;