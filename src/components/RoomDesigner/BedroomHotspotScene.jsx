import React, { useState } from 'react';
import { ExternalLink, Copy, Check, ShoppingBag, Plus, Maximize2, X, Sparkles, MessageCircle } from 'lucide-react';
import { getProducts } from '../../data/products';
import { useRoomDesigner } from './RoomDesignerContext';
import { openWhatsApp } from '../../whatsapp';

export default function BedroomHotspotScene({ 
  isCompact = false, 
  onOpenProductModal, 
  onSelectProductInSidebar,
  onExpandView,
  style = {} 
}) {
  const { state, dispatch } = useRoomDesigner();
  const [activeHotspot, setActiveHotspot] = useState(!isCompact);
  const [copied, setCopied] = useState(false);

  const products = getProducts();
  const decorProduct = products.find((p) => p.id === 'decor-3') || {
    id: 'decor-3',
    name: 'Custom Name Macrame Nursery Wall Decor',
    price: 1599,
    originalPrice: 2399,
    images: ['/InShot_20260815_195530665.jpg.jpeg'],
    category: 'decor'
  };

  const productUrl = `${window.location.origin}/?category=decor&product=decor-3`;

  const handleCopyUrl = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(productUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenProduct = (e) => {
    if (e) e.stopPropagation();
    
    // 1. Update browser URL so a direct link is generated
    try {
      const url = new URL(window.location.href);
      url.searchParams.set('category', 'decor');
      url.searchParams.set('product', 'decor-3');
      window.history.pushState({}, '', url.toString());
    } catch (err) {
      console.warn('Could not update history state', err);
    }

    // 2. Open Product Modal
    if (onOpenProductModal && decorProduct) {
      onOpenProductModal(decorProduct);
    } else if (decorProduct) {
      window.location.href = `/?category=decor&product=decor-3`;
    }

    // 3. Switch sidebar to product detail if callback exists
    if (onSelectProductInSidebar) {
      onSelectProductInSidebar(decorProduct);
    }
  };

  const handleWhatsApp = (e) => {
    e.stopPropagation();
    openWhatsApp({
      name: decorProduct.name,
      id: decorProduct.id,
      price: decorProduct.price,
      image: decorProduct.images?.[0] || '/images/bedroom_decor_tassel.jpg'
    });
  };

  const handleAddToRoom = (e) => {
    e.stopPropagation();
    const roomId = state?.activeRoomId || 'bedroom';
    dispatch({
      type: 'ADD_FURNITURE',
      payload: { roomId, product: decorProduct }
    });
  };

  return (
    <div 
      style={{
        position: 'relative',
        width: '100%',
        ...(isCompact ? styles.compactWrapper : styles.fullWrapper),
        ...style
      }}
      className="bedroom-hotspot-wrapper"
    >
      <style>{`
        @keyframes hotspotPulse {
          0% {
            box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.75);
            transform: scale(1);
          }
          60% {
            box-shadow: 0 0 0 16px rgba(255, 255, 255, 0);
            transform: scale(1.08);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
            transform: scale(1);
          }
        }
        .hotspot-interactive-btn {
          animation: hotspotPulse 2s infinite ease-in-out;
          transition: transform 0.2s ease, background-color 0.2s ease;
          cursor: pointer;
        }
        .hotspot-interactive-btn:hover {
          transform: scale(1.25) !important;
          background-color: rgba(255, 255, 255, 0.6) !important;
        }
        .hotspot-interactive-btn:active {
          transform: scale(0.95) !important;
        }
        .popover-clickable-card {
          cursor: pointer;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }
        .popover-clickable-card:hover {
          box-shadow: 0 14px 36px rgba(0,0,0,0.35) !important;
        }
      `}</style>

      {/* Image container with rounded corners */}
      <div 
        style={{
          width: '100%',
          height: isCompact ? 'auto' : '100%',
          aspectRatio: isCompact ? '16/9' : 'auto',
          minHeight: isCompact ? 'auto' : '420px',
          position: 'relative',
          borderRadius: isCompact ? '12px' : '0px',
          overflow: 'hidden',
          backgroundColor: '#1E1D1B',
          cursor: isCompact ? 'pointer' : 'default'
        }}
        onClick={isCompact ? handleOpenProduct : undefined}
      >
        <img 
          src="/images/bedroom_bg.jpg" 
          alt="Modern Bedroom with Handcrafted Macrame Decor"
          style={styles.image}
          loading="eager"
        />

        {/* Top Banner in Full View */}
        {!isCompact && (
          <div style={styles.topBadgeBar}>
            <div style={styles.badgePill}>
              <Sparkles size={14} style={{ color: '#C5A880' }} />
              <span>Interactive 3D Bedroom • Touch Decor to Shop</span>
            </div>
          </div>
        )}

        {/* Expand Button for Compact Mode */}
        {isCompact && onExpandView && (
          <button 
            onClick={(e) => { e.stopPropagation(); onExpandView(); }} 
            style={styles.expandBtn}
            title="Fullscreen Inspiration View"
          >
            <Maximize2 size={13} />
          </button>
        )}

        {/* Coordinates: Decor hanging above bed at ~55% X, ~30% Y */}
        <div 
          style={{
            position: 'absolute',
            top: '30%',
            left: '55%',
            transform: 'translate(-50%, -50%)',
            zIndex: 30
          }}
          onClick={(e) => {
            e.stopPropagation();
            // In compact view, tapping directly opens the product!
            if (isCompact) {
              handleOpenProduct();
            } else {
              setActiveHotspot(!activeHotspot);
            }
          }}
        >
          {/* Circular Hotspot: Transparent outer circle + White center dot (bindu) */}
          <div 
            className="hotspot-interactive-btn"
            style={styles.hotspotPin}
            title="Touch to open Decor details & Buy"
          >
            <div style={styles.hotspotDot} />
          </div>
        </div>
      </div>

      {/* Floating Popover / Card for Non-Compact View or Expanded Card */}
      {(!isCompact && activeHotspot) && (
        <div 
          style={{
            position: 'absolute',
            top: '36%',
            left: '55%',
            transform: 'translate(-50%, 0)',
            zIndex: 100,
            width: '300px',
            maxWidth: '90vw'
          }}
        >
          <div 
            className="popover-clickable-card"
            style={styles.popover}
            onClick={handleOpenProduct}
          >
            <div style={styles.popoverHeader}>
              <span style={styles.popoverTag}>Wall Decor • ₹1,599</span>
              <button 
                onClick={(e) => { e.stopPropagation(); setActiveHotspot(false); }} 
                style={styles.closeBtn}
                aria-label="Close"
              >
                <X size={14} />
              </button>
            </div>

            <div style={styles.popoverBody}>
              <img 
                src={decorProduct.images?.[0] || '/images/bedroom_decor_tassel.jpg'} 
                alt={decorProduct.name}
                style={styles.productThumb}
              />
              <div style={styles.productDetails}>
                <h4 style={styles.productName}>{decorProduct.name}</h4>
                <div style={styles.priceRow}>
                  <span style={styles.price}>₹{decorProduct.price.toLocaleString('en-IN')}</span>
                  {decorProduct.originalPrice && (
                    <span style={styles.origPrice}>₹{decorProduct.originalPrice.toLocaleString('en-IN')}</span>
                  )}
                  <span style={styles.discountBadge}>33% OFF</span>
                </div>
              </div>
            </div>

            <div style={styles.urlSection}>
              <div style={styles.urlLabel}>Product Link:</div>
              <div style={styles.urlBox}>
                <span style={styles.urlText}>{productUrl}</span>
                <button 
                  onClick={handleCopyUrl} 
                  style={styles.copyBtn}
                  title="Copy Direct URL"
                >
                  {copied ? <Check size={12} style={{ color: '#2e7d32' }} /> : <Copy size={12} />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            <div style={styles.actionRow}>
              <button 
                onClick={handleOpenProduct}
                style={styles.buyBtn}
                title="Open Product Page"
              >
                <ShoppingBag size={13} />
                <span>View Details & Buy</span>
              </button>

              <button 
                onClick={handleWhatsApp}
                style={styles.whatsAppBtn}
                title="Inquire / Order on WhatsApp"
              >
                <MessageCircle size={13} />
                <span>WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* In Compact Mode: Sleek direct action bar below the image */}
      {isCompact && (
        <div style={styles.compactBottomBar}>
          <div 
            style={styles.compactProductInfo}
            onClick={handleOpenProduct}
            title="Click to open Decor product"
          >
            <img 
              src={decorProduct.images?.[0] || '/images/bedroom_decor_tassel.jpg'} 
              alt={decorProduct.name}
              style={styles.compactThumb}
            />
            <div style={{ overflow: 'hidden' }}>
              <div style={styles.compactTitle}>{decorProduct.name}</div>
              <div style={styles.compactPrice}>₹{decorProduct.price.toLocaleString('en-IN')} <span style={styles.compactOrigPrice}>₹{decorProduct.originalPrice?.toLocaleString('en-IN')}</span></div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            <button 
              onClick={handleOpenProduct}
              style={styles.compactBuyBtn}
              title="Touch to open product details & buy"
            >
              <ShoppingBag size={13} />
              <span>Buy</span>
            </button>
            <button 
              onClick={handleWhatsApp}
              style={styles.compactWhatsAppBtn}
              title="Order on WhatsApp"
            >
              <MessageCircle size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  compactWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  fullWrapper: {
    height: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
  },
  topBadgeBar: {
    position: 'absolute',
    top: '16px',
    left: '16px',
    zIndex: 10,
  },
  badgePill: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    backgroundColor: 'rgba(255, 255, 255, 0.94)',
    backdropFilter: 'blur(8px)',
    padding: '6px 14px',
    borderRadius: '20px',
    fontSize: '0.8rem',
    fontWeight: 600,
    color: '#1E1D1B',
    boxShadow: '0 2px 10px rgba(0,0,0,0.15)',
  },
  expandBtn: {
    position: 'absolute',
    top: '8px',
    right: '8px',
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#222',
    boxShadow: '0 2px 6px rgba(0,0,0,0.25)',
    zIndex: 15,
  },
  hotspotPin: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    backgroundColor: 'rgba(255, 255, 255, 0.35)',
    border: '2px solid rgba(255, 255, 255, 0.95)',
    boxShadow: '0 0 14px rgba(255, 255, 255, 0.85), 0 3px 6px rgba(0,0,0,0.4)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    backdropFilter: 'blur(3px)',
  },
  hotspotDot: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    backgroundColor: '#FFFFFF',
    boxShadow: '0 0 5px rgba(0,0,0,0.7)',
  },
  popover: {
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    backdropFilter: 'blur(12px)',
    borderRadius: '14px',
    padding: '14px',
    boxShadow: '0 12px 32px rgba(0,0,0,0.3)',
    border: '1px solid rgba(197, 168, 128, 0.4)',
  },
  popoverHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
  },
  popoverTag: {
    fontSize: '0.72rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    color: '#B89970',
    letterSpacing: '0.04em',
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    color: '#888',
    cursor: 'pointer',
    padding: '2px',
    display: 'flex',
  },
  popoverBody: {
    display: 'flex',
    gap: '10px',
    marginBottom: '10px',
  },
  productThumb: {
    width: '52px',
    height: '52px',
    borderRadius: '8px',
    objectFit: 'cover',
    border: '1px solid #eee',
    flexShrink: 0,
  },
  productDetails: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  productName: {
    fontSize: '0.82rem',
    fontWeight: 700,
    color: '#1E1D1B',
    margin: '0 0 3px 0',
    lineHeight: 1.25,
  },
  priceRow: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '6px',
  },
  price: {
    fontSize: '0.95rem',
    fontWeight: 800,
    color: '#1E1D1B',
  },
  origPrice: {
    fontSize: '0.75rem',
    color: '#888',
    textDecoration: 'line-through',
  },
  discountBadge: {
    fontSize: '0.65rem',
    fontWeight: 700,
    color: '#2e7d32',
    backgroundColor: '#e8f5e9',
    padding: '1px 5px',
    borderRadius: '4px',
  },
  urlSection: {
    backgroundColor: '#F5F5F3',
    borderRadius: '8px',
    padding: '6px 8px',
    marginBottom: '10px',
  },
  urlLabel: {
    fontSize: '0.68rem',
    color: '#777',
    fontWeight: 600,
    marginBottom: '2px',
  },
  urlBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '4px',
  },
  urlText: {
    fontSize: '0.68rem',
    color: '#0058a3',
    fontFamily: 'monospace',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    maxWidth: '170px',
  },
  copyBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '3px',
    padding: '3px 6px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    backgroundColor: '#fff',
    fontSize: '0.65rem',
    fontWeight: 600,
    color: '#333',
    cursor: 'pointer',
    flexShrink: 0,
  },
  actionRow: {
    display: 'flex',
    gap: '6px',
  },
  buyBtn: {
    flex: 1,
    padding: '8px 10px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#0058a3', // IKEA Blue
    color: '#fff',
    fontSize: '0.75rem',
    fontWeight: 700,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '5px',
    cursor: 'pointer',
    transition: 'background 0.2s',
  },
  whatsAppBtn: {
    padding: '8px 12px',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#25D366', // WhatsApp Green
    color: '#fff',
    fontSize: '0.75rem',
    fontWeight: 700,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4px',
    cursor: 'pointer',
  },
  // Compact Bottom Bar (never clipped, always accessible)
  compactBottomBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    border: '1px solid #E6E2DA',
    borderRadius: '10px',
    padding: '8px 10px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
    gap: '8px',
  },
  compactProductInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    overflow: 'hidden',
    cursor: 'pointer',
    flex: 1,
  },
  compactThumb: {
    width: '36px',
    height: '36px',
    borderRadius: '6px',
    objectFit: 'cover',
    border: '1px solid #eee',
    flexShrink: 0,
  },
  compactTitle: {
    fontSize: '0.78rem',
    fontWeight: 700,
    color: '#1E1D1B',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    lineHeight: 1.2,
  },
  compactPrice: {
    fontSize: '0.8rem',
    fontWeight: 800,
    color: '#B89970',
  },
  compactOrigPrice: {
    fontSize: '0.7rem',
    color: '#999',
    textDecoration: 'line-through',
    fontWeight: 400,
  },
  compactBuyBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    padding: '7px 12px',
    backgroundColor: '#0058A3',
    color: '#fff',
    borderRadius: '6px',
    border: 'none',
    fontSize: '0.75rem',
    fontWeight: 700,
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  },
  compactWhatsAppBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '32px',
    height: '32px',
    backgroundColor: '#25D366',
    color: '#fff',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    flexShrink: 0,
  }
};
