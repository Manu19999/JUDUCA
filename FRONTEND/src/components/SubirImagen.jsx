import React, { useState, useEffect } from "react"; // Importar useState y useEffect
import { Upload, Button, Modal, message } from "antd";
import { UploadOutlined, ArrowsAltOutlined } from "@ant-design/icons";

const SubirImagen = ({ onImagenSubida, imagenActual, form }) => {
  const [imagenUrl, setImagenUrl] = useState(imagenActual || null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    setImagenUrl(imagenActual);
  }, [imagenActual]);

  const handleSubirImagen = async (info) => {
    const { file } = info;

    if (!file.type.startsWith("image/")) {
      message.error("Solo se permiten archivos de imagen.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:4000/api/subir-imagen", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Error al subir la imagen");
      }

      const data = await response.json();
      const url = data.url;

      setImagenUrl(url);
      onImagenSubida(url); // Notificar al componente padre
      form.setFieldsValue({ fotoUrl: url }); // Actualizar el campo fotoUrl en el formulario
      message.success("Imagen subida correctamente");
    } catch (error) {
      console.error("Error al subir la imagen:", error);
      message.error("Error al subir la imagen. Inténtalo de nuevo.");
    }
  };

  return (
    <div style={{ display: "flex", gap: "40px" }}>
      {/* Botón de subida */}
      <Upload
        beforeUpload={() => false}
        onChange={handleSubirImagen}
        showUploadList={false}
      >
        <Button icon={<UploadOutlined />}>Seleccionar imagen</Button>
      </Upload>

      {/* Contenedor de la imagen */}
      {imagenUrl && (
        <div style={{ 
          position: "relative", 
          width: "130px", 
          height: "130px", 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center", 
          border: "1px solid #ddd", 
          background: "#f9f9f9",
          overflow: "hidden"
        }}>
          <img
            src={imagenUrl}
            alt="Vista previa"
            style={{ 
              width: "100%", 
              height: "100%", 
              objectFit: "contain", // Mantiene la proporción sin recortar la imagen
            }}
          />

          {/* Icono de expandir imagen */}
          <ArrowsAltOutlined
            style={{
              position: "absolute",
              top: "5px",
              right: "5px",
              fontSize: "18px",
              color: "#000",
              background: "rgba(255, 255, 255, 0.7)",
              padding: "3px",
              borderRadius: "5px",
              cursor: "pointer"
            }}
            onClick={() => setModalVisible(true)}
          />
        </div>
      )}

      {/* Modal para ver la imagen en grande */}
      <Modal
        open={modalVisible}
        footer={null}
        onCancel={() => setModalVisible(false)}
        centered
      >
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
          <img
            src={imagenUrl}
            alt="Vista previa ampliada"
            style={{ 
              maxWidth: "90%", 
              maxHeight: "90%", 
              objectFit: "contain", // Mantiene la proporción sin recortar la imagen
              borderRadius: "5px"
            }}
          />
        </div>
      </Modal>
    </div>
  );
};

export default SubirImagen;