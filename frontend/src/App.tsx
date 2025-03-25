import './App.css';
import BookStorePage from './pages/BookStorePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BuyPage from './pages/BuyPage';
import CartPage from './pages/CartPage';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<BookStorePage />} />
          <Route path="/buy/:title/:price" element={<BuyPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
