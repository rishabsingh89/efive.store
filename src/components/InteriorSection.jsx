import React from 'react';
import { Home, Briefcase, Coffee, ArrowRight } from 'lucide-react';
import { openWhatsAppInteriorInquiry } from '../whatsapp';

// Inline WhatsApp icon
function WhatsAppIcon({ size = 16 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function InteriorSection() {
  const services = [
    {
      id: 'apartment',
      name: 'Apartment Interior',
      image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80',
      description: 'Turn your apartment into a sanctuary. We craft bespoke living rooms, space-maximizing modular kitchens, and elegant bedroom retreats.',
      icon: Home,
      bullets: ['Bespoke Living', 'Modular Kitchen', 'Luxury Bedrooms', 'Custom Wardrobes'],
    },
    {
      id: 'office',
      name: 'Office Interior',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
      description: 'Boost productivity and inspire collaboration. From ergonomic desk layouts to modern executive cabins and lounge spaces.',
      icon: Briefcase,
      bullets: ['Ergonomic Desking', 'Collaboration Hubs', 'Executive Cabins', 'Lounge & Reception'],
    },
    {
      id: 'cafe-restaurant',
      name: 'Cafe Restaurant Interior',
      image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80',
      description: 'Create an unforgettable experience for your guests. We design mood lighting, theme concepts, and space-optimized seating plans.',
      icon: Coffee,
      bullets: ['Concept Branding', 'Theme Lighting', 'Space Optimizing', 'Bar & Counter Designs'],
    },
  ];

  return (
    <section style={styles.section}>
      <div className="container">
        {/* Section Header */}
        <div style={styles.header}>
          <span style={styles.tag}>TAILORED SPACE DESIGN</span>
          <h2 style={styles.title}>Luxury Interior Solutions</h2>
          <p style={styles.subtitle}>
            We design spaces that inspire. Tailored layouts, curated materials, and flawless execution for your home, workspace, or commercial venue.
          </p>
        </div>

        {/* Services Grid */}
        <div className="interior-grid">
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
              <div key={service.id} className="interior-card" style={styles.card}>
                {/* Image Wrapper */}
                <div className="interior-img-wrapper" style={styles.imageSection}>
                  <img
                    src={service.image}
                    alt={service.name}
                    style={styles.image}
                    className="interior-image"
                  />
                  <div style={styles.overlay} />
                  
                  {/* Category Float Badge */}
                  <div style={styles.badge}>
                    <IconComponent size={18} style={styles.badgeIcon} />
                  </div>
                </div>

                {/* Card Content */}
                <div style={styles.details}>
                  <h3 style={styles.cardTitle}>{service.name}</h3>
                  <p style={styles.cardDesc}>{service.description}</p>

                  {/* Bullet Tags Grid */}
                  <div style={styles.tagsContainer}>
                    {service.bullets.map((bullet) => (
                      <span key={bullet} style={styles.tagBadge}>
                        {bullet}
                      </span>
                    ))}
                  </div>

                  {/* CTA Consultation Button */}
                  <button
                    onClick={() => openWhatsAppInteriorInquiry(service.name)}
                    style={styles.ctaBtn}
                    className="interior-cta-btn"
                  >
                    <WhatsAppIcon size={16} />
                    <span style={styles.ctaText}>Consult Design</span>
                    <ArrowRight size={14} className="arrow-icon" style={styles.arrow} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Hover & Responsiveness Styles */}
      <style>{`
        .interior-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2.25rem;
        }

        @media (max-width: 1024px) {
          .interior-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 2rem;
          }
        }

        @media (max-width: 768px) {
          .interior-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }

        .interior-card {
          transition: all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .interior-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 16px 36px rgba(30, 29, 27, 0.08);
          border-color: #C5A880 !important;
        }

        .interior-card:hover .interior-image {
          transform: scale(1.06);
        }

        .interior-cta-btn {
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .interior-card:hover .interior-cta-btn {
          background-color: #C5A880 !important;
          color: #ffffff !important;
          border-color: #C5A880 !important;
        }

        .interior-card:hover .arrow-icon {
          transform: translateX(4px);
        }
      `}</style>
    </section>
  );
}

const styles = {
  section: {
    padding: '5rem 0 3rem 0',
    backgroundColor: 'transparent', // Inherit lighter green background
    borderBottom: '1px solid rgba(197, 168, 128, 0.15)',
  },
  header: {
    textAlign: 'center',
    marginBottom: '3.5rem',
    maxWidth: '700px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  tag: {
    fontSize: '0.75rem',
    fontWeight: 600,
    letterSpacing: '0.2em',
    color: '#C5A880', // Matches primary-color
    marginBottom: '0.75rem',
    display: 'block',
  },
  title: {
    fontFamily: 'var(--font-heading)',
    fontSize: '2.5rem',
    fontWeight: 600,
    color: '#1E1D1B',
    marginBottom: '1rem',
    lineHeight: 1.2,
  },
  subtitle: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.95rem',
    color: '#706D67',
    lineHeight: 1.6,
  },
  card: {
    backgroundColor: '#ffffff',
    border: '1px solid #E6E2DA', // Matches border-color
    borderRadius: 'var(--radius-lg)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    height: '100%',
  },
  imageSection: {
    height: '240px',
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: '#F5F2EA', // Matches card-bg
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  },
  overlay: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(to bottom, rgba(30,29,27,0) 50%, rgba(30,29,27,0.3) 100%)',
    pointerEvents: 'none',
  },
  badge: {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    width: '38px',
    height: '38px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    zIndex: 10,
  },
  badgeIcon: {
    color: '#C5A880',
  },
  details: {
    padding: '1.75rem',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  cardTitle: {
    fontFamily: 'var(--font-heading)',
    fontSize: '1.35rem',
    fontWeight: 600,
    color: '#1E1D1B',
    marginBottom: '0.75rem',
  },
  cardDesc: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.875rem',
    color: '#706D67',
    lineHeight: 1.6,
    marginBottom: '1.25rem',
  },
  tagsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
    marginBottom: '2rem',
  },
  tagBadge: {
    fontSize: '0.75rem',
    fontWeight: 500,
    color: '#706D67',
    backgroundColor: '#F5F2EA',
    padding: '0.3rem 0.75rem',
    borderRadius: '30px',
    border: '1px solid rgba(197, 168, 128, 0.1)',
  },
  ctaBtn: {
    marginTop: 'auto',
    width: '100%',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.6rem',
    padding: '0.8rem 1.5rem',
    backgroundColor: 'transparent',
    border: '1px solid #E6E2DA',
    borderRadius: 'var(--radius-md)',
    color: '#1E1D1B',
    fontSize: '0.85rem',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    cursor: 'pointer',
  },
  ctaText: {
    fontFamily: 'var(--font-body)',
  },
  arrow: {
    transition: 'transform 0.25s ease',
  },
};
