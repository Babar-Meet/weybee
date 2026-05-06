import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const { user, isAdmin, isManager, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const linkColor = scrolled ? '#333' : '#fff';
  const activeColor = scrolled ? '#5670FB' : '#FFD700';

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  // Check if current path matches nav item
  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  // Service sub-routes
  const serviceRoutes = ['/it-staff-augmentation', '/it-services-for-startups', '/software-development-services', '/data-engineering'];
  const isServiceActive = isActive('/services') || serviceRoutes.some(r => location.pathname === r);

  const navItems = [
    { to: '/', label: 'Home' },
    { to: '/about-us', label: 'About us' },
    { to: '/services', label: 'Services', hasDropdown: true },
    { to: '/success-stories', label: 'Success Stories' },
    { to: '/careers', label: 'Careers' },
    { to: '/contact-us', label: 'Contact' },
  ];

  const NavLink = ({ to, label, hasDropdown }) => {
    const active = hasDropdown ? isServiceActive : isActive(to);
    
    const content = (
      <span style={{
        color: active ? activeColor : linkColor,
        fontFamily: 'var(--font-heading)',
        fontWeight: 600,
        fontSize: '15px',
        transition: 'color 0.3s',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '3px'
      }}>
        {/* Arrow indicator only on ACTIVE page */}
        {active && <span style={{ color: activeColor, fontSize: '12px' }}>❯</span>}
        {label}
      </span>
    );

    if (hasDropdown) {
      return (
        <li
          style={{ position: 'relative' }}
          onMouseEnter={() => setServicesOpen(true)}
          onMouseLeave={() => setServicesOpen(false)}
        >
          <span onClick={() => navigate(to)}>{content}</span>

          {/* Dropdown */}
          <div style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            backgroundColor: '#fff',
            minWidth: '270px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.12)',
            borderRadius: '10px',
            padding: '8px 0',
            opacity: servicesOpen ? 1 : 0,
            visibility: servicesOpen ? 'visible' : 'hidden',
            transform: servicesOpen ? 'translateY(8px)' : 'translateY(18px)',
            transition: 'all 0.3s ease',
            zIndex: 999
          }}>
            {[
              { to: '/it-staff-augmentation', label: 'IT Staff Augmentation' },
              { to: '/it-services-for-startups', label: 'IT Services for Startups' },
              { to: '/software-development-services', label: 'Software Development Services' },
              { to: '/data-engineering', label: 'Data Engineering' }
            ].map(item => (
              <Link key={item.to} to={item.to}
                style={{
                  display: 'block',
                  padding: '12px 24px',
                  color: location.pathname === item.to ? activeColor : '#333',
                  fontSize: '14px',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: location.pathname === item.to ? 600 : 500,
                  transition: 'all 0.2s',
                  borderLeft: location.pathname === item.to ? `3px solid ${activeColor}` : '3px solid transparent'
                }}
                onMouseEnter={e => { e.target.style.backgroundColor = '#f4f6fa'; e.target.style.color = activeColor; }}
                onMouseLeave={e => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = location.pathname === item.to ? activeColor : '#333'; }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </li>
      );
    }

    return <li><Link to={to}>{content}</Link></li>;
  };

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      width: '100%',
      zIndex: 1000,
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
            {navItems.map(item => <NavLink key={item.to} {...item} />)}

            {/* Auth */}
            {!user ? (
              <li>
                <Link to="/login" style={{
                  color: isActive('/login') ? activeColor : linkColor,
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 600,
                  fontSize: '15px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '3px'
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
          padding: '10px 28px',
          fontSize: '14px',
          fontWeight: 600,
          backgroundColor: scrolled ? activeColor : '#fff',
          color: scrolled ? '#fff' : activeColor,
          borderRadius: '25px',
          border: 'none',
          transition: 'all 0.3s'
        }}>
          Let's Talk
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
