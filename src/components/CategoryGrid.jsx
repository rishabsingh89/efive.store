import React from 'react';
import { categories } from '../data/products';
import { Sparkles, Grid } from 'lucide-react';

const CategoryGrid = React.memo(function CategoryGrid({ activeCategory, onCategorySelect }) {
  return (
    <section id="categories-catalog" style={styles.section}>
      <div className="container">
        <div style={styles.header}>
          <div style={styles.titleArea}>
            <h2 style={styles.title}>Shop by category</h2>
            <p style={styles.subtitle}>Curated luxury furniture & decor collections</p>
          </div>
          
          {/* Active indicator / Reset filter pill */}
          <button
            onClick={() => onCategorySelect(null)}
            style={{
              ...styles.resetBtn,
              ...(activeCategory === null ? styles.resetBtnActive : {})
            }}
          >
            <Grid size={16} />
            <span>Show All Catalog</span>
          </button>
        </div>

        <div className="category-grid">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => onCategorySelect(cat.id)}
                className={`category-card ${isActive ? 'active' : ''}`}
              >
                {/* Image Container */}
                <div style={styles.imageContainer}>
                  <img
                    src={cat.image}
                    alt={cat.name}
                    loading="lazy"
                    decoding="async"
                    style={{
                      ...styles.image,
                      objectFit: cat.id === 'tables' ? 'contain' : 'cover',
                      backgroundColor: cat.id === 'tables' ? '#f5f5f5' : 'transparent',
                      ...(isActive ? styles.activeImage : {})
                    }}
                  />
                  {isActive && (
                    <div style={styles.activeOverlay}>
                      <Sparkles size={20} style={styles.activeIcon} />
                    </div>
                  )}
                </div>

                {/* Card Label Panel */}
                <div style={styles.labelPanel}>
                  <span style={styles.cardText}>{cat.name}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
});

export default CategoryGrid;

const styles = {
  section: {
    padding: '3rem 0',
    backgroundColor: 'transparent', // Match the lighter green from index.css by inheriting
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: '2rem',
    borderBottom: '1px solid rgba(197, 168, 128, 0.25)',
    paddingBottom: '1rem',
    flexWrap: 'wrap',
    gap: '1rem',
  },
  titleArea: {
    textAlign: 'left',
  },
  title: {
    fontFamily: 'var(--font-heading)',
    fontSize: '2rem',
    fontWeight: 600,
    color: '#1E1D1B',
    marginBottom: '0.25rem',
  },
  subtitle: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.9rem',
    color: '#706D67',
    fontWeight: 400,
  },
  resetBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.6rem 1.2rem',
    backgroundColor: '#ffffff',
    border: '1px solid #E6E2DA',
    borderRadius: '20px',
    color: '#706D67',
    fontSize: '0.85rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.25s ease',
  },
  resetBtnActive: {
    backgroundColor: '#C5A880',
    borderColor: '#C5A880',
    color: '#ffffff',
    boxShadow: '0 4px 10px rgba(197, 168, 128, 0.25)',
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: '150px',
    overflow: 'hidden',
    backgroundColor: '#141210',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.4s ease',
  },
  activeImage: {
    transform: 'scale(1.05)',
  },
  activeOverlay: {
    position: 'absolute',
    inset: 0,
    backgroundColor: 'rgba(197, 168, 128, 0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeIcon: {
    color: '#ffeb3b',
    filter: 'drop-shadow(0 2px 5px rgba(0,0,0,0.3))',
  },
  labelPanel: {
    width: '100%',
    padding: '0.85rem 0.5rem',
    backgroundColor: '#1E1D1B', // Consistent dark footer panel inside card
    borderTop: '1px solid rgba(255, 255, 255, 0.05)',
    textAlign: 'center',
  },
  cardText: {
    fontFamily: 'var(--font-heading)',
    fontSize: '0.9rem',
    fontWeight: 600,
    color: '#ffffff', // Clean white bold text
    letterSpacing: '0.03em',
  },
};
