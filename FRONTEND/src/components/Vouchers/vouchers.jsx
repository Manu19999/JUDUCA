import React from "react";

const Vouchers = () => {
  // Datos de ejemplo (puedes reemplazarlos con datos de una API)
  const vouchers = [
    { id: 1, Valor: "00.00", fecha_emision: "2025-02-14 06:00:00", fecha_expiracion: "2025-02-14 13:00:00", fecha_inicio: "2025-02-14 08:00:00" , fecha_fin: "2025-02-14 11:59:00", activo: "Expirado" },
    { id: 2, Valor: "00.00", fecha_emision: "2025-02-14 06:00:00", fecha_expiracion: "2025-02-14 15:00:00", fecha_inicio: "2025-02-14 12:00:00" , fecha_fin: "2025-02-14 15:00:00", activo: "Activo" },
    { id: 3, Valor: "00.00", fecha_emision: "2025-02-14 06:00:00", fecha_expiracion: "2025-02-14 22:00:00", fecha_inicio: "2025-02-14 18:00:00" , fecha_fin: "2025-02-14 22:00:00", activo: "Activo" },
  ];

  return (
    <div className="container mt-4">
      <h2 className="text-center fw-bold" style={{ color: "#0033A0" }}>
        Lista de Vouchers
      </h2>
      <div className="table-responsive">
        <table
          className="table table-striped text-center"
          style={{ backgroundColor: "#FFFFFF", borderColor: "#0033A0" }}
        >
          <thead style={{ backgroundColor: "#FFD100", color: "#0033A0" }}>
            <tr>
              <th scope="col">id</th>
              <th scope="col">Valor</th>
              <th scope="col">Fecha emision</th>
              <th scope="col">Fecha expiracion</th>
              <th scope="col">Fecha inicio</th>
              <th scope="col">Fecha final</th>
              <th scope="col">Activo</th>
            </tr>
          </thead>
          <tbody style={{ backgroundColor: "#FFFFFF", color: "#0033A0" }}>
            {vouchers.map((voucher) => (
              <tr key={voucher.id}>
                <td>{voucher.id}</td>
                <td>{voucher.Valor}</td>
                <td>{voucher.fecha_emision}</td>
                <td>{voucher.fecha_expiracion}</td>
                <td>{voucher.fecha_inicio}</td>
                <td>{voucher.fecha_fin}</td>
                <td>{voucher.activo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Vouchers;
