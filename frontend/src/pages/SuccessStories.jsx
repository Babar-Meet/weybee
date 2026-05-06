import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const pageV = { initial: { opacity: 0 }, animate: { opacity: 1, transition: { duration: 0.4 } }, exit: { opacity: 0 } };
const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

const stories = [
  {
    client: 'Social Sparsh',
    industry: 'Digital Marketing',
    challenge: 'Needed a scalable platform to manage social media campaigns for 100+ clients with real-time analytics.',
    solution: 'Built a custom SaaS platform with React, Node.js, and AWS that handles multi-tenant campaign management with real-time dashboards.',
    results: ['200% increase in campaign efficiency', '100+ clients onboarded in 6 months', '99.9% uptime achieved', '60% reduction in manual reporting'],
    tech: ['React', 'Node.js', 'AWS', 'MongoDB'],
    link: 'https://socialsparsh.com/'
  },
  {
    client: 'Enterprise Healthcare Platform',
    industry: 'Healthcare',
    challenge: 'Legacy systems causing data silos and slow patient data retrieval across multiple hospital branches.',
    solution: 'Developed a unified healthcare data platform with real-time sync, HIPAA-compliant architecture, and AI-powered analytics.',
    results: ['70% faster patient data retrieval', '40% reduction in operational costs', 'Seamless integration with 5+ legacy systems', 'Real-time cross-branch data sync'],
    tech: ['Python', '.NET Core', 'Azure', 'PostgreSQL']
  },
  {
    client: 'FinTech Startup MVP',
    industry: 'Financial Technology',
    challenge: 'Early-stage startup needed a market-ready MVP within 3 months with strict compliance requirements.',
    solution: 'Rapid MVP development using agile methodology, with built-in KYC/AML compliance and secure payment integration.',
    results: ['MVP launched in 10 weeks', '$2M seed funding secured post-launch', '5,000 users in first month', 'Full regulatory compliance achieved'],
    tech: ['Vue.js', 'Python', 'AWS', 'Stripe']
  },
  {
    client: 'E-Commerce Transformation',
    industry: 'Retail & E-Commerce',
    challenge: 'Traditional retailer struggling with digital transformation and declining in-store sales.',
    solution: 'Custom e-commerce platform with AI-powered recommendations, inventory management, and omnichannel integration.',
    results: ['150% increase in online revenue', '35% higher average order value', '45% reduction in cart abandonment', 'Unified online-offline inventory'],
    tech: ['Next.js', 'Node.js', 'MongoDB', 'AWS']
  },
  {
    client: 'Data Engineering for Logistics',
    industry: 'Supply Chain & Logistics',
    challenge: 'Inefficient data pipelines causing delayed shipment tracking and poor demand forecasting.',
    solution: 'Built end-to-end data pipelines with real-time tracking, ML-powered demand forecasting, and automated reporting.',
    results: ['85% improvement in forecast accuracy', 'Real-time tracking for 10K+ shipments', '50% reduction in data processing time', 'Automated daily reports replacing manual work'],
    tech: ['Python', 'Apache Spark', 'Snowflake', 'Power BI']
  },
  {
    client: 'EdTech Learning Platform',
    industry: 'Education Technology',
    challenge: 'Needed a scalable learning management system supporting live classes, assessments, and content delivery for 50K+ students.',
    solution: 'Custom LMS with video streaming, real-time collaboration, automated grading, and analytics dashboard.',
    results: ['50,000+ active students', '98% video streaming uptime', '3x increase in student engagement', 'Reduced content delivery costs by 40%'],
    tech: ['React', 'Laravel', 'AWS', 'WebRTC']
  }
];

