import React, { useState, useEffect } from "react";
import axios from "axios";
import Tabla from "../components/Crud/Tabla";
import Nav from '../components/Dashboard/navDashboard';
import NuevoVoucherModal from "../components/Vouchers/NuevoVoucherModal"; // Importa el modal
import BotonesAccion from '../components/Crud/BotonesAccion';

import { FaEdit, FaTrashAlt, FaReceipt, FaPlus } from "react-icons/fa"; // Importamos el icono para el botón Nuevo

const Voucher = () => {
  const [vouchers, setVouchers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onNuevoRegistro = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const fetchVouchers = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/voucherComida");
      setVouchers(response.data);
    } catch (error) {
      console.error("Error al obtener los vouchers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVouchers();
  }, []);

  const formatDate = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString('es-ES');
  };

  const formatActiveStatus = (active) => {
    return active ? "Activo" : "Inactivo";
  };

  const columnas = [
    { nombre: "ID", campo: "autoIncrementId", ancho: "7%" }, // Cambiamos el campo a "autoIncrementId"
    { nombre: "Evento", campo: "nombreEvento", ancho: "17%" }, 
    { nombre: "Universidad", campo: "nombreUniversidad", ancho: "25%" },
    { nombre: "Diseño Credencial", campo: "idDisenioCredencial", ancho: "15%" },
    { nombre: "Fecha Emisión", campo: "fechaEmision", ancho: "19%" },
    { nombre: "Fecha Expiración", campo: "fechaExpiracion", ancho: "19%" },
    { nombre: "Cantidad Disponible", campo: "cantidadDisponible", ancho: "19%" },
    { nombre: "Fecha Inicio", campo: "fechaInicio", ancho: "19%" },
    { nombre: "Fecha Fin", campo: "fechaFinal", ancho: "19%" },
    { nombre: "Activo", campo: "activo", ancho: "15%" },
    { nombre: "Acción", campo: "accion", ancho: "15%" },
  
  ];
<BotonesAccion
  onNuevoRegistro={onNuevoRegistro}  // Esto pasa la función al botón
 
/>

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

  const voucherConAccion = vouchers.map((voucher, index) => ({
    ...voucher,
    autoIncrementId: index + 1, // Generamos un número autoincrementado
    accion: customActions(voucher.idVoucherComida),
    fechaEmision: formatDate(voucher.fechaEmision),
    fechaExpiracion: formatDate(voucher.fechaExpiracion),
    fechaInicio: formatDate(voucher.fechaInicio),
    fechaFinal: formatDate(voucher.fechaFinal),
    activo: formatActiveStatus(voucher.activo),
  }));
  // Define refreshVouchers
  const refreshVouchers = () => {
    fetchVouchers(); // Llama a fetchVouchers para actualizar la lista
  };
  const handleAddNewVoucher = () => {
    // Lógica para manejar la creación de un nuevo voucher
    console.log("Añadir nuevo voucher");
    // Redirige a una nueva página o abre un formulario
  };

  return (
    <div className="crud">
      <Nav />
     
      
      {/* Botón para añadir un nuevo voucher */}
      <div className="crud">
      <Nav />
      <div style={{ maxWidth: '1160px', margin: '0 auto', padding: '0 15px', right: '0' }}>
        <div style={{ 
          display: 'flex', 
          flexDirection: window.innerWidth < 768 ? 'column' : 'row', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          marginBottom: '1rem' 
        }}>
          <h2 style={{ margin: 0, marginBottom: window.innerWidth < 768 ? '10px' : '0' }}>
            <FaReceipt className="icono-titulo" /> Gestión de voucher
          </h2>
        </div>

        {loading ? (
          <p>Cargando...</p>
        ) : (
          vouchers.length > 0 ? (
            <Tabla 
              columnas={columnas} 
              datos={voucherConAccion} 
              onNuevoRegistro={onNuevoRegistro} // Pasa la función aquí
            />
          ) : (
            <p>No se encontraron vouchers.</p>
          )
        )}
      </div>
      <NuevoVoucherModal isOpen={isModalOpen} onClose={handleCloseModal}  refreshVouchers={refreshVouchers} />
    </div>


    </div>
    
  );
  
};

export default Voucher;