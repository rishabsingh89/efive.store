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
    // Force immediate scroll for forward navigation
    window.scrollTo(0, 0);
    // Fallback for cases where layout needs a tick to settle
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
  }, [pathname]);

  return null;
}
