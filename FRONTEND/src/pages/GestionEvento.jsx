import GestionEvento from "../components/Eventos/GestionEvento";
import Nav from "../components/Dashboard/navDashboard";
const Eventos = () => {
  return (
    <div>
      <Nav />
      <GestionEvento />
      <Nav />
    </div>
  );
};

export default Eventos;
