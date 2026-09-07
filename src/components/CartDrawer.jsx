import React from 'react';
import { X, Trash2, ShoppingBag, Plus, Minus, CreditCard, Image } from 'lucide-react';
import { openWhatsAppChannel } from '../whatsapp';

// Inline WhatsApp icon
function WhatsAppIcon({ size = 16, className }) {
  return (
    <svg
      className={className}
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

export default function CartDrawer({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem, onCheckout }) {
  if (!isOpen) return null;

  // Calculate cart subtotal
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.drawer} onClick={(e) => e.stopPropagation()} className="animate-fade-in">
        {/* Drawer Header */}
        <div style={styles.header}>
          <div style={styles.titleContainer}>
            <ShoppingBag size={20} style={styles.headerIcon} />
            <h2 style={styles.title}>Your Bag</h2>
            <span style={styles.countBadge}>{cartItems.length}</span>
          </div>
          <button onClick={onClose} style={styles.closeBtn} aria-label="Close cart">
            <X size={20} />
          </button>
        </div>

        {/* Drawer Body */}
        <div style={styles.body}>
          {cartItems.length === 0 ? (
            <div style={styles.emptyContainer}>
              <ShoppingBag size={48} style={styles.emptyIcon} />
              <h3 style={styles.emptyTitle}>Your bag is empty</h3>
              <p style={styles.emptyText}>Items you add to your shopping bag will appear here.</p>
              <button onClick={onClose} className="btn btn-primary" style={styles.shopBtn}>
                Continue Shopping
              </button>
            </div>
          ) : (
            <div style={styles.itemsList}>
              {cartItems.map((item, idx) => (
                <div key={`${item.id}-${item.selectedColor || idx}`} style={styles.cartItem}>
                  {/* Item Icon Illustration */}
                  <div style={styles.itemVisual}>
                    {item.image || (item.images && item.images[0]) ? (
                      <img src={item.image || item.images[0]} alt={item.name} style={styles.productImage} loading="lazy" decoding="async" />
                    ) : (
                      <div style={styles.imagePlaceholder}><Image size={24} color="#ccc" /></div>
                    )}
                  </div>

                  {/* Item Info */}
                  <div style={styles.itemInfo}>
                    <h4 style={styles.itemName}>{item.name}</h4>
                    {item.selectedColor && (
                      <span style={styles.itemColor}>Color: {item.selectedColor}</span>
                    )}
                    <span style={styles.itemPrice}>₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>

                    {/* Quantity controls & Delete */}
                    <div style={styles.itemControls}>
                      <div style={styles.qtySelector}>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.selectedColor, item.quantity - 1)}
                          style={styles.qtyBtn}
                          aria-label="Decrease quantity"
                        >
                          <Minus size={12} />
                        </button>
                        <span style={styles.qtyVal}>{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.selectedColor, item.quantity + 1)}
                          style={styles.qtyBtn}
                          aria-label="Increase quantity"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.id, item.selectedColor)}
                        style={styles.deleteBtn}
                        title="Remove item"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        {cartItems.length > 0 && (
          <div style={styles.footer}>
            <div style={styles.subtotalRow}>
              <span style={styles.subtotalLabel}>Subtotal</span>
              <span style={styles.subtotalVal}>₹{subtotal.toLocaleString('en-IN')}</span>
            </div>
            <p style={styles.footerText}>Shipping and delivery taxes calculated at checkout.</p>
            <button onClick={openWhatsAppChannel} className="btn" style={styles.checkoutBtn}>
              <WhatsAppIcon size={18} />
              <span>Connect on WhatsApp</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(30, 29, 27, 0.45)',
    display: 'flex',
    justifyContent: 'flex-end',
    zIndex: 250,
  },
  drawer: {
    backgroundColor: '#fff',
    width: '100%',
    maxWidth: '440px',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: 'var(--shadow-lg)',
    animation: 'slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
  },
  header: {
    padding: '1.25rem 1.5rem',
    borderBottom: '1px solid hsl(var(--border-color))',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.6rem',
  },
  headerIcon: {
    color: 'hsl(var(--primary-color))',
  },
  title: {
    fontSize: '1.25rem',
    fontWeight: 600,
    color: 'hsl(var(--text-color))',
  },
  countBadge: {
    fontSize: '0.75rem',
    fontWeight: 600,
    backgroundColor: 'hsl(var(--card-bg))',
    color: 'hsl(var(--primary-color))',
    padding: '0.2rem 0.5rem',
    borderRadius: '12px',
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: 'hsl(var(--muted-color))',
    padding: '0.4rem',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'var(--transition-smooth)',
  },
  body: {
    flexGrow: 1,
    overflowY: 'auto',
    padding: '1.5rem',
  },
  emptyContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    textAlign: 'center',
    padding: '2rem',
  },
  emptyIcon: {
    color: 'hsl(var(--border-color))',
    marginBottom: '1.5rem',
  },
  emptyTitle: {
    fontSize: '1.15rem',
    fontWeight: 500,
    color: 'hsl(var(--text-color))',
    marginBottom: '0.5rem',
  },
  emptyText: {
    fontSize: '0.85rem',
    color: 'hsl(var(--muted-color))',
    marginBottom: '2rem',
    lineHeight: 1.5,
  },
  shopBtn: {
    padding: '0.75rem 2rem',
    fontSize: '0.8rem',
  },
  itemsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
  },
  cartItem: {
    display: 'flex',
    gap: '1rem',
    borderBottom: '1px solid hsl(var(--border-color))',
    paddingBottom: '1.25rem',
  },
  itemVisual: {
    width: '80px',
    height: '80px',
    borderRadius: 'var(--radius-sm)',
    overflow: 'hidden',
    flexShrink: 0,
    backgroundColor: 'hsl(var(--card-bg))',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  productImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  imagePlaceholder: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: '#f5f5f5',
  },
  itemInfo: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  itemName: {
    fontSize: '0.9rem',
    fontWeight: 500,
    color: 'hsl(var(--text-color))',
    marginBottom: '0.2rem',
    lineHeight: 1.3,
  },
  itemColor: {
    fontSize: '0.75rem',
    color: 'hsl(var(--muted-color))',
    marginBottom: '0.4rem',
  },
  itemPrice: {
    fontSize: '0.95rem',
    fontWeight: 600,
    color: 'hsl(var(--text-color))',
    marginBottom: '0.75rem',
  },
  itemControls: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  qtySelector: {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid hsl(var(--border-color))',
    borderRadius: 'var(--radius-sm)',
  },
  qtyBtn: {
    width: '28px',
    height: '28px',
    backgroundColor: '#fff',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'hsl(var(--text-color))',
  },
  qtyVal: {
    padding: '0 0.5rem',
    fontSize: '0.8rem',
    fontWeight: 600,
    minWidth: '18px',
    textAlign: 'center',
  },
  deleteBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#e57373', // soft red for delete
    padding: '0.4rem',
    borderRadius: 'var(--radius-sm)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'var(--transition-smooth)',
  },
  footer: {
    padding: '1.5rem',
    borderTop: '1px solid hsl(var(--border-color))',
    backgroundColor: 'hsl(var(--card-bg))',
  },
  subtotalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: '0.5rem',
  },
  subtotalLabel: {
    fontSize: '1rem',
    fontWeight: 500,
    color: 'hsl(var(--text-color))',
  },
  subtotalVal: {
    fontSize: '1.35rem',
    fontWeight: 600,
    color: 'hsl(var(--text-color))',
  },
  footerText: {
    fontSize: '0.75rem',
    color: 'hsl(var(--muted-color))',
    marginBottom: '1.25rem',
  },
  checkoutBtn: {
    width: '100%',
    padding: '0.85rem',
    fontSize: '0.85rem',
    fontWeight: 600,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    backgroundColor: '#25D366',
    color: '#fff',
    border: 'none',
    borderRadius: 'var(--radius-sm)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
};
