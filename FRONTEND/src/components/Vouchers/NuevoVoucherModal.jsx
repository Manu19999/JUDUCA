import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

const NuevoVoucherModal = ({ isOpen, onClose, refreshVouchers }) => {
  if (!isOpen) return null;  // No renderiza nada si isOpen es false

  const [formData, setFormData] = useState({
    idEvento: "",
    idUniversidad: "",
    idDisenioCredencial: "",
    fechaEmision: "",
    fechaExpiracion: "",
    cantidadDisponible: "",
    fechaInicio: "",
    fechaFinal: "",
    activo: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/api/voucherComida/insVoucher", formData);
      refreshVouchers(); // Recargar los vouchers después de insertar uno nuevo
      onClose(); // Cierra el modal después de guardar
    } catch (error) {
      console.error("Error al insertar el voucher:", error);
    }
  };

  return (
    <Modal show={isOpen} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Nuevo Voucher</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Evento</Form.Label>
            <Form.Control type="text" name="idEvento" value={formData.idEvento} onChange={handleChange} required />
          </Form.Group>
          <Form.Group>
            <Form.Label>Universidad</Form.Label>
            <Form.Control type="text" name="idUniversidad" value={formData.idUniversidad} onChange={handleChange} required />
          </Form.Group>
          <Form.Group>
            <Form.Label>Diseño Credencial</Form.Label>
            <Form.Control type="text" name="idDisenioCredencial" value={formData.idDisenioCredencial} onChange={handleChange} required />
          </Form.Group>
          <Form.Group>
            <Form.Label>Fecha Emisión</Form.Label>
            <Form.Control type="date" name="fechaEmision" value={formData.fechaEmision} onChange={handleChange} required />
          </Form.Group>
          <Form.Group>
            <Form.Label>Fecha Expiración</Form.Label>
            <Form.Control type="date" name="fechaExpiracion" value={formData.fechaExpiracion} onChange={handleChange} required />
          </Form.Group>
          <Form.Group>
            <Form.Label>Cantidad Disponible</Form.Label>
            <Form.Control type="number" name="cantidadDisponible" value={formData.cantidadDisponible} onChange={handleChange} required />
          </Form.Group>
          <Form.Group>
            <Form.Label>Fecha Inicio</Form.Label>
            <Form.Control type="date" name="fechaInicio" value={formData.fechaInicio} onChange={handleChange} required />
          </Form.Group>
          <Form.Group>
            <Form.Label>Fecha Fin</Form.Label>
            <Form.Control type="date" name="fechaFinal" value={formData.fechaFinal} onChange={handleChange} required />
          </Form.Group>
          <Form.Group>
            <Form.Check type="checkbox" label="Activo" name="activo" checked={formData.activo} onChange={handleChange} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Guardar
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default NuevoVoucherModal;