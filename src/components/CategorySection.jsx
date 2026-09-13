import React, { useEffect, useRef, useState } from 'react';
import { X, ArrowLeft, Sparkles, ShoppingBag } from 'lucide-react';
import { categories, getProducts } from '../data/products';
import ProductCard from './ProductCard';

export default function CategorySection({ categoryId, onClose, onQuickView }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isContentVisible, setIsContentVisible] = useState(false);
  const sectionRef = useRef(null);

  const category = categories.find((c) => c.id === categoryId);
  const [allProducts, setAllProducts] = useState(() => getProducts());

  useEffect(() => {
    const handleProductsUpdate = (e) => {
      if (e?.detail) {
        setAllProducts(e.detail);
      } else {
        setAllProducts(getProducts());
      }
    };
    window.addEventListener('efive_products_updated', handleProductsUpdate);
    window.addEventListener('storage', handleProductsUpdate);
    return () => {
      window.removeEventListener('efive_products_updated', handleProductsUpdate);
      window.removeEventListener('storage', handleProductsUpdate);
    };
  }, []);

  const categoryProducts = allProducts.filter((p) => p.category === categoryId);

  useEffect(() => {
    // Trigger entrance animations
    requestAnimationFrame(() => {
      setIsVisible(true);
      setTimeout(() => setIsContentVisible(true), 200);
    });
    // Body scroll is managed centrally by Storefront.jsx
  }, []);

  const handleClose = () => {
    setIsContentVisible(false);
    setTimeout(() => setIsVisible(false), 150);
    setTimeout(() => {
      onClose();
    }, 400);
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
      {/* Background Layer */}
      <div style={styles.bgLayer}>
        <div style={styles.bgSolid} />
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
            <button onClick={handleClose} className="premium-back-btn" aria-label="Go back">
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
          <h1 className="premium-hero-title">{category.name} Collection</h1>
          <p className="premium-hero-subtitle">
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

      {/* Inline keyframes and styles */}
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

        .premium-back-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.6rem 1.2rem;
          background-color: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          color: #ffffff;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.2, 0.8, 0.2, 1);
          font-family: var(--font-body);
          backdrop-filter: blur(8px);
          box-shadow: 0 4px 16px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1);
          transform-origin: center;
          outline: none;
        }
        
        .premium-back-btn:hover {
          background-color: rgba(255, 255, 255, 0.15);
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.2);
        }
        
        .premium-back-btn:active {
          transform: scale(0.92) translateY(2px);
          box-shadow: 0 2px 8px rgba(0,0,0,0.3), inset 0 2px 4px rgba(0,0,0,0.2);
          background-color: rgba(255, 255, 255, 0.05);
        }

        .premium-hero-title {
          font-family: var(--font-heading);
          font-size: 3.5rem;
          font-weight: 700;
          background: linear-gradient(135deg, #ffffff 0%, #C5A880 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 1.25rem;
          letter-spacing: -0.02em;
          line-height: 1.15;
          text-shadow: 0 4px 24px rgba(197, 168, 128, 0.2);
        }
        
        .premium-hero-subtitle {
          font-family: var(--font-body);
          font-size: 1.1rem;
          color: rgba(255, 255, 255, 0.85);
          line-height: 1.8;
          font-weight: 400;
          max-width: 85%;
          margin: 0 auto 1.5rem auto;
          text-shadow: 0 2px 10px rgba(0,0,0,0.5);
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
    backgroundColor: '#1E1D1B',
  },
  bgSolid: {
    width: '100%',
    height: '100%',
    background: 'radial-gradient(circle at top, #2C2A27 0%, #1E1D1B 80%)',
  },
  bgOverlayGradient: {
    position: 'absolute',
    inset: 0,
    background: `
      linear-gradient(
        180deg,
        rgba(30, 29, 27, 0.2) 0%,
        rgba(30, 29, 27, 0.6) 100%
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
