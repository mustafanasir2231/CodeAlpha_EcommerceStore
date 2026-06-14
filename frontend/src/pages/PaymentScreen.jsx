import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentScreen = () => {
  const [paymentMethod, setPaymentMethod] = useState('PayPal');
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    localStorage.setItem('paymentMethod', paymentMethod);
    navigate('/placeorder');
  };

  return (

<div style={{ maxWidth: '400px', margin: '40px auto', padding: '25px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', borderRadius: '12px', backgroundColor: '#fff' }}>      <h2 style={{ marginBottom: '25px', textAlign: 'center' }}>Select Payment Method</h2>
      
      <form onSubmit={submitHandler}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {/* Option 1 */}
          <div style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '8px', cursor: 'pointer' }}>
            <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <input type="radio" value="PayPal" checked={paymentMethod === 'PayPal'} onChange={(e) => setPaymentMethod(e.target.value)} style={{ marginRight: '10px' }} />
               Credit Card
            </label>
          </div>

          {/* Option 2 (New) */}
          <div style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '8px', cursor: 'pointer' }}>
            <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <input type="radio" value="Cash On Delivery" checked={paymentMethod === 'Cash On Delivery'} onChange={(e) => setPaymentMethod(e.target.value)} style={{ marginRight: '10px' }} />
              Cash On Delivery
            </label>
          </div>
        </div>

        <button type="submit" style={{ width: '100%', marginTop: '30px', padding: '12px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}>
          Continue to Order Summary
        </button>
      </form>
    </div>
  );
};

export default PaymentScreen;