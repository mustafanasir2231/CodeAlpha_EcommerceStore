import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminScreen = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Products list
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);

  // Edit mode
  const [editMode, setEditMode] = useState(false);
  const [editProductId, setEditProductId] = useState(null);

  // Active tab
  const [activeTab, setActiveTab] = useState('add');

  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const token = userInfo?.token;

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  const inputStyle = {
    width: '100%',
    padding: '8px 12px',
    borderRadius: '6px',
    border: '1px solid #cbd5e1',
    backgroundColor: '#ffffff',
    fontSize: '13px',
    color: '#1e293b',
    fontFamily: '"Inter", sans-serif',
    transition: 'all 0.2s ease',
    boxSizing: 'border-box',
    outline: 'none',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '4px',
    fontWeight: '600',
    fontSize: '12px',
    color: '#475569',
  };

  // Fetch products
  const fetchProducts = async () => {
    setLoadingProducts(true);
    try {
      const { data } = await axios.get('/api/products');
      setProducts(data);
    } catch (err) {
      console.error(err);
    }
    setLoadingProducts(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Reset form
  const resetForm = () => {
    setName('');
    setPrice('');
    setDescription('');
    setImage('');
    setCategory('');
    setCountInStock('');
    setEditMode(false);
    setEditProductId(null);
    setMessage('');
    setError('');
  };

  // Edit button click
  const handleEdit = (product) => {
    setName(product.name);
    setPrice(product.price);
    setDescription(product.description);
    setImage(product.image);
    setCategory(product.category);
    setCountInStock(product.countInStock);
    setEditMode(true);
    setEditProductId(product._id);
    setActiveTab('add');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Delete button click
  const handleDelete = async (productId, productName) => {
    if (!window.confirm(`Are you sure you want to delete "${productName}"?`)) return;
    try {
      await axios.delete(`/api/products/${productId}`, config);
      setMessage(`"${productName}" successfully deleted!`);
      fetchProducts();
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  // Submit — Add or Update
  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    const productData = {
      name,
      price: Number(price),
      description,
      image,
      category,
      countInStock: Number(countInStock),
    };

    try {
      if (editMode) {
        await axios.put(`/api/products/${editProductId}`, productData, config);
        setMessage(`"${name}" successfully updated! ✅`);
      } else {
        await axios.post('/api/products', productData, config);
        setMessage(`"${name}" successfully added! 🚀`);
      }
      resetForm();
      fetchProducts();
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
    setLoading(false);
  };

  return (
    <div
      style={{
        padding: '24px 16px',
        backgroundColor: '#f1f5f9',
        backgroundImage: `
          radial-gradient(at 0% 0%, rgba(59, 130, 246, 0.08) 0px, transparent 50%),
          radial-gradient(at 100% 100%, rgba(16, 185, 129, 0.05) 0px, transparent 50%)
        `,
        minHeight: 'calc(100vh - 74px)',
        fontFamily: '"Inter", "Segoe UI", sans-serif',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <h1 style={{ fontSize: '22px', fontWeight: '800', color: '#0f172a', margin: '0 0 4px' }}>
            🔐 Admin Dashboard
          </h1>
          <p style={{ color: '#64748b', fontSize: '13px' }}>
            Manage products — add, update, delete
          </p>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', justifyContent: 'center' }}>
          <button
            onClick={() => {
              setActiveTab('add');
              resetForm();
            }}
            style={{
              padding: '6px 16px',
              borderRadius: '30px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '13px',
              backgroundColor: activeTab === 'add' ? '#3b82f6' : '#ffffff',
              color: activeTab === 'add' ? '#ffffff' : '#475569',
              boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
            }}
          >
            ➕ {editMode ? 'Edit Product' : 'Add Product'}
          </button>
          <button
            onClick={() => setActiveTab('list')}
            style={{
              padding: '6px 16px',
              borderRadius: '30px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '13px',
              backgroundColor: activeTab === 'list' ? '#3b82f6' : '#ffffff',
              color: activeTab === 'list' ? '#ffffff' : '#475569',
              boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
            }}
          >
            📦 All Products ({products.length})
          </button>
        </div>

        {/* Messages */}
        {message && (
          <div
            style={{
              color: '#065f46',
              padding: '8px 12px',
              backgroundColor: '#d1fae5',
              borderRadius: '8px',
              marginBottom: '16px',
              fontSize: '12px',
              fontWeight: '500',
            }}
          >
            ✅ {message}
          </div>
        )}
        {error && (
          <div
            style={{
              color: '#991b1b',
              padding: '8px 12px',
              backgroundColor: '#fee2e2',
              borderRadius: '8px',
              marginBottom: '16px',
              fontSize: '12px',
              fontWeight: '500',
            }}
          >
            ❌ {error}
          </div>
        )}

        {/* ADD / EDIT FORM */}
        {activeTab === 'add' && (
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              padding: '20px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              border: '1px solid #eef2ff',
            }}
          >
            <h2
              style={{
                textAlign: 'center',
                marginBottom: '2px',
                color: '#0f172a',
                fontSize: '18px',
                fontWeight: '800',
              }}
            >
              {editMode ? '✏️ Update Product' : '➕ Add New Product'}
            </h2>
            <p
              style={{
                textAlign: 'center',
                color: '#64748b',
                fontSize: '12px',
                marginBottom: '20px',
              }}
            >
              {editMode ? 'Make changes and update' : 'Fill in the details and publish'}
            </p>

            <form onSubmit={submitHandler}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                  gap: '16px',
                  marginBottom: '20px',
                }}
              >
                {/* Left column */}
                <div>
                  <div style={{ marginBottom: '12px' }}>
                    <label style={labelStyle}>Product Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      style={inputStyle}
                      placeholder="e.g. Pro Wireless Gaming Mouse"
                    />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '12px' }}>
                    <div>
                      <label style={labelStyle}>Price ($)</label>
                      <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required style={inputStyle} placeholder="85" />
                    </div>
                    <div>
                      <label style={labelStyle}>Stock Count</label>
                      <input type="number" value={countInStock} onChange={(e) => setCountInStock(e.target.value)} required style={inputStyle} placeholder="15" />
                    </div>
                  </div>
                  <div>
                    <label style={labelStyle}>Category</label>
                    <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required style={inputStyle} placeholder="e.g. Electronics" />
                  </div>
                </div>

                {/* Right column */}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <div style={{ marginBottom: '12px' }}>
                    <label style={labelStyle}>Image URL</label>
                    <input type="text" value={image} onChange={(e) => setImage(e.target.value)} required style={inputStyle} placeholder="https://images.unsplash.com/..." />
                  </div>
                  {image && (
                    <div style={{ marginBottom: '12px' }}>
                      <label style={labelStyle}>Image Preview</label>
                      <img
                        src={image}
                        alt="preview"
                        style={{
                          width: '100%',
                          height: '80px',
                          objectFit: 'cover',
                          borderRadius: '6px',
                          border: '1px solid #e2e8f0',
                        }}
                        onError={(e) => (e.target.style.display = 'none')}
                      />
                    </div>
                  )}
                  <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <label style={labelStyle}>Description</label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                      style={{
                        ...inputStyle,
                        flexGrow: 1,
                        resize: 'vertical',
                        minHeight: '70px',
                      }}
                      placeholder="Write product details..."
                    />
                  </div>
                </div>
              </div>

              {/* Buttons centered */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
                {editMode && (
                  <button
                    type="button"
                    onClick={resetForm}
                    style={{
                      padding: '6px 16px',
                      backgroundColor: '#f1f5f9',
                      color: '#64748b',
                      border: '1px solid #e2e8f0',
                      borderRadius: '30px',
                      fontSize: '12px',
                      fontWeight: '600',
                      cursor: 'pointer',
                    }}
                  >
                    Cancel
                  </button>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    padding: '6px 20px',
                    backgroundColor: editMode ? '#3b82f6' : '#10b981',
                    color: 'white',
                    border: 'none',
                    borderRadius: '30px',
                    fontSize: '12px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                  }}
                >
                  {loading ? 'Processing...' : editMode ? '✏️ Update' : '🚀 Publish'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* PRODUCTS LIST */}
        {activeTab === 'list' && (
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '14px',
              overflow: 'hidden',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            }}
          >
            {loadingProducts ? (
              <div style={{ padding: '24px', textAlign: 'center', color: '#64748b', fontSize: '13px' }}>
                ⏳ Loading products...
              </div>
            ) : products.length === 0 ? (
              <div style={{ padding: '24px', textAlign: 'center', color: '#64748b', fontSize: '13px' }}>
                No products found.
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                      {['Image', 'Name', 'Category', 'Price', 'Stock', 'Actions'].map((h) => (
                        <th
                          key={h}
                          style={{
                            padding: '8px 12px',
                            textAlign: 'left',
                            fontSize: '11px',
                            fontWeight: '700',
                            color: '#64748b',
                            textTransform: 'uppercase',
                          }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product, index) => (
                      <tr
                        key={product._id}
                        style={{
                          borderBottom: '1px solid #f1f5f9',
                          backgroundColor: index % 2 === 0 ? '#ffffff' : '#fafafa',
                        }}
                      >
                        <td style={{ padding: '6px 12px' }}>
                          <img
                            src={product.image}
                            alt={product.name}
                            style={{ width: '36px', height: '36px', objectFit: 'cover', borderRadius: '6px' }}
                            onError={(e) => (e.target.src = 'https://via.placeholder.com/36')}
                          />
                        </td>
                        <td style={{ padding: '6px 12px', fontWeight: '600', fontSize: '13px', color: '#0f172a' }}>
                          {product.name}
                        </td>
                        <td style={{ padding: '6px 12px' }}>
                          <span style={{ backgroundColor: '#eff6ff', color: '#2563eb', padding: '2px 8px', borderRadius: '20px', fontSize: '11px', fontWeight: '600' }}>
                            {product.category}
                          </span>
                        </td>
                        <td style={{ padding: '6px 12px', fontWeight: '700', fontSize: '13px' }}>${product.price}</td>
                        <td style={{ padding: '6px 12px' }}>
                          <span
                            style={{
                              color: product.countInStock > 0 ? '#16a34a' : '#dc2626',
                              backgroundColor: product.countInStock > 0 ? '#f0fdf4' : '#fef2f2',
                              padding: '2px 8px',
                              borderRadius: '20px',
                              fontSize: '11px',
                              fontWeight: '600',
                            }}
                          >
                            {product.countInStock > 0 ? `${product.countInStock} in stock` : 'Out of stock'}
                          </span>
                        </td>
                        <td style={{ padding: '6px 12px' }}>
                          <div style={{ display: 'flex', gap: '6px' }}>
                            <button
                              onClick={() => handleEdit(product)}
                              style={{ padding: '4px 10px', backgroundColor: '#eff6ff', color: '#2563eb', border: '1px solid #bfdbfe', borderRadius: '20px', fontSize: '11px', fontWeight: '600', cursor: 'pointer' }}
                            >
                              ✏️ Edit
                            </button>
                            <button
                              onClick={() => handleDelete(product._id, product.name)}
                              style={{ padding: '4px 10px', backgroundColor: '#fef2f2', color: '#dc2626', border: '1px solid #fca5a5', borderRadius: '20px', fontSize: '11px', fontWeight: '600', cursor: 'pointer' }}
                            >
                              🗑️ Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminScreen;