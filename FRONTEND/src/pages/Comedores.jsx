import Nav from '../components/Dashboard/nav';
import ComedoresComponent from '../components/Vouchers/Comedor'; // Cambio el nombre de la importación

const comedores = () => { 
  return (
    <div>
      <Nav />
      <h1>GÉSTION DE VOUCHERS Y TICKETS</h1>
      <ComedoresComponent />
    </div>
  );
};

export default comedores;
