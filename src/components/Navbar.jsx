import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Sparkles, ShoppingCart, Heart, User } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { getCategories } from '../data/products';
import ContactUsModal from './ContactUsModal';
import CartDrawer from './CartDrawer';

const EMPTY_PRODUCTS = [];

export default function Navbar({ searchQuery = '', onSearchChange, onSearchSubmit, products = EMPTY_PRODUCTS }) {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const searchContainerRef = useRef(null);
  const userDropdownRef = useRef(null);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cartCount, wishlistItems, cartItems, updateQuantity, deleteItem } = useCart();
  const [searchParams, setSearchParams] = useSearchParams();

  // Generate suggestions based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSuggestions(prev => prev.length === 0 ? prev : []);
      return;
    }

    const searchLower = searchQuery.trim().toLowerCase();
    const newSuggestions = [];
    const addedText = new Set();

    // 1. Check for matching categories
    const categoriesList = getCategories();
    categoriesList.forEach(c => {
      const cat = c.id;
      if (cat.toLowerCase().includes(searchLower) || c.name.toLowerCase().includes(searchLower)) {
        const text = c.name;
        if (!addedText.has(text)) {
          newSuggestions.push({ type: 'category', text, value: cat });
          addedText.add(text);
        }
      }
    });

    // 2. Check for matching products (by name or category)
    products.forEach(product => {
      const matchesName = product.name.toLowerCase().includes(searchLower);
      const matchesCategory = product.category.toLowerCase().includes(searchLower);
      
      if (matchesName || matchesCategory) {
        if (!addedText.has(product.name)) {
          newSuggestions.push({ type: 'product', text: product.name, value: product.name, product: product });
          addedText.add(product.name);
        }
      }
    });

    // Limit to top 6 suggestions to keep the dropdown manageable
    setSuggestions(newSuggestions.slice(0, 6));
  }, [searchQuery, products]);

  // Handle clicking outside the search container and user dropdown to close them
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setIsSearchFocused(false);
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setIsUserDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSuggestionClick = (suggestion) => {
    setIsSearchFocused(false);
    
    if (suggestion.type === 'product' && suggestion.product) {
      // Direct navigation to product modal
      setSearchParams(prev => {
        prev.set('product', suggestion.product.id);
        return prev;
      });
      // Optionally clear search query since we opened the product directly
      onSearchChange(''); 
    } else {
      // Category suggestion click
      onSearchChange(suggestion.text);
      if (onSearchSubmit) {
        // Small delay to ensure state update before submit
        setTimeout(() => onSearchSubmit(), 0);
      }
    }
  };

  return (
    <>
    <nav style={styles.nav}>
      {/* Removed the generic .container class so the navbar stretches full width, putting logo on the left edge */}
      <div className="navbar-container" style={styles.container}>
        {/* Logo */}
        <div style={styles.logoContainer} onClick={() => window.location.href = '/'}>
          <img src="/logo.jpg" alt="Efive Studio" style={styles.logoImage} loading="lazy" decoding="async" />
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
          {/* Wishlist Icon */}
          <div style={styles.iconContainer} title="Wishlist">
            <Heart size={20} style={{ color: 'hsl(var(--text-color))' }} />
            {wishlistItems.length > 0 && (
              <span style={styles.badge}>{wishlistItems.length}</span>
            )}
          </div>

          {/* Cart Icon */}
          <div 
            style={styles.iconContainer} 
            title="Cart"
            onClick={() => setIsCartOpen(true)}
          >
            <ShoppingCart size={20} style={{ color: 'hsl(var(--text-color))' }} />
            <span style={styles.badge}>{cartCount}</span>
          </div>

          {/* User Icon & Dropdown */}
          <div 
            style={styles.iconContainer} 
            title="User Profile"
            ref={userDropdownRef}
            onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
          >
            <User size={20} style={{ color: 'hsl(var(--text-color))' }} />
            {isUserDropdownOpen && (
              <div style={styles.userDropdown}>
                <div style={styles.userDropdownHeader}>Hello! User</div>
                <div 
                  style={styles.userDropdownItem}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(197, 168, 128, 0.08)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  Login
                </div>
                <div 
                  style={styles.userDropdownItem}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(197, 168, 128, 0.08)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  onClick={() => {
                    setIsContactModalOpen(true);
                    setIsUserDropdownOpen(false);
                  }}
                >
                  Contact Us
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
    <ContactUsModal 
      isOpen={isContactModalOpen} 
      onClose={() => setIsContactModalOpen(false)} 
    />
    <CartDrawer
      isOpen={isCartOpen}
      onClose={() => setIsCartOpen(false)}
      cartItems={cartItems}
      onUpdateQuantity={(id, color, qty) => updateQuantity(id, qty)}
      onRemoveItem={(id, color) => deleteItem(id)}
      onCheckout={() => {
        alert('Checkout functionality coming soon!');
        setIsCartOpen(false);
      }}
    />
    </>
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
  iconContainer: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: '#fff',
    border: '1px solid hsl(var(--border-color))',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  badge: {
    position: 'absolute',
    top: '-4px',
    right: '-4px',
    backgroundColor: 'hsl(var(--primary-color))',
    color: '#fff',
    fontSize: '0.65rem',
    fontWeight: 'bold',
    width: '18px',
    height: '18px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    border: '2px solid #fff',
  },
  userDropdown: {
    position: 'absolute',
    top: '120%',
    right: 0,
    marginTop: '0.5rem',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    border: '1px solid hsl(var(--border-color))',
    overflow: 'hidden',
    zIndex: 1000,
    minWidth: '200px',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left',
  },
  userDropdownHeader: {
    padding: '1rem',
    fontWeight: 'bold',
    borderBottom: '1px solid hsl(var(--border-color))',
    color: 'hsl(var(--text-color))',
    fontFamily: 'var(--font-body)',
    fontSize: '0.9rem',
    cursor: 'default',
  },
  userDropdownItem: {
    padding: '0.75rem 1rem',
    cursor: 'pointer',
    color: 'hsl(var(--text-color))',
    fontFamily: 'var(--font-body)',
    fontSize: '0.85rem',
    transition: 'background-color 0.2s',
  },
};
