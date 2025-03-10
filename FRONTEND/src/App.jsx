import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Loader de carga
const Loader = () => <div>Cargando...</div>;

// Importaciones lazy
const Home = React.lazy(() => import("./pages/Home"));
const Login = React.lazy(() => import("./pages/Login"));
const Dashboard = React.lazy(() => import("./pages/Dashboard"));

// Seguridad
const CajaSeguridad = React.lazy(() => import("./pages/CajaSeguridad"));
const Usuarios = React.lazy(() => import("./pages/Seguridad/Usuarios"));
const Roles = React.lazy(() => import("./pages/Seguridad/Roles"));

// Eventos
const CajaEventos = React.lazy(() => import("./pages/CajaEventos"));
const GestionEventos = React.lazy(() => import("./pages/Eventos/GestionEventos"));
const CajaFichas = React.lazy(() => import("./pages/CajaFichas"));
const LlenaFichas = React.lazy(() => import("./pages/LlenarFichas"));
const GestionFicha = React.lazy(() => import("./pages/Eventos/GestionFichas"));
const FormulariosFichas = React.lazy(() => import("./pages/FormularioFicha"));
const InscripcionJUDUCA = React.lazy(() =>
  import("./pages/RegistroParticipante")
);


// Credenciales
const ConfigCredencial = React.lazy(() => import("./pages/Credenciales/PlantillaCredencial"));
const AsignarCampos = React.lazy(() => import("./pages/Credenciales/AsignacionCampos"));
const DiseñadorCredencial = React.lazy(() => import("./pages/Credenciales/DiseñadorCredencial"));
const EscanerCredencial = React.lazy(() => import("./pages/Credenciales/EscanerCredenciales"));
const CredencialView = React.lazy(() => import("./pages/Credenciales/CredencialView"));
const AsignacionCredencial = React.lazy(() => import("./pages/Credenciales/AsignacionCredencial"));
const ListaDiseñoCredencial = React.lazy(() => import("./pages/Credenciales/DiseñoListaCredencial"));


// Vouchers y Tickets
const Vouchers = React.lazy(() => import("./pages/Vouchers/voucher"));
const ConsumosVouchers = React.lazy(() => import("./pages/Vouchers/ConsumoVoucher"));
const Comedores = React.lazy(() => import("./pages/Vouchers/Comedores"));
const Tickets = React.lazy(() => import("./pages/Vouchers/Tickets "));

// Juegos
const JuegoView = React.lazy(() => import("./pages/Juegos/JuegosView "));

// Mantenimientos
const MantenimientoView = React.lazy(() => import("./pages/Mantenimientos/MantenimientoView"));
const MantenimientoPaises = React.lazy(() => import("./pages/Mantenimientos/MantenimientoPaises"));
const MantenimientoCiudades = React.lazy(() => import("./pages/Mantenimientos/MantenimientoCiudades"));
const MantenimientoInstalaciones = React.lazy(() => import("./pages/Mantenimientos/MantenimientoInstalaciones"));
const MantenimientoGeneros = React.lazy(() => import("./pages/Mantenimientos/MantenimientoGeneros"));
const MantenimientoApiMap = React.lazy(() => import("./pages/Mantenimientos/MantenimientoApiMap"));

function App() {
  return (
    <Router>
      <Suspense fallback={<Loader />}>
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
          <Route path="/eventos" element={<CajaEventos />} />
          <Route path="/gestion-evento" element={<GestionEventos />} />

          {/* Fichas */}
          <Route path="/lista-fichas" element={<CajaFichas />} />
          <Route path="/llenar-fichas" element={<LlenaFichas />} />
          <Route path="/fichas" element={<GestionFicha />} />
          <Route path="/formulario-fichas" element={<FormulariosFichas />} />
          <Route path="/ficha-participantes" element={<InscripcionJUDUCA />} />

          {/* Credenciales */}
          <Route path="/confCredencial" element={<ConfigCredencial />} />
          <Route path="/asignacionCampos" element={<AsignarCampos />} />
          <Route path="/diseñadorCredencial" element={<DiseñadorCredencial />} />
          <Route path="/escaneoCredencial" element={<EscanerCredencial />} />
          <Route path="/credencialView" element={<CredencialView />} />
          <Route path="/asignarcredencial" element={<AsignacionCredencial />} />
          <Route path="/OpcionCredencial" element={<ListaDiseñoCredencial />}/>

          {/* Vouchers y Tickets */}
          <Route path="/vouchers" element={<Vouchers />} />
          <Route path="/consumo" element={<ConsumosVouchers />} />
          <Route path="/comedor" element={<Comedores />} />
          <Route path="/tickets" element={<Tickets />} />

          {/* Juegos */}
          <Route path="/juegos" element={<JuegoView />} />

          {/* Mantenimientos */}
          <Route path="/mantenimiento" element={<MantenimientoView />} />
          <Route path="/mantenimiento-paises" element={<MantenimientoPaises />} />
          <Route path="/mantenimiento-ciudades" element={<MantenimientoCiudades />} />
          <Route path="/mantenimiento-instalaciones" element={<MantenimientoInstalaciones />} />
          <Route path="/mantenimiento-generos" element={<MantenimientoGeneros />} />
          <Route path="/mantenimiento-api-map" element={<MantenimientoApiMap />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
