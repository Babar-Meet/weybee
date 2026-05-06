import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const pageV = { initial: { opacity: 0 }, animate: { opacity: 1, transition: { duration: 0.4 } }, exit: { opacity: 0 } };
const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

const serviceData = {
  '/it-staff-augmentation': {
    title: 'IT Staff Augmentation',
    subtitle: 'Scale Your Team with Top Talent',
    desc: 'Access to highly skilled IT professionals without the overhead of full-time hires. Flexible, scalable solutions for all project sizes.',
    features: [
      { title: 'Hire Developers', desc: 'Skilled frontend, backend, and full-stack developers ready to integrate with your team.' },
      { title: 'Hire QA Engineers', desc: 'Certified quality assurance professionals for manual and automated testing.' },
      { title: 'Hire Managed Team', desc: 'Complete, self-managed teams with project managers, developers, and QA engineers.' }
    ],
    benefits: ['Reduce hiring costs by up to 60%', 'Scale teams up or down quickly', 'Access to diverse technology expertise', 'No overhead of full-time employees', 'Dedicated resources for your projects']
  },
  '/software-development-services': {
    title: 'Software Development Services',
    subtitle: 'Transform Ideas Into Reality',
    desc: 'From web and mobile apps to enterprise software, we build solutions that drive growth and streamline operations.',
    features: [
      { title: 'Web Development', desc: 'Modern, responsive web applications using React, Vue.js, Angular, and Next.js.' },
      { title: 'eCommerce Development', desc: 'Scalable online stores with Shopify, WooCommerce, and custom solutions.' },
      { title: 'Mobile App Development', desc: 'Native and cross-platform mobile apps for iOS and Android.' },
      { title: 'Customized Software', desc: 'Bespoke software solutions tailored to your unique business processes.' },
      { title: 'Project Management', desc: 'Expert project managers to ensure on-time, on-budget delivery.' },
      { title: 'Platform Engineering', desc: 'Cloud-native platforms built for scale, reliability, and performance.' }
    ],
    benefits: ['End-to-end development lifecycle', 'Agile methodology', 'Regular progress updates', 'Post-launch support', 'Scalable architecture']
  },
  '/it-services-for-startups': {
    title: 'IT Services for Startups',
    subtitle: 'From Idea to Market-Ready Product',
    desc: 'End-to-end MVP development and tech support tailored for startups. We help you go from concept to launch faster.',
    features: [
      { title: 'MVP Development', desc: 'Rapid prototyping and minimum viable product development to validate your idea.' },
      { title: 'End-to-End Tech Support', desc: 'Complete technology stack setup, development, and maintenance.' },
      { title: 'Infrastructure Setup', desc: 'Cloud infrastructure, CI/CD pipelines, and DevOps best practices.' },
      { title: 'Cloud Solutions', desc: 'AWS, Azure, and GCP solutions optimized for startup budgets.' },
      { title: 'Cybersecurity', desc: 'Protect your startup with enterprise-grade security from day one.' }
    ],
    benefits: ['Fast time-to-market', 'Cost-effective solutions', 'Scalable architecture from day 1', 'Expert CTO-level guidance', 'Ongoing support and iteration']
  },
  '/data-engineering': {
    title: 'Data Engineering',
    subtitle: 'Build Robust Data Infrastructure',
    desc: 'Data scraping, AI-ML Engineering and reliable, scalable data platforms that turn raw data into actionable insights.',
    features: [
      { title: 'Data Scraping', desc: 'Automated data extraction from websites, APIs, and documents at scale.' },
      { title: 'AI-ML Engineering', desc: 'Machine learning models, NLP, computer vision, and predictive analytics.' },
      { title: 'Data Integration', desc: 'Connect disparate data sources into unified, queryable data lakes.' },
      { title: 'Data Warehousing', desc: 'Scalable data warehouse solutions on AWS, GCP, and Azure.' },
      { title: 'Data Visualization', desc: 'Interactive dashboards and reports with Power BI, Tableau, and custom solutions.' }
    ],
    benefits: ['Data-driven decision making', 'Automated data pipelines', 'Real-time analytics', 'AI-powered insights', 'Scalable infrastructure']
  },
  '/success-stories': {
    title: 'Success Stories',
    subtitle: 'Our Impact in Numbers',
    desc: 'See how we have helped businesses across industries achieve their technology goals and drive measurable results.',
    features: [
      { title: '145+ Projects Completed', desc: 'Delivered across industries including healthcare, fintech, e-commerce, and education.' },
      { title: '113+ Satisfied Clients', desc: 'Long-term partnerships built on trust, quality, and consistent delivery.' },
      { title: '95% Client Satisfaction', desc: 'Our clients consistently rate us as their top technology partner.' }
    ],
    benefits: ['Proven track record', 'Industry-diverse experience', 'Measurable ROI for clients', 'Long-term partnerships', 'Award-winning solutions']
  }
};

