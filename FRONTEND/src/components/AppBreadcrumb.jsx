import React from "react";
import { Breadcrumb } from "antd"; 
import { useLocation, Link, useNavigate } from "react-router-dom";// para manejar la navegación y la ubicación actual en el sistema
import "../styles/AppBreadcrumb.css";

// Mapeo de nombres mas legible personalizados para las rutas
const routeNames = {
  //Seguridad
  dashboard: "Dashboard",
  seguridad: "Seguridad",
  usuarios: "Usuarios",
  roles: "Roles",
  universidades: "Universidades",
  objetos: "Objetos",
  bitacoras: "Bitacoras",
  "estados-usuario": "Estados-Usuario",
  permisos:"Permisos",
  parametros:"Parametros",
  perfil:"Perfil",

  //Eventos
  eventos: "Eventos",
  "gestion-evento": "Gestión Evento",
  "lista-fichas": "Fichas",
  "vouchers": "Gestión de Vouchers",
  "voucher": "Voucher",
  "nuevo-voucher": "Nuevo Voucher",
  "Formulario-fichas": "Formulario-Ficha",
  "llenar-fichas": "Registro-Ficha",
  credencialView: "Credenciales",
  OpcionFicha:"Opción-Ficha",
  LLenadoFicha:"LLenado-Ficha",

  //Mantenimientos
  mantenimientoView: "Mantenimientos",
  MantenimientoPaises: "Países",
  MantenimientoCiudades: "Ciudades",
  MantenimientoInstalaciones: "Instalaciones",
  MantenimientoGeneros: "Géneros",
  MantenimientoApiMap: "ApiMap",

  //Juegos
  JuegoView:"Juegos",

};

// Función para obtener la jerarquía basada en la ruta actual
const getHierarchy = (pathname) => {
  const pathnames = pathname.split("/").filter((x) => x);// divide la ruta en partes y elimina elementos vacios

  // Mapeo manual de la jerarquía seguridad, dependiendo de la ruta actual devuelve una jerarquía específica
  if (pathnames.includes("seguridad")) {
    return ["dashboard", "seguridad"];
  }
  if (pathnames.includes("perfil")) {
    return ["dashboard", "perfil"];
  }
  if (pathnames.includes("estados-usuario")) {
    return ["dashboard", "seguridad", "usuarios", "estados-usuario"];
  }
  if (pathnames.includes("usuarios")) {
    return ["dashboard", "seguridad", "usuarios"];
  }
  if (pathnames.includes("roles")) {
    return ["dashboard", "seguridad", "roles"];
  }
  if (pathnames.includes("permisos")) {
    return ["dashboard", "seguridad", "roles", "permisos"];
  }
  if (pathnames.includes("universidades")) {
    return ["dashboard", "seguridad", "universidades"];
  }
  if (pathnames.includes("objetos")) {
    return ["dashboard", "seguridad", "objetos"];
  }
  if (pathnames.includes("bitacoras")) {
    return ["dashboard", "seguridad", "bitacoras"];
  }
  if (pathnames.includes("parametros")) {
    return ["dashboard", "seguridad", "parametros"];
  }
  
  // Mapeo manual de la jerarquía eventos
  if (pathnames.includes("eventos")) {
    return ["dashboard", "eventos"];
  }
  if (pathnames.includes("gestion-evento")) {
    return ["dashboard", "eventos","gestion-evento"];
  }
  if (pathnames.includes("lista-fichas")) {
    return ["dashboard", "eventos","gestion-evento","lista-fichas"];
  }
  if (pathnames.includes("vouchers")){
    return ["dashboard", "eventos","gestion-evento","vouchers"];
  }
  if (pathnames.includes("voucher")){
    return ["dashboard", "eventos","gestion-evento","vouchers","voucher"];
  }
  if (pathnames.includes("nuevo-voucher")){
    return ["dashboard", "eventos","gestion-evento","vouchers","nuevo-voucher"];
  }
  if (pathnames.includes("JuegoView")) {
    return ["dashboard", "eventos","gestion-evento","JuegoView"];
  }
  if (pathnames.includes("OpcionFicha")) {
    return ["dashboard", "eventos","gestion-evento","lista-fichas","OpcionFicha"];
  }
  if (pathnames.includes("Formulario-fichas")) {
    return ["dashboard", "eventos","gestion-evento","lista-fichas","OpcionFicha","Formulario-fichas"];
  }
  if (pathnames.includes("llenar-fichas")) {
    return ["dashboard", "eventos","gestion-evento","llenar-fichas"];
  }
  if (pathnames.includes("LlenadoFicha")) {
    return ["dashboard", "eventos","gestion-evento","llenar-fichas","LlenadoFicha"];
  }
  if (pathnames.includes("credencialView")) {
    return ["dashboard", "eventos","gestion-evento","credencialView"];
  }

  // Mapeo manual de la jerarquía mantenimientos
  if (pathnames.includes("mantenimientoView")) {
    return ["dashboard", "mantenimientoView"];
  }
  if (pathnames.includes("MantenimientoPaises")) {
    return ["dashboard", "mantenimientoView","MantenimientoPaises"];
  }
  if (pathnames.includes("MantenimientoCiudades")) {
    return ["dashboard", "mantenimientoView","MantenimientoCiudades"];
  }
  if (pathnames.includes("MantenimientoInstalaciones")) {
    return ["dashboard", "mantenimientoView","MantenimientoInstalaciones"];
  }
  if (pathnames.includes("MantenimientoGeneros")) {
    return ["dashboard", "mantenimientoView","MantenimientoGeneros"];
  }
  if (pathnames.includes("MantenimientoApiMap")) {
    return ["dashboard", "mantenimientoView","MantenimientoApiMap"];
  }

  return pathnames;
};

  

