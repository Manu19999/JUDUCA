import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './BotonRegresar.css';

const BotonRegresar = ({
  to = "/dashboard",
  text = "Regresar",
  onClick
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    onClick ? onClick() : navigate(to);
  };

  return (
    <button
      onClick={handleClick}
      className="boton-regresar"
      aria-label={text}
    >
      <FaArrowLeft size={16} />
      <span>{text}</span>
    </button>
  );
};

export default BotonRegresar;