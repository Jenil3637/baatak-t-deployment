import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from '../src/components/CartContext';
import Navbar from '../src/components/Navbar'; // Replace Sidebar with Navbar
import Dashboard from '../src/components/Dashboard';
import Favorites from '../src/components/Favourites';
import Newww from '../src/components/Newww';
import Lunch from '../src/components/Lunch';
import Combo from '../src/components/Combo';
import Sweet from '../src/components/Sweet';
import AddToCart from '../src/components/AddToCart';

function App() {
  return (
    <Router>
      <CartProvider>
        <div className="min-h-screen bg-[#F4E1D2]/30">
          <Navbar />
          <main className="max-w-7xl mx-auto px-4 py-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/new" element={<Newww />} />
              <Route path="/lunch" element={<Lunch />} />
              <Route path="/combo" element={<Combo />} />
              <Route path="/sweet" element={<Sweet />} />
              <Route path="/AddToCart" element={<AddToCart />} />
            </Routes>
          </main>
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;