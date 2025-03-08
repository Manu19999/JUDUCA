import React from "react";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import { FaArrowLeft } from "react-icons/fa";
import Nav from "../../components/Dashboard/navDashboard";

// Importa las imágenes que usarás para las cajas
import VoucherImage from "../../../src/assets/Voucher.jpg"; 
import NuevoVoucherImage from "../../../src/assets/Vouchernuevo.jpg"; 

import "../../styles/Vouchers/CajaVoucher.css";

const CajaVouchers = () => {
  const navigate = useNavigate(); // Hook para la navegación

  // Define las cajas que se mostrarán
  const items = [
    {
      id: 1,
      title: "Voucher",
      image: VoucherImage,
      description: "Gestión de vouchers existentes.",
      route: "/voucher", 
    },
    {
      id: 2,
      title: "Nuevo Voucher",
      image: NuevoVoucherImage,
      description: "Crear un nuevo voucher.",
      route: "/nuevo-voucher", 
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
          <h2 className="caja-vouchers-title">Gestión de Vouchers</h2>
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

export default CajaVouchers;