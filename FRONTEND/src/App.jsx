import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";

import Home from "./pages/Home"; // Importa la nueva página de inicio
import Login from "./pages/Login"; //página para iniciar sesión
import Dashboard from "./pages/Dashboard"; // Importa la nueva página de inicio
import CajaSeguridad from "./pages/CajaSeguridad"; // Asegúrate de la ruta correcta


import CreateEvent from "./pages/Evento";
import CreateCredencial from "./pages/Credencial";
import ConfigCredencial from "./pages/PlantillaCredencial"; // Importa la nueva página de inicio
import AsignarCampos from "./pages/AsignacionCampos";
import DiseñadorCredencial from "./pages/DiseñadorCredencial";
import CredencialView from "./pages/credencialView";
import MantenimientoView from "./pages/mantenimientoView";
import JuegoView from "./pages/juegosView";
import MantenimientoPaises from "./pages/Mantenimientos/MantenimientoPaises";
import MantenimientoCiudades from "./pages/Mantenimientos/MantenimientoCiudades";
import MantenimientoInstalaciones from "./pages/Mantenimientos/MantenimientoInstalaciones";
import MantenimientoGeneros from "./pages/Mantenimientos/MantenimientoGeneros";
import MantenimientoApiMap from "./pages/Mantenimientos/MantenimientoApiMap";

import AsignacionCredencial from "./pages/AsignacionCredencial";


//vouchers y tickets
import Vouchers from "./pages/voucher";
import ConsumosVouchers from "./pages/ConsumoVoucher";
import Comedores from "./pages/Comedores";
import Tickets from "./pages/tickets";


//seguridad
import Usuarios from "./pages/Seguridad/Usuarios";
import Roles from "./pages/Seguridad/Roles";


//Rutas de los Eventos
import CajaEvento from "./pages/CajaEventos";
import Eventos from "./pages/GestionEvento";
import ListaEventos from "./pages/ListaEventos";
import ListaFichas from "./pages/LlenarFichas";
import Formularios_Fichas from "./pages/FormularioFicha";
import RegistroParticipante from "./pages/RegistroParticipante";
import RegistroSalud from "./pages/RegistroSalud";


// Importa el componente Breadcrumb
import AppBreadcrumb from "./components/AppBreadcrumb";
import CajaFichas from "./pages/CajaFichas";
import Llena_Fichas from "./pages/LlenarFichas";


function App() {
  return (
    <Router>
      {/* Breadcrumb */}
      <AppBreadcrumb />
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/roles" element={<Roles />} />
        <Route path="/seguridad" element={<CajaSeguridad />} />


        <Route path="/crear-evento" element={<CreateEvent />} />
        <Route path="/crearCredencial" element={<CreateCredencial />} />
        <Route path="/confCredencial" element={<ConfigCredencial />} />
        <Route path="/AsignacionCampos" element={<AsignarCampos />} />
        <Route path="/DiseñadorCredencial" element={<DiseñadorCredencial />} />
        <Route path="/credencialView" element={<CredencialView />} />
        <Route path="/mantenimientoView" element={<MantenimientoView />} />
        <Route path="/JuegoView" element={<JuegoView />} />
        <Route path="/MantenimientoPaises" element={<MantenimientoPaises />} />
        <Route path="/MantenimientoCiudades"element={<MantenimientoCiudades />} />
        <Route path="/MantenimientoInstalaciones"element={<MantenimientoInstalaciones />} />
        <Route path="/MantenimientoGeneros"element={<MantenimientoGeneros />} />
        <Route path="/MantenimientoApiMap"element={<MantenimientoApiMap />} />
        <Route path="/asignarcredencial/:id" element={<AsignacionCredencial />}/>
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/voucher" element={<Vouchers />} />
        <Route path="/consumo" element={<ConsumosVouchers />} />
        <Route path="/comedor" element={<Comedores />} />
        <Route path="/Ticket" element={<Tickets />} />

        <Route path="/eventos" element={<CajaEvento />} />
        <Route path="/lista-fichas" element={<CajaFichas />} />
        <Route path="/gestion-evento" element={<Eventos />} />
        <Route path="/lista-eventos" element={<ListaEventos />} />
        <Route path="/Formulario-fichas" element={<Formularios_Fichas />} />
        <Route path="/llenar-fichas" element={<Llena_Fichas />} />
        <Route path="/ficha-participantes" element={<RegistroParticipante />} />
        <Route path="/ficha-salud" element={<RegistroSalud />} />
      </Routes>
    </Router>
  );
}

export default App;
