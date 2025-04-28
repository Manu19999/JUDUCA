import Nav from '../../components/Dashboard/navDashboard';
import TicketCom from '../../components/Vouchers/ticket'; // Cambio el nombre de la importación

const Tickets = () => { 
  return (
    <div>
      <Nav />
      <h1>GÉSTION DE VOUCHERS Y TICKETS</h1>
      <TicketCom />
    </div>
  );
};

export default Tickets;
