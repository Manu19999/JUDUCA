
import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Importa el componente Breadcrumb (si no es lazy, se puede dejar así)
import AppBreadcrumb from "./components/AppBreadcrumb";
import GestionEventos from "./pages/Eventos/GestionEventos";

// Loader de carga (puedes personalizarlo o crear uno aparte)
const Loader = () => <div>Cargando...</div>;

// Importaciones lazy de páginas
const Home = React.lazy(() => import("./pages/Home"));
const Login = React.lazy(() => import("./pages/Login"));
const Dashboard = React.lazy(() => import("./pages/Dashboard"));

// Seguridad
const CajaSeguridad = React.lazy(() => import("./pages/CajaSeguridad"));
const Usuarios = React.lazy(() => import("./pages/Seguridad/Usuarios"));
const Roles = React.lazy(() => import("./pages/Seguridad/Roles"));

// Eventos
const CajaEvento = React.lazy(() => import("./pages/CajaEventos"));
const CreateEvent = React.lazy(() => import("./pages/Evento"));
const Eventos = React.lazy(() => import("./pages/GestionEvento"));
const CajaFichas = React.lazy(() => import("./pages/CajaFichas"));
const Llena_Fichas = React.lazy(() => import("./pages/LlenarFichas"));
const GestionFicha = React.lazy(() => import("./pages/Eventos/GestionFichas"));
const Formularios_Fichas = React.lazy(() => import("./pages/FormularioFicha"));
const RegistroParticipante = React.lazy(() =>import("./pages/RegistroParticipante"));
const RegistroSalud = React.lazy(() => import("./pages/RegistroSalud"));

// Credenciales
const CreateCredencial = React.lazy(() => import("./pages/Credencial"));
const ConfigCredencial = React.lazy(() =>
  import("./pages/PlantillaCredencial")
);
const AsignarCampos = React.lazy(() => import("./pages/AsignacionCampos"));
const DiseñadorCredencial = React.lazy(() =>
  import("./pages/DiseñadorCredencial")
);
const EscanerCredencial = React.lazy(() =>
  import("./pages/escanerCredenciales")
);
const CredencialView = React.lazy(() => import("./pages/credencialView"));
const AsignacionCredencial = React.lazy(() =>
  import("./pages/AsignacionCredencial")
);

// Vouchers y Tickets
const Vouchers = React.lazy(() => import("./pages/voucher"));
const ConsumosVouchers = React.lazy(() => import("./pages/ConsumoVoucher"));
const Comedores = React.lazy(() => import("./pages/Comedores"));
const Tickets = React.lazy(() => import("./pages/tickets"));

// Juegos
const JuegoView = React.lazy(() => import("./pages/juegosView"));

// Mantenimientos
const MantenimientoView = React.lazy(() => import("./pages/mantenimientoView"));
const MantenimientoPaises = React.lazy(() =>
  import("./pages/Mantenimientos/MantenimientoPaises")
);
const MantenimientoCiudades = React.lazy(() =>
  import("./pages/Mantenimientos/MantenimientoCiudades")
);
const MantenimientoInstalaciones = React.lazy(() =>
  import("./pages/Mantenimientos/MantenimientoInstalaciones")
);
const MantenimientoGeneros = React.lazy(() =>
  import("./pages/Mantenimientos/MantenimientoGeneros")
);
const MantenimientoApiMap = React.lazy(() =>
  import("./pages/Mantenimientos/MantenimientoApiMap")
);

