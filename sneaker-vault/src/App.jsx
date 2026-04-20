import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import HomePage from './pages/HomePage';
import StorePage from './pages/StorePage';
import AdminPage from './pages/AdminPage';
import CartDrawer from './components/cart/CartDrawer';
import AuthModal from './components/auth/AuthModal';

function App() {
  const location = useLocation();

  return (
    <>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/store" element={<StorePage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </AnimatePresence>
      <CartDrawer />
      <AuthModal />
    </>
  );
}

export default App;
