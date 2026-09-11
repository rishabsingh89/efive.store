import React, { useState } from 'react';
import { useRoomDesigner } from './RoomDesignerContext';
import { ROOM_SHAPES, WALL_COLORS, FLOOR_TYPES } from '../../data/roomDesignerData';
import { Check, ChevronLeft } from 'lucide-react';

export default function RoomBuilderWizard() {
  const { state, dispatch } = useRoomDesigner();
  
  const step = state.wizardStep;
  const roomId = state.activeRoomId;
  const room = state.rooms[roomId];

  if (!room) return null;

  const setStep = (newStep) => {
    dispatch({ type: 'SET_WIZARD_STEP', payload: newStep });
  };

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handleStyleChange = (key, value) => {
    dispatch({ type: 'UPDATE_ROOM_STYLE', payload: { roomId, key, value } });
  };

  // Convert mm to inches for the sliders
  const currentWidthInches = Math.round(room.width * 0.393701);
  const currentHeightInches = Math.round(room.height * 0.393701);

  const handleWidthChange = (e) => {
    const inches = parseInt(e.target.value);
    const cm = Math.round(inches / 0.393701);
    dispatch({ type: 'UPDATE_ROOM_DIMENSIONS', payload: { roomId, width: cm, height: room.height } });
  };

  const handleHeightChange = (e) => {
    const inches = parseInt(e.target.value);
    const cm = Math.round(inches / 0.393701);
    dispatch({ type: 'UPDATE_ROOM_DIMENSIONS', payload: { roomId, width: room.width, height: cm } });
  };

  return (
    <div style={styles.sidebar}>
      <div style={styles.header}>
        <span style={styles.stepIndicator}>Step {step} of 4</span>
        <h2 style={styles.title}>
          {step === 1 && 'Set the shape and size'}
          {step === 2 && 'Adjust your dimensions'}
          {step === 3 && 'Add doors and windows'}
          {step === 4 && 'Choose your room style'}
        </h2>
        {step === 2 && <p style={styles.desc}>Edit the floor plan to match your room's dimensions.</p>}
      </div>

      <div style={styles.content}>
        
        {/* STEP 1: Shape */}
        {step === 1 && (
          <div style={styles.grid2}>
            {ROOM_SHAPES.map(shape => (
              <div 
                key={shape.id} 
                style={{...styles.shapeCard, borderColor: room.roomShape === shape.id ? '#111' : '#eee'}}
                onClick={() => handleStyleChange('roomShape', shape.id)}
              >
                <div style={styles.shapeIconPlaceholder} />
                <span style={{fontWeight: room.roomShape === shape.id ? 'bold' : 'normal'}}>{shape.label}</span>
              </div>
            ))}
          </div>
        )}

        {/* STEP 1 & 2: Dimensions Overlay controls (rendering inside sidebar for simplicity) */}
        {(step === 1 || step === 2) && (
          <div style={styles.sliderContainer}>
            <div style={styles.sliderRow}>
              <label style={styles.sliderLabel}>Width</label>
              <div style={styles.sliderInputGroup}>
                <input type="range" min="100" max="800" value={currentWidthInches} onChange={handleWidthChange} style={styles.range} />
                <span style={styles.inchValue}>{Math.floor(currentWidthInches / 12)}' {currentWidthInches % 12}"</span>
              </div>
            </div>
            <div style={styles.sliderRow}>
              <label style={styles.sliderLabel}>Length</label>
              <div style={styles.sliderInputGroup}>
                <input type="range" min="100" max="800" value={currentHeightInches} onChange={handleHeightChange} style={styles.range} />
                <span style={styles.inchValue}>{Math.floor(currentHeightInches / 12)}' {currentHeightInches % 12}"</span>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Doors & Windows */}
        {step === 3 && (
          <div style={styles.catalogList}>
            <h4 style={styles.subLabel}>Doors</h4>
            <div style={styles.grid2}>
              {['white', 'wooden', 'glass'].map(style => (
                <div 
                  key={`door-${style}`}
                  style={{...styles.catalogCard, borderColor: room.doorStyle === style ? '#111' : '#eee'}}
                  onClick={() => handleStyleChange('doorStyle', style)}
                >
                  <div style={styles.catalogThumb} />
                  <span>{style.charAt(0).toUpperCase() + style.slice(1)} Door</span>
                </div>
              ))}
            </div>

            <h4 style={styles.subLabel}>Windows</h4>
            <div style={styles.grid2}>
              {['sliding', 'grid'].map(style => (
                <div 
                  key={`win-${style}`}
                  style={{...styles.catalogCard, borderColor: room.windowStyle === style ? '#111' : '#eee'}}
                  onClick={() => handleStyleChange('windowStyle', style)}
                >
                  <div style={styles.catalogThumb} />
                  <span>{style.charAt(0).toUpperCase() + style.slice(1)} Window</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 4: Room Style */}
        {step === 4 && (
          <div style={styles.catalogList}>
            <h4 style={styles.subLabel}>Wall color</h4>
            <div style={styles.swatchGrid}>
              {WALL_COLORS.map((c) => (
                <button
                  key={c.id}
                  title={c.label}
                  onClick={() => handleStyleChange('wallColor', c.hex)}
                  style={{
                    ...styles.swatch,
                    backgroundColor: c.hex,
                    outline: room.wallColor === c.hex ? '2.5px solid #111' : '1px solid rgba(0,0,0,0.15)',
                    outlineOffset: room.wallColor === c.hex ? '2px' : '0',
                    border: '1px solid rgba(0,0,0,0.15)',
                    borderRadius: '6px',
                  }}
                />
              ))}
            </div>

            <h4 style={{ ...styles.subLabel, marginTop: '1rem' }}>Floor style</h4>
            <div style={styles.grid6}>
              {FLOOR_TYPES.map((f) => (
                <div
                  key={f.id}
                  title={f.label}
                  onClick={() => handleStyleChange('floorType', f.id)}
                  style={{
                    ...styles.floorCard,
                    outline: room.floorType === f.id ? '2.5px solid #111' : '1px solid #eee',
                    outlineOffset: room.floorType === f.id ? '2px' : '0',
                    backgroundColor: room.floorType === f.id ? '#F8F8F8' : '#FFF',
                  }}
                >
                  <div style={{
                    ...styles.floorPreview,
                    backgroundColor: f.color,
                    backgroundImage: f.pattern !== 'none' ? f.pattern : 'none',
                  }} />
                  <span style={{
                    ...styles.floorLabel,
                    fontWeight: room.floorType === f.id ? '700' : '500',
                  }}>
                    {f.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div style={styles.footer}>
        {step > 1 ? (
          <button style={styles.btnSecondary} onClick={handleBack}>
            Go back
          </button>
        ) : (
          <div /> // Spacer
        )}
        
        {step < 4 ? (
          <button style={styles.btnPrimary} onClick={handleNext}>
            Next
          </button>
        ) : (
          <button style={styles.btnPrimary} onClick={() => dispatch({ type: 'SET_WIZARD_MODE', payload: false })}>
            Design this room
          </button>
        )}
      </div>
    </div>
  );
}

const styles = {
  sidebar: {
    width: '380px',
    flexShrink: 0,
    backgroundColor: '#fff',
    borderRight: '1px solid hsl(40,13%,88%)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  header: {
    padding: '2rem 2rem 1rem',
  },
  stepIndicator: {
    fontSize: '0.8rem',
    fontWeight: 700,
    color: '#555',
    textTransform: 'uppercase',
  },
  title: {
    fontSize: '1.6rem',
    fontWeight: 700,
    color: '#111',
    margin: '0.5rem 0',
  },
  desc: {
    fontSize: '0.9rem',
    color: '#666',
    lineHeight: 1.4,
  },
  content: {
    flex: 1,
    overflowY: 'auto',
    padding: '1rem 2rem 2rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
  },
  grid2: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem',
  },
  shapeCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '1rem',
    border: '2px solid',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: '0.2s',
  },
  shapeIconPlaceholder: {
    width: '60px',
    height: '60px',
    backgroundColor: '#e5e5e5',
  },
  sliderContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    padding: '1.5rem',
    backgroundColor: '#f8f8f8',
    borderRadius: '8px',
  },
  sliderRow: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  sliderLabel: {
    fontSize: '0.85rem',
    fontWeight: 700,
    color: '#111',
  },
  sliderInputGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  range: {
    flex: 1,
  },
  inchValue: {
    fontSize: '0.85rem',
    fontWeight: 600,
    color: '#555',
    minWidth: '60px',
    textAlign: 'right',
  },
  catalogList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  subLabel: {
    fontSize: '1rem',
    fontWeight: 700,
    margin: 0,
  },
  catalogCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '1rem',
    border: '2px solid',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '0.85rem',
    fontWeight: 600,
    textAlign: 'center',
  },
  catalogThumb: {
    width: '100%',
    aspectRatio: '1',
    backgroundColor: '#e5e5e5',
    borderRadius: '4px',
  },
  swatchGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.75rem',
  },
  swatch: {
    width: '40px',
    height: '40px',
    borderRadius: '8px',
    cursor: 'pointer',
    padding: 0,
  },
  grid6: {
    display: 'grid',
    gridTemplateColumns: 'repeat(6, 1fr)',
    gap: '0.4rem',
  },
  grid3: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '0.5rem',
  },
  floorCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.25rem',
    padding: '0.5rem',
    border: '2px solid',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  floorPreview: {
    width: '100%',
    aspectRatio: '1',
    borderRadius: '4px',
    border: '1px solid rgba(0,0,0,0.1)',
  },
  floorLabel: {
    fontSize: '0.75rem',
    fontWeight: 500,
    color: '#333',
    textAlign: 'center',
  },
  footer: {
    padding: '1.5rem 2rem',
    borderTop: '1px solid hsl(40,13%,88%)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btnPrimary: {
    padding: '0.75rem 2rem',
    backgroundColor: '#111',
    color: '#fff',
    border: 'none',
    borderRadius: '24px',
    fontSize: '0.9rem',
    fontWeight: 700,
    cursor: 'pointer',
    minWidth: '120px',
  },
  btnSecondary: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#fff',
    color: '#111',
    border: '1px solid #111',
    borderRadius: '24px',
    fontSize: '0.9rem',
    fontWeight: 700,
    cursor: 'pointer',
  },
};
