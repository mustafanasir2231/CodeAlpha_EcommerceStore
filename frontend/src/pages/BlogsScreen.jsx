import React from 'react';

const blogs = [
  { 
    id: 1, 
    title: 'Top 10 Fashion Trends 2026', 
    category: 'Fashion', 
    time: '5 min', 
    excerpt: 'Discover the latest styles shaping the fashion industry this year.',
    
    image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  { 
    id: 2, 
    title: 'How to Choose Quality Products', 
    category: 'Shopping', 
    time: '4 min', 
    excerpt: 'A guide to ensuring you get the best value for your money.',
    
    image: 'https://images.pexels.com/photos/5632396/pexels-photo-5632396.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  { 
    id: 3, 
    title: 'Sustainable Shopping Habits', 
    category: 'Lifestyle', 
    time: '6 min', 
    excerpt: 'Small changes that make a big impact on the environment.',
    image: 'https://images.pexels.com/photos/5926391/pexels-photo-5926391.jpeg?auto=compress&cs=tinysrgb&w=800'
  }
];

const BlogsScreen = () => {
  return (
    <div style={{ padding: '80px 20px', maxWidth: '1000px', margin: '0 auto', fontFamily: '"Inter", sans-serif' }}>
      
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h1 style={{ fontSize: '42px', color: '#1e293b', fontWeight: '800' }}>
          Our Latest <span style={{ color: '#2563eb' }}>Blogs</span>
        </h1>
        <div style={{ width: '60px', height: '4px', background: '#2563eb', margin: '15px auto', borderRadius: '2px' }}></div>
      </div>

      {/* Blog Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
        {blogs.map((blog) => (
          <div key={blog.id} style={{ 
            borderRadius: '20px', overflow: 'hidden', background: '#ffffff',
            boxShadow: '0 4px 15px rgba(0,0,0,0.05)', transition: '0.3s', cursor: 'pointer'
          }}
          onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-10px)'; e.currentTarget.style.boxShadow = '0 20px 25px rgba(0,0,0,0.1)'; }}
          onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.05)'; }}
          >
            {/* Real Images from Unsplash */}
            <img src={blog.image} alt={blog.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
            
            <div style={{ padding: '25px' }}>
              <span style={{ color: '#2563eb', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase' }}>{blog.category}</span>
              <h3 style={{ fontSize: '20px', color: '#1e293b', margin: '10px 0' }}>{blog.title}</h3>
              <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '15px' }}>{blog.excerpt}</p>
              <p style={{ color: '#94a3b8', fontSize: '12px' }}>{blog.time} read</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogsScreen;