import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Phone, MessageCircle, MapPin, ChevronLeft, ChevronRight, Maximize2, X, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function RentShopPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fullscreenImage, setFullscreenImage] = useState(null);

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const district = searchParams.get('district') || '';
      const API_URL = import.meta.env.VITE_API_URL;

const res = await axios.get(
  `${API_URL}/api/properties/shops?district=${district}`
);
        setShops(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchShops();
  }, [searchParams]);

  return (
    <div className="animate-fade-in" style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem', gap: '1rem' }}>
        <button onClick={() => navigate('/home')} className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ArrowLeft size={18} /> Back
        </button>
        <h1 style={{ margin: 0 }}>Rent Shop Listings</h1>
      </div>

      {loading ? (
        <p className="text-center">Loading shops...</p>
      ) : shops.length === 0 ? (
        <p className="text-center">No shops found for your search criteria.</p>
      ) : (
        <div className="grid grid-cols-3">
          {shops.map(shop => (
            <ShopCard key={shop._id} shop={shop} onImageClick={setFullscreenImage} />
          ))}
        </div>
      )}

      {/* Fullscreen Modal */}
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

function ShopCard({ shop, onImageClick }) {
  const [imgIndex, setImgIndex] = useState(0);
  const images = shop.images?.length > 0 ? shop.images : ['https://images.unsplash.com/photo-1555529733-0e67056058e1?auto=format&fit=crop&w=400&q=80'];

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
        <img src={images[imgIndex]} alt="Shop" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        
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
        <h3 style={{ marginBottom: '0.5rem' }}>{shop.ownerName}'s Shop</h3>
        <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: '#94a3b8' }}><MapPin size={16}/> {shop.district}</p>
        <p style={{ fontSize: '0.9rem', marginBottom: '1rem', color: '#cbd5e1', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{shop.description}</p>
        
        {shop.gmapsLink && (
          <a href={shop.gmapsLink} target="_blank" rel="noreferrer" style={{ fontSize: '0.9rem', textDecoration: 'underline', marginBottom: '1rem', display: 'inline-block' }}>View on Google Maps</a>
        )}

        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
          <a href={`tel:${shop.contactNumber}`} className="btn-primary" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}><Phone size={16}/> Call</a>
          {shop.whatsappNumber && (
            <a href={`https://wa.me/${shop.whatsappNumber}`} target="_blank" rel="noreferrer" className="btn-success" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}><MessageCircle size={16}/> Chat</a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
