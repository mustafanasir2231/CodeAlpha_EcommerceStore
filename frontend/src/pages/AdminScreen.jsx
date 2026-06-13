import React, { useState } from 'react';
import axios from 'axios';

const AdminScreen = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState('');

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhMjU2YjFjMjM4ODhiODljMmJkMjkxNiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc4MDg1MTM4NCwiZXhwIjoxNzgzNDQzMzg0fQ.KaeNLT8Q0A2eH1RWrIDga0YU1_c9c7xXVsPytpT9nno';

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.post('/api/products', {
        name,
        price: Number(price),
        description,
        image,
        category,
        countInStock: Number(countInStock)
      }, config);

      setMessage('Product kamyabi se dashboard mein add ho gaya! 🚀');
      setLoading(false);

      setName('');
      setPrice('');
      setDescription('');
      setImage('');
      setCategory('');
      setCountInStock('');

    } catch (err) {
      setError(err.response && err.response.data.message ? err.response.data.message : err.message);
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    borderRadius: '10px',
    border: '1px solid #cbd5e1',
    backgroundColor: 'rgba(248, 250, 252, 0.8)', // Semi-transparent for premium look
    fontSize: '14px',
    color: '#334155',
    fontFamily: '"Inter", sans-serif',
    transition: 'all 0.2s ease',
    boxSizing: 'border-box',
    outline: 'none'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '6px',
    fontWeight: '600',
    fontSize: '13px',
    color: '#475569'
  };

  return (
    <div style={{ 
      padding: '40px 20px', 
      backgroundColor: '#f1f5f9', // Deeper base color for contrast
      backgroundImage: `
        radial-gradient(at 0% 0%, rgba(59, 130, 246, 0.12) 0px, transparent 50%), 
        radial-gradient(at 100% 100%, rgba(16, 185, 129, 0.08) 0px, transparent 50%),
        radial-gradient(at 100% 0%, rgba(244, 63, 94, 0.05) 0px, transparent 40%)
      `, // High-end tech site gradient blurs (Blue, Green, Rose tics)
      minHeight: 'calc(100vh - 74px)', 
      fontFamily: '"Inter", "Segoe UI", sans-serif',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxSizing: 'border-box',
      position: 'relative',
      overflow: 'hidden'
    }}>
      
      {/* Decorative Blur Elements for Depth */}
      <div style={{ position: 'absolute', width: '250px', height: '250px', borderRadius: '50%', background: 'rgba(59, 130, 246, 0.15)', filter: 'blur(60px)', top: '10%', left: '5%', zIndex: 1 }}></div>
      <div style={{ position: 'absolute', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.1)', filter: 'blur(80px)', bottom: '5%', right: '5%', zIndex: 1 }}></div>

      <div style={{ 
        width: '100%',
        maxWidth: '850px', 
        padding: '35px', 
        borderRadius: '24px', // Softer premium corners
        backgroundColor: 'rgba(255, 255, 255, 0.9)', // Sleek Glassmorphism base
        backdropFilter: 'blur(12px)', // Blurs out the background elements behind the card
        boxShadow: '0 20px 40px -15px rgba(15, 23, 42, 0.08), 0 0 0 1px rgba(15, 23, 42, 0.04)',
        border: '1px solid rgba(255, 255, 255, 0.6)',
        boxSizing: 'border-box',
        zIndex: 2 // Placing card over the blur blobs
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '4px', color: '#0f172a', fontSize: '26px', fontWeight: '800', letterSpacing: '-0.5px' }}>
          Add New Product 🔐
        </h2>
        <p style={{ textAlign: 'center', color: '#64748b', fontSize: '13px', marginBottom: '30px' }}>
          Push a new inventory item directly to the live database.
        </p>

        {message && (
          <div style={{ color: '#065f46', padding: '12px 16px', backgroundColor: '#d1fae5', borderRadius: '10px', marginBottom: '20px', fontSize: '13px', fontWeight: '500', border: '1px solid #a7f3d0' }}>
            {message}
          </div>
        )}
        {error && (
          <div style={{ color: '#991b1b', padding: '12px 16px', backgroundColor: '#fee2e2', borderRadius: '10px', marginBottom: '20px', fontSize: '13px', fontWeight: '500', border: '1px solid #fca5a5' }}>
            <strong>Error:</strong> {error}
          </div>
        )}

        <form onSubmit={submitHandler}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px', marginBottom: '30px' }}>
            
            {/* Left Column */}
            <div>
              <div style={{ marginBottom: '18px' }}>
                <label style={labelStyle}>Product Name</label>
                <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  required 
                  style={inputStyle} 
                  placeholder="e.g. Pro Wireless Gaming Mouse"
                  onFocus={(e) => { e.target.style.borderColor = '#3b82f6'; e.target.style.backgroundColor = '#ffffff'; e.target.style.boxShadow = '0 0 0 4px rgba(59, 130, 246, 0.15)'; }}
                  onBlur={(e) => { e.target.style.borderColor = '#cbd5e1'; e.target.style.backgroundColor = 'rgba(248, 250, 252, 0.8)'; e.target.style.boxShadow = 'none'; }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '18px' }}>
                <div>
                  <label style={labelStyle}>Price ($)</label>
                  <input 
                    type="number" 
                    value={price} 
                    onChange={(e) => setPrice(e.target.value)} 
                    required 
                    style={inputStyle} 
                    placeholder="85"
                    onFocus={(e) => { e.target.style.borderColor = '#3b82f6'; e.target.style.backgroundColor = '#ffffff'; e.target.style.boxShadow = '0 0 0 4px rgba(59, 130, 246, 0.15)'; }}
                    onBlur={(e) => { e.target.style.borderColor = '#cbd5e1'; e.target.style.backgroundColor = 'rgba(248, 250, 252, 0.8)'; e.target.style.boxShadow = 'none'; }}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Stock Count</label>
                  <input 
                    type="number" 
                    value={countInStock} 
                    onChange={(e) => setCountInStock(e.target.value)} 
                    required 
                    style={inputStyle} 
                    placeholder="15"
                    onFocus={(e) => { e.target.style.borderColor = '#3b82f6'; e.target.style.backgroundColor = '#ffffff'; e.target.style.boxShadow = '0 0 0 4px rgba(59, 130, 246, 0.15)'; }}
                    onBlur={(e) => { e.target.style.borderColor = '#cbd5e1'; e.target.style.backgroundColor = 'rgba(248, 250, 252, 0.8)'; e.target.style.boxShadow = 'none'; }}
                  />
                </div>
              </div>

              <div>
                <label style={labelStyle}>Category</label>
                <input 
                  type="text" 
                  value={category} 
                  onChange={(e) => setCategory(e.target.value)} 
                  required 
                  style={inputStyle} 
                  placeholder="e.g. Electronics"
                  onFocus={(e) => { e.target.style.borderColor = '#3b82f6'; e.target.style.backgroundColor = '#ffffff'; e.target.style.boxShadow = '0 0 0 4px rgba(59, 130, 246, 0.15)'; }}
                  onBlur={(e) => { e.target.style.borderColor = '#cbd5e1'; e.target.style.backgroundColor = 'rgba(248, 250, 252, 0.8)'; e.target.style.boxShadow = 'none'; }}
                />
              </div>
            </div>

            {/* Right Column */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ marginBottom: '18px' }}>
                <label style={labelStyle}>Image URL</label>
                <input 
                  type="text" 
                  value={image} 
                  onChange={(e) => setImage(e.target.value)} 
                  required 
                  style={inputStyle} 
                  placeholder="https://images.unsplash.com/..."
                  onFocus={(e) => { e.target.style.borderColor = '#3b82f6'; e.target.style.backgroundColor = '#ffffff'; e.target.style.boxShadow = '0 0 0 4px rgba(59, 130, 246, 0.15)'; }}
                  onBlur={(e) => { e.target.style.borderColor = '#cbd5e1'; e.target.style.backgroundColor = 'rgba(248, 250, 252, 0.8)'; e.target.style.boxShadow = 'none'; }}
                />
              </div>

              <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <label style={labelStyle}>Description</label>
                <textarea 
                  value={description} 
                  onChange={(e) => setDescription(e.target.value)} 
                  required 
                  style={{ ...inputStyle, flexGrow: 1, resize: 'none', minHeight: '110px' }} 
                  placeholder="Provide a detailed description of the premium gadget..."
                  onFocus={(e) => { e.target.style.borderColor = '#3b82f6'; e.target.style.backgroundColor = '#ffffff'; e.target.style.boxShadow = '0 0 0 4px rgba(59, 130, 246, 0.15)'; }}
                  onBlur={(e) => { e.target.style.borderColor = '#cbd5e1'; e.target.style.backgroundColor = 'rgba(248, 250, 252, 0.8)'; e.target.style.boxShadow = 'none'; }}
                ></textarea>
              </div>
            </div>

          </div>

          <button 
            type="submit" 
            disabled={loading} 
            style={{ 
              width: '100%', 
              padding: '14px', 
              backgroundColor: '#10b981', 
              color: 'white', 
              border: 'none', 
              borderRadius: '12px', 
              fontSize: '15px', 
              fontWeight: '600', 
              cursor: 'pointer',
              boxShadow: '0 8px 20px rgba(16, 185, 129, 0.25)',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#059669';
              e.target.style.transform = 'translateY(-1px)';
              e.target.style.boxShadow = '0 12px 24px rgba(16, 185, 129, 0.35)';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = '#10b981';
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 8px 20px rgba(16, 185, 129, 0.25)';
            }}
          >
            {loading ? 'Adding Product to Database...' : 'Publish Product Live 🚀'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminScreen;