import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { Suspense } from "react";
import Loader from "./components/Loader"; 
// Importa el componente Breadcrumb
import AppBreadcrumb from "./components/AppBreadcrumb";
import ProtectedRoute from "./components/ProtectedRoute";
import ProtectedComponent from "./components/ProtectedComponent";
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
const Perfil =React.lazy(() => import("./pages/PerfilUsuario"));

//+++++++++++++++++++++++++ importación caja de eventos y sus elementos +++++++++++++++++++++++++
const CajaEvento =React.lazy(() => import("./pages/CajaEventos"));
//Eventos
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
const Vouchers =React.lazy(() => import("./pages/Voucher.jsx"));
const CajaVouchers =React.lazy(() => import("./pages/Vouchers/CajaVouchers"));
const ConsumosVouchers =React.lazy(() => import("./pages/ConsumoVoucher"));
const Comedores =React.lazy(() => import("./pages/Vouchers/Comedores"));
const Tickets =React.lazy(() => import("./pages/tickets"));
const NuevoVoucher =React.lazy(() => import("./pages/Vouchers/NuevoVoucher.jsx"));
const Mantenimientosvoucher =React.lazy(() => import("./pages/Vouchers/ManteVoucher"));
const CajaComedor =React.lazy(() => import("./pages/Vouchers/CajaComedor.jsx"));
const UbicacionComedores =React.lazy(() => import("./pages/Vouchers/UbicacionComedores"));
const TipoComidas =React.lazy(() => import("./pages/Vouchers/TipoComida"));

//Juegos
const JuegoView =React.lazy(() => import("./pages/Juegos/JuegosView"));


//+++++++++++++++++++++++++ importación caja de mantenimientos y sus elementos +++++++++++++++++++++++++
const CajaMantenimiento =React.lazy(() => import("./pages/Mantenimientos/CajaMantenimiento.jsx"));
const Paises =React.lazy(() => import("./pages/Mantenimientos/Paises.jsx"));
const Ciudades =React.lazy(() => import("./pages/Mantenimientos/Ciudades.jsx"));
const Instalaciones =React.lazy(() => import("./pages/Mantenimientos/Instalaciones.jsx"));
const Generos =React.lazy(() => import("./pages/Mantenimientos/Generos.jsx"));
const ApiMap =React.lazy(() => import("./pages/Mantenimientos/ApiMap.jsx"));
const ParticipantesRegistrados =React.lazy(() => import("./pages/Eventos/ListaParticipantes.jsx"));

