import React, { useState } from "react";
import { Modal as AntModal, Button, Avatar, Divider, Tag, Row, Col, Image } from "antd";
import { UserOutlined } from '@ant-design/icons';
import "./Modal.css";

const ModalDetalles = ({ show, onHide, titulo, detalles, width, tipo }) => {
  const [previewVisible, setPreviewVisible] = useState(false);
  
  const formatearClave = (key) => {
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .trim();
  };

 const esUsuario = ['usuario'].includes(tipo);


  return (
    <>
      {/* Modal principal */}
      <AntModal
        title={titulo}
        open={show}
        onCancel={onHide}
        footer={[
          <Button key="cerrar" onClick={onHide}>
            Cerrar
          </Button>,
        ]}
        className={`custom-modal-card ${esUsuario ? 'modal-usuario' : ''}`}
        width={width || (esUsuario ? 800 : 600)}
      >
        {esUsuario ? (
          <div className="usuario-container">
            {/* Encabezado con foto */}
            <div className="usuario-header">
              <div className="avatar-container">
                <Avatar 
                  src={detalles.fotoUrl} 
                  size={100} 
                  className="usuario-avatar"
                  icon={!detalles.fotoUrl && <UserOutlined />}
                  onClick={() => detalles.fotoUrl && setPreviewVisible(true)}
                  style={{ cursor: detalles.fotoUrl ? 'pointer' : 'default' }}
                />
              </div>
              <div className="usuario-titulo">
                <h2>{detalles.nombreCompleto || 'Nombre no disponible'}</h2>
                <div className="usuario-subtitulo">
                  {detalles.nombreRol && <Tag color="blue">{detalles.nombreRol}</Tag>}
                  {detalles.nombreEstadoUsuario && (
                    <Tag color={
                      detalles.nombreEstadoUsuario.toLowerCase() === 'activo' ? 'green' : 
                      detalles.nombreEstadoUsuario.toLowerCase() === 'inactivo' ? 'red' : 'orange'
                    }>
                      {detalles.nombreEstadoUsuario}
                    </Tag>
                  )}
                </div>
              </div>
            </div>

            {/* Contenido en dos columnas */}
            <Row gutter={24} className="informacion-columnas">
              {/* Columna izquierda - Información personal */}
              <Col span={12}>
                <div className="informacion-seccion">
                  <h3 className="informacion-titulo">Datos Personales</h3>
                  <div className="informacion-lista">
                    {detalles.fechaNacimiento && (
                      <div className="informacion-item">
                        <span className="informacion-etiqueta">Fecha de Nacimiento: </span>
                        <span className="informacion-valor">
                          {new Date(detalles.fechaNacimiento).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                    {detalles.telefono && (
                      <div className="informacion-item">
                        <span className="informacion-etiqueta">Teléfono: </span>
                        <span className="informacion-valor">
                          {detalles.telefono}
                        </span>
                      </div>
                    )}
                    {detalles.nombreGenero && (
                      <div className="informacion-item">
                        <span className="informacion-etiqueta">Género: </span>
                        <span className="informacion-valor">
                          {detalles.nombreGenero}
                        </span>
                      </div>
                    )}
                    {detalles.tipoSangre && (
                      <div className="informacion-item">
                        <span className="informacion-etiqueta">Tipo de Sangre: </span>
                        <span className="informacion-valor">
                          {detalles.tipoSangre}
                        </span>
                      </div>
                    )}
                    {detalles.nombreContactoEmergencia && (
                      <div className="informacion-item">
                        <span className="informacion-etiqueta">Contacto Emergencia: </span>
                        <span className="informacion-valor">
                          {detalles.nombreContactoEmergencia}
                        </span>
                      </div>
                    )}
                    {detalles.telefonoContactoEmergencia && (
                      <div className="informacion-item">
                        <span className="informacion-etiqueta">Teléfono Emergencia: </span>
                        <span className="informacion-valor">
                          {detalles.telefonoContactoEmergencia}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </Col>

              {/* Columna derecha - Datos de usuario */}
              <Col span={12}>
                <div className="informacion-seccion">
                  <h3 className="informacion-titulo">Datos de Usuario</h3>
                  <div className="informacion-lista">
                    <div className="informacion-item">
                      <span className="informacion-etiqueta">Nombre de Usuario: </span>
                      <span className="informacion-valor">
                        {detalles.nombreUsuario || 'No especificado'}
                      </span>
                    </div>
                    <div className="informacion-item">
                      <span className="informacion-etiqueta">Correo Electrónico: </span>
                      <span className="informacion-valor">
                        {detalles.email || 'No especificado'}
                      </span>
                    </div>
                    {detalles.nombreUniversidad && (
                      <div className="informacion-item">
                        <span className="informacion-etiqueta">Universidad: </span>
                        <span className="informacion-valor">
                          {detalles.nombreUniversidad}
                        </span>
                      </div>
                    )}
                    {detalles.fechaRegistro && (
                      <div className="informacion-item">
                        <span className="informacion-etiqueta">Fecha de Registro: </span>
                        <span className="informacion-valor">
                          {new Date(detalles.fechaRegistro).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                  </div>
                  {detalles.primerIngreso !== undefined && (
                    <div className="informacion-item">
                      <span className="informacion-etiqueta">Primer Ingreso: </span>
                      <span className="informacion-valor">
                        {detalles.primerIngreso ? 'Sí' : 'No'}
                      </span>
                    </div>
                  )}
                </div>
              </Col>
            </Row>
          </div>
        ) : (
          <div className="detalle-container">
            {Object.entries(detalles).map(([key, value]) => (
              key !== 'fotoUrl' && (
                <div key={key} className="detalle-fila">
                  <span className="detalle-clave">{formatearClave(key)}:</span>
                  <span className="detalle-valor">
                    {value === null || value === undefined 
                      ? 'No especificado' 
                      : typeof value === 'object' 
                        ? JSON.stringify(value) 
                        : String(value)}
                  </span>
                </div>
              )
            ))}
          </div>
        )}
      </AntModal>

      {/* Modal para previsualizar la imagen */}
      {detalles?.fotoUrl && (
        <Image
          width={0}
          style={{ display: 'none' }}
          src={detalles.fotoUrl}
          preview={{
            visible: previewVisible,
            src: detalles.fotoUrl,
            onVisibleChange: (visible) => setPreviewVisible(visible),
            mask: (
              <div className="image-preview-mask">
                <span className="mask-text">Imagen de perfil</span>
              </div>
            ),
          }}
        />
      )}
    </>
  );
};

export default ModalDetalles;