import React, { useState, useEffect } from 'react';
import { FaEye, FaEyeSlash, FaLock } from 'react-icons/fa';
import { validatePassword } from './validaciones'; // Importa tus validaciones

const CambiarContrasena = ({ email, onClose, onSubmit }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formValid, setFormValid] = useState(false);
  const [submitted, setSubmitted] = useState(false); 

  // Validación en tiempo real SOLO si los campos no están vacíos
  useEffect(() => {
    if (!submitted) return;

    const passwordError = password ? validatePassword(password) : 'Este campo es obligatorio';
    let confirmError = '';

    if (!confirmPassword) {
      confirmError = 'Este campo es obligatorio';
    } else if (password !== confirmPassword) {
      confirmError = 'Las contraseñas no coinciden';
    }

    setErrors({
      password: passwordError,
      confirmPassword: confirmError
    });

    setFormValid(!passwordError && !confirmError);
  }, [password, confirmPassword, submitted]); // Escucha también `submitted`

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true); // Activa la validación visible

    const passwordError = password ? validatePassword(password) : 'Este campo es obligatorio';
    let confirmError = '';

    if (!confirmPassword) {
      confirmError = 'Este campo es obligatorio';
    } else if (password !== confirmPassword) {
      confirmError = 'Las contraseñas no coinciden';
    }

    const isValid = !passwordError && !confirmError;

    setErrors({
      password: passwordError,
      confirmPassword: confirmError
    });

    if (passwordError || confirmError) return;

    // Limpiar los campos después del envío exitoso
    onSubmit(password).then(() => {
      setPassword('');
      setConfirmPassword('');
      setSubmitted(false);
    });
  };

  return (
    <div className="popup-background">
      <div className="popup-container">
        <h2 className="login-title">Cambiar Contraseña</h2>
        <h6 className="login-subtitle">Ingresa tu nueva contraseña</h6>

        <form onSubmit={handleSubmit}>
          {/* Contraseña */}
          <div className="input-wrapper">
            <div className="input-group" style={{ height: '50px' }}>
              <FaLock className="input-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                className={`input-login ${errors.password ? 'input-error' : ''}`}
                placeholder="Nueva contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ paddingLeft: '2.5rem' }}
              />
              <span
                className="eye-icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
            {submitted && errors.password && (
              <div className="input-error-message">{errors.password}</div>
            )}
          </div>

          {/* Confirmación */}
          <div className="input-wrapper" style={{ marginTop: '15px' }}>
            <div className="input-group">
              <FaLock className="input-icon" />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                className={`input-login ${errors.confirmPassword ? 'input-error' : ''}`}
                placeholder="Confirmar nueva contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={{ paddingLeft: '2.5rem' }}
              />
              <span
                className="eye-icon"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
            {submitted && errors.confirmPassword && (
              <div className="input-error-message">{errors.confirmPassword}</div>
            )}
          </div>

          {/* Botones */}
          <div className="botones-2fa" style={{ padding: '20px', textAlign: 'center', marginTop: '15px' }}>
            <button
              type="submit"
              className="login-button"
              style={{ marginBottom: '20px' }}
            >
              Cambiar Contraseña
            </button>
            <button
              type="button"
              className="login-button cancel"
              onClick={onClose}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CambiarContrasena;
