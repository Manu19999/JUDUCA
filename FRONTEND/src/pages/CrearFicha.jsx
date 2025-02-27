import Nav from "../components/Dashboard/navDashboard";
import CrearFichas from "../components/Eventos/CrearFichas";

export default function ListaFichas() {
  return (
    <div className="container mx-auto p-4">
      <Nav />
      <CrearFichas />
    </div>
  );
}
