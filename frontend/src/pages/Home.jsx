import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { usePageData } from '../hooks/usePageData';
import EditableSection from '../components/EditableSection';
import { SkeletonPage } from '../components/SkeletonLoader';

const pageV = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.4 } },
  exit: { opacity: 0, transition: { duration: 0.2 } }
};
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const Home = () => {
  const { loading, getSection } = usePageData('home');

  if (loading) return <SkeletonPage />;

  const sHero = getSection('hero');
  const sHero2 = getSection('hero-2');
  const sServices = getSection('services');
  const sAbout = getSection('about');
  const sWhy = getSection('why-weybee');
  const sModels = getSection('engagement-models');
  const sTech = getSection('technology');
  const sNews = getSection('newsletter');

  return (
    <motion.div className="home-page" initial="initial" animate="animate" exit="exit" variants={pageV}>

      {/* ========== HERO SECTION ========== */}
      {sHero && (
        <EditableSection pageSlug="home" sectionId="hero">
          <section style={{ backgroundColor: sHero.bgColor || 'var(--primary-color)', color: '#fff', padding: '160px 0 100px 0', overflow: 'hidden', position: 'relative' }}>
            <div style={{ position: 'absolute', right: 0, top: 0, width: '35%', height: '100%', background: 'rgba(255,255,255,0.06)', borderRadius: '50% 0 0 50%' }}></div>
            <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '50px', flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
              <motion.div style={{ flex: '1 1 500px', position: 'relative' }} initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}>
                <div style={{ position: 'absolute', left: '-15px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.2)', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', zIndex: 2, backdropFilter: 'blur(4px)' }}>❮</div>
                <img src={sHero.image} alt="WeyBee Team" style={{ width: '100%', borderRadius: '30px 8px 30px 8px', boxShadow: '0 20px 50px rgba(0,0,0,0.25)' }} />
              </motion.div>
              <motion.div style={{ flex: '1 1 450px' }} initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
                <div style={{ marginBottom: '10px' }}><img src="/assets/WeyBee.png" alt="" style={{ height: '30px', filter: 'brightness(0) invert(1)', opacity: 0.6 }} /></div>
                <h1 style={{ fontSize: '3.8rem', lineHeight: 1.15, marginBottom: '20px', whiteSpace: 'pre-line' }}>
                  <span style={{ color: '#FFD700' }}>{sHero.heading?.split('\n')[0]}</span><br/>
                  <span style={{ color: '#00FA9A' }}>{sHero.heading?.split('\n')[1] || ''}</span>
                </h1>
                <p style={{ fontSize: '1.15rem', color: '#e8e8e8', marginBottom: '35px', maxWidth: '550px' }}>{sHero.text}</p>
                {sHero.items?.[0] && (
                  <Link to={sHero.items[0].link || '/contact-us'} className="btn" style={{ padding: '14px 38px', borderRadius: '25px', background: '#fff', color: 'var(--primary-color)', fontWeight: 600, fontSize: '15px' }}>
                    {sHero.items[0].title} ❯
                  </Link>
                )}
              </motion.div>
            </div>
          </section>
        </EditableSection>
      )}

      {/* ========== SECOND HERO ========== */}
      {sHero2 && (
        <EditableSection pageSlug="home" sectionId="hero-2">
          <section style={{ backgroundColor: sHero2.bgColor || 'var(--primary-color)', color: '#fff', padding: '0 0 80px 0' }}>
            <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '50px', flexWrap: 'wrap' }}>
              <motion.div style={{ flex: '1 1 500px' }} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <h2 style={{ fontSize: '2.8rem', lineHeight: 1.2, marginBottom: '20px', color: '#fff' }}>{sHero2.heading}</h2>
                <p style={{ fontSize: '1.1rem', color: '#e0e0e0', marginBottom: '30px' }}>{sHero2.text}</p>
                <div style={{ display: 'flex', gap: '15px' }}>
                  {sHero2.items?.[0] && <Link to={sHero2.items[0].link} className="btn" style={{ padding: '14px 35px', borderRadius: '25px', background: '#fff', color: 'var(--primary-color)', fontWeight: 600 }}>{sHero2.items[0].title}</Link>}
                  {sHero2.items?.[1] && <Link to={sHero2.items[1].link} className="btn" style={{ padding: '14px 35px', borderRadius: '25px', background: 'transparent', color: '#fff', fontWeight: 600, border: '2px solid #fff' }}>{sHero2.items[1].title}</Link>}
                </div>
              </motion.div>
              <motion.div style={{ flex: '1 1 400px' }} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <img src={sHero2.image} alt="Empowering" style={{ width: '100%', borderRadius: '20px' }} />
              </motion.div>
            </div>
          </section>
        </EditableSection>
      )}

      {/* ========== SERVICES ========== */}
      {sServices && (
        <EditableSection pageSlug="home" sectionId="services">
          <section style={{ padding: '100px 0', backgroundColor: sServices.bgColor || '#fff' }}>
            <div className="container">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '60px' }}>{sServices.heading}</h2>
              </motion.div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '30px' }}>
                {sServices.items?.map((s, i) => (
                  <motion.div key={i} style={{ padding: '30px', boxShadow: '0 5px 25px rgba(0,0,0,0.06)', borderRadius: '15px', background: '#fff', cursor: 'pointer', transition: 'all 0.4s' }} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.1 } } }} whileHover={{ y: -8, boxShadow: '0 15px 35px rgba(0,0,0,0.12)' }}>
                    <img src={s.image} alt={s.title} style={{ width: '100%', borderRadius: '10px', marginBottom: '20px' }} />
                    <h3 style={{ marginBottom: '12px', fontSize: '1.3rem' }}>{s.title}</h3>
                    <p style={{ color: '#666', marginBottom: '18px', lineHeight: 1.6 }}>{s.description}</p>
                    <Link to={s.link || '/services'} style={{ color: 'var(--primary-color)', fontWeight: 'bold', fontSize: '14px' }}>View Services →</Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </EditableSection>
      )}

      {/* ========== ABOUT WEYBEE ========== */}
      {sAbout && (
        <EditableSection pageSlug="home" sectionId="about">
          <section style={{ padding: '100px 0', backgroundColor: sAbout.bgColor || '#f4f6fa' }}>
            <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '60px', flexWrap: 'wrap' }}>
              <motion.div style={{ flex: '1 1 500px' }} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <p style={{ color: 'var(--primary-color)', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '10px', fontSize: '14px' }}>{sAbout.subheading}</p>
                <h2 style={{ fontSize: '2.8rem', marginBottom: '20px' }}>{sAbout.heading}</h2>
                <p style={{ color: '#555', lineHeight: 1.8, marginBottom: '30px', fontSize: '1.05rem' }}>{sAbout.text}</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
                  {sAbout.items?.map((item, i) => (
                    <div key={i}>
                      <h3 style={{ color: 'var(--primary-color)', fontSize: '2.2rem', marginBottom: '5px' }}>{item.title}</h3>
                      <p style={{ color: '#666' }}>{item.description}</p>
                    </div>
                  ))}
                </div>
                <Link to="/about-us" className="btn btn-solid" style={{ padding: '14px 35px' }}>Know More</Link>
              </motion.div>
              <motion.div style={{ flex: '1 1 450px' }} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <img src={sAbout.image} alt="About WeyBee" style={{ width: '100%', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} />
              </motion.div>
            </div>
          </section>
        </EditableSection>
      )}

      {/* ========== WHY WEYBEE ========== */}
      {sWhy && (
        <EditableSection pageSlug="home" sectionId="why-weybee">
          <section style={{ padding: '100px 0', backgroundColor: sWhy.bgColor || '#fff' }}>
            <div className="container">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <h2 style={{ fontSize: '2.8rem', marginBottom: '5px' }}>{sWhy.heading}</h2>
                <h3 style={{ color: '#E8573A', fontSize: '1.8rem', marginBottom: '15px', fontWeight: 600 }}>{sWhy.subheading}</h3>
                <p style={{ maxWidth: '900px', color: '#555', lineHeight: 1.7, marginBottom: '60px' }}>{sWhy.text}</p>
              </motion.div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '35px' }}>
                {sWhy.items?.map((card, i) => (
                  <motion.div key={i} style={{ padding: '30px', borderRadius: '12px', background: '#fff', border: '1px solid #f0f0f0', cursor: 'pointer', transition: 'all 0.4s' }} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.08 } } }} whileHover={{ y: -6, boxShadow: '0 12px 30px rgba(86,112,251,0.12)', borderColor: 'var(--primary-color)' }}>
                    <div style={{ width: '60px', height: '60px', borderRadius: '12px', background: '#fef0ef', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', marginBottom: '20px' }}>{card.icon}</div>
                    <h4 style={{ marginBottom: '10px', fontSize: '1.1rem' }}>{card.title}</h4>
                    <p style={{ color: '#666', fontSize: '0.95rem', lineHeight: 1.6 }}>{card.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </EditableSection>
      )}

      {/* ========== FLEXIBLE ENGAGEMENT MODELS ========== */}
      {sModels && (
        <EditableSection pageSlug="home" sectionId="engagement-models">
          <section style={{ padding: '100px 0', backgroundColor: sModels.bgColor || '#f4f6fa' }}>
            <div className="container">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>{sModels.heading}</h2>
                <h3 style={{ color: 'var(--primary-color)', fontSize: '1.6rem', marginBottom: '50px' }}>{sModels.subheading}</h3>
              </motion.div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px', marginBottom: '60px' }}>
                {sModels.items?.map((model, i) => (
                  <motion.div key={i} style={{ padding: '30px', borderRadius: '15px', background: '#fff', textAlign: 'center', boxShadow: '0 5px 20px rgba(0,0,0,0.05)' }} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.15 } } }} whileHover={{ y: -6, boxShadow: '0 12px 30px rgba(0,0,0,0.1)' }}>
                    <img src={model.image} alt={model.title} style={{ height: '70px', marginBottom: '20px' }} />
                    <h4 style={{ marginBottom: '12px' }}>{model.title}</h4>
                    <p style={{ color: '#666', fontSize: '0.95rem', lineHeight: 1.6 }}>{model.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </EditableSection>
      )}

      {/* ========== TECHNOLOGY EXPERTISE ========== */}
      {sTech && (
        <EditableSection pageSlug="home" sectionId="technology">
          <section style={{ padding: '100px 0', backgroundColor: sTech.bgColor || '#fff', textAlign: 'center' }}>
            <div className="container">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '60px' }}>{sTech.heading}</h2>
              </motion.div>
              <motion.div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '40px', alignItems: 'center' }} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                {sTech.items?.map(tech => (
                  <motion.img key={tech.title} src={tech.image} alt={tech.title} style={{ height: '55px', filter: 'grayscale(80%)', transition: 'all 0.3s', cursor: 'pointer' }} whileHover={{ filter: 'grayscale(0%)', scale: 1.15 }} />
                ))}
              </motion.div>
            </div>
          </section>
        </EditableSection>
      )}

      {/* ========== NEWSLETTER ========== */}
      {sNews && (
        <EditableSection pageSlug="home" sectionId="newsletter">
          <section style={{ padding: '100px 0', backgroundColor: sNews.bgColor || '#f4f6fa' }}>
            <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '50px', flexWrap: 'wrap' }}>
              <motion.div style={{ flex: '1 1 500px' }} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <img src={sNews.image} alt="Newsletter" style={{ width: '100%', borderRadius: '20px' }} />
              </motion.div>
              <motion.div style={{ flex: '1 1 400px' }} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <h2 style={{ fontSize: '2rem', marginBottom: '15px' }}>{sNews.heading}</h2>
                <p style={{ color: '#666', marginBottom: '30px', lineHeight: 1.7 }}>{sNews.text}</p>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <input type="email" placeholder="Your email address" style={{ padding: '14px 18px', flex: 1, borderRadius: '8px', border: '1px solid #ddd', fontSize: '14px' }} />
                  <button className="btn btn-solid" style={{ padding: '14px 30px', borderRadius: '8px' }}>Subscribe</button>
                </div>
              </motion.div>
            </div>
          </section>
        </EditableSection>
      )}

    </motion.div>
  );
};

export default Home;
