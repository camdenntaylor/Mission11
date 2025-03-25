import { useNavigate } from 'react-router-dom';

function CartPage() {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Your cart</h2>
      <h3>Total: $</h3>
      <button>Check out</button>
      <br />
      <br />
      <button onClick={() => navigate('/')}>Continue Browsing</button>
    </div>
  );
}

export default CartPage;
