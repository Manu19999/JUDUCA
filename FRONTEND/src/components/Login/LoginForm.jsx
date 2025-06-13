import React, { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import Input from "./Input";
import { validateEmail, validatePassword } from "./validaciones";

const LoginForm = ({
  showForgotPassword,
  handleForgotPasswordClick,
  handleLoginSubmit,
  handleForgotPasswordSubmit,
  
  // Props para login
  loginEmail,
  setLoginEmail,
  setLoginEmailError,
  loginPassword,
  setLoginPassword,
  setLoginPasswordError,
  loginIsFocused,
  handleLoginFocus,
  handleLoginBlur,
  loginEmailError,
  loginPasswordError,
  
  // Props para recuperación
  recoveryEmail,
  setRecoveryEmail,
  setRecoveryEmailError,
  recoveryIsFocused,
  handleRecoveryFocus,
  handleRecoveryBlur,
  recoveryEmailError,
  
  // Props compartidos
  showPassword,
  setShowPassword,
}) => {
  return (
    <form className="login-form" onSubmit={showForgotPassword ? handleForgotPasswordSubmit : handleLoginSubmit}>
      {!showForgotPassword ? (
        <>
          <Input
            type="text"
            placeholder="Correo electrónico"
            icon={<FaUser className="input-icon" />}
            value={loginEmail}
            onChange={(e) => {
              setLoginEmail(e.target.value);
              // Solo validar formato cuando hay contenido
              setLoginEmailError(e.target.value ? validateEmail(e.target.value) : "");
            }}
            onFocus={() => handleLoginFocus("email")}
            onBlur={(e) => {
              // Solo validar formato al salir si hay contenido
              handleLoginBlur("email", e); // Asegúrate de pasar el evento
              setLoginEmailError(e.target.value ? validateEmail(e.target.value) : "");
            }}
            isFocused={loginIsFocused.email}
            error={loginEmailError}
            maxLength={50}
          />
          <Input
            type="password"
            placeholder="Contraseña"
            icon={<FaLock className="input-icon" />}
            isPassword
            value={loginPassword}
            onChange={(e) => {
              setLoginPassword(e.target.value);
              // Solo validar formato cuando hay contenido
              setLoginPasswordError(e.target.value ? validatePassword(e.target.value) : "");
            }}
            onFocus={() => handleLoginFocus("password")}
            onBlur={(e) => {
              handleLoginBlur("password", e);
              // Solo validar formato al salir si hay contenido
              setLoginPasswordError(e.target.value ? validatePassword(e.target.value) : "");
            }}
            isFocused={loginIsFocused.password}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            error={loginPasswordError}
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
            value={recoveryEmail}
            onChange={(e) => {
              setRecoveryEmail(e.target.value);
              // Solo validar formato cuando hay contenido
              setRecoveryEmailError(e.target.value ? validateEmail(e.target.value) : "");
            }}
            onFocus={handleRecoveryFocus}
            onBlur={(e) => {
              handleRecoveryBlur(e);
              // Solo validar formato al salir si hay contenido
              setRecoveryEmailError(e.target.value ? validateEmail(e.target.value) : "");
            }}
            isFocused={recoveryIsFocused}
            error={recoveryEmailError}
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