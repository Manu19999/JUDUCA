import GestionMantenimiento from "../components/Dashboard/mantenimientoView";
import Nav from '../components/Dashboard/navDashboard';


export default function ListaFichas() {
  return (
    <div className="container mx-auto p-4">
            <Nav />
      <GestionMantenimiento />
    </div>
  );
}
