import EventosActivos from "../components/Eventos/EventosActivo";
import Nav from '../components/Dashboard/navDashboard';
import PageHeader from "../components/Dashboard/PageHeader"; // Importa el componente reutilizable
export default function ListaEventos() {
  return (
    <div className="container mx-auto p-4">
      <EventosActivos />
      <Nav />
      <section id="Evento">
      <Container>
        {/* Usa el componente reutilizable */}
        <PageHeader title="Evento" />

        {/* Contenido de la página de Evento */}
        
      </Container>
    </section>
    </div>
      
   
    
  );

}