//componente 
const AppBreadcrumb = () => {
  const location = useLocation(); //obtiene la ruta actual
  const navigate = useNavigate();//permite navegar programáticamente a otras rutas
  const hierarchy = getHierarchy(location.pathname); //llama a "getHierarchy" para obtener la jerarquía de rutas basada en la ruta actual

  // Definir rutas donde NO se debe mostrar el breadcrumb
  const rutasExcluidas = ["", "/login"];

  if (rutasExcluidas.includes(location.pathname)) {
    return null; // No renderiza nada si la ruta está en la lista
  }

  // Función para manejar el clic en "Dashboard"
  const handleDashboardClick = () => {
    navigate("/dashboard"); // Navega a la ruta del dashboard
  };

  // Función para manejar el clic en "Seguridad"
  const handleSeguridadClick = () => {
    navigate("/seguridad"); // navega a la ruta seguridad cuando se hace clic en el item "Seguridad"
  };

  const handleUsuariosClick = () => {
    navigate("/usuarios"); // navega a la ruta seguridad cuando se hace clic en el item "Seguridad"
  };

  const handleMantenimientoClick = () => {
    navigate("/mantenimientoView"); // navega a la ruta seguridad cuando se hace clic en el item "Seguridad"
  };

  const handleEventoClick = () => {
    navigate("/eventos"); // navega a la ruta seguridad cuando se hace clic en el item "Seguridad"
  };

  const handleGestionEventoClick = () => {
    navigate("/gestion-evento"); // navega a la ruta seguridad cuando se hace clic en el item "Seguridad"
  };

  const handleVouchersClick = () => {
    navigate("/vouchers"); // navega a la ruta seguridad cuando se hace clic en el item "Seguridad"
  };

  const handleFichaClick = () => {
    navigate("/lista-fichas"); // navega a la ruta seguridad cuando se hace clic en el item "Seguridad"
  };

  const handleOpcionFichaClick = () => {
    navigate("/OpcionFicha"); // navega a la ruta seguridad cuando se hace clic en el item "Seguridad"
  };

  const handleLLenarFichaClick = () => {
    navigate("/llenar-fichas"); // navega a la ruta seguridad cuando se hace clic en el item "Seguridad"
  };

  const handleRolesClick = () => {
    navigate("/roles"); // navega a la ruta seguridad cuando se hace clic en el item "Seguridad"
  };
  return (
    <div className="breadcrumb-container">
      <Breadcrumb separator=">" style={{ margin: "16px 0" }}>
        {hierarchy.map((name, index) => { //itera sobre la jerarquía de rutas y renderiza cada item
          const routeTo = `/${hierarchy.slice(0, index + 1).join("/")}`;
          const isLast = index === hierarchy.length - 1;
          const displayName = routeNames[name] || name;

          // Si es el Dashboard, lo hacemos clickeable
          if (name === "dashboard") {
            return (
              <Breadcrumb.Item key={name}>
                <span
                  onClick={handleDashboardClick}
                  className="breadcrumb-item clickable"
                >
                  {displayName}
                </span>
              </Breadcrumb.Item>
            );
          }
          
          // Si el ítem es "Seguridad", redirige a /seguridad
          if (name === "seguridad") {
            return (
              <Breadcrumb.Item key={name}>
                <span
                  onClick={handleSeguridadClick}
                  className="breadcrumb-item clickable"
                >
                  {displayName}
                </span>
              </Breadcrumb.Item>
            );
          }
          if (name === "mantenimientoView") {
            return (
              <Breadcrumb.Item key={name}>
                <span
                  onClick={handleMantenimientoClick}
                  className="breadcrumb-item clickable"
                >
                  {displayName}
                </span>
              </Breadcrumb.Item>
            );
          }
          if (name === "eventos") {
            return (
              <Breadcrumb.Item key={name}>
                <span
                  onClick={handleEventoClick}
                  className="breadcrumb-item clickable"
                >
                  {displayName}
                </span>
              </Breadcrumb.Item>
            );
          }
          if (name === "gestion-evento") {
            return (
              <Breadcrumb.Item key={name}>
                <span
                  onClick={handleGestionEventoClick}
                  className="breadcrumb-item clickable"
                >
                  {displayName}
                </span>
              </Breadcrumb.Item>
            );
          }
          if (name === "vouchers") {
            return (
              <Breadcrumb.Item key={name}>
                <span
                  onClick={handleVouchersClick}
                  className="breadcrumb-item clickable"
                >
                  {displayName}
                </span>
              </Breadcrumb.Item>
            );
          }
          if (name === "lista-fichas") {
            return (
              <Breadcrumb.Item key={name}>
                <span
                  onClick={handleFichaClick}
                  className="breadcrumb-item clickable"
                >
                  {displayName}
                </span>
              </Breadcrumb.Item>
            );
          }
          if (name === "OpcionFicha") {
            return (
              <Breadcrumb.Item key={name}>
                <span
                  onClick={handleOpcionFichaClick}
                  className="breadcrumb-item clickable"
                >
                  {displayName}
                </span>
              </Breadcrumb.Item>
            );
          }
          if (name === "llenar-fichas") {
            return (
              <Breadcrumb.Item key={name}>
                <span
                  onClick={handleLLenarFichaClick}
                  className="breadcrumb-item clickable"
                >
                  {displayName}
                </span>
              </Breadcrumb.Item>
            );
          }
          if (name === "usuarios") {
            return (
              <Breadcrumb.Item key={name}>
                <span
                  onClick={handleUsuariosClick}
                  className="breadcrumb-item clickable"
                >
                  {displayName}
                </span>
              </Breadcrumb.Item>
            );
          }
          if (name === "roles") {
            return (
              <Breadcrumb.Item key={name}>
                <span
                  onClick={handleRolesClick}
                  className="breadcrumb-item clickable"
                >
                  {displayName}
                </span>
              </Breadcrumb.Item>
            );
          }
          // si es el ultimo item ese item no el clickeable
          return isLast ? (
            <Breadcrumb.Item key={name} className="breadcrumb-item last-item"> 
              {displayName}
            </Breadcrumb.Item>
          ) : (
            <Breadcrumb.Item key={name}>
              <Link to={routeTo} className="breadcrumb-item clickable">
                {displayName}
              </Link>
            </Breadcrumb.Item>
          );
        })}
      </Breadcrumb>
    </div>
  );
};

export default AppBreadcrumb;