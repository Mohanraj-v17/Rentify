import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Check, X, ArrowLeft, Home, Store } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminControlPage() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ totalHomes: 0, totalShops: 0 });
  const [pendingHomes, setPendingHomes] = useState([]);
  const [pendingShops, setPendingShops] = useState([]);
  const [activeTab, setActiveTab] = useState('homes');

  const fetchData = async () => {
    try {
      const statsRes = await axios.get('http://localhost:5000/api/admin/stats');
      setStats(statsRes.data);

      const homesRes = await axios.get('http://localhost:5000/api/admin/pending-homes');
      setPendingHomes(homesRes.data);

      const shopsRes = await axios.get('http://localhost:5000/api/admin/pending-shops');
      setPendingShops(shopsRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      navigate('/admin');
      return;
    }
    fetchData();
  }, [navigate]);

  const handleAction = async (type, action, id) => {
    try {
      await axios[action === 'approve' ? 'put' : 'delete'](`http://localhost:5000/api/admin/${action}-${type}/${id}`);
      fetchData();
    } catch (err) {
      alert('Error processing action');
    }
  };

  return (
    <div className="animate-fade-in container" style={{ maxWidth: '1000px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <button onClick={() => navigate('/home')} className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ArrowLeft size={18} /> Exit Admin
        </button>
        <h1 style={{ margin: 0 }}>Admin Control</h1>
      </div>

      <div className="grid grid-cols-2" style={{ gap: '1rem', marginBottom: '2rem' }}>
        <div className="glass-panel" style={{ padding: '2rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ background: 'rgba(79, 70, 229, 0.2)', padding: '1rem', borderRadius: '50%', color: '#818cf8' }}>
            <Home size={32} />
          </div>
          <div>
            <h3 style={{ color: '#94a3b8', fontSize: '1rem' }}>Total Approved Homes</h3>
            <p style={{ fontSize: '2.5rem', fontWeight: 700, margin: 0 }}>{stats.totalHomes}</p>
          </div>
        </div>
        <div className="glass-panel" style={{ padding: '2rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ background: 'rgba(16, 185, 129, 0.2)', padding: '1rem', borderRadius: '50%', color: '#34d399' }}>
            <Store size={32} />
          </div>
          <div>
            <h3 style={{ color: '#94a3b8', fontSize: '1rem' }}>Total Approved Shops</h3>
            <p style={{ fontSize: '2.5rem', fontWeight: 700, margin: 0 }}>{stats.totalShops}</p>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <button className={activeTab === 'homes' ? 'btn-primary' : 'btn-secondary'} onClick={() => setActiveTab('homes')} style={{ flex: 1 }}>Pending Homes ({pendingHomes.length})</button>
        <button className={activeTab === 'shops' ? 'btn-primary' : 'btn-secondary'} onClick={() => setActiveTab('shops')} style={{ flex: 1 }}>Pending Shops ({pendingShops.length})</button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={activeTab} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}>
          {activeTab === 'homes' ? (
            pendingHomes.length === 0 ? <p className="text-center" style={{ padding: '2rem' }}>No pending homes</p> :
            <div className="grid" style={{ gap: '1rem' }}>
              {pendingHomes.map(home => (
                <div key={home._id} className="glass-panel" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h3 style={{ marginBottom: '0.2rem' }}>{home.ownerName}</h3>
                    <p style={{ fontSize: '0.9rem', color: '#94a3b8' }}>{home.district} • {home.bedrooms} • {home.tenantPreference}</p>
                    <p style={{ fontSize: '0.9rem', marginTop: '0.5rem', maxWidth: '500px' }}>{home.description}</p>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button onClick={() => handleAction('home', 'approve', home._id)} className="btn-success" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Check size={16}/> Add</button>
                    <button onClick={() => handleAction('home', 'reject', home._id)} className="btn-danger" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><X size={16}/> Reject</button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            pendingShops.length === 0 ? <p className="text-center" style={{ padding: '2rem' }}>No pending shops</p> :
            <div className="grid" style={{ gap: '1rem' }}>
              {pendingShops.map(shop => (
                <div key={shop._id} className="glass-panel" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h3 style={{ marginBottom: '0.2rem' }}>{shop.ownerName}</h3>
                    <p style={{ fontSize: '0.9rem', color: '#94a3b8' }}>{shop.district}</p>
                    <p style={{ fontSize: '0.9rem', marginTop: '0.5rem', maxWidth: '500px' }}>{shop.description}</p>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button onClick={() => handleAction('shop', 'approve', shop._id)} className="btn-success" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Check size={16}/> Add</button>
                    <button onClick={() => handleAction('shop', 'reject', shop._id)} className="btn-danger" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><X size={16}/> Reject</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
