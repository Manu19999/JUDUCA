import React, { useState, useEffect } from "react";

const TwoFA = ({ onClose, onSubmit }) => {
  const [twoFACode, setTwoFACode] = useState("");
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    const email = localStorage.getItem("usuarioEmail");

    if (email) {
      fetch("http://localhost:4000/api/twofactor/enviarCodigo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })
        .then((res) => res.json())
        .then(() => {
          setMensaje("📩 Código enviado al correo.");
        })
        .catch(() => {
          setMensaje("❌ Error al enviar el código.");
        });
    } else {
      setMensaje("⚠️ No se encontró el correo del usuario.");
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(twoFACode);
  };

  return (
    <div className="popup-background">
      <div className="popup-container">
        <h2 className="login-title">Verificación en dos pasos</h2>
        <p className="login-subtitle">
          Ingresa el código que enviamos a tu correo electrónico.
        </p>

        {mensaje && <p className="mensaje-estado">{mensaje}</p>}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              className="input-login"
              placeholder="Código de autenticación"
              value={twoFACode}
              onChange={(e) => setTwoFACode(e.target.value)}
              required
            />
          </div>

          <div className="botones-2fa" style={{ padding: "20px", textAlign: "center" }}>
         
            <button type="submit" className="login-button" style={{ margin: "0 10px", marginBottom: "20px" }}>
              Verificar Código
            </button>
            <button
              type="button"
              className="login-button cancel"
              
              onClick={onClose}
              style={{ margin: "0 10px" }}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TwoFA;
