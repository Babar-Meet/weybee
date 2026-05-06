import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { usePageData } from '../hooks/usePageData';
import EditableSection from '../components/EditableSection';
import { SkeletonPage } from '../components/SkeletonLoader';

const pageV = { initial: { opacity: 0 }, animate: { opacity: 1, transition: { duration: 0.4 } }, exit: { opacity: 0 } };
const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

export default function Services() {
  const { loading, getSection } = usePageData('services');

  if (loading) return <SkeletonPage />;

  const sHero = getSection('hero');
  const sList = getSection('services-list');
  const sCta = getSection('cta');

  return (
    <motion.div className="services-page" initial="initial" animate="animate" exit="exit" variants={pageV}>

      {/* Hero */}
      {sHero && (
        <EditableSection pageSlug="services" sectionId="hero">
          <section style={{ backgroundColor: sHero.bgColor || 'var(--primary-color)', color: '#fff', padding: '160px 0 80px 0', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', right: 0, top: 0, width: '35%', height: '100%', background: 'rgba(255,255,255,0.05)', borderRadius: '50% 0 0 50%' }}></div>
            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
                <h1 style={{ fontSize: '3.5rem', color: '#fff', marginBottom: '20px' }}>{sHero.heading}</h1>
                <p style={{ maxWidth: '650px', color: '#e8e8e8', fontSize: '1.15rem', lineHeight: 1.7 }}>
                  {sHero.text}
                </p>
              </motion.div>
            </div>
          </section>
        </EditableSection>
      )}

      {/* Services Grid */}
      {sList && (
        <EditableSection pageSlug="services" sectionId="services-list">
          <section style={{ padding: '100px 0', backgroundColor: sList.bgColor || '#fff' }}>
            <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
              {sList.items?.map((s, i) => (
                <motion.div key={i}
                  style={{ display: 'flex', alignItems: 'center', gap: '50px', flexWrap: 'wrap', flexDirection: i % 2 === 1 ? 'row-reverse' : 'row' }}
                  initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                >
                  <div style={{ flex: '1 1 450px' }}>
                    <motion.img src={s.image.startsWith('/') ? s.image : `/assets/${s.image}`} alt={s.title}
                      style={{ width: '100%', borderRadius: '15px', boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  <div style={{ flex: '1 1 450px' }}>
                    <h2 style={{ fontSize: '2rem', marginBottom: '15px', color: '#333' }}>{s.title}</h2>
                    <p style={{ color: '#555', lineHeight: 1.7, marginBottom: '20px' }}>{s.description}</p>
                    <ul style={{ paddingLeft: '20px', marginBottom: '25px' }}>
                      {s.icon?.split(',').map((item, j) => (
                        <li key={j} style={{ color: '#666', marginBottom: '8px', lineHeight: 1.5 }}>{item.trim()}</li>
                      ))}
                    </ul>
                    <Link to={s.link} className="btn btn-solid" style={{ padding: '12px 30px', borderRadius: '25px' }}>Learn More</Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </EditableSection>
      )}

      {/* CTA */}
      {sCta && (
        <EditableSection pageSlug="services" sectionId="cta">
          <section style={{ padding: '80px 0', backgroundColor: sCta.bgColor || 'var(--primary-color)', color: '#fff', textAlign: 'center' }}>
            <div className="container">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <h2 style={{ color: '#fff', marginBottom: '25px', fontSize: '2rem' }}>{sCta.heading}</h2>
                <p style={{ color: '#e0e0e0', marginBottom: '30px', maxWidth: '600px', margin: '0 auto 30px auto' }}>
                  {sCta.text}
                </p>
                <Link to="/contact-us" className="btn" style={{ padding: '14px 40px', borderRadius: '25px', background: '#fff', color: 'var(--primary-color)', fontWeight: 600 }}>Let's Talk</Link>
              </motion.div>
            </div>
          </section>
        </EditableSection>
      )}
    </motion.div>
  );
}
