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

          <label>Categoría:</label>
          <select
            name="categoria"
            value={inscripcion.categoria}
            onChange={handleChange}
            required
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

          <label>Eje temático de la conferencia:</label>
          <select
            name="ejeTematico"
            value={inscripcion.ejeTematico}
            onChange={handleChange}
            required
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

          <label>Tipo de conferencia:</label>
          <select
            name="tipoConferencia"
            value={inscripcion.tipoConferencia}
            onChange={handleChange}
            required
          >
            <option value="">Seleccionar</option>
            <option value="Investigación">
              Investigación
            </option>
            <option value="Buena práctica">
              Buena práctica 
            </option>
            <option value="Experiencia">
              Experiencia 
            </option>
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

        <button type="submit" className="btn-register">
          Enviar Inscripción
        </button>
      </form>
      <p>
        Contacto: correo electrónico{" "}
        <a href="mailto:investigacion.voae@unah.edu.hn">
          investigacion.voae@unah.edu.hn
        </a>{" "}
        o por medio de WhatsApp (504)-9858-2343.
      </p>
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
