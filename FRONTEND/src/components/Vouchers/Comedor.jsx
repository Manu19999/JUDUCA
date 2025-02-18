import React from "react";
import Tabla from "../Crud/Tabla"; // Asumimos que tienes este componente
import Nav from "../Dashboard/navDashboard";
import { FaEdit, FaTrashAlt } from "react-icons/fa";  // Iconos para editar y eliminar

const Comedor = () => {
  const comedores = [
    { id: 1, id_ubicacion: "POLIDEPORTIVO", numero: 5, capacidad: 100, activo: "Sí" },
    { id: 2, id_ubicacion: "CANCHA DE BALONCESTO", numero: 10, capacidad: 200, activo: "No" },
    { id: 3, id_ubicacion: "POLIDEPORTIVO", numero: 15, capacidad: 150, activo: "Sí" },
  ];

  const columnas = [
    { nombre: "N", campo: "id", ancho: "10%" },
    { nombre: "Ubicación", campo: "id_ubicacion", ancho: "20%" },
    { nombre: "Número", campo: "numero", ancho: "15%" },
    { nombre: "Capacidad", campo: "capacidad", ancho: "20%" },
    { nombre: "Activo", campo: "activo", ancho: "15%" },
    { nombre: "Acción", campo: "accion", ancho: "20%" },
  ];

  const handleEdit = (id) => {
    console.log("Editar comedor con id:", id);
    // Lógica de edición
  };

  const handleDelete = (id) => {
    console.log("Eliminar comedor con id:", id);
    // Lógica de eliminación
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

  const comedoresConAccion = comedores.map((comedor) => ({
    ...comedor,
    accion: customActions(comedor.id),
  }));

  return (
    <div className="App">
      <Nav />
      <h2>Gestión de Comedores</h2>
      <Tabla columnas={columnas} datos={comedoresConAccion} />
    </div>
  );
};

export default Comedor;
