import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Spin, message, Image, Tag, Divider, Typography, Space, Row, Col } from 'antd';
import { 
  UserOutlined, EditOutlined, LockOutlined, MailOutlined, 
  PhoneOutlined, CalendarOutlined, IdcardOutlined, 
  SafetyOutlined, BankOutlined, ContactsOutlined, HeartOutlined,
  UserAddOutlined
} from '@ant-design/icons';
import NavDashboard from '../components/Dashboard/navDashboard';
import { fetchWithAuth } from '../utils/api';
import '../styles/Login/PerfilUsuario.css';
import BotonRegresar from "../components/Dashboard/BotonRegresar";
import Loader from '../components/Loader';

const { Title, Text } = Typography;

const PerfilUsuario = () => {
    const [usuario, setUsuario] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const cargarPerfil = async () => {
          try {
            const response = await fetchWithAuth('http://localhost:4000/api/auth/perfil');
            if (!response.ok) throw new Error('Error al cargar el perfil');
            const data = await response.json();
            setUsuario(data.data.usuario);
          } catch (error) {
            message.error(error.message);
            navigate('/login');
          } finally {
            setLoading(false);
          }
        };
        cargarPerfil();
    }, [navigate]);

    const getEdad = (fechaNacimiento) => {
        if (!fechaNacimiento) return null;
        const nacimiento = new Date(fechaNacimiento);
        const hoy = new Date();
        let edad = hoy.getFullYear() - nacimiento.getFullYear();
        const mes = hoy.getMonth() - nacimiento.getMonth();
        if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
            edad--;
        }
        return edad;
    };

    if (loading) {
        return <Loader />;
    }

    if (!usuario) {
        return (
          <div className="error-container">
            <Text>No se pudo cargar la información del perfil</Text>
            <Button type="primary" onClick={() => window.location.reload()}>
              Reintentar
            </Button>
          </div>
        );
    }

    return (
        <div className="profile-modern-container">
            <NavDashboard />
            <BotonRegresar to="/dashboard" text="Regresar" />
            <div className="profile-content">
                {/* Primera fila: Foto + Datos de Usuario */}
                <Row gutter={[16, 16]} className="profile-top-row">
                    {/* Card de Foto y Estado */}
                    <Col xs={24} md={14}>
                        <Card className="profile-avatar-card">
                            <div className="avatar-container">
                                <Image
                                    width={140}
                                    src={usuario?.fotoUrl || 'https://via.placeholder.com/140'}
                                    alt="Foto de perfil"
                                    className="profile-avatar"
                                    preview={false}
                                />
                            </div>
                            <div className="profile-info-container">
                                <Title level={4} className="profile-name">
                                    {usuario?.nombreCompleto || 'Nombre no disponible'}
                                </Title>
                                <Space size="small" className="profile-tags">
                                    <Tag 
                                        color={usuario?.idRol === 1 ? 'geekblue' : 'cyan'} 
                                        icon={<SafetyOutlined />}
                                    >
                                        {usuario?.nombreRol}
                                    </Tag>
                                    <Tag 
                                        color={usuario?.idEstadoUsuario === 1 ? 'green' : 'orange'} 
                                        icon={<UserOutlined />}
                                    >
                                        {usuario?.nombreEstadoUsuario}
                                    </Tag>
                                </Space>
                                <div className="profile-actions">
                                    <Button 
                                        type="primary" 
                                        icon={<EditOutlined />} 
                                        onClick={() => navigate('/editar-perfil')}
                                        className="action-button"
                                        block
                                    >
                                        Editar Perfil
                                    </Button>
                                    <Button 
                                        icon={<LockOutlined />} 
                                        onClick={() => navigate('/cambiar-contrasena')}
                                        className="action-button"
                                        block
                                    >
                                        Cambiar Contraseña
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    </Col>

                    {/* Card de Datos de Usuario */}
                    <Col xs={24} md={10}>
                        <Card className="profile-account-card">
                            <Title level={4} className="section-title">
                                <UserOutlined /> Datos de la Cuenta
                            </Title>
                            <Divider className="section-divider" />
                            
                            <Row gutter={[16, 16]}>
                                <Col xs={24} sm={30}>
                                    <div className="data-item">
                                        <Text strong><UserOutlined />Nombre de Usuario:</Text>
                                        <Text>{usuario?.nombreUsuario || 'No especificado'}</Text>
                                    </div>
                                </Col>
                            </Row>
                            <Row gutter={[16, 16]}>  
                                <Col xs={24} sm={30}>
                                    <div className="data-item">
                                        <Text strong><MailOutlined /> Correo Electrónico:</Text>
                                        <Text>{usuario?.email || 'No especificado'}</Text>
                                    </div>
                                </Col>
                            </Row>  
                            <Row gutter={[16, 16]}>   
                                <Col xs={24} sm={30}>
                                    <div className="data-item">
                                        <Text strong><BankOutlined /> Universidad:</Text>
                                        <Text>{usuario?.nombreUniversidad || 'No especificada'}</Text>
                                    </div>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>

                {/* Segunda fila: Datos Personales + Contacto Emergencia */}
                <Row gutter={[16, 16]} className="profile-bottom-row">
                    {/* Card de Datos Personales */}
                    <Col xs={24} md={15}>
                        <Card className="profile-data-card">
                            <Title level={4} className="section-title">
                                <IdcardOutlined /> Datos Personales
                            </Title>
                            <Divider className="section-divider" />
                            
                            <Row gutter={[16, 16]}>
                                <Col xs={24} sm={13} md={40}>
                                    <div className="data-item">
                                        <Text strong><CalendarOutlined /> Fecha de Nacimiento:</Text>
                                        <Text>
                                            {usuario?.fechaNacimiento 
                                                ? `${new Date(usuario.fechaNacimiento).toLocaleDateString()} (${getEdad(usuario.fechaNacimiento)} años)`
                                                : 'No especificada'}
                                        </Text>
                                    </div>
                                </Col>
                                
                                <Col xs={24} sm={14} md={11}>
                                    <div className="data-item">
                                        <Text strong><UserOutlined /> Género:</Text>
                                        <Text>{usuario?.nombreGenero || 'No especificado'}</Text>
                                    </div>
                                </Col>
                            </Row> 
                            <Row gutter={[16, 16]}>
                                <Col xs={24} sm={13} md={40}>
                                    <div className="data-item">
                                        <Text strong><PhoneOutlined /> Teléfono:</Text>
                                        <Text>{usuario?.telefono || 'No especificado'}</Text>
                                    </div>
                                </Col>
                                
                                <Col xs={24} sm={14} md={11}>
                                    <div className="data-item">
                                        <Text strong><HeartOutlined />Tipo de Sangre:</Text>
                                        <Text>{usuario?.tipoSangre || 'No especificado'}</Text>
                                    </div>
                                </Col>
                            </Row>
                        </Card>
                    </Col>

                    {/* Card de Contacto de Emergencia */}
                    <Col xs={24} md={9}>
                        <Card className="profile-emergency-card">
                            <Title level={4} className="section-title">
                                <ContactsOutlined /> Contacto de Emergencia
                            </Title>
                            <Divider className="section-divider" />
                            
                            <div className="data-item">
                                <Text strong><UserAddOutlined />Nombre:</Text>
                                <Text>{usuario?.nombreContactoEmergencia || 'No especificado'}</Text>
                            </div>
                            
                            <div className="data-item">
                                <Text strong><PhoneOutlined /> Teléfono:</Text>
                                <Text>{usuario?.telefonoContactoEmergencia || 'No especificado'}</Text>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default PerfilUsuario;