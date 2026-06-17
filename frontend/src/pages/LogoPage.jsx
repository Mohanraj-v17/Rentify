import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function LogoPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login');
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.5 }}
        className="text-center float-animation"
      >
        <div className="logo" style={{ fontSize: '5rem', marginBottom: '0.5rem' }}>
          Rentify
        </div>
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          style={{ fontSize: '1.3rem', letterSpacing: '0.05em', color: '#a1a1aa' }}
        >
          Find Your Place
        </motion.p>
      </motion.div>
    </div>
  );
}
  
