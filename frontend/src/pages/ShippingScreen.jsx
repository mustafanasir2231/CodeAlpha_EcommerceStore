import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ShippingScreen = () => {
  const navigate = useNavigate();

  // Load saved address if it exists
  const savedAddress = JSON.parse(localStorage.getItem('shippingAddress') || '{}');

  const [address, setAddress]       = useState(savedAddress.address || '');
  const [city, setCity]             = useState(savedAddress.city || '');
  const [postalCode, setPostalCode] = useState(savedAddress.postalCode || '');
  const [country, setCountry]       = useState(savedAddress.country || '');

  // Redirect if user is not logged in
  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (!userInfo) navigate('/login?redirect=shipping');
  }, [navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    localStorage.setItem(
      'shippingAddress',
      JSON.stringify({ address, city, postalCode, country })
    );
    navigate('/payment');
  };

  // Input field style (same as RegisterScreen)
  const inputStyle = {
    width: '100%',
    padding: '10px 14px',
    borderRadius: '8px',
    border: '1px solid #cbd5e1',
    fontSize: '14px',
    boxSizing: 'border-box',
    outline: 'none',
    fontFamily: '"Inter", sans-serif',
  };

  const labelStyle = {
    display: 'block',
    fontSize: '13px',
    fontWeight: '600',
    color: '#334155',
    marginBottom: '6px',
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: 'calc(100vh - 74px)',
      backgroundColor: '#f8fafc',
      fontFamily: '"Inter", sans-serif',
      padding: '20px',
      boxSizing: 'border-box',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '480px',
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        padding: '40px 32px',
        boxShadow: '0 4px 25px rgba(0,0,0,0.05)',
        border: '1px solid #e2e8f0',
      }}>

        {/* Header */}
        <div style={{ marginBottom: '28px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#0f172a', margin: '0 0 6px 0' }}>
            🚚 Shipping Address
          </h2>
          <p style={{ color: '#64748b', fontSize: '14px', margin: 0 }}>
            Where should we deliver your order?
          </p>
        </div>

        {/* Progress indicator */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          marginBottom: '28px',
          fontSize: '12px',
          fontWeight: '600',
        }}>
          {['Cart', 'Shipping', 'Payment', 'Place Order'].map((step, i) => (
            <React.Fragment key={step}>
              <span style={{
                padding: '4px 10px',
                borderRadius: '20px',
                backgroundColor: i === 1 ? '#2563eb' : i < 1 ? '#f0fdf4' : '#f1f5f9',
                color: i === 1 ? '#fff' : i < 1 ? '#16a34a' : '#94a3b8',
              }}>
                {i < 1 ? '✓ ' : ''}{step}
              </span>
              {i < 3 && <span style={{ color: '#cbd5e1' }}>›</span>}
            </React.Fragment>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={submitHandler} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>

          <div>
            <label style={labelStyle}>Street Address</label>
            <input
              type="text"
              placeholder="e.g. 123 Main Street, Apt 4B"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              style={inputStyle}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div>
              <label style={labelStyle}>City</label>
              <input
                type="text"
                placeholder="e.g. Lahore"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Postal Code</label>
              <input
                type="text"
                placeholder="e.g. 54000"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                required
                style={inputStyle}
              />
            </div>
          </div>

          <div>
            <label style={labelStyle}>Country</label>
            <input
              type="text"
              placeholder="e.g. Pakistan"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
              style={inputStyle}
            />
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#2563eb',
              color: '#fff',
              border: 'none',
              borderRadius: '10px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              marginTop: '8px',
              boxShadow: '0 4px 14px rgba(37, 99, 235, 0.3)',
              fontFamily: '"Inter", sans-serif',
            }}
          >
            Continue to Payment →
          </button>

        </form>

      </div>
    </div>
  );
};

export default ShippingScreen;