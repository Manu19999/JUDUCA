import RegistroParticipantes from "../components/Eventos/RegistroParticipante";
import Nav from "../components/Dashboard/navDashboard";
export default function RegistroParticipante() {
  return (
    <div className="container mx-auto p-4">
      <RegistroParticipantes />
      <Nav />
    </div>
  );
}
