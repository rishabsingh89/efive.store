import React, { useState } from 'react';
import { Star } from 'lucide-react';
import ProductSVG from './ProductSVG';
import { openWhatsApp } from '../whatsapp';

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

export default function ProductCard({ product, onQuickView }) {
  const { name, id, category, price, originalPrice, rating, reviews, colors } = product;

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedColor, setSelectedColor] = useState(colors && colors.length > 0 ? colors[0] : null);

  const displayPrice = selectedColor?.price || price;
  const displayOriginalPrice = selectedColor?.originalPrice || originalPrice;

  const discountPercent = product.discountPercentage || (displayOriginalPrice && displayOriginalPrice > displayPrice
    ? Math.round(((displayOriginalPrice - displayPrice) / displayOriginalPrice) * 100)
    : 0);

  const displayDiscountBadge = product.showDiscountBadge !== false && discountPercent > 0;

  const handleWhatsApp = (e) => {
    e.stopPropagation();
    openWhatsApp({
      productName: name,
      productId: id,
      price: displayPrice,
      colorName: selectedColor ? selectedColor.name : undefined,
    });
  };

  const handleColorClick = (e, col) => {
    e.stopPropagation();
    setSelectedColor(col);
    if (typeof col.imageIdx === 'number' && product.images && product.images.length > col.imageIdx) {
      setActiveImageIdx(col.imageIdx);
    }
  };

  return (
    <div className="product-card-enhanced">
      {/* Product Image Section */}
      <div 
        className="product-image-container"
        style={{ cursor: 'pointer' }}
        onClick={() => onQuickView(product)}
      >
        {displayDiscountBadge && (
          <span style={styles.discountBadge}>-{discountPercent}%</span>
        )}

        {product.images && product.images.length > 0 ? (
          <img src={product.images[activeImageIdx] || product.images[0]} alt={name} />
        ) : (
          <ProductSVG category={category} colorHex={selectedColor ? selectedColor.hex : null} />
        )}
      </div>

      {/* Product Details */}
      <div style={styles.details}>
        {/* Rating */}
        <div style={styles.ratingContainer}>
          <div style={styles.stars}>
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                fill={i < Math.floor(rating) ? '#C5A880' : 'none'}
                stroke={i < Math.floor(rating) ? '#C5A880' : '#E6E2DA'}
              />
            ))}
          </div>
          <span style={styles.ratingText}>({reviews} reviews)</span>
        </div>

        {/* Title */}
        <h3 onClick={() => onQuickView(product)} style={styles.title}>
          {name}
        </h3>

        {/* Color Swatches */}
        {colors && colors.length > 0 && (
          <div style={styles.swatches}>
            {colors.map((col, idx) => {
              const isSelected = selectedColor?.name === col.name;
              return (
                <button
                  key={idx}
                  onClick={(e) => handleColorClick(e, col)}
                  style={{
                    ...styles.swatchDot,
                    backgroundColor: col.hex,
                    border: isSelected ? '2px solid #fff' : '1px solid rgba(0,0,0,0.15)',
                    boxShadow: isSelected ? '0 0 0 2px #C5A880' : 'inset 0 1px 2px rgba(0,0,0,0.1)',
                    transform: isSelected ? 'scale(1.1)' : 'scale(1)',
                    cursor: 'pointer',
                    padding: 0
                  }}
                  title={col.name}
                  aria-label={`Select ${col.name}`}
                />
              );
            })}
          </div>
        )}

        {/* Price + WhatsApp button */}
        <div style={styles.bottomRow}>
          <div style={styles.priceContainer}>
            <span style={styles.price}>₹{displayPrice.toLocaleString('en-IN')}</span>
            {displayOriginalPrice && (
              <span style={styles.originalPrice}>₹{displayOriginalPrice.toLocaleString('en-IN')}</span>
            )}
          </div>

          <button
            onClick={handleWhatsApp}
            style={styles.waBtn}
            title="Connect on WhatsApp"
            aria-label={`Connect on WhatsApp for ${name}`}
          >
            <WhatsAppIcon size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  // imageSection is now handled in CSS (.product-image-container)
  // card is also handled in CSS (.product-card-enhanced)
  discountBadge: {
    position: 'absolute',
    top: '0.75rem',
    left: '0.75rem',
    backgroundColor: 'hsl(var(--primary-color))',
    color: '#fff',
    fontSize: '0.7rem',
    fontWeight: 600,
    padding: '0.25rem 0.5rem',
    borderRadius: 'var(--radius-sm)',
    zIndex: 10,
    letterSpacing: '0.02em',
  },

  details: {
    padding: '1.25rem',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  ratingContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
    marginBottom: '0.5rem',
  },
  stars: {
    display: 'flex',
    gap: '1px',
  },
  ratingText: {
    fontSize: '0.75rem',
    color: 'hsl(var(--muted-color))',
    fontWeight: 500,
    marginTop: '2px',
  },
  title: {
    fontSize: '1.1rem',
    fontWeight: 600,
    color: 'hsl(var(--text-color))',
    marginBottom: '0.8rem',
    cursor: 'pointer',
    lineHeight: 1.4,
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    height: '3.1rem',
    transition: 'color 0.2s ease',
  },
  swatches: {
    display: 'flex',
    gap: '0.4rem',
    marginBottom: '0.75rem',
  },
  swatchDot: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    display: 'inline-block',
    border: '1px solid rgba(0,0,0,0.15)',
    boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.1)',
  },
  bottomRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 'auto',
  },
  priceContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  price: {
    fontSize: '1.15rem',
    fontWeight: 600,
    color: 'hsl(var(--text-color))',
  },
  originalPrice: {
    fontSize: '0.8rem',
    textDecoration: 'line-through',
    color: 'hsl(var(--muted-color))',
    marginTop: '0.1rem',
  },
  // WhatsApp round button replaces cart button
  waBtn: {
    width: '42px',
    height: '42px',
    borderRadius: '50%',
    backgroundColor: '#25D366',
    border: 'none',
    color: '#ffffff',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: '0 4px 12px rgba(37, 211, 102, 0.3)',
    flexShrink: 0,
  },
};