const Pantallas = {
  PERFIL:'Perfil',
  UNIVERSIDADES:'Universidades',
  ROLES: 'Roles',
  USUARIOS: 'Usuarios',
  PARAMETROS: 'Parametros',
  BITACORAS: 'Bitacoras',
  OBJETOS: 'Objetos',
  PERMISOS: 'Permisos',
  ESTADOSUSUARIO: 'EstadosUsuario',
  DASHBOARD: 'Dashboard',
  CAJASEGURIDAD: 'CajaSeguridad',
  CAJAMANTENIMIENTO:'CajaMantenimiento',
  PAISES: 'Paises',
  CIUDADES: 'Ciudades',
  INSTALACIONES: 'Instalaciones',
  GENEROS: 'Generos',
  APIMAP: 'ApiMap',
  CAJAEVENTOS:'CajaEventos',
  GESTIONEVENTO:'GestionEvento',
  CAJAFICHAS:'CajaFichas',
  LLENARFICHAS:'LlenarFichas',
  CAJAVOUCHERS:'CajaVouchers',
  CREDENCIALVIEW:'CredencialView',
  JUEGOSVIEW:'JuegosView',
  DISEÑOLISTAFICHA:'DiseñoListaFicha',
  LISTAPARTICIPANTES: 'ListaParticipantes',
  FORMULARIOFICHA:'FormularioFicha',
  LLENADOFORMULARIOFICHA:'LlenadoFormularioFicha',
  DISEÑOLISTACREDENCIAL: 'DiseñoListaCredencial',
  ASIGNACIONCREDENCIAL: 'AsignacionCredencial',
  ASIGNACIONCAMPOS:'AsignacionCampos',
  VOUCHER:'Voucher',
  NUEVOVOUCHER: 'NuevoVoucher',
  MANTENIMIENTOVOUCHER: 'ManteVoucher',
};

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
          
          <Route path="/dashboard" element={
            <ProtectedComponent objetoNombre={Pantallas.DASHBOARD} accion="consultar">
              <Dashboard />
            </ProtectedComponent>
          } />
          <Route path="/perfil" element={
            <ProtectedComponent objetoNombre={Pantallas.PERFIL} accion="consultar">
              <Perfil/>
            </ProtectedComponent>
          } />
          
          
          {/* ruta para seguridad */}
          <Route path="/seguridad" element={
            <ProtectedComponent objetoNombre={Pantallas.CAJASEGURIDAD} accion="consultar">
              <CajaSeguridad />
            </ProtectedComponent>
          } />
          <Route path="/usuarios" element={
            <ProtectedComponent objetoNombre={Pantallas.USUARIOS} accion="consultar">
              <Usuarios/>
            </ProtectedComponent>
          } />
          <Route path="/roles" element={
            <ProtectedComponent objetoNombre={Pantallas.ROLES} accion="consultar">
              <Roles/>
            </ProtectedComponent>
          } />
          <Route path="/universidades" element={
            <ProtectedComponent objetoNombre={Pantallas.UNIVERSIDADES} accion="consultar">
              <Universidades/>
            </ProtectedComponent>
          } />
          <Route path="/objetos" element={
            <ProtectedComponent objetoNombre={Pantallas.OBJETOS} accion="consultar">
              <Objetos/>
            </ProtectedComponent>
          } />
          <Route path="/bitacoras" element={
            <ProtectedComponent objetoNombre={Pantallas.BITACORAS} accion="consultar">
              <Bitacoras/>
            </ProtectedComponent>
          } />
          <Route path="/estados-usuario" element={
            <ProtectedComponent objetoNombre={Pantallas.ESTADOSUSUARIO} accion="consultar">
              <EstadosUsuario/>
            </ProtectedComponent>
          } />
          <Route path="/permisos" element={
            <ProtectedComponent objetoNombre={Pantallas.PERMISOS} accion="consultar">
              <Permisos/>
            </ProtectedComponent>
          } />
          <Route path="/parametros" element={
            <ProtectedComponent objetoNombre={Pantallas.PARAMETROS} accion="consultar">
              <Parametros/>
            </ProtectedComponent>
          } />

          {/* ruta para eventos */}
          <Route path="/eventos" element={
            <ProtectedComponent objetoNombre={Pantallas.CAJAEVENTOS} accion="consultar">
              <CajaEvento/>
            </ProtectedComponent>
          } />
          <Route path="/gestion-evento" element={
            <ProtectedComponent objetoNombre={Pantallas.GESTIONEVENTO} accion="consultar">
              <Eventos/>
            </ProtectedComponent>
          } />

          {/* ruta para fichas */}
          <Route path="/lista-fichas" element={
            <ProtectedComponent objetoNombre={Pantallas.CAJAFICHAS} accion="consultar">
              <CajaFichas/>
            </ProtectedComponent>
          } />
          <Route path="/llenar-fichas" element={
            <ProtectedComponent objetoNombre={Pantallas.LLENARFICHAS} accion="consultar">
              <Llena_Fichas/>
            </ProtectedComponent>
          } />

          <Route path="/fichas" element={<GestionFicha />} />

          <Route path="/Formulario-fichas" element={
            <ProtectedComponent objetoNombre={Pantallas.FORMULARIOFICHA} accion="consultar">
              <Formularios_Fichas/>
            </ProtectedComponent>
          } />

          <Route path="/ficha-participantes" element={<RegistroParticipante />} />
          <Route path="/ficha-salud" element={<RegistroSalud />} />

          <Route path="/OpcionFicha" element={
            <ProtectedComponent objetoNombre={Pantallas.DISEÑOLISTAFICHA} accion="consultar">
              <OpcionFicha/>
            </ProtectedComponent>
          } />

          <Route path="/LlenadoFicha" element={<LlenarFichas />} />

          <Route path="/ListaParticipantes" element={
            <ProtectedComponent objetoNombre={Pantallas.LISTAPARTICIPANTES} accion="consultar">
              <ParticipantesRegistrados/>
            </ProtectedComponent>
          } />




          {/* ruta para credenciales */}
          <Route path="/crearCredencial" element={<CreateCredencial />} />
          <Route path="/confCredencial" element={<ConfigCredencial />} />

          <Route path="/AsignacionCampos" element={
            <ProtectedComponent objetoNombre={Pantallas.ASIGNACIONCAMPOS} accion="consultar">
              <AsignarCampos/>
            </ProtectedComponent>
          } />

          <Route path="/DiseñadorCredencial" element={<DiseñadorCredencial />} />
          <Route path="/escaneoCredencial" element={<EscanerCredencial />} />

          <Route path="/credencialView" element={
            <ProtectedComponent objetoNombre={Pantallas.CREDENCIALVIEW} accion="consultar">
              <CredencialView/>
            </ProtectedComponent>
          } />
          <Route path="/OpcionCredencial" element={
            <ProtectedComponent objetoNombre={Pantallas.DISEÑOLISTACREDENCIAL} accion="consultar">
              <OpcionCredencial/>
            </ProtectedComponent>
          } />
          <Route path="/asignarcredencial" element={
            <ProtectedComponent objetoNombre={Pantallas.ASIGNACIONCREDENCIAL} accion="consultar">
              <AsignacionCredencial/>
            </ProtectedComponent>
          } />
          

           {/* ruta para vouchers y tickets */}
          <Route path="/vouchers" element={
            <ProtectedComponent objetoNombre={Pantallas.CAJAVOUCHERS} accion="consultar">
              <CajaVouchers/>
            </ProtectedComponent>
          } />
          <Route path="/voucher" element={
            <ProtectedComponent objetoNombre={Pantallas.VOUCHER} accion="consultar">
              <Vouchers/>
            </ProtectedComponent>
          } />
          <Route path="/consumo" element={<ConsumosVouchers />} />
          <Route path="/comedor" element={<Comedores />} />
          <Route path="/Ticket" element={<Tickets />} />

          <Route path="/nuevo-voucher" element={
            <ProtectedComponent objetoNombre={Pantallas.NUEVOVOUCHER} accion="consultar">
              <NuevoVoucher/>
            </ProtectedComponent>
          } />
          <Route path="/Mantenimientosvoucher" element={
            <ProtectedComponent objetoNombre={Pantallas.MANTENIMIENTOVOUCHER} accion="consultar">
              <Mantenimientosvoucher/>
            </ProtectedComponent>
          } />
          <Route path="/CajaComedor" element={<CajaComedor/>} /> 
          <Route path="/ubicacionComedores" element={<UbicacionComedores />} />
          <Route path="/TipoComidas" element={<TipoComidas />} />


          {/* ruta para juegos */}
          <Route path="/juegos" element={
            <ProtectedComponent objetoNombre={Pantallas.JUEGOSVIEW} accion="consultar">
              <JuegoView/>
            </ProtectedComponent>
          } />

          {/* ruta para mantenimientos */}
          <Route path="/mantenimientos" element={
            <ProtectedComponent objetoNombre={Pantallas.CAJAMANTENIMIENTO} accion="consultar">
              <CajaMantenimiento/>
            </ProtectedComponent>
          } />
          <Route path="/paises" element={
            <ProtectedComponent objetoNombre={Pantallas.PAISES} accion="consultar">
              <Paises/>
            </ProtectedComponent>
          } />
          <Route path="/ciudades" element={
            <ProtectedComponent objetoNombre={Pantallas.CIUDADES} accion="consultar">
              <Ciudades />
            </ProtectedComponent>
          } />
          <Route path="/instalaciones" element={
            <ProtectedComponent objetoNombre={Pantallas.INSTALACIONES} accion="consultar">
              <Instalaciones  />
            </ProtectedComponent>
          } />
          <Route path="/generos" element={
            <ProtectedComponent objetoNombre={Pantallas.GENEROS} accion="consultar">
              <Generos  />
            </ProtectedComponent>
          } />
          <Route path="/apiMap" element={
            <ProtectedComponent objetoNombre={Pantallas.APIMAP} accion="consultar">
              <ApiMap  />
            </ProtectedComponent>
          } />
        </Route>
      </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
