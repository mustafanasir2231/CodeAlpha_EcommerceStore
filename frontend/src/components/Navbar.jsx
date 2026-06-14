import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Safely get userInfo
  let userInfo = null;
  try {
    const data = localStorage.getItem('userInfo');
    userInfo = data ? JSON.parse(data) : null;
  } catch (error) {
    userInfo = null;
  }

  const logoutHandler = () => {
    localStorage.removeItem('userInfo');
    setDropdownOpen(false);
    navigate('/login');
    window.location.reload();
  };

  const isActive = (path) => location.pathname === path;

  const getNavLinkStyle = (path) => ({
    color: isActive(path) ? '#3b82f6' : '#94a3b8',
    textDecoration: 'none',
    fontSize: '13px',
    fontWeight: isActive(path) ? '700' : '500',
    transition: 'all 0.3s ease',
    paddingBottom: isActive(path) ? '2px' : '0',
    borderBottom: isActive(path) ? '2px solid #3b82f6' : 'none'
  });

  return (
    <nav style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '12px 40px', backgroundColor: '#1e1e24', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
      position: 'sticky', top: 0, zIndex: 1000, fontFamily: '"Inter", "Segoe UI", sans-serif',
      borderBottom: '1px solid rgba(255, 255, 255, 0.05)', boxSizing: 'border-box'
    }}>
      {/* Brand Name */}
      <Link to="/" style={{ color: '#ffffff', textDecoration: 'none', fontSize: '22px', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '6px' }}>
        Mustafa <span style={{ color: '#3b82f6', fontWeight: '400' }}>Store</span> 🛒
      </Link>

      {/* Navigation Links */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
        <Link to="/" style={getNavLinkStyle('/')}>Home</Link>
        <Link to="/about" style={getNavLinkStyle('/about')}>About</Link>
        <Link to="/blogs" style={getNavLinkStyle('/blogs')}>Blogs</Link>
        <Link to="/contact" style={getNavLinkStyle('/contact')}>Contact</Link>
        <Link to="/cart" style={getNavLinkStyle('/cart')}>Cart 🛒</Link>

        {/* Admin Link (Only for Admin - Highlighted for visibility) */}
        {userInfo && userInfo.role === 'admin' && (
          <Link to="/admin" style={{ 
            color: '#ffffff', 
            backgroundColor: '#ef4444', 
            padding: '6px 14px', 
            borderRadius: '6px', 
            fontSize: '12px', 
            fontWeight: '700', 
            textDecoration: 'none',
            border: '1px solid #dc2626'
          }}>
            Admin Panel 🔐
          </Link>
        )}

        {/* User Auth Section */}
        {userInfo ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', position: 'relative' }}>
            <span style={{ color: '#ffffff', fontSize: '13px', fontWeight: '500' }}>Hi, {userInfo.name?.split(' ')[0]}</span>
            
            <button onClick={() => setDropdownOpen(!dropdownOpen)} style={{ width: '35px', height: '35px', borderRadius: '50%', backgroundColor: '#3b82f6', color: '#fff', border: 'none', cursor: 'pointer' }}>
              {userInfo.name?.charAt(0).toUpperCase()}
            </button>

            {dropdownOpen && (
              <div style={{ position: 'absolute', right: 0, top: '45px', backgroundColor: '#2d2d35', borderRadius: '8px', width: '160px', padding: '5px 0', border: '1px solid #444' }}>
                <Link to="/profile" onClick={() => setDropdownOpen(false)} style={{ display: 'block', padding: '10px 15px', color: '#e2e8f0', textDecoration: 'none', fontSize: '13px' }}>Profile</Link>
                <Link to="/myorders" onClick={() => setDropdownOpen(false)} style={{ display: 'block', padding: '10px 15px', color: '#e2e8f0', textDecoration: 'none', fontSize: '13px' }}>My Orders</Link>
                <button onClick={logoutHandler} style={{ width: '100%', padding: '10px 15px', background: 'transparent', border: 'none', color: '#f87171', textAlign: 'left', cursor: 'pointer', fontSize: '13px', fontWeight: '600' }}>Logout</button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" style={{ color: '#ffffff', backgroundColor: '#3b82f6', padding: '6px 14px', borderRadius: '6px', fontSize: '12px', fontWeight: '600', textDecoration: 'none' }}>Sign In</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;