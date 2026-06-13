import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'; // 1. useLocation import kiya
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomeScreen from './pages/HomeScreen';
import ProductScreen from './pages/ProductScreen';
import CartScreen from './pages/CartScreen';
import LoginScreen from './pages/LoginScreen';
import RegisterScreen from './pages/RegisterScreen';
import ForgotPasswordScreen from './pages/ForgotPasswordScreen';
import AdminScreen from './pages/AdminScreen';
import ShippingScreen from './pages/ShippingScreen';
import PaymentScreen from './pages/PaymentScreen';
import PlaceOrderScreen from './pages/PlaceOrderScreen'; 
import OrderDetailsScreen from './pages/OrderDetailsScreen';
import Profile from './pages/Profile';
import MyOrdersPage from './pages/myOrdersPage'; 
import AboutScreen from './pages/AboutScreen';
import BlogsScreen from './pages/BlogsScreen';
import ContactScreen from './pages/ContactScreen';
import PaymentPage from './pages/PaymentPage';

// 2. Footer Wrapper banaya taake useLocation use kar sakein
const FooterWrapper = () => {
  const location = useLocation();
  const showFooterPages = ['/', '/about', '/blogs', '/contact'];
  
  return showFooterPages.includes(location.pathname) ? <Footer /> : null;
};

const App = () => {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />

        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/product/:id" element={<ProductScreen />} />
            <Route path="/cart" element={<CartScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/forgot-password" element={<ForgotPasswordScreen />} />
            <Route path="/admin" element={<AdminScreen />} />
            <Route path="/shipping" element={<ShippingScreen />} />
            <Route path="/payment" element={<PaymentScreen />} />
            <Route path="/placeorder" element={<PlaceOrderScreen />} /> 
            <Route path="/order/:id" element={<OrderDetailsScreen />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/myorders" element={<MyOrdersPage />} />
            <Route path="/about" element={<AboutScreen />} />
            <Route path="/blogs" element={<BlogsScreen />} /> 
            <Route path="/contact" element={<ContactScreen />} />
            <Route path="/payment" element={<PaymentPage />} />

          </Routes>
        </main>

        {/* 3. Footer ko yahan FooterWrapper se replace kiya */}
        <FooterWrapper />
      </div>
    </Router>
  );
};

export default App;