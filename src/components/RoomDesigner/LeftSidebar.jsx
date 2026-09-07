import React, { useState, useMemo } from 'react';
import { useRoomDesigner } from './RoomDesignerContext';
import { BHK_CONFIGS, ROOM_CATEGORY_MAP } from '../../data/roomDesignerData';
import { categories as allCategories, getProducts } from '../../data/products';
import {
  Search, ChevronLeft, ChevronRight, Plus, Eye, ChevronDown, CheckCircle2
} from 'lucide-react';

const formatPrice = (n) => '₹' + n.toLocaleString('en-IN');

export default function LeftSidebar() {
  const { state, dispatch } = useRoomDesigner();
  const [mode, setMode] = useState('rooms'); // 'rooms', 'shop', 'detail'
  
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCatId, setActiveCatId] = useState('all');
  const [detailProduct, setDetailProduct] = useState(null);

  const bhkConfig = BHK_CONFIGS.find((b) => b.id === state.selectedBHK);
  const roomId = state.activeRoomId;
  const room = state.rooms[roomId];
  const roomType = room?.type || 'living';

  const relevantCatIds = ROOM_CATEGORY_MAP[roomType] || [];
  const relevantCategories = allCategories.filter((c) => relevantCatIds.includes(c.id));

  const allProducts = useMemo(() => getProducts(), []);
  const filteredProducts = useMemo(() => {
    let list = allProducts.filter((p) => relevantCatIds.includes(p.category));
    if (activeCatId !== 'all') {
      list = list.filter((p) => p.category === activeCatId);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q)
      );
    }
    return list;
  }, [allProducts, activeCatId, searchQuery, relevantCatIds]);

  const handleAddToRoom = (product) => {
    if (!roomId) return;
    dispatch({ type: 'ADD_FURNITURE', payload: { roomId, product } });
  };

  // Generic Search Header
  const renderSearchHeader = () => (
    <div style={styles.searchBox}>
      <Search size={16} style={{ color: '#555', flexShrink: 0 }} />
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={styles.searchInput}
      />
    </div>
  );

  // ── Mode: Detail ──────────────────────────────────────────────────────────
  if (mode === 'detail' && detailProduct) {
    return (
      <div style={styles.sidebar}>
        <div style={styles.headerRow}>
          <button onClick={() => setMode('shop')} style={styles.backBtnText}>
            <ChevronLeft size={16} />
            <span>Back</span>
          </button>
        </div>
        <div style={styles.detailCard}>
          <div style={{
            ...styles.detailImage,
            backgroundImage: `url("${detailProduct.images?.[0] || detailProduct.image || allCategories.find(c => c.id === detailProduct.category)?.image || ''}")`,
          }} />
          <h3 style={styles.detailName}>{detailProduct.name}</h3>
          <div style={styles.detailPriceRow}>
            <span style={styles.detailPrice}>{formatPrice(detailProduct.price)}</span>
            {detailProduct.originalPrice && (
              <span style={styles.detailOrigPrice}>{formatPrice(detailProduct.originalPrice)}</span>
            )}
          </div>
          <p style={styles.detailDesc}>{detailProduct.description}</p>
          <button onClick={() => { handleAddToRoom(detailProduct); setMode('shop'); }}
            style={styles.addBtnLarge}>
            <Plus size={16} />
            <span>Add to Room</span>
          </button>
        </div>
      </div>
    );
  }

  // ── Mode: Shop ────────────────────────────────────────────────────────────
  if (mode === 'shop') {
    return (
      <div style={styles.sidebar}>
        {/* Top Dropdown equivalent - switch back to rooms mode */}
        <div onClick={() => setMode('rooms')} style={{cursor: 'pointer', ...styles.headerRow}}>
          <h2 style={styles.shopTitle}>{room?.label || 'Room'}</h2>
          <ChevronDown size={20} />
        </div>

        {renderSearchHeader()}

        {/* Category Pills */}
        <div style={styles.pillContainer}>
          <button 
            onClick={() => setActiveCatId('all')}
            style={{...styles.pillBtn, ...(activeCatId === 'all' ? styles.pillActive : {})}}
          >
            All categories
          </button>
          {relevantCategories.map(cat => (
            <button 
              key={cat.id}
              onClick={() => setActiveCatId(cat.id)}
              style={{...styles.pillBtn, ...(activeCatId === cat.id ? styles.pillActive : {})}}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Product Grid / List */}
        <div style={styles.productList}>
          {filteredProducts.map((product) => (
            <div key={product.id} style={styles.productCard}>
              <div
                style={{
                  ...styles.productImage,
                  backgroundImage: `url("${product.images?.[0] || product.image || allCategories.find(c => c.id === product.category)?.image || ''}")`,
                }}
                onClick={() => { setDetailProduct(product); setMode('detail'); }}
              >
                <span style={styles.viewBadge}><Eye size={12} /></span>
              </div>
              <div style={styles.productInfo}>
                <span style={styles.productName}>{product.name}</span>
                <div style={styles.productPriceRow}>
                  <span style={styles.productPrice}>{formatPrice(product.price)}</span>
                  {product.originalPrice && (
                    <span style={styles.productOrig}>{formatPrice(product.originalPrice)}</span>
                  )}
                </div>
                <button
                  onClick={() => handleAddToRoom(product)}
                  style={styles.addBtn}
                >
                  <Plus size={12} />
                  <span>Add</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ── Mode: Rooms (Default Accordion) ───────────────────────────────────────
  return (
    <div style={styles.sidebar}>
      {renderSearchHeader()}
      
      <div style={styles.accordionContainer}>
        {bhkConfig?.rooms.map((r) => {
          const isActive = r.id === roomId;
          return (
            <div key={r.id} style={styles.accordionItem}>
              <div 
                style={styles.accordionHeader} 
                onClick={() => {
                  dispatch({ type: 'SELECT_ROOM', payload: r.id });
                }}
              >
                <span style={styles.accordionTitle}>{r.label}</span>
                <ChevronDown size={18} style={{ transform: isActive ? 'rotate(180deg)' : 'rotate(0deg)', transition: '0.2s' }} />
              </div>
              
              {isActive && (
                <div style={styles.accordionBody}>
                  {/* Thumbnail mimicking the IKEA screenshot */}
                  <div 
                    style={{
                      ...styles.roomThumbnail,
                      backgroundImage: r.type === 'living' 
                        ? 'url(/images/living_room_bg.jpg)' 
                        : r.type === 'bathroom'
                        ? 'url(/images/washroom_bg.jpg)'
                        : r.type === 'kitchen'
                        ? 'url(/images/kitchen_bg.jpg)'
                        : styles.roomThumbnail.backgroundImage,
                    }} 
                    onClick={() => setMode('shop')}
                  >
                    <div style={styles.thumbnailLabel}>
                      <span>{r.label}</span>
                      <CheckCircle2 size={16} style={{ color: '#000', fill: '#fff' }} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

const styles = {
  sidebar: {
    width: '350px',
    flexShrink: 0,
    backgroundColor: '#fff',
    borderRight: '1px solid hsl(40,13%,88%)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  headerRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '1.25rem 1.25rem 0.5rem',
  },
  shopTitle: {
    fontSize: '1.25rem',
    fontWeight: 700,
    color: '#111',
    margin: 0,
    fontFamily: 'var(--font-heading)',
  },
  backBtnText: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    background: 'none',
    border: 'none',
    fontSize: '0.9rem',
    fontWeight: 600,
    cursor: 'pointer',
    color: '#111',
  },
  searchBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    margin: '1rem',
    padding: '0.75rem 1rem',
    borderRadius: '24px',
    backgroundColor: '#F5F5F5',
  },
  searchInput: {
    flex: 1,
    border: 'none',
    background: 'none',
    outline: 'none',
    fontSize: '0.9rem',
    fontFamily: 'var(--font-body)',
    color: '#111',
  },
  
  // Accordion Mode Styles
  accordionContainer: {
    flex: 1,
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
  },
  accordionItem: {
    borderBottom: '1px solid #F0F0F0',
  },
  accordionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1.25rem',
    cursor: 'pointer',
  },
  accordionTitle: {
    fontSize: '1rem',
    fontWeight: 700,
    color: '#111',
  },
  accordionBody: {
    padding: '0 1.25rem 1.25rem',
  },
  roomThumbnail: {
    width: '100%',
    height: '140px',
    backgroundColor: '#E5E5E5',
    borderRadius: '8px',
    cursor: 'pointer',
    position: 'relative',
    backgroundImage: 'url(https://images.unsplash.com/photo-1616486028423-f06f920257c2?w=500)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    border: '2px solid #111',
  },
  thumbnailLabel: {
    position: 'absolute',
    top: '10px',
    left: '10px',
    backgroundColor: '#fff',
    padding: '6px 12px',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '0.85rem',
    fontWeight: 700,
    color: '#111'
  },
  
  // Shop Mode Styles
  pillContainer: {
    display: 'flex',
    gap: '8px',
    padding: '0 1rem 1rem',
    overflowX: 'auto',
    scrollbarWidth: 'none', // hide scrollbar for sleekness
  },
  pillBtn: {
    padding: '6px 14px',
    borderRadius: '20px',
    border: '1px solid #ddd',
    backgroundColor: '#fff',
    fontSize: '0.85rem',
    fontWeight: 600,
    color: '#333',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    transition: 'all 0.2s',
  },
  pillActive: {
    backgroundColor: '#111',
    color: '#fff',
    borderColor: '#111',
  },
  productList: {
    flex: 1,
    overflowY: 'auto',
    padding: '0 1rem 1rem',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem',
  },
  productCard: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    minWidth: 0,
  },
  productImage: {
    width: '100%',
    aspectRatio: '1',
    backgroundColor: '#F5F5F5',
    borderRadius: '4px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    cursor: 'pointer',
    position: 'relative',
  },
  viewBadge: {
    position: 'absolute',
    bottom: '8px',
    right: '8px',
    backgroundColor: 'rgba(0,0,0,0.6)',
    color: '#fff',
    borderRadius: '50%',
    width: '24px',
    height: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  productInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  productName: {
    fontSize: '0.85rem',
    fontWeight: 600,
    color: '#111',
    lineHeight: 1.2,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  productPriceRow: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '6px',
  },
  productPrice: {
    fontSize: '0.9rem',
    fontWeight: 700,
    color: '#111',
  },
  productOrig: {
    fontSize: '0.7rem',
    color: '#888',
    textDecoration: 'line-through',
  },
  addBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4px',
    padding: '6px',
    borderRadius: '4px',
    border: '1px solid #111',
    backgroundColor: '#fff',
    color: '#111',
    fontSize: '0.75rem',
    fontWeight: 700,
    cursor: 'pointer',
    marginTop: '4px',
    transition: 'all 0.2s',
  },
  
  // Detail Mode Styles
  detailCard: {
    flex: 1,
    overflowY: 'auto',
    padding: '1.25rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  detailImage: {
    width: '100%',
    height: '250px',
    backgroundColor: '#F5F5F5',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  detailName: {
    fontSize: '1.25rem',
    fontWeight: 700,
    margin: '1rem 0 0 0',
  },
  detailPriceRow: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '8px',
  },
  detailPrice: {
    fontSize: '1.25rem',
    fontWeight: 700,
  },
  detailOrigPrice: {
    fontSize: '0.9rem',
    color: '#888',
    textDecoration: 'line-through',
  },
  detailDesc: {
    fontSize: '0.9rem',
    color: '#555',
    lineHeight: 1.5,
  },
  addBtnLarge: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    padding: '12px',
    backgroundColor: '#0058A3', // IKEA Blue
    color: '#fff',
    border: 'none',
    borderRadius: '24px',
    fontSize: '0.9rem',
    fontWeight: 700,
    cursor: 'pointer',
    marginTop: '1rem',
  }
};
