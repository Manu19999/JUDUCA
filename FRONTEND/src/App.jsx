import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { Suspense } from "react";
import Loader from "./components/Loader"; 
// Importa el componente Breadcrumb
import AppBreadcrumb from "./components/AppBreadcrumb";
import ProtectedRoute from "./components/ProtectedRoute";
import Unauthorized from "./pages/Unauthorized";
import "./styles/Credencial/credencial.css";


//+++++++++++++++++++++++++ importación página de Inicio, Login, Dashboard +++++++++++++++++++++++++
const Home = React.lazy(() => import("./pages/Home")); 
const Login= React.lazy(() => import ("./pages/Login")) ; 
const Dashboard =React.lazy(() => import("./pages/Dashboard"));



//+++++++++++++++++++++++++ importación caja de Seguridad y sus elementos +++++++++++++++++++++++++
const CajaSeguridad =React.lazy(() => import("./pages/CajaSeguridad")); 
const Usuarios =React.lazy(() => import("./pages/Seguridad/Usuarios"));
const Roles =React.lazy(() => import("./pages/Seguridad/Roles"));
const Universidades =React.lazy(() => import("./pages/Seguridad/Universidades"));
const Objetos =React.lazy(() => import("./pages/Seguridad/Objetos"));
const Bitacoras =React.lazy(() => import("./pages/Seguridad/Bitacoras"));
const EstadosUsuario =React.lazy(() => import("./pages/Seguridad/EstadosUsuario"));
const Permisos =React.lazy(() => import("./pages/Seguridad/Permisos"));
const Parametros =React.lazy(() => import("./pages/Seguridad/Parametros"));

//+++++++++++++++++++++++++ importación caja de eventos y sus elementos +++++++++++++++++++++++++
const CajaEvento =React.lazy(() => import("./pages/CajaEventos"));
//Eventos
const CreateEvent =React.lazy(() => import("./pages/Evento"));
const Eventos =React.lazy(() => import("./pages/GestionEvento"));

//Fichas
const CajaFichas =React.lazy(() => import("./pages/CajaFichas.jsx"));
const Llena_Fichas =React.lazy(() => import("./pages/LlenarFichas"));
const GestionFicha =React.lazy(() => import("./pages/Eventos/GestionFichas"));
const Formularios_Fichas =React.lazy(() => import("./pages/FormularioFicha"));
const RegistroParticipante =React.lazy(() => import("./pages/RegistroParticipante"));
const RegistroSalud =React.lazy(() => import("./pages/RegistroSalud"));
const OpcionFicha =React.lazy(() => import("./pages/DiseñoListaFicha"));
const LlenarFichas =React.lazy(() => import("./pages/LlenadoFormularioFicha"));



//credenciales
const CreateCredencial =React.lazy(() => import("./pages/Credenciales/Credencial")); 
const ConfigCredencial =React.lazy(() => import("./pages/Credenciales/PlantillaCredencial"));
const AsignarCampos =React.lazy(() => import("./pages/Credenciales/AsignacionCampos"));
const DiseñadorCredencial =React.lazy(() => import("./pages/Credenciales/DiseñadorCredencial"));
const EscanerCredencial =React.lazy(() => import("./pages/Credenciales/escanerCredenciales"));
const CredencialView =React.lazy(() => import("./pages/Credenciales/credencialView"));
const OpcionCredencial =React.lazy(() => import("./pages/Credenciales/DiseñoListaCredencial"));
const AsignacionCredencial =React.lazy(() => import("./pages/Credenciales/AsignacionCredencial"));


//vouchers y tickets
const Vouchers =React.lazy(() => import("./pages/voucher"));
const CajaVouchers =React.lazy(() => import("./pages/Vouchers/CajaVouchers"));
const ConsumosVouchers =React.lazy(() => import("./pages/ConsumoVoucher"));
const Comedores =React.lazy(() => import("./pages/Comedores"));
const Tickets =React.lazy(() => import("./pages/tickets"));
const NuevoVoucher =React.lazy(() => import("./pages/Vouchers/Nuevo-Voucher"));

//Juegos
const JuegoView =React.lazy(() => import("./pages/Juegos/juegosView"));


