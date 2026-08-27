import React from 'react';
import { useRoomDesigner } from './RoomDesignerContext';
import { ROOM_SHAPES } from '../../data/roomDesignerData';

function ShapeIcon({ shapeId, color }) {
  switch (shapeId) {
    case 'rectangle':
      return (
        <svg viewBox="0 0 100 100" width="24" height="24">
          <path d="M 5,5 L 95,5 L 95,95 L 5,95 Z" fill={color} />
        </svg>
      );
    case 'cut':
      return (
        <svg viewBox="0 0 100 100" width="24" height="24">
          <path d="M 5,5 L 60,5 L 95,40 L 95,95 L 5,95 Z" fill={color} />
        </svg>
      );
    case 't_shape':
      return (
        <svg viewBox="0 0 100 100" width="24" height="24">
          <path d="M 5,5 L 95,5 L 95,55 L 70,55 L 70,95 L 30,95 L 30,55 L 5,55 Z" fill={color} />
        </svg>
      );
    case 'u_shape':
      return (
        <svg viewBox="0 0 100 100" width="24" height="24">
          <path d="M 5,5 L 35,5 L 35,35 L 65,35 L 65,5 L 95,5 L 95,95 L 5,95 Z" fill={color} />
        </svg>
      );
    case 'beveled':
      return (
        <svg viewBox="0 0 100 100" width="24" height="24">
          <path d="M 30,5 L 70,5 L 95,30 L 95,95 L 5,95 L 5,30 Z" fill={color} />
        </svg>
      );
    default:
      return null;
  }
}

export default function RoomShapeSelector() {
  const { state, dispatch } = useRoomDesigner();
  const roomId = state.activeRoomId;
  const room = state.rooms[roomId];

  if (!room) return null;

  const currentShape = room.roomShape || 'rectangle';

  const handleShapeSelect = (shapeId) => {
    dispatch({ type: 'UPDATE_ROOM_STYLE', payload: { roomId, key: 'roomShape', value: shapeId } });
  };

  return (
    <div style={styles.container}>
      {ROOM_SHAPES.map((shape) => {
        const isSelected = currentShape === shape.id;
        return (
          <button
            key={shape.id}
            onClick={() => handleShapeSelect(shape.id)}
            style={{
              ...styles.shapeBtn,
              borderColor: isSelected ? '#C5A880' : 'transparent',
              backgroundColor: isSelected ? 'rgba(197, 168, 128, 0.1)' : 'transparent',
            }}
            title={shape.label}
          >
            <ShapeIcon shapeId={shape.id} color={isSelected ? '#C5A880' : '#d5d5d5'} />
            <span style={{
              ...styles.shapeLabel,
              color: isSelected ? '#1E1D1B' : '#888',
              fontWeight: isSelected ? '700' : '500',
            }}>
              {shape.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

const styles = {
  container: {
    position: 'absolute',
    top: '1.25rem',
    left: '320px',
    zIndex: 10,
    display: 'flex',
    gap: '0.75rem',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    borderRadius: '16px',
    padding: '0.75rem 1rem',
    boxShadow: '0 8px 32px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,1)',
    border: '1px solid rgba(220, 215, 205, 0.5)',
    alignItems: 'center',
  },
  shapeBtn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    padding: '0.5rem 0.75rem',
    borderRadius: '12px',
    border: '2px solid transparent',
    cursor: 'pointer',
    transition: 'all 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)',
    minWidth: '70px',
    background: 'transparent',
    outline: 'none',
  },
  shapeLabel: {
    fontSize: '0.65rem',
    fontFamily: 'var(--font-body)',
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
  }
};
