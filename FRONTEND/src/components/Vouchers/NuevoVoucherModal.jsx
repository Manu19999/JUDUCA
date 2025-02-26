import React, { useState, useEffect } from "react";

import { Form, Button } from "react-bootstrap";
import axios from "axios";
import ModalNuevo from "../Crud/Modales"; // Importa el componente ModalNuevo


const NuevoVoucherModal = ({ isOpen, onClose, refreshVouchers, modoEdicion, registroSeleccionado }) => {

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
 // Efecto para cargar los datos del registro seleccionado en modo edición
 useEffect(() => {
  if (modoEdicion && registroSeleccionado) {
    setFormData(registroSeleccionado);
  } else {
    setFormData({
      idVoucher: "",
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
  }
}, [modoEdicion, registroSeleccionado]);

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
      if (modoEdicion) {
        // Lógica para actualizar
        await axios.put("http://localhost:4000/api/vouchers/actualizar", formData);
      } else {
        // Lógica para crear
        await axios.post("http://localhost:4000/api/voucherComida/insVoucher", formData);
      }
      refreshVouchers(); // Recargar los vouchers
      onClose(); // Cierra el modal
    } catch (error) {
      console.error("Error al guardar el voucher:", error);
    }
  };

 
    return (
      <>
        {modoEdicion ? (
          <ModalEditar show={isOpen} onHide={onClose} titulo="Editar Voucher" onGuardar={handleSubmit}>
            <Form>
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
            </Form>
          </ModalEditar>
        ) : (
          <ModalNuevo show={isOpen} onHide={onClose} titulo="Nuevo Voucher" onGuardar={handleSubmit}>
            <Form>
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
            </Form>
          </ModalNuevo>
        )}
      </>
  );
  
};

export default NuevoVoucherModal;