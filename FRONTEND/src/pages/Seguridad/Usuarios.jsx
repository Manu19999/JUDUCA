import React, { useState, useEffect } from "react";
import Tabla from "../../components/Crud/Tabla";
import Nav from '../../components/Dashboard/navDashboard';
import { FaUser } from 'react-icons/fa';
import ModalNuevo from "../../components/Crud/Modal/ModalNuevo";
import ModalEditar from "../../components/Crud/Modal/ModalEditar";
import ModalDetalles from "../../components/Crud/Modal/ModalDetalles";
import ModalConfirmacion from "../../components/Crud/Modal/ModalConfirmacion";
import { mostrarMensajeExito } from "../../components/Crud/MensajeExito";

import { Input, Select, Form, Card,Row, Col, DatePicker,Tabs } from 'antd';

const { Option } = Select;
const { TabPane } = Tabs;

// Datos de ejemplo para simular una base de datos de usuarios
const datos = [
  {
    id: 1,
    nombre: 'Juan Pérez',
    usuario: 'juan_perez',
    correo: 'juan.perez@gmail.com',
    rol: 'Estudiante',
    estado: 'Activo',
    genero: 'Masculino',
    universidad: 'Universidad Nacional Autónoma de México',
    contraseña: '********',
    telefono: '+52 55 1234 5678',
    tipoSangre: 'O+',
    contactoEmergencia: 'María López (Madre) - +52 55 8765 4321',
    fechaNacimiento: '1990-05-15',
    foto: 'https://ejemplo.com/fotos/juan_perez.jpg'
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
  },
  {
    id: 6,
    nombre: 'Sofía Díaz',
    usuario: 'sofia_diaz',
    correo: 'sofia.diaz@yahoo.com',
    rol: 'Estudiante',
    estado: 'Inactivo',
    genero: 'Femenino',
    universidad: 'Universidad Autónoma de Yucatán',
    contraseña: '********',
    telefono: '+52 999 6789 0123',
    tipoSangre: 'A+',
    contactoEmergencia: 'Pedro Díaz (Padre) - +52 999 3210 9876',
    fechaNacimiento: '2000-12-05',
    foto: 'https://ejemplo.com/fotos/sofia_diaz.jpg'
  },
  {
    id: 7,
    nombre: 'Pedro Fernández',
    usuario: 'pedro_fernandez',
    correo: 'pedro.fernandez@hotmail.com',
    rol: 'Estudiante',
    estado: 'Activo',
    genero: 'Masculino',
    universidad: 'Universidad Autónoma de Querétaro',
    contraseña: '********',
    telefono: '+52 442 7890 1234',
    tipoSangre: 'B-',
    contactoEmergencia: 'Sofía Fernández (Madre) - +52 442 2109 8765',
    fechaNacimiento: '1998-09-25',
    foto: 'https://ejemplo.com/fotos/pedro_fernandez.jpg'
  },
  {
    id: 8,
    nombre: 'Laura Martín',
    usuario: 'laura_martin',
    correo: 'laura.martin@gmail.com',
    rol: 'Profesor',
    estado: 'Activo',
    genero: 'Femenino',
    universidad: 'Universidad Autónoma de San Luis Potosí',
    contraseña: '********',
    telefono: '+52 444 8901 2345',
    tipoSangre: 'O+',
    contactoEmergencia: 'Luis Martín (Esposo) - +52 444 1098 7654',
    fechaNacimiento: '1988-04-12',
    foto: 'https://ejemplo.com/fotos/laura_martin.jpg'
  },
  {
    id: 9,
    nombre: 'Juan Pérez',
    usuario: 'juan_perez',
    correo: 'juan.perez@gmail.com',
    rol: 'Estudiante',
    estado: 'Activo',
    genero: 'Masculino',
    universidad: 'Universidad Nacional Autónoma de México',
    contraseña: '********',
    telefono: '+52 55 1234 5678',
    tipoSangre: 'O+',
    contactoEmergencia: 'María López (Madre) - +52 55 8765 4321',
    fechaNacimiento: '1990-05-15',
    foto: 'https://ejemplo.com/fotos/juan_perez.jpg'
  },
  {
    id: 10,
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
    id: 11,
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
    id: 12,
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
    id: 13,
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
  },
  {
    id: 14,
    nombre: 'Sofía Díaz',
    usuario: 'sofia_diaz',
    correo: 'sofia.diaz@yahoo.com',
    rol: 'Estudiante',
    estado: 'Inactivo',
    genero: 'Femenino',
    universidad: 'Universidad Autónoma de Yucatán',
    contraseña: '********',
    telefono: '+52 999 6789 0123',
    tipoSangre: 'A+',
    contactoEmergencia: 'Pedro Díaz (Padre) - +52 999 3210 9876',
    fechaNacimiento: '2000-12-05',
    foto: 'https://ejemplo.com/fotos/sofia_diaz.jpg'
  },
  {
    id: 15,
    nombre: 'Pedro Fernández',
    usuario: 'pedro_fernandez',
    correo: 'pedro.fernandez@hotmail.com',
    rol: 'Estudiante',
    estado: 'Activo',
    genero: 'Masculino',
    universidad: 'Universidad Autónoma de Querétaro',
    contraseña: '********',
    telefono: '+52 442 7890 1234',
    tipoSangre: 'B-',
    contactoEmergencia: 'Sofía Fernández (Madre) - +52 442 2109 8765',
    fechaNacimiento: '1998-09-25',
    foto: 'https://ejemplo.com/fotos/pedro_fernandez.jpg'
  },
  {
    id: 16,
    nombre: 'Laura Martín',
    usuario: 'laura_martin',
    correo: 'laura.martin@gmail.com',
    rol: 'Profesor',
    estado: 'Activo',
    genero: 'Femenino',
    universidad: 'Universidad Autónoma de San Luis Potosí',
    contraseña: '********',
    telefono: '+52 444 8901 2345',
    tipoSangre: 'O+',
    contactoEmergencia: 'Luis Martín (Esposo) - +52 444 1098 7654',
    fechaNacimiento: '1988-04-12',
    foto: 'https://ejemplo.com/fotos/laura_martin.jpg'
  }
];

// Columnas de la tabla de usuarios
const columnas = [
  { nombre: '#', campo: 'id', ancho: '5%' },
  { nombre: 'Usuario', campo: 'usuario', ancho: '20%' },
  { nombre: 'Correo', campo: 'correo', ancho: '40%' },
  { nombre: 'Rol', campo: 'rol', ancho: '25%' },
  { nombre: 'Estado', campo: 'estado', ancho: '15%' },
  { nombre: 'Acción', campo: 'accion', ancho: '20%' }
];

function Usuarios() {
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

  // Confirmar eliminación de un usuario
  const handleConfirmarDelete = () => {
    console.log("Simulación: Eliminar registro con ID:", registroSeleccionado?.id);
    setShowDeleteModal(false);
    mostrarMensajeExito("El usuario se ha eliminado correctamente.");
  };

  return (
    <div className="crud">
      <Nav />{/* componente de navegación del  navdashboard */}
      <Tabla 
        columnas={columnas}// Columnas de la tabla
        datos={datos} // Datos de la tabla
        titulo="Gestión de usuarios" // Título de la tabla
        icono={<FaUser className="icono-titulo" />} // Ícono del título

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

export default Usuarios;