import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom'; // useLocation add kiya

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Current path track karne ke liye
  const [dropdownOpen, setDropdownOpen] = useState(false);

  let userInfo = null;
  try {
    userInfo = JSON.parse(localStorage.getItem('userInfo'));
  } catch (error) {
    userInfo = null;
  }

  const logoutHandler = () => {
    localStorage.removeItem('userInfo'); 
    setDropdownOpen(false);
    navigate('/login');
    window.location.reload(); 
  };

  // Active link check karne ka function
  const isActive = (path) => location.pathname === path;

  // Reusable style
  const getNavLinkStyle = (path) => ({
    color: isActive(path) ? '#3b82f6' : '#94a3b8', // Active hone par blue, warna gray
    textDecoration: 'none', 
    fontSize: '13px', 
    fontWeight: isActive(path) ? '700' : '500', // Active hone par bold
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
      <Link to="/" style={{ color: '#ffffff', textDecoration: 'none', fontSize: '20px', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '6px' }}>
        Mustafa <span style={{ color: '#3b82f6', fontWeight: '400' }}>Store</span> 🛒
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
        
        {/* Links with Hover & Active Highlight */}
        <Link to="/" style={getNavLinkStyle('/')} onMouseOver={(e) => e.target.style.color = '#ffffff'} onMouseOut={(e) => !isActive('/') && (e.target.style.color = '#94a3b8')}>Home</Link>
        <Link to="/about" style={getNavLinkStyle('/about')} onMouseOver={(e) => e.target.style.color = '#ffffff'} onMouseOut={(e) => !isActive('/about') && (e.target.style.color = '#94a3b8')}>About</Link>
        <Link to="/blogs" style={getNavLinkStyle('/blogs')} onMouseOver={(e) => e.target.style.color = '#ffffff'} onMouseOut={(e) => !isActive('/blogs') && (e.target.style.color = '#94a3b8')}>Blogs</Link>
        <Link to="/contact" style={getNavLinkStyle('/contact')} onMouseOver={(e) => e.target.style.color = '#ffffff'} onMouseOut={(e) => !isActive('/contact') && (e.target.style.color = '#94a3b8')}>Contact</Link>
        <Link to="/cart" style={getNavLinkStyle('/cart')} onMouseOver={(e) => e.target.style.color = '#ffffff'} onMouseOut={(e) => !isActive('/cart') && (e.target.style.color = '#94a3b8')}>Cart 🛒</Link>
        
        {userInfo && userInfo.role === 'admin' && (
          <Link to="/admin" style={{ color: '#ffffff', backgroundColor: '#3b82f6', padding: '5px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: '600', textDecoration: 'none' }}>Admin 🔐</Link>
        )}

        {userInfo ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', position: 'relative' }}>
            <span style={{ color: '#ffffff', fontSize: '13px', fontWeight: '500' }}>Hi, {userInfo.name ? userInfo.name.split(' ')[0] : 'User'}</span>
            <button onClick={() => setDropdownOpen(!dropdownOpen)} style={{ width: '35px', height: '35px', borderRadius: '50%', backgroundColor: '#3b82f6', color: '#fff', border: '2px solid rgba(255,255,255,0.1)', cursor: 'pointer', transition: 'transform 0.2s' }} onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'} onMouseOut={(e) => e.target.style.transform = 'scale(1)'}>
              {userInfo.name ? userInfo.name.charAt(0).toUpperCase() : 'M'}
            </button>
            {dropdownOpen && (
              <div style={{ position: 'absolute', right: 0, top: '45px', backgroundColor: '#2d2d35', borderRadius: '8px', width: '160px', zIndex: 1000, padding: '5px 0' }}>
                <Link to="/profile" onClick={() => setDropdownOpen(false)} style={{ display: 'block', padding: '10px 15px', color: '#e2e8f0', textDecoration: 'none', fontSize: '13px' }}>Profile</Link>
                <Link to="/myorders" onClick={() => setDropdownOpen(false)} style={{ display: 'block', padding: '10px 15px', color: '#e2e8f0', textDecoration: 'none', fontSize: '13px' }}>My Orders</Link>
                <button onClick={logoutHandler} style={{ width: '100%', padding: '10px 15px', background: 'transparent', border: 'none', color: '#f87171', textAlign: 'left', cursor: 'pointer', fontSize: '13px', fontWeight: '600' }}>Logout</button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" style={{ color: '#ffffff', backgroundColor: '#3b82f6', padding: '6px 14px', borderRadius: '6px', fontSize: '12px', fontWeight: '600', textDecoration: 'none', transition: 'background 0.3s' }} onMouseOver={(e) => e.target.style.backgroundColor = '#2563eb'} onMouseOut={(e) => e.target.style.backgroundColor = '#3b82f6'}>Sign In</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;