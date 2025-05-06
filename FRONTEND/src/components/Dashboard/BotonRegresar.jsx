import React from 'react';
import { Button } from 'react-bootstrap';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const BotonRegresar = ({
  to = "/dashboard",
  text = "Regresar",
  top = "100px",
  right = "20px",
  variant = "outline-secondary",
  onClick // Agregar el onClick personalizado
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick(); // Si se pasa una función, la ejecuta
    } else {
      navigate(to); // Si no, simplemente navega al 'to'
    }
  };

  return (
    <Button
      variant={variant}
      onClick={handleClick} // Usar el handler personalizado
      className="d-flex align-items-center gap-2"
      style={{
        position: 'fixed',
        top: top,
        right: right,
        zIndex: 1000
      }}
    >
      <FaArrowLeft size={20} /> {text}
    </Button>
  );
};

export default BotonRegresar;
