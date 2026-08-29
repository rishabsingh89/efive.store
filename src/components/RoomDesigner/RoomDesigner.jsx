import React, { useState, useEffect } from 'react';
import { RoomDesignerProvider, useRoomDesigner } from './RoomDesignerContext';
import { storage, STORAGE_KEY } from '../../data/roomDesignerData';
import Navbar from '../Navbar';
import BHKSelector from './BHKSelector';
import LeftSidebar from './LeftSidebar';
import RoomBuilderWizard from './RoomBuilderWizard';
import RoomCanvas from './RoomCanvas';
import RoomCustomization from './RoomCustomization';
import DesignSummary from './DesignSummary';
import { getProducts, categories as allCategories } from '../../data/products';
import { 
  ChevronLeft, ChevronRight, X, Heart, ShoppingBag, 
  Edit, Share, Save, ArrowRight, Copy, Trash2 
} from 'lucide-react';

function ItemOptionsPanel({ activeItem, dispatch, onClose }) {
  const products = getProducts();
  const product = products.find((p) => p.id === activeItem.productId);
  if (!product) return <div style={styles.emptySidebar}>Loading product details...</div>;

  const categoryInfo = allCategories.find((c) => c.id === product.category);
  const imageUrl = product.image || categoryInfo?.image || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500';

  const productColors = product.colors || [];
  
  const handleAddToBag = () => {
    alert(`${product.name} added to shopping bag!`);
  };

  const handleDuplicate = () => {
    dispatch({ type: 'DUPLICATE_FURNITURE', payload: { id: activeItem.id } });
  };

  const handleRemove = () => {
    dispatch({ type: 'DELETE_FURNITURE', payload: { id: activeItem.id } });
  };

  return (
    <div style={styles.sidebar}>
      {/* Header */}
      <div style={styles.sidebarHeader}>
        <h4 style={styles.sidebarTitle}>Item Options</h4>
        <button onClick={onClose} style={styles.closeBtn} title="Close details">
          <X size={18} />
        </button>
      </div>

      <div style={styles.sidebarContent}>
        {/* Product Image Carousel */}
        <div style={styles.carouselContainer}>
          <img src={imageUrl} alt={product.name} style={styles.carouselImage} />
          
          <button style={styles.carouselArrowLeft} disabled>
            <ChevronLeft size={16} />
          </button>
          <button style={styles.carouselArrowRight} disabled>
            <ChevronRight size={16} />
          </button>
          
          <button style={styles.favoriteBtn} onClick={() => alert("Added to Favorites!")}>
            <Heart size={16} style={{ fill: 'none', color: '#333' }} />
          </button>
        </div>

        {/* Product Meta */}
        <div style={styles.metaSection}>
          <h2 style={styles.productTitle}>{product.name}</h2>
          <p style={styles.productDesc}>{product.description || 'Premium design tailored for modern interiors.'}</p>
          <div style={styles.priceRow}>
            <span style={styles.priceVal}>₹{product.price.toLocaleString('en-IN')}</span>
            {product.originalPrice && (
              <span style={styles.origPrice}>₹{product.originalPrice.toLocaleString('en-IN')}</span>
            )}
          </div>
          <div style={styles.ratingRow}>
            <span style={styles.stars}>★★★★★</span>
            <span style={styles.reviews}>({product.reviews || 24})</span>
          </div>
        </div>

        {/* Add to Bag Button */}
        <button onClick={handleAddToBag} style={styles.addBagBtn}>
          <ShoppingBag size={16} />
          <span>Add to bag</span>
        </button>

        {/* Delivery Details */}
        <div style={styles.deliverySection}>
          <h4 style={styles.subLabel}>How to get it</h4>
          <div style={styles.deliveryRow}>
            <div style={styles.deliveryItem}>🚚 Delivery <span style={styles.dot}>•</span></div>
            <div style={styles.deliveryItem}>📦 Collect at pick-up point <span style={styles.dot}>•</span></div>
            <div style={styles.deliveryItem}>🏪 Store</div>
          </div>
        </div>

        {/* Color variants list */}
        <div style={styles.variantSection}>
          <h4 style={styles.subLabel}>Colour</h4>
          <span style={styles.variantName}>
            {productColors.find(c => c.hex === activeItem.color)?.name || 'Default Color'}
          </span>
          <div style={styles.colorCircleGrid}>
            {productColors.map((c) => (
              <button
                key={c.name}
                onClick={() => dispatch({
                  type: 'UPDATE_FURNITURE_PROPERTIES',
                  payload: { id: activeItem.id, properties: { color: c.hex } }
                })}
                style={{
                  ...styles.colorCircleBtn,
                  backgroundColor: c.hex,
                  border: activeItem.color === c.hex ? '2px solid #C5A880' : '1px solid #ddd',
                  transform: activeItem.color === c.hex ? 'scale(1.1)' : 'scale(1)',
                }}
                title={c.name}
              />
            ))}
          </div>
        </div>

        {/* Size Selection */}
        <div style={styles.variantSection}>
          <h4 style={styles.subLabel}>Size</h4>
          <div style={styles.sizePicker}>
            <span>{product.specifications?.dimensions || 'Standard Size'}</span>
            <ChevronRight size={14} style={{ color: '#888' }} />
          </div>
        </div>

        {/* Duplicate and Remove buttons */}
        <div style={styles.sidebarActionRow}>
          <button onClick={handleDuplicate} style={styles.outlineActionBtn}>
            <Copy size={14} /> Make copy
          </button>
          <button onClick={handleRemove} style={{ ...styles.outlineActionBtn, color: '#ff4444', borderColor: '#ffcccc' }}>
            <Trash2 size={14} /> Remove
          </button>
        </div>

        {/* Footer swap options */}
        <div style={styles.swapSection}>
          <button onClick={() => {
            alert(`Replace requested. Please pick another item in ${product.category} category from the left shop catalog!`);
            onClose();
          }} style={styles.swapBtn}>
            🔄 Swap with similar
          </button>
          <button onClick={() => alert("Loading matching accessories...")} style={styles.swapBtn}>
            ✨ Goes well with
          </button>
        </div>
      </div>
    </div>
  );
}

