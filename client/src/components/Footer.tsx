import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaFacebook, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedin, 
  FaApple, 
  FaGooglePlay, 
  FaPaperPlane,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaTimes
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import './Footer.css';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState<Array<{text: string, isUser: boolean}>>([]);
  const [newMessage, setNewMessage] = useState('');
  
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // In a real app, this would send to a backend
      console.log('Subscribing email:', email);
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      setMessages([...messages, {text: newMessage, isUser: true}]);
      // Simulate a response
      setTimeout(() => {
        setMessages(prev => [...prev, {text: 'Thanks for your message! Our team will get back to you soon.', isUser: false}]);
      }, 1000);
      setNewMessage('');
    }
  };
  
  const toggleChat = () => {
    setShowChat(!showChat);
  };
  
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <motion.div 
            className="footer-section"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3>Farmisian</h3>
            <p>Your trusted source for fresh, quality produce directly from local farmers.</p>
            <div className="contact-info">
              <p><FaMapMarkerAlt /> 123 Farm Street, Agricultural City</p>
              <p><FaPhone /> +91 98765 43210</p>
              <p><FaEnvelope /> support@farmisian.com</p>
            </div>
            <div className="social-links">
              <motion.a 
                href="#" 
                aria-label="Facebook"
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaFacebook />
              </motion.a>
              <motion.a 
                href="#" 
                aria-label="Twitter"
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaTwitter />
              </motion.a>
              <motion.a 
                href="#" 
                aria-label="Instagram"
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaInstagram />
              </motion.a>
              <motion.a 
                href="#" 
                aria-label="LinkedIn"
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaLinkedin />
              </motion.a>
            </div>
          </motion.div>
          
          <motion.div 
            className="footer-section"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4>Quick Links</h4>
            <ul>
              <li>
                <motion.div whileHover={{ x: 5 }}>
                  <Link to="/products">Products</Link>
                </motion.div>
              </li>
              <li>
                <motion.div whileHover={{ x: 5 }}>
                  <Link to="/about">About Us</Link>
                </motion.div>
              </li>
              <li>
                <motion.div whileHover={{ x: 5 }}>
                  <Link to="/contact">Contact</Link>
                </motion.div>
              </li>
              <li>
                <motion.div whileHover={{ x: 5 }}>
                  <Link to="/faq">FAQ</Link>
                </motion.div>
              </li>
            </ul>
          </motion.div>
          
          <motion.div 
            className="footer-section"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4>Customer Service</h4>
            <ul>
              <li>
                <motion.div whileHover={{ x: 5 }}>
                  <Link to="/shipping">Shipping Policy</Link>
                </motion.div>
              </li>
              <li>
                <motion.div whileHover={{ x: 5 }}>
                  <Link to="/returns">Returns & Refunds</Link>
                </motion.div>
              </li>
              <li>
                <motion.div whileHover={{ x: 5 }}>
                  <Link to="/privacy">Privacy Policy</Link>
                </motion.div>
              </li>
              <li>
                <motion.div whileHover={{ x: 5 }}>
                  <Link to="/terms">Terms of Service</Link>
                </motion.div>
              </li>
            </ul>
          </motion.div>
          
          <motion.div 
            className="footer-section"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4>Download App</h4>
            <p>Get the app for exclusive deals and faster checkout</p>
            <div className="app-buttons">
              <motion.a 
                href="#" 
                className="app-button"
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaApple />
                <div>
                  <small>Download on the</small>
                  <strong>App Store</strong>
                </div>
              </motion.a>
              <motion.a 
                href="#" 
                className="app-button"
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaGooglePlay />
                <div>
                  <small>GET IT ON</small>
                  <strong>Google Play</strong>
                </div>
              </motion.a>
            </div>
            
            <h4 className="mt-4">Subscribe to Newsletter</h4>
            <form onSubmit={handleSubscribe} className="newsletter-form">
              <div className="input-group">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <motion.button 
                  type="submit"
                  className="subscribe-btn"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaPaperPlane />
                </motion.button>
              </div>
            </form>
            {isSubscribed && (
              <motion.p 
                className="subscription-success"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                Thank you for subscribing!
              </motion.p>
            )}
          </motion.div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Farmisian. All rights reserved.</p>
          <div className="footer-links">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
            <Link to="/sitemap">Sitemap</Link>
          </div>
        </div>
      </div>
      
      {/* Live Chat Button */}
      <motion.button
        className="chat-button"
        onClick={toggleChat}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1 }}
      >
        <FaPaperPlane />
      </motion.button>
      
      {/* Live Chat Widget */}
      {showChat && (
        <motion.div 
          className="chat-widget"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
        >
          <div className="chat-header">
            <h4>Live Chat</h4>
            <button onClick={toggleChat}>
              <FaTimes />
            </button>
          </div>
          <div className="chat-messages">
            {messages.length === 0 ? (
              <div className="chat-welcome">
                <p>Hello! How can we help you today?</p>
              </div>
            ) : (
              messages.map((msg, index) => (
                <div 
                  key={index} 
                  className={`chat-message ${msg.isUser ? 'user-message' : 'agent-message'}`}
                >
                  {msg.text}
                </div>
              ))
            )}
          </div>
          <form onSubmit={handleSendMessage} className="chat-input">
            <input 
              type="text" 
              placeholder="Type your message..." 
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <motion.button 
              type="submit"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaPaperPlane />
            </motion.button>
          </form>
        </motion.div>
      )}
    </footer>
  );
};

export default Footer;