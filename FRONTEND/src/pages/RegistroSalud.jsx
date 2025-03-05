import FichaSalud from "../components/Eventos/RegistroSalud";
import Nav from "../components/Dashboard/navDashboard";
export default function RegistroSalud() {
  return (
    <div className="container mx-auto p-4">
            <Nav />

      <FichaSalud />
      <Nav />
    </div>
  );
}
