import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaMapMarkerAlt, FaEnvelope, FaPhoneAlt, FaClock } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer style={{ 
      background: '#0f172a', 
      color: '#e2e8f0', 
      padding: '40px 20px', 
      marginTop: 'auto',
      borderTop: '2px solid #1e293b' 
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        
        {/* Horizontal Info Bar */}
        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          justifyContent: 'space-between', 
          gap: '20px', 
          marginBottom: '30px' 
        }}>
          <div style={infoStyle}><FaMapMarkerAlt style={iconStyle} /> Business Bay, Dubai</div>
          <div style={infoStyle}><FaEnvelope style={iconStyle} /> mustafanasir2231@gmail.com</div>
          <div style={infoStyle}><FaPhoneAlt style={iconStyle} /> +971 50 123 4567</div>
          <div style={infoStyle}><FaClock style={iconStyle} /> Mon-Sat: 9am - 9pm</div>
        </div>

        {/* Bottom Bar */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          borderTop: '1px solid #1e293b', 
          paddingTop: '25px' 
        }}>
          <p style={{ fontSize: '13px', margin: 0 }}>© 2026 Mustafa Store. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '20px', fontSize: '20px' }}>
            <FaFacebook style={socialIcon} />
            <FaInstagram style={socialIcon} />
            <FaTwitter style={socialIcon} />
          </div>
        </div>
      </div>
    </footer>
  );
};

const infoStyle = { display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px' };
const iconStyle = { color: '#38bdf8' }; // Bright Blue Icon
const socialIcon = { cursor: 'pointer', transition: '0.3s', color: '#94a3b8' };

export default Footer;