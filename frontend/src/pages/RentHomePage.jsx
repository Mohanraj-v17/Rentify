import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Phone, MessageCircle, MapPin, Bed, Users, ChevronLeft, ChevronRight, Maximize2, X, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function RentHomePage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [homes, setHomes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fullscreenImage, setFullscreenImage] = useState(null);

  useEffect(() => {
    const fetchHomes = async () => {
      try {
        const district = searchParams.get('district') || '';
        const res = await axios.get(`http://localhost:5000/api/properties/homes?district=${district}`);
        setHomes(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchHomes();
  }, [searchParams]);

  return (
    <div className="animate-fade-in" style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem', gap: '1rem' }}>
        <button onClick={() => navigate('/home')} className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ArrowLeft size={18} /> Back
        </button>
        <h1 style={{ margin: 0 }}>Rent Home Listings</h1>
      </div>

      {loading ? (
        <p className="text-center">Loading homes...</p>
      ) : homes.length === 0 ? (
        <p className="text-center">No homes found for your search criteria.</p>
      ) : (
        <div className="grid grid-cols-3">
          {homes.map(home => (
            <HomeCard key={home._id} home={home} onImageClick={setFullscreenImage} />
          ))}
        </div>
      )}

      {/* Fullscreen Modal component */}
      <AnimatePresence>
        {fullscreenImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
              background: 'rgba(0,0,0,0.9)', zIndex: 1000, 
              display: 'flex', justifyContent: 'center', alignItems: 'center'
            }}
          >
            <X size={32} style={{ position: 'absolute', top: 20, right: 20, cursor: 'pointer', color: 'white' }} onClick={() => setFullscreenImage(null)} />
            <img src={fullscreenImage} style={{ maxWidth: '90%', maxHeight: '90%', objectFit: 'contain', borderRadius: '8px' }} alt="Fullscreen" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function HomeCard({ home, onImageClick }) {
  const [imgIndex, setImgIndex] = useState(0);
  const images = home.images?.length > 0 ? home.images : ['https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=400&q=80']; // Mock default image

  const nextImg = (e) => {
    e.stopPropagation();
    setImgIndex((prev) => (prev + 1) % images.length);
  }

  const prevImg = (e) => {
    e.stopPropagation();
    setImgIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }

  return (
    <motion.div whileHover={{ y: -5 }} className="glass-panel" style={{ overflow: 'hidden' }}>
      {/* Image Slider */}
      <div style={{ position: 'relative', height: '220px', background: '#000' }}>
        <img src={images[imgIndex]} alt="Home" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        
        {images.length > 1 && (
          <>
            <button onClick={prevImg} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.5)', padding: '0.3rem', borderRadius: '50%', color: 'white' }}><ChevronLeft size={20}/></button>
            <button onClick={nextImg} style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.5)', padding: '0.3rem', borderRadius: '50%', color: 'white' }}><ChevronRight size={20}/></button>
          </>
        )}

        <button 
          onClick={() => onImageClick(images[imgIndex])}
          style={{ position: 'absolute', right: 10, bottom: 10, background: 'rgba(0,0,0,0.5)', padding: '0.4rem', borderRadius: '50%', color: 'white' }}
        >
          <Maximize2 size={16}/>
        </button>
      </div>

      <div style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <span style={{ background: 'rgba(79, 70, 229, 0.2)', color: '#818cf8', padding: '0.3rem 0.6rem', borderRadius: '16px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <Bed size={14} /> {home.bedrooms || 'BHK N/A'}
          </span>
          <span style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#34d399', padding: '0.3rem 0.6rem', borderRadius: '16px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <Users size={14} /> {home.tenantPreference || 'Any'}
          </span>
        </div>

        <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}><MapPin size={16}/> {home.district}</p>
        <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}><b>Owner:</b> {home.ownerName}</p>
        <p style={{ fontSize: '0.9rem', marginBottom: '1rem', color: '#cbd5e1', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{home.description}</p>
        
        {home.gmapsLink && (
          <a href={home.gmapsLink} target="_blank" rel="noreferrer" style={{ fontSize: '0.9rem', textDecoration: 'underline', marginBottom: '1rem', display: 'inline-block' }}>View on Google Maps</a>
        )}

        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
          <a href={`tel:${home.contactNumber}`} className="btn-primary" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}><Phone size={16}/> Call</a>
          {home.whatsappNumber && (
            <a href={`https://wa.me/${home.whatsappNumber}`} target="_blank" rel="noreferrer" className="btn-success" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}><MessageCircle size={16}/> Chat</a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
