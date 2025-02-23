import React, { useState, useEffect } from "react";
import Tabla from "../components/Crud/Tabla.jsx";
import Nav from '../components/Dashboard/navDashboard.jsx';
import { FaIdBadge } from 'react-icons/fa';
import ModalNuevo from "../components/Crud/Modal/ModalNuevo.jsx";
import ModalEditar from "../components/Crud/Modal/ModalEditar.jsx";
import ModalDetalles from "../components/Crud/Modal/ModalDetalles.jsx";
import ModalConfirmacion from "../components/Crud/Modal/ModalConfirmacion.jsx";
import { mostrarMensajeExito } from "../components/Crud/MensajeExito.jsx";
import { Input, Select, Form, Card,Row, Col, DatePicker,Tabs } from 'antd';

const { Option } = Select;
const { TabPane } = Tabs;

// Datos de ejemplo para simular una base de datos de usuarios
const datos = [
  {
    "id": 1,
    "evento": "JUDUCA",
    "participante": "08012003210",
    "tipAcceso": "Atleta",
    "fechaEmision": "2025-01-20",
    "fechaVencimiento": "2025-02-20",
    "estado": true
  },  
  {
    id: 2,
    nombre: 'Ana Gómez',
    usuario: 'ana_gomez',
    correo: 'ana.gomez@yahoo.com',
    rol: 'Profesor',
    estado: 'Inactivo',
    genero: 'Femenino',
    universidad: 'Instituto Politécnico Nacional',
    contraseña: '********',
    telefono: '+52 55 2345 6789',
    tipoSangre: 'A-',
    contactoEmergencia: 'Carlos Gómez (Padre) - +52 55 7654 3210',
    fechaNacimiento: '1985-08-22',
    foto: 'https://ejemplo.com/fotos/ana_gomez.jpg'
  },
  {
    id: 3,
    nombre: 'Luis Martínez',
    usuario: 'luis_martinez',
    correo: 'luis.martinez@hotmail.com',
    rol: 'Administrador',
    estado: 'Activo',
    genero: 'Masculino',
    universidad: 'Universidad de Guadalajara',
    contraseña: '********',
    telefono: '+52 33 3456 7890',
    tipoSangre: 'B+',
    contactoEmergencia: 'Laura Martínez (Esposa) - +52 33 6543 2109',
    fechaNacimiento: '1980-11-30',
    foto: 'https://ejemplo.com/fotos/luis_martinez.jpg'
  },
  {
    id: 4,
    nombre: 'María López',
    usuario: 'maria_lopez',
    correo: 'maria.lopez@gmail.com',
    rol: 'Estudiante',
    estado: 'Activo',
    genero: 'Femenino',
    universidad: 'Universidad Autónoma de Nuevo León',
    contraseña: '********',
    telefono: '+52 81 4567 8901',
    tipoSangre: 'AB+',
    contactoEmergencia: 'Juan López (Hermano) - +52 81 5432 1098',
    fechaNacimiento: '1995-03-10',
    foto: 'https://ejemplo.com/fotos/maria_lopez.jpg'
  },
  {
    id: 5,
    nombre: 'Carlos García',
    usuario: 'carlos_garcia',
    correo: 'carlos.garcia@outlook.com',
    rol: 'Profesor',
    estado: 'Activo',
    genero: 'Masculino',
    universidad: 'Universidad Veracruzana',
    contraseña: '********',
    telefono: '+52 22 5678 9012',
    tipoSangre: 'O-',
    contactoEmergencia: 'Ana García (Madre) - +52 22 4321 0987',
    fechaNacimiento: '1975-07-18',
    foto: 'https://ejemplo.com/fotos/carlos_garcia.jpg'
  }
];

// Columnas de la tabla de usuarios
const columnas = [
  { nombre: '#', campo: 'id', ancho: '5%' },
  { nombre: 'Evento', campo: 'Evento', ancho: '20%' },
  { nombre: 'Participante', campo: 'Participante', ancho: '40%' },
  { nombre: 'Tipo de acceso', campo: 'Tipo de acceso', ancho: '25%' },
  { nombre: 'Fecha emision', campo: 'Fecha emision', ancho: '15%' },
  { nombre: 'Fecha vencimiento', campo: 'Fecha vencimiento', ancho: '20%' },
  { nombre: 'Acción', campo: 'accion', ancho: '20%' }

];

