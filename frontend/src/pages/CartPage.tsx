import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CartItem } from '../types/CartItem';

function CartPage() {
  const navigate = useNavigate();
  const { cart, removeFromCart } = useCart();
  const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div>
      <h2>Your cart</h2>
      <div>
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <ul>
            {cart.map((item: CartItem) => (
              <li key={item.bookId}>
                <strong>{item.title}</strong>: <strong>Qty:</strong>{' '}
                {item.quantity} <strong>Price:</strong>{' '}
                {(Number(item.price.toFixed(2)) / item.quantity).toFixed(2)}{' '}
                <strong>Subtotal: $</strong>
                {item.price.toFixed(2)}{' '}
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => removeFromCart(item.bookId)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <h3>Total: ${totalAmount.toFixed(2)}</h3>
      <button>Check out</button>
      <br />
      <br />
      <button onClick={() => navigate('/')}>Continue Browsing</button>
    </div>
  );
}

export default CartPage;
