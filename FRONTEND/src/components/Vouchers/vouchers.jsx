import React, { useState } from "react";
import Tabla from "../Crud/Tabla";
import Nav from "../Dashboard/navDashboard";
import { FaUser, FaEdit, FaTrashAlt } from "react-icons/fa";  // Importamos los iconos


const Vouchers = () => {
  const vouchers = [
    { id: 1, valor: "00.00", fecha_emision: "2025-02-14", fecha_expiracion: "2025-02-14", fecha_inicio: "2025-02-14 08:00:00", fecha_fin: "2025-02-14 11:59:00", activo: "Expirado"  },
    { id: 2, valor: "00.00", fecha_emision: "2025-02-14", fecha_expiracion: "2025-02-14", fecha_inicio: "2025-02-14 12:00:00", fecha_fin: "2025-02-14 15:00:00", activo: "Activo"},
    { id: 3, valor: "00.00", fecha_emision: "2025-02-14", fecha_expiracion: "2025-02-14", fecha_inicio: "2025-02-14 18:00:00", fecha_fin: "2025-02-14 22:00:00", activo: "Activo" },
    { id: 4, valor: "00.00", fecha_emision: "2025-02-14", fecha_expiracion: "2025-02-14", fecha_inicio: "2025-02-14 08:00:00", fecha_fin: "2025-02-14 11:59:00", activo: "Expirado" },
    { id: 5, valor: "00.00", fecha_emision: "2025-02-14", fecha_expiracion: "2025-02-14", fecha_inicio: "2025-02-14 12:00:00", fecha_fin: "2025-02-14 15:00:00", activo: "Activo" },
    { id: 6, valor: "00.00", fecha_emision: "2025-02-14", fecha_expiracion: "2025-02-14", fecha_inicio: "2025-02-14 18:00:00", fecha_fin: "2025-02-14 22:00:00", activo: "Activo" },
    { id: 7, valor: "00.00", fecha_emision: "2025-02-14", fecha_expiracion: "2025-02-14", fecha_inicio: "2025-02-14 08:00:00", fecha_fin: "2025-02-14 11:59:00", activo: "Expirado" },
    { id: 8, valor: "00.00", fecha_emision: "2025-02-14", fecha_expiracion: "2025-02-14", fecha_inicio: "2025-02-14 12:00:00", fecha_fin: "2025-02-14 15:00:00", activo: "Activo" },
    { id: 9, valor: "00.00", fecha_emision: "2025-02-14", fecha_expiracion: "2025-02-14", fecha_inicio: "2025-02-14 18:00:00", fecha_fin: "2025-02-14 22:00:00", activo: "Activo" },
    { id: 10, valor: "00.00", fecha_emision: "2025-02-14", fecha_expiracion: "2025-02-14", fecha_inicio: "2025-02-14 08:00:00", fecha_fin: "2025-02-14 11:59:00", activo: "Expirado" },
    { id: 11, valor: "00.00", fecha_emision: "2025-02-14", fecha_expiracion: "2025-02-14", fecha_inicio: "2025-02-14 12:00:00", fecha_fin: "2025-02-14 15:00:00", activo: "Activo" },
    { id: 12, valor: "00.00", fecha_emision: "2025-02-14", fecha_expiracion: "2025-02-14", fecha_inicio: "2025-02-14 18:00:00", fecha_fin: "2025-02-14 22:00:00", activo: "Activo" },
    { id: 13, valor: "00.00", fecha_emision: "2025-02-14", fecha_expiracion: "2025-02-14", fecha_inicio: "2025-02-14 08:00:00", fecha_fin: "2025-02-14 11:59:00", activo: "Expirado" },
    { id: 14, valor: "00.00", fecha_emision: "2025-02-14", fecha_expiracion: "2025-02-14", fecha_inicio: "2025-02-14 12:00:00", fecha_fin: "2025-02-14 15:00:00", activo: "Activo" },
    { id: 15, valor: "00.00", fecha_emision: "2025-02-14", fecha_expiracion: "2025-02-14", fecha_inicio: "2025-02-14 18:00:00", fecha_fin: "2025-02-14 22:00:00", activo: "Activo" },
  ];

  const columnas = [
    { nombre: "ID", campo: "id", ancho: "5%" },
    { nombre: "Valor", campo: "valor", ancho: "10%" },
    { nombre: "Fecha Emisión", campo: "fecha_emision", ancho: "15%" },
    { nombre: "Fecha Expiración", campo: "fecha_expiracion", ancho: "15%" },
    { nombre: "Fecha Inicio", campo: "fecha_inicio", ancho: "15%" },
    { nombre: "Fecha Fin", campo: "fecha_fin", ancho: "15%" },
    { nombre: "Estado", campo: "activo", ancho: "10%" },
    { nombre: "Acción", campo: "accion", ancho: "15%" },
  ];
  const handleEdit = (id) => {
    console.log("Editar voucher con id:", id);
    // Aquí puedes agregar la lógica de edición
  };

  const handleDelete = (id) => {
    console.log("Eliminar voucher con id:", id);
    // Aquí puedes agregar la lógica de eliminación
  };

  const customActions = (id) => (
    <div>
      <button 
        onClick={() => handleEdit(id)} 
        className="btn btn-outline-warning mx-1"
      >
        <FaEdit />
      </button>
      <button 
        onClick={() => handleDelete(id)} 
        className="btn btn-outline-danger mx-1"
      >
        <FaTrashAlt />
      </button>
    </div>
  );

  const vouchersConAccion = vouchers.map((voucher) => ({
    ...voucher,
    accion: customActions(voucher.id),
  }));

  return (
    <div className="App">
      <Nav />
      <h2>
        <FaUser className="icono-titulo" /> Gestión de Vouchers
      </h2>
      <Tabla columnas={columnas} datos={vouchersConAccion} />
    </div>
  );
};

export default Vouchers;
