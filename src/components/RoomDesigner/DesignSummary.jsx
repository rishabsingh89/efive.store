import React, { useState } from 'react';
import { useRoomDesigner } from './RoomDesignerContext';
import { Receipt, Save, Trash2, X } from 'lucide-react';

const formatPrice = (n) => '₹' + n.toLocaleString('en-IN');

export default function DesignSummary({ onClose }) {
  const { state, dispatch, saveDesign } = useRoomDesigner();
  const [isOpen, setIsOpen] = useState(onClose ? true : false);
  const [showConfirm, setShowConfirm] = useState(false);

  const roomId = state.activeRoomId;
  const room = state.rooms[roomId];

  if (!room) return null;

  const furnitureList = room.furniture || [];
  const totalPrice = furnitureList.reduce((acc, item) => acc + (item.price || 0), 0);

  const handleReset = () => {
    dispatch({ type: 'RESET_ROOM', payload: { roomId } });
    setShowConfirm(false);
  };

  const handleSave = () => {
    saveDesign();
    alert('Design saved successfully! You can leave and come back later.');
  };

  return (
    <div style={onClose ? { height: '100%', display: 'flex', flexDirection: 'column' } : styles.container}>
      {/* Collapsed Bar */}
      {!isOpen ? (
        <button onClick={() => setIsOpen(true)} style={styles.summaryBar} className="rd-summary-bar">
          <div style={styles.summaryLeft}>
            <Receipt size={18} style={{ color: '#C5A880' }} />
            <div style={styles.summaryInfo}>
              <span style={styles.summaryTitle}>Your Room</span>
              <span style={styles.summaryCount}>{furnitureList.length} items</span>
            </div>
          </div>
          <span style={styles.summaryTotal}>{formatPrice(totalPrice)}</span>
        </button>
      ) : (
        /* Expanded Panel */
        <div style={onClose ? { ...styles.panel, height: '100%', maxHeight: 'none', border: 'none', borderRadius: 0 } : styles.panel}>
          <div style={styles.header}>
            <div style={styles.headerLeft}>
              <Receipt size={16} style={{ color: '#C5A880' }} />
              <h4 style={styles.title}>Room Summary</h4>
            </div>
            <button onClick={() => { setIsOpen(false); if (onClose) onClose(); }} style={styles.closeBtn}>
              <X size={16} />
            </button>
          </div>

          <div style={styles.list}>
            {furnitureList.length > 0 ? (
              furnitureList.map((item) => (
                <div key={item.id} style={styles.listItem}>
                  <div style={styles.itemInfo}>
                    <span style={styles.itemName}>{item.name}</span>
                    <span style={styles.itemCat}>{item.category}</span>
                  </div>
                  <span style={styles.itemPrice}>{formatPrice(item.price)}</span>
                  <button
                    onClick={() => dispatch({ type: 'DELETE_FURNITURE', payload: { id: item.id } })}
                    style={styles.delBtn}
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              ))
            ) : (
              <p style={styles.emptyMsg}>Your room is empty. Add some furniture!</p>
            )}
          </div>

          <div style={styles.footer}>
            <div style={styles.totalRow}>
              <span style={styles.totalLabel}>Total Estimate</span>
              <span style={styles.totalVal}>{formatPrice(totalPrice)}</span>
            </div>

            {showConfirm ? (
              <div style={styles.confirmBox}>
                <p style={styles.confirmText}>Reset this room?</p>
                <div style={styles.confirmBtns}>
                  <button onClick={() => setShowConfirm(false)} style={styles.cancelBtn}>Cancel</button>
                  <button onClick={handleReset} style={styles.resetConfirmBtn}>Yes, Reset</button>
                </div>
              </div>
            ) : (
              <div style={styles.actionBtns}>
                <button
                  onClick={() => setShowConfirm(true)}
                  style={styles.actionBtn}
                  className="rd-btn-outline"
                >
                  <Trash2 size={14} /> Reset
                </button>
                <button
                  onClick={handleSave}
                  style={{ ...styles.actionBtn, ...styles.saveBtn }}
                  className="rd-btn-primary"
                >
                  <Save size={14} /> Save Design
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    position: 'absolute',
    bottom: '1rem',
    right: '1rem',
    zIndex: 10,
    fontFamily: 'var(--font-body)',
  },
  summaryBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '280px',
    padding: '0.75rem 1rem',
    backgroundColor: '#fff',
    border: '1px solid hsl(40,13%,90%)',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    cursor: 'pointer',
  },
  summaryLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  summaryInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  summaryTitle: {
    fontSize: '0.85rem',
    fontWeight: 600,
    color: 'hsl(40,9%,11%)',
  },
  summaryCount: {
    fontSize: '0.7rem',
    color: 'hsl(40,4%,43%)',
  },
  summaryTotal: {
    fontSize: '1rem',
    fontWeight: 700,
    color: 'hsl(34,40%,52%)',
  },
  panel: {
    width: '320px',
    backgroundColor: '#fff',
    border: '1px solid hsl(40,13%,90%)',
    borderRadius: '12px',
    boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
    display: 'flex',
    flexDirection: 'column',
    maxHeight: '450px',
    overflow: 'hidden',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem',
    borderBottom: '1px solid hsl(40,13%,90%)',
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  title: {
    fontSize: '0.9rem',
    fontWeight: 600,
    margin: 0,
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#999',
    display: 'flex',
  },
  list: {
    flex: 1,
    overflowY: 'auto',
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  listItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    paddingBottom: '0.5rem',
    borderBottom: '1px dashed #eee',
  },
  itemInfo: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    minWidth: 0,
  },
  itemName: {
    fontSize: '0.78rem',
    fontWeight: 500,
    color: 'hsl(40,9%,11%)',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  itemCat: {
    fontSize: '0.65rem',
    color: '#999',
    textTransform: 'uppercase',
  },
  itemPrice: {
    fontSize: '0.78rem',
    fontWeight: 600,
    color: 'hsl(40,9%,11%)',
  },
  delBtn: {
    background: 'none',
    border: 'none',
    color: '#ff6b6b',
    cursor: 'pointer',
    padding: '4px',
    display: 'flex',
    borderRadius: '4px',
  },
  emptyMsg: {
    textAlign: 'center',
    color: '#999',
    fontSize: '0.8rem',
    margin: '2rem 0',
  },
  footer: {
    padding: '1rem',
    borderTop: '1px solid hsl(40,13%,90%)',
    backgroundColor: 'hsl(40,20%,98%)',
  },
  totalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem',
  },
  totalLabel: {
    fontSize: '0.85rem',
    fontWeight: 600,
    color: 'hsl(40,9%,11%)',
  },
  totalVal: {
    fontSize: '1.2rem',
    fontWeight: 700,
    color: 'hsl(34,40%,52%)',
  },
  actionBtns: {
    display: 'flex',
    gap: '0.5rem',
  },
  actionBtn: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.4rem',
    padding: '0.6rem',
    borderRadius: '8px',
    fontSize: '0.8rem',
    fontWeight: 600,
    cursor: 'pointer',
    border: '1px solid #ccc',
    backgroundColor: '#fff',
  },
  saveBtn: {
    backgroundColor: '#C5A880',
    borderColor: '#C5A880',
    color: '#fff',
  },
  confirmBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    padding: '0.75rem',
    backgroundColor: '#fff',
    border: '1px solid #ffcccc',
    borderRadius: '8px',
  },
  confirmText: {
    fontSize: '0.8rem',
    color: '#ff4444',
    margin: 0,
    fontWeight: 500,
    textAlign: 'center',
  },
  confirmBtns: {
    display: 'flex',
    gap: '0.5rem',
  },
  cancelBtn: {
    flex: 1,
    padding: '0.5rem',
    borderRadius: '6px',
    border: '1px solid #ddd',
    backgroundColor: '#fff',
    cursor: 'pointer',
    fontSize: '0.75rem',
  },
  resetConfirmBtn: {
    flex: 1,
    padding: '0.5rem',
    borderRadius: '6px',
    border: 'none',
    backgroundColor: '#ff4444',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '0.75rem',
    fontWeight: 600,
  },
};
