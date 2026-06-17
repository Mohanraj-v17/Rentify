import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

export default function AdminPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const API_URL = import.meta.env.VITE_API_URL;
      const res = await axios.post(
  `${API_URL}/api/admin/login`,
  formData
);
      localStorage.setItem('admin_token', res.data.token);
      navigate('/admin-control');
    } catch (err) {
      setError('Invalid admin credentials');
    }
  };

  return (
    <div className="flex-center" style={{ padding: '2rem' }}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel" 
        style={{ width: '100%', maxWidth: '400px', padding: '2.5rem' }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{ background: 'linear-gradient(to right, #f87171, #fca5a5)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Admin Portal</h2>
          <p>Login to manage approvals</p>
        </div>
        
        {error && <p style={{ color: '#ef4444', textAlign: 'center', marginBottom: '1rem' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8' }}>Admin Username</label>
            <input 
              type="text" 
              required 
              placeholder="Username"
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8' }}>Admin Password</label>
            <input 
              type="password" 
              required 
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>
          <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '1rem', background: 'linear-gradient(135deg, #ef4444, #b91c1c)' }}>
            Admin Open
          </button>
        </form>
        
        <p style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <Link to="/home" style={{ color: '#94a3b8' }}>Return to Home</Link>
        </p>
      </motion.div>
    </div>
  );
}
