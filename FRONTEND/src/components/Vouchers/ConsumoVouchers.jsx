import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const ConsumosVouchers = () => {
  const consumos = [
    { id: 1, id_voucher_comida: 101, id_credencial: 1001, id_comedor: 1, id_tipo_comida: 2, id_usuario: 5001, fecha_consumo: "2025-02-14 08:30:00", cantidad_utilizada: 1 },
    { id: 2, id_voucher_comida: 102, id_credencial: 1002, id_comedor: 2, id_tipo_comida: 1, id_usuario: 5002, fecha_consumo: "2025-02-14 12:15:00", cantidad_utilizada: 2 },
    { id: 3, id_voucher_comida: 103, id_credencial: 1003, id_comedor: 1, id_tipo_comida: 3, id_usuario: 5003, fecha_consumo: "2025-02-14 19:00:00", cantidad_utilizada: 1 },
  ];

  return (
    <div className="container mt-4">
      <header className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="text-primary">Lista de Consumos de Vouchers</h2>
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
              <th>ID Voucher Comida</th>
              <th>ID Credencial</th>
              <th>ID Comedor</th>
              <th>ID Tipo Comida</th>
              <th>ID Usuario</th>
              <th>Fecha Consumo</th>
              <th>Cantidad Utilizada</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {consumos.map((consumo) => (
              <tr key={consumo.id}>
                <td>{consumo.id}</td>
                <td>{consumo.id_voucher_comida}</td>
                <td>{consumo.id_credencial}</td>
                <td>{consumo.id_comedor}</td>
                <td>{consumo.id_tipo_comida}</td>
                <td>{consumo.id_usuario}</td>
                <td>{consumo.fecha_consumo}</td>
                <td>{consumo.cantidad_utilizada}</td>
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

export default ConsumosVouchers;
