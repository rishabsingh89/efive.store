import React, { useState, useRef, useEffect } from 'react';
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

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return isMobile;
}

export default function RoomShapeSelector() {
  const { state, dispatch } = useRoomDesigner();
  const roomId = state.activeRoomId;
  const room = state.rooms[roomId];
  const isMobile = useIsMobile();

  const containerRef = useRef(null);
  const [position, setPosition] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnimating, setIsAnimating] = useState(true);
  const dragRef = useRef({ startX: 0, startY: 0, initialLeft: 0, initialTop: 0, wasDragging: false });

  if (!room) return null;

  useEffect(() => {
    const timer1 = setTimeout(() => {
      if (containerRef.current && containerRef.current.offsetParent) {
        const parentRect = containerRef.current.offsetParent.getBoundingClientRect();
        setPosition({
          x: parentRect.width - 60,
          y: parentRect.height / 2
        });
      }
    }, 100);

    const timer2 = setTimeout(() => {
      setIsAnimating(false);
    }, 2100);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const currentShape = room.roomShape || 'rectangle';

  const handleShapeSelect = (shapeId, e) => {
    if (dragRef.current && dragRef.current.wasDragging) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    dispatch({ type: 'UPDATE_ROOM_STYLE', payload: { roomId, key: 'roomShape', value: shapeId } });
  };

  const onPointerDown = (e) => {
    if (e.button !== 0) return; // Only left click
    
    setIsAnimating(false);

    let centerX, centerY;
    if (position) {
      centerX = position.x;
      centerY = position.y;
    } else {
      const rect = containerRef.current.getBoundingClientRect();
      const parentRect = containerRef.current.offsetParent.getBoundingClientRect();
      centerX = rect.left + rect.width / 2 - parentRect.left;
      centerY = rect.top + rect.height / 2 - parentRect.top;
    }

    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initialLeft: centerX,
      initialTop: centerY,
      wasDragging: false
    };
    setIsDragging(true);

    const onMove = (ev) => {
      const dx = ev.clientX - dragRef.current.startX;
      const dy = ev.clientY - dragRef.current.startY;
      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
        dragRef.current.wasDragging = true;
      }
      setPosition({
        x: dragRef.current.initialLeft + dx,
        y: dragRef.current.initialTop + dy
      });
    };

    const onUp = () => {
      setIsDragging(false);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      
      // Delay resetting wasDragging so onClick handlers can read it
      setTimeout(() => {
        if (dragRef.current) dragRef.current.wasDragging = false;
      }, 50);
    };

    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
  };

  // Determine orientation
  let orientation = 'row';
  if (position && containerRef.current && containerRef.current.offsetParent) {
    const parentWidth = containerRef.current.offsetParent.clientWidth;
    const isLeft = position.x < 150;
    const isRight = position.x > parentWidth - 150;
    if (isLeft || isRight) orientation = 'column';
  }

  const defaultStyles = position ? {
    top: `${position.y}px`,
    left: `${position.x}px`,
    transform: 'translate(-50%, -50%)',
    flexDirection: orientation,
  } : {
    top: '0.5rem',
    left: '50%',
    transform: 'translateX(-50%)',
    flexDirection: 'row',
  };

  return (
    <div 
      ref={containerRef}
      onPointerDown={onPointerDown}
      style={{
        ...styles.container,
        ...defaultStyles,
        ...(isMobile ? {
          transform: `translate(-50%, -50%) scale(0.75)`,
          top: position ? `${position.y}px` : 'calc(100% - 100px)', // push lower down when no custom pos
        } : {}),
        transition: isDragging ? 'none' : (isAnimating ? 'all 2s cubic-bezier(0.4, 0, 0.2, 1)' : 'all 0.3s ease'),
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
    >
      {ROOM_SHAPES.map((shape) => {
        const isSelected = currentShape === shape.id;
        return (
          <button
            key={shape.id}
            onClick={(e) => handleShapeSelect(shape.id, e)}
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
    touchAction: 'none' // Prevent scrolling when dragging on touch devices
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
    cursor: 'pointer', // this gets overridden by container but remains useful
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