export default function SuccessStories() {
  return (
    <motion.div initial="initial" animate="animate" exit="exit" variants={pageV}>

      {/* Hero */}
      <section style={{ backgroundColor: 'var(--primary-color)', color: '#fff', padding: '160px 0 80px 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', right: 0, top: 0, width: '35%', height: '100%', background: 'rgba(255,255,255,0.05)', borderRadius: '50% 0 0 50%' }}></div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <h1 style={{ fontSize: '3.5rem', color: '#fff', marginBottom: '20px' }}>Success Stories</h1>
            <p style={{ maxWidth: '700px', color: '#e8e8e8', fontSize: '1.15rem', lineHeight: 1.7 }}>
              At WeyBee Solutions Pvt Ltd, we take pride in driving success for businesses across industries. With our expertise in IT services, web development, cloud solutions, and software consulting, we've empowered organizations to achieve their goals and scale new heights.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Banner */}
      <section style={{ backgroundColor: '#fff', padding: '60px 0', borderBottom: '1px solid #f0f0f0' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '30px', textAlign: 'center' }}>
            {[
              { num: '145+', label: 'Projects Delivered' },
              { num: '113+', label: 'Happy Clients' },
              { num: '95%', label: 'Client Satisfaction' },
              { num: '6+', label: 'Industries Served' }
            ].map((s, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { delay: i * 0.1 } } }}>
                <div style={{ fontSize: '3rem', fontWeight: 700, color: 'var(--primary-color)', fontFamily: 'var(--font-heading)' }}>{s.num}</div>
                <div style={{ color: '#666', fontSize: '1rem' }}>{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section style={{ padding: '100px 0', backgroundColor: '#f4f6fa' }}>
        <div className="container">
          <motion.h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '60px' }}
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            Our Impact Across Industries
          </motion.h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            {stories.map((story, i) => (
              <motion.div key={i}
                style={{
                  background: '#fff', borderRadius: '16px', overflow: 'hidden',
                  boxShadow: '0 5px 25px rgba(0,0,0,0.06)',
                  display: 'flex', flexDirection: i % 2 === 0 ? 'row' : 'row-reverse',
                  flexWrap: 'wrap'
                }}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.1 } } }}
              >
                {/* Left - Info */}
                <div style={{ flex: '1 1 55%', padding: '40px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '15px' }}>
                    <span style={{ background: '#5670FB15', color: 'var(--primary-color)', padding: '6px 16px', borderRadius: '20px', fontSize: '13px', fontWeight: 600 }}>{story.industry}</span>
                  </div>
                  <h3 style={{ fontSize: '1.6rem', marginBottom: '15px', color: '#333' }}>{story.client}</h3>
                  
                  <div style={{ marginBottom: '15px' }}>
                    <h4 style={{ color: '#E8573A', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Challenge</h4>
                    <p style={{ color: '#555', lineHeight: 1.7 }}>{story.challenge}</p>
                  </div>
                  
                  <div style={{ marginBottom: '15px' }}>
                    <h4 style={{ color: 'var(--primary-color)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Solution</h4>
                    <p style={{ color: '#555', lineHeight: 1.7 }}>{story.solution}</p>
                  </div>

                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '15px' }}>
                    {story.tech.map((t, j) => (
                      <span key={j} style={{ background: '#f4f6fa', color: '#555', padding: '4px 14px', borderRadius: '6px', fontSize: '12px', fontWeight: 600 }}>{t}</span>
                    ))}
                  </div>
                </div>

                {/* Right - Results */}
                <div style={{ flex: '1 1 40%', background: 'linear-gradient(135deg, #5670FB 0%, #7B93FF 100%)', padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '300px' }}>
                  <h4 style={{ color: '#FFD700', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '20px' }}>Key Results</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {story.results.map((r, j) => (
                      <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ color: '#00FA9A', fontSize: '1.2rem' }}>✓</span>
                        <span style={{ color: '#fff', fontSize: '1rem', lineHeight: 1.5 }}>{r}</span>
                      </div>
                    ))}
                  </div>
                  {story.link && (
                    <a href={story.link} target="_blank" rel="noopener noreferrer"
                      style={{ marginTop: '25px', color: '#FFD700', fontWeight: 600, fontSize: '14px' }}>
                      Visit Project →
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 0', backgroundColor: 'var(--primary-color)', color: '#fff', textAlign: 'center' }}>
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2 style={{ color: '#fff', marginBottom: '15px', fontSize: '2rem' }}>Ready to Write Your Success Story?</h2>
            <p style={{ color: '#e0e0e0', marginBottom: '30px', maxWidth: '600px', margin: '0 auto 30px auto' }}>
              Partner with WeyBee and transform your business with cutting-edge technology solutions.
            </p>
            <Link to="/contact-us" className="btn" style={{ padding: '14px 40px', borderRadius: '25px', background: '#fff', color: 'var(--primary-color)', fontWeight: 600 }}>Let's Talk</Link>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
