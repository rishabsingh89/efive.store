import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const isPopNavigation = useRef(false);

  // Track browser back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      isPopNavigation.current = true;
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    if (isPopNavigation.current) {
      // Don't force scroll to top on browser Back/Forward
      isPopNavigation.current = false;
      return;
    }
    
    const scrollToTop = () => {
      try {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      } catch (e) {
        window.scrollTo(0, 0);
      }
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    // Force immediate scroll for forward navigation
    scrollToTop();
    
    // Fallback for cases where layout needs a tick to settle
    // Using a slightly longer timeout for React 18 / heavy DOMs
    const timerId = setTimeout(() => {
      scrollToTop();
    }, 100);

    return () => clearTimeout(timerId);
  }, [pathname]);

  return null;
}
