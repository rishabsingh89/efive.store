import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar';
import Footer from '../Footer';
import SEO from '../SEO';

const helpTopics = [
  { name: 'How to Shop at EFIVE', slug: 'how-to-shop' },
  { name: 'Return Policy', slug: 'return-policy' },
  { name: 'Prices & Price Tags', slug: 'prices-and-price-tags' },
  { name: 'Contact Us', slug: 'contact-us' },
  { name: 'EFIVE FAQs', slug: 'faqs' },
  { name: 'Gift Cards', slug: 'gift-card' },
  { name: 'Terms & Conditions', slug: 'terms-and-conditions' },
  { name: 'Damaged Articles Claim', slug: 'damaged-articles-claim' },
  { name: 'GST Rate Revision', slug: 'gst-rate-revision' },
];

export default function HelpMain() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEO 
        title="Help & Support" 
        description="Get help with your EFIVE orders, returns, and find answers to frequently asked questions." 
        path="/help" 
      />
      <Navbar />
      <main style={styles.main}>
        <section style={styles.heroSection}>
          <div className="container">
            <h1 style={styles.heroTitle}>Help & Support</h1>
            <p style={styles.heroTagline}>How can we help you today?</p>
          </div>
        </section>

        <section style={styles.gridSection}>
          <div className="container" style={styles.grid}>
            {helpTopics.map((item) => (
              <Link to={`/help/${item.slug}`} key={item.slug} style={styles.card}>
                <h2 style={styles.cardTitle}>{item.name}</h2>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

const styles = {
  main: { backgroundColor: 'hsl(var(--bg-color))', minHeight: '100vh' },
  heroSection: { padding: '8rem 0 4rem', textAlign: 'center' },
  heroTitle: { fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 900, fontFamily: 'var(--font-heading)', marginBottom: '1rem' },
  heroTagline: { fontSize: '1.2rem', color: 'hsl(var(--muted-color))' },
  gridSection: { padding: '0 0 6rem' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' },
  card: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '12px',
    border: '1px solid hsl(var(--border-color))',
    textDecoration: 'none',
    color: '#000',
    transition: 'all 0.2s ease',
  },
  cardTitle: { fontSize: '1.1rem', fontWeight: 600, fontFamily: 'var(--font-heading)' },
};
