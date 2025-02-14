import Nav from '../components/Dashboard/nav';
import Vouchers from '../components/Vouchers/vouchers';
const voucher = () => {
  return (
    <div  >
      <Nav />
      <div>
      <h1>Gestión de Vouchers</h1>
      <Vouchers />
    </div>
    </div>
    
  );

  
};

export default voucher;
