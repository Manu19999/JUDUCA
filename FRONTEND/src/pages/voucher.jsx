import React, { useState, useEffect } from "react";
import axios from "axios";
import Tabla from "../components/Crud/Tabla";
import Nav from '../components/Dashboard/navDashboard';
import NuevoVoucherModal from "../components/Vouchers/NuevoVoucherModal";
import ModalEditar from '../components/Crud/Modal/ModalEditar';
import ModalConfirmacion from '../components/Crud/Modal/ModalConfirmacion';
import { Form, Input, Select, Checkbox } from 'antd';
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaEdit, FaTrashAlt, FaReceipt } from "react-icons/fa";
import BotonRegresar from "../components/Dashboard/BotonRegresar";
const Voucher = () => {
  const navigate = useNavigate();
  const [vouchers, setVouchers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formEditar] = Form.useForm();
  const [registroSeleccionado, setRegistroSeleccionado] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
const [eventos, setEventos] = useState([]);
const [universidades, setUniversidades] = useState([]);
const [diseniosCredenciales, setDiseniosCredenciales] = useState([]);
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
  const fetchDatosSelect = async () => {
    try {
       const [eventosRes, universidadesRes, diseniosRes] = await Promise.all([
          fetch('http://localhost:4000/api/eventos', { credentials: 'include' }),
          fetch('http://localhost:4000/api/universidades', { credentials: 'include' }),
          fetch('http://localhost:4000/api/credencial/diseniosCredenciales', { credentials: 'include' })
        ]);

      setEventos(resEventos.data);
      setUniversidades(resUni.data);
      setDiseniosCredenciales(resDisenios.data);
    } catch (error) {
      console.error('Error cargando datos para selects', error);
    }
  };
  fetchDatosSelect();
}, []);
  useEffect(() => {
    fetchVouchers();
  }, []);

  const formatDate = (date) => new Date(date).toLocaleDateString('es-ES');
  const formatActiveStatus = (activo) => activo ? "Activo" : "Inactivo";

  const handleNuevoRegistro = () => setIsModalOpen(true);
  const handleCloseNuevo = () => setIsModalOpen(false);

  const handleEdit = (id) => {
    const voucher = vouchers.find((v) => v.idVoucherComida === id);
    setRegistroSeleccionado(voucher);
    formEditar.setFieldsValue(voucher);
    setShowEditModal(true);
  };

  const handleCerrarEditModal = () => {
    setShowEditModal(false);
    setRegistroSeleccionado(null);
    formEditar.resetFields();
  };

  const handleDelete = (id) => {
    const voucher = vouchers.find((v) => v.idVoucherComida === id);
    setRegistroSeleccionado(voucher);
    setShowDeleteModal(true);
  };

  const handleConfirmarDelete = async () => {
    try {
      await axios.delete(`http://localhost:4000/api/voucherComida/${registroSeleccionado.idVoucherComida}`);
      fetchVouchers();
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error eliminando voucher:", error);
    }
  };

  const customActions = (id) => (
    <div className="d-flex gap-2 justify-content-center">
      <Button variant="outline-primary" size="sm" onClick={() => handleEdit(id)}>
        <FaEdit />
      </Button>
      <Button variant="outline-danger" size="sm" onClick={() => handleDelete(id)}>
        <FaTrashAlt />
      </Button>
    </div>
  );

  const voucherConAccion = vouchers.map((voucher, index) => ({
    ...voucher,
    autoIncrementId: index + 1,
    accion: customActions(voucher.idVoucherComida),
    fechaEmision: formatDate(voucher.fechaEmision),
    fechaExpiracion: formatDate(voucher.fechaExpiracion),
    fechaInicio: formatDate(voucher.fechaInicio),
    fechaFinal: formatDate(voucher.fechaFinal),
    activo: formatActiveStatus(voucher.activo),
  }));

  const columnas = [
    { nombre: "ID", campo: "autoIncrementId", ancho: "5%" },
    { nombre: "Evento", campo: "nombreEvento", ancho: "17%" },
    { nombre: "Universidad", campo: "nombreUniversidad", ancho: "20%" },
    { nombre: "Fecha Emisión", campo: "fechaEmision", ancho: "10%" },
    { nombre: "Fecha Expiración", campo: "fechaExpiracion", ancho: "10%" },
    { nombre: "Cantidad Disponible", campo: "cantidadDisponible", ancho: "10%" },
    { nombre: "Fecha Inicio", campo: "fechaInicio", ancho: "10%" },
    { nombre: "Fecha Fin", campo: "fechaFinal", ancho: "10%" },
    { nombre: "Activo", campo: "activo", ancho: "8%" },
    { nombre: "Acción", campo: "accion", ancho: "10%" },
  ];

  return (
    <div className="crud">
      <Nav />
      <BotonRegresar to="/vouchers" text="Regresar"  />
      <div className="container mt-4">
        
       <h2><FaReceipt className="icono-titulo" /> Gestión de Vouchers</h2>
        {loading ? (
          <p>Cargando...</p>
        ) : (
          <Tabla
            columnas={columnas}
            datos={voucherConAccion}
           
            onNuevoRegistro={handleNuevoRegistro}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>

      {/* Modal: Nuevo Voucher */}
      <NuevoVoucherModal
        isOpen={isModalOpen}
        onClose={handleCloseNuevo}
        refreshVouchers={fetchVouchers}
      />

      {/* Modal: Editar Voucher */}
<ModalEditar
  show={showEditModal}
  onHide={handleCerrarEditModal}
  titulo="Editar Voucher"
  onGuardar={() => formEditar.submit()}
  form={formEditar}
  registroSeleccionado={registroSeleccionado}
  width={500}
>
  <Form
    layout="vertical"
    form={formEditar}
    initialValues={{
      idEvento: registroSeleccionado?.idEvento,
      idUniversidad: registroSeleccionado?.idUniversidad,
      idDisenioCredencial: registroSeleccionado?.idDisenioCredencial,
      fechaEmision: registroSeleccionado?.fechaEmision?.slice(0,10), // para input date
      fechaExpiracion: registroSeleccionado?.fechaExpiracion?.slice(0,10),
      cantidadDisponible: registroSeleccionado?.cantidadDisponible,
      fechaInicio: registroSeleccionado?.fechaInicio?.slice(0,10),
      fechaFinal: registroSeleccionado?.fechaFinal?.slice(0,10),
      activo: registroSeleccionado?.activo,
    }}
    onFinish={async (values) => {
      try {
        // Agregamos idVoucherComida para la actualización
        const payload = { idVoucherComida: registroSeleccionado.idVoucherComida, ...values };

        // Llamada al backend para actualizar
        await axios.put('http://localhost:4000/api/voucherComida', payload);

        // Refrescar lista y cerrar modal
        fetchVouchers();
        handleCerrarEditModal();
      } catch (error) {
        console.error("Error actualizando voucher:", error);
      }
    }}
  >
    <Form.Item
  label="Evento"
  name="idEvento"
  rules={[{ required: true, message: "Seleccione un evento" }]}
>
  <Select placeholder="Seleccione un evento" allowClear>
    {eventos.map((e) => (
      <Select.Option key={e.idEvento} value={e.idEvento}>
        {e.nombreEvento}
      </Select.Option>
    ))}
  </Select>
</Form.Item>

<Form.Item
  label="Universidad"
  name="idUniversidad"
  rules={[{ required: true, message: "Seleccione una universidad" }]}
>
  <Select placeholder="Seleccione una universidad" allowClear>
    {universidades.map((u) => (
      <Select.Option key={u.idUniversidad} value={u.idUniversidad}>
        {u.nombreUniversidad}
      </Select.Option>
    ))}
  </Select>
</Form.Item>

<Form.Item
  label="Diseño de Credencial"
  name="idDisenioCredencial"
  rules={[{ required: true, message: "Seleccione un diseño" }]}
>
  <Select placeholder="Seleccione un diseño" allowClear>
    {diseniosCredenciales.map((d) => (
      <Select.Option key={d.idDisenioCredencial} value={d.idDisenioCredencial}>
        {d.nombreDisenio}
      </Select.Option>
    ))}
  </Select>
</Form.Item>

<Form.Item
  label="Activo"
  name="activo"
  valuePropName="checked"
>
  <Checkbox />
</Form.Item>

    <Form.Item
      label="Fecha Emisión"
      name="fechaEmision"
      rules={[{ required: true, message: "Campo obligatorio" }]}
    >
      <Input type="date" />
    </Form.Item>

    <Form.Item
      label="Fecha Expiración"
      name="fechaExpiracion"
      rules={[{ required: true, message: "Campo obligatorio" }]}
    >
      <Input type="date" />
    </Form.Item>

    <Form.Item
      label="Cantidad Disponible"
      name="cantidadDisponible"
      rules={[{ required: true, message: "Campo obligatorio" }]}
    >
      <Input type="number" />
    </Form.Item>

    <Form.Item
      label="Fecha Inicio"
      name="fechaInicio"
      rules={[{ required: true, message: "Campo obligatorio" }]}
    >
      <Input type="date" />
    </Form.Item>

    <Form.Item
      label="Fecha Final"
      name="fechaFinal"
      rules={[{ required: true, message: "Campo obligatorio" }]}
    >
      <Input type="date" />
    </Form.Item>

    <Form.Item
      label="Activo"
      name="activo"
      valuePropName="checked"
      rules={[{ required: true, message: "Campo obligatorio" }]}
    >
      <input type="checkbox" />
    </Form.Item>
  </Form>
</ModalEditar>


      {/* Modal: Confirmar eliminación */}
      <ModalConfirmacion
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        onConfirmar={handleConfirmarDelete}
        mensaje={`¿Estás seguro de eliminar el voucher del evento "${registroSeleccionado?.nombreEvento}"?`}
      />
    </div>
  );
};

export default Voucher;
