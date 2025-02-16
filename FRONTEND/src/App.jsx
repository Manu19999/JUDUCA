import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import React, { useEffect, useState } from "react";


import Home from "./pages/Home"; // Importa la nueva página de inicio
import Login from "./pages/Login"; //página para iniciar sesión
import Dashboard from "./pages/Dashboard"; // Importa la nueva página de inicio

import CreateEvent from "./pages/Evento";
import CreateCredencial from "./pages/credencial";
import ConfigCredencial from "./pages/ConfCredencial"; // Importa la nueva página de inicio


//vouchers y tickets
import Vouchers from "./pages/voucher"; 
import ConsumosVouchers from "./pages/ConsumoVoucher";
import Comedores from "./pages/Comedores";
import Tickets from "./pages/tickets";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="/login" element={<Login />}/>
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/crear-evento" element={<CreateEvent />} />
        <Route path="/crearCredencial" element={<CreateCredencial />} />
        <Route path="/confCredencial" element={<ConfigCredencial />} />
        <Route path="/dashboard" element={<Dashboard />} />




        <Route path="/voucher" element={<Vouchers />} />
        <Route path="/consumo" element={<ConsumosVouchers />} />
        <Route path="/comedor" element={<Comedores />} />
        <Route path="/Ticket" element={<Tickets />} />





      </Routes>
    </Router>
  );
}

export default App;

