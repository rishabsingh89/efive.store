import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar';
import Footer from '../Footer';
import SEO from '../SEO';

const collections = [
  { name: 'Luxury Living Room', slug: 'luxury-living-room', desc: 'Where Comfort Meets Elegance' },
  { name: 'Ergonomic Office Desks', slug: 'ergonomic-office-desks', desc: 'Work Smarter, Not Harder' },
  { name: 'Premium Dining Tables', slug: 'premium-dining-tables', desc: 'Where Family Comes Together' },
  { name: 'Elegant Bedroom Furniture', slug: 'elegant-bedroom-furniture', desc: 'Rest Like Royalty' },
  { name: 'Modern Accent Furniture', slug: 'modern-accent-furniture', desc: 'Small Pieces, Big Impact' },
];

export default function CollectionsMain() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEO 
        title="Furniture Collections" 
        description="Explore EFIVE Studio's premium furniture collections for your living room, bedroom, office, and dining space." 
        path="/collections" 
      />
      <Navbar />
      <main style={styles.main}>
        <section style={styles.heroSection}>
          <div className="container">
            <h1 style={styles.heroTitle}>Our Collections</h1>
            <p style={styles.heroTagline}>Discover premium design for every room in your home.</p>
          </div>
        </section>

        <section style={styles.gridSection}>
          <div className="container" style={styles.grid}>
            {collections.map((item) => (
              <Link to={`/collections/${item.slug}`} key={item.slug} style={styles.card}>
                <h2 style={styles.cardTitle}>{item.name}</h2>
                <p style={styles.cardDesc}>{item.desc}</p>
                <span style={styles.cardLink}>Explore Collection →</span>
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
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' },
  card: {
    backgroundColor: 'hsl(var(--surface-color))',
    padding: '2.5rem',
    borderRadius: '16px',
    border: '1px solid hsl(var(--border-color))',
    textDecoration: 'none',
    color: 'inherit',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    display: 'flex',
    flexDirection: 'column',
  },
  cardTitle: { fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.8rem', fontFamily: 'var(--font-heading)' },
  cardDesc: { fontSize: '1rem', color: '#555', marginBottom: '2rem', flexGrow: 1 },
  cardLink: { color: 'hsl(var(--primary-color))', fontWeight: 700, fontSize: '0.95rem' }
};
