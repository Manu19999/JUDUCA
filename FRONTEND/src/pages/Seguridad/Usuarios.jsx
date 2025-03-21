import React, { useState, useEffect } from "react";
import Tabla from "../../components/Crud/Tabla";
import Nav from '../../components/Dashboard/navDashboard';
import { FaUser } from 'react-icons/fa';
import ModalNuevo from "../../components/Crud/Modal/ModalNuevo";
import ModalEditar from "../../components/Crud/Modal/ModalEditar";
import ModalDetalles from "../../components/Crud/Modal/ModalDetalles";
import { mostrarMensajeExito } from "../../components/Crud/MensajeExito";
import { mostrarMensajeError } from "../../components/Crud/MensajeError"; // Importar el componente de mensaje de error
import { Input, Select, Form, Card,Row, Col, DatePicker,Tabs } from 'antd';
import BotonRegresar from "../../components/Dashboard/BotonRegresar";

const { Option } = Select;
const { TabPane } = Tabs;

function Usuarios() {
  // Estados para controlar la visibilidad de los modales
  const [showNuevoModal, setShowNuevoModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  // Estado para almacenar el usuario seleccionado (para editar, eliminar o ver detalles)
  const [registroSeleccionado, setRegistroSeleccionado] = useState(null);
  // Hooks de Ant Design para gestionar formularios
  const [formNuevo] = Form.useForm(); // Formulario para el modal de nuevo registro
  const [formEditar] = Form.useForm(); // Formulario para el modal de edición
  const [usuarios, setUsuarios] = useState([]); // Estado para almacenar los usuarios

  //función reutilizable para obtener los roles
  const obtenerUsuarios = async () => {
    try {
      const token = localStorage.getItem("token"); // Obtener el token del almacenamiento local
      if (!token) {
        throw new Error("No hay token disponible");
      }
      const response = await fetch("http://localhost:4000/api/usuarios", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` // Agregar el token en el encabezado
        }
      });
      if (!response.ok) {
        throw new Error("Error al obtener los usuarios");
      }

      const data = await response.json();
      setUsuarios(data.data); // Actualizar el estado con los usuarios obtenidos
    } catch (error) {
      console.error("Error:", error);
      mostrarMensajeError("Error al cargar los usuarios. Inténtalo de nuevo más tarde.");
    }
  };

   // Llamar a la API para obtener los usuarios
    useEffect(() => {
      obtenerUsuarios();
    }, []); // El array vacío asegura que esto solo se ejecute una vez al montar el componente
  

  // Columnas de la tabla de usuarios
  const columnas = [
    { nombre: '#', campo: 'indice', ancho: '5%' },
    { nombre: 'Usuario', campo: 'nombreUsuario', ancho: '20%' },
    { nombre: 'Correo', campo: 'email', ancho: '40%' },
    { nombre: 'Rol', campo: 'nombreRol', ancho: '25%' },
    { nombre: 'Estado', campo: 'nombreEstadoUsuario', ancho: '15%' },
    { nombre: 'Acción', campo: 'accion', ancho: '20%' }
  ];
  // Abrir modal de nuevo registro
  const handleNuevoRegistro = () => {
    setShowNuevoModal(true);
  };

  // Abrir modal de edición
  const handleEdit = (id) => {
    const registro = usuarios.find((d) => d.idUsuario === id); // Busca el usuario por su ID
    setRegistroSeleccionado(registro); // Actualizar el registro seleccionado
    setShowEditModal(true); // Abre el modal de edición
  };
  
  // Cerrar el modal de edición y reiniciar el formulario
  const handleCerrarEditModal = () => {
    setShowEditModal(false);
    setRegistroSeleccionado(null); // Limpiar el registro seleccionado
    formEditar.resetFields(); // Reiniciar el formulario
  };

  // Abrir modal de detalles
  const handleDetails = (id) => {
    const registro = usuarios.find((d) => d.idUsuario === id);
    setRegistroSeleccionado(registro);
    setShowDetailsModal(true);
  };
 
  // Guardar nuevo registro
  const handleGuardarNuevo = () => {
    formNuevo
      .validateFields() // Valida los campos del formulario
      .then((values) => {
        console.log("Nuevo registro:", values);
        setShowNuevoModal(false);// Cierra el modal
        formNuevo.resetFields(); // Limpiar el formulario de nuevo registro
        mostrarMensajeExito("El usuario se ha registrado correctamente."); // Mensaje de éxito
      })
      .catch((error) => {
        console.error("Error al validar el formulario:", error);// Manejo de errores
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
        mostrarMensajeExito("El usuario se ha actualizado correctamente."); // Mensaje de éxito
      })
      .catch((error) => {
        console.error("Error al validar el formulario:", error); // Manejo de errores
      });
  };

  return (
    <div className="crud">
      <Nav />{/* componente de navegación del  navdashboard */}
      <BotonRegresar to="/seguridad" text="Regresar" />
      <Tabla 
        columnas={columnas}// Columnas de la tabla
        datos={usuarios.map((usuario) => ({ ...usuario, id: usuario.idUsuario }))}  // Usar los usuarios obtenidos de la API
        titulo="Gestión de usuarios" // Título de la tabla
        icono={<FaUser className="icono-titulo" />} // Ícono del título
        onNuevoRegistro={handleNuevoRegistro}// Función para abrir el modal de nuevo registro
        onGenerarReporte={() => console.log("Generar reporte en PDF")} // Función para generar reporte
        onEdit={handleEdit} // Función para abrir el modal de edición
        onDetails={handleDetails} // Función para abrir el modal de detalles
      />

      {/* Modal para Nuevo Registro */}
      <ModalNuevo
        show={showNuevoModal} // Controla la visibilidad del modal
        onHide={() => setShowNuevoModal(false)} // Función para cerrar el modal
        titulo="Nuevo Usuario" // Título del modal
        onGuardar={handleGuardarNuevo} // Función para guardar el nuevo registro
        form={formNuevo} // Pasar el formulario al modal
        width={800} // Ancho del modal
      >
        <Form layout="vertical" form={formNuevo}>
          <Tabs defaultActiveKey="1">
            {/* Pestaña: Datos Personales */}
            <TabPane tab="Datos Personales" key="1">
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="Nombre"
                    name="nombre"
                    rules={[{ required: true, message: "El nombre es obligatorio" }]}
                  >
                    <Input placeholder="Ingresa el nombre" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Género"
                    name="genero"
                    rules={[{ required: true, message: "El género es obligatorio" }]}
                  >
                    <Select placeholder="Selecciona el género">
                      <Option value="masculino">Masculino</Option>
                      <Option value="femenino">Femenino</Option>
                      <Option value="otro">Otro</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="Fecha de Nacimiento"
                    name="fechaNacimiento"
                    rules={[{ required: true, message: "La fecha de nacimiento es obligatoria" }]}
                  >
                    <DatePicker format="YYYY-MM-DD" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Tipo de Sangre"
                    name="tipoSangre"
                    rules={[{ required: true, message: "El tipo de sangre es obligatorio" }]}
                  >
                    <Input placeholder="Ingresa el tipo de sangre" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="Teléfono"
                    name="telefono"
                    rules={[
                      { required: true, message: "El teléfono es obligatorio" }
                    ]}
                  >
                    <Input placeholder="Ingresa el teléfono" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Contacto de Emergencia"
                    name="contactoEmergencia"
                  >
                    <Input placeholder="Ingresa el contacto de emergencia" />
                  </Form.Item>
                </Col>
              </Row>
            </TabPane>

            {/* Pestaña: Datos de Usuario */}
            <TabPane tab="Datos de Usuario" key="2">
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="Nombre de Usuario"
                    name="usuario"
                    rules={[
                      { required: true, message: "El nombre de usuario es obligatorio" },
                      { min: 4, message: "Debe tener al menos 4 caracteres" }
                    ]}
                  >
                    <Input  placeholder="Ingresa el nombre de usuario" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Contraseña"
                    name="contraseña"
                    rules={[
                      { required: true, message: "La contraseña es obligatoria" },
                      { min: 6, message: "Debe tener al menos 8 caracteres" }
                    ]}
                  >
                    <Input.Password  placeholder="Ingresa la contraseña" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="Correo Electrónico"
                    name="email"
                    rules={[
                      { required: true, message: "El correo electrónico es obligatorio" },
                      { type: "email", message: "Debe ser un correo válido" }
                    ]}
                  >
                    <Input  type="email" placeholder="Ingresa el correo electrónico" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Rol"
                    name="rol"
                    rules={[{ required: true, message: "El rol es obligatorio" }]}
                  >
                    <Select  placeholder="Selecciona un rol">
                      <Option value="Administrador">Administrador</Option>
                      <Option value="Delegado">Delegado</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="Universidad"
                    name="universidad"
                    rules={[{ required: true, message: "La universidad es obligatoria" }]}
                  >
                    <Input  placeholder="Ingresa la universidad" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Estado"
                    name="estado"
                    rules={[{ required: true, message: "El estado es obligatorio" }]}
                  >
                    <Input  placeholder="Ingresa el estado" />
                  </Form.Item>
                </Col>
              </Row>
            </TabPane>
          </Tabs>
        </Form>

      </ModalNuevo>

      {/* Modal para Editar Registro */}
      <ModalEditar
        show={showEditModal} // Controla la visibilidad del modal
        onHide={handleCerrarEditModal} // Función para cerrar el modal
        titulo="Editar Usuario" // Título del modal
        onGuardar={handleGuardarEdit} // Función para guardar los cambios
        form={formEditar} // Formulario del modal
        registroSeleccionado={registroSeleccionado} // Usuario seleccionado
        width={800} // Ancho del modal
      >
        <Form layout="vertical" form={formEditar} initialValues={registroSeleccionado || {}}>
          <Tabs defaultActiveKey="1">
            {/* Pestaña: Datos Personales */}
            <TabPane tab="Datos Personales" key="1">
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Nombre" name="nombre"rules={[{ required: true, message: "El nombre es obligatorio" }]}>
                    <Input placeholder="Ingresa el nombre" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Género" name="genero" rules={[{ required: true, message: "El género es obligatorio" }]}>
                    <Select placeholder="Selecciona el género">
                      <Option value="masculino">Masculino</Option>
                      <Option value="femenino">Femenino</Option>
                      <Option value="otro">Otro</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Fecha de Nacimiento" name="fechaNacimiento" rules={[{ required: true, message: "La fecha de nacimiento es obligatoria" }]}>
                  <Input type="date" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Tipo de Sangre" name="tipoSangre" rules={[{ required: true, message: "El tipo de sangre es obligatorio" }]}>
                    <Input placeholder="Ingresa el tipo de sangre" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Teléfono" name="telefono" rules={[{ required: true, message: "El teléfono es obligatorio" }]}>
                    <Input placeholder="Ingresa el teléfono" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Contacto de Emergencia" name="contactoEmergencia">
                    <Input placeholder="Ingresa el contacto de emergencia" />
                  </Form.Item>
                </Col>
              </Row>
            </TabPane>

            {/* Pestaña: Datos de Usuario */}
            <TabPane tab="Datos de Usuario" key="2">
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Nombre de Usuario" name="usuario" rules={[
                    { required: true, message: "El nombre de usuario es obligatorio" },
                    { min: 4, message: "Debe tener al menos 4 caracteres" }
                  ]}>
                    <Input placeholder="Ingresa el nombre de usuario" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Contraseña" name="contraseña" rules={[
                    { required: true, message: "La contraseña es obligatoria" },
                    { min: 8, message: "Debe tener al menos 8 caracteres" }
                  ]}>
                    <Input.Password placeholder="Ingresa la contraseña" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Correo Electrónico" name="correo"  rules={[
                    { required: true, message: "El correo electrónico es obligatorio" },
                    { type: "email", message: "Debe ser un correo válido" }
                  ]}>
                    <Input type="email" placeholder="Ingresa el correo electrónico" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Rol" name="rol" rules={[{ required: true, message: "El rol es obligatorio" }]}>
                    <Select placeholder="Selecciona un rol">
                    <Option value="Administrador">Administrador</Option>
                    <Option value="Delegado">Delegado</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Universidad" name="universidad" rules={[{ required: true, message: "La universidad es obligatoria" }]}>
                    <Input placeholder="Ingresa la universidad" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Estado" name="estado" rules={[{ required: true, message: "El estado es obligatorio" }]}>
                    <Input placeholder="Ingresa el estado" />
                  </Form.Item>
                </Col>
              </Row>
            </TabPane>
          </Tabs>
        </Form>
      </ModalEditar>

      {/* Modal para detalles */}
      <ModalDetalles
        show={showDetailsModal} // Controla la visibilidad del modal
        onHide={() => setShowDetailsModal(false)} // Función para cerrar el modal
        titulo="Detalles del Usuario" // Título del modal
        detalles={registroSeleccionado || {}} // Detalles del usuario seleccionado
        width={600} // Ancho personalizado
      />
    </div>
  );
}

export default Usuarios;