function App() {
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <AppBreadcrumb />
        <Routes>
          {/* Página de inicio, login y dashboard */}
          <Route path="" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Seguridad */}
          <Route path="/seguridad" element={<CajaSeguridad />} />
          <Route path="/usuarios" element={<Usuarios />} />
          <Route path="/roles" element={<Roles />} />

          {/* Eventos */}
          <Route path="/eventos" element={<CajaEvento />} />
          <Route path="/crear-evento" element={<CreateEvent />} />
          <Route path="/gestion-evento" element={<Eventos />} />
          <Route path="/control-eventos" element={<GestionEventos />} />

          {/* Fichas */}
          <Route path="/lista-fichas" element={<CajaFichas />} />
          <Route path="/llenar-fichas" element={<Llena_Fichas />} />
          <Route path="/fichas" element={<GestionFicha />} />
          <Route path="/Formulario-fichas" element={<Formularios_Fichas />} />
          <Route
            path="/ficha-participantes"
            element={<RegistroParticipante />}
          />
          <Route path="/ficha-salud" element={<RegistroSalud />} />

          {/* Credenciales */}
          <Route path="/crearCredencial" element={<CreateCredencial />} />
          <Route path="/confCredencial" element={<ConfigCredencial />} />
          <Route path="/AsignacionCampos" element={<AsignarCampos />} />
          <Route
            path="/DiseñadorCredencial"
            element={<DiseñadorCredencial />}
          />
          <Route path="/escaneoCredencial" element={<EscanerCredencial />} />
          <Route path="/credencialView" element={<CredencialView />} />
          <Route
            path="/asignarcredencial/:id"
            element={<AsignacionCredencial />}
          />

          {/* Vouchers y Tickets */}
          <Route path="/voucher" element={<Vouchers />} />
          <Route path="/consumo" element={<ConsumosVouchers />} />
          <Route path="/comedor" element={<Comedores />} />
          <Route path="/Ticket" element={<Tickets />} />

          {/* Juegos */}
          <Route path="/JuegoView" element={<JuegoView />} />

          {/* Mantenimientos */}
          <Route path="/mantenimientoView" element={<MantenimientoView />} />
          <Route
            path="/MantenimientoPaises"
            element={<MantenimientoPaises />}
          />
          <Route
            path="/MantenimientoCiudades"
            element={<MantenimientoCiudades />}
          />
          <Route
            path="/MantenimientoInstalaciones"
            element={<MantenimientoInstalaciones />}
          />
          <Route
            path="/MantenimientoGeneros"
            element={<MantenimientoGeneros />}
          />
          <Route
            path="/MantenimientoApiMap"
            element={<MantenimientoApiMap />}
          />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;








