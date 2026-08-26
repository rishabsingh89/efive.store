import React, { useState } from 'react';
import { Mail, ArrowRight, ShieldCheck, Truck, RotateCcw } from 'lucide-react';

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
            <p style={styles.contactInfo}>
              <strong>Email:</strong> bespoke@efivestudio.com <br />
              <strong>Phone:</strong> 1800 209 5555
            </p>
          </div>

          {/* Links Column 1 */}
          <div style={styles.linksCol}>
            <h4 style={styles.colTitle}>Collections</h4>
            <ul style={styles.linksList}>
              <li><span style={styles.linkItem}>Luxury Living Room</span></li>
              <li><span style={styles.linkItem}>Ergonomic Office Desks</span></li>
              <li><span style={styles.linkItem}>Premium Dining Tables</span></li>
              <li><span style={styles.linkItem}>Modular Wardrobes</span></li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div style={styles.linksCol}>
            <h4 style={styles.colTitle}>Services</h4>
            <ul style={styles.linksList}>
              <li><span style={styles.linkItem}>Interior Styling Consultation</span></li>
              <li><span style={styles.linkItem}>Custom Furniture Design</span></li>
              <li><span style={styles.linkItem}>Virtual Room Planner</span></li>
              <li><span style={styles.linkItem}>Store Locations</span></li>
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
            <span style={styles.bottomLink}>Privacy Policy</span>
            <span style={styles.bottomLink}>Terms of Service</span>
            <span style={styles.bottomLink}>Care Instructions</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    backgroundColor: '#1E1D1B', // Warm luxury dark charcoal
    color: '#E6E2DA', // Off-white/beige text
    paddingTop: '3rem',
    marginTop: '5rem',
    borderTop: '1px solid hsl(var(--border-color))',
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
  contactInfo: {
    fontSize: '0.85rem',
    lineHeight: 1.6,
    color: '#b0aca2',
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
