import React, { useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  
  const [name, setName] = useState(userInfo?.name || '');
  const [email, setEmail] = useState(userInfo?.email || '');
  const [currentPassword, setCurrentPassword] = useState(''); 
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Icon ki jagah Text Toggle use kar rahe hain taaki error na aaye
  const [showPassword, setShowPassword] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (newPassword && newPassword !== confirmPassword) {
      alert('New Passwords do not match!');
      return;
    }

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo?.token}`,
        },
      };

      const { data } = await axios.put('/api/users/profile', { 
        name, email, currentPassword, newPassword 
      }, config);

      localStorage.setItem('userInfo', JSON.stringify(data));
      alert('Profile updated successfully!');
      window.location.reload(); 
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Something went wrong";
      alert("Error: " + errorMessage);
    }
  };

  return (
    <div style={{ padding: '40px 20px', backgroundColor: '#f8fafc', minHeight: '100vh', display: 'flex', justifyContent: 'center' }}>
      <form onSubmit={submitHandler} style={{ width: '100%', maxWidth: '400px', backgroundColor: '#ffffff', padding: '30px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
        <h2 style={{ marginBottom: '25px', fontSize: '20px' }}>My Profile</h2>
        
        <label style={labelStyle}>Full Name</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} style={inputStyle} required />

        <label style={labelStyle}>Email Address</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} required />

        <div style={{ marginTop: '20px', borderTop: '1px solid #e2e8f0', paddingTop: '20px' }}>
          <h3 style={{ fontSize: '14px', marginBottom: '15px' }}>Change Password</h3>
          
          {/* Toggle button text based */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <label style={{ fontSize: '12px', color: '#64748b' }}>Password Fields</label>
            <span onClick={() => setShowPassword(!showPassword)} style={{ cursor: 'pointer', fontSize: '12px', color: '#3b82f6', fontWeight: 'bold' }}>
              {showPassword ? "Hide Passwords" : "Show Passwords"}
            </span>
          </div>

          <input type={showPassword ? "text" : "password"} placeholder="Current Password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} style={{...inputStyle, marginBottom: '10px'}} />
          <input type={showPassword ? "text" : "password"} placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} style={{...inputStyle, marginBottom: '10px'}} />
          <input type={showPassword ? "text" : "password"} placeholder="Confirm New Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} style={inputStyle} />
        </div>

        <button type="submit" style={{ width: '100%', padding: '12px', backgroundColor: '#3b82f6', color: '#fff', border: 'none', borderRadius: '6px', marginTop: '20px', cursor: 'pointer', fontWeight: '600' }}>
          Update Profile
        </button>
      </form>
    </div>
  );
};

const labelStyle = { fontSize: '12px', fontWeight: '600', color: '#64748b', display: 'block', marginTop: '10px' };
const inputStyle = { width: '100%', padding: '12px', marginTop: '5px', border: '1px solid #cbd5e1', borderRadius: '6px', boxSizing: 'border-box' };

export default Profile;