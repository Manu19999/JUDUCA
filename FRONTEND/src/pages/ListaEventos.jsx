import EventosActivos from "../components/Eventos/EventosActivo";
import Nav from '../components/Dashboard/navDashboard';


export default function ListaEventos() {
  return (
    <div className="container mx-auto p-4">
            <Nav />

      <EventosActivos />
    </div>
  );
}
