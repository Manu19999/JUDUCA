import FormularioFichas from "../components/Eventos/FormularioFicha";
import Nav from '../components/Dashboard/navDashboard';


export default function Formularios_Fichas() {
  return (
    <div className="container mx-auto p-4">
            <Nav />

      <FormularioFichas />
    </div>
  );
}
