import CrearFichas from "../components/Eventos/CrearFichas";
import Nav from '../components/Dashboard/navDashboard';


export default function ListaFichas() {
  return (
    <div className="container mx-auto p-4">
            <Nav />
      <CrearFichas />
    </div>
  );
}
