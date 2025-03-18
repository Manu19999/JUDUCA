import React from "react";
import { Input, Form } from "antd";

const ValidatedInput = ({
  name,
  label,
  placeholder,
  rules = [],
  allowSpecialChars = false, // Prop para permitir caracteres especiales y números
}) => {
  const form = Form.useFormInstance(); // Obtiene el formulario automáticamente

  const handleChange = (e) => {
    let value = e.target.value; // Valor original

    // Verificar si el valor contiene caracteres no permitidos (solo si allowSpecialChars es false)
    const contieneCaracteresNoPermitidos =
      !allowSpecialChars && /[^A-ZÁÉÍÓÚÑ\s]/gi.test(value);

    // Filtrar caracteres no permitidos (solo si allowSpecialChars es false)
    if (!allowSpecialChars) {
      value = value.replace(/[^A-ZÁÉÍÓÚÑ\s]/gi, "");
    }

    // Convertir todo el texto a mayúsculas automáticamente (solo si allowSpecialChars es false)
    if (!allowSpecialChars) {
      value = value.toUpperCase();
    }

    // Eliminar espacios al inicio y normalizar múltiples espacios
    const trimmedValue = value.trimStart(); // Elimina espacios al inicio
    const normalizedValue = trimmedValue.replace(/\s+/g, " "); // Reemplaza múltiples espacios con uno solo

    // Eliminar repeticiones de más de 4 letras consecutivas (solo si allowSpecialChars es false)
    const finalValue = !allowSpecialChars
      ? normalizedValue.replace(/(.)\1{4,}/g, (match) => match.slice(0, 4))
      : normalizedValue;

    // Actualiza el valor en el formulario
    form.setFieldsValue({ [name]: finalValue });

    // Validación manual
    const errors = [];
    if (contieneCaracteresNoPermitidos) {
      // Si el valor original contenía caracteres no permitidos, muestra un mensaje de error
      errors.push("Solo se permiten letras (A-Z, Ñ, tildes) y espacios");
    }
    if (/^\s/.test(value)) {
      // Verifica si el valor comienza con un espacio
      errors.push("El nombre no puede comenzar con un espacio");
    }
    if (/\s{2,}/.test(value)) {
      // Verifica si hay más de un espacio entre palabras
      errors.push("No se permiten múltiples espacios entre palabras");
    }
    if (!allowSpecialChars && /(.)\1{4,}/.test(value)) {
      // Verifica si una letra se repite 5 o más veces (solo si allowSpecialChars es false)
      errors.push("No se permite repetir una letra 5 veces consecutivamente");
    }

    // Actualiza los errores en el formulario
    form.setFields([
      {
        name,
        errors,
      },
    ]);
  };

  const handleCopy = (e) => {
    e.preventDefault(); // Evita la acción de copiar
    form.setFields([
      {
        name,
        errors: ["Copiar está deshabilitado en este campo."],
      },
    ]);
  };

  const handlePaste = (e) => {
    e.preventDefault(); // Evita la acción de pegar
    form.setFields([
      {
        name,
        errors: ["Pegar está deshabilitado en este campo."],
      },
    ]);
  };

  return (
    <Form.Item
      label={label}
      name={name}
      rules={[
        // Reglas personalizadas pasadas como prop
        ...rules,
      ]}
    >
      <Input
        placeholder={placeholder}
        onChange={handleChange}
        onCopy={handleCopy}
        onPaste={handlePaste}
      />
    </Form.Item>
  );
};

export default ValidatedInput;