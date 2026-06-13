import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PlaceOrderScreen = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const cart = JSON.parse(localStorage.getItem('cartItems')) || [];
  const shippingAddress = JSON.parse(localStorage.getItem('shippingAddress')) || {};
  const paymentMethod = localStorage.getItem('paymentMethod') || 'Stripe';
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  const placeOrderHandler = async () => {
    setLoading(true);
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo ? userInfo.token : ''}`,
        },
      };

      const { data } = await axios.post('/api/orders', {
        orderItems: cart,
        shippingAddress,
        paymentMethod,
        totalPrice,
      }, config);

      // Cart clear karo
      localStorage.removeItem('cartItems');

      // ✅ FIX: clientSecret order ID ke sath save karo
      const orderId = data.order ? data.order._id : data._id;
      if (data.clientSecret) {
        localStorage.setItem(`clientSecret_${orderId}`, data.clientSecret);
      }

      navigate(`/order/${orderId}`);
    } catch (error) {
      alert(error.response?.data?.message || 'Order place karne mein masla hua!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '40px', maxWidth: '1000px', margin: 'auto', fontFamily: '"Inter", sans-serif' }}>
      <h1 style={{ marginBottom: '8px', fontSize: '24px', fontWeight: '800', color: '#0f172a' }}>Checkout</h1>
      <p style={{ color: '#64748b', marginBottom: '30px', fontSize: '14px' }}>
        Review your order before placing it.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr', gap: '40px' }}>

        {/* ── LEFT: Details ── */}
        <div>
          {/* Shipping */}
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '10px', color: '#0f172a' }}>
              🚚 Shipping Details
            </h3>
            <div style={{ background: '#f8fafc', padding: '14px 16px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '14px', color: '#475569', lineHeight: '1.8' }}>
              <p style={{ margin: 0 }}><strong>Address:</strong> {shippingAddress.address}</p>
              <p style={{ margin: 0 }}><strong>City:</strong> {shippingAddress.city}</p>
              {shippingAddress.postalCode && (
                <p style={{ margin: 0 }}><strong>Postal Code:</strong> {shippingAddress.postalCode}</p>
              )}
              {shippingAddress.country && (
                <p style={{ margin: 0 }}><strong>Country:</strong> {shippingAddress.country}</p>
              )}
            </div>
          </div>

          {/* Payment Method */}
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '10px', color: '#0f172a' }}>
              💳 Payment Method
            </h3>
            <div style={{ background: '#f8fafc', padding: '12px 16px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '14px', color: '#475569' }}>
              {paymentMethod}
            </div>
          </div>

          {/* Order Items */}
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '10px', color: '#0f172a' }}>
              📦 Review Items
            </h3>
            <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden' }}>
              {cart.length === 0 ? (
                <p style={{ padding: '20px', textAlign: 'center', color: '#94a3b8' }}>Cart is empty</p>
              ) : (
                cart.map((item, index) => (
                  <div key={index} style={{
                    display: 'flex', padding: '14px 16px', alignItems: 'center', gap: '14px',
                    borderBottom: index < cart.length - 1 ? '1px solid #f1f5f9' : 'none',
                    backgroundColor: '#fff'
                  }}>
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ width: '52px', height: '52px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #e2e8f0' }}
                    />
                    <div style={{ flex: 1, fontSize: '14px', fontWeight: '600', color: '#0f172a' }}>
                      {item.name}
                    </div>
                    <div style={{ fontSize: '14px', color: '#475569', whiteSpace: 'nowrap' }}>
                      {item.qty} x ${item.price} ={' '}
                      <strong style={{ color: '#0f172a' }}>${(item.qty * item.price).toFixed(2)}</strong>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* ── RIGHT: Summary ── */}
        <div style={{
          background: '#ffffff', border: '1px solid #e2e8f0', padding: '24px',
          borderRadius: '12px', height: 'fit-content',
          boxShadow: '0 4px 16px rgba(0,0,0,0.06)'
        }}>
          <h3 style={{ margin: '0 0 16px', fontSize: '17px', fontWeight: '700', color: '#0f172a' }}>
            Order Summary
          </h3>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '14px', color: '#64748b' }}>
            <span>Items ({cart.reduce((a, i) => a + i.qty, 0)})</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '14px', color: '#64748b' }}>
            <span>Shipping</span>
            <span style={{ color: '#16a34a', fontWeight: '600' }}>Free</span>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid #f1f5f9', margin: '14px 0' }} />

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', fontSize: '17px', fontWeight: '700', color: '#0f172a' }}>
            <span>Total</span>
            <span style={{ color: '#2563eb' }}>${totalPrice.toFixed(2)}</span>
          </div>

          <button
            disabled={loading || cart.length === 0}
            onClick={placeOrderHandler}
            style={{
              width: '100%', padding: '13px',
              backgroundColor: loading || cart.length === 0 ? '#94a3b8' : '#2563eb',
              color: '#fff', border: 'none', borderRadius: '8px',
              cursor: loading || cart.length === 0 ? 'not-allowed' : 'pointer',
              fontSize: '15px', fontWeight: '700',
              boxShadow: '0 4px 14px rgba(37, 99, 235, 0.3)',
              transition: 'background 0.2s'
            }}
          >
            {loading ? '⏳ Processing...' : '🚀 Place Order'}
          </button>

          {cart.length === 0 && (
            <p style={{ textAlign: 'center', fontSize: '12px', color: '#94a3b8', marginTop: '10px' }}>
              Add items to cart first
            </p>
          )}
        </div>

      </div>
    </div>
  );
};

export default PlaceOrderScreen;