import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar';
import Footer from '../Footer';
import SEO from '../SEO';

const services = [
  { name: 'Delivery Services', slug: 'delivery' },
  { name: 'Click & Collect', slug: 'click-and-collect' },
  { name: 'Online Planning Tool', slug: 'online-planning' },
  { name: 'Assembly Services', slug: 'assembly' },
  { name: 'Measuring Service', slug: 'measuring' },
  { name: 'Kitchen Planning', slug: 'kitchen-planning' },
  { name: 'Installation Service', slug: 'installation' },
  { name: 'Customer Service', slug: 'customer-service' },
  { name: 'Recycle Program', slug: 'recycle-program' },
];

export default function ServicesMain() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEO 
        title="EFIVE Services" 
        description="Discover the range of services offered by EFIVE Studio including delivery, assembly, and kitchen planning." 
        path="/services" 
      />
      <Navbar />
      <main style={styles.main}>
        <section style={styles.heroSection}>
          <div className="container">
            <h1 style={styles.heroTitle}>Our Services</h1>
            <p style={styles.heroTagline}>Everything you need for a seamless furniture experience.</p>
          </div>
        </section>

        <section style={styles.gridSection}>
          <div className="container" style={styles.grid}>
            {services.map((item) => (
              <Link to={`/services/${item.slug}`} key={item.slug} style={styles.card}>
                <h2 style={styles.cardTitle}>{item.name}</h2>
                <span style={styles.cardLink}>Learn More →</span>
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
    backgroundColor: 'hsl(var(--surface-color))',
    padding: '2rem',
    borderRadius: '16px',
    border: '1px solid hsl(var(--border-color))',
    textDecoration: 'none',
    color: 'inherit',
    transition: 'all 0.3s ease',
  },
  cardTitle: { fontSize: '1.3rem', fontWeight: 700, marginBottom: '1.5rem', fontFamily: 'var(--font-heading)' },
  cardLink: { color: 'hsl(var(--primary-color))', fontWeight: 600, fontSize: '0.95rem' }
};
