import React from 'react';

const ContactScreen = () => {
  return (
    <div style={{ padding: '40px 20px', maxWidth: '1000px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '40px' }}>Contact Us</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
        {/* Form */}
        <div style={{ background: '#f9fafb', padding: '25px', borderRadius: '12px' }}>
          <form style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <input type="text" placeholder="Full Name" style={inputStyle} />
            <input type="email" placeholder="Email Address" style={inputStyle} />
            <textarea placeholder="Your Message" rows="4" style={{ ...inputStyle }}></textarea>
            <button style={buttonStyle}>Send Message</button>
          </form>
        </div>

        {/* Map - Size reduced */}
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.1742444365774!2d55.27508937538356!3d25.187640277708514!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6834d8526435!2sBusiness%20Bay%2C%20Dubai!5e0!3m2!1sen!2s" 
          width="100%" height="300" style={{ border: 0, borderRadius: '12px' }} loading="lazy">
        </iframe>
      </div>
    </div>
  );
};

const inputStyle = { padding: '10px', border: '1px solid #ccc', borderRadius: '6px' };
const buttonStyle = { background: '#111827', color: '#fff', padding: '10px', border: 'none', borderRadius: '6px', cursor: 'pointer' };

export default ContactScreen;