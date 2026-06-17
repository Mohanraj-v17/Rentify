import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, PhoneCall, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HelpSupportPage() {
  const navigate = useNavigate();

  return (
    <div className="animate-fade-in" style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <button onClick={() => navigate('/home')} className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
        <ArrowLeft size={18} /> Back to Home
      </button>

      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="glass-panel" style={{ padding: '3rem', textAlign: 'center' }}>
        <div style={{ background: 'rgba(79, 70, 229, 0.2)', padding: '1rem', borderRadius: '50%', color: '#818cf8', display: 'inline-block', marginBottom: '1rem' }}>
          <HelpCircle size={48} />
        </div>
        <h1 style={{ marginBottom: '1rem' }}>Help & Support</h1>
        <p style={{ fontSize: '1.1rem', marginBottom: '3rem' }}>
          We're here to help! If you have any questions or need assistance with your property listings, please reach out to our support team.
        </p>

        <div className="grid grid-cols-2" style={{ gap: '2rem' }}>
          <div className="glass-panel" style={{ padding: '2rem' }}>
            <Mail size={32} style={{ color: '#818cf8', marginBottom: '1rem' }} />
            <h3 style={{ marginBottom: '0.5rem' }}>Email Support</h3>
            <p style={{ marginBottom: '1rem' }}>Drop us an email anytime, we'll get back to you within 24 hours.</p>
            <a href="mailto:rentify26@gmail.com" className="btn-primary" style={{ display: 'inline-block' }}>rentify26@gmail.com</a>
          </div>

          <div className="glass-panel" style={{ padding: '2rem' }}>
            <PhoneCall size={32} style={{ color: '#34d399', marginBottom: '1rem' }} />
            <h3 style={{ marginBottom: '0.5rem' }}>Phone Support</h3>
            <p style={{ marginBottom: '1rem' }}>Call us directly. Available Mon-Fri, 9am - 6pm.</p>
            <a href="tel:+7010771344" className="btn-success" style={{ display: 'inline-block', textDecoration: 'none' }}>+917010771344</a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
