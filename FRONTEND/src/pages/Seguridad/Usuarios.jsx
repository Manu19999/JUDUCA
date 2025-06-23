import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Tabla from "../../components/Crud/Tabla";
import Nav from '../../components/Dashboard/navDashboard';
import { FaUser } from 'react-icons/fa';
import ModalNuevo from "../../components/Crud/Modal/ModalNuevo";
import ModalEditar from "../../components/Crud/Modal/ModalEditar";
import ModalDetalles from "../../components/Crud/Modal/ModalDetalles";
import { mostrarMensajeExito } from "../../components/Crud/MensajeExito";
import { mostrarMensajeError } from "../../components/Crud/MensajeError"; // Importar el componente de mensaje de error
import { Input, Select, Form, Card,Row, Col, DatePicker,Tabs, Button } from 'antd';
import { validatePassword } from '../../components/Login/validaciones'; 
import ValidatedInput from "../../utils/ValidatedInput"; 
import SubirImagen from '../../components/SubirImagen';
import moment from 'moment';
const { Option } = Select;
const { TabPane } = Tabs;
import BotonRegresar from "../../components/Dashboard/BotonRegresar";
import { fetchWithAuth } from '../../utils/api';
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
 // lista de las fk
  const [generos, setGeneros] = useState([]);
  const [universidades, setUniversidades] = useState([]);
  const [roles, setRoles] = useState([]);
  const [estadosusuario,setEstadosUsuario]=useState([]);
  const [passwordGenerada, setPasswordGenerada] = useState("");
  const tiposSangre = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const navigate = useNavigate();

  // Función para generar una contraseña aleatoria
  const generarContrasena = () => {
    const mayusculas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const minusculas = "abcdefghijklmnopqrstuvwxyz";
    const numeros = "0123456789";
    const especiales = "@$!%*?&";
    const todos = mayusculas + minusculas + numeros + especiales;
  
    // Garantiza al menos un carácter de cada tipo
    let contrasena = "";
    contrasena += mayusculas.charAt(Math.floor(Math.random() * mayusculas.length));
    contrasena += minusculas.charAt(Math.floor(Math.random() * minusculas.length));
    contrasena += numeros.charAt(Math.floor(Math.random() * numeros.length));
    contrasena += especiales.charAt(Math.floor(Math.random() * especiales.length));
  
    // Rellenar hasta 10 caracteres
    for (let i = contrasena.length; i < 8; i++) {
      contrasena += todos.charAt(Math.floor(Math.random() * todos.length));
    }
  
    // Mezclar la contraseña
    contrasena = contrasena.split('').sort(() => Math.random() - 0.5).join('');
  
    setPasswordGenerada(contrasena);
    return contrasena; // Devuelve la contraseña generada
  };

  // Función para generar nombre de usuario único basado en el nombre completo
  const generarNombreUsuario = (nombreCompleto, usuariosExistentes) => {
    if (!nombreCompleto) return "";
    
    // Limpiar y preparar el nombre
    const nombreLimpio = nombreCompleto
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // Eliminar acentos
      .toLowerCase()
      .replace(/[^a-z0-9 ]/g, ""); // Eliminar caracteres especiales
    
    const partesNombre = nombreLimpio.split(" ").filter(Boolean);
    
    if (partesNombre.length === 0) return "";
    
    // Generar diferentes variantes
    const variantes = [];
    
    // Variante 1: primera letra del nombre + apellido (jperez)
    if (partesNombre.length > 1) {
      variantes.push(`${partesNombre[0][0]}${partesNombre[partesNombre.length - 1]}`);
    }
    
    // Variante 2: nombre.apellido (juan.perez)
    if (partesNombre.length > 1) {
      variantes.push(`${partesNombre[0]}.${partesNombre[partesNombre.length - 1]}`);
    }
    
    // Variante 3: primeras 3 letras del nombre + apellido (juaperez)
    if (partesNombre.length > 1 && partesNombre[0].length >= 3) {
      variantes.push(`${partesNombre[0].substring(0, 3)}${partesNombre[partesNombre.length - 1]}`);
    }
    
    // Variante 4: nombre completo sin espacios (juanperez)
    variantes.push(partesNombre.join(""));
    
    // Variante 5: primera letra de cada palabra (jp para Juan Pérez)
    if (partesNombre.length > 1) {
      variantes.push(partesNombre.map(p => p[0]).join(""));
    }
    
    // Verificar disponibilidad y agregar números si es necesario
    for (const variante of variantes) {
      let usuarioPropuesto = variante;
      let contador = 1;
      
      // Verificar si el usuario ya existe
      const existeUsuario = usuariosExistentes.some(
        u => u.nombreUsuario.toLowerCase() === usuarioPropuesto.toLowerCase()
      );
      
      if (!existeUsuario) {
        return usuarioPropuesto;
      }
      
      // Si existe, probar con números
      while (contador < 100) {
        usuarioPropuesto = `${variante}${contador}`;
        const existeConNumero = usuariosExistentes.some(
          u => u.nombreUsuario.toLowerCase() === usuarioPropuesto.toLowerCase()
        );
        
        if (!existeConNumero) {
          return usuarioPropuesto;
        }
        
        contador++;
      }
    }
    
    // Si todas las variantes están ocupadas, generar uno aleatorio
    return `user${Math.floor(Math.random() * 1000)}`;
  };

  //función reutilizable para obtener los roles
  const obtenerUsuarios = async () => {
    try {
      const response = await fetchWithAuth("http://localhost:4000/api/usuarios", {
        method: "GET",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
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
  
  //datos de las fk
  useEffect(() => {
    const obtenerGeneros = async () => {
      try {
        const response = await fetchWithAuth("http://localhost:4000/api/generos");
        if (!response.ok) throw new Error("Error al obtener los géneros");
        const data = await response.json();
        setGeneros(data.data);
      } catch (error) {
        console.error("Error:", error);
        mostrarMensajeError("Error al cargar los géneros.");
      }
    };
  
   const obtenerUniversidades = async () => {
      try {
        const response = await fetchWithAuth("http://localhost:4000/api/universidades", {
          method: "GET",
          credentials: 'include',
          headers: {
            "Content-Type": "application/json",
          }
        });
        if (!response.ok) {
          throw new Error("Error al obtener las universidades");
        }
        const data = await response.json();
        console.log("Datos de universidades recibidos:", data.data); // Para depuración
        setUniversidades(data.data); // Actualizar el estado con las universidades obtenidas
      } catch (error) {
        console.error("Error:", error);
        mostrarMensajeError("Error al cargar las universidades. Inténtalo de nuevo más tarde.");
      }
    };
  
    const obtenerRoles = async () => {
      try {
        const response = await fetchWithAuth("http://localhost:4000/api/roles", {
          method: "GET",
          credentials: 'include',
          headers: {
            "Content-Type": "application/json",
          }
        });
        if (!response.ok) {
          throw new Error("Error al obtener los roles");
        }
  
        const data = await response.json();
        setRoles(data.data); // Actualizar el estado con los roles obtenidos
      } catch (error) {
        console.error("Error:", error);
        mostrarMensajeError("Error al cargar los roles. Inténtalo de nuevo más tarde.");
      }
    };
  
    const obtenerEstadosUsuarios = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/estados-usuario", {
          method: "GET",
          credentials: 'include',
          headers: {
            "Content-Type": "application/json",
          }
        });
        if (!response.ok) {
          throw new Error("Error al obtener los estados");
        }
  
        const data = await response.json();
        setEstadosUsuario(data.data); // Actualizar el estado con los estados obtenidos
      } catch (error) {
        console.error("Error:", error);
        mostrarMensajeError("Error al cargar los estados. Inténtalo de nuevo más tarde.");
      }
    };

    obtenerGeneros();
    obtenerUniversidades();
    obtenerRoles();
    obtenerEstadosUsuarios();
  }, []);
  

  // Columnas de la tabla de usuarios
  const columnas = [
    { nombre: '#', campo: 'indice', ancho: '5%' },
    { nombre: 'Usuario', campo: 'nombreUsuario', ancho: '20%' },
    { nombre: 'Correo', campo: 'email', ancho: '40%' },
    { nombre: 'Rol', campo: 'nombreRol', ancho: '22%' },
    { 
      nombre: 'Estado', 
      campo: 'nombreEstadoUsuario', 
      ancho: '18%',
      render: (nombreEstado) => {
        const estadoMap = {
          'activo': 'activo',
          'inactivo': 'inactivo',
          'pendiente': 'pendiente',
          'bloqueado': 'bloqueado',
          // Agrega aquí otros estados que uses
        };
        
        const estadoClave = String(nombreEstado).toLowerCase().trim();
        const claseEstado = estadoMap[estadoClave] || 'default';
        
        return (
          <span className={`estado-activo ${claseEstado}`}>
            {nombreEstado}
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
    const registro = usuarios.find((d) => d.idUsuario === id);
    setRegistroSeleccionado({
      ...registro,
      fechaNacimiento: registro.fechaNacimiento ? moment(registro.fechaNacimiento) : null
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
    setPasswordGenerada(""); // Limpiar la contraseña generada si es necesario
  };

  // Abrir modal de detalles
  const handleDetails = (id) => {
    const registro = usuarios.find((d) => d.idUsuario === id);
    setRegistroSeleccionado(registro);
    setShowDetailsModal(true);
  };
 
 // Guardar nuevo registro de usuario
  const handleGuardarNuevo = async () => {
    formNuevo.validateFields()
      .then(async (values) => {
        try {
          // Preparar los datos para enviar al backend
          const usuarioData = {
            idRol: values.idRol,
            idEstadoUsuario: values.idEstadoUsuario, // Estado activo por defecto
            idGenero: values.idGenero,
            idUniversidad: values.idUniversidad,
            nombreUsuario: values.nombreUsuario,
            contrasena: values.contrasena,
            email: values.email,
            nombreCompleto: values.nombreCompleto,
            telefono: values.telefono,
            tipoSangre: values.tipoSangre,
            nombreContactoEmergencia: values.nombreContactoEmergencia,
            telefonoContactoEmergencia: values.telefonoContactoEmergencia,
            fechaNacimiento: values.fechaNacimiento ? values.fechaNacimiento.format('YYYY-MM-DD') : null,
            fotoUrl: values.fotoUrl || null,
            idObjeto: 4, // ID del objeto según tu sistema
          };

          const response = await fetchWithAuth("http://localhost:4000/api/usuarios", {
            method: "POST",
            credentials: 'include',
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(usuarioData),
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.errors?.[0] || "Error al insertar el usuario");
          }

          // Recargar los datos desde la API
          await obtenerUsuarios();

          setShowNuevoModal(false);
          formNuevo.resetFields();
          mostrarMensajeExito("El usuario se ha registrado correctamente.");
        } catch (error) {
          console.error("Error:", error);
          mostrarMensajeError(error.message);
        }
      })
      .catch((error) => {
        console.error("Error al validar el formulario:", error);
      });
  };

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
      const response = await fetchWithAuth(`http://localhost:4000/api/usuarios/${registroSeleccionado.idUsuario}`, {
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
        onEstados={() => navigate('/estados-usuario')} // boton para estados de usuario
      />

      {/* Modal para Nuevo Registro */}
      <ModalNuevo
        show={showNuevoModal} // Controla la visibilidad del modal
        onHide={handleCerrarNuevoModal} // Función para cerrar el modal
        titulo="Nuevo Usuario" // Título del modal
        onGuardar={handleGuardarNuevo} // Función para guardar el nuevo registro
        form={formNuevo} // Pasar el formulario al modal
        width={800} // Ancho del modal
      >
        <Form layout="vertical" form={formNuevo}>
          <Tabs defaultActiveKey="1">
            {/* Pestaña: Datos Personales */}
            <TabPane tab="Datos Personales" key="1">
              <Row gutter={40}>
                <Col span={14}>
                <ValidatedInput
                label="Nombre Completo"
                name="nombreCompleto"
                placeholder="Ingresa el nombre completo"
                rules={[{ required: true, message: "El nombre es obligatorio" }]}
                allowSpecialChars={false}
                maxLength={100}/>
                </Col>
                <Col style={{ width: "41%" }}>
                  <Form.Item
                    label="Género"
                    name="idGenero"
                    rules={[{ required: true, message: "El género es obligatorio" }]}
                  >
                  <Select placeholder="Selecciona el género">
                    {generos.map((genero) => (
                      <Option key={genero.idGenero} value={genero.idGenero}>
                        {genero.descripcion}
                      </Option>
                    ))}
                  </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={40}>
                <Col span={7}>
                  <Form.Item
                    label="Fecha de Nacimiento"
                    name="fechaNacimiento"
                    rules={[{ required: true, message: "La fecha de nacimiento es obligatoria" }]}
                  >
                    <DatePicker format="YYYY-MM-DD" />
                  </Form.Item>
                </Col>
                <Col style={{ width: "30%" }}>
                <Form.Item
                  label="Tipo de Sangre"
                  name="tipoSangre"
                >
                  <Select placeholder="Selecciona el tipo">
                    {tiposSangre.map((tipo) => (
                      <Select.Option key={tipo} value={tipo}>
                        {tipo}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                </Col>
                <Col style={{ width: "40.3%" }}>
                <Form.Item
                  label="Teléfono"
                  name="telefono"
                  rules={[
                    { required: true, message: "El teléfono es obligatorio" },
                    {
                      pattern: /^\+?\d{8,20}$/,
                      message: "Ingresa solo números, con o sin código de área (sin espacios ni guiones)"
                    }
                  ]}
                >
                  <Input placeholder="Ej: +50498765432 o 98765432" maxLength={20} />
                </Form.Item>
                </Col>
              </Row>
              <Row gutter={40}>
                <Col span={12}>
                <ValidatedInput
                  label="Contacto de Emergencia (Nombre)"
                  name="nombreContactoEmergencia"
                  placeholder="Ingresa el nombre del contacto" 
                  allowSpecialChars={false}
                  maxLength={100}
                />
                </Col>
                <Col style={{ width: "49.3%" }}>
                <Form.Item
                  label="Contacto de Emergencia (Tel. ó cel.)"
                  name="telefonoContactoEmergencia"
                  rules={[
                    {
                      pattern: /^\+?\d{8,20}$/,
                      message: "Ingresa solo números, con o sin código de área (sin espacios ni guiones)"
                    }
                  ]}
                >
                  <Input placeholder="Ej: +50498765432 o 98765432" maxLength={20} />
                </Form.Item>
              </Col>
              </Row>
              {/* Agregar campo para subir foto */}
              <Form.Item label="Foto de Perfil" name="fotoUrl">
              <SubirImagen
                onImagenSubida={(url) => formNuevo.setFieldsValue({ fotoUrl: url })}
                imagenActual={null} // Forzar a null cuando se cierra
                form={formNuevo}
                key={showNuevoModal ? 'open' : 'closed'} // Esto fuerza un remontaje cuando se abre/cierra
              />
              </Form.Item>
            </TabPane>
            
            {/* Pestaña: Datos de Usuario */}
            <TabPane tab="Datos de Usuario" key="2">
              <Row gutter={40}>
                <Col span={12}>
                 <Form.Item
                    label="Nombre de Usuario"
                    name="nombreUsuario"
                    rules={[
                      { required: true, message: "El nombre de usuario es obligatorio" },
                      { min: 4, message: "Debe tener al menos 4 caracteres" },
                      { max: 20, message: "No debe exceder los 20 caracteres" },
                      {
                        pattern: /^[a-zA-Z0-9_.-]+$/,
                        message: "Sin espacio, solo letras, números, puntos, guiones y guiones bajos"
                      }
                    ]}
                  >
                    <Input 
                      placeholder="Ingresa el nombre de usuario"
                      addonAfter={
                        <Button 
                          onClick={() => {
                            const nombreCompleto = formNuevo.getFieldValue('nombreCompleto');
                            const nuevoUsuario = generarNombreUsuario(nombreCompleto, usuarios);
                            formNuevo.setFieldsValue({ nombreUsuario: nuevoUsuario });
                          }} 
                          size="small"
                        >
                          Generar
                        </Button>
                      }
                    />
                  </Form.Item>
                </Col>
                <Col style={{ width: "49.3%" }}>
                  <Form.Item
                    label="Contraseña"
                    name="contrasena"
                    rules={[
                      { required: true, message: "La contraseña es obligatoria" },
                      {
                        validator: (_, value) => {
                          const error = validatePassword(value);
                          return error ? Promise.reject(new Error(error)) : Promise.resolve();
                        }
                      }
                    ]}
                  >
                    <Input.Password
                      addonAfter={
                        <Button onClick={() => {
                          const nuevaContrasena = generarContrasena();
                          formNuevo.setFieldsValue({ contrasena: nuevaContrasena });
                        }} size="small">
                          Generar
                        </Button>
                      }
                      placeholder="Ingresa o genera una contraseña"
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={40}>
                <Col span={12}>
                  <Form.Item
                    label="Correo Electrónico"
                    name="email"
                    rules={[
                      { required: true, message: "El correo electrónico es obligatorio" },
                      { type: "email", message: "Debe ser un correo válido" }
                    ]}
                  >
                    <Input  type="email" placeholder="correo@ejemplo.com" />
                  </Form.Item>
                </Col>
                <Col style={{ width: "49.3%" }}>
                  <Form.Item
                    label="Rol"
                    name="idRol"
                    rules={[{ required: true, message: "El rol es obligatorio" }]}
                  >
                  <Select placeholder="Selecciona el rol">
                    {roles.map((rol) => (
                      <Option key={rol.idRol} value={rol.idRol}>
                        {rol.nombre}
                      </Option>
                    ))}
                  </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={40}>
                <Col span={14}>
                  <Form.Item
                    label="Universidad"
                    name="idUniversidad"
                    rules={[{ required: true, message: "La universidad es obligatoria" }]}
                  >
                  <Select placeholder="Selecciona la universidad">
                    {universidades.map((universidad) => (
                      <Option key={universidad.idUniversidad} value={universidad.idUniversidad}>
                        {universidad.nombreUniversidad}
                      </Option>
                    ))}
                  </Select>
                  </Form.Item>
                </Col>
                <Col style={{ width: "41%" }}>
                  <Form.Item
                    label="Estado"
                    name="idEstadoUsuario"
                    rules={[{ required: true, message: "El estado es obligatorio" }]}
                  >
                    <Select placeholder="Selecciona el estado">
                      {estadosusuario.map((estados) => (
                        <Option key={estados.idEstadoUsuario} value ={estados.idEstadoUsuario}>
                          {estados.estado}
                        </Option>
                      ))}
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
      show={showEditModal}
      onHide={handleCerrarEditModal}
      titulo="Editar Usuario"
      onGuardar={handleGuardarEdit}
      form={formEditar}
      registroSeleccionado={registroSeleccionado}
      width={800}
    >
      <Form 
        layout="vertical" 
        form={formEditar} 
        initialValues={{
          ...registroSeleccionado,
          fechaNacimiento: registroSeleccionado?.fechaNacimiento ? moment(registroSeleccionado.fechaNacimiento) : null
        }}
      >
        <Tabs defaultActiveKey="1">
          {/* Pestaña: Datos Personales */}
          <TabPane tab="Datos Personales" key="1">
            <Row gutter={40}>
              <Col span={14}>
              <ValidatedInput
                label="Nombre Completo"
                name="nombreCompleto"
                placeholder="Ingresa el nombre completo"
                rules={[{ required: true, message: "El nombre es obligatorio" }]}
                allowSpecialChars={false}
                maxLength={100}
              />
              </Col>
              <Col style={{ width: "41%" }}>
                <Form.Item
                  label="Género"
                  name="idGenero"
                  rules={[{ required: true, message: "El género es obligatorio" }]}
                >
                  <Select placeholder="Selecciona el género">
                    {generos.map((genero) => (
                      <Option key={genero.idGenero} value={genero.idGenero}>
                        {genero.descripcion}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={40}>
              <Col span={7}>
                <Form.Item
                  label="Fecha de Nacimiento"
                  name="fechaNacimiento"
                  rules={[{ required: true, message: "La fecha de nacimiento es obligatoria" }]}
                >
                  <DatePicker format="YYYY-MM-DD" />
                </Form.Item>
              </Col>
              <Col style={{ width: "30%" }}>
              <Form.Item
                label="Tipo de Sangre"
                name="tipoSangre"
              >
                <Select placeholder="Selecciona el tipo">
                  {tiposSangre.map((tipo) => (
                    <Select.Option key={tipo} value={tipo}>
                      {tipo}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              </Col>
              <Col style={{ width: "40.3%" }}>
              <Form.Item
              label="Teléfono"
              name="telefono"
              rules={[
                { required: true, message: "El teléfono es obligatorio" },
                {
                  pattern: /^\+?\d{8,20}$/,
                  message: "Ingresa solo números, con o sin código de área (sin espacios ni guiones)"
                }
              ]}
            >
              <Input placeholder="Ej: +50498765432 o 98765432" maxLength={20} />
            </Form.Item>
              </Col>
            </Row>
            <Row gutter={40}>
              <Col span={12}>
              <ValidatedInput
                label="Contacto de Emergencia (Nombre)"
                name="nombreContactoEmergencia"
                placeholder="Ingresa el nombre del contacto" 
                allowSpecialChars={false}
                maxLength={100}
              />
              </Col>
              <Col style={{ width: "49.3%" }}>
              <Form.Item
                label="Contacto de Emergencia (Tel. ó cel.)"
                name="telefonoContactoEmergencia"
                rules={[
                  {
                    pattern: /^\+?\d{8,20}$/,
                    message: "Ingresa solo números, con o sin código de área (sin espacios ni guiones)"
                  }
                ]}
              >
                <Input placeholder="Ej: +50498765432 o 98765432" maxLength={20} />
              </Form.Item>
              </Col>
            </Row>
            <Form.Item label="Foto de Perfil" name="fotoUrl">
              <SubirImagen
                onImagenSubida={(url) => formEditar.setFieldsValue({ fotoUrl: url })}
                imagenActual={registroSeleccionado?.fotoUrl}
                form={formEditar}
              />
            </Form.Item>
          </TabPane>
          
          {/* Pestaña: Datos de Usuario */}
          <TabPane tab="Datos de Usuario" key="2">
            <Row gutter={40}>
              <Col span={12}>
                <Form.Item
                label="Nombre de Usuario"
                name="nombreUsuario"
                rules={[
                  { required: true, message: "El nombre de usuario es obligatorio" },
                  { min: 4, message: "Debe tener al menos 4 caracteres" },
                  { max: 20, message: "No debe exceder los 20 caracteres" },
                  {
                    pattern: /^[a-zA-Z0-9_.-]+$/,
                    message: "Sin espacio, solo letras, números, puntos, guiones y guiones bajos"
                  }
                ]}
              >
                <Input 
                  placeholder="Ingresa el nombre de usuario"
                  addonAfter={
                    <Button 
                      onClick={() => {
                        const nombreCompleto = formEditar.getFieldValue('nombreCompleto');
                        const nuevoUsuario = generarNombreUsuario(nombreCompleto, usuarios);
                        formEditar.setFieldsValue({ nombreUsuario: nuevoUsuario });
                      }} 
                      size="small"
                    >
                      Generar
                    </Button>
                  }
                />
              </Form.Item>
              </Col>
              <Col style={{ width: "49.3%" }}>
                <Form.Item
                  label="Contraseña"
                  name="contrasena"
                  rules={[
                    { required: false }, // No obligatoria en edición
                    {
                      validator: (_, value) => {
                        if (value) {
                          const error = validatePassword(value);
                          return error ? Promise.reject(new Error(error)) : Promise.resolve();
                        }
                        return Promise.resolve();
                      }
                    }
                  ]}
                >
                  <Input.Password
                    addonAfter={
                      <Button onClick={() => {
                        const nuevaContrasena = generarContrasena();
                        formEditar.setFieldsValue({ contrasena: nuevaContrasena });
                      }} size="small">
                        Generar
                      </Button>
                    }
                    placeholder="Dejar en blanco para no cambiar"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={40}>
              <Col span={12}>
                <Form.Item
                  label="Correo Electrónico"
                  name="email"
                  rules={[
                    { required: true, message: "El correo electrónico es obligatorio" },
                    { type: "email", message: "Debe ser un correo válido" }
                  ]}
                >
                  <Input type="email" placeholder="correo@ejemplo.com" />
                </Form.Item>
              </Col>
              <Col style={{ width: "49.3%" }}>
                <Form.Item
                  label="Rol"
                  name="idRol"
                  rules={[{ required: true, message: "El rol es obligatorio" }]}
                >
                  <Select placeholder="Selecciona el rol">
                    {roles.map((rol) => (
                      <Option key={rol.idRol} value={rol.idRol}>
                        {rol.nombre}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={40}>
              <Col span={14}>
                <Form.Item
                  label="Universidad"
                  name="idUniversidad"
                  rules={[{ required: true, message: "La universidad es obligatoria" }]}
                >
                  <Select placeholder="Selecciona la universidad">
                    {universidades.map((universidad) => (
                      <Option key={universidad.idUniversidad} value={universidad.idUniversidad}>
                        {universidad.nombreUniversidad}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col style={{ width: "41%" }}>
                <Form.Item
                  label="Estado"
                  name="idEstadoUsuario"
                  rules={[{ required: true, message: "El estado es obligatorio" }]}
                >
                  <Select placeholder="Selecciona el estado">
                  {estadosusuario.map((estados) => (
                      <Option key={estados.idEstadoUsuario} value={estados.idEstadoUsuario}>
                        {estados.estado}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </TabPane>
        </Tabs>
      </Form>
    </ModalEditar>

    {/* Modal para detalles */}
    <ModalDetalles
    show={showDetailsModal}
    onHide={() => setShowDetailsModal(false)}
    titulo="Detalles del Usuario"
    detalles={registroSeleccionado || {}}
    width={800}
    tipo="usuario" // <-- esta línea es clave
    />
    </div>
  );
}

export default Usuarios;