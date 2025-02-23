import React, { useState , useEffect } from "react";
import Tabla from "../components/Crud/Tabla.jsx";
import Nav from '../components/Dashboard/navDashboard.jsx';
import { FaIdBadge } from 'react-icons/fa';
import ModalNuevo from "../components/Crud/Modal/ModalNuevo.jsx";
import ModalEditar from "../components/Crud/Modal/ModalEditar.jsx";
import ModalDetalles from "../components/Crud/Modal/ModalDetalles.jsx";
import ModalConfirmacion from "../components/Crud/Modal/ModalConfirmacion.jsx";
import { mostrarMensajeExito } from "../components/Crud/MensajeExito.jsx";
import { Input, Select, Form,Row, Col, DatePicker,Tabs } from 'antd';


const { Option } = Select;
const { TabPane } = Tabs;

// Datos de ejemplo para simular una base de datos de usuarios
const datos = [
  {
    "id": 1,
    "evento": "JUDUCA",
    "participante": "08012003210",
    "tipAcceso": "ATLETA",
    "fechaEmision": "2025-01-20",
    "fechaVencimiento": "2025-02-20",
    "estado": "ACTIVO"
  },
  {
    "id": 2,
    "evento": "JUDUCA",
    "participante": "08012003211",
    "tipAcceso": "ENTRENADOR",
    "fechaEmision": "2025-01-18",
    "fechaVencimiento": "2025-02-18",
    "estado": "ACTIVO"
  },
  {
    "id": 3,
    "evento": "JUDUCA",
    "participante": "08012003212",
    "tipAcceso": "ATLETA",
    "fechaEmision": "2025-01-15",
    "fechaVencimiento": "2025-02-15",
    "estado": "INACTIVO"
  },
  {
    "id": 4,
    "evento": "JUDUCA",
    "participante": "08012003213",
    "tipAcceso": "VOLUNTARIO",
    "fechaEmision": "2025-01-22",
    "fechaVencimiento": "2025-02-22",
    "estado": "ACTIVO"
  },
  {
    "id": 5,
    "evento": "JUDUCA",
    "participante": "08012003214",
    "tipAcceso": "PRENSA",
    "fechaEmision": "2025-01-19",
    "fechaVencimiento": "2025-02-19",
    "estado": "ACTIVO"
  },
  {
    "id": 6,
    "evento": "JUDUCA",
    "participante": "08012003215",
    "tipAcceso": "ORGANIZADOR",
    "fechaEmision": "2025-01-17",
    "fechaVencimiento": "2025-02-17",
    "estado": "INACTIVO"
  }
];


// Columnas de la tabla de usuarios
const columnas = [
  { nombre: '#', campo: 'id', ancho: '5%' },
  { nombre: 'Evento', campo: 'evento', ancho: '15%' },
  { nombre: 'Participante', campo: 'participante', ancho: '30%' },
  { nombre: 'Tipo de acceso', campo: 'tipAcceso', ancho: '25%' },
  { nombre: 'Fecha emision', campo: 'fechaEmision', ancho: '20%' },
  { nombre: 'Fecha vencimiento', campo: 'fechaVencimiento', ancho: '20%' },
  { nombre: 'Estado', campo: 'estado', ancho: '15%' },
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
              <Row gutter={15}>
              <Col span={8}>
                  <Form.Item
                    label="Evento"
                    name="Evento"
                    rules={[{ required: true, message: "El evento es obligatorio" }]}
                  >
                    <Select placeholder="Selecciona un evento">
                      <Option value="JUDUCA">JUDUCA</Option>
                      <Option value="SUCA">SUCA</Option>
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
              <Row gutter={15}>
              <Col span={9}>
                  <Form.Item
                    label="Tipo de acceso"
                    name="tipAcceso"
                    rules={[{ required: true, message: "El acceso es obligatorio" }]}
                  >
                    <Select placeholder="Selecciona un tipo de acceso">
                     <Option value="ATLETA">ATLETA</Option>
                      <Option value="ENTRENADOR">ENTRENADOR</Option>
                      <Option value="AUTORIDAD">AUTORIDAD</Option>
                      <Option value="ORGANIZADOR">ORGANIZADOR</Option>
                      <Option value="VOLUNTARIO">VOLUNTARIO</Option>
                      <Option value="PRENSA">PRENSA</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    label="Fecha de emision"
                    name="fechaEmision"
                    rules={[{ required: true, message: "La fecha de emision es obligatoria" }]}>
                  <Input type="date" />
                 </Form.Item>
                  </Col> 
                <Col span={6}>
                  <Form.Item
                    label="Fecha de vencimiento"
                    name="fechaVencimiento"
                    rules={[{ required: true, message: "La fecha de vencimiento es obligatoria" }]}>
                    <Input type="date" />
                   </Form.Item>
                    </Col>     
              </Row>
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
            <Row gutter={15}>
            <Col span={8}>
                  <Form.Item
                    label="Evento"
                    name="evento"
                    rules={[{ required: true, message: "El evento es obligatorio" }]}
                  >
                    <Select placeholder="Selecciona un evento">
                      <Option value="JUDUCA">JUDUCA</Option>
                      <Option value="SUCA">SUCA</Option>
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
              <Row gutter={15}>
              <Col span={9}>
                  <Form.Item
                    label="Tipo de acceso"
                    name="tipAcceso"
                    rules={[{ required: true, message: "El acceso es obligatorio" }]}
                  >
                    <Select placeholder="Selecciona un tipo de acceso">
                      <Option value="ATLETA">ATLETA</Option>
                      <Option value="ENTRENADOR">ENTRENADOR</Option>
                      <Option value="AUTORIDAD">AUTORIDAD</Option>
                      <Option value="ORGANIZADOR">ORGANIZADOR</Option>
                      <Option value="VOLUNTARIO">VOLUNTARIO</Option>
                      <Option value="PRENSA">PRENSA</Option>
                    </Select>
                  </Form.Item>
                </Col>

                <Col span={6}>
                  <Form.Item
                    label="Fecha de emision"
                    name="fechaEmision"
                    rules={[{ required: true, message: "La fecha de emision es obligatoria" }]}>
                    <Input type="date" />
                   </Form.Item>
                    </Col> 
                    <Col span={6}>
                    <Form.Item
                    label="Fecha de vencimiento"
                    name="fechaVencimiento"
                    rules={[{ required: true, message: "La fecha de vencimiento es obligatoria" }]}>
                    <Input type="date" />
                   </Form.Item>
                    </Col> 

              </Row>
              <Row gutter={16}>
              <Col span={7}>
                  <Form.Item
                    label="Estado"
                    name="estado"
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
        mensaje={`¿Estás seguro de que deseas eliminar la credencial ${registroSeleccionado?.participante}?`} // Mensaje de confirmación
      />

       {/* Modal para detalles */}
      <ModalDetalles
        show={showDetailsModal} // Controla la visibilidad del modal
        onHide={() => setShowDetailsModal(false)} // Función para cerrar el modal
        titulo="Detalles de la credencial" // Título del modal
        detalles={registroSeleccionado || {}} // Detalles del usuario seleccionado
        width={500} // Ancho personalizado
      />
    </div>
  );
}

export default CrearCredenciales;