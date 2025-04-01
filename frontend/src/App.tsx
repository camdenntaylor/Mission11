import './App.css';
import BookStorePage from './pages/BookStorePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BuyPage from './pages/BuyPage';
import CartPage from './pages/CartPage';
import { CartProvider } from './context/CartContext';
import AdminBooksPage from './pages/AdminBooksPage';

function App() {
  return (
    <>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<BookStorePage />} />
            <Route path="/buy/:title/:price/:bookId" element={<BuyPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/admin" element={<AdminBooksPage />} />
          </Routes>
        </Router>
      </CartProvider>
    </>
  );
}

export default App;
