import React, { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import Input from "./Input";

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
  return (
    <form className="login-form" onSubmit={handleLoginSubmit}>
      {!showForgotPassword ? (
        <>
          <Input
            type="text"
            placeholder="Correo electrónico o usuario"
            icon={<FaUser className="input-icon" />}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => handleFocus("email")}
            onBlur={(e) => handleBlur("email", e)}
            isFocused={isFocused.email}
          />
          <Input
            type="password"
            placeholder="Contraseña"
            icon={<FaLock className="input-icon" />}
            isPassword
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => handleFocus("password")}
            onBlur={(e) => handleBlur("password", e)}
            isFocused={isFocused.password}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
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
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => handleFocus("email")}
            onBlur={(e) => handleBlur("email", e)}
            isFocused={isFocused.email}
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