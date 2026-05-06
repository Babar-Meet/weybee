import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <>
      {/* Wavy top border */}
      <div style={{ background: 'url(/assets/WeyBee-BG-footer-top-1.png) repeat-x center top', height: '30px', backgroundColor: '#1A1A1A' }}></div>

      <footer style={{ backgroundColor: '#1A1A1A', color: '#fff', padding: '50px 0 20px 0' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '40px', marginBottom: '40px' }}>
          
          {/* Company */}
          <div>
            <img src="/assets/WeyBee-Footer-Logo.png" alt="WeyBee" style={{ height: '40px', marginBottom: '20px' }} />
            <p style={{ color: '#aaa', fontSize: '14px', lineHeight: 1.7, marginBottom: '20px' }}>
              At WeyBee, we believe in the power of technology to transform businesses and shape the future. Our mission is to deliver world-class IT and software solutions.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              {['FB', 'IN', 'TW', 'IG'].map(s => (
                <a key={s} href="#" style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#333', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#aaa', fontSize: '12px', fontWeight: 600, transition: 'all 0.3s' }}
                  onMouseEnter={e => { e.target.style.background = '#5670FB'; e.target.style.color = '#fff'; }}
                  onMouseLeave={e => { e.target.style.background = '#333'; e.target.style.color = '#aaa'; }}
                >{s}</a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 style={{ color: '#fff', marginBottom: '20px', fontSize: '1rem' }}>Services</h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { to: '/it-staff-augmentation', label: 'IT Staff Augmentation' },
                { to: '/software-development-services', label: 'Software Development' },
                { to: '/it-services-for-startups', label: 'IT Services for Startups' },
                { to: '/data-engineering', label: 'Data Engineering' }
              ].map(l => (
                <li key={l.to}><Link to={l.to} style={{ color: '#aaa', fontSize: '14px', transition: 'color 0.3s' }}
                  onMouseEnter={e => e.target.style.color = '#5670FB'}
                  onMouseLeave={e => e.target.style.color = '#aaa'}
                >{l.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color: '#fff', marginBottom: '20px', fontSize: '1rem' }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { to: '/', label: 'Home' },
                { to: '/about-us', label: 'About us' },
                { to: '/services', label: 'Services' },
                { to: '/careers', label: 'Careers' },
                { to: '/contact-us', label: 'Contact' }
              ].map(l => (
                <li key={l.to}><Link to={l.to} style={{ color: '#aaa', fontSize: '14px', transition: 'color 0.3s' }}
                  onMouseEnter={e => e.target.style.color = '#5670FB'}
                  onMouseLeave={e => e.target.style.color = '#aaa'}
                >{l.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 style={{ color: '#fff', marginBottom: '20px', fontSize: '1rem' }}>Contact</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <p style={{ color: '#aaa', fontSize: '14px' }}>📞 +91 88 66 00 88 60</p>
              <p style={{ color: '#aaa', fontSize: '14px' }}>📞 +61 2 8024 5936</p>
              <a href="mailto:info@weybee.com" style={{ color: '#5670FB', fontSize: '14px' }}>📧 info@weybee.com</a>
              <p style={{ color: '#aaa', fontSize: '14px', lineHeight: 1.6 }}>📍 303, Nakshatra Heights, 150 Feet Ring Road, Rajkot, Gujarat</p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="container" style={{ borderTop: '1px solid #333', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
          <p style={{ color: '#666', fontSize: '13px' }}>Copyright 2026. WeyBee Solutions Pvt. Ltd. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '20px' }}>
            <a href="#" style={{ color: '#666', fontSize: '13px' }}>Privacy Policy</a>
            <a href="#" style={{ color: '#666', fontSize: '13px' }}>Terms of Service</a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
