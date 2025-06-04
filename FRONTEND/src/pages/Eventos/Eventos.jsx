import React, { useState, useEffect } from "react";
import Tabla from "../../components/Crud/Tabla";
import Nav from '../../components/Dashboard/navDashboard';
import { FaCalendar } from 'react-icons/fa';
import ModalNuevo from "../../components/Crud/Modal/ModalNuevo";
import ModalEditar from "../../components/Crud/Modal/ModalEditar";
import ModalDetalles from "../../components/Crud/Modal/ModalDetalles";
import { mostrarMensajeExito } from "../../components/Crud/MensajeExito";
import { mostrarMensajeError } from "../../components/Crud/MensajeError"; // Importar el componente de mensaje de error
import { Input, Select, Form, Card, Row, Col, DatePicker, Tabs, Button, Checkbox } from 'antd';
import { validatePassword } from '../../components/Login/validaciones';
import ValidatedInput from "../../utils/ValidatedInput";
import SubirImagen from '../../components/SubirImagen';
import moment from 'moment';
const { Option } = Select;
const { TabPane } = Tabs;
import BotonRegresar from "../../components/Dashboard/BotonRegresar";

function Eventos() {
    // Estados para controlar la visibilidad de los modales
    const [showNuevoModal, setShowNuevoModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    // Estado para almacenar el usuario seleccionado (para editar, eliminar o ver detalles)
    const [registroSeleccionado, setRegistroSeleccionado] = useState(null);
    // Hooks de Ant Design para gestionar formularios
    const [formNuevo] = Form.useForm(); // Formulario para el modal de nuevo registro
    const [formEditar] = Form.useForm(); // Formulario para el modal de edición
    const [eventos, setEventos] = useState([]); // Estado para almacenar los usuarios

    const obtenerEventos = async () => {
        try {
            const response = await fetch("http://localhost:4000/api/credencial/", {
                method: "GET",
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                }
            });
            if (!response.ok) {
                throw new Error("Error al obtener los eventos");
            }

            const data = await response.json();
            setEventos(data.data);
        } catch (error) {
            console.error("Error:", error);
            mostrarMensajeError("Error al cargar los eventos. Inténtalo de nuevo más tarde.");
        }
    };

    // Llamar a la API para obtener los eventos
    useEffect(() => {
        obtenerEventos();
    }, []); // El array vacío asegura que esto solo se ejecute una vez al montar el componente


    const columnas = [
        { nombre: '#', campo: 'indice', ancho: '5%' },
        { nombre: 'Evento', campo: 'nombreEvento', ancho: '20%' },
        { nombre: 'Descripcion', campo: 'descripcion', ancho: '40%' },
        { nombre: 'Ubicacion', campo: 'ubicacion', ancho: '22%' },
        { nombre: 'Fecha Inicio', campo: 'fechaInicio', ancho: '22%' },
        { nombre: 'Fecha Final', campo: 'fechaFin', ancho: '22%' },
        {
            nombre: 'Estado',
            campo: 'activo',
            ancho: '18%',
            render: (activo) => {
                const estadoTexto = activo === 1 ? 'Activo' : 'Inactivo';
                const claseEstado = activo === 1 ? 'estado-activo' : 'estado-inactivo';

                return (
                    <span className={claseEstado}>
                        {estadoTexto}
                    </span>
                );
            }
        },
        { nombre: 'Acción', campo: 'accion', ancho: '20%' }
    ];
    // Abrir modal de nuevo registro
    const handleNuevoRegistro = () => {
        setShowNuevoModal(true);
    };

    // Abrir modal de edición
    const handleEdit = (id) => {
        const registro = eventos.find((d) => d.idEvento === id);
        setRegistroSeleccionado({
            ...registro
        });
        setShowEditModal(true);
    };

    // Cerrar el modal de edición y reiniciar el formulario
    const handleCerrarEditModal = () => {
        setShowEditModal(false);
        setRegistroSeleccionado(null); // Limpiar el registro seleccionado
        formEditar.resetFields(); // Reiniciar el formulario
    };

    const handleCerrarNuevoModal = () => {
        setShowNuevoModal(false);
        formNuevo.resetFields(); // Esto limpiará todos los campos del formulario
    };

    // Abrir modal de detalles
    const handleDetails = (id) => {
        const registro = eventos.find((d) => d.idEvento === id);
        setRegistroSeleccionado(registro);
        setShowDetailsModal(true);
    };

    // Guardar nuevo registro de usuario
    const handleGuardarNuevo = async () => {
        formNuevo.validateFields()
            .then(async (values) => {
                try {
                    // Preparar los datos del evento
                    const eventoData = {
                        nombre: values.nombre,
                        descripcion: values.descripcion,
                        fechaInicio: values.fechaInicio ? values.fechaInicio.format('YYYY-MM-DD') : null,
                        fechaFin: values.fechaFin ? values.fechaFin.format('YYYY-MM-DD') : null,
                        activo: values.activo,
                        idObjeto: 3 // ID del objeto para auditoría si aplica
                    };

                    const response = await fetch("http://localhost:4000/api/eventos/insEventos", {
                        method: "POST",
                        credentials: 'include',
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(eventoData),
                    });

                    const data = await response.json();

                    if (!response.ok) {
                        throw new Error(data.errors?.[0] || "Error al registrar el evento");
                    }

                    await obtenerEventos();
                    setShowNuevoModal(false);
                    formNuevo.resetFields();
                    mostrarMensajeExito("El evento se ha registrado correctamente.");
                } catch (error) {
                    console.error("Error:", error);
                    mostrarMensajeError(error.message);
                }
            })
            .catch((error) => {
                console.error("Error al validar el formulario:", error);
            });
    };
    /*
      // Guardar cambios en el registro editado
      const handleGuardarEdit = async () => {
        try {
          // Validar los campos del formulario
          const values = await formEditar.validateFields();
    
          // Preparar los datos para enviar al backend
          const usuarioData = {
            idRol: values.idRol,
            idEstadoUsuario: values.idEstadoUsuario,
            idGenero: values.idGenero,
            idUniversidad: values.idUniversidad,
            nombreUsuario: values.nombreUsuario,
            email: values.email,
            nombreCompleto: values.nombreCompleto,
            telefono: values.telefono,
            tipoSangre: values.tipoSangre,
            nombreContactoEmergencia: values.nombreContactoEmergencia,
            telefonoContactoEmergencia: values.telefonoContactoEmergencia,
            fechaNacimiento: values.fechaNacimiento ? values.fechaNacimiento.format('YYYY-MM-DD') : null,
            fotoUrl: values.fotoUrl || null,
            idObjeto: 4, // ID del objeto según tu sistema
            // La contraseña solo se envía si se modificó
            contrasena: values.contrasena || undefined
          };
    
          // Llamar a la API para actualizar el usuario
          const response = await fetch(`http://localhost:4000/api/usuarios/${registroSeleccionado.idUsuario}`, {
            method: "PUT",
            credentials: 'include',
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(usuarioData),
          });
    
          const data = await response.json();
    
          if (!response.ok) {
            throw new Error(data.errors?.[0] || "Error al actualizar el usuario");
          }
    
          // Mostrar mensaje de éxito
          mostrarMensajeExito("El usuario se ha actualizado correctamente.");
    
          // Cerrar el modal de edición
          setShowEditModal(false);
          setRegistroSeleccionado(null);
          formEditar.resetFields();
    
          // Recargar los usuarios desde la API
          await obtenerUsuarios();
    
        } catch (error) {
          console.error("Error al actualizar usuario:", error);
          
          // Manejo de errores específicos
          if (error.message.includes('UNIQUE KEY constraint')) {
            mostrarMensajeError("El nombre de usuario o email ya está en uso");
          } else if (error.message.includes('FOREIGN KEY constraint')) {
            mostrarMensajeError("Referencia inválida (rol, estado, género o universidad no existe)");
          } else {
            mostrarMensajeError(error.message || "Error al actualizar el usuario");
          }
        }
      };
      */

    return (
        <div className="crud">
            <Nav />{/* componente de navegación del  navdashboard */}
            <BotonRegresar to="/eventos" text="Regresar" />
            <Tabla
                columnas={columnas}// Columnas de la tabla
                datos={eventos.map((evento) => ({ ...evento, id: evento.idEvento }))}  // Usar los usuarios obtenidos de la API
                titulo="Gestión de eventos" // Título de la tabla
                icono={<FaCalendar className="icono-titulo" />} // Ícono del título
                onNuevoRegistro={handleNuevoRegistro}// Función para abrir el modal de nuevo registro
                onGenerarReporte={() => console.log("Generar reporte en PDF")} // Función para generar reporte
                onEdit={handleEdit} // Función para abrir el modal de edición
                onDetails={handleDetails} // Función para abrir el modal de detalles
            />

            {/* Modal para Nuevo Registro */}
            <ModalNuevo
                show={showNuevoModal} // Controla la visibilidad del modal
                onHide={handleCerrarNuevoModal} // Función para cerrar el modal
                titulo="Nuevo Evento" // Título del modal
                onGuardar={handleGuardarNuevo} // Función para guardar el nuevo registro
                form={formNuevo} // Pasar el formulario al modal
                width={800} // Ancho del modal
            >
                <Form layout="vertical" form={formNuevo}>
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="Datos del Evento" key="1">
                            <Row gutter={40}>
                                <Col span={13}>
                                    <ValidatedInput
                                        label="Nombre del evento"
                                        name="nombre"
                                        placeholder="Ingresa el nombre del evento"
                                        rules={[{ required: true, message: "El nombre del evento es obligatorio" }]}
                                        allowSpecialChars={true}  // Según si permites o no
                                        maxLength={100}
                                    />
                                </Col>

                                 <Col span={11}>
                                    <ValidatedInput
                                        label="Ubicacion del evento"
                                        name="ubicacion"
                                        placeholder="Ingresa la ubicacion"
                                        rules={[{ required: true, message: "La ubicacion es obligatoria" }]}
                                        allowSpecialChars={true}
                                        maxLength={100}
                                    />
                                </Col>
                            </Row>

                            <Row gutter={40}>
                                <Col span={24}>
                                    <ValidatedInput
                                        label="Descripción del evento"
                                        name="descripcion"
                                        placeholder="Ingresa la descripción"
                                        rules={[{ required: true, message: "La descripción es obligatoria" }]}
                                        allowSpecialChars={true}
                                        maxLength={500}
                                        textarea  // Si tu ValidatedInput soporta textarea
                                    />
                                </Col>
                            </Row>

                            <Row gutter={40}>
                                <Col span={12}>
                                    <Form.Item
                                        label="Fecha de Inicio"
                                        name="fechaInicio"
                                        rules={[{ required: true, message: "La fecha de inicio es obligatoria" }]}
                                    >
                                        <DatePicker format="YYYY-MM-DD" />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        label="Fecha Final"
                                        name="fechaFin"
                                        rules={[{ required: true, message: "La fecha final es obligatoria" }]}
                                    >
                                        <DatePicker format="YYYY-MM-DD" />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row gutter={40}>
                                <Col span={10}>
                                    <Form.Item label="Imagen del Evento" name="imagenUrl">
                                        <SubirImagen
                                            onImagenSubida={(url) => formNuevo.setFieldsValue({ imagenUrl: url })}
                                            imagenActual={null}
                                            form={formNuevo}
                                            key={showNuevoModal ? 'open' : 'closed'}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={10}>
                                    <Form.Item
                                        name="activo"
                                        valuePropName="checked"
                                        rules={[{ required: true, message: "Debes seleccionar si el evento está activo" }]}
                                    >
                                        <Checkbox>Evento activo</Checkbox>
                                    </Form.Item>
                                </Col>

                            </Row>
                        </TabPane>
                    </Tabs>
                </Form>
            </ModalNuevo>



            {/* Modal para detalles */}
            <ModalDetalles
                show={showDetailsModal}
                onHide={() => setShowDetailsModal(false)}
                titulo="Detalles del Evento"
                detalles={registroSeleccionado || {}}
                width={800}
                tipo="evento" // <-- esta línea es clave
            />
        </div>
    );
}

export default Eventos;