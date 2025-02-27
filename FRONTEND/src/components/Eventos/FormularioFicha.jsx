import { useState } from "react";
import "../../styles/Evento/eventos.css";

function Button({ children, onClick, className }) {
  return (
    <button onClick={onClick} className={`btn ${className}`}>
      {children}
    </button>
  );
}

function Card({ children, className }) {
  return <div className={`card ${className}`}>{children}</div>;
}

function Input({ value, onChange, placeholder, type = "text" }) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="input"
    />
  );
}

function Select({ value, onChange, children }) {
  return (
    <select value={value} onChange={onChange} className="input">
      {children}
    </select>
  );
}

function Checkbox({ checked, onCheckedChange, children }) {
  return (
    <label className="checkbox">
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
  const [sections, setSections] = useState([]);

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
    <div className="container">
      <Button onClick={addSection} className="add-btn">
        ➕ Agregar Sección
      </Button>
      {sections.map((section) => (
        <Card key={section.id} className="section-card">
          <hr className="section-divider" />
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
          <Button onClick={() => addField(section.id)} className="add-btn">
            ➕ Agregar Campo
          </Button>
          {section.fields.map((field) => (
            <div key={field.id} className="field-card">
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
              </Select>
              {field.type === "varchar" && (
                <Input
                  value={field.length}
                  onChange={(e) =>
                    updateField(section.id, field.id, "length", e.target.value)
                  }
                  placeholder="Longitud"
                  type="number"
                />
              )}
              {field.type === "file" && (
                <Select
                  value={field.fileType}
                  onChange={(e) =>
                    updateField(
                      section.id,
                      field.id,
                      "fileType",
                      e.target.value
                    )
                  }
                >
                  <option value="pdf">PDF</option>
                  <option value="jpg">JPG</option>
                  <option value="png">PNG</option>
                </Select>
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
      <Button onClick={submitForm} className="submit-btn">
        Crear
      </Button>
    </div>
  );
}
