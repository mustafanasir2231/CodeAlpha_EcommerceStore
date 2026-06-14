import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get('/api/products');
        setProducts(data);
        setLoading(false);
      } catch (err) {
        setError(err.response && err.response.data.message ? err.response.data.message : err.message);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '70vh', fontFamily: '"Inter", sans-serif', color: '#2563eb' }}>
        <div style={{ width: '28px', height: '28px', border: '2px solid #e2e8f0', borderTopColor: '#2563eb', borderRadius: '50%', animation: 'spin 0.6s linear infinite' }}></div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ color: '#ef4444', padding: '12px 18px', border: '1px solid #fca5a5', borderRadius: '10px', backgroundColor: '#fef2f2', maxWidth: '450px', margin: '60px auto', textAlign: 'center', fontFamily: '"Inter", sans-serif', fontSize: '13px' }}>
        <strong>Error:</strong> {error}
      </div>
    );
  }

  return (
    <div style={{ 
      padding: '24px 20px',
      paddingBottom: '80px', 
      backgroundColor: '#f8fafc', 
      minHeight: 'calc(100vh - 74px)', 
      display: 'flex',            
      flexDirection: 'column',    
      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      boxSizing: 'border-box'
    }}>
      
      {/* Search Bar Section */}
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <input 
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ 
            padding: '12px 20px', 
            width: '100%', 
            maxWidth: '500px', 
            borderRadius: '25px', 
            border: '1px solid #e2e8f0',
            outline: 'none',
            fontSize: '15px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
          }}
        />
      </div>

      {/* Central Sub-Header */}
      <div style={{ textAlign: 'center', marginBottom: '24px', padding: '0 10px' }}>
        <p style={{ color: '#64748b', fontSize: '13px', margin: '0 auto', maxWidth: '600px', lineHeight: '1.4', fontWeight: '500' }}>
         
        </p>
      </div>

      {/* Grid Alignment */}
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))', 
        gap: '20px', 
        boxSizing: 'border-box',
        flex: 1 // Ye content ko expand karega
      }}>
        
        {filteredProducts.length === 0 ? (
          <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '40px', color: '#64748b' }}>
            <p>No products available matching your search.</p>
          </div>
        ) : (
          filteredProducts.map((product) => (
            <Link 
              key={product._id}
              to={`/product/${product._id}`}
              style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
            >
              <div 
                style={{ 
                  background: 'linear-gradient(145deg, #ffffff 60%, #fdfeff 100%)', 
                  borderRadius: '14px', 
                  padding: '14px', 
                  border: '1px solid #e2e8f0', 
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.02), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  cursor: 'pointer',
                  transition: 'all 0.22s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.borderColor = '#cbd5e1';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = '#e2e8f0';
                }}
              >
                <div style={{ width: '100%', height: '145px', backgroundColor: '#f8fafc', borderRadius: '10px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px', border: '1px solid #f1f5f9' }}>
                  <img src={product.image} alt={product.name} style={{ maxWidth: '80%', maxHeight: '80%', objectFit: 'contain' }} />
                </div>
                <span style={{ fontSize: '9px', fontWeight: '700', textTransform: 'uppercase', color: '#2563eb', backgroundColor: '#f0f5ff', padding: '3px 7px', borderRadius: '4px', alignSelf: 'flex-start', marginBottom: '8px' }}>
                  {product.category}
                </span>
                <h2 style={{ color: '#0f172a', fontSize: '15px', fontWeight: '600', margin: '0 0 4px 0', overflow: 'hidden', height: '20px' }}>
                  {product.name}
                </h2>
                <p style={{ color: '#64748b', fontSize: '12px', margin: '0 0 12px 0', height: '34px', overflow: 'hidden' }}>
                  {product.description}
                </p>
                <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '8px', borderTop: '1px solid #f1f5f9' }}>
                  <span style={{ fontSize: '16.5px', fontWeight: '700', color: '#0f172a' }}>${product.price}</span>
                  <span style={{ fontSize: '10px', fontWeight: '600', color: product.countInStock > 0 ? '#10b981' : '#ef4444', backgroundColor: product.countInStock > 0 ? '#f0fdf4' : '#fef2f2', padding: '2px 8px', borderRadius: '12px' }}>
                    {product.countInStock > 0 ? `In Stock (${product.countInStock})` : 'Out of Stock'}
                  </span>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default HomeScreen;