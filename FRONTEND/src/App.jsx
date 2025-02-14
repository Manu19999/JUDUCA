import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import React, { useEffect, useState } from "react";


import Home from "./pages/Home"; // Importa la nueva página de inicio
import Login from "./pages/Login"; //página para iniciar sesión
import Dashboard from "./pages/Dashboard"; // Importa la nueva página de inicio


import CreateEvent from "./pages/Evento";
import CreateCredencial from "./pages/credencial";
import ConfigCredencial from "./pages/ConfCredencial"; // Importa la nueva página de inicio


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/inicio" element={<Home />} />
        <Route path="/login" element={<Login />}/>
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/crear-evento" element={<CreateEvent />} />
        <Route path="/crear-credencial" element={<CreateCredencial />} />
        <Route path="/Credencial" element={<ConfigCredencial />} />

      </Routes>
    </Router>
  );
}

export default App;

