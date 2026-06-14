import React from 'react';

const AboutScreen = () => {
  const cardStyle = {
    padding: '30px', borderRadius: '16px', border: '1px solid #e2e8f0',
    textAlign: 'center', transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    backgroundColor: '#ffffff', cursor: 'pointer', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)'
  };

  return (
    <div style={{ padding: '80px 20px', maxWidth: '900px', margin: '0 auto', fontFamily: '"Inter", sans-serif', color: '#334155' }}>
      
      
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h1 style={{ 
          fontSize: '36px', 
          color: '#1e293b', 
          fontWeight: '700',
          letterSpacing: '-0.5px', 
          marginBottom: '10px',
          textTransform: 'uppercase' 
        }}>
          About <span style={{ color: '#2563eb' }}>Mustafa Store</span>
        </h1>
        <div style={{ width: '40px', height: '3px', background: '#2563eb', margin: '0 auto', borderRadius: '2px' }}></div>
      </div>

      {/* Mission Section with Rectangle Image */}
      <div style={{ 
        display: 'flex', alignItems: 'center', gap: '40px', 
        background: '#ffffff', padding: '40px', borderRadius: '24px', 
        boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05)' 
      }}>
        <div style={{ flex: 1.2 }}>
          <h2 style={{ color: '#1e293b', fontSize: '22px', marginBottom: '15px', fontWeight: '700' }}>Our Vision & Mission</h2>
          <p style={{ lineHeight: '1.7', color: '#64748b', fontSize: '15px' }}>
            We aim to redefine e-commerce by providing a platform that values quality, customer trust, and innovation. At Mustafa Store, we ensure every product meets excellence.
          </p>
        </div>
        
        {/* Rectangle Shape Image */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <img 
            src="/logo.jfif" 
            alt="Mustafa Store Logo" 
            style={{ 
              width: '320px', 
              height: '180px', 
              objectFit: 'contain', 
              borderRadius: '12px',
              backgroundColor: '#f8fafc',
              padding: '15px',
              border: '1px solid #e2e8f0'
            }} 
          />
        </div>
      </div>

      {/* Why Choose Us */}
      <div style={{ marginTop: '70px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '40px', fontSize: '28px', color: '#1e293b' }}>Why Choose Us?</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '25px' }}>
          {[
            { title: 'Premium Quality', desc: 'Handpicked products guaranteed.' },
            { title: 'Secure Shopping', desc: 'Safe checkout process.' },
            { title: 'Fast Delivery', desc: 'Reliable shipping.' }
          ].map((item, index) => (
            <div key={index} style={cardStyle} 
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(37, 99, 235, 0.15)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0,0,0,0.05)';
              }}>
              <h3 style={{ color: '#2563eb', marginBottom: '8px', fontSize: '18px', fontWeight: '700' }}>{item.title}</h3>
              <p style={{ color: '#64748b', fontSize: '13px' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutScreen;