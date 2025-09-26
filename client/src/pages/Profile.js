import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { updateUserProfile } from '../features/authSlice';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaSave } from 'react-icons/fa';
import './Profile.css';

const Profile = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector(state => state.auth);
  
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || '');
  const [address, setAddress] = useState({
    street: user?.address?.street || '',
    city: user?.address?.city || '',
    state: user?.address?.state || '',
    zipCode: user?.address?.zipCode || '',
    country: user?.address?.country || ''
  });

  const handleAddressChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(updateUserProfile({
      name,
      email,
      phoneNumber,
      address
    }));
    
    if (result.payload) {
      alert('Profile updated successfully!');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="profile-page"
    >
      <div className="container">
        <h1 className="page-title">My Profile</h1>
        
        <div className="profile-content">
          <div className="profile-sidebar">
            <div className="profile-avatar">
              <div className="avatar-placeholder">
                <FaUser className="avatar-icon" />
              </div>
              <h3>{user?.name}</h3>
              <p>{user?.email}</p>
            </div>
            
            <div className="profile-nav">
              <ul>
                <li className="active">
                  <a href="#profile">Profile Information</a>
                </li>
                <li>
                  <a href="#orders">My Orders</a>
                </li>
                <li>
                  <a href="#wishlist">Wishlist</a>
                </li>
                <li>
                  <a href="#addresses">Saved Addresses</a>
                </li>
                <li>
                  <a href="#payment">Payment Methods</a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="profile-main">
            <div className="profile-section">
              <h2>Profile Information</h2>
              <p>Update your personal information here</p>
              
              <form onSubmit={handleSubmit} className="profile-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <div className="input-with-icon">
                      <FaUser className="input-icon" />
                      <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <div className="input-with-icon">
                      <FaEnvelope className="input-icon" />
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <div className="input-with-icon">
                    <FaPhone className="input-icon" />
                    <input
                      type="tel"
                      id="phone"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Address</label>
                  <div className="input-with-icon">
                    <FaMapMarkerAlt className="input-icon" />
                    <input
                      type="text"
                      name="street"
                      value={address.street}
                      onChange={handleAddressChange}
                      placeholder="Street address"
                    />
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <input
                      type="text"
                      name="city"
                      value={address.city}
                      onChange={handleAddressChange}
                      placeholder="City"
                    />
                  </div>
                  
                  <div className="form-group">
                    <input
                      type="text"
                      name="state"
                      value={address.state}
                      onChange={handleAddressChange}
                      placeholder="State"
                    />
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <input
                      type="text"
                      name="zipCode"
                      value={address.zipCode}
                      onChange={handleAddressChange}
                      placeholder="ZIP Code"
                    />
                  </div>
                  
                  <div className="form-group">
                    <input
                      type="text"
                      name="country"
                      value={address.country}
                      onChange={handleAddressChange}
                      placeholder="Country"
                    />
                  </div>
                </div>
                
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={loading}
                >
                  <FaSave className="btn-icon" />
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
              </form>
            </div>
            
            <div className="profile-section">
              <h2>Account Settings</h2>
              <div className="settings-grid">
                <div className="setting-item">
                  <h3>Change Password</h3>
                  <p>Update your password regularly for security</p>
                  <button className="btn btn-secondary">Change Password</button>
                </div>
                
                <div className="setting-item">
                  <h3>Notification Preferences</h3>
                  <p>Manage how you receive notifications</p>
                  <button className="btn btn-secondary">Manage Notifications</button>
                </div>
                
                <div className="setting-item">
                  <h3>Privacy Settings</h3>
                  <p>Control your privacy and data sharing</p>
                  <button className="btn btn-secondary">Privacy Settings</button>
                </div>
                
                <div className="setting-item">
                  <h3>Deactivate Account</h3>
                  <p>Temporarily deactivate your account</p>
                  <button className="btn btn-danger">Deactivate Account</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Profile;