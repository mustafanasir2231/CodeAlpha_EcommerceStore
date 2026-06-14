import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../context/CartContext.jsx'; // Imported Context

const ProductScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext); // Got function from Context
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [qty, setQty] = useState(1);
  const [message, setMessage] = useState(''); // For success notification

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`/api/products/${id}`);
        setProduct(data);
        setLoading(false);
      } catch (err) {
        setError(err.response && err.response.data.message ? err.response.data.message : err.message);
        setLoading(false);
      }
    };
    fetchProductDetails();
  }, [id]);

  const decreaseQty = () => {
    if (qty > 1) setQty(qty - 1);
  };

  const increaseQty = () => {
    if (qty < product.countInStock) setQty(qty + 1);
  };

  // Updated: Context API Logic with message instead of alert
  const addToCartHandler = () => {
    addToCart({
      product: product._id,
      name: product.name,
      image: product.image,
      price: product.price,
      countInStock: product.countInStock,
      qty: qty,
    });
    setMessage(`${qty} ${product.name} added to cart! 🎉`);
    // Auto-hide message after 3 seconds
    setTimeout(() => setMessage(''), 3000);
  };

  const buyNowHandler = () => {
    addToCartHandler();
    navigate('/cart');
  };

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
    <div style={{ padding: '35px 20px', backgroundColor: '#f8fafc', minHeight: 'calc(100vh - 74px)', fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', boxSizing: 'border-box' }}>
      
      {/* Success Message */}
      {message && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          backgroundColor: '#10b981',
          color: 'white',
          padding: '12px 20px',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          zIndex: 1000,
          fontSize: '14px',
          fontWeight: '500',
          fontFamily: '"Inter", sans-serif'
        }}>
          {message}
        </div>
      )}

      <div style={{ maxWidth: '900px', margin: '0 auto 16px auto' }}>
        <Link to="/" style={{ color: '#64748b', textDecoration: 'none', fontSize: '13px', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
          ← Back to Marketplace
        </Link>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto', backgroundColor: '#ffffff', borderRadius: '16px', padding: '32px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)', border: '1px solid #e2e8f0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px', alignItems: 'center' }}>
        
        <div style={{ width: '100%', height: '320px', borderRadius: '12px', overflow: 'hidden', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src={product.image} alt={product.name} style={{ width: '80%', height: '80%', objectFit: 'contain' }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', color: '#2563eb', backgroundColor: '#f0f5ff', padding: '4px 10px', borderRadius: '6px', alignSelf: 'flex-start', marginBottom: '12px' }}>
            {product.category}
          </span>
          <h1 style={{ color: '#0f172a', fontSize: '24px', fontWeight: '700', margin: '0 0 8px 0' }}>{product.name}</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px', paddingBottom: '14px', borderBottom: '1px solid #f1f5f9' }}>
            <span style={{ fontSize: '26px', fontWeight: '700', color: '#0f172a' }}>${product.price}</span>
            <span style={{ fontSize: '11px', fontWeight: '600', color: product.countInStock > 0 ? '#10b981' : '#ef4444', backgroundColor: product.countInStock > 0 ? '#f0fdf4' : '#fef2f2', padding: '4px 10px', borderRadius: '20px' }}>
              {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>

          <p style={{ color: '#475569', fontSize: '13.5px', lineHeight: '1.6', margin: '0 0 24px 0' }}>{product.description}</p>

          {product.countInStock > 0 && (
            <div style={{ backgroundColor: '#f8fafc', padding: '14px 20px', borderRadius: '12px', border: '1px solid #e2e8f0', gap: '12px', maxWidth: '260px', width: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '12.5px', fontWeight: '600', color: '#64748b' }}>Quantity:</span>
                <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '20px', overflow: 'hidden' }}>
                  <button onClick={decreaseQty} disabled={qty <= 1} style={{ width: '28px', height: '26px', border: 'none', backgroundColor: '#ffffff', cursor: 'pointer' }}>−</button>
                  <div style={{ width: '28px', textAlign: 'center', fontWeight: '700' }}>{qty}</div>
                  <button onClick={increaseQty} disabled={qty >= product.countInStock} style={{ width: '28px', height: '26px', border: 'none', backgroundColor: '#ffffff', cursor: 'pointer' }}>+</button>
                </div>
              </div>
              <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
                <button onClick={addToCartHandler} style={{ width: '100%', padding: '10px', backgroundColor: '#eff6ff', color: '#2563eb', border: '1px solid #bfdbfe', borderRadius: '50px', fontWeight: '600', cursor: 'pointer' }}>Add to Cart 🛒</button>
                <button onClick={buyNowHandler} style={{ width: '100%', padding: '10px', backgroundColor: '#2563eb', color: '#ffffff', border: 'none', borderRadius: '50px', fontWeight: '600', cursor: 'pointer' }}>Buy Now ⚡</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductScreen;