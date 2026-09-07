import React from 'react';

const features = [
  {
    id: 1,
    icon: '🚀',
    title: 'Made for new Generation',
    desc: "Furniture designed for today's modern lifestyle with smart aesthetics.",
  },
  {
    id: 2,
    icon: '⚡',
    title: 'Fastest Delivery',
    desc: 'Quick, reliable, and hassle-free delivery to your doorstep.',
  },
  {
    id: 3,
    icon: '🛠️',
    title: 'D.I.Y Assemble in 15 min',
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
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          transform-style: preserve-3d;
          transform: perspective(1000px) translateZ(0) translateY(0) scale(1);
          background: linear-gradient(145deg, #ffffff, #f9f9f9) !important;
          z-index: 1;
        }
        .why-choose-card:hover {
          transform: perspective(1000px) translateZ(40px) translateY(-12px) scale(1.05);
          border-color: hsl(var(--primary-color)) !important;
          box-shadow: 0 30px 60px rgba(0,0,0,0.12), 0 10px 20px rgba(0,0,0,0.08) !important;
          background: #ffffff !important;
          z-index: 10;
        }
        .why-choose-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          border-radius: inherit;
          box-shadow: inset 0 0 0 1px rgba(255,255,255,0.5);
          pointer-events: none;
        }
      `}} />
    </section>
  );
}

const styles = {
  section: {
    backgroundColor: 'hsl(var(--bg-color))',
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
    flex: '1 1 400px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  tag: {
    fontSize: '1.1rem',
    fontWeight: 900,
    letterSpacing: '0.2em',
    color: '#000',
    marginBottom: '1.5rem',
    display: 'inline-block',
    padding: '0.7rem 1.5rem',
    backgroundColor: 'rgba(0, 0, 0, 0.06)',
    borderRadius: '100px',
    border: '2px solid rgba(0, 0, 0, 0.15)',
  },
  title: {
    fontSize: '3.5rem',
    lineHeight: 1.15,
    fontWeight: 700,
    color: 'hsl(var(--text-color))',
    marginBottom: '1.5rem',
    letterSpacing: '-0.02em',
  },
  subtitle: {
    fontSize: '1.15rem',
    lineHeight: 1.7,
    color: 'hsl(var(--muted-color))',
    marginBottom: '2.5rem',
    fontWeight: 400,
    maxWidth: '95%',
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
