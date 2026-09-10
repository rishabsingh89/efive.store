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
      document.body.style.overflow = 'auto';
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

  const displayPrice = price;
  const displayOriginalPrice = originalPrice;

  const discountPercent = displayOriginalPrice
    ? Math.round(((displayOriginalPrice - displayPrice) / displayOriginalPrice) * 100)
    : 0;

  const handleClose = () => {
    setIsContentReady(false);
    setTimeout(() => setIsVisible(false), 100);
    setTimeout(() => {
      document.body.style.overflow = 'auto';
      onClose();
    }, 350);
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
        <div className="pdp-content-wrapper">
          <div className="pdp-grid">

            {/* LEFT: Product Visual — 3D Card */}
            <div
              className="pdp-3d-perspective"
              style={{
                ...styles.visualSection,
                animation: isContentReady ? 'pdpSlideInLeft 0.35s cubic-bezier(0.16,1,0.3,1) 0.05s both' : 'none',
              }}
            >
              <div className="pdp-3d-card" style={styles.visualCard}>
                {discountPercent > 0 && (
                  <div style={styles.discountBadge}>-{discountPercent}%</div>
                )}

                {product.images && product.images.length > 0 ? (
                  <>
                    <div className="pdp-image-showcase">
                      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                        <img 
                          src={product.images[activeImageIdx]} 
                          alt={name}
                          loading="lazy"
                          decoding="async"
                          style={{ 
                            width: '100%', 
                            height: '100%', 
                            objectFit: 'contain',
                            padding: '2rem',
                            display: 'block'
                          }}
                        />
                        {(product.isOutOfStock || product.isSoldOut) && (
                          <div style={{
                            position: 'absolute',
                            inset: 0,
                            backgroundColor: 'rgba(255, 255, 255, 0.6)',
                            backdropFilter: 'blur(3px)',
                            WebkitBackdropFilter: 'blur(3px)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 15,
                            borderRadius: '16px'
                          }}>
                            <span style={{
                              backgroundColor: 'rgba(0, 0, 0, 0.85)',
                              color: 'white',
                              padding: '0.8rem 1.6rem',
                              fontWeight: '700',
                              letterSpacing: '1.5px',
                              borderRadius: '6px',
                              fontSize: '1rem',
                              textTransform: 'uppercase',
                              boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                            }}>{product.isSoldOut ? 'SOLD OUT' : 'OUT OF STOCK'}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    {product.images.length > 1 && (
                      <div style={styles.thumbnailGallery}>
                        {product.images.map((img, idx) => (
                          <img 
                            key={idx}
                            src={img}
                            alt={`${name} thumbnail ${idx + 1}`}
                            onClick={() => setActiveImageIdx(idx)}
                            className="pdp-thumb"
                            loading="lazy"
                            decoding="async"
                            style={{
                              ...styles.thumbnailImg,
                              border: activeImageIdx === idx ? '2px solid #C5A880' : '1px solid rgba(0,0,0,0.06)',
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

                {/* Color picker at bottom of visual — 3D Glassmorphism */}
                {colors?.length > 0 && (
                  <div className="pdp-color-bar-3d" style={styles.colorPreviewBar}>
                    <span style={styles.colorPreviewLabel}>Color:</span>
                    <div style={styles.colorDots}>
                      {colors.map((col, idx) => {
                        const isSelected = selectedColor?.name === col.name;
                        return (
                          <button
                            key={idx}
                            className="pdp-color-dot-3d"
                            onClick={() => {
                              setSelectedColor(col);
                              if (typeof col.imageIdx === 'number') {
                                setActiveImageIdx(col.imageIdx);
                              }
                            }}
                            style={{
                              ...styles.colorDot,
                              backgroundColor: col.hex,
                              boxShadow: isSelected
                                ? `0 0 0 2.5px #fff, 0 0 0 4px #C5A880, 0 4px 15px rgba(197,168,128,0.35), inset 0 -2px 4px rgba(0,0,0,0.15)`
                                : `0 3px 8px rgba(0,0,0,0.18), inset 0 -2px 4px rgba(0,0,0,0.12), inset 0 1px 2px rgba(255,255,255,0.25)`,
                              transform: isSelected ? 'scale(1.15) translateY(-2px)' : 'scale(1)',
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
                animation: isContentReady ? 'pdpSlideInRight 0.35s cubic-bezier(0.16,1,0.3,1) 0.1s both' : 'none',
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
                    {(product.isOutOfStock || product.isSoldOut) ? (product.isSoldOut ? "This product has been sold out. Notify us to get updates →" : "Product is currently out of stock. Notify us to get updates →") : "Interested? Connect directly with our team →"}
                  </span>
                </div>
                <button onClick={handleWhatsApp} style={styles.waBtn} aria-label={(product.isOutOfStock || product.isSoldOut) ? "Notify on WhatsApp" : "Connect on WhatsApp"}>
                  <WhatsAppIcon size={22} />
                  <div style={styles.waBtnContent}>
                    <span style={styles.waBtnTitle}>{(product.isOutOfStock || product.isSoldOut) ? "Notify Me on WhatsApp" : "Connect on WhatsApp"}</span>
                    <span style={styles.waBtnSub}>
                      ₹{displayPrice.toLocaleString('en-IN')} • {(product.isOutOfStock || product.isSoldOut) ? "Request Availability" : "Enquire Now"}
                    </span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animations & Responsive Styles */}
      <style>{`
        @keyframes pdpSlideInLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes pdpSlideInRight {
          from { opacity: 0; transform: translateX(30px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        /* ── 3D Perspective Wrapper ── */
        .pdp-3d-perspective {
          perspective: 1200px;
        }

        .pdp-3d-card {
          transform-style: preserve-3d;
          transition: transform 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94),
                      box-shadow 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          will-change: transform, box-shadow;
        }

        .pdp-3d-card:hover {
          transform: rotateY(-2deg) rotateX(1.5deg) translateZ(8px) scale(1.01);
          box-shadow:
            0 30px 60px rgba(0, 0, 0, 0.08),
            0 15px 30px rgba(0, 0, 0, 0.06),
            0 5px 12px rgba(0, 0, 0, 0.04),
            inset 0 1px 0 rgba(255, 255, 255, 0.6) !important;
        }

        /* Side edge illusion — left edge */
        .pdp-3d-card::before {
          content: '';
          position: absolute;
          top: 8px;
          bottom: 8px;
          left: -4px;
          width: 6px;
          background: linear-gradient(to right, #d1cdc5, #e8e4dc, #f0ece4);
          border-radius: 4px 0 0 4px;
          opacity: 0;
          transition: opacity 0.45s ease;
          transform: rotateY(90deg);
          transform-origin: right center;
          z-index: -1;
        }

        .pdp-3d-card:hover::before {
          opacity: 1;
        }

        /* Bottom edge illusion */
        .pdp-3d-card::after {
          content: '';
          position: absolute;
          left: 8px;
          right: 8px;
          bottom: -4px;
          height: 6px;
          background: linear-gradient(to bottom, #d8d4cc, #e8e4dc, #ece8e0);
          border-radius: 0 0 4px 4px;
          opacity: 0;
          transition: opacity 0.45s ease;
          transform: rotateX(90deg);
          transform-origin: top center;
          z-index: -1;
        }

        .pdp-3d-card:hover::after {
          opacity: 1;
        }

        /* ── Color bar glassmorphism ── */
        .pdp-color-bar-3d {
          background: linear-gradient(135deg, rgba(255,255,255,0.85), rgba(248,250,252,0.9)) !important;
          backdrop-filter: blur(12px) saturate(1.5);
          border-top: 1px solid rgba(197,168,128,0.15) !important;
          position: relative;
        }

        .pdp-color-bar-3d::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(255,255,255,0.3) 0%, transparent 100%);
          pointer-events: none;
          border-radius: inherit;
        }

        /* ── Color dot 3D effects ── */
        .pdp-color-dot-3d {
          position: relative;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) !important;
        }

        .pdp-color-dot-3d:hover {
          transform: scale(1.2) translateY(-3px) !important;
          box-shadow:
            0 0 0 2px #fff,
            0 6px 20px rgba(0, 0, 0, 0.25),
            inset 0 -3px 6px rgba(0, 0, 0, 0.2),
            inset 0 2px 3px rgba(255, 255, 255, 0.3) !important;
        }

        .pdp-color-dot-3d:active {
          transform: scale(0.95) translateY(0px) !important;
          box-shadow:
            0 0 0 2px #fff,
            0 2px 6px rgba(0, 0, 0, 0.15),
            inset 0 2px 6px rgba(0, 0, 0, 0.25) !important;
        }

        /* ── Thumbnail 3D hover ── */
        .pdp-thumb {
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1) !important;
        }
        .pdp-thumb:hover {
          transform: translateY(-3px) scale(1.08);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.06) !important;
          opacity: 1 !important;
        }

        /* Responsive Grid & Layout */
        .pdp-content-wrapper {
          max-width: 1400px;
          margin: 0 auto;
          padding: 2.5rem 2rem 4rem;
        }
        .pdp-grid {
          display: grid;
          grid-template-columns: 1.1fr 1fr;
          gap: 3rem;
          align-items: start;
        }
        .pdp-3d-perspective {
          position: relative !important;
          top: auto !important;
          width: 100%;
        }
        .pdp-image-showcase {
          width: 100%;
          height: 480px;
          overflow: hidden;
        }
        
        @media (max-width: 992px) {
          .pdp-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          .pdp-content-wrapper {
            padding: 1.25rem 1rem 3rem;
          }
          .pdp-image-showcase {
            height: 340px;
          }
          .pdp-3d-perspective {
            position: relative !important;
            top: auto !important;
          }
        }
        
        @media (max-width: 576px) {
          .pdp-image-showcase {
            height: 260px;
          }
          .pdp-content-wrapper {
            padding: 1rem 0.75rem 2.5rem;
          }
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
    backgroundColor: 'rgba(252, 253, 255, 0.98)',
    backdropFilter: 'blur(12px)',
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
    padding: '1rem 2rem',
    backgroundColor: 'rgba(252, 253, 255, 0.85)',
    backdropFilter: 'blur(20px)',
    borderBottom: '1px solid rgba(0, 0, 0, 0.04)',
    boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
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
    transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
    boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
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
    transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
    boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
  },
  visualSection: {
    position: 'relative',
    opacity: 0,
  },
  visualCard: {
    backgroundColor: '#ffffff',
    borderRadius: '20px',
    border: '1px solid rgba(0,0,0,0.06)',
    overflow: 'hidden',
    position: 'relative',
    boxShadow:
      '0 25px 50px rgba(0, 0, 0, 0.06), 0 12px 24px rgba(0, 0, 0, 0.04), 0 4px 8px rgba(0, 0, 0, 0.03), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
  },
  discountBadge: {
    position: 'absolute',
    top: '1.5rem',
    left: '1.5rem',
    backgroundColor: '#0f172a',
    color: '#ffffff',
    fontSize: '0.75rem',
    fontWeight: 700,
    padding: '0.4rem 0.8rem',
    borderRadius: '100px',
    letterSpacing: '0.04em',
    zIndex: 5,
    boxShadow: '0 4px 12px rgba(15, 23, 42, 0.2)',
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
    padding: '1.25rem',
    overflowX: 'auto',
    borderTop: '1px solid rgba(0,0,0,0.04)',
    backgroundColor: '#f8fafc',
  },
  thumbnailImg: {
    width: '64px',
    height: '64px',
    objectFit: 'contain',
    padding: '4px',
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  colorPreviewBar: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '1.25rem 1.5rem',
    borderTop: '1px solid rgba(197,168,128,0.15)',
    backgroundColor: 'rgba(255,255,255,0.85)',
  },
  colorPreviewLabel: {
    fontSize: '0.85rem',
    fontWeight: 600,
    color: '#334155',
    fontFamily: 'var(--font-body)',
  },
  colorDots: {
    display: 'flex',
    gap: '0.75rem',
  },
  colorDot: {
    width: '34px',
    height: '34px',
    borderRadius: '50%',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
    padding: 0,
    position: 'relative',
  },
  colorName: {
    fontSize: '0.9rem',
    color: '#0f172a',
    fontWeight: 600,
    marginLeft: 'auto',
  },
  detailsSection: {
    opacity: 0,
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
    letterSpacing: '-0.02em',
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
    fontSize: '1rem',
    lineHeight: 1.8,
    color: '#475569',
    marginBottom: '2rem',
    fontWeight: 400,
  },
  trustRow: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
    marginBottom: '1.5rem',
    padding: '1rem',
    backgroundColor: '#f8fafc',
    borderRadius: '16px',
    border: '1px solid rgba(0,0,0,0.03)',
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
    padding: '1.5rem 0 0.5rem',
    borderTop: '1px solid #E6E2DA',
    marginTop: '1.5rem',
    position: 'relative',
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
    padding: '1.25rem 1.5rem',
    backgroundColor: '#10b981', // A slightly brighter, more modern emerald green
    color: '#ffffff',
    border: 'none',
    borderRadius: '100px',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
    fontFamily: 'var(--font-body)',
    boxShadow: '0 8px 25px rgba(16, 185, 129, 0.3)',
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