//+++++++++++++++++++++++++ importación caja de mantenimientos y sus elementos +++++++++++++++++++++++++
const MantenimientoView =React.lazy(() => import("./pages/Mantenimientos/mantenimientoView"));
const MantenimientoPaises =React.lazy(() => import("./pages/Mantenimientos/MantenimientoPaises"));
const MantenimientoCiudades =React.lazy(() => import("./pages/Mantenimientos/MantenimientoCiudades"));
const MantenimientoInstalaciones =React.lazy(() => import("./pages/Mantenimientos/MantenimientoInstalaciones"));
const MantenimientoGeneros =React.lazy(() => import("./pages/Mantenimientos/MantenimientoGeneros"));
const MantenimientoApiMap =React.lazy(() => import("./pages/Mantenimientos/MantenimientoApiMap"));
const ParticipantesRegistrados =React.lazy(() => import("./pages/Eventos/ListaParticipantes.jsx"));


function App() {
  return (
    <Router>
      {/* Breadcrumb */}
      <div className="no-print">
      <AppBreadcrumb />
      </div>
      {/* Suspense para manejar la carga de componentes */}
      <Suspense fallback={<Loader />}>
      <Routes>
        {/* ruta para pagina de inicio, login y dashboard */}
        {/* RUTAS PÚBLICAS */}
        <Route path="" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* RUTAS PRIVADAS */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          
          
          {/* ruta para seguridad */}
          <Route path="/seguridad" element={<CajaSeguridad />} />
          <Route path="/usuarios" element={<Usuarios />} />
          <Route path="/roles" element={<Roles />} />
          <Route path="/universidades" element={<Universidades />} />
          <Route path="/objetos" element={<Objetos />} />
          <Route path="/bitacoras" element={<Bitacoras />} />
          <Route path="/estados-usuario" element={<EstadosUsuario />} />
          <Route path="/permisos" element={<Permisos />} />
          <Route path="/parametros" element={<Parametros />} />

          {/* ruta para eventos */}
          <Route path="/eventos" element={<CajaEvento />} />
          <Route path="/crear-evento" element={<CreateEvent />} />
          <Route path="/gestion-evento" element={<Eventos />} />
          

          {/* ruta para fichas */}
          <Route path="/lista-fichas" element={<CajaFichas />} />
          <Route path="/llenar-fichas" element={<Llena_Fichas />} />
          <Route path="/fichas" element={<GestionFicha />} />
          <Route path="/Formulario-fichas" element={<Formularios_Fichas />} />
          <Route path="/ficha-participantes" element={<RegistroParticipante />} />
          <Route path="/ficha-salud" element={<RegistroSalud />} />
          <Route path="/OpcionFicha" element={<OpcionFicha />} />
          <Route path="/LlenadoFicha" element={<LlenarFichas />} />
          <Route path="/ListaPartticipantes" element={<ParticipantesRegistrados />} />




          {/* ruta para credenciales */}
          <Route path="/crearCredencial" element={<CreateCredencial />} />
          <Route path="/confCredencial" element={<ConfigCredencial />} />
          <Route path="/AsignacionCampos" element={<AsignarCampos />} />
          <Route path="/DiseñadorCredencial" element={<DiseñadorCredencial />} />
          <Route path="/escaneoCredencial" element={<EscanerCredencial />} />
          <Route path="/credencialView" element={<CredencialView />} />
          <Route path="/OpcionCredencial" element={<OpcionCredencial />} />
          <Route path="/asignarcredencial" element={<AsignacionCredencial />} />

          
          {/* ruta para vouchers y tickets */}
          <Route path="/vouchers" element={<CajaVouchers />} />
          <Route path="/voucher" element={<Vouchers />} />
          <Route path="/consumo" element={<ConsumosVouchers />} />
          <Route path="/comedor" element={<Comedores />} />
          <Route path="/Ticket" element={<Tickets />} />
          <Route path="/nuevo-voucher" element={<NuevoVoucher />} />


          {/* ruta para juegos */}
          <Route path="/JuegoView" element={<JuegoView />} />

          {/* ruta para mantenimientos */}
          <Route path="/mantenimientoView" element={<MantenimientoView />} />
          <Route path="/MantenimientoPaises" element={<MantenimientoPaises />} />
          <Route path="/MantenimientoCiudades" element={<MantenimientoCiudades />} />
          <Route path="/MantenimientoInstalaciones" element={<MantenimientoInstalaciones />}/>
          <Route path="/MantenimientoGeneros" element={<MantenimientoGeneros />} />
          <Route path="/MantenimientoApiMap" element={<MantenimientoApiMap />} />
        </Route>
      </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