function CrearCredenciales() {
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
    const registro = datos.find((d) => d.id === id); // Busca el usuario por su ID
    console.log("Registro seleccionado:", registro); // Depuración
    setRegistroSeleccionado(registro); // Actualizar el registro seleccionado
    setShowEditModal(true); // Abre el modal de edición
  };
  
  // Cerrar el modal de edición y reiniciar el formulario
  const handleCerrarEditModal = () => {
    setShowEditModal(false);
    setRegistroSeleccionado(null); // Limpiar el registro seleccionado
    formEditar.resetFields(); // Reiniciar el formulario
  };

  // Abrir modal de eliminación
  const handleDelete = (id) => {
    const registro = datos.find(d => d.id === id);
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
        setShowNuevoModal(false);// Cierra el modal
        formNuevo.resetFields(); // Limpiar el formulario de nuevo registro
        mostrarMensajeExito("La credencial se ha registrado correctamente."); // Mensaje de éxito
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
        mostrarMensajeExito("La credencial se ha actualizado correctamente."); // Mensaje de éxito
      })
      .catch((error) => {
        console.error("Error al validar el formulario:", error); // Manejo de errores
      });
  };

  // Confirmar eliminación de un usuario
  const handleConfirmarDelete = () => {
    console.log("Simulación: Eliminar registro con ID:", registroSeleccionado?.id);
    setShowDeleteModal(false);
    mostrarMensajeExito("La credencial se ha eliminado correctamente.");
  };

  return (
    <div className="crud">
      <Nav />{/* componente de navegación del  navdashboard */}
      <Tabla 
        columnas={columnas}// Columnas de la tabla
        datos={datos} // Datos de la tabla
        titulo="Gestión de credenciales" // Título de la tabla
        icono={<FaIdBadge className="icono-titulo" />} // Ícono del título

        onNuevoRegistro={handleNuevoRegistro}// Función para abrir el modal de nuevo registro
        onGenerarReporte={() => console.log("Generar reporte en PDF")} // Función para generar reporte
        onEdit={handleEdit} // Función para abrir el modal de edición
        onDelete={handleDelete} // Función para abrir el modal de eliminación
        onDetails={handleDetails} // Función para abrir el modal de detalles
      />

      {/* Modal para Nuevo Registro */}
      <ModalNuevo
        show={showNuevoModal} // Controla la visibilidad del modal
        onHide={() => setShowNuevoModal(false)} // Función para cerrar el modal
        titulo="Nueva Credencial" // Título del modal
        onGuardar={handleGuardarNuevo} // Función para guardar el nuevo registro
        form={formNuevo} // Pasar el formulario al modal
        width={800} // Ancho del modal
      >
        <Form layout="vertical" form={formNuevo}>
          <Tabs defaultActiveKey="1">
            {/* Pestaña: Datos Personales */}
            <TabPane tab="Ingresar informacion" key="1">
              <Row gutter={16}>
              <Col span={12}>
                  <Form.Item
                    label="Evento"
                    name="Evento"
                    rules={[{ required: true, message: "El evento es obligatorio" }]}
                  >
                    <Select placeholder="Selecciona un evento">
                      <Option value="JUDUCA">JUDUCA</Option>
                      <Option value="CSUCA">CSUCA</Option>
                      <Option value="Otro">Otro</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="DNI / Pasaporte"
                    name="Participante"
                    rules={[{ required: true, message: "La identificacion es obligatoria" }]}
                  >
                    <Input placeholder="Ingresa la identificacion" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={30}>
              <Col span={8}>
                  <Form.Item
                    label="Tipo de acceso"
                    name="tipAcceso"
                    rules={[{ required: true, message: "El acceso es obligatorio" }]}
                  >
                    <Select placeholder="Selecciona un tipo de acceso">
                      <Option value="Atleta">Atleta</Option>
                      <Option value="Entrenador">Entrenador</Option>
                      <Option value="Autoridades">Autoridades</Option>
                      <Option value="Organizador">Organizador</Option>
                      <Option value="Voluntario">Voluntario</Option>
                      <Option value="Prensa">Prensa</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={7}>
                  <Form.Item
                    label="Fecha de emision"
                    name="fechaEmision"
                    rules={[{ required: true, message: "La fecha de emision es obligatoria" }]}
                  >
                    <DatePicker format="YYYY-MM-DD" />
                  </Form.Item>
                </Col>    
                <Col span={8}>
                  <Form.Item
                    label="Fecha de vencimiento"
                    name="fechaVencimiento"
                    rules={[{ required: true, message: "La fecha de vencimiento es obligatoria" }]}
                  >
                    <DatePicker format="YYYY-MM-DD" />
                  </Form.Item>
                </Col>      
              </Row>
  
            </TabPane>

            {/* Pestaña: Mas datos */}
            <TabPane tab="Mas datos" key="2">
              <Row gutter={16}>
                <Col span={7}>
                  <Form.Item
                    label="Estado"
                    name="Estado"
                    rules={[{ required: true, message: "El estado es obligatorio" }]}
                  >
                    <Select placeholder="Selecciona un estado">
                      <Option value="ACTIVO">ACTIVO</Option>
                      <Option value="INACTIVO">INACTIVO</Option>
                    </Select>
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
        titulo="Editar Credencial" // Título del modal
        onGuardar={handleGuardarEdit} // Función para guardar los cambios
        form={formEditar} // Formulario del modal
        registroSeleccionado={registroSeleccionado} // Usuario seleccionado
        width={800} // Ancho del modal
      >
        <Form layout="vertical" form={formEditar} initialValues={registroSeleccionado || {}}>
          <Tabs defaultActiveKey="1">
            {/* Pestaña: Datos Personales */}
            <TabPane tab="Editar informacion" key="1">
              <Row gutter={16}>
              <Col span={12}>
                  <Form.Item
                    label="Evento"
                    name="Evento"
                    rules={[{ required: true, message: "El evento es obligatorio" }]}
                  >
                    <Select placeholder="Selecciona un evento">
                      <Option value="JUDUCA">JUDUCA</Option>
                      <Option value="CSUCA">CSUCA</Option>
                      <Option value="Otro">Otro</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="DNI / Pasaporte"
                    name="Participante"
                    rules={[{ required: true, message: "La identificacion es obligatoria" }]}
                  >
                    <Input placeholder="Ingresa la identificacion" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={30}>
              <Col span={8}>
                  <Form.Item
                    label="Tipo de acceso"
                    name="tipAcceso"
                    rules={[{ required: true, message: "El acceso es obligatorio" }]}
                  >
                    <Select placeholder="Selecciona un tipo de acceso">
                      <Option value="Atleta">Atleta</Option>
                      <Option value="Entrenador">Entrenador</Option>
                      <Option value="Autoridades">Autoridades</Option>
                      <Option value="Organizador">Organizador</Option>
                      <Option value="Voluntario">Voluntario</Option>
                      <Option value="Prensa">Prensa</Option>
                    </Select>
                  </Form.Item>
                </Col>

                <Col span={7}>
                  <Form.Item
                    label="Fecha de emision"
                    name="fechaEmision"
                    rules={[{ required: true, message: "La fecha de emision es obligatoria" }]}
                  >
                    <DatePicker format="YYYY-MM-DD" />
                  </Form.Item>
                </Col>    
                <Col span={8}>
                  <Form.Item
                    label="Fecha de vencimiento"
                    name="fechaVencimiento"
                    rules={[{ required: true, message: "La fecha de vencimiento es obligatoria" }]}
                  >
                    <DatePicker format="YYYY-MM-DD" />
                  </Form.Item>
                </Col>   
              </Row>
            </TabPane>

            {/* Pestaña: Datos de Usuario */}
            <TabPane tab="Mas datos" key="2">
              <Row gutter={16}>
              <Col span={7}>
                  <Form.Item
                    label="Estado"
                    name="Estado"
                    rules={[{ required: true, message: "El estado es obligatorio" }]}
                  >
                    <Select placeholder="Selecciona un estado">
                      <Option value="ACTIVO">ACTIVO</Option>
                      <Option value="INACTIVO">INACTIVO</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            </TabPane>
          </Tabs>
        </Form>
      </ModalEditar>

      {/* Modal para Confirmar Eliminación */}
      <ModalConfirmacion
        show={showDeleteModal} // Controla la visibilidad del modal
        onHide={() => setShowDeleteModal(false)} // Función para cerrar el modal
        onConfirmar={handleConfirmarDelete} // Función para confirmar la eliminación
        mensaje={`¿Estás seguro de que deseas eliminar a ${registroSeleccionado?.usuario}?`} // Mensaje de confirmación
      />

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

export default CrearCredenciales;