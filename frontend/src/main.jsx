import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { CartProvider } from './context/CartContext.jsx';
import { PayPalScriptProvider } from "@paypal/react-paypal-js"; // Import this

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Wrap your App with PayPalScriptProvider */}
    <PayPalScriptProvider options={{ "client-id": "YOUR_SANDBOX_CLIENT_ID_YAHAN_DALEN" }}>
      <CartProvider>
        <App />
      </CartProvider>
    </PayPalScriptProvider>
  </StrictMode>
);