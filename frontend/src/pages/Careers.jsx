import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { usePageData } from '../hooks/usePageData';
import EditableSection from '../components/EditableSection';
import { SkeletonPage } from '../components/SkeletonLoader';

const pageV = { initial: { opacity: 0 }, animate: { opacity: 1, transition: { duration: 0.4 } }, exit: { opacity: 0 } };
const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

export default function Careers() {
  const { loading, getSection } = usePageData('careers');

  if (loading) return <SkeletonPage />;

  const sHero = getSection('hero');
  const sCulture = getSection('culture');
  const sPositions = getSection('positions');

  return (
    <motion.div className="careers-page" initial="initial" animate="animate" exit="exit" variants={pageV}>
      
      {/* Hero */}
      {sHero && (
        <EditableSection pageSlug="careers" sectionId="hero">
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

      {/* Our Culture */}
      {sCulture && (
        <EditableSection pageSlug="careers" sectionId="culture">
          <section style={{ padding: '100px 0', backgroundColor: sCulture.bgColor || '#f4f6fa' }}>
            <div className="container">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <h2 style={{ textAlign: 'center', marginBottom: '60px', fontSize: '2.5rem' }}>{sCulture.heading}</h2>
              </motion.div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px' }}>
                {sCulture.items?.map((item, i) => (
                  <motion.div key={i} style={{ padding: '30px', background: '#fff', borderRadius: '12px', boxShadow: '0 5px 20px rgba(0,0,0,0.04)' }} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.1 } } }}>
                    <div style={{ fontSize: '30px', marginBottom: '15px' }}>{item.icon}</div>
                    <h3 style={{ marginBottom: '10px' }}>{item.title}</h3>
                    <p style={{ color: '#666', lineHeight: 1.6 }}>{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </EditableSection>
      )}

      {/* Open Positions */}
      {sPositions && (
        <EditableSection pageSlug="careers" sectionId="positions">
          <section style={{ padding: '100px 0', backgroundColor: sPositions.bgColor || '#fff' }}>
            <div className="container">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>{sPositions.heading}</h2>
                <p style={{ color: '#666', marginBottom: '50px' }}>Join our team of experts.</p>
              </motion.div>
              <div style={{ display: 'grid', gap: '15px' }}>
                {sPositions.items?.map((job, i) => (
                  <motion.div key={i} style={{ padding: '25px 30px', border: '1px solid #eee', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'all 0.3s', cursor: 'pointer' }} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0, transition: { duration: 0.4, delay: i * 0.05 } } }} whileHover={{ borderColor: 'var(--primary-color)', boxShadow: '0 5px 15px rgba(86,112,251,0.1)' }}>
                    <h3 style={{ fontSize: '1.2rem', color: '#333' }}>{job.title}</h3>
                    <Link to="/contact-us" style={{ color: 'var(--primary-color)', fontWeight: 600 }}>Apply Now →</Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </EditableSection>
      )}

      {/* CTA */}
      <section style={{ padding: '80px 0', textAlign: 'center', backgroundColor: 'var(--primary-color)', color: '#fff' }}>
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2 style={{ color: '#fff', marginBottom: '25px', fontSize: '2rem' }}>Don't see a position that fits?</h2>
            <p style={{ marginBottom: '30px', color: '#e8e8e8' }}>We are always looking for talented individuals. Send us your resume!</p>
            <Link to="/contact-us" className="btn" style={{ padding: '14px 40px', borderRadius: '25px', background: '#fff', color: 'var(--primary-color)', fontWeight: 600, fontSize: '15px' }}>Submit Resume</Link>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
