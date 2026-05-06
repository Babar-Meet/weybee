import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { usePageData } from '../hooks/usePageData';
import EditableSection from '../components/EditableSection';
import { SkeletonPage } from '../components/SkeletonLoader';

const pageV = { initial: { opacity: 0 }, animate: { opacity: 1, transition: { duration: 0.4 } }, exit: { opacity: 0 } };
const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

export default function SuccessStories() {
  const { loading, getSection } = usePageData('success-stories');

  if (loading) return <SkeletonPage />;

  const sFeatured = getSection('featured');
  const sHero = getSection('hero');
  const sStats = getSection('stats');

  return (
    <motion.div initial="initial" animate="animate" exit="exit" variants={pageV}>

      {/* Hero — matching original weybee.com style */}
      <EditableSection pageSlug="success-stories" sectionId="featured">
        <section style={{
          backgroundColor: sFeatured?.bgColor || 'var(--primary-color)', color: '#fff',
          padding: '160px 0 100px 0', position: 'relative', overflow: 'hidden'
        }}>
          <div style={{ position: 'absolute', right: '-5%', top: '-20%', width: '400px', height: '400px', borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />
          <div style={{ position: 'absolute', right: '10%', bottom: '-30%', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(255,255,255,0.03)' }} />

          <div className="container" style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: '60px', flexWrap: 'wrap' }}>
            <motion.div style={{ flex: '1 1 550px' }} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <div style={{ display: 'flex', gap: '15px', marginBottom: '25px' }}>
                <Link to="/contact-us" className="btn" style={{ padding: '12px 30px', borderRadius: '15px 0 15px 15px', background: '#fff', color: 'var(--primary-color)', fontWeight: 600, fontSize: '14px' }}>
                  Contact us
                </Link>
                <Link to="/services" className="btn" style={{ padding: '12px 30px', borderRadius: '15px 0 15px 15px', background: 'transparent', color: '#fff', fontWeight: 600, fontSize: '14px', border: '2px solid rgba(255,255,255,0.4)' }}>
                  View Services
                </Link>
              </div>
            </motion.div>

            <motion.div style={{ flex: '1 1 400px' }} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
              {sFeatured && (
                <a href={sFeatured.link} target="_blank" rel="noopener noreferrer"
                  style={{
                    display: 'inline-block', background: 'rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(10px)', borderRadius: '16px', padding: '25px 30px',
                    border: '1px solid rgba(255,255,255,0.15)', transition: 'all 0.3s',
                    color: '#fff'
                  }}
                >
                  <h3 style={{ color: '#FFD700', marginBottom: '8px', fontSize: '1.3rem' }}>{sFeatured.heading}</h3>
                  <p style={{ color: '#e0e0e0', fontSize: '0.95rem', lineHeight: 1.6 }}>{sFeatured.text}</p>
                </a>
              )}
            </motion.div>
          </div>
        </section>
      </EditableSection>

      {/* Description + Stats */}
      <EditableSection pageSlug="success-stories" sectionId="hero">
        <section style={{ padding: '80px 0', backgroundColor: sHero?.bgColor || '#fff' }}>
          <div className="container">
            {sHero && (
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                style={{ maxWidth: '900px', marginBottom: '60px' }}>
                <h2 style={{ fontSize: '2.2rem', marginBottom: '20px' }}>{sHero.heading}</h2>
                <p style={{ color: '#555', lineHeight: 1.8, fontSize: '1.05rem' }}>{sHero.text}</p>
              </motion.div>
            )}

            {/* Stats row */}
            {sStats && (
              <EditableSection pageSlug="success-stories" sectionId="stats">
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                  style={{
                    display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '30px',
                    background: sStats.bgColor || 'var(--primary-color)', borderRadius: '16px', padding: '40px 30px',
                    textAlign: 'center'
                  }}>
                  {sStats.items?.map((s, i) => (
                    <div key={i}>
                      <div style={{ fontSize: '2.5rem', fontWeight: 700, color: '#FFD700', fontFamily: 'var(--font-heading)' }}>{s.title}</div>
                      <div style={{ color: '#e0e0e0', fontSize: '0.95rem', marginTop: '5px' }}>{s.label || s.description}</div>
                    </div>
                  ))}
                </motion.div>
              </EditableSection>
            )}
          </div>
        </section>
      </EditableSection>

      {/* CTA */}
      <section style={{ padding: '80px 0', backgroundColor: '#f4f6fa', textAlign: 'center' }}>
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2 style={{ fontSize: '2rem', marginBottom: '15px' }}>Ready to Write Your Success Story?</h2>
            <p style={{ color: '#666', marginBottom: '30px', maxWidth: '600px', margin: '0 auto 30px auto', lineHeight: 1.7 }}>
              Partner with WeyBee and transform your business with cutting-edge technology solutions.
            </p>
            <Link to="/contact-us" className="btn btn-solid" style={{ padding: '14px 40px', borderRadius: '15px 0 15px 15px' }}>
              Let's Talk
            </Link>
          </motion.div>
        </div>
      </section>

    </motion.div>
  );
}
