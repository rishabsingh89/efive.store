import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowLeft, X, Star, Shield, Compass, Hammer,
  Truck, RotateCcw, CheckCircle,
} from 'lucide-react';
import ProductSVG from './ProductSVG';
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

export default function ProductDetailsModal({ product, onClose }) {
  const [selectedColor, setSelectedColor] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isContentReady, setIsContentReady] = useState(false);
  const [activeTab, setActiveTab] = useState('features');
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  // Initialize selected color
  useEffect(() => {
    if (product?.colors?.length > 0) {
      setSelectedColor(product.colors[0]);
    } else {
      setSelectedColor(null);
    }
  }, [product]);

  // Entrance animation
  useEffect(() => {
    requestAnimationFrame(() => {
      setIsVisible(true);
      setTimeout(() => setIsContentReady(true), 150);
    });
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Close on Escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') handleClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  if (!product) return null;

  const { name, id, category, price, originalPrice, rating, reviews, description, features, specifications, colors } = product;

  const displayPrice = selectedColor?.price || price;
  const displayOriginalPrice = selectedColor?.originalPrice || originalPrice;

  const discountPercent = displayOriginalPrice
    ? Math.round(((displayOriginalPrice - displayPrice) / displayOriginalPrice) * 100)
    : 0;

  const handleClose = () => {
    setIsContentReady(false);
    setTimeout(() => setIsVisible(false), 100);
    setTimeout(() => onClose(), 350);
  };

  const handleWhatsApp = () => {
    openWhatsApp({
      productName: name,
      productId: id,
      price: displayPrice,
      colorName: selectedColor?.name,
    });
  };

  return (
    <div
      style={{
        ...styles.overlay,
        opacity: isVisible ? 1 : 0,
        pointerEvents: isVisible ? 'all' : 'none',
      }}
    >
      <div
        style={{
          ...styles.page,
          transform: isContentReady ? 'translateY(0)' : 'translateY(20px)',
          opacity: isContentReady ? 1 : 0,
        }}
      >
        {/* Sticky Top Navigation Bar */}
        <div style={styles.topBar}>
          <button onClick={handleClose} style={styles.backBtn} aria-label="Go back">
            <ArrowLeft size={18} />
            <span>Back</span>
          </button>
          <div style={styles.topBarCenter}>
            <span style={styles.topBarCategory}>{category.toUpperCase()}</span>
          </div>
          <button onClick={handleClose} style={styles.closeBtn} aria-label="Close">
            <X size={20} />
          </button>
        </div>

        {/* Product Content */}
        <div style={styles.contentWrapper}>
          <div style={styles.productGrid}>

            {/* LEFT: Product Visual */}
            <div
              style={{
                ...styles.visualSection,
                animation: isContentReady ? 'pdpSlideInLeft 0.6s cubic-bezier(0.16,1,0.3,1) 0.1s both' : 'none',
              }}
            >
              <div style={styles.visualCard}>
                {discountPercent > 0 && (
                  <div style={styles.discountBadge}>-{discountPercent}%</div>
                )}

                {product.images && product.images.length > 0 ? (
                  <>
                    <div style={{ ...styles.imageShowcase, height: '400px', width: '100%', overflow: 'hidden' }}>
                      <img 
                        src={product.images[activeImageIdx]} 
                        alt={name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      />
                    </div>
                    {product.images.length > 1 && (
                      <div style={styles.thumbnailGallery}>
                        {product.images.map((img, idx) => (
                          <img 
                            key={idx}
                            src={img}
                            alt={`${name} thumbnail ${idx + 1}`}
                            onClick={() => setActiveImageIdx(idx)}
                            style={{
                              ...styles.thumbnailImg,
                              border: activeImageIdx === idx ? '2px solid #C5A880' : '1px solid transparent',
                              opacity: activeImageIdx === idx ? 1 : 0.6,
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <div style={styles.svgShowcase}>
                    <ProductSVG
                      category={category}
                      colorHex={selectedColor ? selectedColor.hex : null}
                    />
                  </div>
                )}

                {/* Color picker at bottom of visual */}
                {colors?.length > 0 && (
                  <div style={styles.colorPreviewBar}>
                    <span style={styles.colorPreviewLabel}>Color:</span>
                    <div style={styles.colorDots}>
                      {colors.map((col, idx) => {
                        const isSelected = selectedColor?.name === col.name;
                        return (
                          <button
                            key={idx}
                            onClick={() => {
                              setSelectedColor(col);
                              if (typeof col.imageIdx === 'number') {
                                setActiveImageIdx(col.imageIdx);
                              }
                            }}
                            style={{
                              ...styles.colorDot,
                              backgroundColor: col.hex,
                              boxShadow: isSelected ? '0 0 0 2px #fff, 0 0 0 3px #C5A880' : '0 1px 3px rgba(0,0,0,0.1)',
                              transform: isSelected ? 'scale(1.05)' : 'scale(1)',
                            }}
                            title={col.name}
                            aria-label={`Select color ${col.name}`}
                          />
                        );
                      })}
                    </div>
                    <span style={styles.colorName}>{selectedColor?.name}</span>
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT: Product Details */}
            <div
              style={{
                ...styles.detailsSection,
                animation: isContentReady ? 'pdpSlideInRight 0.6s cubic-bezier(0.16,1,0.3,1) 0.2s both' : 'none',
              }}
            >
              <span style={styles.categoryTag}>{category.toUpperCase()}</span>
              <h1 style={styles.title}>{name}</h1>

              {/* Rating */}
              <div style={styles.ratingRow}>
                <div style={styles.starsContainer}>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      fill={i < Math.floor(rating) ? '#C5A880' : 'none'}
                      stroke={i < Math.floor(rating) ? '#C5A880' : '#bdbdbd'}
                    />
                  ))}
                </div>
                <span style={styles.ratingScore}>{rating}</span>
                <span style={styles.ratingDivider}>•</span>
                <span style={styles.reviewCount}>{reviews} Reviews</span>
              </div>

              {/* Price */}
              <div style={styles.priceSection}>
                <div style={styles.priceRow}>
                  <span style={styles.currentPrice}>₹{displayPrice.toLocaleString('en-IN')}</span>
                  {displayOriginalPrice && (
                    <span style={styles.originalPrice}>₹{displayOriginalPrice.toLocaleString('en-IN')}</span>
                  )}
                  {discountPercent > 0 && (
                    <span style={styles.saveBadge}>Save {discountPercent}%</span>
                  )}
                </div>
                <p style={styles.taxNote}>Inclusive of all taxes • Free delivery</p>
              </div>

              <p style={styles.description}>{description}</p>

              {/* Trust Indicators */}
              <div style={styles.trustRow}>
                <div style={styles.trustItem}>
                  <Truck size={16} style={{ color: '#C5A880' }} />
                  <span>Free Delivery</span>
                </div>
                <div style={styles.trustItem}>
                  <Shield size={16} style={{ color: '#C5A880' }} />
                  <span>{specifications.warranty}</span>
                </div>
                <div style={styles.trustItem}>
                  <RotateCcw size={16} style={{ color: '#C5A880' }} />
                  <span>Easy Returns</span>
                </div>
              </div>

              {/* Tabs */}
              <div style={styles.tabsContainer}>
                <div style={styles.tabsList}>
                  {['features', 'specs'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      style={{
                        ...styles.tabBtn,
                        ...(activeTab === tab ? styles.tabBtnActive : {}),
                      }}
                    >
                      {tab === 'features' ? 'Key Features' : 'Specifications'}
                    </button>
                  ))}
                </div>

                <div style={styles.tabContent}>
                  {activeTab === 'features' && (
                    <ul style={styles.featuresList}>
                      {features.map((feat, idx) => (
                        <li key={idx} style={styles.featureItem}>
                          <CheckCircle size={14} style={{ color: '#C5A880', flexShrink: 0, marginTop: '2px' }} />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {activeTab === 'specs' && (
                    <div style={styles.specsGrid}>
                      {[
                        { icon: <Compass size={15} style={styles.specIcon} />, label: 'Dimensions', val: specifications.dimensions },
                        { icon: <Hammer size={15} style={styles.specIcon} />, label: 'Materials', val: specifications.material },
                        { icon: <Shield size={15} style={styles.specIcon} />, label: 'Warranty', val: specifications.warranty },
                        { icon: <Truck size={15} style={styles.specIcon} />, label: 'Assembly', val: specifications.assembly },
                      ].map(({ icon, label, val }) => (
                        <div key={label} style={styles.specRow}>
                          {icon}
                          <div>
                            <span style={styles.specLabel}>{label}</span>
                            <span style={styles.specValue}>{val}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* ─── WhatsApp CTA (replaces Add to Cart) ─── */}
              <div style={styles.actionSection}>
                <div style={styles.actionHint}>
                  <span style={styles.hintText}>
                    Interested? Connect directly with our team →
                  </span>
                </div>
                <button onClick={handleWhatsApp} style={styles.waBtn} aria-label="Connect on WhatsApp">
                  <WhatsAppIcon size={22} />
                  <div style={styles.waBtnContent}>
                    <span style={styles.waBtnTitle}>Connect on WhatsApp</span>
                    <span style={styles.waBtnSub}>
                      ₹{displayPrice.toLocaleString('en-IN')} • Enquire Now
                    </span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes pdpSlideInLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes pdpSlideInRight {
          from { opacity: 0; transform: translateX(30px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    zIndex: 250,
    backgroundColor: '#FAF7F2',
    transition: 'opacity 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  page: {
    width: '100%',
    height: '100%',
    overflowY: 'auto',
    overflowX: 'hidden',
    transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
  },
  topBar: {
    position: 'sticky',
    top: 0,
    zIndex: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0.85rem 2rem',
    backgroundColor: 'rgba(250, 247, 242, 0.92)',
    backdropFilter: 'blur(16px)',
    borderBottom: '1px solid rgba(197, 168, 128, 0.15)',
  },
  backBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 1rem',
    backgroundColor: 'transparent',
    border: '1px solid #E6E2DA',
    borderRadius: '8px',
    color: '#1E1D1B',
    fontSize: '0.85rem',
    fontWeight: 500,
    cursor: 'pointer',
    fontFamily: 'var(--font-body)',
    transition: 'all 0.25s ease',
  },
  topBarCenter: {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
  },
  topBarCategory: {
    fontSize: '0.7rem',
    fontWeight: 600,
    letterSpacing: '0.2em',
    color: '#C5A880',
    fontFamily: 'var(--font-heading)',
  },
  closeBtn: {
    width: '38px',
    height: '38px',
    borderRadius: '50%',
    backgroundColor: 'transparent',
    border: '1px solid #E6E2DA',
    color: '#1E1D1B',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.25s ease',
  },
  contentWrapper: {
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '2.5rem 2rem 4rem',
  },
  productGrid: {
    display: 'grid',
    gridTemplateColumns: '1.1fr 1fr',
    gap: '3rem',
    alignItems: 'start',
  },
  visualSection: {
    position: 'sticky',
    top: '80px',
    opacity: 0,
  },
  visualCard: {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    border: '1px solid #E6E2DA',
    overflow: 'hidden',
    boxShadow: '0 8px 32px rgba(30,29,27,0.06)',
  },
  discountBadge: {
    position: 'absolute',
    top: '1.25rem',
    left: '1.25rem',
    backgroundColor: '#C5A880',
    color: '#ffffff',
    fontSize: '0.75rem',
    fontWeight: 700,
    padding: '0.3rem 0.75rem',
    borderRadius: '6px',
    letterSpacing: '0.02em',
    zIndex: 5,
  },
  svgShowcase: {
    padding: '3rem 2.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '350px',
    backgroundColor: 'hsl(40, 20%, 94%)',
    position: 'relative',
  },
  thumbnailGallery: {
    display: 'flex',
    gap: '0.75rem',
    padding: '1rem',
    overflowX: 'auto',
    borderTop: '1px solid #E6E2DA',
    backgroundColor: '#fff',
  },
  thumbnailImg: {
    width: '60px',
    height: '60px',
    objectFit: 'cover',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  colorPreviewBar: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '1rem 1.5rem',
    borderTop: '1px solid #E6E2DA',
    backgroundColor: '#ffffff',
  },
  colorPreviewLabel: {
    fontSize: '0.8rem',
    fontWeight: 600,
    color: '#1E1D1B',
    fontFamily: 'var(--font-body)',
  },
  colorDots: {
    display: 'flex',
    gap: '0.6rem',
  },
  colorDot: {
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    border: '1px solid rgba(0,0,0,0.1)',
    cursor: 'pointer',
    transition: 'all 0.25s ease',
    padding: 0,
  },
  colorName: {
    fontSize: '0.8rem',
    color: '#706D67',
    fontWeight: 400,
    marginLeft: 'auto',
    fontStyle: 'italic',
  },
  detailsSection: {
    opacity: 0,
    paddingTop: '0.5rem',
  },
  categoryTag: {
    display: 'inline-block',
    fontSize: '0.7rem',
    fontWeight: 600,
    letterSpacing: '0.2em',
    color: '#C5A880',
    marginBottom: '0.75rem',
    padding: '0.3rem 0.8rem',
    backgroundColor: 'rgba(197, 168, 128, 0.1)',
    borderRadius: '4px',
  },
  title: {
    fontFamily: 'var(--font-heading)',
    fontSize: '2rem',
    fontWeight: 600,
    color: '#1E1D1B',
    lineHeight: 1.25,
    marginBottom: '0.75rem',
    letterSpacing: '-0.01em',
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
    fontWeight: 500, // Lighter, not bold
    color: '#C5A880', // Primary color
    fontFamily: 'var(--font-heading)',
    transition: 'color 0.25s ease',
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
    fontSize: '0.95rem',
    lineHeight: 1.7,
    color: '#706D67',
    marginBottom: '1.5rem',
    fontWeight: 300,
  },
  trustRow: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
    marginBottom: '1.5rem',
    padding: '1rem',
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    border: '1px solid #E6E2DA',
  },
  trustItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
    fontSize: '0.8rem',
    fontWeight: 500,
    color: '#1E1D1B',
    flex: '1 1 0',
    justifyContent: 'center',
  },
  tabsContainer: {
    marginBottom: '2rem',
  },
  tabsList: {
    display: 'flex',
    borderBottom: '2px solid #E6E2DA',
    marginBottom: '1.25rem',
  },
  tabBtn: {
    padding: '0.6rem 1.25rem',
    backgroundColor: 'transparent',
    border: 'none',
    borderBottom: '2px solid transparent',
    marginBottom: '-2px',
    fontSize: '0.85rem',
    fontWeight: 600,
    color: '#706D67',
    cursor: 'pointer',
    transition: 'all 0.25s ease',
    fontFamily: 'var(--font-body)',
    letterSpacing: '0.02em',
    textTransform: 'uppercase',
  },
  tabBtnActive: {
    color: '#1E1D1B',
    borderBottomColor: '#C5A880',
  },
  tabContent: {
    minHeight: '100px',
  },
  featuresList: {
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.6rem',
    padding: 0,
    margin: 0,
  },
  featureItem: {
    display: 'flex',
    gap: '0.6rem',
    fontSize: '0.9rem',
    color: '#1E1D1B',
    lineHeight: 1.5,
    alignItems: 'flex-start',
  },
  specsGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  specRow: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '0.75rem',
    padding: '0.75rem 1rem',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    border: '1px solid #E6E2DA',
  },
  specIcon: {
    color: '#C5A880',
    marginTop: '2px',
    flexShrink: 0,
  },
  specLabel: {
    display: 'block',
    fontSize: '0.7rem',
    fontWeight: 600,
    color: '#706D67',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: '0.15rem',
  },
  specValue: {
    display: 'block',
    fontSize: '0.9rem',
    color: '#1E1D1B',
  },

  // ── WhatsApp CTA ──────────────────────────────────────────────────────────
  actionSection: {
    padding: '1.5rem 0',
    borderTop: '1px solid #E6E2DA',
    position: 'sticky',
    bottom: 0,
    backgroundColor: 'rgba(250, 247, 242, 0.95)',
    backdropFilter: 'blur(8px)',
  },
  actionHint: {
    marginBottom: '0.75rem',
  },
  hintText: {
    fontSize: '0.8rem',
    color: '#706D67',
    fontStyle: 'italic',
  },
  waBtn: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '1rem 1.5rem',
    backgroundColor: '#25D366',
    color: '#ffffff',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.25s ease',
    fontFamily: 'var(--font-body)',
    boxShadow: '0 4px 20px rgba(37, 211, 102, 0.4)',
    textAlign: 'left',
  },
  waBtnContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.15rem',
  },
  waBtnTitle: {
    fontSize: '1rem',
    fontWeight: 700,
    letterSpacing: '0.02em',
  },
  waBtnSub: {
    fontSize: '0.8rem',
    opacity: 0.85,
    fontWeight: 400,
  },
};
