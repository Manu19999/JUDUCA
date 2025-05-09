import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Tabla from "../../components/Crud/Tabla.jsx";
import Nav from "../../components/Dashboard/navDashboard.jsx";
import ModalNuevo from "../../components/Crud/Modal/ModalNuevo.jsx";
import ModalEditar from "../../components/Crud/Modal/ModalEditar.jsx";
import ModalConfirmacion from "../../components/Crud/Modal/ModalConfirmacion.jsx";
import { mostrarMensajeExito } from "../../components/Crud/MensajeExito.jsx";
import { mostrarMensajeError } from "../../components/Crud/MensajeError"; // Importar el componente de mensaje de error
import { Input,Form } from "antd";
import { Button } from "react-bootstrap";
import "../../styles/Credencial/credencial.css";
import { FaGlobe } from "react-icons/fa";
import { FaArrowLeft  } from "react-icons/fa";
import BotonRegresar from "../../components/Dashboard/BotonRegresar";
function MantenimientoPaises() {
  const navigate = useNavigate();
    
  // Estados para controlar la visibilidad de los modales
  const [showNuevoModal, setShowNuevoModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  // Estado para almacenar el usuario seleccionado (para editar, eliminar)
  const [registroSeleccionado, setRegistroSeleccionado] = useState(null);
  // Hooks de Ant Design para gestionar formularios
  const [formNuevo] = Form.useForm(); // Formulario para el modal de nuevo registro
  const [formEditar] = Form.useForm(); // Formulario para el modal de edición
  const [paises, setPaises] = useState([]);

  // Llamar a la API para obtener los paises
  useEffect(() => {
    const obtenerPaises = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/paises"); // Endpoint de la API
        if (!response.ok) {
          throw new Error("Error al obtener los países");
        }
        const data = await response.json();
        setPaises(data.data); // Actualizar el estado con los paises obtenidos
      } catch (error) {
        console.error("Error:", error);
        mostrarMensajeError("Error al cargar los países. Inténtalo de nuevo más tarde.");
      }
    };

    obtenerPaises();
  }, []); // El array vacío asegura que esto solo se ejecute una vez al montar el componente
  


  // Columnas de la tabla de usuarios
  const columnas = [
    { nombre: "#", campo: "indice", ancho: "5%" },
    { nombre: "País", campo: "nombre", ancho: "30%" },
    { nombre: "Acción", campo: "accion", ancho: "10%" },
  ];

  const handleNuevoRegistro = () => {
    setShowNuevoModal(true);
  };

  // Abrir modal de edición
  const handleEdit = (id) => {
    const registro = paises.find((d) => d.idPais === id); // Busca el usuario por ID
    setRegistroSeleccionado(registro); // Guarda el registro seleccionado
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
    const registro = paises.find((d) => d.idPais === id);
    setRegistroSeleccionado(registro);
    setShowDeleteModal(true); // Abrir el modal de eliminación
  };

  // Guardar nuevo registro
  const handleGuardarNuevo = () => {
    formNuevo
      .validateFields() // Valida los campos del formulario
      .then((values) => {
        console.log("Nuevo registro:", values);
        setShowNuevoModal(false); // Cierra el modal
        formNuevo.resetFields(); // Limpiar el formulario de nuevo registro
        mostrarMensajeExito("El país se ha registrado correctamente."); // Mensaje de éxito
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
        mostrarMensajeExito("El país se ha actualizado correctamente."); // Mensaje de éxito
      })
      .catch((error) => {
        console.error("Error al validar el formulario:", error); // Manejo de errores
      });
  };

  // Confirmar eliminación de un usuario
  const handleConfirmarDelete = () => {
    setShowDeleteModal(false);
    mostrarMensajeExito("El país se ha eliminado correctamente.");
  };

  return (
    <div className="crud">
      <Nav />
      <BotonRegresar to="/mantenimientoView" text="Regresar"  />
      {/* componente de navegación del  navdashboard */}
      <Tabla
        columnas={columnas} // Columnas de la tabla
        datos={paises.map((pais) => ({ ...pais, id: pais.idPais }))}  // Datos de la tabla
        titulo="Gestión de Países" // Título de la tabla
        icono={<FaGlobe className="icono-titulo" />} // Ícono del título
        onNuevoRegistro={handleNuevoRegistro} // Función para abrir el modal de nuevo registro
        onGenerarReporte={() => console.log("Generar reporte en PDF")} // Función para generar reporte
        onEdit={handleEdit} // Función para abrir el modal de edición
        onDelete={handleDelete} // Función para abrir el modal de eliminación
      />

      {/* Modal para Nuevo Registro */}
      <ModalNuevo
        show={showNuevoModal} // Controla la visibilidad del modal
        onHide={() => setShowNuevoModal(false)} // Función para cerrar el modal
        titulo="Nuevo País" // Título del modal
        onGuardar={handleGuardarNuevo} // Función para guardar el nuevo registro
        form={formNuevo} // Pasar el formulario al modal
        width={500} // Ancho del modal
      >
        <Form layout="vertical" form={formNuevo}>
          <Form.Item label="Nombre" name="nombre" rules={[{ required: true, message: "El nombre del país es obligatorio",},]}>
            <Input placeholder="Ingresa el nombre del país" />
          </Form.Item>   
        </Form>
      </ModalNuevo>

      {/* Modal para Editar Registro */}
      <ModalEditar
        show={showEditModal} // Controla la visibilidad del modal
        onHide={handleCerrarEditModal} // Función para cerrar el modal
        titulo="Editar País" // Título del modal
        onGuardar={handleGuardarEdit} // Función para guardar los cambios
        form={formEditar} // Formulario del modal
        registroSeleccionado={registroSeleccionado} // Usuario seleccionado
        width={500} // Ancho del modal
      >
        <Form layout="vertical" form={formEditar} initialValues={registroSeleccionado || {}}>
          <Form.Item label="Nombre"name="nombre"rules={[{required: true, message: "El nombre del país es obligatorio",},]}>
            <Input placeholder="Ingresa el nombre del país" />
          </Form.Item>
        </Form>
      </ModalEditar>

      {/* Modal para Confirmar Eliminación */}
      <ModalConfirmacion
        show={showDeleteModal} // Controla la visibilidad del modal
        onHide={() => setShowDeleteModal(false)} // Función para cerrar el modal
        onConfirmar={handleConfirmarDelete} // Función para confirmar la eliminación
        mensaje={`¿Estás seguro de que deseas eliminar el país ${registroSeleccionado?.nombre}?`} // Mensaje de confirmación
      />
    </div>
  );
}

export default MantenimientoPaises;
