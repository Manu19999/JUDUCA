import MantenimientoEvento from "../components/Eventos/EventoMantenimiento";
import Nav from '../components/Dashboard/navDashboard';


export default function EventoMantenimiento() {
  return (
    <div className="container mx-auto p-4">
            <Nav />

      <MantenimientoEvento />
    </div>
  );
}