function DesignerContent({ initialBhkId, onClose }) {
  const { state, dispatch } = useRoomDesigner();
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);
  
  const [designName, setDesignName] = useState(() => {
    const saved = storage.load(STORAGE_KEY);
    return saved?.designName || 'Untitled Design';
  });

  // Load saved state (if not already handled by synchronous init)
  useEffect(() => {
    const saved = storage.load(STORAGE_KEY);
    // If not opened with a specific BHK, try loading from storage
    if (!initialBhkId && saved && saved.selectedBHK) {
      dispatch({ type: 'LOAD_DESIGN', payload: saved });
      if (saved.designName) setDesignName(saved.designName);
    }
  }, [dispatch, initialBhkId]);

  // Save design handler
  const handleSaveDesign = () => {
    storage.save(STORAGE_KEY, {
      selectedBHK: state.selectedBHK,
      rooms: state.rooms,
      designName,
    });
    alert('Design saved successfully! You can leave and come back later.');
  };

  // View: No BHK Selected -> Show BHK selection screen (only if not opened as modal)
  if (!state.selectedBHK && !initialBhkId) {
    return (
      <div style={styles.container}>
        <Navbar />
        <BHKSelector />
      </div>
    );
  }

  // View: Active Designer Workspace
  const isModal = !!onClose;
  const roomId = state.activeRoomId;
  const room = state.rooms[roomId];
  const activeItem = room?.furniture?.find((f) => f.id === state.selectedFurnitureId);

  // Compute total cost across all rooms
  const totalDesignPrice = Object.values(state.rooms).reduce((sum, r) => {
    return sum + (r.furniture || []).reduce((acc, item) => acc + (item.price || 0), 0);
  }, 0);

  return (
    <div style={isModal ? styles.modalOverlay : styles.workspace}>
      <div style={isModal ? styles.modalContent : { display: 'flex', flexDirection: 'column', height: '100%' }}>
        
        {!isModal && <Navbar />}
        
        {/* Premium Action Bar */}
        <div style={styles.actionBar}>
          {/* Left back action */}
          {isModal ? (
            <button onClick={onClose} style={styles.backBtn} className="rd-panel-back">
              <ChevronLeft size={16} />
              <span>Back to Cost Calculator</span>
            </button>
          ) : (
            <button onClick={() => dispatch({ type: 'BACK_TO_BHK' })} style={styles.backBtn} className="rd-panel-back">
              <ChevronLeft size={16} />
              <span>Change Layout</span>
            </button>
          )}

          {/* Center editable title */}
          <div style={styles.titleContainer}>
            {isEditingTitle ? (
              <input
                type="text"
                value={designName}
                onChange={(e) => setDesignName(e.target.value)}
                onBlur={() => setIsEditingTitle(false)}
                onKeyDown={(e) => { if (e.key === 'Enter') setIsEditingTitle(false); }}
                style={styles.titleInput}
                autoFocus
              />
            ) : (
              <div style={styles.titleTextWrapper} onClick={() => setIsEditingTitle(true)} title="Click to rename design">
                <span style={styles.designNameText}>{designName}</span>
                <Edit size={12} style={{ color: '#888', cursor: 'pointer' }} />
              </div>
            )}
          </div>

          {/* Right actions (save, share, bag, summary) */}
          <div style={styles.headerRight}>
            <button onClick={handleSaveDesign} style={styles.headerIconBtn} title="Save Design">
              <Save size={16} />
            </button>
            <button onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              alert("Design share link copied to clipboard!");
            }} style={styles.headerIconBtn} title="Share Design">
              <Share size={16} />
            </button>
            
            <div style={styles.headerBag}>
              <ShoppingBag size={14} style={{ color: '#1E1D1B' }} />
              <span style={styles.headerPrice}>₹{totalDesignPrice.toLocaleString('en-IN')}</span>
            </div>

            <button onClick={() => setIsSummaryOpen(!isSummaryOpen)} style={styles.summaryBtn}>
              <span>Summary</span>
              <ArrowRight size={14} />
            </button>
            
            {isModal && (
              <button onClick={onClose} style={styles.closeHeaderBtn} title="Close Designer">
                <X size={18} />
              </button>
            )}
          </div>
        </div>

        {/* Main Split Layout */}
        <div style={styles.mainLayout} className="rd-main-layout">
          {state.wizardMode ? (
            <RoomBuilderWizard />
          ) : (
            <LeftSidebar />
          )}
          
          <div style={styles.canvasArea}>
            {!state.wizardMode && <RoomCustomization />}
            <RoomCanvas wizardMode={state.wizardMode} wizardStep={state.wizardStep} />
            
            {/* Sliding Summary Drawer Overlay */}
            {isSummaryOpen && (
              <div style={styles.summaryOverlay}>
                <DesignSummary onClose={() => setIsSummaryOpen(false)} />
              </div>
            )}
          </div>

          {/* Right item details pane when an item is selected */}
          {activeItem && (
            <ItemOptionsPanel 
              activeItem={activeItem} 
              dispatch={dispatch} 
              onClose={() => dispatch({ type: 'SELECT_FURNITURE', payload: null })} 
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default function RoomDesigner({ initialBhkId, onClose }) {
  return (
    <RoomDesignerProvider initialBhkId={initialBhkId}>
      <DesignerContent initialBhkId={initialBhkId} onClose={onClose} />
    </RoomDesignerProvider>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: 'hsl(36,33%,97%)',
    display: 'flex',
    flexDirection: 'column',
  },
  workspace: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: 9999,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    width: '95vw',
    height: '95vh',
    backgroundColor: '#fff',
    borderRadius: '16px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
  },
  actionBar: {
    padding: '0.6rem 1rem',
    backgroundColor: '#fff',
    borderBottom: '1px solid hsl(40,13%,88%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    userSelect: 'none',
  },
  backBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '0.8rem',
    fontFamily: 'var(--font-body)',
    fontWeight: 600,
    color: '#333',
  },
  titleContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleTextWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    cursor: 'pointer',
    padding: '4px 10px',
    borderRadius: '6px',
    transition: 'background 0.2s',
  },
  designNameText: {
    fontSize: '0.9rem',
    fontWeight: '700',
    color: '#1E1D1B',
    fontFamily: 'var(--font-heading)',
  },
  titleInput: {
    fontSize: '0.9rem',
    fontWeight: '700',
    color: '#1E1D1B',
    fontFamily: 'var(--font-heading)',
    border: '1px solid #C5A880',
    outline: 'none',
    padding: '2px 8px',
    borderRadius: '4px',
    textAlign: 'center',
    width: '200px',
  },
  headerRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  headerIconBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#555',
    padding: '6px',
    display: 'flex',
    borderRadius: '50%',
    transition: 'background 0.2s',
  },
  headerBag: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    backgroundColor: '#F3F1EC',
    padding: '6px 12px',
    borderRadius: '16px',
  },
  headerPrice: {
    fontSize: '0.82rem',
    fontWeight: '800',
    color: '#1E1D1B',
  },
  summaryBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    backgroundColor: '#0058a3', // IKEA Blue
    color: '#fff',
    border: 'none',
    borderRadius: '20px',
    padding: '6px 14px',
    fontSize: '0.78rem',
    fontWeight: '700',
    cursor: 'pointer',
    fontFamily: 'var(--font-body)',
  },
  closeHeaderBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#888',
    padding: '4px',
    marginLeft: '6px',
    display: 'flex',
  },
  mainLayout: {
    flex: 1,
    display: 'flex',
    overflow: 'hidden',
  },
  canvasArea: {
    flex: 1,
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
  },
  summaryOverlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,
    width: '320px',
    backgroundColor: '#fff',
    boxShadow: '-4px 0 24px rgba(0,0,0,0.15)',
    display: 'flex',
    flexDirection: 'column',
  },
  
  // Left Panel sidebar styles
  sidebar: {
    width: '350px',
    flexShrink: 0,
    backgroundColor: '#fff',
    borderLeft: '1px solid hsl(40,13%,88%)', // Place options sidebar to the right of catalog or left of canvas
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  sidebarHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '1rem',
    borderBottom: '1px solid hsl(40,13%,88%)',
  },
  sidebarTitle: {
    fontSize: '0.9rem',
    fontWeight: 700,
    fontFamily: 'var(--font-heading)',
    color: '#1E1D1B',
    margin: 0,
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#888',
    padding: '4px',
    display: 'flex',
  },
  sidebarContent: {
    flex: 1,
    overflowY: 'auto',
    padding: '1.25rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
  },
  carouselContainer: {
    width: '100%',
    height: '200px',
    position: 'relative',
    backgroundColor: '#F7F5F0',
    borderRadius: '12px',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  carouselImage: {
    maxHeight: '90%',
    maxWidth: '90%',
    objectFit: 'contain',
  },
  carouselArrowLeft: {
    position: 'absolute',
    left: '8px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'rgba(255,255,255,0.85)',
    border: 'none',
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#333',
    cursor: 'not-allowed',
    opacity: 0.5,
  },
  carouselArrowRight: {
    position: 'absolute',
    right: '8px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'rgba(255,255,255,0.85)',
    border: 'none',
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#333',
    cursor: 'not-allowed',
    opacity: 0.5,
  },
  favoriteBtn: {
    position: 'absolute',
    right: '12px',
    top: '12px',
    background: '#fff',
    border: 'none',
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    cursor: 'pointer',
  },
  metaSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.4rem',
  },
  productTitle: {
    fontFamily: 'var(--font-heading)',
    fontSize: '1.25rem',
    fontWeight: 700,
    color: '#1E1D1B',
    margin: 0,
  },
  productDesc: {
    fontSize: '0.78rem',
    color: '#666',
    lineHeight: 1.4,
    margin: 0,
  },
  priceRow: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '8px',
    marginTop: '4px',
  },
  priceVal: {
    fontSize: '1.4rem',
    fontWeight: '800',
    color: '#B89970',
  },
  origPrice: {
    fontSize: '0.9rem',
    color: '#999',
    textDecoration: 'line-through',
  },
  ratingRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  stars: {
    color: '#FFD700',
    fontSize: '0.9rem',
  },
  reviews: {
    fontSize: '0.75rem',
    color: '#888',
  },
  addBagBtn: {
    backgroundColor: '#0058a3', // IKEA Blue
    color: '#fff',
    border: 'none',
    borderRadius: '24px',
    padding: '12px',
    fontSize: '0.85rem',
    fontWeight: '700',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    cursor: 'pointer',
    fontFamily: 'var(--font-body)',
    transition: 'background 0.2s',
  },
  deliverySection: {
    borderTop: '1px solid #eee',
    paddingTop: '1rem',
  },
  subLabel: {
    fontSize: '0.75rem',
    textTransform: 'uppercase',
    color: '#888',
    fontWeight: 700,
    margin: '0 0 6px 0',
  },
  deliveryRow: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  deliveryItem: {
    fontSize: '0.78rem',
    color: '#444',
  },
  dot: {
    color: '#ccc',
  },
  variantSection: {
    borderTop: '1px solid #eee',
    paddingTop: '1rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  variantName: {
    fontSize: '0.75rem',
    color: '#555',
    fontWeight: 600,
  },
  colorCircleGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    marginTop: '4px',
  },
  colorCircleBtn: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    cursor: 'pointer',
    padding: 0,
    transition: 'all 0.2s',
  },
  sizePicker: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 12px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '0.8rem',
    color: '#333',
    cursor: 'pointer',
    backgroundColor: '#FAF9F6',
  },
  sidebarActionRow: {
    display: 'flex',
    gap: '8px',
    borderTop: '1px solid #eee',
    paddingTop: '1.25rem',
  },
  outlineActionBtn: {
    flex: 1,
    padding: '8px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    backgroundColor: '#fff',
    fontSize: '0.78rem',
    fontWeight: 600,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    color: '#444',
    fontFamily: 'var(--font-body)',
  },
  swapSection: {
    borderTop: '1px solid #eee',
    paddingTop: '1.25rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  swapBtn: {
    padding: '10px',
    borderRadius: '20px',
    border: '1px solid #eee',
    backgroundColor: '#FAF9F6',
    fontSize: '0.78rem',
    fontWeight: 600,
    cursor: 'pointer',
    textAlign: 'left',
    color: '#333',
    fontFamily: 'var(--font-body)',
  },
  emptySidebar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    color: '#888',
    fontSize: '0.85rem',
  }
};