/*import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//import React, { useEffect, useState } from "react";

//import Home from "./pages/Home"; // Importa la nueva página de inicio
import Login from "./pages/Login"; //página para iniciar sesión
import Dashboard from "./pages/Dashboard"; // Importa la nueva página de inicio
import CajaSeguridad from "./pages/CajaSeguridad"; // Asegúrate de la ruta correcta


import CreateEvent from "./pages/Evento";
import CreateCredencial from "./pages/Credencial";
import ConfigCredencial from "./pages/PlantillaCredencial"; // Importa la nueva página de inicio
import AsignarCampos from "./pages/AsignacionCampos";
import DiseñadorCredencial from "./pages/DiseñadorCredencial";
import EscanerCredencial from "./pages/escanerCredenciales";


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
import CajaFichas from "./pages/CajaFichas";
import Llena_Fichas from "./pages/LlenarFichas";
import Eventos from "./pages/GestionEvento";
import GestionEventos from "./pages/Eventos/GestionEventos";
import GestionFicha from "./pages/Eventos/GestionFichas";
import Formularios_Fichas from "./pages/FormularioFicha";
import RegistroParticipante from "./pages/RegistroParticipante";
import RegistroSalud from "./pages/RegistroSalud";


// Importa el componente Breadcrumb
import AppBreadcrumb from "./components/AppBreadcrumb";


//+++++++++++++++++++++++++ importación página de Inicio, Login, Dashboard +++++++++++++++++++++++++
const Home = React.lazy(() => import("./pages/Home")); 
const Login= React.lazy(() => import("./pages/Login")) ; 
const Dashboard =React.lazy(() => import("./pages/Dashboard"));



//+++++++++++++++++++++++++ importación caja de Seguridad y sus elementos +++++++++++++++++++++++++
const CajaSeguridad =React.lazy(() => import("./pages/CajaSeguridad")); 
const Usuarios =React.lazy(() => import("./pages/Seguridad/Usuarios"));
const Roles =React.lazy(() => import("./pages/Seguridad/Roles"));



//+++++++++++++++++++++++++ importación caja de eventos y sus elementos +++++++++++++++++++++++++
const CajaEvento =React.lazy(() => import("./pages/CajaEventos"));
//Eventos
const CreateEvent =React.lazy(() => import("./pages/Evento"));
const Eventos =React.lazy(() => import("./pages/GestionEvento"));

//Fichas
const CajaFichas =React.lazy(() => import("./pages/CajaFichas"));
const Llena_Fichas =React.lazy(() => import("./pages/LlenarFichas"));
const GestionFicha =React.lazy(() => import("./pages/Eventos/GestionFichas"));
const Formularios_Fichas =React.lazy(() => import("./pages/FormularioFicha"));
const RegistroParticipante =React.lazy(() => import("./pages/RegistroParticipante"));
const RegistroSalud =React.lazy(() => import("./pages/RegistroSalud"));

//credenciales
const CreateCredencial =React.lazy(() => import("./pages/Credencial")); 
const ConfigCredencial =React.lazy(() => import("./pages/PlantillaCredencial"));
const AsignarCampos =React.lazy(() => import("./pages/AsignacionCampos"));
const DiseñadorCredencial =React.lazy(() => import("./pages/DiseñadorCredencial"));
const EscanerCredencial =React.lazy(() => import("./pages/escanerCredenciales"));
const CredencialView =React.lazy(() => import("./pages/credencialView"));
const AsignacionCredencial =React.lazy(() => import("./pages/AsignacionCredencial"));

//vouchers y tickets
const Vouchers =React.lazy(() => import("./pages/voucher"));
const ConsumosVouchers =React.lazy(() => import("./pages/ConsumoVoucher"));
const Comedores =React.lazy(() => import("./pages/Comedores"));
const Tickets =React.lazy(() => import("./pages/tickets"));

//Juegos
const JuegoView =React.lazy(() => import("./pages/juegosView"));


//+++++++++++++++++++++++++ importación caja de mantenimientos y sus elementos +++++++++++++++++++++++++
const MantenimientoView =React.lazy(() => import("./pages/mantenimientoView"));
const MantenimientoPaises =React.lazy(() => import("./pages/Mantenimientos/MantenimientoPaises"));
const MantenimientoCiudades =React.lazy(() => import("./pages/Mantenimientos/MantenimientoCiudades"));
const MantenimientoInstalaciones =React.lazy(() => import("./pages/Mantenimientos/MantenimientoInstalaciones"));
const MantenimientoGeneros =React.lazy(() => import("./pages/Mantenimientos/MantenimientoGeneros"));
const MantenimientoApiMap =React.lazy(() => import("./pages/Mantenimientos/MantenimientoApiMap"));




function App() {
  return (
    <Router>
      {/* Breadcrumb 
      <AppBreadcrumb />
      {/* Suspense para manejar la carga de componentes 
      <Suspense fallback={<Loader />}>
      <Routes>
        {/* ruta para pagina de inicio, login y dashboard *
        <Route path="" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />

        {/* ruta para seguridad 
        <Route path="/seguridad" element={<CajaSeguridad />} />
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/roles" element={<Roles />} />

        {/* ruta para eventos 
        <Route path="/eventos" element={<CajaEvento />} />
        <Route path="/crear-evento" element={<CreateEvent />} />
        <Route path="/gestion-evento" element={<Eventos />} />

        {/* ruta para fichas 
        <Route path="/lista-fichas" element={<CajaFichas />} />
        <Route path="/llenar-fichas" element={<Llena_Fichas />} />
        <Route path="/fichas" element={<GestionFicha />} />
        <Route path="/Formulario-fichas" element={<Formularios_Fichas />} />
        <Route path="/ficha-participantes" element={<RegistroParticipante />} />
        <Route path="/ficha-salud" element={<RegistroSalud />} />

        {/* ruta para credenciales 
        <Route path="/crearCredencial" element={<CreateCredencial />} />
        <Route path="/confCredencial" element={<ConfigCredencial />} />
        <Route path="/AsignacionCampos" element={<AsignarCampos />} />
        <Route path="/DiseñadorCredencial" element={<DiseñadorCredencial />} />
        <Route path="/escaneoCredencial" element={<EscanerCredencial />} />
        <Route path="/credencialView" element={<CredencialView />} />
        <Route path="/asignarcredencial/:id" element={<AsignacionCredencial />} />
        
        {/* ruta para vouchers y tickets 
        <Route path="/voucher" element={<Vouchers />} />
        <Route path="/consumo" element={<ConsumosVouchers />} />
        <Route path="/comedor" element={<Comedores />} />
        <Route path="/Ticket" element={<Tickets />} />


        {/* ruta para juegos 
        <Route path="/JuegoView" element={<JuegoView />} />

        {/* ruta para mantenimientos 
        <Route path="/mantenimientoView" element={<MantenimientoView />} />
        <Route path="/MantenimientoPaises" element={<MantenimientoPaises />} />
        <Route path="/MantenimientoCiudades" element={<MantenimientoCiudades />} />
        <Route path="/MantenimientoInstalaciones" element={<MantenimientoInstalaciones />}/>
        <Route path="/MantenimientoGeneros" element={<MantenimientoGeneros />} />
        <Route path="/MantenimientoApiMap" element={<MantenimientoApiMap />} />

      </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
*/