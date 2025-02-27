import Nav from "../components/Dashboard/navDashboard";
import EventosActivos from "../components/Eventos/EventosActivo";

export default function ListaEventos() {
  return (
    <div className="container mx-auto p-4">
      <Nav />
      <EventosActivos />
    </div>
  );
}
