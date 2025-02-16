import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Vouchers = () => {
  const vouchers = [
    { id: 1, Valor: "00.00", fecha_emision: "2025-02-14", fecha_expiracion: "2025-02-14", fecha_inicio: "2025-02-14 08:00:00", fecha_fin: "2025-02-14 11:59:00", activo: "Expirado" },
    { id: 2, Valor: "00.00", fecha_emision: "2025-02-14", fecha_expiracion: "2025-02-14", fecha_inicio: "2025-02-14 12:00:00", fecha_fin: "2025-02-14 15:00:00", activo: "Activo" },
    { id: 3, Valor: "00.00", fecha_emision: "2025-02-14", fecha_expiracion: "2025-02-14", fecha_inicio: "2025-02-14 18:00:00", fecha_fin: "2025-02-14 22:00:00", activo: "Activo" },
  ];

  return (
    <div className="container mt-4">
      <header className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="text-primary">Lista de Vouchers</h2>
        <div>
          <button className="btn btn-primary me-2">Nuevo</button>
          <button className="btn btn-secondary">Generar Reporte</button>
        </div>
      </header>
      <div className="table-responsive">
        <table className="table table-bordered text-center">
          <thead className="table-primary">
            <tr>
              <th>N°</th>
              <th>Valor</th>
              <th>Fecha emisión</th>
              <th>Fecha expiración</th>
              <th>Fecha inicio</th>
              <th>Fecha final</th>
              <th>Activo</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {vouchers.map((voucher) => (
              <tr key={voucher.id}>
                <td>{voucher.id}</td>
                <td>{voucher.Valor}</td>
                <td>{voucher.fecha_emision}</td>
                <td>{voucher.fecha_expiracion}</td>
                <td>{voucher.fecha_inicio}</td>
                <td>{voucher.fecha_fin}</td>
                <td>{voucher.activo}</td>
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

export default Vouchers;
