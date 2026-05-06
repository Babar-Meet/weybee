import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Centralized services menu data
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

// Sub-item with ❯ arrow on hover
const SubItem = ({ to, label }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <Link to={to}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: '8px',
        padding: '11px 22px',
        color: hovered ? '#5670FB' : '#444',
        fontSize: '13.5px', fontFamily: 'var(--font-heading)',
        fontWeight: hovered ? 600 : 500,
        transition: 'all 0.15s',
        backgroundColor: hovered ? '#f7f8fc' : 'transparent'
      }}
    >
      {hovered && <span style={{ color: '#5670FB', fontSize: '10px' }}>❯</span>}
      <span>{label}</span>
    </Link>
  );
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [activeService, setActiveService] = useState(null);
  const { user, isAdmin, isManager, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const closeTimer = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const handleMenuEnter = () => {
    clearTimeout(closeTimer.current);
    setServicesOpen(true);
  };

  const handleMenuLeave = () => {
    closeTimer.current = setTimeout(() => {
      setServicesOpen(false);
      setActiveService(null);
    }, 150);
  };

  const NavLink = ({ to, label }) => {
    const active = isActive(to);
    return (
      <li>
        <Link to={to} style={{
          color: active ? activeColor : linkColor,
          fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '15px',
          transition: 'color 0.3s', display: 'flex', alignItems: 'center', gap: '4px'
        }}>
          {active && <span style={{ fontSize: '11px' }}>❯</span>}
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

        <Link to="/">
          <img
            src={scrolled ? "/assets/WeyBee-sticky-logo.png" : "/assets/WeyBee.png"}
            alt="WeyBee Logo"
            style={{ height: '40px', filter: scrolled ? 'none' : 'brightness(0) invert(1)', transition: 'all 0.3s' }}
          />
        </Link>

        <nav>
          <ul style={{ display: 'flex', gap: '26px', listStyle: 'none', margin: 0, padding: 0, alignItems: 'center' }}>
            <NavLink to="/" label="Home" />
            <NavLink to="/about-us" label="About us" />

            {/* ===== Services Mega Dropdown ===== */}
            <li
              style={{ position: 'relative' }}
              onMouseEnter={handleMenuEnter}
              onMouseLeave={handleMenuLeave}
            >
              <span
                onClick={() => navigate('/services')}
                style={{
                  color: isServiceActive ? activeColor : linkColor,
                  fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '15px',
                  cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px',
                  transition: 'color 0.3s'
                }}
              >
                {isServiceActive && <span style={{ fontSize: '11px' }}>❯</span>}
                Services
              </span>

              {/* Dropdown wrapper */}
              <div style={{
                position: 'absolute', top: 'calc(100% + 4px)', left: '0', transform: `translateY(${servicesOpen ? '0' : '10px'})`,
                display: 'flex', alignItems: 'flex-start',
                opacity: servicesOpen ? 1 : 0,
                visibility: servicesOpen ? 'visible' : 'hidden',
                transition: 'all 0.25s ease',
                zIndex: 999,
                pointerEvents: servicesOpen ? 'auto' : 'none'
              }}>
                {/* Left column */}
                <div style={{
                  backgroundColor: '#fff', minWidth: '260px',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.12)', borderRadius: '12px 0 0 12px',
                  padding: '10px 0', borderRight: '1px solid #f0f0f0'
                }}>
                  {servicesMenu.map((service, i) => (
                    <Link key={i} to={service.to}
                      onMouseEnter={() => setActiveService(i)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '8px',
                        padding: '13px 22px',
                        color: activeService === i ? '#5670FB' : '#333',
                        fontSize: '14px', fontFamily: 'var(--font-heading)',
                        fontWeight: activeService === i ? 600 : 500,
                        transition: 'all 0.15s',
                        backgroundColor: activeService === i ? '#f7f8fc' : 'transparent'
                      }}
                    >
                      {activeService === i && <span style={{ color: '#5670FB', fontSize: '10px' }}>❯</span>}
                      <span>{service.label}</span>
                    </Link>
                  ))}
                </div>

                {/* Right column - sub-items */}
                <div style={{
                  backgroundColor: '#fff', minWidth: '220px',
                  boxShadow: '10px 10px 40px rgba(0,0,0,0.08)',
                  borderRadius: '0 12px 12px 0',
                  padding: '10px 0',
                  opacity: activeService !== null ? 1 : 0,
                  visibility: activeService !== null ? 'visible' : 'hidden',
                  transition: 'opacity 0.15s ease'
                }}>
                  {activeService !== null && servicesMenu[activeService]?.children?.map((child, j) => (
                    <SubItem key={j} to={child.to} label={child.label} />
                  ))}
                </div>
              </div>
            </li>

            <NavLink to="/success-stories" label="Success Stories" />
            <NavLink to="/careers" label="Careers" />
            <NavLink to="/contact-us" label="Contact" />

            {!user ? (
              <li>
                <Link to="/login" style={{
                  color: isActive('/login') ? activeColor : linkColor,
                  fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '15px',
                  display: 'flex', alignItems: 'center', gap: '4px'
                }}>
                  {isActive('/login') && <span style={{ fontSize: '11px' }}>❯</span>}
                  Login
                </Link>
              </li>
            ) : (
              <>
                {(isAdmin || isManager) && (
                  <li>
                    <Link to="/admin" style={{ color: linkColor, fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '15px' }}>
                      {isActive('/admin') && <span style={{ color: activeColor, fontSize: '11px', marginRight: '3px' }}>❯</span>}
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

        <Link to="/contact-us" className="btn" style={{
          padding: '10px 28px', fontSize: '14px', fontWeight: 600,
          backgroundColor: scrolled ? '#5670FB' : '#fff',
          color: scrolled ? '#fff' : '#5670FB',
          borderRadius: '25px', border: 'none', transition: 'all 0.3s'
        }}>
          Let's Talk
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
