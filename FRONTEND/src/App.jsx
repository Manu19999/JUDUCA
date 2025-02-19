import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";

import Home from "./pages/Home"; // Importa la nueva página de inicio
import Login from "./pages/Login"; //página para iniciar sesión
import Dashboard from "./pages/Dashboard"; // Importa la nueva página de inicio

import CreateEvent from "./pages/Evento";
import CreateCredencial from "./pages/credencial";
import ConfigCredencial from "./pages/PlantillaCredencial"; // Importa la nueva página de inicio
import DiseñadorCredencial from "./pages/DiseñoCredencial";

//vouchers y tickets
import Vouchers from "./pages/voucher";
import ConsumosVouchers from "./pages/ConsumoVoucher";
import Comedores from "./pages/Comedores";
import Tickets from "./pages/tickets";
import Usuarios from "./pages/Usuarios";

//Rutas de los Eventos
import Eventos from "./pages/GestionEvento";
import ListaEventos from "./pages/ListaEventos";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/usuarios" element={<Usuarios />} />

        <Route path="/crear-evento" element={<CreateEvent />} />
        <Route path="/crearCredencial" element={<CreateCredencial />} />
        <Route path="/confCredencial" element={<ConfigCredencial />} />
        <Route
          path="/diseñadorCredencial/:idPlantilla"
          element={<DiseñadorCredencial />}
        />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/voucher" element={<Vouchers />} />
        <Route path="/consumo" element={<ConsumosVouchers />} />
        <Route path="/comedor" element={<Comedores />} />
        <Route path="/Ticket" element={<Tickets />} />

        <Route path="/gestion-evento" element={<Eventos />} />
        <Route path="/lista-eventos" element={<ListaEventos />} />
      </Routes>
    </Router>
  );
}

export default App;
