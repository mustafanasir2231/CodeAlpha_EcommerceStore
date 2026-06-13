import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('/api/auth/forgot-password', { email });
      setMessage("Reset link has been sent to your email! 📧");
      setError('');
    } catch (err) {
      setError("User not found or connection error.");
      setMessage('');
    }
    setLoading(false);
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '80vh', 
      padding: '20px',
      fontFamily: '"Inter", sans-serif' 
    }}>
      <div style={{ 
        width: '100%', 
        maxWidth: '400px', 
        backgroundColor: '#fff', 
        padding: '40px', 
        borderRadius: '20px', 
        boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
        border: '1px solid #f1f5f9'
      }}>
        <h2 style={{ textAlign: 'center', color: '#0f172a', marginBottom: '12px' }}>Reset Password</h2>
        <p style={{ textAlign: 'center', color: '#64748b', fontSize: '14px', marginBottom: '30px' }}>
          Enter your email address and we'll send you a link to reset your password.
        </p>
        
        <form onSubmit={submitHandler}>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '8px' }}>Email Address</label>
          <input 
            type="email" 
            placeholder="name@example.com"
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ 
              width: '100%', 
              padding: '12px', 
              marginBottom: '20px', 
              borderRadius: '10px', 
              border: '1px solid #e2e8f0',
              fontSize: '14px',
              outline: 'none'
            }}
          />
          <button 
            type="submit" 
            disabled={loading}
            style={{ 
              width: '100%', 
              padding: '12px', 
              backgroundColor: '#3b82f6', 
              color: '#fff', 
              border: 'none', 
              borderRadius: '10px', 
              fontWeight: '600',
              fontSize: '15px',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'background 0.3s'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#2563eb'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#3b82f6'}
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>

        {message && <div style={{ marginTop: '20px', padding: '12px', backgroundColor: '#f0fdf4', color: '#166534', borderRadius: '8px', fontSize: '13px', textAlign: 'center' }}>{message}</div>}
        {error && <div style={{ marginTop: '20px', padding: '12px', backgroundColor: '#fef2f2', color: '#991b1b', borderRadius: '8px', fontSize: '13px', textAlign: 'center' }}>{error}</div>}

        <div style={{ marginTop: '24px', textAlign: 'center' }}>
          <Link to="/login" style={{ color: '#64748b', fontSize: '14px', textDecoration: 'none' }}>← Back to Login</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordScreen;