import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Menu, Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TAMIL_NADU_DISTRICTS = [
  "Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore", "Dharmapuri", "Dindigul", 
  "Erode", "Kallakurichi", "Kanchipuram", "Kanyakumari", "Karur", "Krishnagiri", "Madurai", 
  "Mayiladuthurai", "Nagapattinam", "Namakkal", "Nilgiris", "Perambalur", "Pudukkottai", 
  "Ramanathapuram", "Ranipet", "Salem", "Sivaganga", "Tenkasi", "Thanjavur", "Theni", 
  "Thoothukudi", "Tiruchirappalli", "Tirunelveli", "Tirupathur", "Tiruppur", "Tiruvallur", 
  "Tiruvannamalai", "Tiruvarur", "Vellore", "Viluppuram", "Virudhunagar"
];

export default function HomePage() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggest, setShowSuggest] = useState(false);

  const filteredDistricts = TAMIL_NADU_DISTRICTS.filter(d => d.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleSearchNav = (type) => {
    if (!searchQuery) {
      navigate(`/${type}`);
      return;
    }
    navigate(`/${type}?district=${searchQuery}`);
  };

  return (
    <div className="animate-fade-in">
      <nav className="navbar">
        <div className="logo" style={{ cursor: 'pointer' }} onClick={() => navigate('/home')}>
          Rentify
        </div>
        
        <div style={{ position: 'relative', flex: 1, maxWidth: '500px', margin: '0 2rem' }}>
          <div style={{ position: 'relative' }}>
            <input 
              type="text" 
              placeholder="Search district in Tamil Nadu..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setShowSuggest(true)}
              style={{ marginBottom: 0, paddingRight: '2.5rem', borderRadius: '24px' }}
            />
            {searchQuery && (
              <X 
                size={18} 
                style={{ position: 'absolute', right: '12px', top: '16px', cursor: 'pointer', color: '#94a3b8' }} 
                onClick={() => { setSearchQuery(''); setShowSuggest(false); }}
              />
            )}
          </div>

          <AnimatePresence>
            {showSuggest && searchQuery && filteredDistricts.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="glass-panel"
                style={{ position: 'absolute', top: '50px', left: 0, right: 0, maxHeight: '200px', overflowY: 'auto', zIndex: 100 }}
              >
                {filteredDistricts.map(d => (
                  <div 
                    key={d} 
                    style={{ padding: '0.8rem 1rem', cursor: 'pointer', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
                    onClick={() => { setSearchQuery(d); setShowSuggest(false); }}
                  >
                    {d}
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div style={{ position: 'relative' }}>
          <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: 'transparent', color: 'white' }}>
            <Menu size={28} />
          </button>

          <AnimatePresence>
            {menuOpen && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="menu-dropdown glass-panel"
              >
                <Link to="/add-home" onClick={() => setMenuOpen(false)}>Add Home</Link>
                <Link to="/add-shop" onClick={() => setMenuOpen(false)}>Add Shop</Link>
                <Link to="/admin" onClick={() => setMenuOpen(false)}>Admin</Link>
                <Link to="/help-support" onClick={() => setMenuOpen(false)}>Help / Support</Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      <div className="container">
        <h1 className="text-center float-animation" style={{ margin: '3rem 0' }}>
          What are you looking for today?
        </h1>
        
        <div className="grid grid-cols-2" style={{ maxWidth: '900px', margin: '0 auto', gap: '3rem' }}>
          {/* Rent Home Card */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="card glass-panel" 
            style={{ cursor: 'pointer', overflow: 'hidden' }}
            onClick={() => handleSearchNav('rent-home')}
          >
            <div style={{ height: '300px', overflow: 'hidden' }}>
              <img className="card-img" src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Rent Home" style={{ height: '100%', width: '100%', objectFit: 'cover' }} />
            </div>
            <div className="card-content" style={{ textAlign: 'center', padding: '2rem' }}>
              <h2>Rent Home</h2>
              <p>Find family homes, bachelor rooms & more</p>
            </div>
          </motion.div>

          {/* Rent Shop Card */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="card glass-panel" 
            style={{ cursor: 'pointer', overflow: 'hidden' }}
            onClick={() => handleSearchNav('rent-shop')}
          >
            <div style={{ height: '300px', overflow: 'hidden' }}>
              <img className="card-img" src="https://i.postimg.cc/wv1QtrXy/360-F-271784630-a-Pllk2IOZt-Em1ZBwy-Bv-Cxkd-Ft46a-QYgq.jpg" alt="Rent Shop" style={{ height: '100%', width: '100%', objectFit: 'cover' }} />
            </div>
            <div className="card-content" style={{ textAlign: 'center', padding: '2rem' }}>
              <h2>Rent Shop</h2>
              <p>Discover prime commercial spaces for your business</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
