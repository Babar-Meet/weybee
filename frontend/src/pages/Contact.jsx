import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { usePageData } from '../hooks/usePageData';
import EditableSection from '../components/EditableSection';
import { SkeletonPage } from '../components/SkeletonLoader';
import { Link } from 'react-router-dom';

const pageV = { initial: { opacity: 0 }, animate: { opacity: 1, transition: { duration: 0.4 } }, exit: { opacity: 0 } };
const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

// CSS-based geometric pattern generator matching WeyBee's style
const GeometricGrid = () => {
  const c = ['#5670FB', '#0B2B5E', '#FF6B6B', '#00D289', '#FFD100']; // Blue, DarkBlue, Red, Cyan, Yellow
  const shapes = [
    { type: 'square', color: c[0] }, { type: 'curve-tl', color: c[1] }, { type: 'curve-tr', color: c[4] }, { type: 'curve-tl', color: c[1] },
    { type: 'square', color: c[3] }, { type: 'curve-bl', color: c[0] }, { type: 'curve-br', color: c[3] }, { type: 'curve-tr', color: c[2] }
  ];

  return (
    <div style={{
      display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gridTemplateRows: 'repeat(2, 1fr)',
      width: '100%', height: '100%'
    }}>
      {shapes.map((s, i) => {
        let br = '0';
        if (s.type === 'circle') br = '50%';
        if (s.type === 'curve-tl') br = '100% 0 0 0';
        if (s.type === 'curve-tr') br = '0 100% 0 0';
        if (s.type === 'curve-br') br = '0 0 100% 0';
        if (s.type === 'curve-bl') br = '0 0 0 100%';
        
        return (
          <div key={i} style={{ backgroundColor: 'transparent', width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
            <div style={{ backgroundColor: s.color, width: '100%', height: '100%', borderRadius: br }}></div>
          </div>
        );
      })}
    </div>
  );
};

export default function Contact() {
  const { loading, getSection } = usePageData('contact-us');
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('');
  const [activeLocationIndex, setActiveLocationIndex] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const mapRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const mapLocations = [
    { name: "Rajkot Office", q: "22.2898144,70.7719602" },
    { name: "Ahmedabad Office", q: "1012, Aaron Spectra, Rajpath Rangoli Rd, behind Rajpath club, Bodakdev, Ahmedabad, Gujarat 380059" },
    { name: "Sydney Office", q: "WOTSO Pyrmont, 3/55 Pyrmont Bridge Rd, Pyrmont NSW 2009, Australia" }
  ];

  useEffect(() => {
    if (loading) return;
  }, [loading]);

  if (loading) return <SkeletonPage />;

  const sHero = getSection('hero');
  const sOffices = getSection('offices');
  const sForm = getSection('contact-form');
  const sNews = getSection('newsletter');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setStatus('Sending...');
      const apiUrl = import.meta.env.VITE_API_URL || '/api';
      await axios.post(`${apiUrl}/contact`, formData);
      setStatus('Message sent successfully!');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus(''), 3000);
    } catch (err) {
      setStatus('Failed to send message. Please try again.');
    }
  };

  return (
    <motion.div className="contact-page" initial="initial" animate="animate" exit="exit" variants={pageV}>
      
      {/* 1. Hero Section (Blue with curved bottom and geometric grid) */}
      {sHero && (
        <EditableSection pageSlug="contact-us" sectionId="hero">
          <section style={{ 
            backgroundColor: sHero.bgColor || 'var(--primary-color)', color: '#fff', 
            padding: '160px 0 120px 0', position: 'relative', overflow: 'hidden',
            borderBottomLeftRadius: '25vw'
          }}>
            <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', zIndex: 1, flexWrap: 'wrap', gap: '40px' }}>
              <motion.div style={{ flex: '1 1 500px', maxWidth: '600px' }} initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
                <h1 style={{ fontSize: '4rem', color: '#fff', marginBottom: '20px', fontWeight: 500 }}>{sHero.heading}</h1>
                <p style={{ color: '#e0e5ff', fontSize: '1.15rem', lineHeight: 1.7, marginBottom: '40px', maxWidth: '500px' }}>{sHero.text}</p>
                <div style={{ display: 'flex', gap: '20px' }}>
                  {sHero.buttons?.map((btn, i) => (
                    <Link key={i} to={btn.link} style={{ 
                      padding: '12px 25px', backgroundColor: '#fff', color: 'var(--primary-color)', 
                      borderRadius: '50px', fontWeight: 600, fontSize: '14px', textDecoration: 'none',
                      display: 'flex', alignItems: 'center', gap: '8px'
                    }}>
                      {btn.title}
                    </Link>
                  ))}
                </div>
              </motion.div>
              
              <motion.div style={{ flex: '1 1 400px', maxWidth: '500px', aspectRatio: '1/1' }} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
                <GeometricGrid />
              </motion.div>
            </div>
          </section>
        </EditableSection>
      )}

      {/* 2. Visit Us Section (Map & Offices) */}
      <section style={{ padding: '120px 0', backgroundColor: '#fafafb' }}>
        <div className="container" style={{ display: 'flex', gap: '80px', alignItems: 'center', flexWrap: 'wrap' }}>
          
          {/* Left: Map UI with Overlay */}
          <motion.div style={{ flex: '1 1 450px', position: 'relative', maxWidth: '550px' }} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <div style={{
              width: '100%', aspectRatio: '1/1', 
              borderRadius: '30px',
              overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.08)',
              border: '10px solid #fff', position: 'relative',
              backgroundColor: '#e5e3df'
            }}>
              
              {/* Google Maps Iframe Embed with Animation */}
              <AnimatePresence mode="wait">
                <motion.iframe 
                  key={activeLocationIndex}
                  initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(mapLocations[activeLocationIndex].q)}&z=15&output=embed`}
                  style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: 1, border: 0 }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade">
                </motion.iframe>
              </AnimatePresence>
              
              {/* Geometric pattern overlay */}
              <div style={{ 
                position: 'absolute', bottom: '0', left: '0', width: '60%', height: '30%', 
                zIndex: 10, overflow: 'hidden', pointerEvents: 'none'
              }}>
                 <GeometricGrid />
              </div>
            </div>

            {/* Location Selector Carousel */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px', gap: '15px' }}>
              <button 
                onClick={() => setActiveLocationIndex((prev) => (prev === 0 ? mapLocations.length - 1 : prev - 1))}
                style={{
                  background: '#fff', border: '1px solid #e0e0e0', borderRadius: '50%',
                  width: '45px', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', color: '#5670FB',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#f4f6fa'; e.currentTarget.style.transform = 'scale(1.05)'; }}
                onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#fff'; e.currentTarget.style.transform = 'scale(1)'; }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
              </button>
              
              <div 
                ref={dropdownRef}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                style={{
                  padding: '12px 24px', fontSize: '1.05rem', fontWeight: 600, color: '#333',
                  backgroundColor: '#fff', border: '1px solid #e0e0e0', borderRadius: '30px',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.05)', minWidth: '220px', textAlign: 'center',
                  userSelect: 'none', cursor: 'pointer', position: 'relative'
                }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeLocationIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {mapLocations[activeLocationIndex].name}
                  </motion.div>
                </AnimatePresence>

                {/* Hidden Dropdown Menu */}
                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      style={{
                        position: 'absolute',
                        bottom: 'calc(100% + 10px)',
                        left: '0',
                        right: '0',
                        backgroundColor: '#fff',
                        borderRadius: '15px',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                        overflow: 'hidden',
                        zIndex: 100,
                        border: '1px solid #eee'
                      }}
                    >
                      {mapLocations.map((loc, idx) => (
                        <div
                          key={idx}
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveLocationIndex(idx);
                            setIsDropdownOpen(false);
                          }}
                          style={{
                            padding: '12px 20px',
                            fontSize: '0.95rem',
                            color: activeLocationIndex === idx ? '#5670FB' : '#444',
                            backgroundColor: activeLocationIndex === idx ? '#f4f6fa' : 'transparent',
                            transition: 'all 0.2s ease',
                            textAlign: 'left',
                            fontWeight: activeLocationIndex === idx ? '600' : '500'
                          }}
                          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f4f6fa'}
                          onMouseOut={(e) => e.currentTarget.style.backgroundColor = activeLocationIndex === idx ? '#f4f6fa' : 'transparent'}
                        >
                          {loc.name}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button 
                onClick={() => setActiveLocationIndex((prev) => (prev === mapLocations.length - 1 ? 0 : prev + 1))}
                style={{
                  background: '#fff', border: '1px solid #e0e0e0', borderRadius: '50%',
                  width: '45px', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', color: '#5670FB',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#f4f6fa'; e.currentTarget.style.transform = 'scale(1.05)'; }}
                onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#fff'; e.currentTarget.style.transform = 'scale(1)'; }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
              </button>
            </div>
          </motion.div>

          {/* Right: Office Details */}
          <motion.div style={{ flex: '1 1 500px' }} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            {sOffices && (
              <EditableSection pageSlug="contact-us" sectionId="offices">
                <div style={{ marginBottom: '50px' }}>
                  <h2 style={{ fontSize: '3.8rem', fontWeight: 400, lineHeight: 1.1, marginBottom: '20px', color: '#111', position: 'relative' }}>
                    {/* SVG Swoosh */}
                    <svg style={{ position: 'absolute', top: '-15px', right: '30%', width: '40px' }} viewBox="0 0 32 32" fill="none"><path d="M4 16C12 8 20 4 28 8s-4 16-12 20" stroke="#5670FB" strokeWidth="4" strokeLinecap="round"/></svg>
                    {sOffices.heading1} <br/>
                    <span style={{ color: '#ff6b6b', fontWeight: 600 }}>{sOffices.heading2}</span>
                  </h2>
                  <p style={{ color: '#666', fontSize: '1.05rem', lineHeight: 1.6, maxWidth: '480px' }}>{sOffices.text}</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '40px' }}>
                  {sOffices.groups?.map((group, i) => (
                    <div key={i}>
                      {/* Group Header */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                          {group.flag && <span style={{ fontSize: '24px' }}>{group.flag}</span>}
                          <h3 style={{ fontSize: '1.25rem', fontWeight: 500, margin: 0, color: '#333' }}>{group.country}</h3>
                        </div>
                        {group.phone && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5670FB" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                            <span style={{ fontSize: '1rem', color: '#555' }}>{group.phone}</span>
                          </div>
                        )}
                      </div>

                      {/* Locations Grid */}
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        {group.locations?.map((loc, j) => (
                          <div key={j}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                              {loc.icon === 'mail' ? (
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5670FB" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                              ) : loc.icon === 'web' ? (
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5670FB" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
                              ) : (
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5670FB" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                              )}
                              <h4 style={{ fontSize: '1.05rem', fontWeight: 500, margin: 0, color: '#444' }}>{loc.title}</h4>
                            </div>
                            <p style={{ color: '#777', fontSize: '0.9rem', lineHeight: 1.5, margin: 0 }}>{loc.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </EditableSection>
            )}
          </motion.div>
        </div>
      </section>

      {/* 3. Contact Form Section */}
      {sForm && (
        <section style={{ backgroundColor: sForm.bgColor || '#5670FB', padding: '100px 0' }}>
          <div className="container" style={{ display: 'flex', gap: '60px', alignItems: 'center', flexWrap: 'wrap' }}>
            
            {/* Left: Form */}
            <motion.div style={{ flex: '1 1 500px' }} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <EditableSection pageSlug="contact-us" sectionId="contact-form">
                <h2 style={{ fontSize: '3rem', color: '#fff', marginBottom: '40px', fontWeight: 500, position: 'relative' }}>
                  {sForm.heading}
                  <svg style={{ position: 'absolute', top: '-10px', right: '10%', width: '30px' }} viewBox="0 0 32 32" fill="none"><path d="M4 16C12 8 20 4 28 8s-4 16-12 20" stroke="#fff" strokeWidth="4" strokeLinecap="round"/></svg>
                </h2>
                
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <input type="text" placeholder="Your Name *" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} style={{ padding: '18px 25px', borderRadius: '50px', border: 'none', outline: 'none', fontSize: '15px' }} />
                  <input type="email" placeholder="Your Email Address *" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} style={{ padding: '18px 25px', borderRadius: '50px', border: 'none', outline: 'none', fontSize: '15px' }} />
                  <input type="text" placeholder="Your Subject" value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})} style={{ padding: '18px 25px', borderRadius: '50px', border: 'none', outline: 'none', fontSize: '15px' }} />
                  <textarea placeholder="Write your message *" required value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} style={{ padding: '18px 25px', borderRadius: '25px', border: 'none', outline: 'none', fontSize: '15px', minHeight: '140px', resize: 'vertical' }} />
                  <div>
                    <button type="submit" style={{ padding: '18px 40px', borderRadius: '50px', fontSize: '15px', fontWeight: '600', cursor: 'pointer', border: 'none', backgroundColor: '#fff', color: '#5670FB', display: 'inline-block' }}>
                      Submit message
                    </button>
                  </div>
                  {status && <p style={{ color: '#fff', fontWeight: 600 }}>{status}</p>}
                </form>
              </EditableSection>
            </motion.div>

            {/* Right: Circular Image + Grid */}
            <motion.div style={{ flex: '1 1 450px', position: 'relative', display: 'flex', justifyContent: 'center' }} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } } }}>
              <div style={{ width: '450px', height: '450px', borderRadius: '50%', overflow: 'hidden', border: '8px solid rgba(255,255,255,0.1)' }}>
                {/* Fallback image from unsplash (support person) */}
                <img src="https://images.unsplash.com/photo-1596524430615-b46475ddff6e?auto=format&fit=crop&q=80&w=800" alt="Support" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ position: 'absolute', bottom: '0', right: '5%', width: '220px', height: '220px', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
                <GeometricGrid />
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* 4. Stay Updated Section (Newsletter) */}
      {sNews && (
        <section style={{ backgroundColor: sNews.bgColor || '#f4f6fa', padding: '80px 0' }}>
          <div className="container" style={{ display: 'flex', gap: '50px', alignItems: 'center', flexWrap: 'wrap', backgroundColor: '#fff', borderRadius: '30px', padding: '40px' }}>
            <motion.div style={{ flex: '1 1 400px' }} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <div style={{ width: '100%', aspectRatio: '16/9', borderRadius: '0 80px 0 80px', overflow: 'hidden' }}>
                <img src="/assets/Weybee-Dedicated-Team-Model.jpg" alt="Team" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </motion.div>
            
            <motion.div style={{ flex: '1 1 400px' }} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <EditableSection pageSlug="contact-us" sectionId="newsletter">
                <h2 style={{ fontSize: '2.5rem', color: 'var(--primary-color)', marginBottom: '15px', fontWeight: 500 }}>{sNews.heading}</h2>
                <p style={{ color: '#666', fontSize: '1rem', lineHeight: 1.6, marginBottom: '30px' }}>{sNews.text}</p>
                <form onSubmit={e => e.preventDefault()} style={{ display: 'flex', position: 'relative', maxWidth: '450px' }}>
                  <input type="email" placeholder="Enter your email address" required style={{ width: '100%', padding: '18px 25px', borderRadius: '50px', border: '1px solid #e0e0e0', outline: 'none', fontSize: '15px' }} />
                  <button type="submit" style={{ position: 'absolute', right: '5px', top: '5px', bottom: '5px', padding: '0 30px', borderRadius: '50px', border: 'none', backgroundColor: '#5670FB', color: '#fff', fontWeight: 600, cursor: 'pointer' }}>
                    Subscribe
                  </button>
                </form>
              </EditableSection>
            </motion.div>
          </div>
        </section>
      )}

    </motion.div>
  );
}
