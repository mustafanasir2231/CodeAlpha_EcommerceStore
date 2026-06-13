import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PlaceOrderScreen = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const cart = JSON.parse(localStorage.getItem('cartItems')) || [];
  const shippingAddress = JSON.parse(localStorage.getItem('shippingAddress')) || {};
  const paymentMethod = localStorage.getItem('paymentMethod') || 'PayPal';
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

      localStorage.removeItem('cartItems');

      // clientSecret localStorage mein save karo
      if (data.clientSecret) {
        localStorage.setItem('clientSecret', data.clientSecret);
      }

      navigate(`/order/${data.order ? data.order._id : data._id}`);
    } catch (error) {
      alert(error.response?.data?.message || 'Order failed!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '40px', maxWidth: '1000px', margin: 'auto' }}>
      <h1 style={{ marginBottom: '20px' }}>Checkout</h1>
      <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr', gap: '40px' }}>
        
        <div>
          <div style={{ marginBottom: '20px' }}>
            <h3>Shipping Details</h3>
            <p style={{ background: '#eee', padding: '15px', borderRadius: '5px' }}>
              {shippingAddress.address}, {shippingAddress.city}, {shippingAddress.postalCode}
            </p>
          </div>
          
          <h3>Review Items</h3>
          <div style={{ border: '1px solid #ddd', borderRadius: '5px' }}>
            {cart.map((item, index) => (
              <div key={index} style={{ display: 'flex', padding: '15px', borderBottom: '1px solid #eee', alignItems: 'center' }}>
                <img src={item.image} alt={item.name} style={{ width: '50px', height: '50px', marginRight: '15px' }} />
                <div style={{ flex: 1 }}>{item.name}</div>
                <div>{item.qty} x ${item.price} = ${(item.qty * item.price).toFixed(2)}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#fff', border: '1px solid #ddd', padding: '25px', borderRadius: '10px', height: 'fit-content' }}>
          <h3>Order Summary</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', margin: '15px 0' }}>
            <span>Items Price:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <hr />
          <div style={{ display: 'flex', justifyContent: 'space-between', margin: '15px 0', fontSize: '1.2rem' }}>
            <strong>Total:</strong>
            <strong>${totalPrice.toFixed(2)}</strong>
          </div>
          <button 
            disabled={loading || cart.length === 0}
            onClick={placeOrderHandler}
            style={{ width: '100%', padding: '15px', backgroundColor: loading ? '#ccc' : '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: loading ? 'not-allowed' : 'pointer', fontSize: '1rem' }}>
            {loading ? 'Processing...' : 'Place Order'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderScreen;