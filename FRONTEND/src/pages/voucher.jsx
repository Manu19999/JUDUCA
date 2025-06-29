import React, { useState, useEffect } from "react";
import axios from "axios";
import Tabla from "../components/Crud/Tabla";
import Nav from '../components/Dashboard/navDashboard';
import ModalEditar from '../components/Crud/Modal/ModalEditar';
import ModalConfirmacion from '../components/Crud/Modal/ModalConfirmacion';
import { Form, Input, Select, Checkbox, Row, Col, message } from 'antd';
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaEdit, FaTrashAlt, FaReceipt } from "react-icons/fa";
import BotonRegresar from "../components/Dashboard/BotonRegresar";





const { Option } = Select;

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
          axios.get('http://localhost:4000/api/eventos', { withCredentials: true }),
          axios.get('http://localhost:4000/api/universidades', { withCredentials: true }),
          axios.get('http://localhost:4000/api/credencial/diseniosCredenciales', { withCredentials: true })
        ]);

        setEventos(eventosRes.data.data || eventosRes.data);
        setUniversidades(universidadesRes.data.data || universidadesRes.data);
        setDiseniosCredenciales((diseniosRes.data.data || diseniosRes.data).map(d => ({
          ...d,
          idDisenioCredencial: d.idDisenioCredencial ?? d.idDiseñoCredencial,
        })));
      } catch (error) {
        console.error('Error cargando datos para selects', error);
      }
    };
    
    fetchDatosSelect();
    fetchVouchers();
  }, []);

  const formatDate = (date) => new Date(date).toLocaleDateString('es-ES');
  const formatActiveStatus = (activo) => activo ? "Activo" : "Inactivo";



  const handleEdit = (id) => {
    const voucher = vouchers.find((v) => v.idVoucherComida === id);
    setRegistroSeleccionado(voucher);
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
    await axios.delete(
      `http://localhost:4000/api/voucherComida/${registroSeleccionado.idVoucherComida}`,
      {
        withCredentials: true // 👈 Esto es clave para enviar la cookie de autenticación
      }
    );
    fetchVouchers();
    setShowDeleteModal(false);
  } catch (error) {
    console.error("Error eliminando voucher:", error);
    alert("No tienes permiso para eliminar este voucher o tu sesión ha expirado.");
  }
};


  // CORRECCIÓN: Implementar acciones directamente en las columnas
  const columnas = [
    { 
      nombre: "ID", 
      campo: "idVoucherComida", 
      ancho: "5%",
      render: (value, record) => record.autoIncrementId
    },
    { nombre: "Evento", campo: "nombreEvento", ancho: "17%" },
    { nombre: "Universidad", campo: "nombreUniversidad", ancho: "20%" },
    { nombre: "Fecha Emisión", campo: "fechaEmision", ancho: "10%", render: formatDate },
    { nombre: "Fecha Expiración", campo: "fechaExpiracion", ancho: "10%", render: formatDate },
    { nombre: "Cantidad Disponible", campo: "cantidadDisponible", ancho: "10%" },
    { nombre: "Fecha Inicio", campo: "fechaInicio", ancho: "10%", render: formatDate },
    { nombre: "Fecha Fin", campo: "fechaFinal", ancho: "10%", render: formatDate },
    { 
      nombre: "Activo", 
      campo: "activo", 
      ancho: "8%",
      render: formatActiveStatus 
    },
    { 
      nombre: "Acción", 
      ancho: "10%",
      render: (_, record) => (
        <div className="d-flex gap-2 justify-content-center">
          <Button variant="outline-primary" size="sm" onClick={() => handleEdit(record.idVoucherComida)}>
            <FaEdit />
          </Button>
          <Button variant="outline-danger" size="sm" onClick={() => handleDelete(record.idVoucherComida)}>
            <FaTrashAlt />
          </Button>
        </div>
      )
    },
  ];

  // CORRECCIÓN: Preparar datos sin incluir los botones en los datos
  const datosTabla = vouchers.map((voucher, index) => ({
    ...voucher,
    autoIncrementId: index + 1
  }));

  // Establecer valores del formulario cuando se abre el modal de edición
  useEffect(() => {
    if (showEditModal && registroSeleccionado) {
      // Formatear fechas para input type="date"
      const formatDateForInput = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
      };

      formEditar.setFieldsValue({
        idEvento: registroSeleccionado.idEvento,
        idUniversidad: registroSeleccionado.idUniversidad,
        idDisenioCredencial: registroSeleccionado.idDisenioCredencial,
        fechaEmision: formatDateForInput(registroSeleccionado.fechaEmision),
        fechaExpiracion: formatDateForInput(registroSeleccionado.fechaExpiracion),
        cantidadDisponible: registroSeleccionado.cantidadDisponible,
        fechaInicio: formatDateForInput(registroSeleccionado.fechaInicio),
        fechaFinal: formatDateForInput(registroSeleccionado.fechaFinal),
        activo: registroSeleccionado.activo
      });
    }
  }, [showEditModal, registroSeleccionado, formEditar]);

  return (
    <div className="crud">
      <Nav />
      <BotonRegresar to="/vouchers" text="Regresar" />
      <div className="container mt-4">
        <h2 className="d-flex align-items-center">
          <FaReceipt className="icono-titulo me-2" /> Gestión de Vouchers
        </h2>
        {loading ? (
          <div className="text-center my-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
            <p className="mt-2">Cargando vouchers...</p>
          </div>
        ) : (
          <Tabla
            columnas={columnas}
            datos={datosTabla}
            
          />
        )}
      </div>

 

  


const { Option } = Select;

<ModalEditar
  show={showEditModal}
  onHide={handleCerrarEditModal}
  titulo="Editar Voucher"
  onGuardar={() => formEditar.submit()}
  form={formEditar}
  registroSeleccionado={registroSeleccionado}
  width={600}
>
  <Form
    layout="vertical"
    form={formEditar}
    onFinish={async (values) => {
      try {
        const payload = {
          idVoucherComida: registroSeleccionado.idVoucherComida,
          ...values
        };
        await axios.put(
          'http://localhost:4000/api/voucherComida/actuVoucher',
          payload,
          { withCredentials: true }
        );
        message.success("Voucher actualizado correctamente");
        fetchVouchers();
        handleCerrarEditModal();
      } catch (error) {
        console.error("Error actualizando voucher:", error.response?.data || error.message);
        message.error("Error al actualizar el voucher");
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
          <Option key={e.idEvento} value={e.idEvento}>
            {e.nombreEvento}
          </Option>
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
          <Option key={u.idUniversidad} value={u.idUniversidad}>
            {u.nombreUniversidad}
          </Option>
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
          <Option key={d.idDisenioCredencial} value={d.idDisenioCredencial}>
            {d.nombreDisenio}
          </Option>
        ))}
      </Select>
    </Form.Item>

    <Row gutter={16}>
      <Col span={12}>
        <Form.Item
          label="Fecha Emisión"
          name="fechaEmision"
          rules={[{ required: true, message: "Campo obligatorio" }]}
        >
          <Input type="date" />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          label="Fecha Expiración"
          name="fechaExpiracion"
          rules={[{ required: true, message: "Campo obligatorio" }]}
        >
          <Input type="date" />
        </Form.Item>
      </Col>
    </Row>

    <Row gutter={16}>
      <Col span={12}>
        <Form.Item
          label="Fecha Inicio"
          name="fechaInicio"
          rules={[{ required: true, message: "Campo obligatorio" }]}
        >
          <Input type="date" />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          label="Fecha Final"
          name="fechaFinal"
          rules={[{ required: true, message: "Campo obligatorio" }]}
        >
          <Input type="date" />
        </Form.Item>
      </Col>
    </Row>

    <Row gutter={16}>
      <Col span={12}>
        <Form.Item
          label="Cantidad Disponible"
          name="cantidadDisponible"
          rules={[{ required: true, message: "Campo obligatorio" }]}
        >
          <Input type="number" min={1} />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          label="Activo"
          name="activo"
          valuePropName="checked"
          className="mt-4"
        >
          <Checkbox />
        </Form.Item>
      </Col>
    </Row>
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