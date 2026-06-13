import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const CartScreen = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  // Page load hote hi localStorage se cart items nikalna
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(items);
  }, []);

  // Quantity update karne ka function
  const updateQtyHandler = (id, qty) => {
    const updatedItems = cartItems.map((item) =>
      item.product === id ? { ...item, qty: Number(qty) } : item
    );
    setCartItems(updatedItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
  };

  // Item ko cart se remove karne ka function
  const removeFromCartHandler = (id) => {
    const filteredItems = cartItems.filter((item) => item.product !== id);
    setCartItems(filteredItems);
    localStorage.setItem('cartItems', JSON.stringify(filteredItems));
  };

  // Checkout button handler with Auth redirect logic & explicit notice query
  const checkoutHandler = () => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      navigate('/shipping'); // Agar login hai toh seedha shipping par bhejo
    } else {
      // 🎯 UPDATE: Ab link ke andar redirect ke sath clear notification message bhi pass ho rha hai
      navigate('/login?redirect=shipping&message=Please login first to proceed to checkout'); 
    }
  };

  // Total Price aur Total Items calculate karna
  const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2);

  return (
    <div style={{ padding: '40px', backgroundColor: '#f8fafc', minHeight: 'calc(100vh - 70px)', fontFamily: '"Inter", sans-serif', boxSizing: 'border-box' }}>
      <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a', marginBottom: '30px', letterSpacing: '-0.5px' }}>
        Shopping Cart 🛒
      </h2>

      {cartItems.length === 0 ? (
        <div style={{ backgroundColor: '#ffffff', padding: '40px', borderRadius: '12px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
          <p style={{ color: '#64748b', fontSize: '16px', marginBottom: '20px' }}>Your cart is currently empty.</p>
          <Link to="/" style={{ textDecoration: 'none', backgroundColor: '#3b82f6', color: '#fff', padding: '10px 20px', borderRadius: '6px', fontSize: '14px', fontWeight: '600' }}>
            Go Back To Shop 🛍️
          </Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px', alignItems: 'start' }}>
          
          {/* LEFT: Cart Items List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {cartItems.map((item) => (
              <div key={item.product} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#ffffff', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.01)' }}>
                
                {/* Product Image */}
                <img src={item.image} alt={item.name} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' }} />
                
                {/* Product Name & Details */}
                <div style={{ flex: 1, marginLeft: '16px', marginRight: '16px' }}>
                  <Link to={`/product/${item.product}`} style={{ textDecoration: 'none', color: '#0f172a', fontWeight: '700', fontSize: '15px' }}>
                    {item.name}
                  </Link>
                  <p style={{ color: '#64748b', fontSize: '13px', margin: '4px 0 0 0' }}>Price: ${item.price}</p>
                </div>

                {/* Quantity Selector */}
                <div style={{ marginRight: '24px' }}>
                  <select 
                    value={item.qty} 
                    onChange={(e) => updateQtyHandler(item.product, e.target.value)}
                    style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '14px', backgroundColor: '#f8fafc', fontWeight: '600' }}
                  >
                    {[...Array(item.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Delete Button */}
                <button 
                  onClick={() => removeFromCartHandler(item.product)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#ef4444" style={{ width: '22px', height: '22px' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>
                </button>

              </div>
            ))}
          </div>

          {/* RIGHT: Order Summary Card */}
          <div style={{ backgroundColor: '#1e1e24', color: '#ffffff', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '700', margin: '0 0 16px 0', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '12px' }}>
              Order Summary
            </h3>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '14px', color: '#94a3b8' }}>
              <span>Total Items:</span>
              <span style={{ color: '#fff', fontWeight: '600' }}>{totalItems}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', fontSize: '16px', fontWeight: '700' }}>
              <span>Total Price:</span>
              <span style={{ color: '#3b82f6' }}>${totalPrice}</span>
            </div>

            {/* Premium Checkout Button */}
            <button 
              onClick={checkoutHandler}
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: '#3b82f6',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'background 0.2s'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#2563eb'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#3b82f6'}
            >
              Proceed To Checkout 🚀
            </button>
          </div>

        </div>
      )}
    </div>
  );
};

export default CartScreen;