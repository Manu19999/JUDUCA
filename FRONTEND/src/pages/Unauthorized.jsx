import { Link } from 'react-router-dom';

const Unauthorized = () => {
  return (
    <div className="unauthorized-container">
      <h1>403 - No autorizado</h1>
      <p>No tienes permiso para acceder a esta página.</p>
      <Link to="/dashboard" className="btn btn-primary">
        Volver al inicio
      </Link>
    </div>
  );
};

export default Unauthorized;