import React, { useState, useEffect, useRef } from 'react';
import { Search, Sparkles } from 'lucide-react';
import { openWhatsAppChannel } from '../whatsapp';

// WhatsApp SVG Icon (inline so Navbar stays self-contained)
function WhatsAppIcon({ size = 18 }) {
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

export default function Navbar({ searchQuery, onSearchChange, onSearchSubmit, products = [] }) {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const searchContainerRef = useRef(null);

  const handleNavWhatsApp = () => {
    openWhatsAppChannel();
  };

  // Generate suggestions based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSuggestions([]);
      return;
    }

    const searchLower = searchQuery.trim().toLowerCase();
    const newSuggestions = [];
    const addedText = new Set();

    // 1. Check for matching categories
    const categories = ['beds', 'dining', 'chairs', 'decor', 'tvunits', 'study', 'tables'];
    categories.forEach(cat => {
      if (cat.toLowerCase().includes(searchLower)) {
        const text = cat.charAt(0).toUpperCase() + cat.slice(1);
        if (!addedText.has(text)) {
          newSuggestions.push({ type: 'category', text, value: cat });
          addedText.add(text);
        }
      }
    });

    // 2. Check for matching products
    products.forEach(product => {
      if (product.name.toLowerCase().includes(searchLower)) {
        if (!addedText.has(product.name)) {
          newSuggestions.push({ type: 'product', text: product.name, value: product.name });
          addedText.add(product.name);
        }
      }
    });

    // Limit to top 6 suggestions to keep the dropdown manageable
    setSuggestions(newSuggestions.slice(0, 6));
  }, [searchQuery, products]);

  // Handle clicking outside the search container to close dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setIsSearchFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSuggestionClick = (suggestion) => {
    onSearchChange(suggestion.text);
    setIsSearchFocused(false);
    if (onSearchSubmit) {
      // Small delay to ensure state update before submit
      setTimeout(() => onSearchSubmit(), 0);
    }
  };

  return (
    <nav style={styles.nav}>
      {/* Removed the generic .container class so the navbar stretches full width, putting logo on the left edge */}
      <div className="navbar-container" style={styles.container}>
        {/* Logo */}
        <div style={styles.logoContainer}>
          <img src="/logo.jpg" alt="Efive Studio" style={styles.logoImage} />
        </div>

        {/* Tagline */}
        <div style={styles.navTagline} className="nav-tagline-desktop">
          We Curate Spaces,&nbsp;
          <span style={styles.navTaglineItalic}>Not Just Furniture.</span>
        </div>

        {/* Search Bar */}
        <div className="navbar-search" style={styles.searchContainer} ref={searchContainerRef}>
          <Search
            size={18}
            style={{ ...styles.searchIcon, pointerEvents: 'auto', cursor: 'pointer' }}
            onClick={() => {
              if (onSearchSubmit) onSearchSubmit();
              setIsSearchFocused(false);
            }}
          />
          <input
            type="text"
            placeholder="Search luxury furniture, rugs, decor..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                if (onSearchSubmit) onSearchSubmit();
                setIsSearchFocused(false);
              }
            }}
            style={styles.searchInput}
            aria-label="Search products"
          />

          {/* Autocomplete Dropdown */}
          {isSearchFocused && searchQuery && suggestions.length > 0 && (
            <div style={styles.dropdown}>
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  style={styles.dropdownItem}
                  onClick={() => handleSuggestionClick(suggestion)}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(197, 168, 128, 0.08)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <Search size={14} style={styles.dropdownIcon} />
                  <span style={styles.dropdownText}>{suggestion.text}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Navigation Actions */}
        <div style={styles.actions}>
          <div style={styles.premiumTag} className="premium-tag-desktop">
            <Sparkles size={14} style={{ color: 'hsl(var(--primary-color))' }} />
            <span style={styles.tagText}>Curated Collection</span>
          </div>

          {/* WhatsApp CTA button in Navbar */}
          <button
            onClick={handleNavWhatsApp}
            style={styles.waBtn}
            aria-label="Chat with Efive Studio on WhatsApp"
          >
            <WhatsAppIcon size={18} />
            <span style={styles.waBtnText}>Chat with us</span>
          </button>
        </div>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    position: 'sticky',
    top: 0,
    zIndex: 100,
    backgroundColor: 'rgba(250, 247, 242, 0.95)',
    backdropFilter: 'blur(10px)',
    borderBottom: '1px solid hsl(var(--border-color))',
    padding: '0.85rem 0',
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '1.5rem',
    padding: '0 2rem',
  },
  navTagline: {
    fontFamily: 'var(--font-heading)',
    fontSize: '1rem',
    fontWeight: 500,
    color: 'rgba(44, 43, 41, 0.45)',
    letterSpacing: '0.01em',
    whiteSpace: 'nowrap',
    flexShrink: 0,
  },
  navTaglineItalic: {
    fontStyle: 'italic',
    fontWeight: 600,
    color: 'rgba(156, 122, 79, 0.7)',
  },
  leftGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '2rem',
  },
  rightGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
    flex: '1',
    justifyContent: 'flex-end',
  },
  navTagline: {
    fontFamily: 'var(--font-heading)',
    fontSize: '1.05rem',
    fontWeight: '800',
    color: '#2C2B29',
    letterSpacing: '0.02em',
    whiteSpace: 'nowrap',
  },
  navTaglineHighlight: {
    fontStyle: 'italic',
    color: '#9C7A4F',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    flexShrink: 0,
    width: '120px',
    height: '45px',
    overflow: 'hidden',
  },
  logoImage: {
    height: '180px', // Large enough so the text fills the 120x45 box
    width: 'auto',
    objectFit: 'contain',
  },
  searchContainer: {
    position: 'relative',
    flex: '0 1 500px',
    display: 'flex',
    alignItems: 'center',
    marginLeft: 'auto',
  },
  searchIcon: {
    position: 'absolute',
    left: '1rem',
    color: 'hsl(var(--muted-color))',
    pointerEvents: 'none',
  },
  searchInput: {
    width: '100%',
    padding: '0.6rem 1rem 0.6rem 2.8rem',
    border: '1px solid hsl(var(--border-color))',
    borderRadius: '24px',
    backgroundColor: '#fff',
    color: 'hsl(var(--text-color))',
    fontFamily: 'var(--font-body)',
    fontSize: '0.9rem',
    outline: 'none',
    transition: 'var(--transition-smooth)',
  },
  dropdown: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    marginTop: '0.5rem',
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    border: '1px solid hsl(var(--border-color))',
    overflow: 'hidden',
    zIndex: 1000,
  },
  dropdownItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.75rem 1rem',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  dropdownIcon: {
    color: 'hsl(var(--muted-color))',
    flexShrink: 0,
  },
  dropdownText: {
    fontSize: '0.9rem',
    color: 'hsl(var(--text-color))',
    fontFamily: 'var(--font-body)',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    flexShrink: 0,
  },
  premiumTag: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.4rem',
    padding: '0.4rem 0.8rem',
    backgroundColor: 'rgba(197, 168, 128, 0.08)',
    borderRadius: '16px',
    border: '1px solid rgba(197, 168, 128, 0.15)',
  },
  tagText: {
    fontSize: '0.75rem',
    fontWeight: 500,
    color: 'hsl(var(--primary-color))',
    letterSpacing: '0.02em',
  },
  // WhatsApp button in navbar
  waBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 1rem',
    backgroundColor: '#25D366',
    color: '#ffffff',
    border: 'none',
    borderRadius: '20px',
    fontSize: '0.82rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.25s ease',
    fontFamily: 'var(--font-body)',
    letterSpacing: '0.02em',
    boxShadow: '0 2px 10px rgba(37, 211, 102, 0.3)',
    flexShrink: 0,
  },
  waBtnText: {
    // hidden on small screens via CSS class below
  },
};
