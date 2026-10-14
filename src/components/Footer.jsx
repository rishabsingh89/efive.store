import React, { useState } from 'react';
import { Mail, ArrowRight, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';
import ParticleCanvas from './ParticleCanvas';

const FooterLink = ({ to, children, style, className }) => {
  const handleClick = () => {
    try {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    } catch (e) {
      window.scrollTo(0, 0);
    }
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };
  return (
    <Link to={to} style={style} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
};

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer style={styles.footer}>
      <ParticleCanvas />
      {/* Trust Badges */}
      <div style={styles.badgeSection}>
        <div className="container" style={styles.badgeContainer}>
          <div style={styles.badgeCard}>
            <Truck size={24} style={styles.badgeIcon} />
            <div>
              <h4 style={styles.badgeTitle}>Secure Shipping</h4>
              <p style={styles.badgeText}>Fully insured doorstep delivery for all orders</p>
            </div>
          </div>
          <div style={styles.badgeCard}>
            <ShieldCheck size={24} style={styles.badgeIcon} />
            <div>
              <h4 style={styles.badgeTitle}>Extended Warranty</h4>
              <p style={styles.badgeText}>Up to 10 years warranty on select furniture</p>
            </div>
          </div>
          <div style={styles.badgeCard}>
            <RotateCcw size={24} style={styles.badgeIcon} />
            <div>
              <h4 style={styles.badgeTitle}>Flexible Returns</h4>
              <p style={styles.badgeText}>Hassle-free replacement if damaged in transit</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="container" style={styles.mainContainer}>
        <div style={styles.grid}>
          {/* Brand Info */}
          <div style={styles.brandCol}>
            <h3 style={styles.footerLogo}>EFIVE STUDIO</h3>
            <p style={styles.brandDesc}>
              Designing spaces, shaping comfort. Efive Studio curates high-end modular furniture and aesthetic home decor tailored for modern living.
            </p>
            
            <div style={styles.contactSection}>
              <h4 style={styles.contactTitle}>Contact Us</h4>
              <div style={styles.socialIcons}>
                <a href="#" className="social-icon" style={styles.iconLink} aria-label="Instagram">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                </a>
                <a href="#" className="social-icon" style={styles.iconLink} aria-label="Facebook">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </a>
                <a href="#" className="social-icon" style={styles.iconLink} aria-label="LinkedIn">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                </a>
                <a href="#" className="social-icon" style={styles.iconLink} aria-label="WhatsApp">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"/></svg>
                </a>
              </div>
            </div>
          </div>

          {/* Links Column 1: Collections */}
          <div style={styles.linksCol}>
            <FooterLink to="/collections" style={{textDecoration: 'none'}}><h4 style={styles.colTitle}>Collections</h4></FooterLink>
            <ul style={styles.linksList}>
              <li><FooterLink to="/collections/luxury-living-room" style={styles.linkItem}>Luxury Living Room</FooterLink></li>
              <li><FooterLink to="/collections/ergonomic-office-desks" style={styles.linkItem}>Ergonomic Office Desks</FooterLink></li>
              <li><FooterLink to="/collections/premium-dining-tables" style={styles.linkItem}>Premium Dining Tables</FooterLink></li>
              <li><FooterLink to="/collections/elegant-bedroom-furniture" style={styles.linkItem}>Elegant Bedroom Furniture</FooterLink></li>
              <li><FooterLink to="/collections/modern-accent-furniture" style={styles.linkItem}>Modern Accent Furniture</FooterLink></li>
            </ul>
          </div>

          {/* Links Column 2: Services */}
          <div style={styles.linksCol}>
            <FooterLink to="/services" style={{textDecoration: 'none'}}><h4 style={styles.colTitle}>Services</h4></FooterLink>
            <ul style={styles.linksList}>
              <li><FooterLink to="/services/delivery" style={styles.linkItem}>Delivery Services</FooterLink></li>
              <li><FooterLink to="/services/click-and-collect" style={styles.linkItem}>Click & Collect</FooterLink></li>
              <li><FooterLink to="/services/online-planning" style={styles.linkItem}>Online Planning Tool</FooterLink></li>
              <li><FooterLink to="/services/assembly" style={styles.linkItem}>Assembly Services</FooterLink></li>
              <li><FooterLink to="/services/measuring" style={styles.linkItem}>Measuring Service</FooterLink></li>
              <li><FooterLink to="/services/kitchen-planning" style={styles.linkItem}>Kitchen Planning</FooterLink></li>
              <li><FooterLink to="/services/installation" style={styles.linkItem}>Installation Service</FooterLink></li>
              <li><FooterLink to="/services/customer-service" style={styles.linkItem}>Customer Service</FooterLink></li>
              <li><FooterLink to="/services/recycle-program" style={styles.linkItem}>Recycle Program</FooterLink></li>
            </ul>
          </div>

          {/* Links Column 3: Help */}
          <div style={styles.linksCol}>
            <FooterLink to="/help" style={{textDecoration: 'none'}}><h4 style={styles.colTitle}>Help</h4></FooterLink>
            <ul style={styles.linksList}>
              <li><FooterLink to="/help/how-to-shop" style={styles.linkItem}>How to Shop</FooterLink></li>
              <li><FooterLink to="/help/return-policy" style={styles.linkItem}>Return Policy</FooterLink></li>
              <li><FooterLink to="/help/prices-and-price-tags" style={styles.linkItem}>Prices & Price Tags</FooterLink></li>
              <li><FooterLink to="/contact" style={styles.linkItem}>Contact Us</FooterLink></li>
              <li><FooterLink to="/help/faqs" style={styles.linkItem}>FAQs</FooterLink></li>
              <li><FooterLink to="/help/gift-card" style={styles.linkItem}>Gift Card</FooterLink></li>
              <li><FooterLink to="/help/terms-and-conditions" style={styles.linkItem}>Terms & Conditions</FooterLink></li>
              <li><FooterLink to="/help/damaged-articles-claim" style={styles.linkItem}>Damaged Articles Claim</FooterLink></li>
              <li><FooterLink to="/help/gst-rate-revision" style={styles.linkItem}>GST Rate Revision</FooterLink></li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div style={styles.newsletterCol}>
            <h4 style={styles.colTitle}>The Efive Journal</h4>
            <p style={styles.newsletterDesc}>
              Subscribe to receive preview access to new collections, design trends, and editorial inspiration.
            </p>
            {!subscribed ? (
              <form onSubmit={handleSubscribe} style={styles.form}>
                <input
                  type="email"
                  placeholder="Your Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={styles.input}
                  required
                />
                <button type="submit" style={styles.formBtn} aria-label="Subscribe">
                  <ArrowRight size={18} />
                </button>
              </form>
            ) : (
              <p style={styles.successMessage}>Thank you for subscribing to our journal.</p>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div style={styles.bottomBar}>
        <div className="container" style={styles.bottomContainer}>
          <p style={styles.copyright}>&copy; {new Date().getFullYear()} Efive Studio Home Decor. All rights reserved.</p>
          <div style={styles.bottomLinks}>
            <FooterLink to="/help/privacy-policy" style={{...styles.bottomLink, textDecoration: 'none'}}>Privacy Policy</FooterLink>
            <FooterLink to="/help/terms-of-service" style={{...styles.bottomLink, textDecoration: 'none'}}>Terms of Service</FooterLink>
            <FooterLink to="/help/care-instructions" style={{...styles.bottomLink, textDecoration: 'none'}}>Care Instructions</FooterLink>
          </div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        .social-icon:hover {
          background-color: hsl(var(--primary-color)) !important;
          color: #fff !important;
          transform: translateY(-3px);
          border-color: hsl(var(--primary-color)) !important;
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        }
      `}} />
    </footer>
  );
}

const styles = {
  footer: {
    backgroundColor: '#1E1D1B',
    color: '#E6E2DA',
    paddingTop: '3rem',
    marginTop: '5rem',
    borderTop: '1px solid hsl(var(--border-color))',
    position: 'relative',
    overflow: 'hidden',
  },
  badgeSection: {
    borderBottom: '1px solid rgba(230, 226, 218, 0.1)',
    paddingBottom: '2.5rem',
  },
  badgeContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '2rem',
  },
  badgeCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    flex: '1 1 300px',
  },
  badgeIcon: {
    color: 'hsl(var(--primary-color))',
    flexShrink: 0,
  },
  badgeTitle: {
    fontFamily: 'var(--font-heading)',
    fontSize: '1.05rem',
    fontWeight: 500,
    color: '#fff',
    marginBottom: '0.2rem',
  },
  badgeText: {
    fontSize: '0.8rem',
    color: '#b0aca2',
    lineHeight: 1.4,
  },
  mainContainer: {
    paddingTop: '4rem',
    paddingBottom: '4rem',
  },
  grid: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '3rem',
  },
  brandCol: {
    flex: '1 1 300px',
  },
  footerLogo: {
    fontFamily: 'var(--font-heading)',
    fontSize: '1.6rem',
    fontWeight: 700,
    letterSpacing: '0.08em',
    color: '#fff',
    marginBottom: '1.2rem',
  },
  brandDesc: {
    fontSize: '0.9rem',
    color: '#b0aca2',
    lineHeight: 1.6,
    marginBottom: '1.5rem',
  },
  contactSection: {
    marginTop: '2rem',
  },
  contactTitle: {
    fontFamily: 'var(--font-heading)',
    fontSize: '1.1rem',
    fontWeight: 500,
    color: '#fff',
    marginBottom: '1rem',
    letterSpacing: '0.02em',
  },
  socialIcons: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'center',
  },
  iconLink: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
    backgroundColor: '#2b2a28',
    color: '#E6E2DA',
    borderRadius: '8px',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    border: '1px solid rgba(230, 226, 218, 0.1)',
  },
  linksCol: {
    flex: '1 1 180px',
  },
  colTitle: {
    fontFamily: 'var(--font-heading)',
    fontSize: '1.1rem',
    fontWeight: 500,
    color: '#fff',
    marginBottom: '1.5rem',
    letterSpacing: '0.02em',
  },
  linksList: {
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.8rem',
  },
  linkItem: {
    fontSize: '0.85rem',
    color: '#b0aca2',
    cursor: 'pointer',
    transition: 'var(--transition-smooth)',
    textDecoration: 'none',
  },
  newsletterCol: {
    flex: '1 1 300px',
  },
  newsletterDesc: {
    fontSize: '0.9rem',
    color: '#b0aca2',
    lineHeight: 1.6,
    marginBottom: '1.2rem',
  },
  form: {
    display: 'flex',
    position: 'relative',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    padding: '0.75rem 3rem 0.75rem 1rem',
    backgroundColor: '#2b2a28',
    border: '1px solid rgba(230, 226, 218, 0.15)',
    color: '#fff',
    borderRadius: '4px',
    fontSize: '0.85rem',
    outline: 'none',
  },
  formBtn: {
    position: 'absolute',
    right: '2px',
    height: 'calc(100% - 4px)',
    width: '40px',
    backgroundColor: 'hsl(var(--primary-color))',
    border: 'none',
    borderRadius: '2px',
    color: '#fff',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'var(--transition-smooth)',
  },
  successMessage: {
    fontSize: '0.85rem',
    color: 'hsl(var(--primary-color))',
    fontWeight: 500,
  },
  bottomBar: {
    borderTop: '1px solid rgba(230, 226, 218, 0.08)',
    padding: '1.5rem 0',
    backgroundColor: '#161514',
  },
  bottomContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '1rem',
  },
  copyright: {
    fontSize: '0.8rem',
    color: '#7a766e',
  },
  bottomLinks: {
    display: 'flex',
    gap: '1.5rem',
  },
  bottomLink: {
    fontSize: '0.8rem',
    color: '#7a766e',
    cursor: 'pointer',
  },
};
