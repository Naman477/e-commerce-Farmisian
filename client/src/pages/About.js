import React from 'react';
import { motion } from 'framer-motion';
import { FaLeaf, FaTruck, FaUsers, FaAward } from 'react-icons/fa';
import './About.css';

const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="about-page"
    >
      <div className="hero-section">
        <div className="container">
          <div className="hero-content">
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              About Farmisian
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Your trusted partner in sustainable agriculture and farm management
            </motion.p>
          </div>
        </div>
      </div>

      <div className="container">
        <section className="mission-section">
          <div className="section-content">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mission-text"
            >
              <h2>Our Mission</h2>
              <p>
                At Farmisian, we're committed to revolutionizing the agricultural industry 
                through innovative technology and sustainable practices. Our mission is to 
                empower farmers with the tools and knowledge they need to maximize their 
                productivity while minimizing environmental impact.
              </p>
              <p>
                We believe in creating a future where agriculture is not only profitable 
                but also environmentally responsible and socially beneficial.
              </p>
            </motion.div>
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mission-image"
            >
              <div className="image-placeholder">
                <FaLeaf className="mission-icon" />
              </div>
            </motion.div>
          </div>
        </section>

        <section className="values-section">
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="section-title"
          >
            Our Core Values
          </motion.h2>
          <div className="values-grid">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="value-card"
            >
              <FaLeaf className="value-icon" />
              <h3>Sustainability</h3>
              <p>Promoting eco-friendly farming practices that protect our planet for future generations.</p>
            </motion.div>
            
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="value-card"
            >
              <FaTruck className="value-icon" />
              <h3>Innovation</h3>
              <p>Developing cutting-edge solutions that transform traditional farming into smart agriculture.</p>
            </motion.div>
            
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="value-card"
            >
              <FaUsers className="value-icon" />
              <h3>Community</h3>
              <p>Building strong relationships with farmers, suppliers, and customers to create a thriving ecosystem.</p>
            </motion.div>
            
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="value-card"
            >
              <FaAward className="value-icon" />
              <h3>Quality</h3>
              <p>Ensuring the highest standards in every product and service we provide.</p>
            </motion.div>
          </div>
        </section>

        <section className="team-section">
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="section-title"
          >
            Our Leadership Team
          </motion.h2>
          <div className="team-grid">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="team-member"
            >
              <div className="member-image">
                <div className="image-placeholder">
                  <FaUsers className="member-icon" />
                </div>
              </div>
              <h3>John Smith</h3>
              <p>CEO & Founder</p>
            </motion.div>
            
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="team-member"
            >
              <div className="member-image">
                <div className="image-placeholder">
                  <FaUsers className="member-icon" />
                </div>
              </div>
              <h3>Sarah Johnson</h3>
              <p>CTO</p>
            </motion.div>
            
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="team-member"
            >
              <div className="member-image">
                <div className="image-placeholder">
                  <FaUsers className="member-icon" />
                </div>
              </div>
              <h3>Michael Brown</h3>
              <p>Head of Agriculture</p>
            </motion.div>
          </div>
        </section>
      </div>
    </motion.div>
  );
};

export default About;