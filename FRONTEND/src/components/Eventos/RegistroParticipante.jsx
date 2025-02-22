import { useState } from "react";
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
        <label>Nombre:</label>
        <input
          type="text"
          name="nombre"
          value={participante.nombre}
          onChange={handleChange}
          required
        />

        <label>Apellido:</label>
        <input
          type="text"
          name="apellido"
          value={participante.apellido}
          onChange={handleChange}
          required
        />

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

        <button type="submit" className="btn-register">
          Registrar Participante
        </button>
      </form>
    </div>
  );
};
 
export default RegistroParticipantes;
