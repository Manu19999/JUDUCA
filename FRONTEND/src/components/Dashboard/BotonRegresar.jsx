import React from 'react';
import { Button } from 'react-bootstrap';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const BotonRegresar = ({
  to = "/dashboard",
  text = "Regresar",
  top = "100px",
  right = "20px",
  variant = "outline-warning"
}) => {
  const navigate = useNavigate();

  return (
    <Button
      variant={variant}
      onClick={() => navigate(to)}
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
