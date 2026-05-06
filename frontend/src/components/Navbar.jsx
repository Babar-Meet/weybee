import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const servicesMenu = [
  {
    to: '/it-staff-augmentation', label: 'IT Staff Augmentation',
    children: [
      { to: '/it-staff-augmentation', label: 'Hire Developers' },
      { to: '/it-staff-augmentation', label: 'Hire QA Engineers' },
      { to: '/it-staff-augmentation', label: 'Hire Managed Team' }
    ]
  },
  {
    to: '/it-services-for-startups', label: 'IT Services for Startups',
    children: [
      { to: '/it-services-for-startups', label: 'MVP Development' },
      { to: '/it-services-for-startups', label: 'End to End Tech Support' }
    ]
  },
  {
    to: '/software-development-services', label: 'Software Development Services',
    children: [
      { to: '/software-development-services', label: 'Web Development' },
      { to: '/software-development-services', label: 'eCommerce Development' },
      { to: '/software-development-services', label: 'Customized Software Development' },
      { to: '/software-development-services', label: 'Software Project Management' },
      { to: '/software-development-services', label: 'Platform Engineering' },
      { to: '/software-development-services', label: 'Mobile App Development' }
    ]
  },
  {
    to: '/data-engineering', label: 'Data Engineering',
    children: [
      { to: '/data-engineering', label: 'Data Scraping' },
      { to: '/data-engineering', label: 'AI-ML Engineering' }
    ]
  }
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [activeService, setActiveService] = useState(null);
  const { user, isAdmin, isManager, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setServicesOpen(false);
    setActiveService(null);
  }, [location.pathname]);

  const linkColor = scrolled ? '#333' : '#fff';
  const activeColor = scrolled ? '#5670FB' : '#FFD700';

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const serviceRoutes = servicesMenu.map(s => s.to);
  const isServiceActive = isActive('/services') || serviceRoutes.some(r => location.pathname === r);

  const NavLink = ({ to, label }) => {
    const active = isActive(to);
    return (
      <li>
        <Link to={to} style={{
          color: active ? activeColor : linkColor,
          fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '15px',
          transition: 'color 0.3s', display: 'flex', alignItems: 'center', gap: '3px'
        }}>
          {active && <span style={{ color: activeColor, fontSize: '12px' }}>❯</span>}
          {label}
        </Link>
      </li>
    );
  };

  return (
    <header style={{
      position: 'fixed', top: 0, width: '100%', zIndex: 1000,
      transition: 'all 0.35s ease',
      backgroundColor: scrolled ? '#ffffff' : 'transparent',
      boxShadow: scrolled ? '0 2px 12px rgba(0,0,0,0.08)' : 'none',
      padding: scrolled ? '10px 0' : '15px 0'
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

        {/* Logo */}
        <Link to="/">
          <img
            src={scrolled ? "/assets/WeyBee-sticky-logo.png" : "/assets/WeyBee.png"}
            alt="WeyBee Logo"
            style={{ height: '40px', filter: scrolled ? 'none' : 'brightness(0) invert(1)', transition: 'all 0.3s' }}
          />
        </Link>

        {/* Nav */}
        <nav>
          <ul style={{ display: 'flex', gap: '26px', listStyle: 'none', margin: 0, padding: 0, alignItems: 'center' }}>
            <NavLink to="/" label="Home" />
            <NavLink to="/about-us" label="About us" />

            {/* Services Mega Dropdown */}
            <li
              style={{ position: 'relative' }}
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => { setServicesOpen(false); setActiveService(null); }}
              ref={dropdownRef}
            >
              <span
                onClick={() => navigate('/services')}
                style={{
                  color: isServiceActive ? activeColor : linkColor,
                  fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '15px',
                  transition: 'color 0.3s', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '3px'
                }}
              >
                {isServiceActive && <span style={{ color: activeColor, fontSize: '12px' }}>❯</span>}
                Services
              </span>

              {/* Mega Dropdown */}
              <div style={{
                position: 'absolute', top: '100%', left: 0,
                display: 'flex', gap: 0,
                opacity: servicesOpen ? 1 : 0,
                visibility: servicesOpen ? 'visible' : 'hidden',
                transform: servicesOpen ? 'translateY(8px)' : 'translateY(18px)',
                transition: 'all 0.3s ease', zIndex: 999
              }}>
                {/* Left column - services */}
                <div style={{
                  backgroundColor: '#fff', minWidth: '280px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.12)', borderRadius: '10px 0 0 10px',
                  padding: '12px 0'
                }}>
                  {servicesMenu.map((service, i) => (
                    <div
                      key={i}
                      onMouseEnter={() => setActiveService(i)}
                      style={{ position: 'relative' }}
                    >
                      <Link to={service.to} style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        padding: '14px 24px', color: activeService === i ? '#5670FB' : '#333',
                        fontSize: '14px', fontFamily: 'var(--font-heading)', fontWeight: activeService === i ? 600 : 500,
                        transition: 'all 0.2s',
                        backgroundColor: activeService === i ? '#f4f6fa' : 'transparent',
                        borderLeft: location.pathname === service.to ? '3px solid #5670FB' : '3px solid transparent'
                      }}>
                        {activeService === i && <span style={{ color: '#5670FB', fontSize: '11px', marginRight: '6px' }}>❯</span>}
                        {service.label}
                      </Link>
                    </div>
                  ))}
                </div>

                {/* Right column - sub-items */}
                {activeService !== null && servicesMenu[activeService].children && (
                  <div style={{
                    backgroundColor: '#fff', minWidth: '240px',
                    boxShadow: '10px 10px 30px rgba(0,0,0,0.08)', borderRadius: '0 10px 10px 0',
                    padding: '12px 0', borderLeft: '1px solid #f0f0f0'
                  }}>
                    {servicesMenu[activeService].children.map((child, j) => (
                      <Link key={j} to={child.to} style={{
                        display: 'block', padding: '12px 24px', color: '#333',
                        fontSize: '14px', fontFamily: 'var(--font-heading)', fontWeight: 500,
                        transition: 'all 0.2s'
                      }}
                        onMouseEnter={e => { e.target.style.backgroundColor = '#f4f6fa'; e.target.style.color = '#5670FB'; }}
                        onMouseLeave={e => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = '#333'; }}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </li>

            <NavLink to="/success-stories" label="Success Stories" />
            <NavLink to="/careers" label="Careers" />
            <NavLink to="/contact-us" label="Contact" />

            {/* Auth */}
            {!user ? (
              <li>
                <Link to="/login" style={{
                  color: isActive('/login') ? activeColor : linkColor,
                  fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '15px',
                  display: 'flex', alignItems: 'center', gap: '3px'
                }}>
                  {isActive('/login') && <span style={{ color: activeColor, fontSize: '12px' }}>❯</span>}
                  Login
                </Link>
              </li>
            ) : (
              <>
                {(isAdmin || isManager) && (
                  <li>
                    <Link to="/admin" style={{ color: linkColor, fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '15px' }}>
                      {isActive('/admin') && <span style={{ color: activeColor, fontSize: '12px', marginRight: '3px' }}>❯</span>}
                      Dashboard
                    </Link>
                  </li>
                )}
                <li>
                  <span onClick={handleLogout} style={{ color: linkColor, fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '15px', cursor: 'pointer' }}>
                    Logout
                  </span>
                </li>
              </>
            )}
          </ul>
        </nav>

        {/* CTA */}
        <Link to="/contact-us" className="btn" style={{
          padding: '10px 28px', fontSize: '14px', fontWeight: 600,
          backgroundColor: scrolled ? activeColor : '#fff',
          color: scrolled ? '#fff' : activeColor,
          borderRadius: '25px', border: 'none', transition: 'all 0.3s'
        }}>
          Let's Talk
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
