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
    top: '1rem',
    left: '320px',
    zIndex: 10,
    display: 'flex',
    gap: '0.5rem',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '0.5rem 1rem',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    border: '1px solid hsl(40,13%,90%)',
  },
  shapeBtn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.4rem',
    padding: '0.4rem 0.6rem',
    borderRadius: '8px',
    border: '2px solid',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    minWidth: '60px',
  },
  shapeLabel: {
    fontSize: '0.65rem',
    fontFamily: 'var(--font-body)',
  }
};
