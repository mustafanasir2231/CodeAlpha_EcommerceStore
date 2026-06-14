import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';


const stripePromise = loadStripe('pk_test_51Thm0bRsdzsXviixD9xEjoSfVlhIKS71y9yBDO9BTSZtTyhKAL91EJETtvb0337PvL4BrJ6tlqeMh83xUaj8oIMM001VCbvtwP');

const StripePaymentForm = ({ orderId, clientSecret, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePay = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setLoading(true);
    setError('');

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card: elements.getElement(CardElement) },
    });

    if (result.error) {
      setError(result.error.message);
      setLoading(false);
    } else if (result.paymentIntent.status === 'succeeded') {
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        await axios.put(`/api/orders/${orderId}/pay`, {
          id: result.paymentIntent.id,
          status: result.paymentIntent.status,
          update_time: new Date().toISOString(),
          email_address: userInfo?.email || '',
        }, {
          headers: { Authorization: `Bearer ${userInfo?.token}` }
        });
        localStorage.removeItem(`clientSecret_${orderId}`);
        onSuccess();
      } catch (err) {
        setError('Payment hua lekin order update nahi hua.');
      }
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handlePay}>
      <div style={{
        border: '1px solid #ddd', borderRadius: '8px',
        padding: '14px', marginBottom: '10px', backgroundColor: '#fff'
      }}>
        <CardElement options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#333',
              '::placeholder': { color: '#aab7c4' },
            },
            invalid: { color: '#e25950' },
          }
        }} />
      </div>
      <p style={{
        fontSize: '13px', color: '#888', backgroundColor: '#fff8e1',
        padding: '8px', borderRadius: '6px', marginBottom: '10px'
      }}>
        🧪 Test card: <strong>4242 4242 4242 4242</strong> | Expiry: <strong>12/26</strong> | CVC: <strong>123</strong>
      </p>
      {error && (
        <p style={{
          color: '#e25950', fontSize: '13px', marginBottom: '10px',
          padding: '8px', backgroundColor: '#fff0f0', borderRadius: '6px'
        }}>
          ❌ {error}
        </p>
      )}
      <button
        type="submit"
        disabled={!stripe || loading}
        style={{
          width: '100%', padding: '12px',
          backgroundColor: loading ? '#a0a0a0' : '#635bff',
          color: '#fff', border: 'none', borderRadius: '5px',
          cursor: loading ? 'not-allowed' : 'pointer',
          fontWeight: 'bold', fontSize: '15px'
        }}
      >
        {loading ? '⏳ Processing...' : 'Pay with Stripe'}
      </button>
    </form>
  );
};

const OrderDetailsScreen = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [clientSecret, setClientSecret] = useState('');
  const [paid, setPaid] = useState(false);
  const [fetchingSecret, setFetchingSecret] = useState(false);

  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  const fetchOrder = async () => {
    try {
      const { data } = await axios.get(`/api/orders/${id}`, {
        headers: { Authorization: `Bearer ${userInfo?.token}` }
      });
      setOrder(data);
    } catch (error) {
      console.error('Error fetching order:', error);
    }
  };

  const fetchClientSecret = async () => {
    const saved = localStorage.getItem(`clientSecret_${id}`);
    if (saved) {
      setClientSecret(saved);
      return;
    }

    setFetchingSecret(true);
    try {
      const { data } = await axios.post(
        `/api/orders/${id}/create-payment-intent`,
        {},
        { headers: { Authorization: `Bearer ${userInfo?.token}` } }
      );
      if (data.clientSecret) {
        setClientSecret(data.clientSecret);
        localStorage.setItem(`clientSecret_${id}`, data.clientSecret);
      }
    } catch (err) {
      console.error('Payment intent error:', err);
    }
    setFetchingSecret(false);
  };

  useEffect(() => {
    fetchOrder();
  }, [id]);

  useEffect(() => {
    if (order && !order.isPaid) {
      fetchClientSecret();
    }
  }, [order]);

  const handleSuccess = () => {
    setPaid(true);
    fetchOrder();
  };

  if (!order) return (
    <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>
      ⏳ Loading Order Details...
    </div>
  );

  const deliveryDate = new Date();
  deliveryDate.setDate(new Date().getDate() + 7);

  const isStripePayment = (
    order.paymentMethod === 'Stripe' ||
    order.paymentMethod === 'PayPal' ||
    order.paymentMethod === 'PayPal or Credit Card'
  );

  return (
    <div style={{ padding: '40px', maxWidth: '1000px', margin: 'auto', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ borderBottom: '2px solid #333', paddingBottom: '10px' }}>
        Order: #{order._id}
      </h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '30px', marginTop: '20px' }}>

        <div>
          <section style={{ marginBottom: '30px' }}>
            <h3>Shipping Details</h3>
            <div style={{ background: '#f9f9f9', padding: '15px', borderRadius: '8px' }}>
              <p style={{ margin: '0 0 6px' }}><strong>Name:</strong> {order.user?.name}</p>
              <p style={{ margin: 0 }}><strong>Address:</strong> {order.shippingAddress?.address}, {order.shippingAddress?.city}</p>
            </div>
          </section>

          <section>
            <h3>Order Items</h3>
            <div style={{ border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden' }}>
              {order.orderItems.map((item, index) => (
                <div key={index} style={{
                  display: 'flex', padding: '15px', alignItems: 'center',
                  borderBottom: index < order.orderItems.length - 1 ? '1px solid #eee' : 'none'
                }}>
                  {item.image && (
                    <img src={item.image} alt={item.name} style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '6px', marginRight: '12px' }} />
                  )}
                  <div style={{ flex: 1 }}>{item.name}</div>
                  <div style={{ fontWeight: 'bold' }}>
                    {item.qty} x ${item.price} = ${(item.qty * item.price).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div style={{
          background: '#fff', border: '1px solid #eee', padding: '25px',
          borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', height: 'fit-content'
        }}>
          <h3 style={{ marginTop: 0 }}>Order Summary</h3>

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
                  <Elements stripe={stripePromise}>
                    <StripePaymentForm
                      orderId={id}
                      clientSecret={clientSecret}
                      onSuccess={handleSuccess}
                    />
                  </Elements>
                ) : (
                  <p style={{ textAlign: 'center', color: '#888', fontSize: '14px' }}>
                    {fetchingSecret ? '⏳ Payment form load ho raha hai...' : '⚠️ Page refresh karein.'}
                  </p>
                )
              ) : (
                <div style={{
                  padding: '12px', background: '#fff3cd', color: '#856404',
                  borderRadius: '6px', textAlign: 'center', fontSize: '14px'
                }}>
                  🚚 <strong>Cash on Delivery</strong> — doorstep par pay karein!
                </div>
              )}
            </div>
          )}

          {(order.isPaid || paid) && (
            <div style={{
              marginTop: '20px', padding: '15px', background: '#d4edda',
              borderRadius: '6px', textAlign: 'center', color: 'green', fontWeight: 'bold'
            }}>
              ✅ Payment Complete!
            </div>
          )}

          <div style={{ marginTop: '20px', padding: '15px', background: '#eef6ff', borderRadius: '6px' }}>
            <strong>Estimated Delivery:</strong>
            <p style={{ margin: '5px 0 0', color: '#555', fontSize: '14px' }}>
              {deliveryDate.toDateString()}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default OrderDetailsScreen;