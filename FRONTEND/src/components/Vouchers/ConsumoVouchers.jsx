import React, { useState } from "react";
import Tabla from "../Crud/Tabla";  // Asegúrate de que el componente Tabla esté bien importado
import Nav from "../Dashboard/navDashboard";
import { FaUser, FaEdit, FaTrashAlt } from "react-icons/fa";  // Importamos los iconos

const ConsumosVouchers = () => {
  const consumos = [
    { id: 1, id_voucher_comida: 101, id_credencial: "JUAN LOPES", id_comedor: "VOAE", id_tipo_comida: "DESAYUNO", id_usuario: "ADMIN", fecha_consumo: "2025-02-14 08:30:00", cantidad_utilizada: 1 },
    { id: 2, id_voucher_comida: 102, id_credencial: "CARLOS SUAZO", id_comedor: "PARQUE CENTRAL", id_tipo_comida: "ALMUERZO", id_usuario: "ADMIN", fecha_consumo: "2025-02-14 12:15:00", cantidad_utilizada: 2 },
    { id: 3, id_voucher_comida: 103, id_credencial: "JUAN LOPES", id_comedor: "VOAE", id_tipo_comida: "CENA", id_usuario: "ADMIN", fecha_consumo: "2025-02-14 19:00:00", cantidad_utilizada: 1 },
  ];

  const columnas = [
    { nombre: "N", campo: "id", ancho: "5%" },
    { nombre: "Voucher Comida", campo: "id_voucher_comida", ancho: "15%" },
    { nombre: "Credencial", campo: "id_credencial", ancho: "15%" },
    { nombre: "Comedor", campo: "id_comedor", ancho: "10%" },
    { nombre: "Tipo Comida", campo: "id_tipo_comida", ancho: "10%" },
    { nombre: "Usuario", campo: "id_usuario", ancho: "10%" },
    { nombre: "Fecha Consumo", campo: "fecha_consumo", ancho: "20%" },
    { nombre: "Cantidad Utilizada", campo: "cantidad_utilizada", ancho: "10%" },
    { nombre: "Acción", campo: "accion", ancho: "15%" },
  ];

  const handleEdit = (id) => {
    console.log("Editar consumo con id:", id);
    // Aquí puedes agregar la lógica de edición
  };

  const handleDelete = (id) => {
    console.log("Eliminar consumo con id:", id);
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

  const consumosConAccion = consumos.map((consumo) => ({
    ...consumo,
    accion: customActions(consumo.id),
  }));

  return (
    <div className="App">
      <Nav />
      <h2>
        <FaUser className="icono-titulo" /> Gestión de Consumos de Vouchers
      </h2>
      <Tabla columnas={columnas} datos={consumosConAccion} />
    </div>
  );
};

export default ConsumosVouchers;
