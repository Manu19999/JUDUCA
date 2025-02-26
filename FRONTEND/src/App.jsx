import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";

import Home from "./pages/Home"; // Importa la nueva página de inicio
import Login from "./pages/Login"; //página para iniciar sesión
import Dashboard from "./pages/Dashboard"; // Importa la nueva página de inicio

import CreateEvent from "./pages/Evento";
import CreateCredencial from "./pages/credencial";
import ConfigCredencial from "./pages/PlantillaCredencial"; // Importa la nueva página de inicio
import AsignarCampos from "./pages/AsignacionCampos";
import DiseñadorCredencial from "./pages/DiseñadorCredencial";

//vouchers y tickets
import Vouchers from "./pages/voucher";
import ConsumosVouchers from "./pages/ConsumoVoucher";
import Comedores from "./pages/Comedores";
import Tickets from "./pages/tickets";


//seguridad
import Usuarios from "./pages/Seguridad/Usuarios";
import Roles from "./pages/Seguridad/Roles";

//Rutas de los Eventos
import Eventos from "./pages/GestionEvento";
import ListaEventos from "./pages/ListaEventos";
import ListaFichas from "./pages/CrearFicha";
import Formularios_Fichas from "./pages/FormularioFicha";
import RegistroParticipante from "./pages/RegistroParticipante";
import RegistroSalud from "./pages/RegistroSalud";
import EventoMantenimiento from "./pages/EventoMantenimiento";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/roles" element={<Roles />} />

        <Route path="/crear-evento" element={<CreateEvent />} />
        <Route path="/crearCredencial" element={<CreateCredencial />} />
        <Route path="/confCredencial" element={<ConfigCredencial />} />
        <Route
          path="/AsignacionCampos/:idPlantilla"
          element={<AsignarCampos />}
        />
        <Route path="/DiseñadorCredencial" element={<DiseñadorCredencial />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/voucher" element={<Vouchers />} />
        <Route path="/consumo" element={<ConsumosVouchers />} />
        <Route path="/comedor" element={<Comedores />} />
        <Route path="/Ticket" element={<Tickets />} />

        <Route path="/gestion-evento" element={<Eventos />} />
        <Route path="/lista-eventos" element={<ListaEventos />} />
        <Route path="/lista-fichas" element={<ListaFichas />} />
        <Route path="/Formulario-fichas" element={<Formularios_Fichas />} />
        <Route path="/ficha-participantes" element={<RegistroParticipante />} />
        <Route path="/ficha-salud" element={<RegistroSalud />} />
        <Route path="/mantenimiento-evento" element={<EventoMantenimiento />} />
      </Routes>
    </Router>
  );
}

export default App;
