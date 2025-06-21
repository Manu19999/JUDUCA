import React, { useState, useEffect } from "react";
import Tabla from "../../components/Crud/Tabla";
import Nav from '../../components/Dashboard/navDashboard';
import { FaUserCog } from 'react-icons/fa';
import ModalNuevo from "../../components/Crud/Modal/ModalNuevo";
import ModalEditar from "../../components/Crud/Modal/ModalEditar";
import ModalConfirmacion from "../../components/Crud/Modal/ModalConfirmacion";
import { mostrarMensajeExito } from "../../components/Crud/MensajeExito";
import { mostrarMensajeError } from "../../components/Crud/MensajeError"; // Importar el componente de mensaje de error
import { Input, Form, Switch, Select , Row, Col} from 'antd';
import ValidatedInput from "../../utils/ValidatedInput"; 
import BotonRegresar from "../../components/Dashboard/BotonRegresar";
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

function Permisos() {
  const [showNuevoModal, setShowNuevoModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [registroSeleccionado, setRegistroSeleccionado] = useState(null);
  const [formNuevo] = Form.useForm(); // Formulario para el modal de nuevo registro
  const [formEditar] = Form.useForm(); // Formulario para el modal de edición
  const [permisos, setPermisos] = useState([]); // Estado para almacenar los permisos
  const [objetos, setObjetos] = useState([]);
  const [roles, setRoles] = useState([]);
  
  //función reutilizable para obtener los permisos
  const obtenerPermisos = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/permisos", {
        method: "GET",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        }
      });
      if (!response.ok) {
        throw new Error("Error al obtener los permisos");
      }

      const data = await response.json();
      setPermisos(data.data); // Actualizar el estado con los permisos obtenidos
    } catch (error) {
      console.error("Error:", error);
      mostrarMensajeError("Error al cargar los permisos. Inténtalo de nuevo más tarde.");
    }
  };

  // Llamar a la API para obtener los permisos
  useEffect(() => {
    obtenerPermisos();
  }, []); // El array vacío asegura que esto solo se ejecute una vez al montar el componente


    // Obtener lista de objetos
    const obtenerObjetos = async () => {
        try {
          const response = await fetch("http://localhost:4000/api/objetos", {
            method: "GET",
            credentials: 'include',
            headers: {
              "Content-Type": "application/json",
            }
          });
          if (!response.ok) throw new Error("Error al obtener los objetos");
          const data = await response.json();
          setObjetos(data.data);
        } catch (error) {
          console.error("Error:", error);
          mostrarMensajeError("Error al cargar los objetos.");
        }
      };
    
      // Obtener lista de roles
      const obtenerRoles = async () => {
        try {
          const response = await fetch("http://localhost:4000/api/roles", {
            method: "GET",
            credentials: 'include',
            headers: {
              "Content-Type": "application/json",
            }
          });
          if (!response.ok) throw new Error("Error al obtener los roles");
          const data = await response.json();
          setRoles(data.data);
        } catch (error) {
          console.error("Error:", error);
          mostrarMensajeError("Error al cargar los roles.");
        }
    };
    
    useEffect(() => {
    obtenerObjetos();
    obtenerRoles();
    }, []);
      
  // Columnas de la tabla
  const renderPermiso = (valor) => (
    <div 
      aria-label={valor ? "Permiso concedido" : "Permiso denegado"}
      style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        width: '60%',
        height: '100%'
      }}
    >
      {valor ? 
        <CheckCircleOutlined style={{ color: 'green', fontSize: '20px' }} title="Sí" /> : 
        <CloseCircleOutlined style={{ color: 'red', fontSize: '20px' }} title="No" />}
    </div>
  );
  
  const columnas = [
    { nombre: '#', campo: 'indice', ancho: '5%' },
    { nombre: 'Objeto', campo: 'nombreObjeto', ancho: '30%' },
    { nombre: 'Rol', campo: 'nombreRol', ancho: '30%' },
    { nombre: 'Inserción', campo: 'permisoInsercion', ancho: '25%', render: renderPermiso },
    { nombre: 'Eliminación', campo: 'permisoEliminacion', ancho: '25%', render: renderPermiso },
    { nombre: 'Actualización', campo: 'permisoActualizacion', ancho: '25%', render: renderPermiso },
    { nombre: 'Consultar', campo: 'permisoConsultar', ancho: '25%', render: renderPermiso },
    { nombre: 'Acción', campo: 'accion', ancho: '20%' }
  ];
  

  // Abrir modal de nuevo registro
  const handleNuevoRegistro = () => {
    setShowNuevoModal(true);
  };

  // Abrir modal de edición
  const handleEdit = (id) => {
    const registro = permisos.find((d) => d.idPermiso === id);
    setRegistroSeleccionado(registro); // Actualizar el registro seleccionado
    setShowEditModal(true); // Abrir el modal de edición
  };
  // cerrar modal de edición
  const handleCerrarEditModal = () => {
    setShowEditModal(false);
    setRegistroSeleccionado(null); // Limpiar el registro seleccionado
    formEditar.resetFields(); // Reiniciar el formulario
  };

  // Guardar nuevo registro
  const handleGuardarNuevo = async () => {
    formNuevo.validateFields()
    .then(async (values) => {
      try {

        const response = await fetch("http://localhost:4000/api/permisos", {
          method: "POST",
          credentials: 'include',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
              idObjeto: values.idObjeto,
              idRol: values.idRol,
              permisoInsercion: values.permisoInsercion,
              permisoEliminacion: values.permisoEliminacion,
              permisoActualizacion: values.permisoActualizacion,
              permisoConsultar: values.permisoConsultar,
              idObjetoBitacora: 8,
          }),
          
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.errors?.[0] || "Error al insertar el permiso");
        }
        // Recargar los datos desde la API
        await obtenerPermisos();

        setShowNuevoModal(false);
        formNuevo.resetFields(); // Limpiar el formulario de nuevo registro
        mostrarMensajeExito("El permiso se ha registrado correctamente."); // Mensaje de éxito
      } catch (error) {
        console.error("Error:", error);
        mostrarMensajeError(error.message);
      }
    })
   .catch((error) => {
      console.error("Error al validar el formulario:", error);
    });
  };

  // Guardar cambios en el registro editado (para permisos)
  const handleGuardarEdit = async () => {
    try {
      // Validar los campos del formulario
      const values = await formEditar.validateFields();

      // Llamar a la API para actualizar el rol
      const response = await fetch(`http://localhost:4000/api/permisos/${registroSeleccionado.idPermiso}`, {
        method: "PUT",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            idObjeto: values.idObjeto,
            idRol: values.idRol,
            permisoInsercion: values.permisoInsercion,
            permisoEliminacion: values.permisoEliminacion,
            permisoActualizacion: values.permisoActualizacion,
            permisoConsultar: values.permisoConsultar,
            idObjetoBitacora: 8,
        }),
      });

      // Manejar la respuesta de la API
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.errors?.[0] || "Error al actualizar el rol");
      }

      // Mostrar mensaje de éxito
      mostrarMensajeExito("El permiso se ha actualizado correctamente.");

      // Cerrar el modal de edición
      setShowEditModal(false);
      setRegistroSeleccionado(null);
      formEditar.resetFields();

      // Recargar los permisos desde la API
      await obtenerPermisos();
    } catch (error) {
      // Mostrar mensaje de error
      mostrarMensajeError(error.message);
    }
  };


  return (
    <div className="crud">
      <Nav />
      <BotonRegresar to="/roles" text="Regresar" />
      <Tabla
        columnas={columnas}
        datos={permisos.map((permiso) => ({ ...permiso, id: permiso.idPermiso }))}  // Usar los permisos obtenidos de la API
        titulo="Gestión de Permisos"
        icono={<FaUserCog className="icono-titulo" />}
        onNuevoRegistro={handleNuevoRegistro}
        onGenerarReporte={() => console.log("Generar reporte en PDF")}
        onEdit={handleEdit}
      />

      {/* Modal para Nuevo Registro */}
      <ModalNuevo
        show={showNuevoModal}
        onHide={() => setShowNuevoModal(false)}
        titulo="Nuevo Registro de Permisos"
        onGuardar={handleGuardarNuevo}
        form={formNuevo}
        width={700} // Aumenté un poco el ancho para acomodar mejor las dos columnas
        >
        <Form layout="vertical" form={formNuevo}>
            <Row gutter={16}> {/* gutter es el espacio entre columnas */}
                <Col span={12}> {/* Cada columna ocupa la mitad del espacio (12 de 24) */}
                <Form.Item
                    name="idObjeto"
                    label="Objeto"
                    rules={[{ required: true, message: 'Seleccione un objeto' }]}
                >
                    <Select placeholder="Selecciona un objeto">
                    {objetos.map((objeto) => (
                        <Option key={objeto.idObjeto} value={objeto.idObjeto}>
                        {objeto.nombre}
                        </Option>
                    ))}
                    </Select>
                </Form.Item>
                </Col>
                <Col span={12}>
                <Form.Item
                    name="idRol"
                    label="Rol"
                    rules={[{ required: true, message: 'Seleccione un rol' }]}
                >
                    <Select placeholder="Selecciona un rol">
                        {roles.map((rol) => (
                        <Option key={rol.idRol} value={rol.idRol}>
                            {rol.nombre}
                        </Option>
                        ))}
                    </Select>
                </Form.Item>
                </Col>
            </Row>

            <div style={{ marginTop: 24 }}>
            <Row gutter={16}>
                <Col span={6}>
                <Form.Item
                    name="permisoInsercion"
                    label="Inserción"
                    valuePropName="checked"
                    initialValue={false}
                >
                    <Switch 
                    checkedChildren="Sí" 
                    unCheckedChildren="No" 
                    />
                </Form.Item>
                </Col>
                <Col span={6}>
                <Form.Item
                    name="permisoEliminacion"
                    label="Eliminación"
                    valuePropName="checked"
                    initialValue={false}
                >
                    <Switch 
                    checkedChildren="Sí" 
                    unCheckedChildren="No" 
                    />
                </Form.Item>
                </Col>
                <Col span={6}>
                <Form.Item
                    name="permisoActualizacion"
                    label="Actualización"
                    valuePropName="checked"
                    initialValue={false}
                >
                    <Switch 
                    checkedChildren="Sí" 
                    unCheckedChildren="No" 
                    />
                </Form.Item>
                </Col>
                <Col span={6}>
                <Form.Item
                    name="permisoConsultar"
                    label="Consulta"
                    valuePropName="checked"
                    initialValue={false}
                >
                    <Switch 
                    checkedChildren="Sí" 
                    unCheckedChildren="No" 
                    />
                </Form.Item>
                </Col>
            </Row>
            </div>
        </Form>
     </ModalNuevo>

      {/* Modal para Editar Registro */}
      <ModalEditar
        show={showEditModal}
        onHide={handleCerrarEditModal}
        titulo="Editar Permisos"
        onGuardar={handleGuardarEdit}
        form={formEditar}
        registroSeleccionado={registroSeleccionado}
        width={700} // Ancho personalizado
      >
        <Form layout="vertical" form={formEditar} initialValues={registroSeleccionado || {}}>
        <Row gutter={16}>
      <Col span={12}>
        <Form.Item
          name="idObjeto"
          label="Objeto"
          rules={[{ required: true, message: 'Seleccione un objeto' }]}
        >

        <Select placeholder="Selecciona un objeto">
            {objetos.map((objeto) => (
                <Option key={objeto.idObjeto} value={objeto.idObjeto}>
                {objeto.nombre}
                </Option>
            ))}
        </Select>

        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          name="idRol"
          label="Rol"
          rules={[{ required: true, message: 'Seleccione un rol' }]}
        >
          <Select placeholder="Selecciona un rol">
                {roles.map((rol) => (
                <Option key={rol.idRol} value={rol.idRol}>
                    {rol.nombre}
                </Option>
                ))}
            </Select>
        </Form.Item>
      </Col>
    </Row>

    <div style={{ marginTop: 24 }}>
      <Row gutter={16}>
        <Col span={6}>
          <Form.Item
            name="permisoInsercion"
            label="Inserción"
            valuePropName="checked"
          >
            <Switch 
              checkedChildren="Sí" 
              unCheckedChildren="No" 
            />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            name="permisoEliminacion"
            label="Eliminación"
            valuePropName="checked"
          >
            <Switch 
              checkedChildren="Sí" 
              unCheckedChildren="No" 
            />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            name="permisoActualizacion"
            label="Actualización"
            valuePropName="checked"
          >
            <Switch 
              checkedChildren="Sí" 
              unCheckedChildren="No" 
            />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            name="permisoConsultar"
            label="Consulta"
            valuePropName="checked"
          >
            <Switch 
              checkedChildren="Sí" 
              unCheckedChildren="No" 
            />
          </Form.Item>
        </Col>
      </Row>
      </div>
        </Form>
      </ModalEditar>

    </div>
  );
}

export default Permisos;