import { useState } from "react";
import "../../styles/Evento/Eventos.css";

const InscripcionJUDUCA = () => {
  const [inscripcion, setInscripcion] = useState({
    // Sección 1: Datos personales
    nombreCompleto: "",
    tituloAcademico: "",
    universidadRepresenta: "",
    puestoDesempena: "",
    categoria: "",
    correoInstitucional: "",
    correoPersonal: "",
    numeroContacto: "",
    breveBiografia: "",
    hojaDeVida: null,
    fotografiaReciente: null,
    // Sección 2: Información de la conferencia
    tituloConferencia: "",
    ejeTematico: "",
    tipoConferencia: "",
    resumenConferencia: "",
    adjuntarResumen: null,
    // Sección 3: Información adicional
    otrosRoles: [],
    otrosRolesEspecifique: "",
    requerimientoTecnico: "",
  });

  const [ficha, setFicha] = useState({
    // 1. Datos Personales
    nombreCompleto: "",
    fechaNacimiento: "",
    edad: "",
    sexo: "",
    nacionalidad: "",
    contactoEmergenciaNombre: "",
    contactoEmergenciaRelacion: "",
    contactoEmergenciaTelefono: "",
    // 2. Antecedentes Médicos
    enfermedadesCronicas: [],
    otrasEnfermedades: "",
    alergias: "No",
    alergiasDetalle: "",
    cirugiasPrevias: "No",
    cirugiasDetalle: "",
    lesionesDeportivas: "No",
    lesionesDetalle: "",
    hospitalizacionesRecientes: "No",
    hospitalizacionesDetalle: "",
    usoMedicamentos: "No",
    medicamentosDetalle: "",
    // 3. Evaluación Médica y Aptitud Física
    tipoSangre: "",
    condicionCardiovascular: "",
    evaluacionMusculoesqueletica: "",
    evaluacionMusculoDetalle: "",
    // 4. Seguro Médico y Coberturas
    nombreSeguro: "",
    numeroPoliza: "",
    coberturaAccidentes: "",
    // 5. Observaciones
    recomendacionesMedicas: "No",
    recomendacionesDetalle: "",
    restriccionesAdaptaciones: "No",
    restriccionesDetalle: "",
  });

  // Manejo específico para las Enfermedades Crónicas (checkboxes)
  const handleEnfermedadesChange = (e) => {
    const { value, checked } = e.target;
    setFicha((prev) => {
      let updated = [...prev.enfermedadesCronicas];
      if (value === "Ninguna") {
        // Si se marca "Ninguna", anula el resto
        updated = checked ? ["Ninguna"] : [];
      } else {
        // Quita "Ninguna" si está marcada
        updated = updated.filter((item) => item !== "Ninguna");
        if (checked) {
          updated.push(value);
        } else {
          updated = updated.filter((item) => item !== value);
        }
      }
      return { ...prev, enfermedadesCronicas: updated };
    });
  };


  // Manejo de campos de texto, select y textarea
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInscripcion((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Manejo de inputs tipo file
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setInscripcion((prev) => ({
      ...prev,
      [name]: files[0],
    }));
  };

  // Manejo de checkboxes para selección múltiple
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setInscripcion((prev) => {
      let nuevosRoles = [...prev.otrosRoles];
      if (checked) {
        // Si se selecciona "Ninguno", se limpia cualquier otro rol
        if (value === "Ninguno") {
          nuevosRoles = ["Ninguno"];
        } else {
          // Remover "Ninguno" si se selecciona otro rol
          nuevosRoles = nuevosRoles.filter((rol) => rol !== "Ninguno");
          if (!nuevosRoles.includes(value)) {
            nuevosRoles.push(value);
          }
        }
      } else {
        nuevosRoles = nuevosRoles.filter((rol) => rol !== value);
      }
      return {
        ...prev,
        otrosRoles: nuevosRoles,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Enviando inscripcion:", inscripcion);
    alert("Inscripción enviada con éxito!");
    // Aquí puedes realizar la petición a la API para guardar la inscripción
  };

  return (
    <div className="registro-form">
      <h2>Inscripción componente académico JUDUCA</h2>
      <form onSubmit={handleSubmit}>
        {/* Sección 1: Datos Personales */}
        <fieldset>
          <legend>Datos Personales</legend>

          <label>Nombre completo:</label>
          <input
            type="text"
            name="nombreCompleto"
            value={inscripcion.nombreCompleto}
            onChange={handleChange}
            required
          />

          <label>Título académico:</label>
          <input
            type="text"
            name="tituloAcademico"
            value={inscripcion.tituloAcademico}
            onChange={handleChange}
            required
          />

          <label>Universidad que representa:</label>
          <input
            type="text"
            name="universidadRepresenta"
            value={inscripcion.universidadRepresenta}
            onChange={handleChange}
            required
          />

          <label>Puesto que desempeña:</label>
          <input
            type="text"
            name="puestoDesempena"
            value={inscripcion.puestoDesempena}
            onChange={handleChange}
            required
          />

          <label style={{ color: "black" }}>Categoría:</label>
          <select
            name="categoria"
            value={inscripcion.categoria}
            onChange={handleChange}
            required
            style={{ color: "white" }}
          >
            <option value="">Seleccionar</option>
            <option value="Docente">Docente</option>
            <option value="Administrativo">Administrativo</option>
            <option value="Gestor académico">Gestor académico</option>
            <option value="Estudiante">Estudiante</option>
          </select>

          <label>Correo electrónico institucional:</label>
          <input
            type="email"
            name="correoInstitucional"
            value={inscripcion.correoInstitucional}
            onChange={handleChange}
            required
          />

          <label>Correo electrónico personal:</label>
          <input
            type="email"
            name="correoPersonal"
            value={inscripcion.correoPersonal}
            onChange={handleChange}
            required
          />

          <label>Número de contacto:</label>
          <input
            type="text"
            name="numeroContacto"
            value={inscripcion.numeroContacto}
            onChange={handleChange}
            required
          />

          <label>Breve biografía (100 a 150 palabras):</label>
          <textarea
            name="breveBiografia"
            value={inscripcion.breveBiografia}
            onChange={handleChange}
            required
          />

          <label>Hoja de vida (adjuntar en pdf):</label>
          <input
            type="file"
            name="hojaDeVida"
            accept=".pdf"
            onChange={handleFileChange}
            required
          />

          <label>Fotografía reciente (adjuntar imagen):</label>
          <input
            type="file"
            name="fotografiaReciente"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
        </fieldset>

        {/* Sección 2: Información de la conferencia */}
        <fieldset>
          <legend>Información de la conferencia</legend>

          <label>Título de la conferencia:</label>
          <input
            type="text"
            name="tituloConferencia"
            value={inscripcion.tituloConferencia}
            onChange={handleChange}
            required
          />

          <label style={{ color: "black" }}>
            Eje temático de la conferencia:
          </label>
          <select
            name="ejeTematico"
            value={inscripcion.ejeTematico}
            onChange={handleChange}
            required
            style={{ color: "white" }}
          >
            <option value="">Seleccionar</option>
            <option value="Educación Física en el área Docente">
              Educación Física en el área Docente
            </option>
            <option value="Educación Física Orientada al Deporte de Alto Rendimiento">
              Educación Física Orientada al Deporte de Alto Rendimiento
            </option>
            <option value="Educación Física Orientada a la Recreación">
              Educación Física Orientada a la Recreación
            </option>
            <option value="Actividad Física para la Salud">
              Actividad Física para la Salud
            </option>
          </select>

          <label style={{ color: "white" }}>Tipo de conferencia:</label>
          <select
            name="tipoConferencia"
            value={inscripcion.tipoConferencia}
            onChange={handleChange}
            required
            style={{ color: "white" }}
          >
            <option value="">Seleccionar</option>
            <option value="Investigación">Investigación</option>
            <option value="Buena práctica">Buena práctica</option>
            <option value="Experiencia">Experiencia</option>
          </select>

          <label>
            Breve Resumen de la conferencia (objetivo, descripción, resultados y
            conclusión):
          </label>
          <textarea
            name="resumenConferencia"
            value={inscripcion.resumenConferencia}
            onChange={handleChange}
            required
          />

          <label>Adjuntar resumen (archivo pdf):</label>
          <input
            type="file"
            name="adjuntarResumen"
            accept=".pdf"
            onChange={handleFileChange}
            required
          />
        </fieldset>

        {/* Sección 3: Información adicional */}
        <fieldset>
          <legend>Información adicional</legend>

          <label>
            ¿Qué otro rol desempeña en su delegación? (selección múltiple):
          </label>
          <div>
            <label>
              <input
                type="checkbox"
                value="Delegado"
                onChange={handleCheckboxChange}
                checked={inscripcion.otrosRoles.includes("Delegado")}
              />
              Delegado
            </label>
            <label>
              <input
                type="checkbox"
                value="Entrenador"
                onChange={handleCheckboxChange}
                checked={inscripcion.otrosRoles.includes("Entrenador")}
              />
              Entrenador
            </label>
            <label>
              <input
                type="checkbox"
                value="Cuerpo médico"
                onChange={handleCheckboxChange}
                checked={inscripcion.otrosRoles.includes("Cuerpo médico")}
              />
              Cuerpo médico
            </label>
            <label>
              <input
                type="checkbox"
                value="Otros"
                onChange={handleCheckboxChange}
                checked={inscripcion.otrosRoles.includes("Otros")}
              />
              Otros (especifique)
            </label>
            <label>
              <input
                type="checkbox"
                value="Ninguno"
                onChange={handleCheckboxChange}
                checked={inscripcion.otrosRoles.includes("Ninguno")}
              />
              Ninguno
            </label>
          </div>
          {inscripcion.otrosRoles.includes("Otros") && (
            <>
              <label>Especifique otros roles:</label>
              <input
                type="text"
                name="otrosRolesEspecifique"
                value={inscripcion.otrosRolesEspecifique}
                onChange={handleChange}
              />
            </>
          )}

          <label>
            ¿Necesita algún requerimiento técnico especial para su conferencia?
            (por ejemplo, proyector, computadora, micrófono inalámbrico, etc.)
          </label>
          <input
            type="text"
            name="requerimientoTecnico"
            value={inscripcion.requerimientoTecnico}
            onChange={handleChange}
          />
        </fieldset>
        <h2>Ficha Comisión de Salud JUDUCA 2025</h2>
        <form onSubmit={handleSubmit}>
          {/* Sección 1: Datos Personales */}
          <fieldset>
            <legend>1. Datos Personales</legend>

            <label htmlFor="nombreCompleto">Nombre completo:</label>
            <input
              type="text"
              id="nombreCompleto"
              name="nombreCompleto"
              value={ficha.nombreCompleto}
              onChange={handleChange}
              required
            />

            <label htmlFor="fechaNacimiento">Fecha de nacimiento:</label>
            <input
              type="date"
              id="fechaNacimiento"
              name="fechaNacimiento"
              value={ficha.fechaNacimiento}
              onChange={handleChange}
              required
            />

            <label htmlFor="edad">Edad:</label>
            <input
              type="number"
              id="edad"
              name="edad"
              value={ficha.edad}
              onChange={handleChange}
              required
            />

            <label>Sexo:</label>
            <div className="opciones-linea">
              <div className="custom-check">
                <input
                  type="radio"
                  id="sexo-masculino"
                  name="sexo"
                  value="Masculino"
                  checked={ficha.sexo === "Masculino"}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="sexo-masculino">Masculino</label>
              </div>
              <div className="custom-check">
                <input
                  type="radio"
                  id="sexo-femenino"
                  name="sexo"
                  value="Femenino"
                  checked={ficha.sexo === "Femenino"}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="sexo-femenino">Femenino</label>
              </div>
            </div>

            <label htmlFor="nacionalidad">Nacionalidad:</label>
            <input
              type="text"
              id="nacionalidad"
              name="nacionalidad"
              value={ficha.nacionalidad}
              onChange={handleChange}
              required
            />

            <label htmlFor="contactoEmergenciaNombre">
              Contacto de emergencia - Nombre:
            </label>
            <input
              type="text"
              id="contactoEmergenciaNombre"
              name="contactoEmergenciaNombre"
              value={ficha.contactoEmergenciaNombre}
              onChange={handleChange}
              required
            />

            <label htmlFor="contactoEmergenciaRelacion">
              Contacto de emergencia - Relación:
            </label>
            <input
              type="text"
              id="contactoEmergenciaRelacion"
              name="contactoEmergenciaRelacion"
              value={ficha.contactoEmergenciaRelacion}
              onChange={handleChange}
              required
            />

            <label htmlFor="contactoEmergenciaTelefono">
              Contacto de emergencia - Teléfono:
            </label>
            <input
              type="text"
              id="contactoEmergenciaTelefono"
              name="contactoEmergenciaTelefono"
              value={ficha.contactoEmergenciaTelefono}
              onChange={handleChange}
              required
            />
          </fieldset>

          {/* Sección 2: Antecedentes Médicos */}
          <fieldset>
            <legend>2. Antecedentes Médicos</legend>
            <label>
              2.1 Enfermedades Crónicas (Marcar con una X si aplica):
            </label>
            <div className="opciones-multiples">
              <div className="custom-check">
                <input
                  type="checkbox"
                  id="enf-ninguna"
                  value="Ninguna"
                  checked={ficha.enfermedadesCronicas.includes("Ninguna")}
                  onChange={handleEnfermedadesChange}
                />
                <label htmlFor="enf-ninguna">Ninguna</label>
              </div>
              <div className="custom-check">
                <input
                  type="checkbox"
                  id="enf-asma"
                  value="Asma"
                  checked={ficha.enfermedadesCronicas.includes("Asma")}
                  onChange={handleEnfermedadesChange}
                />
                <label htmlFor="enf-asma">Asma</label>
              </div>
              <div className="custom-check">
                <input
                  type="checkbox"
                  id="enf-diabetes"
                  value="Diabetes Tipo 1/Tipo 2"
                  checked={ficha.enfermedadesCronicas.includes(
                    "Diabetes Tipo 1/Tipo 2"
                  )}
                  onChange={handleEnfermedadesChange}
                />
                <label htmlFor="enf-diabetes">Diabetes Tipo 1 / Tipo 2</label>
              </div>
              <div className="custom-check">
                <input
                  type="checkbox"
                  id="enf-hipertension"
                  value="Hipertensión arterial"
                  checked={ficha.enfermedadesCronicas.includes(
                    "Hipertensión arterial"
                  )}
                  onChange={handleEnfermedadesChange}
                />
                <label htmlFor="enf-hipertension">Hipertensión arterial</label>
              </div>
              <div className="custom-check">
                <input
                  type="checkbox"
                  id="enf-cardiovasculares"
                  value="Enfermedades cardiovasculares"
                  checked={ficha.enfermedadesCronicas.includes(
                    "Enfermedades cardiovasculares"
                  )}
                  onChange={handleEnfermedadesChange}
                />
                <label htmlFor="enf-cardiovasculares">
                  Enfermedades cardiovasculares
                </label>
              </div>
              <div className="custom-check">
                <input
                  type="checkbox"
                  id="enf-epilepsia"
                  value="Epilepsia"
                  checked={ficha.enfermedadesCronicas.includes("Epilepsia")}
                  onChange={handleEnfermedadesChange}
                />
                <label htmlFor="enf-epilepsia">Epilepsia</label>
              </div>
              <div className="custom-check">
                <input
                  type="checkbox"
                  id="enf-renales"
                  value="Enfermedades renales"
                  checked={ficha.enfermedadesCronicas.includes(
                    "Enfermedades renales"
                  )}
                  onChange={handleEnfermedadesChange}
                />
                <label htmlFor="enf-renales">Enfermedades renales</label>
              </div>
              <div className="custom-check">
                <input
                  type="checkbox"
                  id="enf-hepaticas"
                  value="Enfermedades hepáticas"
                  checked={ficha.enfermedadesCronicas.includes(
                    "Enfermedades hepáticas"
                  )}
                  onChange={handleEnfermedadesChange}
                />
                <label htmlFor="enf-hepaticas">Enfermedades hepáticas</label>
              </div>
              <div className="custom-check">
                <input
                  type="checkbox"
                  id="enf-hematologicos"
                  value="Trastornos hematológicos"
                  checked={ficha.enfermedadesCronicas.includes(
                    "Trastornos hematológicos"
                  )}
                  onChange={handleEnfermedadesChange}
                />
                <label htmlFor="enf-hematologicos">
                  Trastornos hematológicos (anemia, hemofilia, etc.)
                </label>
              </div>
              <div className="custom-check">
                <input
                  type="checkbox"
                  id="enf-alergias"
                  value="Alergias severas"
                  checked={ficha.enfermedadesCronicas.includes(
                    "Alergias severas"
                  )}
                  onChange={handleEnfermedadesChange}
                />
                <label htmlFor="enf-alergias">
                  Alergias severas (alimentarias, medicamentosas, ambientales)
                </label>
              </div>
              <div className="custom-check">
                <input
                  type="checkbox"
                  id="enf-otras"
                  value="Otras"
                  checked={ficha.enfermedadesCronicas.includes("Otras")}
                  onChange={handleEnfermedadesChange}
                />
                <label htmlFor="enf-otras">Otras:</label>
              </div>
            </div>
            {ficha.enfermedadesCronicas.includes("Otras") && (
              <input
                type="text"
                name="otrasEnfermedades"
                value={ficha.otrasEnfermedades}
                onChange={handleChange}
                placeholder="Especifique otras enfermedades"
              />
            )}

            <label>2.2 Alergias a Medicamentos, Alimentos u Otros:</label>
            <div className="opciones-linea">
              <div className="custom-check">
                <input
                  type="radio"
                  id="alergias-no"
                  name="alergias"
                  value="No"
                  checked={ficha.alergias === "No"}
                  onChange={handleChange}
                />
                <label htmlFor="alergias-no">No</label>
              </div>
              <div className="custom-check">
                <input
                  type="radio"
                  id="alergias-si"
                  name="alergias"
                  value="Sí"
                  checked={ficha.alergias === "Sí"}
                  onChange={handleChange}
                />
                <label htmlFor="alergias-si">Sí</label>
              </div>
            </div>
            {ficha.alergias === "Sí" && (
              <input
                type="text"
                name="alergiasDetalle"
                value={ficha.alergiasDetalle}
                onChange={handleChange}
                placeholder="¿Cuáles?"
              />
            )}

            <label>2.3 Cirugías Previas:</label>
            <div className="opciones-linea">
              <div className="custom-check">
                <input
                  type="radio"
                  id="cirugias-no"
                  name="cirugiasPrevias"
                  value="No"
                  checked={ficha.cirugiasPrevias === "No"}
                  onChange={handleChange}
                />
                <label htmlFor="cirugias-no">No</label>
              </div>
              <div className="custom-check">
                <input
                  type="radio"
                  id="cirugias-si"
                  name="cirugiasPrevias"
                  value="Sí"
                  checked={ficha.cirugiasPrevias === "Sí"}
                  onChange={handleChange}
                />
                <label htmlFor="cirugias-si">Sí</label>
              </div>
            </div>
            {ficha.cirugiasPrevias === "Sí" && (
              <input
                type="text"
                name="cirugiasDetalle"
                value={ficha.cirugiasDetalle}
                onChange={handleChange}
                placeholder="¿Cuáles y fecha?"
              />
            )}

            <label>2.4 Lesiones Deportivas Previas:</label>
            <div className="opciones-linea">
              <div className="custom-check">
                <input
                  type="radio"
                  id="lesiones-no"
                  name="lesionesDeportivas"
                  value="No"
                  checked={ficha.lesionesDeportivas === "No"}
                  onChange={handleChange}
                />
                <label htmlFor="lesiones-no">No</label>
              </div>
              <div className="custom-check">
                <input
                  type="radio"
                  id="lesiones-si"
                  name="lesionesDeportivas"
                  value="Sí"
                  checked={ficha.lesionesDeportivas === "Sí"}
                  onChange={handleChange}
                />
                <label htmlFor="lesiones-si">Sí</label>
              </div>
            </div>
            {ficha.lesionesDeportivas === "Sí" && (
              <input
                type="text"
                name="lesionesDetalle"
                value={ficha.lesionesDetalle}
                onChange={handleChange}
                placeholder="¿Cuáles y fecha?"
              />
            )}

            <label>
              2.5 Hospitalizaciones Recientes (en los últimos 2 años):
            </label>
            <div className="opciones-linea">
              <div className="custom-check">
                <input
                  type="radio"
                  id="hospitalizaciones-no"
                  name="hospitalizacionesRecientes"
                  value="No"
                  checked={ficha.hospitalizacionesRecientes === "No"}
                  onChange={handleChange}
                />
                <label htmlFor="hospitalizaciones-no">No</label>
              </div>
              <div className="custom-check">
                <input
                  type="radio"
                  id="hospitalizaciones-si"
                  name="hospitalizacionesRecientes"
                  value="Sí"
                  checked={ficha.hospitalizacionesRecientes === "Sí"}
                  onChange={handleChange}
                />
                <label htmlFor="hospitalizaciones-si">Sí</label>
              </div>
            </div>
            {ficha.hospitalizacionesRecientes === "Sí" && (
              <input
                type="text"
                name="hospitalizacionesDetalle"
                value={ficha.hospitalizacionesDetalle}
                onChange={handleChange}
                placeholder="Motivo y fecha"
              />
            )}

            <label>2.6 Uso de Medicamentos:</label>
            <div className="opciones-linea">
              <div className="custom-check">
                <input
                  type="radio"
                  id="medicamentos-no"
                  name="usoMedicamentos"
                  value="No"
                  checked={ficha.usoMedicamentos === "No"}
                  onChange={handleChange}
                />
                <label htmlFor="medicamentos-no">No</label>
              </div>
              <div className="custom-check">
                <input
                  type="radio"
                  id="medicamentos-si"
                  name="usoMedicamentos"
                  value="Sí"
                  checked={ficha.usoMedicamentos === "Sí"}
                  onChange={handleChange}
                />
                <label htmlFor="medicamentos-si">Sí</label>
              </div>
            </div>
            {ficha.usoMedicamentos === "Sí" && (
              <input
                type="text"
                name="medicamentosDetalle"
                value={ficha.medicamentosDetalle}
                onChange={handleChange}
                placeholder="¿Cuáles y dosis?"
              />
            )}
          </fieldset>

          {/* Sección 3: Evaluación Médica y Aptitud Física */}
          <fieldset>
            <legend>3. Evaluación Médica y Aptitud Física</legend>

            <label htmlFor="tipoSangre">Tipo de sangre:</label>
            <input
              type="text"
              id="tipoSangre"
              name="tipoSangre"
              value={ficha.tipoSangre}
              onChange={handleChange}
              required
            />

            <label>Condición cardiovascular:</label>
            <div className="opciones-linea">
              <div className="custom-check">
                <input
                  type="radio"
                  id="cardiovascular-apto"
                  name="condicionCardiovascular"
                  value="Apto"
                  checked={ficha.condicionCardiovascular === "Apto"}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="cardiovascular-apto">Apto</label>
              </div>
              <div className="custom-check">
                <input
                  type="radio"
                  id="cardiovascular-noapto"
                  name="condicionCardiovascular"
                  value="No apto"
                  checked={ficha.condicionCardiovascular === "No apto"}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="cardiovascular-noapto">No apto</label>
              </div>
            </div>

            <label>Evaluación musculoesquelética:</label>
            <div className="opciones-linea">
              <div className="custom-check">
                <input
                  type="radio"
                  id="musculo-sin"
                  name="evaluacionMusculoesqueletica"
                  value="Sin restricciones"
                  checked={
                    ficha.evaluacionMusculoesqueletica === "Sin restricciones"
                  }
                  onChange={handleChange}
                  required
                />
                <label htmlFor="musculo-sin">Sin restricciones</label>
              </div>
              <div className="custom-check">
                <input
                  type="radio"
                  id="musculo-con"
                  name="evaluacionMusculoesqueletica"
                  value="Con restricciones"
                  checked={
                    ficha.evaluacionMusculoesqueletica === "Con restricciones"
                  }
                  onChange={handleChange}
                  required
                />
                <label htmlFor="musculo-con">Con restricciones</label>
              </div>
            </div>
            {ficha.evaluacionMusculoesqueletica === "Con restricciones" && (
              <input
                type="text"
                name="evaluacionMusculoDetalle"
                value={ficha.evaluacionMusculoDetalle}
                onChange={handleChange}
                placeholder="¿Cuáles?"
              />
            )}
          </fieldset>

          {/* Sección 4: Seguro Médico y Coberturas */}
          <fieldset>
            <legend>4. Seguro Médico y Coberturas</legend>

            <label htmlFor="nombreSeguro">Nombre del seguro:</label>
            <input
              type="text"
              id="nombreSeguro"
              name="nombreSeguro"
              value={ficha.nombreSeguro}
              onChange={handleChange}
              required
            />

            <label htmlFor="numeroPoliza">Número de póliza:</label>
            <input
              type="text"
              id="numeroPoliza"
              name="numeroPoliza"
              value={ficha.numeroPoliza}
              onChange={handleChange}
              required
            />

            <label>Cobertura en caso de accidentes deportivos:</label>
            <div className="opciones-linea">
              <div className="custom-check">
                <input
                  type="radio"
                  id="cobertura-si"
                  name="coberturaAccidentes"
                  value="Sí"
                  checked={ficha.coberturaAccidentes === "Sí"}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="cobertura-si">Sí</label>
              </div>
              <div className="custom-check">
                <input
                  type="radio"
                  id="cobertura-no"
                  name="coberturaAccidentes"
                  value="No"
                  checked={ficha.coberturaAccidentes === "No"}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="cobertura-no">No</label>
              </div>
            </div>
          </fieldset>

          {/* Sección 5: Observaciones */}
          <fieldset>
            <legend>5. Observaciones</legend>
            <label>Recomendaciones médicas:</label>
            <div className="opciones-linea">
              <div className="custom-check">
                <input
                  type="radio"
                  id="recomendaciones-no"
                  name="recomendacionesMedicas"
                  value="No"
                  checked={ficha.recomendacionesMedicas === "No"}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="recomendaciones-no">No</label>
              </div>
              <div className="custom-check">
                <input
                  type="radio"
                  id="recomendaciones-si"
                  name="recomendacionesMedicas"
                  value="Sí"
                  checked={ficha.recomendacionesMedicas === "Sí"}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="recomendaciones-si">Sí</label>
              </div>
            </div>
            {ficha.recomendacionesMedicas === "Sí" && (
              <input
                type="text"
                name="recomendacionesDetalle"
                value={ficha.recomendacionesDetalle}
                onChange={handleChange}
                placeholder="¿Cuáles?"
              />
            )}

            <label>Restricciones o adaptaciones necesarias:</label>
            <div className="opciones-linea">
              <div className="custom-check">
                <input
                  type="radio"
                  id="restricciones-no"
                  name="restriccionesAdaptaciones"
                  value="No"
                  checked={ficha.restriccionesAdaptaciones === "No"}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="restricciones-no">No</label>
              </div>
              <div className="custom-check">
                <input
                  type="radio"
                  id="restricciones-si"
                  name="restriccionesAdaptaciones"
                  value="Sí"
                  checked={ficha.restriccionesAdaptaciones === "Sí"}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="restricciones-si">Sí</label>
              </div>
            </div>
            {ficha.restriccionesAdaptaciones === "Sí" && (
              <input
                type="text"
                name="restriccionesDetalle"
                value={ficha.restriccionesDetalle}
                onChange={handleChange}
                placeholder="¿Cuáles?"
              />
            )}
          </fieldset>

          <button type="submit" className="btn-register">
            Enviar Ficha
          </button>
        </form>
      </form>
    </div>
  );
};

export default InscripcionJUDUCA;

/*import { useState } from "react";
import "../../styles/Evento/Eventos.css";

const RegistroParticipantes = () => {
  const [participante, setParticipante] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    edad: "",
    genero: "",
    estado: "pendiente",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setParticipante((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Enviando datos:", participante);
    alert("Participante registrado con éxito!");
    // Aquí puedes hacer una petición a la API para insertar los datos en la base de datos
  };

  return (
    <div className="registro-form">
      <h2>Registro de Participantes</h2>
      <form onSubmit={handleSubmit}>
        <label>Datos Personales:</label>
        <label>Nombre completo:</label>
        <input
          type="text"
          name="nombre"
          value={participante.nombre}
          onChange={handleChange}
          required
        />

        <label>DNI:</label>
        <input
          type="text"
          name="apellido"
          value={participante.apellido}
          onChange={handleChange}
          required
        />
        <label>Edad:</label>
        <input
          type="number"
          name="edad"
          value={participante.edad}
          onChange={handleChange}
          required
        />
        <label>Género:</label>
        <select
          name="genero"
          value={participante.genero}
          onChange={handleChange}
          required
        >
          <option value="">Seleccionar</option>
          <option value="Masculino">Masculino</option>
          <option value="Femenino">Femenino</option>
          <option value="Otro">Otro</option>
        </select>

        <label>Contactos:</label>

        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={participante.email}
          onChange={handleChange}
          required
        />

        <label>Teléfono:</label>
        <input
          type="tel"
          name="telefono"
          value={participante.telefono}
          onChange={handleChange}
          required
        />

        <button type="submit" className="btn-register">
          Registrar Participante
        </button>
      </form>
    </div>
  );
};

export default RegistroParticipantes;
*/
