import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar';
import Footer from '../Footer';
import SEO from '../SEO';

const aboutTopics = [
  { name: 'This is EFIVE', slug: 'this-is-efive', desc: 'Our brand story and mission.' },
  { name: 'CSR Policy', slug: 'csr-policy', desc: 'How we give back to the community.' },
  { name: 'Sustainability', slug: 'sustainability', desc: 'Our commitment to the planet.' },
];

export default function AboutMain() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEO 
        title="About EFIVE" 
        description="Learn about EFIVE Studio, our sustainability efforts, and our corporate social responsibility." 
        path="/about" 
      />
      <Navbar />
      <main style={styles.main}>
        <section style={styles.heroSection}>
          <div className="container">
            <h1 style={styles.heroTitle}>About EFIVE</h1>
            <p style={styles.heroTagline}>Designing spaces, shaping comfort.</p>
          </div>
        </section>

        <section style={styles.gridSection}>
          <div className="container" style={styles.grid}>
            {aboutTopics.map((item) => (
              <Link to={`/about/${item.slug}`} key={item.slug} style={styles.card}>
                <h2 style={styles.cardTitle}>{item.name}</h2>
                <p style={styles.cardDesc}>{item.desc}</p>
                <span style={styles.cardLink}>Read More →</span>
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
