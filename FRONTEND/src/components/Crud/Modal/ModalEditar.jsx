import React, { useEffect } from "react";
import ModalBase from "./ModalBase";

const ModalEditar = ({ show, onHide, titulo, onGuardar, form, registroSeleccionado, children,width }) => {
  // Efecto para actualizar el formulario cuando el modal se abre o cambia el registro seleccionado
  useEffect(() => {
    console.log("Modal abierto:", show); // Depuración
    console.log("Registro seleccionado:", registroSeleccionado); // Depuración
    if (show && registroSeleccionado) {
      form.setFieldsValue(registroSeleccionado);
    } else {
      form.resetFields();
    }
  }, [show, registroSeleccionado, form]);

  return (
    <ModalBase
      show={show}
      onHide={onHide}
      titulo={titulo}
      onGuardar={onGuardar}
      form={form}
      width={width}
    >
      {children}
    </ModalBase>
  );
};

export default ModalEditar;