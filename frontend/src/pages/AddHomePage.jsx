import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Camera, X, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const TAMIL_NADU_DISTRICTS = [
  "Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore", "Dharmapuri", "Dindigul", 
  "Erode", "Kallakurichi", "Kanchipuram", "Kanyakumari", "Karur", "Krishnagiri", "Madurai", 
  "Mayiladuthurai", "Nagapattinam", "Namakkal", "Nilgiris", "Perambalur", "Pudukkottai", 
  "Ramanathapuram", "Ranipet", "Salem", "Sivaganga", "Tenkasi", "Thanjavur", "Theni", 
  "Thoothukudi", "Tiruchirappalli", "Tirunelveli", "Tirupathur", "Tiruppur", "Tiruvallur", 
  "Tiruvannamalai", "Tiruvarur", "Vellore", "Viluppuram", "Virudhunagar"
];

export default function AddHomePage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    ownerName: '', contactNumber: '', whatsappNumber: '', gmapsLink: '', 
    district: '', tenantPreference: '', bedrooms: '', description: ''
  });
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState('');

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    Promise.all(files.map(file => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });
    })).then(base64Images => {
      setImages(prev => [...prev, ...base64Images].slice(0, 5)); // Limit to 5
    });
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setStatus('Uploading...');
      await axios.post('http://localhost:5000/api/properties/add-home', { ...formData, images });
      setStatus('Success! Waiting for Admin Approval.');
      setTimeout(() => navigate('/home'), 2000);
    } catch (err) {
      setStatus('Error adding home.');
    }
  };

  return (
    <div className="animate-fade-in" style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <button onClick={() => navigate('/home')} className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
        <ArrowLeft size={18} /> Back to Home
      </button>

      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="glass-panel" style={{ padding: '2.5rem' }}>
        <h2 style={{ marginBottom: '2rem' }}>Add New Home</h2>
        {status && <div style={{ background: 'rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem' }}>{status}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2">
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8' }}>Owner Name</label>
              <input type="text" required value={formData.ownerName} onChange={(e) => setFormData({...formData, ownerName: e.target.value})} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8' }}>Contact Number</label>
              <input type="text" required value={formData.contactNumber} onChange={(e) => setFormData({...formData, contactNumber: e.target.value})} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8' }}>WhatsApp Number</label>
              <input type="text" value={formData.whatsappNumber} onChange={(e) => setFormData({...formData, whatsappNumber: e.target.value})} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8' }}>District</label>
              <select required value={formData.district} onChange={(e) => setFormData({...formData, district: e.target.value})}>
                <option value="">Select District</option>
                {TAMIL_NADU_DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8' }}>Bedroom Configuration</label>
              <select required value={formData.bedrooms} onChange={(e) => setFormData({...formData, bedrooms: e.target.value})}>
                <option value="">Select BHK</option>
                <option value="1BHK">1 BHK</option>
                <option value="2BHK">2 BHK</option>
                <option value="3BHK">3 BHK</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8' }}>Tenant Preference</label>
              <select required value={formData.tenantPreference} onChange={(e) => setFormData({...formData, tenantPreference: e.target.value})}>
                <option value="">Select Preference</option>
                <option value="family-only">Family Only</option>
                <option value="bachelor-friendly">Bachelor Friendly</option>
                <option value="any">Any</option>
              </select>
            </div>
          </div>
          
          <div style={{ marginTop: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8' }}>Google Maps Link (Optional)</label>
            <input type="text" value={formData.gmapsLink} onChange={(e) => setFormData({...formData, gmapsLink: e.target.value})} />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8' }}>Description</label>
            <textarea rows={4} required value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8' }}>Property Images (Up to 5)</label>
            <label className="btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', marginBottom: '1rem' }}>
              <Camera size={18} /> Upload Images
              <input type="file" multiple accept="image/*" hidden onChange={handleImageUpload} />
            </label>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              {images.map((img, idx) => (
                <div key={idx} style={{ position: 'relative', width: '100px', height: '100px' }}>
                  <img src={img} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} />
                  <button type="button" onClick={() => removeImage(idx)} style={{ position: 'absolute', top: -5, right: -5, background: '#ef4444', color: 'white', border: 'none', borderRadius: '50%', cursor: 'pointer', padding: '0.2rem' }}><X size={14}/></button>
                </div>
              ))}
            </div>
          </div>

          <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '2rem', fontSize: '1.1rem' }}>Submit Home Listing</button>
        </form>
      </motion.div>
    </div>
  );
}
