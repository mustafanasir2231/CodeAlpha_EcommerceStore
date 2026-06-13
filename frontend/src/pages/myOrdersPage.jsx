import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true); // Loading track karne ke liye

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (!userInfo || !userInfo.token) {
          alert("Please login first!");
          return;
        }

        const config = { 
          headers: { Authorization: `Bearer ${userInfo.token}` } 
        };

        // Yahan console mein check karein request kahan ja rahi hai
        const { data } = await axios.get('/api/orders/myorders', config);
        setOrders(data);
        setLoading(false);
      } catch (error) {
        console.error("Fetch Error:", error.response || error);
        alert("Failed to load orders: " + (error.response?.data?.message || "Server Error"));
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div style={{ padding: '40px 20px', minHeight: '80vh' }}>
      <h1>My Orders</h1>
      
      {loading ? (
        <p>Loading your orders...</p>
      ) : orders.length === 0 ? (
        <p>You haven't placed any orders yet.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
          <thead>
            <tr style={{ textAlign: 'left', borderBottom: '2px solid #ccc' }}>
              <th style={{ padding: '10px' }}>ID</th>
              <th style={{ padding: '10px' }}>TOTAL</th>
              <th style={{ padding: '10px' }}>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '10px' }}>{order._id}</td>
                <td style={{ padding: '10px' }}>${order.totalPrice}</td>
                <td style={{ padding: '10px' }}>{order.isDelivered ? 'Delivered' : 'Pending'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyOrdersPage;