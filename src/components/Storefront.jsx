import React, { useState } from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import CategoryGrid from './CategoryGrid';
import InteriorSection from './InteriorSection';
import CategorySection from './CategorySection';
import ProductCard from './ProductCard';
import ProductDetailsModal from './ProductDetailsModal';
import WhatsAppFloat from './WhatsAppFloat';
import Footer from './Footer';
import WhyChooseUs from './WhyChooseUs';
import { getProducts } from '../data/products';
import { Sparkles, ChevronRight } from 'lucide-react';
import '../App.css';

export default function Storefront() {
  const products = getProducts();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [openCategoryId, setOpenCategoryId] = useState(null);

  // ── Filtering Logic ────────────────────────────────────────────────────────
  const filteredProducts = products.filter((product) => {
    const matchesCategory = activeCategory ? product.category === activeCategory : true;
    const searchLower = searchQuery.trim().toLowerCase();
    const matchesSearch = searchLower
      ? product.name.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower) ||
        product.category.toLowerCase().includes(searchLower)
      : true;
    return matchesCategory && matchesSearch;
  });

  const scrollToCatalog = () => {
    const el = document.getElementById('categories-catalog');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div style={styles.app}>
      {/* Sticky Navbar */}
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearchSubmit={scrollToCatalog}
        products={products}
      />

      {/* Hero Banner */}
      <Hero onExploreClick={scrollToCatalog} />


      {/* Luxury Interior Solutions */}
      <InteriorSection />

      {/* Category Selector Grid */}
      <CategoryGrid
        activeCategory={activeCategory}
        onCategorySelect={(catId) => {
          if (catId) {
            setOpenCategoryId(catId);
            setActiveCategory(catId);
          } else {
            setActiveCategory(null);
            scrollToCatalog();
          }
        }}
      />

      {/* Store Catalog */}
      <main style={styles.catalogSection}>
        <div className="container">
          {/* Section header */}
          <div style={styles.catalogHeader}>
            <div style={styles.titleWrapper}>
              <h3 style={styles.sectionTitle}>
                {activeCategory
                  ? `${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} Collection`
                  : 'All Curated Pieces'}
              </h3>
              <span style={styles.countBadge}>
                {filteredProducts.length} {filteredProducts.length === 1 ? 'piece' : 'pieces'}
              </span>
            </div>
            {searchQuery && (
              <p style={styles.searchNotice}>
                Showing results for "<strong>{searchQuery}</strong>"
              </p>
            )}
          </div>

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <div className="catalog-product-grid">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={setSelectedProduct}
                />
              ))}
            </div>
          ) : (
            <div style={styles.noResults}>
              <Sparkles size={36} style={{ color: 'hsl(var(--primary-color))', marginBottom: '1rem' }} />
              <h3>No items found</h3>
              <p>Try refining your search query or selecting a different category filter.</p>
              <button
                onClick={() => { setSearchQuery(''); setActiveCategory(null); }}
                className="btn btn-primary"
                style={{ marginTop: '1.5rem' }}
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Why Choose Us Section */}
      <WhyChooseUs />

      {/* Category Section Overlay */}
      {openCategoryId && (
        <CategorySection
          categoryId={openCategoryId}
          onClose={() => setOpenCategoryId(null)}
          onQuickView={setSelectedProduct}
        />
      )}

      {/* Product Detail Full-Screen Page */}
      {selectedProduct && (
        <ProductDetailsModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      {/* Floating / Sticky WhatsApp Button */}
      <WhatsAppFloat />

      {/* Footer */}
      <Footer />
    </div>
  );
}

const styles = {
  app: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  catalogSection: {
    padding: '2rem 0 5rem 0',
  },
  catalogHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    flexWrap: 'wrap',
    gap: '1rem',
    marginBottom: '2rem',
    borderBottom: '1px solid hsl(var(--border-color))',
    paddingBottom: '1rem',
  },
  titleWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  sectionTitle: {
    fontSize: '1.5rem',
    fontWeight: 600,
    color: 'hsl(var(--text-color))',
  },
  countBadge: {
    fontSize: '0.75rem',
    fontWeight: 600,
    backgroundColor: 'hsl(var(--card-bg))',
    color: 'hsl(var(--muted-color))',
    padding: '0.2rem 0.6rem',
    borderRadius: '12px',
  },
  searchNotice: {
    fontSize: '0.9rem',
    color: 'hsl(var(--muted-color))',
  },
  productGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '2rem',
  },
  noResults: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '5rem 2rem',
    textAlign: 'center',
  },
  editorialBanner: {
    backgroundColor: 'hsl(var(--card-bg))',
    padding: '5rem 0',
    borderTop: '1px solid hsl(var(--border-color))',
    borderBottom: '1px solid hsl(var(--border-color))',
  },
  editorialGrid: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '4rem',
    alignItems: 'center',
  },
  editorialText: { flex: '1 1 500px' },
  editorialTag: {
    fontSize: '0.75rem',
    fontWeight: 600,
    letterSpacing: '0.2em',
    color: 'hsl(var(--primary-color))',
    marginBottom: '1rem',
    display: 'block',
  },
  editorialTitle: {
    fontSize: '2.5rem',
    lineHeight: 1.2,
    fontWeight: 500,
    color: 'hsl(var(--text-color))',
    marginBottom: '1.5rem',
  },
  editorialDesc: {
    fontSize: '1rem',
    lineHeight: 1.7,
    color: 'hsl(var(--muted-color))',
    marginBottom: '2rem',
    fontWeight: 300,
  },
  editorialLink: {
    background: 'none',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: 'hsl(var(--text-color))',
    fontFamily: 'var(--font-body)',
    fontWeight: 600,
    fontSize: '0.9rem',
    cursor: 'pointer',
    paddingBottom: '0.25rem',
    borderBottom: '2px solid hsl(var(--primary-color))',
    transition: 'var(--transition-smooth)',
  },
  editorialStats: {
    display: 'flex',
    gap: '2rem',
    flexWrap: 'wrap',
    flex: '1 1 300px',
    justifyContent: 'center',
  },
  statCard: {
    backgroundColor: '#fff',
    padding: '2rem 1.5rem',
    borderRadius: 'var(--radius-md)',
    border: '1px solid hsl(var(--border-color))',
    textAlign: 'center',
    minWidth: '150px',
    flex: '1 1 150px',
    boxShadow: 'var(--shadow-sm)',
  },
  statNum: {
    display: 'block',
    fontSize: '2.25rem',
    fontWeight: 700,
    color: 'hsl(var(--primary-color))',
    fontFamily: 'var(--font-heading)',
    marginBottom: '0.5rem',
  },
  statLabel: {
    fontSize: '0.75rem',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    color: 'hsl(var(--muted-color))',
    fontWeight: 600,
  },
};
