import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import './index.css';

// Context
import { AuthProvider } from './context/AuthContext';
import { TrackingProvider } from './context/TrackingContext';
import { EditProvider } from './context/EditContext';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import SectionEditorModal from './components/SectionEditorModal';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Careers from './pages/Careers';
import ServiceDetail from './pages/ServiceDetail';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import SuccessStories from './pages/SuccessStories';

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/it-staff-augmentation" element={<ServiceDetail />} />
        <Route path="/it-services-for-startups" element={<ServiceDetail />} />
        <Route path="/software-development-services" element={<ServiceDetail />} />
        <Route path="/data-engineering" element={<ServiceDetail />} />
        <Route path="/success-stories" element={<SuccessStories />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </AnimatePresence>
  );
}

function AppContent() {
  const location = useLocation();
  const hideNavFooter = location.pathname === '/login' || location.pathname === '/admin';

  return (
    <div className="App">
      <ScrollToTop />
      {!hideNavFooter && <Navbar />}
      <AnimatedRoutes />
      {!hideNavFooter && <Footer />}
      <SectionEditorModal />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <TrackingProvider>
          <EditProvider>
            <AppContent />
          </EditProvider>
        </TrackingProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
