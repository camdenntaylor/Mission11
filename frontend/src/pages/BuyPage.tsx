import Welcome from '../components/Welcome';
import { useNavigate, useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CartItem } from '../types/CartItem';

function BuyPage() {
  const navigate = useNavigate();
  const { title, price, bookId, quantity } = useParams();
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    const newItem: CartItem = {
      bookId: Number(bookId),
      title: title || 'no title found',
      price: Number(price),
      quantity: Number(quantity),
    };
    addToCart(newItem);
    navigate('/cart');
  };

  return (
    <>
      <Welcome />
      <h2>Buy {title}</h2>
      <h3>Price: ${price}</h3>

      <button className="btn btn-success" onClick={handleAddToCart}>
        Add to cart
      </button>
      <br />
      <br />
      <button onClick={() => navigate(-1)}>Go back</button>
    </>
  );
}

export default BuyPage;
