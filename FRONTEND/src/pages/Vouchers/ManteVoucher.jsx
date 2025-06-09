import React from "react";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import { FaArrowLeft } from "react-icons/fa";
import Nav from "../../components/Dashboard/navDashboard";

// Importa las imágenes que usarás para las cajas
import VoucherImage from "../../../src/assets/Voucher.jpg"; 
import NuevoVoucherImage from "../../../src/assets/Vouchernuevo.jpg"; 

import "../../styles/Vouchers/CajaVoucher.css";

const Mantenimientosvoucher = () => {
  const navigate = useNavigate(); // Hook para la navegación

  // Define las cajas que se mostrarán
  const items = [
    {
      id: 1,
      title: "Asignación de Vouchers",
      image: VoucherImage,
      description: "Gestionar los comedores.",
      route: "/voucher", 
    },
    {
      id: 2,
      title: "Consumo de Vouchers",
      image: NuevoVoucherImage,
      description: "Crear un nuevo voucher.",
      route: "/nuevo-voucher", 
    },
     {
      id: 3,
      title: "Ubicación de comedor",
      image: NuevoVoucherImage,
      description: "tablas Mantenimiento de vouchers.",
      route: "/Mantenimientosvoucher", 
    },
       {
      id: 4,
      title: "Ubicación de comedor",
      image: NuevoVoucherImage,
      description: "tablas Mantenimiento de vouchers.",
      route: "/Mantenimientosvoucher", 
    },
{
      id: 5,
      title: "Comedores",
      image: NuevoVoucherImage,
      description: "tablas Mantenimiento de vouchers.",
      route: "/Mantenimientosvoucher", 
    },
    {
      id: 6,
      title: "Tipo de comida",
      image: NuevoVoucherImage,
      description: "tablas Mantenimiento de vouchers.",
      route: "/Mantenimientosvoucher", 
    },
 {
      id: 7,
      title: "Comedor ficha",
      image: NuevoVoucherImage,
      description: "tablas Mantenimiento de vouchers.",
      route: "/Mantenimientosvoucher", 
    },
  ];

  // Función para manejar el clic en una imagen
  const handleImageClick = (route) => {
    navigate(route); // Navega a la ruta especificada
  };

  return (
    <section id="caja-voucher" className="caja-vouchers-container">
      <Container>
        <Nav />
        {/* Botón para regresar al dashboard */}
        <div className="crud">
          <Button
            variant="outline-warning"
            onClick={() => navigate("/gestion-evento")} // Navega a la gestión de eventos
            className="d-flex align-items-center gap-2"
            style={{ marginTop: '55px' }}
          >
            <FaArrowLeft size={20} /> Regresar
          </Button>
          <h2 className="caja-vouchers-title">Mantenimientos de Vouchers</h2>
          <div className="caja-vouchers-grid">
            {/* Mapea las cajas */}
            {items.map((item) => (
              <div key={item.id} className="caja-vouchers-card">
                <img
                  src={item.image}
                  alt={item.title}
                  className="caja-vouchers-image"
                  onClick={() => handleImageClick(item.route)} // Navega al hacer clic
                />
                <h3>{item.title}</h3>
                <p className="eventdescription">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Mantenimientosvoucher;