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

  //Eventos
  eventos: "Eventos",
  "gestion-evento": "Gestión Evento",
  "lista-fichas": "Fichas",
  "Formulario-fichas": "Formulario-Ficha",
  "llenar-fichas": "Registro-Ficha",
  credencialView: "Credenciales",

  //Mantenimientos
  mantenimientoView: "Mantenimientos",
  MantenimientoPaises: "Países",
  MantenimientoCiudades: "Ciudades",
  MantenimientoInstalaciones: "Instalaciones",
  MantenimientoGeneros: "Géneros",
  MantenimientoApiMap: "ApiMap",

};

// Función para obtener la jerarquía basada en la ruta actual
const getHierarchy = (pathname) => {
  const pathnames = pathname.split("/").filter((x) => x);// divide la ruta en partes y elimina elementos vacios

  // Mapeo manual de la jerarquía seguridad, dependiendo de la ruta actual devuelve una jerarquía específica
  if (pathnames.includes("seguridad")) {
    return ["dashboard", "seguridad"];
  }
  if (pathnames.includes("usuarios")) {
    return ["dashboard", "seguridad", "usuarios"];
  }
  if (pathnames.includes("roles")) {
    return ["dashboard", "seguridad", "roles"];
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
  /*
  if (pathnames.includes("Formulario-fichas")) {
    return ["dashboard", "eventos","gestion-evento","lista-fichas","Formulario-fichas"];
  }
  */

  if (pathnames.includes("llenar-fichas")) {
    return ["dashboard", "eventos","gestion-evento","llenar-fichas"];
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

  // Función para manejar el clic en "Seguridad"
  const handleSeguridadClick = () => {
    navigate("/seguridad"); // navega a la ruta seguridad cuando se hace clic en el item "Seguridad"
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
  return (
    <div className="breadcrumb-container">
      <Breadcrumb separator=">" style={{ margin: "16px 0" }}>
        {hierarchy.map((name, index) => { //itera sobre la jerarquía de rutas y renderiza cada item
          const routeTo = `/${hierarchy.slice(0, index + 1).join("/")}`;
          const isLast = index === hierarchy.length - 1;
          const displayName = routeNames[name] || name;

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