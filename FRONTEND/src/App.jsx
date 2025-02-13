import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import React, { useEffect, useState } from "react";
import './styles/App.css'
import CreateEvent from "./pages/Evento";
import CreateCredencial from "./pages/credencial";
import Home from "./pages/Home"; // Importa la nueva página de inicio
import Login from "./pages/Login"; //página para iniciar sesión

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/inicio" element={<Home />} />
        <Route path="/login" element={<Login />}/>
        <Route path="/crear-evento" element={<CreateEvent />} />
        <Route path="/crear-credencial" element={<CreateCredencial />} />


      </Routes>
    </Router>
  );
}

export default App;

