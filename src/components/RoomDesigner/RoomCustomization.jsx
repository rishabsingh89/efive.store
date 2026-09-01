import React, { useState } from 'react';
import { useRoomDesigner } from './RoomDesignerContext';
import { WALL_COLORS, FLOOR_TYPES, CEILING_COLORS } from '../../data/roomDesignerData';
import { PaintBucket, Check, ChevronDown, ChevronUp } from 'lucide-react';

export default function RoomCustomization() {
  const { state, dispatch } = useRoomDesigner();
  const [isOpen, setIsOpen] = useState(false);

  const roomId = state.activeRoomId;
  const room = state.rooms[roomId];

  if (!room) return null;

  const handleStyleChange = (key, value) => {
    dispatch({ type: 'UPDATE_ROOM_STYLE', payload: { roomId, key, value } });
  };

  return (
    <div style={styles.container}>
      <button onClick={() => setIsOpen(!isOpen)} style={styles.toggleBtn} className="rd-cust-toggle">
        <div style={styles.toggleLeft}>
          <PaintBucket size={16} style={{ color: '#C5A880' }} />
          <span>Customize Room Style</span>
        </div>
        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      {isOpen && (
        <div style={styles.panel}>
          {/* Wall Color */}
          <div style={styles.section}>
            <span style={styles.label}>Wall Color</span>
            <div style={styles.swatchGrid}>
              {WALL_COLORS.map((c) => (
                <button
                  key={c.id}
                  title={c.label}
                  onClick={() => handleStyleChange('wallColor', c.hex)}
                  style={{
                    ...styles.swatch,
                    backgroundColor: c.hex,
                    border: room.wallColor === c.hex ? '2px solid #C5A880' : '1px solid #ddd',
                  }}
                >
                  {room.wallColor === c.hex && <Check size={12} color={c.hex === '#FFFFFF' ? '#000' : '#fff'} />}
                </button>
              ))}
            </div>
          </div>

          {/* Floor Type */}
          <div style={styles.section}>
            <span style={styles.label}>Floor Material</span>
            <div style={styles.floorGrid}>
              {FLOOR_TYPES.map((f) => (
                <button
                  key={f.id}
                  onClick={() => handleStyleChange('floorType', f.id)}
                  style={{
                    ...styles.floorBtn,
                    borderColor: room.floorType === f.id ? '#C5A880' : '#eee',
                    backgroundColor: room.floorType === f.id ? 'rgba(197,168,128,0.1)' : '#fff',
                  }}
                >
                  <div style={{
                    ...styles.floorPreview,
                    backgroundColor: f.color,
                    backgroundImage: f.pattern !== 'none' ? f.pattern : 'none',
                  }} />
                  <span style={styles.floorLabel}>{f.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Ceiling Color */}
          <div style={styles.section}>
            <span style={styles.label}>Ceiling Color</span>
            <div style={styles.swatchGrid}>
              {CEILING_COLORS.map((c) => (
                <button
                  key={c.id}
                  title={c.label}
                  onClick={() => handleStyleChange('ceilingColor', c.hex)}
                  style={{
                    ...styles.swatch,
                    backgroundColor: c.hex,
                    border: room.ceilingColor === c.hex ? '2px solid #C5A880' : '1px solid #ddd',
                  }}
                >
                  {room.ceilingColor === c.hex && <Check size={12} color={c.hex === '#FFFFFF' ? '#000' : '#fff'} />}
                </button>
              ))}
            </div>
          </div>

          {/* Ceiling Lights (Spotlights) */}
          <div style={styles.section}>
            <span style={styles.label}>Ceiling Spotlights</span>
            <div style={styles.toggleRow}>
              <button
                onClick={() => handleStyleChange('ceilingLights', 'spotlights')}
                style={{
                  ...styles.optionBtn,
                  borderColor: room.ceilingLights !== 'none' ? '#C5A880' : '#eee',
                  backgroundColor: room.ceilingLights !== 'none' ? 'rgba(197,168,128,0.1)' : '#fff',
                }}
              >
                On
              </button>
              <button
                onClick={() => handleStyleChange('ceilingLights', 'none')}
                style={{
                  ...styles.optionBtn,
                  borderColor: room.ceilingLights === 'none' ? '#C5A880' : '#eee',
                  backgroundColor: room.ceilingLights === 'none' ? 'rgba(197,168,128,0.1)' : '#fff',
                }}
              >
                Off
              </button>
            </div>
          </div>

          {/* Door Style */}
          <div style={styles.section}>
            <span style={styles.label}>Door Style</span>
            <div style={styles.styleGrid}>
              {[
                { id: 'white', label: 'Modern White' },
                { id: 'wooden', label: 'Classic Wood' },
                { id: 'glass', label: 'Glass Frame' }
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => handleStyleChange('doorStyle', opt.id)}
                  style={{
                    ...styles.styleBtn,
                    borderColor: (room.doorStyle || 'white') === opt.id ? '#C5A880' : '#eee',
                    backgroundColor: (room.doorStyle || 'white') === opt.id ? 'rgba(197,168,128,0.1)' : '#fff',
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Window Style */}
          <div style={styles.section}>
            <span style={styles.label}>Window Style</span>
            <div style={styles.styleGrid}>
              {[
                { id: 'sliding', label: 'Sliding Sash' },
                { id: 'grid', label: 'Classic Grid' }
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => handleStyleChange('windowStyle', opt.id)}
                  style={{
                    ...styles.styleBtn,
                    borderColor: (room.windowStyle || 'sliding') === opt.id ? '#C5A880' : '#eee',
                    backgroundColor: (room.windowStyle || 'sliding') === opt.id ? 'rgba(197,168,128,0.1)' : '#fff',
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    position: 'absolute',
    top: '0.5rem',
    left: '0.5rem',
    zIndex: 10,
    width: '280px',
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    border: '1px solid hsl(40,13%,90%)',
    overflow: 'hidden',
    fontFamily: 'var(--font-body)',
  },
  toggleBtn: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: '0.75rem 1rem',
    backgroundColor: '#fff',
    border: 'none',
    cursor: 'pointer',
    color: 'hsl(40,9%,11%)',
    fontWeight: 600,
    fontSize: '0.85rem',
  },
  toggleLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  panel: {
    padding: '1rem',
    borderTop: '1px solid hsl(40,13%,90%)',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem',
    maxHeight: '400px',
    overflowY: 'auto',
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  label: {
    fontSize: '0.75rem',
    fontWeight: 600,
    color: 'hsl(40,4%,43%)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  swatchGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.4rem',
  },
  swatch: {
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    transition: 'transform 0.2s',
  },
  floorGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '0.5rem',
  },
  floorBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
    padding: '0.4rem',
    borderRadius: '8px',
    border: '1px solid',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  floorPreview: {
    width: '20px',
    height: '20px',
    borderRadius: '4px',
    flexShrink: 0,
    border: '1px solid rgba(0,0,0,0.1)',
  },
  floorLabel: {
    fontSize: '0.7rem',
    fontWeight: 500,
    color: 'hsl(40,9%,11%)',
  },
  toggleRow: {
    display: 'flex',
    gap: '0.5rem',
  },
  optionBtn: {
    flex: 1,
    padding: '0.4rem',
    borderRadius: '8px',
    border: '1px solid',
    cursor: 'pointer',
    fontSize: '0.75rem',
    fontWeight: 600,
    textAlign: 'center',
    fontFamily: 'var(--font-body)',
  },
  styleGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))',
    gap: '0.4rem',
  },
  styleBtn: {
    padding: '0.4rem',
    borderRadius: '8px',
    border: '1px solid',
    cursor: 'pointer',
    fontSize: '0.72rem',
    fontWeight: 500,
    textAlign: 'center',
    fontFamily: 'var(--font-body)',
  }
};
