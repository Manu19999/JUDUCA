import React, { useState, useEffect } from 'react';
import Nav from '../../components/Dashboard/navDashboard';
import '../../styles/Vouchers/VoucherForm.css'; // Importamos el archivo CSS específico para el formulario

const VoucherForm = () => {
  const [formData, setFormData] = useState({
    idEvento: '',
    idUniversidad: '',
    idDisenioCredencial: '',
    fechaEmision: '',
    fechaExpiracion: '',
    cantidadDisponible: '',
    fechaInicio: '',
    fechaFinal: '',
    activo: false,
  });

  const [eventos, setEventos] = useState([]);
  const [universidades, setUniversidades] = useState([]);
  const [diseniosCredenciales, setDiseniosCredenciales] = useState([]);

  // Obtener datos de eventos, universidades y diseños de credenciales
  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventosResponse = await fetch('http://localhost:4000/api/eventos');
        const eventosData = await eventosResponse.json();
        setEventos(eventosData);

        const universidadesResponse = await fetch('http://localhost:4000/api/universidades');
        const universidadesData = await universidadesResponse.json();
        setUniversidades(universidadesData);

        const diseniosResponse = await fetch('http://localhost:4000/api/disenios-credenciales');
        const diseniosData = await diseniosResponse.json();
        setDiseniosCredenciales(diseniosData);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/vouchers-comidas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        alert('Voucher insertado correctamente. ID: ' + result.idVoucherComida);
        // Limpiar el formulario después de la inserción
        setFormData({
          idEvento: '',
          idUniversidad: '',
          idDisenioCredencial: '',
          fechaEmision: '',
          fechaExpiracion: '',
          cantidadDisponible: '',
          fechaInicio: '',
          fechaFinal: '',
          activo: false,
        });
      } else {
        const errorData = await response.json();
        alert('Error al insertar el voucher: ' + errorData.error);
      }
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      alert('Error al enviar el formulario');
    }
  };

  return (
    <div className="voucher-form-container">
      <Nav />
      <h1 className="voucher-form-title">
        <span className="icono-titulo">📋</span> Formulario de Voucher de Comidas
      </h1>
      <form onSubmit={handleSubmit} className="voucher-form">
        <div className="form-row">
          <div className="form-group">
            <label>Evento:</label>
            <select
              name="idEvento"
              value={formData.idEvento}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione un evento</option>
              {eventos.map((evento) => (
                <option key={evento.idEvento} value={evento.idEvento}>
                  {evento.nombreEvento}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Universidad:</label>
            <select
              name="idUniversidad"
              value={formData.idUniversidad}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione una universidad</option>
              {universidades.map((universidad) => (
                <option key={universidad.idUniversidad} value={universidad.idUniversidad}>
                  {universidad.nombreUniversidad}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Diseño de Credencial:</label>
            <select
              name="idDisenioCredencial"
              value={formData.idDisenioCredencial}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione un diseño</option>
              {diseniosCredenciales.map((disenio) => (
                <option key={disenio.idDisenioCredencial} value={disenio.idDisenioCredencial}>
                  {disenio.nombreDisenio}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Fecha de Emisión:</label>
            <input
              type="date"
              name="fechaEmision"
              value={formData.fechaEmision}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Fecha de Expiración:</label>
            <input
              type="date"
              name="fechaExpiracion"
              value={formData.fechaExpiracion}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Cantidad Disponible:</label>
            <input
              type="number"
              name="cantidadDisponible"
              value={formData.cantidadDisponible}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Fecha de Inicio:</label>
            <input
              type="date"
              name="fechaInicio"
              value={formData.fechaInicio}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Fecha Final:</label>
            <input
              type="date"
              name="fechaFinal"
              value={formData.fechaFinal}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group checkbox-group">
            <label>Activo:</label>
            <input
              type="checkbox"
              name="activo"
              checked={formData.activo}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-buttons">
          <button type="submit" className="btn-guardar">
            Guardar
          </button>
          <button type="button" className="btn-cancelar">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default VoucherForm;