export default function ServiceDetail() {
  const location = useLocation();
  const data = serviceData[location.pathname] || serviceData['/it-staff-augmentation'];

  return (
    <motion.div initial="initial" animate="animate" exit="exit" variants={pageV}>

      {/* Hero */}
      <section style={{ backgroundColor: 'var(--primary-color)', color: '#fff', padding: '160px 0 80px 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', right: 0, top: 0, width: '35%', height: '100%', background: 'rgba(255,255,255,0.05)', borderRadius: '50% 0 0 50%' }}></div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <h1 style={{ fontSize: '3.5rem', color: '#fff', marginBottom: '10px' }}>{data.title}</h1>
            <h2 style={{ fontSize: '1.5rem', color: '#FFD700', marginBottom: '20px', fontWeight: 500 }}>{data.subtitle}</h2>
            <p style={{ maxWidth: '650px', color: '#e8e8e8', fontSize: '1.15rem', lineHeight: 1.7 }}>{data.desc}</p>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section style={{ padding: '100px 0', backgroundColor: '#fff' }}>
        <div className="container">
          <motion.h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '60px' }}
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            What We Offer
          </motion.h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            {data.features.map((f, i) => (
              <motion.div key={i}
                style={{ padding: '30px', borderRadius: '15px', border: '1px solid #f0f0f0', background: '#fff', transition: 'all 0.3s' }}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.1 } } }}
                whileHover={{ y: -6, boxShadow: '0 12px 30px rgba(86,112,251,0.1)', borderColor: 'var(--primary-color)' }}
              >
                <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: '#f4f6fa', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', color: 'var(--primary-color)', fontWeight: 'bold', fontSize: '1.2rem' }}>
                  {i + 1}
                </div>
                <h3 style={{ marginBottom: '12px', fontSize: '1.15rem' }}>{f.title}</h3>
                <p style={{ color: '#666', lineHeight: 1.6 }}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section style={{ padding: '100px 0', backgroundColor: '#f4f6fa' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '60px', flexWrap: 'wrap' }}>
          <motion.div style={{ flex: '1 1 450px' }} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '30px' }}>Why Choose Us?</h2>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {data.benefits.map((b, i) => (
                <li key={i} style={{ padding: '15px 20px', marginBottom: '12px', background: '#fff', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.04)', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ color: '#22c55e', fontWeight: 'bold', fontSize: '1.2rem' }}>✓</span>
                  <span style={{ color: '#444' }}>{b}</span>
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div style={{ flex: '1 1 450px', textAlign: 'center' }} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <img src="/assets/Weybee_Technology.webp" alt="Technology" style={{ width: '100%', maxWidth: '400px', borderRadius: '20px' }} />
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 0', backgroundColor: 'var(--primary-color)', color: '#fff', textAlign: 'center' }}>
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2 style={{ color: '#fff', marginBottom: '15px', fontSize: '2rem' }}>Ready to get started?</h2>
            <p style={{ color: '#e0e0e0', marginBottom: '30px' }}>Let's discuss how we can help you achieve your goals.</p>
            <Link to="/contact-us" className="btn" style={{ padding: '14px 40px', borderRadius: '25px', background: '#fff', color: 'var(--primary-color)', fontWeight: 600 }}>Let's Talk</Link>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
