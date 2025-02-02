import { Link } from "react-router-dom";
import React, { useState } from 'react';

import Button from "@mui/material/Button";
import "bootstrap/dist/css/bootstrap.min.css";

function CrearFicha() {
  const [ficha, setFicha] = useState({
    id_ficha_registro: '',
    id_evento: '',
    nombre_ficha: '',
    foto_registro: '',
    activo: false,
    comentarios: '',
  });

  
  
    return (
      <div>
       <h1>hola</h1>
      </div>
    );
  }
  
  export default CrearFicha;