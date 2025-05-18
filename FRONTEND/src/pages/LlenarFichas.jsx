import LlenarFichas from "../components/Eventos/LlenarFichas";
import Nav from "../components/Dashboard/navDashboard";

export default function Llena_Fichas() {
  return (
    <div className="container mx-auto p-4">
      <Nav />
      <LlenarFichas />
    </div>
  );
}
