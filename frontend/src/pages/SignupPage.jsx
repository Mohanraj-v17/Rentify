import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

export default function SignupPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', email: '', password: '', confirmPassword: '' });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setStatus('Passwords do not match!');
      return;
    }

    try {
      setStatus('Sending verification email...');
      // Simulated verification process
      setTimeout(async () => {
        try {
          await axios.post('http://localhost:5000/api/auth/signup', {
            username: formData.username,
            email: formData.email,
            password: formData.password
          });
          setStatus('Email verified! Account created successfully.');
          setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
          setStatus(err.response?.data?.message || 'Error creating account');
        }
      }, 1500); // Wait 1.5s to simulate email sending/verification
      
    } catch (err) {
      setStatus('An error occurred.');
    }
  };

  return (
    <div className="flex-center" style={{ padding: '2rem' }}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel" 
        style={{ width: '100%', maxWidth: '450px', padding: '2.5rem' }}
      >
        <h2 className="text-center" style={{ marginBottom: '2rem' }}>Create Account</h2>
        {status && <div style={{ background: 'rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '8px', marginBottom: '1rem', textAlign: 'center' }}>{status}</div>}
        <form onSubmit={handleSubmit}>
          <input 
            type="text" required placeholder="Username"
            value={formData.username} onChange={(e) => setFormData({...formData, username: e.target.value})}
          />
          <input 
            type="email" required placeholder="Email ID"
            value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
          <input 
            type="password" required placeholder="Password"
            value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})}
          />
          <input 
            type="password" required placeholder="Confirm Password"
            value={formData.confirmPassword} onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
          />
          <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
            Sign Up
          </button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </motion.div>
    </div>
  );
}
