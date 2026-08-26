import React, { useEffect, useRef, useState } from 'react';
import { X, ArrowLeft, Sparkles, ShoppingBag } from 'lucide-react';
import { categories, products } from '../data/products';
import ProductCard from './ProductCard';

export default function CategorySection({ categoryId, onClose, onQuickView }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isContentVisible, setIsContentVisible] = useState(false);
  const sectionRef = useRef(null);

  const category = categories.find((c) => c.id === categoryId);
  const categoryProducts = products.filter((p) => p.category === categoryId);

  useEffect(() => {
    // Trigger entrance animations
    requestAnimationFrame(() => {
      setIsVisible(true);
      setTimeout(() => setIsContentVisible(true), 200);
    });

    // Lock body scroll
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleClose = () => {
    setIsContentVisible(false);
    setTimeout(() => setIsVisible(false), 150);
    setTimeout(() => onClose(), 400);
  };

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!category) return null;

  return (
    <div
      ref={sectionRef}
      style={{
        ...styles.overlay,
        opacity: isVisible ? 1 : 0,
        pointerEvents: isVisible ? 'all' : 'none',
      }}
    >
      {/* Background Layer with Category Image */}
      <div style={styles.bgLayer}>
        <img
          src={category.image.replace('w=400', 'w=1920').replace('q=80', 'q=40')}
          alt=""
          style={{
            ...styles.bgImage,
            transform: isVisible ? 'scale(1)' : 'scale(1.1)',
          }}
        />
        <div style={styles.bgOverlayGradient} />
      </div>

      {/* Scrollable Content Panel */}
      <div
        style={{
          ...styles.contentPanel,
          transform: isContentVisible ? 'translateY(0)' : 'translateY(40px)',
          opacity: isContentVisible ? 1 : 0,
        }}
      >
        {/* Header Section */}
        <div style={styles.header}>
          <div style={styles.headerLeft}>
            <button onClick={handleClose} style={styles.backBtn} aria-label="Go back">
              <ArrowLeft size={20} />
              <span>Back</span>
            </button>
          </div>

          <div style={styles.headerCenter}>
            <div style={styles.categoryBadge}>
              <Sparkles size={14} style={{ color: '#C5A880' }} />
              <span>{category.name}</span>
            </div>
          </div>

          <div style={styles.headerRight}>
            <button onClick={handleClose} style={styles.closeBtn} aria-label="Close">
              <X size={22} />
            </button>
          </div>
        </div>

        {/* Hero Title Area */}
        <div
          style={{
            ...styles.heroArea,
            transform: isContentVisible ? 'translateY(0)' : 'translateY(20px)',
            opacity: isContentVisible ? 1 : 0,
            transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.15s',
          }}
        >
          <h1 style={styles.heroTitle}>{category.name} Collection</h1>
          <p style={styles.heroSubtitle}>
            Explore our curated selection of {categoryProducts.length} premium{' '}
            {category.name.toLowerCase()} pieces, designed for the discerning taste.
          </p>
          <div style={styles.divider}>
            <div style={styles.dividerLine} />
            <ShoppingBag size={16} style={{ color: '#C5A880' }} />
            <div style={styles.dividerLine} />
          </div>
        </div>

        {/* Products Grid */}
        <div style={styles.gridContainer}>
          <div style={styles.productGrid}>
            {categoryProducts.map((product, index) => (
              <div
                key={product.id}
                style={{
                  ...styles.gridItem,
                  animationDelay: `${0.1 + index * 0.08}s`,
                  animation: isContentVisible
                    ? `categorySectionFadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${0.2 + index * 0.08}s both`
                    : 'none',
                }}
              >
                <ProductCard
                  product={product}
                  onQuickView={onQuickView}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Spacer */}
        <div style={{ height: '3rem' }} />
      </div>

      {/* Inline keyframes */}
      <style>{`
        @keyframes categorySectionFadeIn {
          from {
            opacity: 0;
            transform: translateY(24px) scale(0.97);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 200,
    transition: 'opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    display: 'flex',
    flexDirection: 'column',
  },

  // Background Layer
  bgLayer: {
    position: 'absolute',
    inset: 0,
    zIndex: 0,
    overflow: 'hidden',
  },
  bgImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
    filter: 'blur(4px) brightness(0.35)',
  },
  bgOverlayGradient: {
    position: 'absolute',
    inset: 0,
    background: `
      linear-gradient(
        180deg,
        rgba(30, 29, 27, 0.92) 0%,
        rgba(30, 29, 27, 0.85) 25%,
        rgba(30, 29, 27, 0.80) 50%,
        rgba(30, 29, 27, 0.92) 100%
      )
    `,
  },

  // Scrollable Content Panel
  contentPanel: {
    position: 'relative',
    zIndex: 1,
    flex: 1,
    overflowY: 'auto',
    overflowX: 'hidden',
    transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
    padding: '0 2rem',
  },

  // Header
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '1.25rem 0',
    position: 'sticky',
    top: 0,
    zIndex: 10,
    backdropFilter: 'blur(12px)',
    backgroundColor: 'rgba(30, 29, 27, 0.5)',
    marginLeft: '-2rem',
    marginRight: '-2rem',
    paddingLeft: '2rem',
    paddingRight: '2rem',
    borderBottom: '1px solid rgba(197, 168, 128, 0.15)',
  },
  headerLeft: {
    flex: '1 1 0',
    display: 'flex',
    justifyContent: 'flex-start',
  },
  headerCenter: {
    flex: '0 0 auto',
    display: 'flex',
    justifyContent: 'center',
  },
  headerRight: {
    flex: '1 1 0',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  backBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 1rem',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    border: '1px solid rgba(255, 255, 255, 0.12)',
    borderRadius: '8px',
    color: '#ffffff',
    fontSize: '0.85rem',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.25s ease',
    fontFamily: 'var(--font-body)',
    backdropFilter: 'blur(4px)',
  },
  categoryBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.4rem',
    padding: '0.4rem 1rem',
    backgroundColor: 'rgba(197, 168, 128, 0.15)',
    border: '1px solid rgba(197, 168, 128, 0.3)',
    borderRadius: '20px',
    color: '#C5A880',
    fontSize: '0.8rem',
    fontWeight: 600,
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    fontFamily: 'var(--font-heading)',
  },
  closeBtn: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    border: '1px solid rgba(255, 255, 255, 0.12)',
    color: '#ffffff',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.25s ease',
  },

  // Hero Area
  heroArea: {
    textAlign: 'center',
    padding: '3rem 1rem 1.5rem',
    maxWidth: '700px',
    margin: '0 auto',
  },
  heroTitle: {
    fontFamily: 'var(--font-heading)',
    fontSize: '2.75rem',
    fontWeight: 600,
    color: '#ffffff',
    marginBottom: '1rem',
    letterSpacing: '-0.02em',
    lineHeight: 1.15,
  },
  heroSubtitle: {
    fontFamily: 'var(--font-body)',
    fontSize: '1rem',
    color: 'rgba(255, 255, 255, 0.6)',
    lineHeight: 1.7,
    fontWeight: 300,
    marginBottom: '1.5rem',
  },
  divider: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1rem',
  },
  dividerLine: {
    width: '60px',
    height: '1px',
    backgroundColor: 'rgba(197, 168, 128, 0.35)',
  },

  // Grid
  gridContainer: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '1.5rem 0',
  },
  productGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '1.5rem',
  },
  gridItem: {
    opacity: 0,
  },
};
