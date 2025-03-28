import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CartItem } from '../types/CartItem';

function CartPage() {
  const navigate = useNavigate();
  const { cart, removeFromCart } = useCart();
  const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);

  // Progress bar calculation (assuming a $100 goal)
  const spendingGoal = 100;
  const progress = Math.min((totalAmount / spendingGoal) * 100, 100);

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">🛒 Your Cart</h2>

      {cart.length === 0 ? (
        <div className="alert alert-warning text-center">
          Your cart is empty 😢
        </div>
      ) : (
        <ul className="list-group">
          {cart.map((item: CartItem) => (
            <li
              key={item.bookId}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <strong>{item.title}</strong> <br />
                <small>
                  Qty: {item.quantity} | Price: $
                  {(item.price / item.quantity).toFixed(2)} | Subtotal: $
                  {item.price.toFixed(2)}
                </small>
              </div>
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

      {/* Flashy Progress Bar */}
      {cart.length > 0 && (
        <div className="mt-4">
          <h5>Spending Progress</h5>
          <div className="progress">
            <div
              className={`progress-bar progress-bar-striped progress-bar-animated ${
                progress >= 100 ? 'bg-success' : 'bg-info'
              }`}
              role="progressbar"
              style={{ width: `${progress}%` }}
            >
              {Math.round(progress)}%
            </div>
          </div>
        </div>
      )}

      <h3 className="mt-4 text-center">Total: ${totalAmount.toFixed(2)}</h3>

      {/* Floating Checkout Button with Animation */}
      {cart.length > 0 && (
        <div className="fixed-bottom text-center mb-4">
          <button
            className="btn btn-lg btn-success wiggle"
            onClick={() => alert('Proceeding to checkout...')}
          >
            🛍️ Checkout Now!
          </button>
        </div>
      )}

      {/* Continue Browsing Button */}
      <div className="text-center mt-3">
        <button
          className="btn btn-outline-secondary"
          onClick={() => navigate('/')}
        >
          Continue Browsing
        </button>
      </div>

      {/* Wiggle Animation for Checkout Button */}
      <style>
        {`
          .wiggle {
            animation: wiggle 1.5s infinite;
          }
          @keyframes wiggle {
            0% { transform: rotate(0deg); }
            15% { transform: rotate(-2deg); }
            30% { transform: rotate(2deg); }
            45% { transform: rotate(-2deg); }
            60% { transform: rotate(2deg); }
            100% { transform: rotate(0deg); }
          }
        `}
      </style>
    </div>
  );
}

export default CartPage;
