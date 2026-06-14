import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const redirect = searchParams.get('redirect') || '/';
  const infoMessage = searchParams.get('message');

  // ✅ Updated password
  const ADMIN_EMAIL = 'admin@codealpha.com';
  const ADMIN_PASSWORD = 'onlyadminlogin321';

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (isAdminMode) {
      if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
        setError('Invalid admin credentials!');
        setLoading(false);
        return;
      }
    }

    try {
      const config = { headers: { 'Content-Type': 'application/json' } };
      const { data } = await axios.post('/api/auth/login', { email, password }, config);

      if (isAdminMode && data.role !== 'admin') {
        setError('You are not authorized as admin!');
        setLoading(false);
        return;
      }

      localStorage.setItem('userInfo', JSON.stringify(data));
      setLoading(false);

      if (data.role === 'admin') {
        navigate('/admin');
      } else {
        navigate(redirect);
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      setLoading(false);
    }
  };

  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      minHeight: 'calc(100vh - 74px)', backgroundColor: '#f8fafc',
      fontFamily: '"Inter", "Segoe UI", sans-serif', padding: '20px', boxSizing: 'border-box'
    }}>
      <div style={{
        width: '100%', maxWidth: '400px', backgroundColor: '#fff',
        padding: '40px 32px', borderRadius: '16px',
        boxShadow: '0 4px 25px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0'
      }}>

        {/* Toggle Buttons */}
        <div style={{
          display: 'flex', backgroundColor: '#f1f5f9', borderRadius: '10px',
          padding: '4px', marginBottom: '28px', gap: '4px'
        }}>
          <button
            type="button"
            onClick={() => { setIsAdminMode(false); setError(''); setEmail(''); setPassword(''); }}
            style={{
              flex: 1, padding: '8px', borderRadius: '8px', border: 'none',
              cursor: 'pointer', fontWeight: '600', fontSize: '13px',
              backgroundColor: !isAdminMode ? '#ffffff' : 'transparent',
              color: !isAdminMode ? '#0f172a' : '#64748b',
              boxShadow: !isAdminMode ? '0 1px 4px rgba(0,0,0,0.1)' : 'none',
              transition: 'all 0.2s'
            }}
          >
            👤 User Login
          </button>
          <button
            type="button"
            onClick={() => { setIsAdminMode(true); setError(''); setEmail(''); setPassword(''); }}
            style={{
              flex: 1, padding: '8px', borderRadius: '8px', border: 'none',
              cursor: 'pointer', fontWeight: '600', fontSize: '13px',
              backgroundColor: isAdminMode ? '#1e293b' : 'transparent',
              color: isAdminMode ? '#ffffff' : '#64748b',
              boxShadow: isAdminMode ? '0 1px 4px rgba(0,0,0,0.2)' : 'none',
              transition: 'all 0.2s'
            }}
          >
            🔐 Admin Login
          </button>
        </div>

        <h2 style={{ textAlign: 'center', color: '#0f172a', marginBottom: '6px', fontWeight: '700', fontSize: '22px' }}>
          {isAdminMode ? '🔐 Admin Portal' : 'Welcome Back'}
        </h2>
        <p style={{ textAlign: 'center', color: '#64748b', fontSize: '13px', margin: '0 0 24px 0' }}>
          {isAdminMode ? 'Restricted access — admins only' : 'Sign in to your account'}
        </p>

        {/* ✅ Updated hint box */}
        {isAdminMode && (
          <div style={{
            backgroundColor: '#fef3c7', border: '1px solid #fcd34d',
            borderRadius: '8px', padding: '10px 14px', marginBottom: '20px',
            fontSize: '12px', color: '#92400e'
          }}>
            <strong>Admin Credentials:</strong><br />
            📧 Admin<br />
          
          </div>
        )}

        {infoMessage && (
          <div style={{
            color: '#0284c7', backgroundColor: '#f0f9ff', border: '1px solid #bae6fd',
            padding: '10px 14px', borderRadius: '8px', fontSize: '13px',
            marginBottom: '16px', fontWeight: '500'
          }}>
            ℹ️ {infoMessage}
          </div>
        )}

        {error && (
          <div style={{
            color: '#ef4444', backgroundColor: '#fef2f2', border: '1px solid #fca5a5',
            padding: '10px 14px', borderRadius: '8px', fontSize: '13px', marginBottom: '16px'
          }}>
            ❌ {error}
          </div>
        )}

        <form onSubmit={submitHandler} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
              Email Address
            </label>
            <input
              type="email"
              placeholder={isAdminMode ? 'admin@.com' : 'Enter your email'}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%', padding: '10px 14px', borderRadius: '8px',
                border: `1px solid ${isAdminMode ? '#fcd34d' : '#cbd5e1'}`,
                fontSize: '14px', boxSizing: 'border-box', outline: 'none'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
              Password
            </label>
            <div style={{ position: 'relative', width: '100%' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                // ✅ Updated placeholder
                placeholder={isAdminMode ? 'password' : 'Enter your password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: '100%', padding: '10px 44px 10px 14px', borderRadius: '8px',
                  border: `1px solid ${isAdminMode ? '#fcd34d' : '#cbd5e1'}`,
                  fontSize: '14px', boxSizing: 'border-box', outline: 'none'
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', cursor: 'pointer', color: '#64748b', padding: 0
                }}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" style={{ width: '20px', height: '20px' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" style={{ width: '20px', height: '20px' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.822 7.822 3 3m-3-3-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                )}
              </button>
            </div>
            {!isAdminMode && (
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
                <Link to="/forgot-password" style={{ color: '#2563eb', textDecoration: 'none', fontWeight: '600', fontSize: '13px' }}>
                  Forgot Password?
                </Link>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%', padding: '12px',
              backgroundColor: isAdminMode ? '#1e293b' : '#3b82f6',
              color: '#fff', border: 'none', borderRadius: '8px',
              fontWeight: '600', fontSize: '14px', cursor: 'pointer', marginTop: '6px',
              boxShadow: isAdminMode ? '0 4px 14px rgba(30,41,59,0.3)' : '0 4px 14px rgba(59,130,246,0.3)'
            }}
          >
            {loading ? 'Logging in...' : isAdminMode ? '🔐 Enter Admin Panel' : 'Sign In'}
          </button>
        </form>

        {!isAdminMode && (
          <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '14px', color: '#64748b' }}>
            New Customer?{' '}
            <Link to={redirect !== '/' ? `/register?redirect=${redirect}` : '/register'}
              style={{ color: '#3b82f6', textDecoration: 'none', fontWeight: '600' }}>
              Register Here
            </Link>
          </div>
        )}

      </div>
    </div>
  );
};

export default LoginScreen;