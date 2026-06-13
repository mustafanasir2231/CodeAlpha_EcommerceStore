import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const StripePaymentForm = ({ orderId, clientSecret, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePay = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card: elements.getElement(CardElement) },
    });

    if (result.error) {
      setError(result.error.message);
      setLoading(false);
    } else if (result.paymentIntent.status === 'succeeded') {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      await axios.put(`/api/orders/${orderId}/pay`, {
        id: result.paymentIntent.id,
        status: result.paymentIntent.status,
        update_time: new Date().toISOString(),
        email_address: userInfo.email || '',
      }, {
        headers: { Authorization: `Bearer ${userInfo.token}` }
      });

      // Payment ke baad clientSecret hata do
      localStorage.removeItem('clientSecret');
      setLoading(false);
      onSuccess();
    }
  };

  return (
    <form onSubmit={handlePay}>
      <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '14px', marginBottom: '10px', backgroundColor: '#fafafa' }}>
        <CardElement options={{ style: { base: { fontSize: '16px', color: '#333' } } }} />
      </div>
      <p style={{ fontSize: '13px', color: '#888', backgroundColor: '#fff8e1', padding: '8px', borderRadius: '6px', marginBottom: '10px' }}>
        🧪 Test card: <strong>4242 4242 4242 4242</strong> | Expiry: <strong>12/26</strong> | CVC: <strong>123</strong>
      </p>
      {error && <p style={{ color: 'red', fontSize: '14px' }}>{error}</p>}
      <button
        type="submit"
        disabled={!stripe || loading}
        style={{ width: '100%', padding: '12px', backgroundColor: '#635bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
      >
        {loading ? 'Payment Ho Rahi Hai...' : 'Pay with Stripe'}
      </button>
    </form>
  );
};

const OrderDetailsScreen = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [clientSecret, setClientSecret] = useState('');
  const [paid, setPaid] = useState(false);

  const fetchOrder = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const { data } = await axios.get(`/api/orders/${id}`, {
        headers: { Authorization: `Bearer ${userInfo.token}` }
      });
      setOrder(data);

      // localStorage se clientSecret lo
      const savedSecret = localStorage.getItem('clientSecret');
      if (savedSecret) {
        setClientSecret(savedSecret);
      }
    } catch (error) {
      console.error("Error fetching order:", error);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const handleSuccess = () => {
    setPaid(true);
    fetchOrder();
  };

  if (!order) return <div style={{ padding: '40px', textAlign: 'center' }}>Loading Order Details...</div>;

  const deliveryDate = new Date();
  deliveryDate.setDate(new Date().getDate() + 7);

  const isStripePayment = (
    order.paymentMethod === 'PayPal' ||
    order.paymentMethod === 'PayPal or Credit Card' ||
    order.paymentMethod === 'Stripe'
  );

  return (
    <div style={{ padding: '40px', maxWidth: '1000px', margin: 'auto', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ borderBottom: '2px solid #333', paddingBottom: '10px' }}>Order: #{order._id}</h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '30px', marginTop: '20px' }}>
        <div>
          <section style={{ marginBottom: '30px' }}>
            <h3>Shipping Details</h3>
            <div style={{ background: '#f9f9f9', padding: '15px', borderRadius: '8px' }}>
              <p><strong>Name:</strong> {order.user.name}</p>
              <p><strong>Address:</strong> {order.shippingAddress.address}, {order.shippingAddress.city}</p>
            </div>
          </section>

          <section>
            <h3>Order Items</h3>
            <div style={{ border: '1px solid #ddd', borderRadius: '8px' }}>
              {order.orderItems.map((item, index) => (
                <div key={index} style={{ display: 'flex', padding: '15px', borderBottom: '1px solid #eee', alignItems: 'center' }}>
                  <div style={{ flex: 1 }}>{item.name}</div>
                  <div style={{ fontWeight: 'bold' }}>{item.qty} x ${item.price} = ${(item.qty * item.price).toFixed(2)}</div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div style={{ background: '#fff', border: '1px solid #eee', padding: '25px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', height: 'fit-content' }}>
          <h3>Order Summary</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', margin: '15px 0' }}>
            <span>Status:</span>
            <span style={{ color: order.isPaid || paid ? 'green' : 'red', fontWeight: 'bold' }}>
              {order.isPaid || paid ? 'Paid ✅' : 'Not Paid ❌'}
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', margin: '15px 0' }}>
            <span>Total Price:</span>
            <strong>${order.totalPrice.toFixed(2)}</strong>
          </div>

          {!order.isPaid && !paid && (
            <div style={{ marginTop: '20px' }}>
              {isStripePayment ? (
                clientSecret ? (
                  <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <StripePaymentForm orderId={id} clientSecret={clientSecret} onSuccess={handleSuccess} />
                  </Elements>
                ) : (
                  <p style={{ textAlign: 'center', color: '#888' }}>Payment form load ho raha hai...</p>
                )
              ) : (
                <div style={{ padding: '10px', background: '#fff3cd', color: '#856404', borderRadius: '5px', textAlign: 'center' }}>
                  <strong>Note:</strong> Cash on Delivery selected. Please pay at your doorstep! 🚚
                </div>
              )}
            </div>
          )}

          {(order.isPaid || paid) && (
            <div style={{ marginTop: '20px', padding: '15px', background: '#d4edda', borderRadius: '5px', textAlign: 'center', color: 'green' }}>
              ✅ Payment Complete!
            </div>
          )}

          <div style={{ marginTop: '20px', padding: '15px', background: '#eef6ff', borderRadius: '5px' }}>
            <strong>Estimated Delivery:</strong>
            <p style={{ margin: '5px 0 0 0', color: '#555' }}>{deliveryDate.toDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsScreen;