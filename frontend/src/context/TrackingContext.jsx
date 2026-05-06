import { createContext, useContext, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const API = import.meta.env.VITE_API_URL || '/api';
const TrackingContext = createContext(null);

// Generate a unique session ID per browser tab
function getSessionId() {
  let sid = sessionStorage.getItem('weybee_sid');
  if (!sid) {
    sid = 'sid_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    sessionStorage.setItem('weybee_sid', sid);
  }
  return sid;
}

function getDeviceInfo() {
  return {
    screenResolution: `${window.screen.width}x${window.screen.height}`,
    language: navigator.language || navigator.userLanguage,
    platform: navigator.platform,
    referrer: document.referrer || null
  };
}

export function TrackingProvider({ children }) {
  const location = useLocation();
  const lastPage = useRef(null);
  const lastTime = useRef(Date.now());
  const locationData = useRef(null); // store location info
  const fetchedLocation = useRef(false);

  useEffect(() => {
    // Fetch real IP and location
    if (!fetchedLocation.current) {
      fetchedLocation.current = true;
      axios.get('http://ip-api.com/json/')
        .then(res => {
          if (res.data.status === 'success') {
            locationData.current = {
              clientIp: res.data.query,
              location: {
                city: res.data.city,
                region: res.data.regionName,
                country: res.data.country,
                isp: res.data.isp
              }
            };
          }
        })
        .catch(() => {});
    }
  }, []);

  // Track page views on every route change
  useEffect(() => {
    const currentPage = location.pathname;

    // Calculate time spent on previous page
    const now = Date.now();
    const duration = Math.round((now - lastTime.current) / 1000);

    // If there was a previous page, log duration
    if (lastPage.current && lastPage.current !== currentPage && duration > 0) {
      trackAction('page_view', lastPage.current, `Spent ${duration}s`, duration).catch(() => {});
    }

    // Log new page view
    trackAction('page_view', currentPage, `Viewed ${currentPage}`).catch(() => {});

    lastPage.current = currentPage;
    lastTime.current = now;
  }, [location.pathname]);

  // Track session start
  useEffect(() => {
    trackAction('session_start', location.pathname, 'Session started').catch(() => {});

    // Track session end on tab close
    const handleUnload = () => {
      const duration = Math.round((Date.now() - lastTime.current) / 1000);
      // Use sendBeacon for reliable tracking on page unload
      const data = JSON.stringify({
        sessionId: getSessionId(),
        action: 'session_end',
        page: location.pathname,
        details: `Session ended after ${duration}s on ${location.pathname}`,
        duration,
        ...getDeviceInfo(),
        ...(locationData.current || {})
      });
      navigator.sendBeacon(`${API}/track`, new Blob([data], { type: 'application/json' }));
    };

    window.addEventListener('beforeunload', handleUnload);
    return () => window.removeEventListener('beforeunload', handleUnload);
  }, []);

  const trackAction = async (action, page, details, duration) => {
    try {
      await axios.post(`${API}/track`, {
        sessionId: getSessionId(),
        action,
        page,
        details,
        duration,
        ...getDeviceInfo(),
        ...(locationData.current || {})
      });
    } catch (e) { /* silently fail */ }
  };

  return (
    <TrackingContext.Provider value={{ trackAction }}>
      {children}
    </TrackingContext.Provider>
  );
}

export function useTracking() {
  return useContext(TrackingContext);
}
