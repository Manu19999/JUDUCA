import React, { useEffect } from "react";
import ModalBase from "./ModalBase";
import dayjs from "dayjs";

const ModalEditar = ({
  show,
  onHide,
  titulo,
  onGuardar,
  form,
  registroSeleccionado,
  children,
  width
}) => {
  useEffect(() => {
    if (show && registroSeleccionado) {
      form.setFieldsValue({
        // convertimos sólo los campos que maneja el formulario
        cantidadVouchers: registroSeleccionado.cantidadVouchers,
        diasVouchers:     registroSeleccionado.diasVouchers,
        fechaInicio:      registroSeleccionado.fechaInicio 
                            ? dayjs(registroSeleccionado.fechaInicio) 
                            : null,
        fechaFinal:       registroSeleccionado.fechaFinal 
                            ? dayjs(registroSeleccionado.fechaFinal) 
                            : null
      });
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