import React from 'react';
import { X, Trash2, ShoppingBag, Plus, Minus, CreditCard } from 'lucide-react';
import ProductSVG from './ProductSVG';

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
                    <ProductSVG category={item.category} colorHex={item.selectedColorHex} />
                  </div>

                  {/* Item Info */}
                  <div style={styles.itemInfo}>
                    <h4 style={styles.itemName}>{item.name}</h4>
                    {item.selectedColor && (
                      <span style={styles.itemColor}>Color: {item.selectedColor}</span>
                    )}
                    <span style={styles.itemPrice}>₹{item.price.toLocaleString('en-IN')}</span>

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
            <button onClick={onCheckout} className="btn btn-primary" style={styles.checkoutBtn}>
              <CreditCard size={16} />
              <span>Proceed to Checkout</span>
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
  },
};
