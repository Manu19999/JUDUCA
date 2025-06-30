import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Tabla from "../../components/Crud/Tabla.jsx";
import Nav from "../../components/Dashboard/navDashboard.jsx";
import ModalNuevo from "../../components/Crud/Modal/ModalNuevo.jsx";
import ModalEditar from "../../components/Crud/Modal/ModalEditar.jsx";
import ModalDetalles from "../../components/Crud/Modal/ModalDetalles.jsx";
import ModalConfirmacion from "../../components/Crud/Modal/ModalConfirmacion.jsx";
import { mostrarMensajeExito } from "../../components/Crud/MensajeExito.jsx";
import { Input, Select, Form, Row, Col, Tabs } from "antd";
import { Button } from "react-bootstrap";
import "../../styles/Credencial/credencial.css";
import { FaCheck, FaTimes } from "react-icons/fa";
import { MdCode } from "react-icons/md";
import { FaArrowLeft } from "react-icons/fa";
import BotonRegresar from "../../components/Dashboard/BotonRegresar.jsx";
const { Option } = Select;
const { TabPane } = Tabs;

// Datos de ejemplo para simular una base de datos de usuarios
const datos = [
  {
    id: 1,
    caracteristica: "EJEMPLO",
    api: "/ejemplo/1",
  },
  {
    id: 2,
    caracteristica: "EJEMPLO",
    api: "/ejemplo/2",
  },
  {
    id: 3,
    caracteristica: "EJEMPLO",
    api: "/ejemplo/3",
  },
];

// Columnas de la tabla de usuarios
const columnas = [
  { nombre: "#", campo: "id", ancho: "5%" },
  { nombre: "Caracteristica", campo: "caracteristica", ancho: "20%" },
  { nombre: "Variable api", campo: "api", ancho: "20%" },
  { nombre: "Acción", campo: "accion", ancho: "10%" },
];

