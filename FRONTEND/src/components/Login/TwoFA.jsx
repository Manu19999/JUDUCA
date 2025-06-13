import React, { useState, useEffect } from "react";
import { FaKey, FaShieldAlt, FaMobileAlt, FaLock } from 'react-icons/fa';
const TwoFA = ({ onClose, onSubmit,mensajeError,isPasswordReset = false }) => {
  const [twoFACode, setTwoFACode] = useState("");
  const [estado, setEstado] = useState({
    cargando: true,
    mensaje: "Preparando código de verificación...",
    error: false
  });

  useEffect(() => {
    const email = isPasswordReset 
      ? localStorage.getItem("resetPasswordEmail")
      : localStorage.getItem("usuarioEmail");

    if (!email) {
      setEstado({
        cargando: false,
        mensaje: "⚠️ No se encontró el correo del usuario.",
        error: true
      });
      return;
    }
    if (!isPasswordReset) {
    fetch("http://localhost:4000/api/twofactor/enviarCodigo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error en la respuesta");
        return res.json();
      })
      .then(() => {
        setEstado({
          cargando: false,
          mensaje: "Código enviado a tu correo electrónico.",
          error: false
        });
      })
      .catch(() => {
        setEstado({
          cargando: false,
          mensaje: "❌ Error al enviar el código. Por favor intenta nuevamente.",
          error: true
        });
      });
    } else {
      // Para recuperación, solo cambia el mensaje (el código ya fue enviado)
      setEstado({
        cargando: false,
        mensaje: "Ingresa el código de recuperación que recibiste",
        error: false
      });
    }
  }, [isPasswordReset]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(twoFACode);
  };

  return (
    <div className="popup-background">
      <div className="popup-container">
        <h2 className="login-title">Verificación Requerida</h2>
        
        <p className={`login-subtitle ${estado.error ? "texto-error" : ""}`}>
          {estado.mensaje}
        </p>
        {mensajeError && (
          <div className="error-message">
            {mensajeError}
          </div>
        )}

        {!estado.error && (
          <form onSubmit={handleSubmit}>
            <div className="input-group">
            <FaKey className="input-icon" />
              <input
                type="text"
                className="input-login"
                placeholder= "Ingresa el código de verificación"
                value={twoFACode}
                onChange={(e) => {
                  // Validación para permitir solo números
                  const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                  setTwoFACode(value);
                }}
                required
                style={{ paddingLeft: '2.5rem' }}
                maxLength={6}
              />
            </div>

            <div className="botones-2fa" style={{ padding: "20px", textAlign: "center" }}>
              <button 
                type="submit" 
                className="login-button" 
                style={{ margin: "0 10px", marginBottom: "20px" }}
              >Verificar Código
              </button>
              <button
                type="button"
                className="login-button cancel"
                onClick={onClose}
                style={{ margin: "0 10px" }}
              >
                Cancelar
              </button>
            </div>
          </form>
        )}

        {estado.error && (
          <button
            type="button"
            className="login-button"
            onClick={() => window.location.reload()}
            style={{ marginTop: "20px" }}
          >
            Reintentar
          </button>
        )}
      </div>
    </div>
  );
};

export default TwoFA;