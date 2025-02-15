import Eventos from "../components/Eventos";
import Nav from '../components/Dashboard/nav';


export default function Evento() {
  return (
    <div className="container mx-auto p-4">
            <Nav />
      <Eventos />
    </div>
  );
}