function MantenimientoApiMap() {
  const navigate = useNavigate();

  // Estados para controlar la visibilidad de los modales
  const [showNuevoModal, setShowNuevoModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // Estado para almacenar el usuario seleccionado (para editar, eliminar o ver detalles)
  const [registroSeleccionado, setRegistroSeleccionado] = useState(null);
  // Hooks de Ant Design para gestionar formularios
  const [formNuevo] = Form.useForm(); // Formulario para el modal de nuevo registro
  const [formEditar] = Form.useForm(); // Formulario para el modal de edición

  // Abrir modal de nuevo registro
  const handleNuevoRegistro = () => {
    setShowNuevoModal(true);
  };

  // Abrir modal de edición
  const handleEdit = (id) => {
    const registro = datos.find((d) => d.id === id); // Busca el usuario por ID

    if (registro) {
      console.log("Registro seleccionado:", registro); // Verificar si encuentra el usuario

      setRegistroSeleccionado(registro); // Guarda el registro seleccionado
      formEditar.setFieldsValue(registro); // Carga los datos en el formulario
      setShowEditModal(true); // Abre el modal de edición
    } else {
      console.error("No se encontró el registro con ID:", id);
    }
  };
  // Cerrar el modal de edición y reiniciar el formulario
  const handleCerrarEditModal = () => {
    setShowEditModal(false);
    setRegistroSeleccionado(null); // Limpiar el registro seleccionado
    formEditar.resetFields(); // Reiniciar el formulario
  };

  // Abrir modal de eliminación
  const handleDelete = (id) => {
    const registro = datos.find((d) => d.id === id);
    setRegistroSeleccionado(registro);
    setShowDeleteModal(true); // Abrir el modal de eliminación
  };

  // Abrir modal de detalles
  const handleDetails = (id) => {
    const registro = datos.find((d) => d.id === id);
    setRegistroSeleccionado(registro);
    setShowDetailsModal(true);
  };

  // Guardar nuevo registro
  const handleGuardarNuevo = () => {
    formNuevo
      .validateFields() // Valida los campos del formulario
      .then((values) => {
        console.log("Nuevo registro:", values);
        setShowNuevoModal(false); // Cierra el modal
        formNuevo.resetFields(); // Limpiar el formulario de nuevo registro
        mostrarMensajeExito(
          "La Caracteristica se ha registrado correctamente."
        ); // Mensaje de éxito
      })
      .catch((error) => {
        console.error("Error al validar el formulario:", error); // Manejo de errores
      });
  };

  // Guardar cambios en el registro editado
  const handleGuardarEdit = () => {
    formEditar
      .validateFields() // Valida los campos del formulario
      .then((values) => {
        console.log("Registro editado:", values); // Depuración
        setShowEditModal(false); // Cierra el modal
        setRegistroSeleccionado(null); // Limpia el registro seleccionado
        formEditar.resetFields(); // Limpia el formulario
        mostrarMensajeExito(
          "La Caracteristica se ha actualizado correctamente."
        ); // Mensaje de éxito
      })
      .catch((error) => {
        console.error("Error al validar el formulario:", error); // Manejo de errores
      });
  };

  // Confirmar eliminación de un usuario
  const handleConfirmarDelete = () => {
    console.log(
      "Simulación: Eliminar registro con ID:",
      registroSeleccionado?.id
    );
    setShowDeleteModal(false);
    mostrarMensajeExito("La Caracteristica se ha eliminado correctamente.");
  };

  return (
    <div className="crud">
      <Nav />
      <BotonRegresar to="/mantenimientos" text="Regresar"  />
      {/* componente de navegación del  navdashboard */}
      <Tabla
        columnas={columnas} // Columnas de la tabla
        datos={datos} // Datos de la tabla
        titulo="Gestión de Data Map" // Título de la tabla
        icono={
          <>
            <MdCode className="icono-titulo" />{" "}
          </>
        } // Ícono del título
        onNuevoRegistro={handleNuevoRegistro} // Función para abrir el modal de nuevo registro
        onGenerarReporte={() => console.log("Generar reporte en PDF")} // Función para generar reporte
        onEdit={handleEdit} // Función para abrir el modal de edición
        onDelete={handleDelete} // Función para abrir el modal de eliminación
      />

      {/* Modal para Nuevo Registro */}
      <ModalNuevo
        show={showNuevoModal} // Controla la visibilidad del modal
        onHide={() => setShowNuevoModal(false)} // Función para cerrar el modal
        titulo="Nueva Caracteristica" // Título del modal
        onGuardar={handleGuardarNuevo} // Función para guardar el nuevo registro
        form={formNuevo} // Pasar el formulario al modal
        width={450} // Ancho del modal
      >
        <Form layout="vertical" form={formNuevo}>
          <Tabs defaultActiveKey="1">
            {/* Pestaña: Datos Personales */}
            <Row gutter={20}>
              <Col span={20}>
                <Form.Item
                  label="Característica"
                  name="caracteristica"
                  rules={[
                    {
                      required: true,
                      message: "La característica es obligatoria",
                    },
                  ]}
                >
                  <Select placeholder="Selecciona una característica">
                    <Select.Option value="opcion1">Opción 1</Select.Option>
                    <Select.Option value="opcion2">Opción 2</Select.Option>
                    <Select.Option value="opcion3">Opción 3</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={20}>
                <Form.Item
                  label="Api"
                  name="api"
                  rules={[
                    {
                      required: true,
                      message: "La variable del api es obligatoria",
                    },
                  ]}
                >
                  <Input placeholder="Ingresa La variable del api" />
                </Form.Item>
              </Col>
            </Row>
          </Tabs>
        </Form>
      </ModalNuevo>

      {/* Modal para Editar Registro */}
      <ModalEditar
        show={showEditModal} // Controla la visibilidad del modal
        onHide={handleCerrarEditModal} // Función para cerrar el modal
        titulo="Editar Caracteristica" // Título del modal
        onGuardar={handleGuardarEdit} // Función para guardar los cambios
        form={formEditar} // Formulario del modal
        registroSeleccionado={registroSeleccionado} // Usuario seleccionado
        width={450} // Ancho del modal
      >
        <Form
          layout="vertical"
          form={formEditar}
          initialValues={registroSeleccionado || {}}
        >
          <Tabs defaultActiveKey="1">
            {/* Pestaña: Datos Personales */}
            <Row gutter={20}>
              <Col span={20}>
                <Form.Item
                  label="Característica"
                  name="caracteristica"
                  rules={[
                    {
                      required: true,
                      message: "La característica es obligatoria",
                    },
                  ]}
                >
                  <Select placeholder="Selecciona una característica">
                    <Select.Option value="opcion1">Opción 1</Select.Option>
                    <Select.Option value="opcion2">Opción 2</Select.Option>
                    <Select.Option value="opcion3">Opción 3</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={20}>
                <Form.Item
                  label="Api"
                  name="api"
                  rules={[
                    {
                      required: true,
                      message: "La variable del api es obligatoria",
                    },
                  ]}
                >
                  <Input placeholder="Ingresa La variable del api" />
                </Form.Item>
              </Col>
            </Row>
          </Tabs>
        </Form>
      </ModalEditar>

      {/* Modal para Confirmar Eliminación */}
      <ModalConfirmacion
        show={showDeleteModal} // Controla la visibilidad del modal
        onHide={() => setShowDeleteModal(false)} // Función para cerrar el modal
        onConfirmar={handleConfirmarDelete} // Función para confirmar la eliminación
        mensaje={`¿Estás seguro de que deseas eliminar la caracteristica ${registroSeleccionado?.caracteristica}?`} // Mensaje de confirmación
      />
    </div>
  );
}

export default MantenimientoApiMap;
