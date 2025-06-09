import React, { useState, useEffect } from 'react';
import Nav from '../../components/Dashboard/navDashboard';
import '../../styles/Vouchers/VoucherForm.css';
import BotonRegresar from "../../components/Dashboard/BotonRegresar";
import { FaArrowLeft, FaEdit, FaTrashAlt, FaReceipt } from "react-icons/fa";
const VoucherForm = () => {

  const initialFormState = {
    idEvento: '',
    idUniversidad: '',
    idDisenioCredencial: '',
    fechaEmision: '',
    fechaExpiracion: '',
    cantidadDisponible: '',
    fechaInicio: '',
    fechaFinal: '',
    activo: false,
  };

  const [formData, setFormData] = useState(initialFormState);
  const [eventos, setEventos] = useState([]);
  const [universidades, setUniversidades] = useState([]);
  const [diseniosCredenciales, setDiseniosCredenciales] = useState([]);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [eventosRes, universidadesRes, diseniosRes] = await Promise.all([
          fetch('http://localhost:4000/api/eventos', { credentials: 'include' }),
          fetch('http://localhost:4000/api/universidades', { credentials: 'include' }),
          fetch('http://localhost:4000/api/credencial/diseniosCredenciales', { credentials: 'include' })
        ]);

        if (!eventosRes.ok || !universidadesRes.ok || !diseniosRes.ok) {
          throw new Error('Error en una o más respuestas de la API');
        }

        const eventosData = await eventosRes.json();
        const universidadesData = await universidadesRes.json();
        const diseniosRaw = await diseniosRes.json();

        // Normalizar idDiseñoCredencial a idDisenioCredencial
        const disenios = (diseniosRaw.data || diseniosRaw).map(d => ({
          ...d,
          idDisenioCredencial: d.idDiseñoCredencial, // copiar la ñ a sin ñ
        }));

        setEventos(eventosData.data || eventosData);
        setUniversidades(universidadesData.data || universidadesData);
        setDiseniosCredenciales(disenios);
      } catch (err) {
        console.error('Error al obtener los datos:', err);
        alert('Error al cargar datos de los selectores. Ver consola para más información.');
      }
    };

    fetchAll();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const preparedData = {
      idEvento: parseInt(formData.idEvento, 10),
      idUniversidad: parseInt(formData.idUniversidad, 10),
      idDisenioCredencial: parseInt(formData.idDisenioCredencial, 10),
      fechaEmision: formData.fechaEmision,
      fechaExpiracion: formData.fechaExpiracion,
      cantidadDisponible: parseInt(formData.cantidadDisponible, 10),
      fechaInicio: formData.fechaInicio,
      fechaFinal: formData.fechaFinal,
      activo: !!formData.activo,
    };

    try {
      const response = await fetch('http://localhost:4000/api/voucherComida/insVoucher', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(preparedData),
      });

      const result = await response.json();

      if (response.ok) {
        alert(`✅ Voucher insertado correctamente. ID: ${result?.idVoucherComida ?? 'desconocido'}`);
        setFormData(initialFormState);
      } else {
        alert(`❌ Error al insertar el voucher: ${result?.error ?? 'Error desconocido'}`);
      }
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      alert('Error al enviar el formulario');
    }
  };

  const handleCancel = () => {
    if (window.confirm('¿Estás seguro de que deseas cancelar y limpiar el formulario?')) {
      setFormData(initialFormState);
    }
  };

  return (
    
    
        <div className='Crud' ><h2><center><FaReceipt className="icono-titulo" />  Formulario de Voucher de Comidas</center></h2>
    <div className="voucher-form-container">
     
      <Nav />
      
      <BotonRegresar to="/vouchers" text="Regresar"  />

     
      <form onSubmit={handleSubmit} className="voucher-form">
        <div className="form-row">
          <div className="form-group">
            <label>Evento:</label>
            <select name="idEvento" value={formData.idEvento} onChange={handleChange} required>
              <option value="">Seleccione un evento</option>
              {eventos.map((e) => (
                <option key={e.idEvento} value={e.idEvento}>
                  {e.nombreEvento}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Universidad:</label>
            <select name="idUniversidad" value={formData.idUniversidad} onChange={handleChange} required>
              <option value="">Seleccione una universidad</option>
              {universidades.map((u) => (
                <option key={u.idUniversidad} value={u.idUniversidad}>
                  {u.nombreUniversidad}
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
              {diseniosCredenciales.map((d) => (
                <option key={d.idDisenioCredencial} value={d.idDisenioCredencial}>
                  {d.nombreDisenio}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Fecha de Emisión:</label>
            <input type="date" name="fechaEmision" value={formData.fechaEmision} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Fecha de Expiración:</label>
            <input type="date" name="fechaExpiracion" value={formData.fechaExpiracion} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Cantidad Disponible:</label>
            <input type="number" name="cantidadDisponible" value={formData.cantidadDisponible} onChange={handleChange} required />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Fecha de Inicio:</label>
            <input type="date" name="fechaInicio" value={formData.fechaInicio} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Fecha Final:</label>
            <input type="date" name="fechaFinal" value={formData.fechaFinal} onChange={handleChange} required />
          </div>
          <div className="form-group checkbox-group">
            <label>Activo:</label>
            <input type="checkbox" name="activo" checked={formData.activo} onChange={handleChange} />
          </div>
        </div>

        <div className="form-buttons">
          <button type="submit" className="btn-guardar">Guardar</button>
          <button type="button" className="btn-cancelar" onClick={handleCancel}>Cancelar</button>
        </div>
      </form>
    </div>
    </div> 
  );
  
};

export default VoucherForm;
