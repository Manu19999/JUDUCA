import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Comedor = () => {
  const comedores = [
    { id: 1, id_ubicacion: 101, numero: 5, capacidad: 100, activo: "Sí" },
    { id: 2, id_ubicacion: 102, numero: 10, capacidad: 200, activo: "No" },
    { id: 3, id_ubicacion: 103, numero: 15, capacidad: 150, activo: "Sí" },
  ];

  return (
    <div className="container mt-4">
      <header className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="text-primary">Lista de Comedores</h2>
        <div>
          <button className="btn btn-primary me-2">Nuevo</button>
          <button className="btn btn-secondary">Generar Reporte</button>
        </div>
      </header>
      <div className="table-responsive">
        <table className="table table-bordered text-center">
          <thead className="table-primary">
            <tr>
              <th>ID</th>
              <th>ID Ubicación</th>
              <th>Número</th>
              <th>Capacidad</th>
              <th>Activo</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {comedores.map((comedor) => (
              <tr key={comedor.id}>
                <td>{comedor.id}</td>
                <td>{comedor.id_ubicacion}</td>
                <td>{comedor.numero}</td>
                <td>{comedor.capacidad}</td>
                <td>{comedor.activo}</td>
                <td>
                  <button className="btn btn-warning btn-sm me-2">Editar</button>
                  <button className="btn btn-danger btn-sm">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Comedor;
