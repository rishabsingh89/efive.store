import React, { useState } from 'react';
import { ExternalLink, Copy, Check, ShoppingBag, Plus, Maximize2, X, Sparkles, Eye } from 'lucide-react';
import { getProducts } from '../../data/products';
import { useRoomDesigner } from './RoomDesignerContext';

export default function LivingRoomHotspotScene({ 
  isCompact = false, 
  onOpenProductModal, 
  onExpandView,
  style = {} 
}) {
  const { state, dispatch } = useRoomDesigner();
  const [activeHotspot, setActiveHotspot] = useState(false);
  const [copied, setCopied] = useState(false);

  // Decor product: decor-3 (Custom Name Macrame Nursery Wall Decor)
  const products = getProducts();
  const decorProduct = products.find((p) => p.id === 'decor-3') || {
    id: 'decor-3',
    name: 'Custom Name Macrame Nursery Wall Decor',
    price: 1599,
    originalPrice: 2399,
    images: ['/InShot_20260815_195530665.jpg.jpeg'],
    category: 'decor',
    description: 'Personalized handcrafted macrame wall decor ideal for living room and modern interiors.'
  };

  const productUrl = `${window.location.origin}/?category=decor&product=decor-3`;

  const handleCopyUrl = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(productUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenProduct = (e) => {
    e.stopPropagation();
    if (onOpenProductModal) {
      onOpenProductModal(decorProduct);
    } else {
      window.open(productUrl, '_blank');
    }
  };

  const handleAddToRoom = (e) => {
    e.stopPropagation();
    const roomId = state?.activeRoomId || 'living';
    dispatch({
      type: 'ADD_FURNITURE',
      payload: { roomId, product: decorProduct }
    });
  };

  return (
    <div 
      style={{
        ...styles.container,
        ...(isCompact ? styles.compactContainer : styles.fullContainer),
        ...style
      }}
      className="living-room-hotspot-container"
    >
      <style>{`
        @keyframes hotspotPulse {
          0% {
            box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7);
            transform: scale(1);
          }
          60% {
            box-shadow: 0 0 0 14px rgba(255, 255, 255, 0);
            transform: scale(1.08);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
            transform: scale(1);
          }
        }
        .hotspot-pin-btn {
          animation: hotspotPulse 2.2s infinite ease-in-out;
          transition: transform 0.2s ease, background-color 0.2s ease;
        }
        .hotspot-pin-btn:hover {
          transform: scale(1.22) !important;
          background-color: rgba(255, 255, 255, 0.5) !important;
        }
        @media (max-width: 600px) {
          .hotspot-popover-card {
            width: 250px !important;
            padding: 10px !important;
          }
        }
      `}</style>

      {/* Background Living Room Image */}
      <img 
        src="/images/living_room_bg.jpg" 
        alt="Modern Living Room with Handcrafted Macrame Decor"
        style={styles.image}
        loading="eager"
      />

      {/* Top Banner in Full View */}
      {!isCompact && (
        <div style={styles.topBadgeBar}>
          <div style={styles.badgePill}>
            <Sparkles size={14} style={{ color: '#C5A880' }} />
            <span>Interactive 3D Living Room • Touch Decor to Shop</span>
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

      {/* ── 3D HOTSPOT ON WALL DECOR ── */}
      {/* Coordinates: green arch macrame hanging at 41.5% X, 43.5% Y */}
      <div 
        style={{
          position: 'absolute',
          top: '43.5%',
          left: '41.5%',
          transform: 'translate(-50%, -50%)',
          zIndex: 25
        }}
        onClick={(e) => {
          e.stopPropagation();
          setActiveHotspot(!activeHotspot);
        }}
      >
        {/* Hotspot Outer Ring (Transparent Circle) + Center Dot (White Bindu) */}
        <div 
          className="hotspot-pin-btn"
          style={styles.hotspotPin}
          title="Wall Decor - Click to view URL & Price"
        >
          {/* White Center Dot (Bindu) */}
          <div style={styles.hotspotDot} />
        </div>

        {/* Floating Tooltip / Popover on Touch or Click */}
        {activeHotspot && (
          <div 
            className="hotspot-popover-card"
            style={{
              ...styles.popover,
              ...(isCompact ? styles.compactPopover : styles.fullPopover)
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Popover Header */}
            <div style={styles.popoverHeader}>
              <span style={styles.popoverTag}>Wall Decor</span>
              <button 
                onClick={() => setActiveHotspot(false)} 
                style={styles.closeBtn}
                aria-label="Close"
              >
                <X size={14} />
              </button>
            </div>

            {/* Product Image & Title */}
            <div style={styles.popoverBody}>
              <img 
                src={decorProduct.images?.[0] || '/InShot_20260815_195530665.jpg.jpeg'} 
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

            {/* Direct URL Display with Copy Button */}
            <div style={styles.urlSection}>
              <div style={styles.urlLabel}>Product URL:</div>
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

            {/* Action Buttons */}
            <div style={styles.actionRow}>
              <button 
                onClick={handleOpenProduct}
                style={styles.buyBtn}
              >
                <ShoppingBag size={13} />
                <span>Buy (₹{decorProduct.price.toLocaleString('en-IN')})</span>
              </button>

              <button 
                onClick={handleAddToRoom}
                style={styles.addRoomBtn}
                title="Add to current 3D room"
              >
                <Plus size={13} />
                <span>Add</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1E1D1B',
    userSelect: 'none',
  },
  compactContainer: {
    width: '100%',
    height: '170px',
    borderRadius: '10px',
    boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
  },
  fullContainer: {
    width: '100%',
    height: '100%',
    minHeight: '420px',
    borderRadius: '0px',
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
    width: '26px',
    height: '26px',
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
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    border: '2px solid rgba(255, 255, 255, 0.95)',
    boxShadow: '0 0 14px rgba(255, 255, 255, 0.85), 0 3px 6px rgba(0,0,0,0.4)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    backdropFilter: 'blur(3px)',
  },
  hotspotDot: {
    width: '9px',
    height: '9px',
    borderRadius: '50%',
    backgroundColor: '#FFFFFF',
    boxShadow: '0 0 5px rgba(0,0,0,0.6)',
  },
  popover: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    backdropFilter: 'blur(12px)',
    borderRadius: '12px',
    padding: '12px',
    boxShadow: '0 12px 30px rgba(0,0,0,0.3)',
    border: '1px solid rgba(197, 168, 128, 0.35)',
    zIndex: 100,
  },
  compactPopover: {
    width: '240px',
    top: '34px',
    left: '50%',
    transform: 'translateX(-50%)',
  },
  fullPopover: {
    width: '290px',
    top: '38px',
    left: '50%',
    transform: 'translateX(-50%)',
  },
  popoverHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '6px',
  },
  popoverTag: {
    fontSize: '0.68rem',
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
    gap: '8px',
    marginBottom: '8px',
  },
  productThumb: {
    width: '48px',
    height: '48px',
    borderRadius: '6px',
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
    fontSize: '0.78rem',
    fontWeight: 700,
    color: '#1E1D1B',
    margin: '0 0 3px 0',
    lineHeight: 1.25,
  },
  priceRow: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '5px',
  },
  price: {
    fontSize: '0.9rem',
    fontWeight: 800,
    color: '#1E1D1B',
  },
  origPrice: {
    fontSize: '0.72rem',
    color: '#888',
    textDecoration: 'line-through',
  },
  discountBadge: {
    fontSize: '0.62rem',
    fontWeight: 700,
    color: '#2e7d32',
    backgroundColor: '#e8f5e9',
    padding: '1px 4px',
    borderRadius: '4px',
  },
  urlSection: {
    backgroundColor: '#F5F5F3',
    borderRadius: '6px',
    padding: '5px 7px',
    marginBottom: '8px',
  },
  urlLabel: {
    fontSize: '0.65rem',
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
    fontSize: '0.66rem',
    color: '#0058a3',
    fontFamily: 'monospace',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    maxWidth: '160px',
  },
  copyBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '3px',
    padding: '2px 6px',
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
    gap: '5px',
  },
  buyBtn: {
    flex: 1,
    padding: '7px 8px',
    borderRadius: '6px',
    border: 'none',
    backgroundColor: '#0058a3', // IKEA Blue
    color: '#fff',
    fontSize: '0.72rem',
    fontWeight: 700,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4px',
    cursor: 'pointer',
    transition: 'background 0.2s',
  },
  addRoomBtn: {
    padding: '7px 8px',
    borderRadius: '6px',
    border: '1px solid #C5A880',
    backgroundColor: 'rgba(197, 168, 128, 0.1)',
    color: '#8c6d46',
    fontSize: '0.72rem',
    fontWeight: 700,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '3px',
    cursor: 'pointer',
  }
};
