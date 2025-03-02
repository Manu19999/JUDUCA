import { useState, useEffect } from "react";
import "../../styles/Evento/eventos.css";

/* ***************** Componente que nos permite crear las secciones y campos a las fichas creadas **************** */

function Button({ children, onClick, className }) {
  return (
    <button onClick={onClick} className={`form-btn ${className}`}>
      {children}
    </button>
  );
}

function Card({ children, className }) {
  return <div className={`form-card ${className}`}>{children}</div>;
}

function Input({ value, onChange, placeholder, type = "text" }) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="form-input"
    />
  );
}

function Select({ value, onChange, children }) {
  return (
    <select value={value} onChange={onChange} className="form-input">
      {children}
    </select>
  );
}

function Checkbox({ checked, onCheckedChange, children }) {
  return (
    <label className="form-checkbox">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onCheckedChange(e.target.checked)}
      />
      <span>{children}</span>
    </label>
  );
}

export default function DynamicForms() {
  const [sections, setSections] = useState([
    {
      id: Date.now(),
      name: "",
      required: false,
      fields: [
        {
          id: Date.now() + 1,
          name: "",
          type: "text",
          length: "",
          required: false,
          fileType: "",
          options: "",
        },
      ],
    },
  ]);

  const addSection = () => {
    setSections([
      ...sections,
      { id: Date.now(), name: "", required: false, fields: [] },
    ]);
  };

  const removeSection = (id) => {
    setSections(sections.filter((section) => section.id !== id));
  };

  const addField = (sectionId) => {
    setSections(
      sections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              fields: [
                ...section.fields,
                {
                  id: Date.now(),
                  name: "",
                  type: "text",
                  length: "",
                  required: false,
                  fileType: "",
                  options: "",
                },
              ],
            }
          : section
      )
    );
  };

  const removeField = (sectionId, fieldId) => {
    setSections(
      sections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              fields: section.fields.filter((field) => field.id !== fieldId),
            }
          : section
      )
    );
  };

  const updateField = (sectionId, fieldId, key, value) => {
    setSections(
      sections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              fields: section.fields.map((field) =>
                field.id === fieldId ? { ...field, [key]: value } : field
              ),
            }
          : section
      )
    );
  };

  const submitForm = () => {
    console.log("Enviando datos a la API:", sections);
  };

  return (
    <div className="form-container">
      <Button onClick={addSection} className="add-section-btn">
        ➕ Agregar Sección
      </Button>
      {sections.map((section) => (
        <Card key={section.id} className="section-container">
          <div className="section-header">
            <Input
              value={section.name}
              onChange={(e) =>
                setSections(
                  sections.map((s) =>
                    s.id === section.id ? { ...s, name: e.target.value } : s
                  )
                )
              }
              placeholder="Nombre de la sección"
            />
            <Checkbox
              checked={section.required}
              onCheckedChange={(value) =>
                setSections(
                  sections.map((s) =>
                    s.id === section.id ? { ...s, required: value } : s
                  )
                )
              }
            >
              Requerido
            </Checkbox>
            <Button
              onClick={() => removeSection(section.id)}
              className="delete-btn"
            >
              ❌
            </Button>
          </div>
          <Button
            onClick={() => addField(section.id)}
            className="add-section-btn"
          >
            ➕ Agregar Campo
          </Button>
          {section.fields.map((field) => (
            <div key={field.id} className="field-container">
              <Input
                value={field.name}
                onChange={(e) =>
                  updateField(section.id, field.id, "name", e.target.value)
                }
                placeholder="Nombre del campo"
              />
              <Select
                value={field.type}
                onChange={(e) =>
                  updateField(section.id, field.id, "type", e.target.value)
                }
              >
                <option value="text">Texto</option>
                <option value="number">Número</option>
                <option value="date">Fecha</option>
                <option value="varchar">Varchar</option>
                <option value="file">Archivo</option>
                <option value="list">Lista desplegable</option>
              </Select>
              {field.type === "list" && (
                <Input
                  value={field.options}
                  onChange={(e) =>
                    updateField(section.id, field.id, "options", e.target.value)
                  }
                  placeholder="Valores separados por coma"
                />
              )}
              <Checkbox
                checked={field.required}
                onCheckedChange={(value) =>
                  updateField(section.id, field.id, "required", value)
                }
              >
                Requerido
              </Checkbox>
              <Button
                onClick={() => removeField(section.id, field.id)}
                className="delete-btn"
              >
                ❌
              </Button>
            </div>
          ))}
        </Card>
      ))}
      <Button onClick={submitForm} className="submit-form-btn">
        Crear
      </Button>
    </div>
  );
}
