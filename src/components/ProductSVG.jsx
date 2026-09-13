import React from 'react';

export default function ProductSVG({ category, colorHex }) {
  const accentColor = colorHex || 'hsl(var(--primary-color))';

  const renderSVG = () => {
    switch (category) {
      case 'sofa':
        return (
          <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={styles.svg}>
            {/* Background Shadow */}
            <ellipse cx="100" cy="108" rx="80" ry="8" fill="rgba(30, 29, 27, 0.06)" />
            {/* Wooden Legs */}
            <line x1="45" y1="92" x2="35" y2="108" stroke="#8d6e63" strokeWidth="6" strokeLinecap="round" />
            <line x1="45" y1="92" x2="35" y2="108" stroke="#dfb15b" strokeWidth="6" strokeLinecap="round" strokeDasharray="6 10" />
            <line x1="155" y1="92" x2="165" y2="108" stroke="#8d6e63" strokeWidth="6" strokeLinecap="round" />
            <line x1="155" y1="92" x2="165" y2="108" stroke="#dfb15b" strokeWidth="6" strokeLinecap="round" strokeDasharray="6 10" />
            {/* Sofa Base */}
            <rect x="30" y="80" width="140" height="15" rx="4" fill="#4e342e" />
            {/* Main Cushion Upholstery */}
            <rect x="25" y="45" width="150" height="38" rx="8" fill={accentColor} />
            <rect x="35" y="40" width="130" height="35" rx="6" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
            {/* Tufting Dots */}
            <circle cx="50" cy="58" r="2.5" fill="rgba(0,0,0,0.2)" />
            <circle cx="75" cy="58" r="2.5" fill="rgba(0,0,0,0.2)" />
            <circle cx="100" cy="58" r="2.5" fill="rgba(0,0,0,0.2)" />
            <circle cx="125" cy="58" r="2.5" fill="rgba(0,0,0,0.2)" />
            <circle cx="150" cy="58" r="2.5" fill="rgba(0,0,0,0.2)" />
            {/* Seat Cushions */}
            <rect x="30" y="72" width="68" height="10" rx="3" fill="rgba(255,255,255,0.1)" stroke="rgba(0,0,0,0.15)" />
            <rect x="102" y="72" width="68" height="10" rx="3" fill="rgba(255,255,255,0.1)" stroke="rgba(0,0,0,0.15)" />
            {/* Armrests */}
            <rect x="15" y="55" width="18" height="30" rx="6" fill={accentColor} stroke="rgba(0,0,0,0.1)" />
            <rect x="167" y="55" width="18" height="30" rx="6" fill={accentColor} stroke="rgba(0,0,0,0.1)" />
          </svg>
        );

      case 'beds':
        return (
          <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={styles.svg}>
            <ellipse cx="100" cy="112" rx="75" ry="6" fill="rgba(30, 29, 27, 0.05)" />
            {/* Headboard */}
            <rect x="35" y="20" width="130" height="75" rx="12" fill={accentColor} />
            <rect x="43" y="28" width="114" height="45" rx="8" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="2" strokeDasharray="4 4" />
            {/* Bed Frame Base */}
            <rect x="40" y="85" width="120" height="20" rx="3" fill="#3e2723" />
            {/* Mattress */}
            <rect x="42" y="75" width="116" height="13" rx="4" fill="#fafafa" stroke="#e0e0e0" />
            {/* Pillows */}
            <rect x="52" y="62" width="42" height="15" rx="4" fill="#ffffff" stroke="#e0e0e0" />
            <rect x="106" y="62" width="42" height="15" rx="4" fill="#ffffff" stroke="#e0e0e0" />
            {/* Bed Blanket Coverlet */}
            <path d="M 42 82 L 158 82 L 158 102 C 158 104, 154 105, 152 105 L 100 105 L 90 92 L 42 92 Z" fill="rgba(30, 29, 27, 0.1)" />
          </svg>
        );

      case 'dining':
        return (
          <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={styles.svg}>
            <ellipse cx="100" cy="106" rx="80" ry="7" fill="rgba(30, 29, 27, 0.06)" />
            {/* Table Legs */}
            <line x1="55" y1="65" x2="65" y2="106" stroke="#212121" strokeWidth="5" strokeLinecap="round" />
            <line x1="145" y1="65" x2="135" y2="106" stroke="#212121" strokeWidth="5" strokeLinecap="round" />
            <line x1="100" y1="65" x2="100" y2="106" stroke="#dfb15b" strokeWidth="4" />
            {/* Dining Table Top (Marble) */}
            <rect x="35" y="52" width="130" height="14" rx="4" fill="#eceff1" stroke="#cfd8dc" strokeWidth="2" />
            {/* Marble Veins */}
            <path d="M 45 55 Q 60 58 75 55 T 110 57" stroke="rgba(0,0,0,0.06)" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M 120 54 Q 135 56 150 54" stroke="rgba(197, 168, 128, 0.3)" strokeWidth="1.5" strokeLinecap="round" />
            {/* Dining Chairs (Silhouettes) */}
            <path d="M 22 55 L 28 55 L 28 95 L 22 95 Z" fill={accentColor} opacity="0.8" />
            <path d="M 20 65 L 34 65 L 34 78 L 20 78 Z" fill={accentColor} opacity="0.9" />
            <path d="M 172 55 L 178 55 L 178 95 L 172 95 Z" fill={accentColor} opacity="0.8" />
            <path d="M 166 65 L 180 65 L 180 78 L 166 78 Z" fill={accentColor} opacity="0.9" />
          </svg>
        );

      case 'decor':
        return (
          <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={styles.svg}>
            {/* Rug or Art Frame */}
            <rect x="30" y="20" width="140" height="80" rx="8" fill="#f5f2ea" stroke="hsl(var(--primary-color))" strokeWidth="1.5" />
            {/* Grid Pattern */}
            <path d="M 30 40 L 170 40 M 30 60 L 170 60 M 30 80 L 170 80 M 65 20 L 65 100 M 100 20 L 100 100 M 135 20 L 135 100" stroke="rgba(197, 168, 128, 0.25)" strokeWidth="1" />
            {/* Gold Accent Circle */}
            <circle cx="100" cy="50" r="22" fill="none" stroke={accentColor} strokeWidth="2.5" />
            <circle cx="100" cy="50" r="14" fill="rgba(197, 168, 128, 0.15)" />
            {/* Fringe details for rug */}
            <path d="M 24 20 L 29 20 M 24 30 L 29 30 M 24 40 L 29 40 M 24 50 L 29 50 M 24 60 L 29 60 M 24 70 L 29 70 M 24 80 L 29 80 M 24 90 L 29 90 M 24 100 L 29 100" stroke="hsl(var(--primary-color))" strokeWidth="1.5" />
            <path d="M 171 20 L 176 20 M 171 30 L 176 30 M 171 40 L 176 40 M 171 50 L 176 50 M 171 60 L 176 60 M 171 70 L 176 70 M 171 80 L 176 80 M 171 90 L 176 90 M 171 100 L 176 100" stroke="hsl(var(--primary-color))" strokeWidth="1.5" />
          </svg>
        );

      case 'kitchen':
        return (
          <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={styles.svg}>
            <ellipse cx="100" cy="108" rx="60" ry="5" fill="rgba(30, 29, 27, 0.05)" />
            {/* Coffee Maker or Pot Outline */}
            <rect x="75" y="30" width="50" height="70" rx="8" fill="#eceff1" stroke="#b0bec5" strokeWidth="2.5" />
            <rect x="75" y="30" width="50" height="25" fill={accentColor} rx="6" />
            {/* Glass Carafe section */}
            <rect x="80" y="60" width="40" height="35" rx="4" fill="rgba(197, 168, 128, 0.1)" stroke="rgba(0,0,0,0.15)" />
            {/* Handle */}
            <path d="M 125 45 C 138 45 138 75 125 75" stroke="#37474f" strokeWidth="5" strokeLinecap="round" />
            {/* Dial Button */}
            <circle cx="100" cy="42" r="5" fill="#fff" />
            <circle cx="100" cy="42" r="2" fill="hsl(var(--primary-color))" />
          </svg>
        );

      case 'wardrobes':
        return (
          <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={styles.svg}>
            <ellipse cx="100" cy="114" rx="70" ry="5" fill="rgba(30, 29, 27, 0.06)" />
            {/* Wardrobe Outer Cabinet */}
            <rect x="50" y="15" width="100" height="95" rx="4" fill={accentColor} stroke="#4e342e" strokeWidth="2" />
            {/* Wardrobe Doors */}
            <line x1="83" y1="15" x2="83" y2="110" stroke="rgba(0,0,0,0.2)" strokeWidth="1.5" />
            <line x1="117" y1="15" x2="117" y2="110" stroke="rgba(0,0,0,0.2)" strokeWidth="1.5" />
            {/* Mirrors on middle section */}
            <rect x="85" y="18" width="30" height="88" fill="rgba(197, 168, 128, 0.15)" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
            {/* Handles */}
            <line x1="80" y1="50" x2="80" y2="70" stroke="#dfb15b" strokeWidth="3" strokeLinecap="round" />
            <line x1="120" y1="50" x2="120" y2="70" stroke="#dfb15b" strokeWidth="3" strokeLinecap="round" />
          </svg>
        );

      case 'recliners':
        return (
          <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={styles.svg}>
            <ellipse cx="100" cy="108" rx="65" ry="6" fill="rgba(30, 29, 27, 0.06)" />
            {/* Recliner Base */}
            <rect x="50" y="85" width="100" height="15" rx="6" fill="#37474f" />
            {/* Upholstered Backrest */}
            <rect x="62" y="30" width="76" height="58" rx="14" fill={accentColor} stroke="rgba(0,0,0,0.08)" />
            <rect x="70" y="25" width="60" height="15" rx="5" fill={accentColor} />
            {/* Horizontal stitches */}
            <line x1="68" y1="50" x2="132" y2="50" stroke="rgba(0,0,0,0.1)" strokeWidth="1.5" />
            <line x1="68" y1="68" x2="132" y2="68" stroke="rgba(0,0,0,0.1)" strokeWidth="1.5" />
            {/* Armrests */}
            <rect x="42" y="55" width="22" height="35" rx="6" fill={accentColor} stroke="rgba(0,0,0,0.1)" />
            <rect x="136" y="55" width="22" height="35" rx="6" fill={accentColor} stroke="rgba(0,0,0,0.1)" />
          </svg>
        );

      case 'study':
        return (
          <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={styles.svg}>
            <ellipse cx="100" cy="108" rx="75" ry="6" fill="rgba(30, 29, 27, 0.05)" />
            {/* Heavy-Duty Metal Legs */}
            <line x1="50" y1="58" x2="50" y2="108" stroke="#37474f" strokeWidth="5" strokeLinecap="round" />
            <line x1="150" y1="58" x2="150" y2="108" stroke="#37474f" strokeWidth="5" strokeLinecap="round" />
            <line x1="45" y1="106" x2="65" y2="106" stroke="#37474f" strokeWidth="5" strokeLinecap="round" />
            <line x1="135" y1="106" x2="155" y2="106" stroke="#37474f" strokeWidth="5" strokeLinecap="round" />
            {/* Solid Desk Top */}
            <rect x="35" y="48" width="130" height="10" rx="2" fill={accentColor} stroke="#4e342e" strokeWidth="1.5" />
            {/* Drawers or desktop objects (Minimal Laptop outline) */}
            <rect x="85" y="38" width="30" height="10" rx="1" fill="#b0bec5" />
            <line x1="80" y1="47" x2="120" y2="47" stroke="#37474f" strokeWidth="2" />
          </svg>
        );

      case 'shelves':
        return (
          <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={styles.svg}>
            <ellipse cx="100" cy="110" rx="70" ry="5" fill="rgba(30, 29, 27, 0.05)" />
            {/* Wooden Shelves Planks */}
            <rect x="35" y="32" width="130" height="7" rx="2" fill="#8d6e63" />
            <rect x="35" y="62" width="130" height="7" rx="2" fill="#8d6e63" />
            <rect x="35" y="92" width="130" height="7" rx="2" fill="#8d6e63" />
            {/* Shelf Side Supports */}
            <line x1="45" y1="20" x2="45" y2="105" stroke="#37474f" strokeWidth="4" />
            <line x1="155" y1="20" x2="155" y2="105" stroke="#37474f" strokeWidth="4" />
            {/* Decorative items on shelves */}
            <rect x="55" y="20" width="12" height="12" rx="2" fill={accentColor} />
            <circle cx="61" cy="15" r="5" fill="#4caf50" />
            <rect x="120" y="44" width="6" height="18" fill="#e57373" />
            <rect x="127" y="42" width="6" height="20" fill="#64b5f6" />
            <rect x="134" y="46" width="6" height="16" fill="#ffd54f" />
          </svg>
        );

      default:
        return (
          <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg" style={styles.svg}>
            <rect x="50" y="30" width="100" height="60" rx="6" fill="rgba(197,168,128,0.15)" stroke="hsl(var(--primary-color))" strokeDasharray="4 4" />
          </svg>
        );
    }
  };

  return (
    <div style={styles.container}>
      {renderSVG()}
    </div>
  );
}

const styles = {
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'hsl(var(--card-bg))',
    transition: 'var(--transition-smooth)',
  },
  svg: {
    width: '85%',
    height: '85%',
    maxHeight: '180px',
  }
};
