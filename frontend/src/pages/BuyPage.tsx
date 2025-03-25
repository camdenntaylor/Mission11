import Welcome from '../components/Welcome';
import { useNavigate, useParams } from 'react-router-dom';

function BuyPage() {
  const navigate = useNavigate();
  const { title, price } = useParams();

  return (
    <>
      <Welcome />
      <h2>Buy {title}</h2>
      <h3>Price: ${price}</h3>

      <button className="btn btn-success" onClick={() => navigate('/cart')}>
        Add to cart
      </button>
      <br />
      <br />
      <button onClick={() => navigate(-1)}>Go back</button>
    </>
  );
}

export default BuyPage;
