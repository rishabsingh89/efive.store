import React from 'react';
import { useRoomDesigner } from './RoomDesignerContext';
import { RotateCw, Trash2 } from 'lucide-react';

export default function FurnitureControls({ item, cx, cy }) {
  const { dispatch } = useRoomDesigner();

  const handleRotate = (e) => {
    e.stopPropagation();
    const next = (item.rotation + 45) % 360;
    dispatch({ type: 'ROTATE_FURNITURE', payload: { id: item.id, rotation: next } });
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    dispatch({ type: 'DELETE_FURNITURE', payload: { id: item.id } });
  };

  const btnW = 26, btnH = 20, gap = 4;
  const totalW = btnW * 2 + gap;
  const startX = cx - totalW / 2;
  const startY = -28;

  return (
    <g style={{ pointerEvents: 'all' }}>
      {/* Background pill */}
      <rect x={startX - 4} y={startY - 4} width={totalW + 8} height={btnH + 8}
        rx={12} fill="rgba(30,29,27,0.85)" />
      
      {/* Rotate */}
      <g onClick={handleRotate} style={{ cursor: 'pointer' }}>
        <rect x={startX} y={startY} width={btnW} height={btnH} rx={6}
          fill="transparent" />
        <foreignObject x={startX + 5} y={startY + 2} width={16} height={16}>
          <RotateCw size={14} color="#fff" />
        </foreignObject>
      </g>

      {/* Delete */}
      <g onClick={handleDelete} style={{ cursor: 'pointer' }}>
        <rect x={startX + btnW + gap} y={startY} width={btnW} height={btnH} rx={6}
          fill="transparent" />
        <foreignObject x={startX + btnW + gap + 5} y={startY + 2} width={16} height={16}>
          <Trash2 size={14} color="#ff6b6b" />
        </foreignObject>
      </g>
    </g>
  );
}
