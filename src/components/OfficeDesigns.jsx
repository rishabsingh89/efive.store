import React, { useState, useEffect } from 'react';
import ProductImageMagnifier from './ProductImageMagnifier';
import { X, CheckCircle, Truck, Shield, RotateCcw, ArrowLeft, Star } from 'lucide-react';
import { openWhatsApp } from '../whatsapp';

// WhatsApp SVG Icon
function WhatsAppIcon({ size = 20 }) {
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

const OFFICE_DESIGNS = [
  {
    id: 'office-01',
    name: 'Executive Open Office Layout',
    price: 150000,
    originalPrice: 180000,
    image: '/office-001.png',
    description: 'A modern, open-plan office layout designed to boost collaboration and productivity. Features ergonomic seating and premium modular workstations.',
    features: ['Premium ergonomic chairs', 'Modular workstations', 'Acoustic partitions', 'Integrated cable management'],
    category: 'OFFICE DESIGN',
    rating: 4.8,
    reviews: 124
  },
  {
    id: 'office-02',
    name: 'Collaborative Workspace',
    price: 220000,
    originalPrice: 250000,
    image: '/office-02.png',
    description: 'Dynamic workspace featuring comfortable breakout zones, modern desks, and vibrant interior accents for creative teams.',
    features: ['Lounge seating areas', 'Whiteboard walls', 'Adjustable height desks', 'Ambient lighting'],
    category: 'OFFICE DESIGN',
    rating: 4.9,
    reviews: 89
  },
  {
    id: 'office-03',
    name: 'Premium Conference Setup',
    price: 350000,
    originalPrice: 400000,
    image: '/office-003.png',
    description: 'State-of-the-art conference room interior with luxury wooden finish, smart acoustic panels, and executive seating.',
    features: ['Solid wood conference table', 'Executive leather chairs', 'Smart acoustic panels', 'Video conferencing ready'],
    category: 'OFFICE DESIGN',
    rating: 5.0,
    reviews: 56
  },
  {
    id: 'office-04',
    name: 'Minimalist Startup Hub',
    price: 120000,
    originalPrice: 140000,
    image: '/office-03.jpeg',
    description: 'Clean, minimalist design perfect for modern startups. Maximizes natural light and utilizes space-efficient furniture.',
    features: ['Space-saving desks', 'Natural light optimization', 'Minimalist decor', 'Flexible seating'],
    category: 'OFFICE DESIGN',
    rating: 4.7,
    reviews: 210
  },
  {
    id: 'office-05',
    name: 'Luxury Manager Cabin',
    price: 180000,
    originalPrice: 210000,
    image: '/office-04.png',
    description: 'An executive cabin setup radiating authority and class, featuring premium veneer finishes and a plush visitor seating area.',
    features: ['Veneer finish executive desk', 'Plush visitor seating', 'Private storage', 'Premium ambient lighting'],
    category: 'OFFICE DESIGN',
    rating: 4.9,
    reviews: 75
  },
  {
    id: 'office-06',
    name: 'Ergonomic Team Hub',
    price: 280000,
    originalPrice: 320000,
    image: '/office-05.png',
    description: 'A robust seating arrangement for large teams with an emphasis on ergonomics, focus, and modern aesthetics.',
    features: ['High-density seating', 'Ergonomic task chairs', 'Filing cabinets', 'Focus partitions'],
    category: 'OFFICE DESIGN',
    rating: 4.6,
    reviews: 142
  },
];

export default function OfficeDesigns() {
  const [selectedDesign, setSelectedDesign] = useState(null);

  const handleWhatsApp = (design) => {
    openWhatsApp({
      productName: design.name,
      productId: design.id,
      price: design.price,
    });
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.gridTitle}>Select an Office Design</h2>
      <div className="office-designs-grid" style={styles.grid}>
        {OFFICE_DESIGNS.map((design) => (
          <div key={design.id} style={styles.card} onClick={() => setSelectedDesign(design)}>
            <div style={styles.imageContainer}>
              <img
                src={design.image}
                alt={design.name}
                style={{ width: '100%', height: '250px', objectFit: 'cover', borderRadius: '12px 12px 0 0' }}
              />
            </div>
            <div style={styles.cardInfo}>
              <h3 style={styles.cardTitle}>{design.name}</h3>
              <button 
                onClick={(e) => { e.stopPropagation(); handleWhatsApp(design); }} 
                style={styles.cardWaBtn}
              >
                <WhatsAppIcon size={16} />
                Connect on WhatsApp
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedDesign && (
        <div style={styles.overlay}>
          <div style={styles.modalPage}>
            {/* Top Bar */}
            <div style={styles.topBar}>
              <button onClick={() => setSelectedDesign(null)} style={styles.backBtn} aria-label="Go back">
                <ArrowLeft size={18} />
                <span>Back</span>
              </button>
              <div style={styles.topBarCenter}>
                <span style={styles.topBarCategory}>{selectedDesign.category}</span>
              </div>
              <button onClick={() => setSelectedDesign(null)} style={styles.closeBtn} aria-label="Close">
                <X size={20} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="office-modal-content" style={styles.modalContentWrapper}>
              <div className="office-modal-grid" style={styles.modalGrid}>
                {/* Left: Image with Magnifier */}
                <div style={styles.visualSection}>
                  <div style={styles.visualCard}>
                    <ProductImageMagnifier
                      src={selectedDesign.image}
                      alt={selectedDesign.name}
                      zoomLevel={2.5}
                      lensSize={250}
                      imageStyle={{ width: '100%', height: '100%', minHeight: '400px', objectFit: 'cover', borderRadius: '20px' }}
                    />
                  </div>
                </div>

                {/* Right: Details */}
                <div style={styles.detailsSection}>
                  <span style={styles.categoryTag}>{selectedDesign.category}</span>
                  <h1 style={styles.title}>{selectedDesign.name}</h1>
                  
                  {/* Rating */}
                  <div style={styles.ratingRow}>
                    <div style={styles.starsContainer}>
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          fill={i < Math.floor(selectedDesign.rating) ? '#C5A880' : 'none'}
                          stroke={i < Math.floor(selectedDesign.rating) ? '#C5A880' : '#bdbdbd'}
                        />
                      ))}
                    </div>
                    <span style={styles.ratingScore}>{selectedDesign.rating}</span>
                    <span style={styles.ratingDivider}>•</span>
                    <span style={styles.reviewCount}>{selectedDesign.reviews} Reviews</span>
                  </div>

                  {/* Price */}
                  <div style={styles.priceSection}>
                    <div style={styles.priceRow}>
                      <span style={styles.currentPrice}>₹{selectedDesign.price.toLocaleString('en-IN')}</span>
                      <span style={styles.originalPrice}>₹{selectedDesign.originalPrice.toLocaleString('en-IN')}</span>
                      <span style={styles.saveBadge}>
                        Save {Math.round(((selectedDesign.originalPrice - selectedDesign.price) / selectedDesign.originalPrice) * 100)}%
                      </span>
                    </div>
                    <p style={styles.taxNote}>Inclusive of all taxes • Free consultation</p>
                  </div>

                  <p style={styles.description}>{selectedDesign.description}</p>

                  {/* Trust Indicators */}
                  <div style={styles.trustRow}>
                    <div style={styles.trustItem}>
                      <Truck size={16} style={{ color: '#C5A880' }} />
                      <span>On-Time Delivery</span>
                    </div>
                    <div style={styles.trustItem}>
                      <Shield size={16} style={{ color: '#C5A880' }} />
                      <span>10 Year Warranty</span>
                    </div>
                    <div style={styles.trustItem}>
                      <RotateCcw size={16} style={{ color: '#C5A880' }} />
                      <span>Quality Assured</span>
                    </div>
                  </div>

                  {/* Features List */}
                  <div style={styles.featuresContainer}>
                    <h3 style={styles.featuresTitle}>Key Features</h3>
                    <ul style={styles.featuresList}>
                      {selectedDesign.features.map((feat, idx) => (
                        <li key={idx} style={styles.featureItem}>
                          <CheckCircle size={16} style={{ color: '#C5A880', flexShrink: 0, marginTop: '2px' }} />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* WhatsApp Connect Button */}
                  <div style={styles.actionSection}>
                    <div style={styles.actionHint}>
                      <span style={styles.hintText}>Interested? Connect directly with our team →</span>
                    </div>
                    <button onClick={() => handleWhatsApp(selectedDesign)} style={styles.waBtn}>
                      <WhatsAppIcon size={22} />
                      <div style={styles.waBtnContent}>
                        <span style={styles.waBtnTitle}>Connect on WhatsApp</span>
                        <span style={styles.waBtnSub}>
                          ₹{selectedDesign.price.toLocaleString('en-IN')} • Enquire Now
                        </span>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .office-designs-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr) !important;
          gap: 2rem;
        }
        @media (max-width: 992px) {
          .office-designs-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .office-modal-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
          .office-modal-content {
            padding: 1.25rem 1rem 3rem !important;
          }
        }
        @media (max-width: 768px) {
          .office-designs-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

const styles = {
  container: {
    padding: '2rem 0',
  },
  gridTitle: {
    fontFamily: 'var(--font-heading)',
    fontSize: '2rem',
    fontWeight: 600,
    color: '#1E1D1B',
    marginBottom: '2rem',
    textAlign: 'center',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '2rem',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    border: '1px solid rgba(0,0,0,0.06)',
    boxShadow: '0 4px 15px rgba(0,0,0,0.04)',
    cursor: 'pointer',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  imageContainer: {
    width: '100%',
    height: '250px',
    overflow: 'hidden',
  },
  cardInfo: {
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    flex: 1,
  },
  cardTitle: {
    fontFamily: 'var(--font-heading)',
    fontSize: '1.1rem',
    fontWeight: 600,
    color: '#1E1D1B',
  },
  cardPrice: {
    fontSize: '1rem',
    color: '#C5A880',
    fontWeight: 600,
    fontFamily: 'var(--font-heading)',
  },
  cardWaBtn: {
    marginTop: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    padding: '0.75rem',
    backgroundColor: '#25D366',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '0.9rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },

  // Modal Styles
  overlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    zIndex: 250,
    backgroundColor: 'rgba(252, 253, 255, 0.98)',
    backdropFilter: 'blur(12px)',
  },
  modalPage: {
    width: '100%',
    height: '100%',
    overflowY: 'auto',
    overflowX: 'hidden',
  },
  topBar: {
    position: 'sticky',
    top: 0,
    zIndex: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '1rem 2rem',
    backgroundColor: 'rgba(252, 253, 255, 0.85)',
    backdropFilter: 'blur(20px)',
    borderBottom: '1px solid rgba(0, 0, 0, 0.04)',
  },
  backBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.6rem 1.25rem',
    backgroundColor: '#ffffff',
    border: '1px solid rgba(0,0,0,0.06)',
    borderRadius: '100px',
    color: '#1E1D1B',
    fontSize: '0.85rem',
    fontWeight: 600,
    cursor: 'pointer',
    fontFamily: 'var(--font-body)',
  },
  topBarCenter: {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
  },
  topBarCategory: {
    fontSize: '0.75rem',
    fontWeight: 700,
    letterSpacing: '0.15em',
    color: '#0f172a',
    backgroundColor: 'rgba(15, 23, 42, 0.05)',
    padding: '0.5rem 1.2rem',
    borderRadius: '100px',
    fontFamily: 'var(--font-heading)',
  },
  closeBtn: {
    width: '42px',
    height: '42px',
    borderRadius: '50%',
    backgroundColor: '#ffffff',
    border: '1px solid rgba(0,0,0,0.06)',
    color: '#1E1D1B',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContentWrapper: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '2.5rem 2rem 4rem',
  },
  modalGrid: {
    display: 'grid',
    gridTemplateColumns: '1.1fr 1fr',
    gap: '3rem',
    alignItems: 'start',
  },
  visualSection: {
    position: 'relative',
  },
  visualCard: {
    backgroundColor: '#ffffff',
    borderRadius: '20px',
    border: '1px solid rgba(0,0,0,0.06)',
    overflow: 'hidden',
    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.06)',
    height: '100%',
  },
  detailsSection: {
    paddingTop: '0.5rem',
  },
  categoryTag: {
    display: 'inline-block',
    fontSize: '0.75rem',
    fontWeight: 700,
    letterSpacing: '0.15em',
    color: '#475569',
    marginBottom: '1rem',
    padding: '0.4rem 1rem',
    backgroundColor: '#f1f5f9',
    borderRadius: '100px',
  },
  title: {
    fontFamily: 'var(--font-heading)',
    fontSize: '2.5rem',
    fontWeight: 700,
    color: '#0f172a',
    lineHeight: 1.15,
    marginBottom: '1rem',
  },
  ratingRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginBottom: '1.25rem',
  },
  starsContainer: {
    display: 'flex',
    gap: '2px',
  },
  ratingScore: {
    fontSize: '0.9rem',
    fontWeight: 600,
    color: '#1E1D1B',
    marginLeft: '0.25rem',
  },
  ratingDivider: {
    color: '#bdbdbd',
    fontSize: '0.7rem',
  },
  reviewCount: {
    fontSize: '0.85rem',
    color: '#706D67',
  },
  priceSection: {
    padding: '1.25rem 0',
    borderTop: '1px solid #E6E2DA',
    borderBottom: '1px solid #E6E2DA',
    marginBottom: '1.25rem',
  },
  priceRow: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '0.75rem',
    marginBottom: '0.25rem',
  },
  currentPrice: {
    fontSize: '1.85rem',
    fontWeight: 500,
    color: '#C5A880',
    fontFamily: 'var(--font-heading)',
  },
  originalPrice: {
    fontSize: '1.1rem',
    textDecoration: 'line-through',
    color: '#706D67',
  },
  saveBadge: {
    fontSize: '0.75rem',
    fontWeight: 600,
    color: '#2e7d32',
    backgroundColor: 'rgba(46, 125, 50, 0.08)',
    padding: '0.2rem 0.6rem',
    borderRadius: '4px',
  },
  taxNote: {
    fontSize: '0.8rem',
    color: '#706D67',
  },
  description: {
    fontSize: '1rem',
    lineHeight: 1.8,
    color: '#475569',
    marginBottom: '2rem',
  },
  trustRow: {
    display: 'flex',
    gap: '1.5rem',
    marginBottom: '2rem',
    flexWrap: 'wrap',
  },
  trustItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.85rem',
    color: '#475569',
    fontWeight: 500,
  },
  featuresContainer: {
    marginBottom: '2.5rem',
  },
  featuresTitle: {
    fontSize: '1.1rem',
    fontWeight: 600,
    color: '#1E1D1B',
    marginBottom: '1rem',
    fontFamily: 'var(--font-heading)',
  },
  featuresList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '0.85rem',
  },
  featureItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '0.75rem',
    fontSize: '0.95rem',
    color: '#475569',
    lineHeight: 1.5,
  },
  actionSection: {
    marginTop: '1rem',
  },
  actionHint: {
    marginBottom: '0.75rem',
  },
  hintText: {
    fontSize: '0.85rem',
    color: '#706D67',
    fontStyle: 'italic',
  },
  waBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1rem',
    width: '100%',
    padding: '1.15rem',
    borderRadius: '12px',
    border: 'none',
    backgroundColor: '#25D366',
    color: '#fff',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
    boxShadow: '0 8px 25px rgba(37, 211, 102, 0.25)',
  },
  waBtnContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  waBtnTitle: {
    fontSize: '1.05rem',
    fontWeight: 700,
    fontFamily: 'var(--font-heading)',
    letterSpacing: '0.02em',
  },
  waBtnSub: {
    fontSize: '0.8rem',
    opacity: 0.9,
    marginTop: '0.15rem',
  },
};
