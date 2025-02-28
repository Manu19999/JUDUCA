import GestionEvento from "../components/Eventos/GestionEvento";
import Nav from "../components/Dashboard/navDashboard";

const Eventos = () => {
  return (
    <div>
      <Nav />
      <div style={{ marginTop: "40px" }}></div>
      <GestionEvento />
    </div>
  );
};

export default Eventos;
