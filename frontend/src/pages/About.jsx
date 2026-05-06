import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { usePageData } from '../hooks/usePageData';
import EditableSection from '../components/EditableSection';

const pageV = { initial: { opacity: 0 }, animate: { opacity: 1, transition: { duration: 0.4 } }, exit: { opacity: 0 } };
const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

export default function About() {
  const { loading, getSection } = usePageData('about-us');

  if (loading) return <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Loading...</div>;

  const sHero = getSection('hero');
  const sAbout = getSection('about');
  const sStats = getSection('stats');
  const sValues = getSection('core-values');

  return (
    <motion.div className="about-page" initial="initial" animate="animate" exit="exit" variants={pageV}>

      {/* Hero */}
      {sHero && (
        <EditableSection pageSlug="about-us" sectionId="hero">
          <section style={{ backgroundColor: sHero.bgColor || 'var(--primary-color)', color: '#fff', padding: '160px 0 80px 0', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', right: 0, top: 0, width: '35%', height: '100%', background: 'rgba(255,255,255,0.05)', borderRadius: '50% 0 0 50%' }}></div>
            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
                <h1 style={{ fontSize: '3.5rem', color: '#fff', marginBottom: '20px' }}>{sHero.heading}</h1>
                <p style={{ maxWidth: '650px', color: '#e8e8e8', fontSize: '1.15rem', lineHeight: 1.7, marginBottom: '30px' }}>{sHero.text}</p>
                <div style={{ display: 'flex', gap: '15px' }}>
                  <Link to="/services" className="btn" style={{ padding: '14px 35px', borderRadius: '25px', background: '#fff', color: 'var(--primary-color)', fontWeight: 600 }}>View Services</Link>
                  <Link to="/contact-us" className="btn" style={{ padding: '14px 35px', borderRadius: '25px', background: 'transparent', color: '#fff', fontWeight: 600, border: '2px solid #fff' }}>Contact us</Link>
                </div>
              </motion.div>
            </div>
          </section>
        </EditableSection>
      )}

      {/* About WeyBee */}
      {sAbout && (
        <EditableSection pageSlug="about-us" sectionId="about">
          <section style={{ padding: '100px 0', backgroundColor: sAbout.bgColor || '#fff' }}>
            <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '60px', flexWrap: 'wrap' }}>
              <motion.div style={{ flex: '1 1 500px' }} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <p style={{ color: 'var(--primary-color)', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px', fontSize: '14px' }}>{sAbout.subheading}</p>
                <h2 style={{ fontSize: '2.8rem', marginBottom: '20px' }}>{sAbout.heading}</h2>
                <p style={{ color: '#555', lineHeight: 1.8, marginBottom: '20px', whiteSpace: 'pre-line' }}>{sAbout.text}</p>
              </motion.div>
              <motion.div style={{ flex: '1 1 450px' }} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <img src={sAbout.image} alt="About WeyBee" style={{ width: '100%', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} />
              </motion.div>
            </div>
          </section>
        </EditableSection>
      )}

      {/* Stats */}
      {sStats && (
        <EditableSection pageSlug="about-us" sectionId="stats">
          <section style={{ padding: '80px 0', backgroundColor: sStats.bgColor || 'var(--primary-color)', color: '#fff' }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-around', textAlign: 'center', flexWrap: 'wrap', gap: '30px' }}>
              {sStats.items?.map((stat, i) => (
                <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: i * 0.1 } } }}>
                  <h2 style={{ fontSize: '3rem', color: '#fff', marginBottom: '5px' }}>{stat.title}</h2>
                  <p style={{ color: '#e0e0e0' }}>{stat.description}</p>
                </motion.div>
              ))}
            </div>
          </section>
        </EditableSection>
      )}

      {/* Core Values */}
      {sValues && (
        <EditableSection pageSlug="about-us" sectionId="core-values">
          <section style={{ padding: '100px 0', backgroundColor: sValues.bgColor || '#f4f6fa' }}>
            <div className="container">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <h2 style={{ textAlign: 'center', marginBottom: '60px', fontSize: '2.5rem' }}>{sValues.heading}</h2>
              </motion.div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px' }}>
                {sValues.items?.map((v, i) => (
                  <motion.div key={i} style={{ padding: '30px', background: '#fff', borderRadius: '12px', boxShadow: '0 5px 20px rgba(0,0,0,0.04)', transition: 'all 0.3s' }} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.08 } } }} whileHover={{ y: -5, boxShadow: '0 12px 30px rgba(86,112,251,0.1)' }}>
                    <h3 style={{ color: 'var(--primary-color)', marginBottom: '10px' }}>{v.title}</h3>
                    <p style={{ color: '#666', lineHeight: 1.6 }}>{v.description}</p>
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
            <h2 style={{ color: '#fff', marginBottom: '25px', fontSize: '2rem' }}>Ready to start your journey with us?</h2>
            <Link to="/contact-us" className="btn" style={{ padding: '14px 40px', borderRadius: '25px', background: '#fff', color: 'var(--primary-color)', fontWeight: 600, fontSize: '15px' }}>Contact Us Today</Link>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
