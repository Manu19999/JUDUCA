import React, { useState, useEffect  } from "react";
import { useNavigate } from "react-router-dom";
import Tabla from "../../components/Crud/Tabla.jsx";
import Nav from "../../components/Dashboard/navDashboard.jsx";
import ModalNuevo from "../../components/Crud/Modal/ModalNuevo.jsx";
import ModalEditar from "../../components/Crud/Modal/ModalEditar.jsx";
import ModalDetalles from "../../components/Crud/Modal/ModalDetalles.jsx";
import ModalConfirmacion from "../../components/Crud/Modal/ModalConfirmacion.jsx";
import { mostrarMensajeExito } from "../../components/Crud/MensajeExito.jsx";
import { Input, Select, Form, Row, Col, Tabs  } from "antd";
import { Button } from "react-bootstrap";
import "../../styles/Credencial/credencial.css";

import { FaGlobe } from "react-icons/fa";
import { FaArrowLeft  } from "react-icons/fa";

const { Option } = Select;
const { TabPane } = Tabs;


// Columnas de la tabla de usuarios
const columnas = [
  { nombre: "#", campo: "idPais", ancho: "5%" },
  { nombre: "Pais", campo: "nombre", ancho: "30%" },
  { nombre: "Acción", campo: "accion", ancho: "10%" },
];

function MantenimientoPaises() {
      const navigate = useNavigate();
      const [datos, setDatos] = useState([]);

    
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

  useEffect(() => {
    fetch("http://localhost:4000/api/paises/getPaises")
      .then((response) => response.json())
      .then((data) => {
        console.log("Datos recibidos:", data); // Verifica la estructura de los datos
        if (Array.isArray(data.data)) {
          setDatos(data.data); // Solo guardamos el array de países
        } else {
          console.error("Error: La API no devolvió un array en 'data'");
          setDatos([]); // Evita errores si la API devuelve un formato inesperado
        }
      })
      .catch((error) => console.error("Error al obtener los datos:", error));
  }, []);
  

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
        mostrarMensajeExito("El pais se ha registrado correctamente."); // Mensaje de éxito
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
        mostrarMensajeExito("El pais se ha actualizado correctamente."); // Mensaje de éxito
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
    mostrarMensajeExito("El pais se ha eliminado correctamente.");
  };

  return (
    <div className="crud">
      <Nav />

      <Button
          variant="outline-warning"
          onClick={() => navigate("/mantenimientoView")}
          className="d-flex align-items-center gap-2"
          style={{ marginBottom: "35px", marginLeft: "200px" }}
          >
          <FaArrowLeft size={20} /> Regresar
        </Button>
      {/* componente de navegación del  navdashboard */}
      <Tabla
        columnas={columnas} // Columnas de la tabla
        datos={datos} // Datos de la tabla
        titulo="Gestión de Paises" // Título de la tabla
        icono={<FaGlobe className="icono-titulo" />} // Ícono del título
        onNuevoRegistro={handleNuevoRegistro} // Función para abrir el modal de nuevo registro
        onGenerarReporte={() => console.log("Generar reporte en PDF")} // Función para generar reporte
        onEdit={handleEdit} // Función para abrir el modal de edición
        onDelete={handleDelete} // Función para abrir el modal de eliminación
        onDetails={handleDetails} // Función para abrir el modal de detalles
      />

      {/* Modal para Nuevo Registro */}
      <ModalNuevo
        show={showNuevoModal} // Controla la visibilidad del modal
        onHide={() => setShowNuevoModal(false)} // Función para cerrar el modal
        titulo="Nuevo Pais" // Título del modal
        onGuardar={handleGuardarNuevo} // Función para guardar el nuevo registro
        form={formNuevo} // Pasar el formulario al modal
        width={400} // Ancho del modal
      >
        <Form layout="vertical" form={formNuevo}>
          <Tabs defaultActiveKey="1">
            {/* Pestaña: Datos Personales */}
              <Row gutter={12}>
                <Col span={18}>
                  <Form.Item
                    label="Nombre"
                    name="nombre"
                    rules={[
                      {
                        required: true,
                        message: "El nombre del pais es obligatorio",
                      },
                    ]}
                  >
                    <Input placeholder="Ingresa el nombre del pais" />
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
        titulo="Editar Pais" // Título del modal
        onGuardar={handleGuardarEdit} // Función para guardar los cambios
        form={formEditar} // Formulario del modal
        registroSeleccionado={registroSeleccionado} // Usuario seleccionado
        width={400} // Ancho del modal
      >
        <Form
          layout="vertical"
          form={formEditar}
          initialValues={registroSeleccionado || {}}
        >
          <Tabs defaultActiveKey="1">
            {/* Pestaña: Datos Personales */}
            <Row gutter={12}>
            <Col span={18}>
                  <Form.Item
                    label="Nombre"
                    name="nombre"
                    rules={[
                      {
                        required: true,
                        message: "El nombre del pais es obligatorio",
                      },
                    ]}
                  >
                    <Input placeholder="Ingresa el nombre del pais" />
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
        mensaje={`¿Estás seguro de que deseas eliminar el pais ${registroSeleccionado?.nombre}?`} // Mensaje de confirmación
      />

      {/* Modal para detalles */}
      <ModalDetalles
        show={showDetailsModal} // Controla la visibilidad del modal
        onHide={() => setShowDetailsModal(false)} // Función para cerrar el modal
        titulo="Detalles del pais" // Título del modal
        detalles={registroSeleccionado || {}} // Detalles del usuario seleccionado
        width={500} // Ancho personalizado
      />
    </div>
  );
}

export default MantenimientoPaises;
