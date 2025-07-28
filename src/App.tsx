import React, {useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Header from './components/Header';
import Footer from './components/Footer';
import SideCart from './components/SideCart';
import SideMenu from './components/SideMenu';
import AuthModal from './components/AuthModal';
import UserDropDown from './components/UserDropdown';
import ProtectedAdminRoute from './components/ProtectedAdminRoute';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import ProductManagement from './pages/admin/ProductManagement';
import OrderManagement from './pages/admin/OrderManagement';
import CustomerManagement from './pages/admin/CustomerManagement';
import PaymentManagement from './pages/admin/PaymentManagement';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import FAQ from './pages/FAQ';
import Shipping from './pages/Shipping';
import Wishlist from './pages/Wishlist';
import Checkout from './pages/Checkout';
import { AuthProvider } from '../lib/AuthContext';

function App() {
  useEffect(() => {
    if (!window.UnicornStudio) {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.29/dist/unicornStudio.umd.js';
      script.onload = () => {
        if (window.UnicornStudio && !window.UnicornStudio.isInitialized) {
          window.UnicornStudio.init();
          window.UnicornStudio.isInitialized = true;
        }
      };
      document.body.appendChild(script);
    }
  }, []);
  return (
    <AuthProvider>
      <AppProvider>
        <Router>
          <Routes>
            {/* Admin Routes */}
            <Route path="/admin" element={
              <ProtectedAdminRoute>
                <AdminLayout><AdminDashboard /></AdminLayout>
              </ProtectedAdminRoute>
            } />
            <Route path="/admin/products" element={
              <ProtectedAdminRoute>
                <AdminLayout><ProductManagement /></AdminLayout>
              </ProtectedAdminRoute>
            } />
            <Route path="/admin/orders" element={
              <ProtectedAdminRoute>
                <AdminLayout><OrderManagement /></AdminLayout>
              </ProtectedAdminRoute>
            } />
            <Route path="/admin/customers" element={
              <ProtectedAdminRoute>
                <AdminLayout><CustomerManagement /></AdminLayout>
              </ProtectedAdminRoute>
            } />
            <Route path="/admin/payments" element={
              <ProtectedAdminRoute>
                <AdminLayout><PaymentManagement /></AdminLayout>
              </ProtectedAdminRoute>
            } />

            {/* Public Routes */}
            <Route path="/*" element={
              <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/shipping" element={<Shipping />} />
                  <Route path="/wishlist" element={<Wishlist />} />
                  <Route path="/checkout" element={<Checkout />} />
                </Routes>
              </main>
              <Footer />
              
              {/* Overlays */}
              <SideCart />
              <SideMenu />
              <AuthModal />
              <UserDropDown/>
            </div>
            }/>
          </Routes>
          
        </Router>
      </AppProvider>
    </AuthProvider>
  );
}

export default App;