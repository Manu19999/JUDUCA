import React, { useState } from "react";

const TwoFA = ({ onClose, onSubmit }) => {
  const [twoFACode, setTwoFACode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(twoFACode);
  };

  return (
    <div className="popup-background">
      <div className="popup-container">
        <h2>Autenticación de Doble Factor</h2>
        <p>Por favor, ingresa el código de autenticación que hemos enviado a tu correo electrónico.</p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              placeholder="Código de autenticación"
              value={twoFACode}
              onChange={(e) => setTwoFACode(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">
            Verificar Código
          </button>
        </form>
      </div>
    </div>
  );
};

export default TwoFA;