import React from 'react';

const features = [
  {
    id: 1,
    icon: '🚀',
    title: 'New Generation',
    desc: "Furniture designed for today's modern lifestyle with smart aesthetics.",
  },
  {
    id: 2,
    icon: '⚡',
    title: 'Fast Delivery',
    desc: 'Quick, reliable, and hassle-free delivery to your doorstep.',
  },
  {
    id: 3,
    icon: '🛠️',
    title: '15 Min Assemble',
    desc: 'Simple tool-free setup that absolutely anyone can assemble.',
  },
  {
    id: 4,
    icon: '♻️',
    title: 'Re-sell to us',
    desc: 'Sell back to Efive.Store after use and upgrade anytime.',
    badge: 'Smart Investment',
    isPremium: true,
  },
];

export default function WhyChooseUs() {
  return (
    <section style={styles.section}>
      <div className="container" style={styles.grid}>
        <div style={styles.textContent}>
          <span style={styles.tag}>WHY CHOOSE EFIVE.STORE</span>
          <h2 style={styles.title}>Designed for modern living.</h2>
          <p style={styles.subtitle}>
            Built for comfort, speed, and flexibility. We combine smart aesthetics with maximum comfort to fit your modern lifestyle.
          </p>
        </div>
        <div style={styles.cardsContainer}>
          {features.map((feature) => (
            <div 
              key={feature.id} 
              style={{
                ...styles.card,
                ...(feature.isPremium ? styles.premiumCard : {})
              }}
              className="why-choose-card"
            >
              {feature.badge && (
                <div style={styles.badge}>{feature.badge}</div>
              )}
              <span style={styles.icon}>{feature.icon}</span>
              <h3 style={styles.cardTitle}>{feature.title}</h3>
              <p style={styles.cardDesc}>{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .why-choose-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .why-choose-card:hover {
          transform: translateY(-4px);
          border-color: hsl(var(--primary-color)) !important;
          box-shadow: var(--shadow-md) !important;
        }
      `}} />
    </section>
  );
}

const styles = {
  section: {
    backgroundColor: 'hsl(var(--card-bg))',
    padding: '5rem 0',
    borderTop: '1px solid hsl(var(--border-color))',
    borderBottom: '1px solid hsl(var(--border-color))',
  },
  grid: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '4rem',
    alignItems: 'center',
  },
  textContent: { 
    flex: '1 1 400px' 
  },
  tag: {
    fontSize: '0.75rem',
    fontWeight: 600,
    letterSpacing: '0.2em',
    color: 'hsl(var(--primary-color))',
    marginBottom: '1rem',
    display: 'block',
  },
  title: {
    fontSize: '2.5rem',
    lineHeight: 1.2,
    fontWeight: 500,
    color: 'hsl(var(--text-color))',
    marginBottom: '1.5rem',
  },
  subtitle: {
    fontSize: '1rem',
    lineHeight: 1.7,
    color: 'hsl(var(--muted-color))',
    marginBottom: '2rem',
    fontWeight: 300,
  },
  cardsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1.5rem',
    flex: '1 1 500px',
  },
  card: {
    backgroundColor: '#fff',
    padding: '2rem 1.5rem',
    borderRadius: 'var(--radius-md)',
    border: '1px solid hsl(var(--border-color))',
    textAlign: 'center',
    boxShadow: 'var(--shadow-sm)',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  premiumCard: {
    border: '1px solid hsl(var(--primary-color))',
    backgroundColor: 'rgba(197, 168, 128, 0.03)',
  },
  badge: {
    position: 'absolute',
    top: '-12px',
    background: 'hsl(var(--primary-color))',
    color: '#fff',
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '0.7rem',
    fontWeight: 600,
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
  },
  icon: {
    display: 'block',
    fontSize: '2rem',
    marginBottom: '1rem',
  },
  cardTitle: {
    fontSize: '1.1rem',
    fontWeight: 600,
    fontFamily: 'var(--font-heading)',
    color: 'hsl(var(--text-color))',
    marginBottom: '0.5rem',
  },
  cardDesc: {
    fontSize: '0.85rem',
    color: 'hsl(var(--muted-color))',
    lineHeight: 1.5,
  },
};
