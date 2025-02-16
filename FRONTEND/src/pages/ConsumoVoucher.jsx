import { FaVolumeUp } from 'react-icons/fa';
import Nav from '../components/Dashboard/nav';
import VouchersConsumo from '../components/Vouchers/ConsumoVouchers';
const ConsumoVoucher = () => {
  return (
    <div  >
      <Nav />
      <div>
      <h1>GÉSTION DE VOUCHERS Y TICKETS</h1>
      <VouchersConsumo />
    </div>
    </div>
    
  );

  
};

export default ConsumoVoucher;
