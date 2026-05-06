import { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { usePageData } from '../hooks/usePageData';
import EditableSection from '../components/EditableSection';
import { SkeletonPage } from '../components/SkeletonLoader';

const pageV = { initial: { opacity: 0 }, animate: { opacity: 1, transition: { duration: 0.4 } }, exit: { opacity: 0 } };
const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

export default function Contact() {
  const { loading, getSection } = usePageData('contact-us');
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('');

  if (loading) return <SkeletonPage />;

  const sHero = getSection('hero');
  const sOffices = getSection('offices');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setStatus('Sending...');
      await axios.post('/api/contact', formData);
      setStatus('Message sent successfully!');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus(''), 3000);
    } catch (err) {
      setStatus('Failed to send message. Please try again.');
    }
  };

  return (
    <motion.div className="contact-page" initial="initial" animate="animate" exit="exit" variants={pageV}>
      
      {/* Hero */}
      {sHero && (
        <EditableSection pageSlug="contact-us" sectionId="hero">
          <section style={{ backgroundColor: sHero.bgColor || 'var(--primary-color)', color: '#fff', padding: '160px 0 80px 0', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', right: 0, top: 0, width: '35%', height: '100%', background: 'rgba(255,255,255,0.05)', borderRadius: '50% 0 0 50%' }}></div>
            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
                <h1 style={{ fontSize: '3.5rem', color: '#fff', marginBottom: '20px' }}>{sHero.heading}</h1>
                <p style={{ maxWidth: '650px', color: '#e8e8e8', fontSize: '1.15rem', lineHeight: 1.7 }}>{sHero.text}</p>
              </motion.div>
            </div>
          </section>
        </EditableSection>
      )}

      <section style={{ padding: '80px 0', backgroundColor: '#f4f6fa' }}>
        <div className="container" style={{ display: 'flex', gap: '50px', flexWrap: 'wrap' }}>
          
          {/* Offices List */}
          <motion.div style={{ flex: '1 1 400px' }} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            {sOffices && (
              <EditableSection pageSlug="contact-us" sectionId="offices">
                <h2 style={{ fontSize: '2.2rem', marginBottom: '30px' }}>{sOffices.heading}</h2>
                <div style={{ display: 'grid', gap: '25px' }}>
                  {sOffices.items?.map((office, i) => (
                    <div key={i} style={{ padding: '25px', background: '#fff', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
                      <h3 style={{ marginBottom: '10px', color: 'var(--primary-color)' }}>{office.title}</h3>
                      <p style={{ color: '#555', marginBottom: '15px', lineHeight: 1.6 }}>{office.description}</p>
                      <p style={{ fontWeight: 'bold', color: '#333' }}>📞 {office.icon}</p>
                    </div>
                  ))}
                </div>
              </EditableSection>
            )}
          </motion.div>

          {/* Contact Form */}
          <motion.div style={{ flex: '1 1 500px', background: '#fff', padding: '40px', borderRadius: '15px', boxShadow: '0 10px 40px rgba(0,0,0,0.05)' }} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2 style={{ fontSize: '2rem', marginBottom: '30px' }}>Send us a message</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <input type="text" placeholder="Your Name" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} style={{ padding: '15px', borderRadius: '8px', border: '1px solid #e0e0e0', outline: 'none', fontSize: '15px' }} />
              <input type="email" placeholder="Your Email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} style={{ padding: '15px', borderRadius: '8px', border: '1px solid #e0e0e0', outline: 'none', fontSize: '15px' }} />
              <input type="text" placeholder="Subject" value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})} style={{ padding: '15px', borderRadius: '8px', border: '1px solid #e0e0e0', outline: 'none', fontSize: '15px' }} />
              <textarea placeholder="Your Message" required value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} style={{ padding: '15px', borderRadius: '8px', border: '1px solid #e0e0e0', outline: 'none', fontSize: '15px', minHeight: '150px', resize: 'vertical' }} />
              <button type="submit" className="btn btn-solid" style={{ padding: '15px', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', border: 'none' }}>
                Send Message
              </button>
              {status && <p style={{ color: status.includes('success') ? '#22c55e' : '#5670FB', fontWeight: 600, textAlign: 'center' }}>{status}</p>}
            </form>
          </motion.div>

        </div>
      </section>
    </motion.div>
  );
}
