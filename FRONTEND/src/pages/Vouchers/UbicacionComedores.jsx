import React, { useState, useEffect } from "react";
import axios from "axios";
import Tabla from "../../components/Crud/Tabla";
import Nav from "../../components/Dashboard/navDashboard";
import BotonRegresar from "../../components/Dashboard/BotonRegresar";
import ModalEditar from "../../components/Crud/Modal/ModalEditar";
import ModalConfirmacion from "../../components/Crud/Modal/ModalConfirmacion";

import { Form, Input, Row, Col, message } from "antd";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { FaArrowLeft, FaEdit, FaTrashAlt, FaReceipt  } from "react-icons/fa";

const UbicacionesComedor = () => {
  const [ubicaciones, setUbicaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formNuevo] = Form.useForm();
  const [formEditar] = Form.useForm();
  const [registroSeleccionado, setRegistroSeleccionado] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

const fetchUbicaciones = async () => {
  try {
    const response = await axios.get("http://localhost:4000/api/ubicacionComedores");

    const ubicacionesConIndex = response.data.map((item, idx) => ({
      ...item,
      index: idx + 1
    }));

    setUbicaciones(ubicacionesConIndex);
  } catch (error) {
    console.error("Error al obtener ubicaciones:", error);
  } finally {
    setLoading(false);
  }
};
  useEffect(() => {
    fetchUbicaciones();
  }, []);

  const handleNuevoRegistro = () => {
    formNuevo.resetFields();
    setIsModalOpen(true);
  };


  const handleCloseNuevo = () => setIsModalOpen(false);

  const handleEdit = (id) => {
    const registro = ubicaciones.find((u) => u.idUbicacionComedor === id);
    setRegistroSeleccionado(registro);
    formEditar.setFieldsValue(registro);
    setShowEditModal(true);
  };

  const handleCerrarEditModal = () => {
    setShowEditModal(false);
    setRegistroSeleccionado(null);
    formEditar.resetFields();
  };

  const handleDelete = (id) => {
    const registro = ubicaciones.find((u) => u.idUbicacionComedor === id);
    setRegistroSeleccionado(registro);
    setShowDeleteModal(true);
  };

const handleConfirmarDelete = async () => {
  try {
    await axios.delete(
      `http://localhost:4000/api/ubicacionComedores/${registroSeleccionado.idUbicacionComedor}`,
      {
        data: {
          idObjeto: 5, // Asegúrate que este valor corresponda a Seguridad.tblObjetos
        },
        withCredentials: true,
      }
    );

    message.success("Ubicación eliminada correctamente");
    fetchUbicaciones();
    setShowDeleteModal(false);
  } catch (error) {
    console.error("Error eliminando ubicación:", error.response?.data || error.message);
    message.error("No se pudo eliminar la ubicación");
  }
};

const columnas = [
{ nombre: "No", campo: "index", ancho: "10%" },

  { nombre: "Nombre", campo: "nombre", ancho: "40%" },
  { nombre: "Dirección", campo: "direccion", ancho: "35%" },
  {
    nombre: "Acción",
    ancho: "15%",
    render: (_, record) => (
      <div className="d-flex gap-2 justify-content-center">
        <Button variant="outline-primary" size="sm" onClick={() => handleEdit(record.idUbicacionComedor)}>
          <FaEdit />
        </Button>
        <Button variant="outline-danger" size="sm" onClick={() => handleDelete(record.idUbicacionComedor)}>
          <FaTrashAlt />
        </Button>
      </div>
    ),
  },
];

  return (
    <div className="container mt-4">
      <Nav />
      <BotonRegresar titulo="Ubicaciones de Comedores" />

 <div className="d-flex justify-content-between align-items-center mb-3 px-1">
  <div style={{ width: "20%" }}></div>
  <div style={{ width: "33%", textAlign: "center" }}>
    <h2 className="d-flex align-items-center">
               Ubicacion de Comedores
            </h2>
  </div>
  <div style={{ width: "20%", textAlign: "left", paddingTop: "50px" }}>
    <Button variant="success" onClick={handleNuevoRegistro}>
      Nueva Ubicación
    </Button>
  </div>
</div>





     
<Tabla columnas={columnas} datos={ubicaciones} loading={loading} />


      {/* Modal de creación */}
      <Modal show={isModalOpen} onHide={handleCloseNuevo} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Nueva Ubicación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            layout="vertical"
            form={formNuevo}
            onFinish={async (values) => {
              try {
                const payload = {
                  nombre: values.nombre,
                  direccion: values.direccion,
                  idObjeto: 5 // Ajustar según Seguridad.tblObjetos
                };

                await axios.post("http://localhost:4000/api/ubicacionComedores", payload, {
                  withCredentials: true
                });

                message.success("Ubicación registrada correctamente");
                formNuevo.resetFields();
                handleCloseNuevo();
                fetchUbicaciones();
              } catch (error) {
                console.error("Error insertando ubicación:", error.response?.data || error.message);
                message.error("No se pudo registrar la ubicación");
              }
            }}
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Nombre"
                  name="nombre"
                  rules={[{ required: true, message: "Campo obligatorio" }]}
                >
                  <Input placeholder="Ej. Comedor Central" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Dirección"
                  name="direccion"
                  rules={[{ required: true, message: "Campo obligatorio" }]}
                >
                  <Input placeholder="Ej. Edificio A, segundo nivel" />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={handleCloseNuevo}>Cancelar</button>
          <button className="btn btn-success" onClick={() => formNuevo.submit()}>Guardar</button>
        </Modal.Footer>
      </Modal>

      {/* Modal de edición */}
      <ModalEditar
        show={showEditModal}
        onHide={handleCerrarEditModal}
        titulo="Editar Ubicación"
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
                idUbicacionComedor: registroSeleccionado.idUbicacionComedor,
                nombre: values.nombre,
                direccion: values.direccion,
                idObjeto: 5 // Ajustar según Seguridad.tblObjetos
              };

              await axios.put("http://localhost:4000/api/ubicacionComedores/actuUbicacion", payload, {
                withCredentials: true
              });

              message.success("Ubicación actualizada correctamente");
              fetchUbicaciones();
              handleCerrarEditModal();
            } catch (error) {
              console.error("Error actualizando ubicación:", error.response?.data || error.message);
              message.error("Error al actualizar la ubicación");
            }
          }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Nombre"
                name="nombre"
                rules={[{ required: true, message: "Campo obligatorio" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Dirección"
                name="direccion"
                rules={[{ required: true, message: "Campo obligatorio" }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </ModalEditar>

      {/* Confirmación eliminación */}
      <ModalConfirmacion
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        onConfirmar={handleConfirmarDelete}
        mensaje={`¿Estás seguro de eliminar la ubicación "${registroSeleccionado?.nombre}"?`}
      />
    </div>
  );
};

export default UbicacionesComedor;