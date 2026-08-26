import React, { useRef } from 'react';
import { Html, PivotControls } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { useRoomDesigner } from './RoomDesignerContext';
import * as THREE from 'three';

const MODEL_HEIGHTS = {
  beds: 1.0,
  sofa: 0.8,
  recliners: 0.85,
  tables: 0.76,
  dining: 0.76,
  study: 0.76,
  chairs: 0.85,
  wardrobes: 1.8,
  dressers: 0.92,
  tvunits: 1.2,
  kitchen: 0.94,
  decor: 0.7,
};

function FurnitureModel({ category, w, d, color }) {
  // w = width (X axis), d = depth (Z axis)
  switch (category) {
    case 'beds': {
      const baseH = 0.25;
      const headH = 1.0;
      const headD = 0.08;
      const mattressH = 0.2;
      return (
        <group>
          {/* Bed frame / base */}
          <mesh position={[0, baseH / 2, 0]} castShadow receiveShadow>
            <boxGeometry args={[w, baseH, d]} />
            <meshStandardMaterial color="#6d4c41" roughness={0.7} />
          </mesh>
          {/* Headboard */}
          <mesh position={[0, headH / 2, -d / 2 + headD / 2]} castShadow receiveShadow>
            <boxGeometry args={[w, headH, headD]} />
            <meshStandardMaterial color={color} roughness={0.6} />
          </mesh>
          {/* Mattress */}
          <mesh position={[0, baseH + mattressH / 2, headD / 2]} castShadow receiveShadow>
            <boxGeometry args={[w - 0.05, mattressH, d - headD - 0.05]} />
            <meshStandardMaterial color="#f5f5f4" roughness={0.9} />
          </mesh>
          {/* Pillows */}
          <mesh position={[-w / 4, baseH + mattressH + 0.04, -d / 2 + headD + 0.25]} castShadow>
            <boxGeometry args={[w / 3.2, 0.06, 0.3]} />
            <meshStandardMaterial color={color} roughness={0.8} />
          </mesh>
          <mesh position={[w / 4, baseH + mattressH + 0.04, -d / 2 + headD + 0.25]} castShadow>
            <boxGeometry args={[w / 3.2, 0.06, 0.3]} />
            <meshStandardMaterial color={color} roughness={0.8} />
          </mesh>
          {/* Blanket overlay */}
          <mesh position={[0, baseH + mattressH + 0.01, 0.1]} castShadow>
            <boxGeometry args={[w - 0.04, 0.02, d / 2]} />
            <meshStandardMaterial color={color} roughness={0.8} />
          </mesh>
        </group>
      );
    }
    
    case 'sofa': {
      const seatH = 0.35;
      const backH = 0.8;
      const armW = 0.15;
      const backD = 0.15;
      return (
        <group>
          {/* Seat Cushion */}
          <mesh position={[0, seatH / 2, 0]} castShadow receiveShadow>
            <boxGeometry args={[w - armW * 2, seatH, d]} />
            <meshStandardMaterial color={color} roughness={0.6} />
          </mesh>
          {/* Left Armrest */}
          <mesh position={[-w / 2 + armW / 2, 0.5 / 2, 0]} castShadow receiveShadow>
            <boxGeometry args={[armW, 0.5, d]} />
            <meshStandardMaterial color={color} roughness={0.6} />
          </mesh>
          {/* Right Armrest */}
          <mesh position={[w / 2 - armW / 2, 0.5 / 2, 0]} castShadow receiveShadow>
            <boxGeometry args={[armW, 0.5, d]} />
            <meshStandardMaterial color={color} roughness={0.6} />
          </mesh>
          {/* Backrest */}
          <mesh position={[0, backH / 2, -d / 2 + backD / 2]} castShadow receiveShadow>
            <boxGeometry args={[w, backH, backD]} />
            <meshStandardMaterial color={color} roughness={0.6} />
          </mesh>
        </group>
      );
    }
    
    case 'recliners': {
      const seatH = 0.4;
      const backH = 0.85;
      const armW = 0.12;
      return (
        <group>
          {/* Seat */}
          <mesh position={[0, seatH / 2, 0]} castShadow receiveShadow>
            <boxGeometry args={[w - armW * 2, seatH, d]} />
            <meshStandardMaterial color={color} roughness={0.6} />
          </mesh>
          {/* Armrests */}
          <mesh position={[-w / 2 + armW / 2, 0.55 / 2, 0]} castShadow receiveShadow>
            <boxGeometry args={[armW, 0.55, d]} />
            <meshStandardMaterial color={color} roughness={0.6} />
          </mesh>
          <mesh position={[w / 2 - armW / 2, 0.55 / 2, 0]} castShadow receiveShadow>
            <boxGeometry args={[armW, 0.55, d]} />
            <meshStandardMaterial color={color} roughness={0.6} />
          </mesh>
          {/* Backrest */}
          <mesh position={[0, backH / 2, -d / 2 + 0.08]} castShadow receiveShadow>
            <boxGeometry args={[w - 0.02, backH, 0.16]} />
            <meshStandardMaterial color={color} roughness={0.6} />
          </mesh>
        </group>
      );
    }
    
    case 'tables':
    case 'dining':
    case 'study': {
      const topH = 0.72;
      const thickness = 0.04;
      const legW = 0.06;
      return (
        <group>
          {/* Table Top */}
          <mesh position={[0, topH + thickness / 2, 0]} castShadow receiveShadow>
            <boxGeometry args={[w, thickness, d]} />
            <meshStandardMaterial color="#a1887f" roughness={0.5} metalness={0.1} />
          </mesh>
          {/* Legs */}
          <mesh position={[-w / 2 + legW, topH / 2, -d / 2 + legW]} castShadow>
            <boxGeometry args={[legW, topH, legW]} />
            <meshStandardMaterial color="#212121" roughness={0.5} />
          </mesh>
          <mesh position={[w / 2 - legW, topH / 2, -d / 2 + legW]} castShadow>
            <boxGeometry args={[legW, topH, legW]} />
            <meshStandardMaterial color="#212121" roughness={0.5} />
          </mesh>
          <mesh position={[-w / 2 + legW, topH / 2, d / 2 - legW]} castShadow>
            <boxGeometry args={[legW, topH, legW]} />
            <meshStandardMaterial color="#212121" roughness={0.5} />
          </mesh>
          <mesh position={[w / 2 - legW, topH / 2, d / 2 - legW]} castShadow>
            <boxGeometry args={[legW, topH, legW]} />
            <meshStandardMaterial color="#212121" roughness={0.5} />
          </mesh>
        </group>
      );
    }
    
    case 'chairs': {
      const seatH = 0.45;
      const legW = 0.04;
      const backH = 0.85;
      return (
        <group>
          {/* Seat Cushion */}
          <mesh position={[0, seatH, 0]} castShadow receiveShadow>
            <boxGeometry args={[w, 0.05, d]} />
            <meshStandardMaterial color={color} roughness={0.7} />
          </mesh>
          {/* Legs */}
          <mesh position={[-w / 2 + legW, seatH / 2, -d / 2 + legW]} castShadow>
            <boxGeometry args={[legW, seatH, legW]} />
            <meshStandardMaterial color="#111" roughness={0.8} />
          </mesh>
          <mesh position={[w / 2 - legW, seatH / 2, -d / 2 + legW]} castShadow>
            <boxGeometry args={[legW, seatH, legW]} />
            <meshStandardMaterial color="#111" roughness={0.8} />
          </mesh>
          <mesh position={[-w / 2 + legW, seatH / 2, d / 2 - legW]} castShadow>
            <boxGeometry args={[legW, seatH, legW]} />
            <meshStandardMaterial color="#111" roughness={0.8} />
          </mesh>
          <mesh position={[w / 2 - legW, seatH / 2, d / 2 - legW]} castShadow>
            <boxGeometry args={[legW, seatH, legW]} />
            <meshStandardMaterial color="#111" roughness={0.8} />
          </mesh>
          {/* Backrest */}
          <mesh position={[0, seatH + 0.2, -d / 2 + 0.02]} castShadow receiveShadow>
            <boxGeometry args={[w, 0.35, 0.04]} />
            <meshStandardMaterial color={color} roughness={0.7} />
          </mesh>
          {/* Backrest rails */}
          <mesh position={[-w / 2 + legW, seatH + 0.1, -d / 2 + legW]} castShadow>
            <boxGeometry args={[legW, 0.2, legW]} />
            <meshStandardMaterial color="#111" roughness={0.8} />
          </mesh>
          <mesh position={[w / 2 - legW, seatH + 0.1, -d / 2 + legW]} castShadow>
            <boxGeometry args={[legW, 0.2, legW]} />
            <meshStandardMaterial color="#111" roughness={0.8} />
          </mesh>
        </group>
      );
    }
    
    case 'wardrobes':
    case 'dressers': {
      const height = category === 'wardrobes' ? 1.8 : 0.9;
      return (
        <group>
          {/* Main Cabinet Box */}
          <mesh position={[0, height / 2, 0]} castShadow receiveShadow>
            <boxGeometry args={[w, height, d]} />
            <meshStandardMaterial color={color} roughness={0.5} />
          </mesh>
          {/* Wooden Top for dresser */}
          {category === 'dressers' && (
            <mesh position={[0, height + 0.01, 0]} castShadow receiveShadow>
              <boxGeometry args={[w + 0.02, 0.02, d + 0.02]} />
              <meshStandardMaterial color="#5d4037" roughness={0.4} />
            </mesh>
          )}
          {/* Door handles / details */}
          <mesh position={[0, height / 2, d / 2 + 0.005]} castShadow>
            <boxGeometry args={[0.01, height - 0.1, 0.01]} />
            <meshStandardMaterial color="#333" />
          </mesh>
          <mesh position={[-0.05, height / 2, d / 2 + 0.015]} castShadow>
            <boxGeometry args={[0.02, 0.12, 0.015]} />
            <meshStandardMaterial color="#C5A880" metalness={0.8} roughness={0.2} />
          </mesh>
          <mesh position={[0.05, height / 2, d / 2 + 0.015]} castShadow>
            <boxGeometry args={[0.02, 0.12, 0.015]} />
            <meshStandardMaterial color="#C5A880" metalness={0.8} roughness={0.2} />
          </mesh>
        </group>
      );
    }
    
    case 'tvunits': {
      const baseH = 0.45;
      const tvW = 0.95;
      const tvH = 0.58;
      return (
        <group>
          {/* Base Cabinet */}
          <mesh position={[0, baseH / 2, 0]} castShadow receiveShadow>
            <boxGeometry args={[w, baseH, d]} />
            <meshStandardMaterial color={color} roughness={0.6} />
          </mesh>
          {/* TV Stand pole */}
          <mesh position={[0, baseH + 0.08, 0]} castShadow>
            <boxGeometry args={[0.08, 0.16, 0.08]} />
            <meshStandardMaterial color="#222" metalness={0.8} />
          </mesh>
          {/* TV Screen */}
          <mesh position={[0, baseH + 0.16 + tvH / 2, 0]} castShadow>
            <boxGeometry args={[tvW, tvH, 0.04]} />
            <meshStandardMaterial color="#111" roughness={0.2} metalness={0.9} />
          </mesh>
        </group>
      );
    }
    
    case 'kitchen': {
      const height = 0.9;
      return (
        <group>
          {/* Counter base */}
          <mesh position={[0, height / 2, 0]} castShadow receiveShadow>
            <boxGeometry args={[w, height, d]} />
            <meshStandardMaterial color={color} roughness={0.6} />
          </mesh>
          {/* granite top */}
          <mesh position={[0, height + 0.02, 0]} castShadow receiveShadow>
            <boxGeometry args={[w + 0.01, 0.04, d + 0.01]} />
            <meshStandardMaterial color="#37474f" roughness={0.3} />
          </mesh>
          {/* Sink visual */}
          <mesh position={[0, height + 0.042, 0.05]} castShadow>
            <boxGeometry args={[0.3, 0.005, 0.25]} />
            <meshStandardMaterial color="#b0bec5" metalness={0.8} roughness={0.2} />
          </mesh>
          {/* Faucet */}
          <mesh position={[0, height + 0.15, -0.1]} castShadow>
            <boxGeometry args={[0.02, 0.14, 0.02]} />
            <meshStandardMaterial color="#cfd8dc" metalness={0.9} roughness={0.1} />
          </mesh>
        </group>
      );
    }
    
    case 'decor':
    default: {
      return (
        <group>
          {/* Vase / Pot */}
          <mesh position={[0, 0.18, 0]} castShadow>
            <cylinderGeometry args={[0.12, 0.09, 0.36, 16]} />
            <meshStandardMaterial color="#d84315" roughness={0.5} />
          </mesh>
          {/* Plant sphere details */}
          <mesh position={[0, 0.42, 0]} castShadow>
            <sphereGeometry args={[0.22, 16, 16]} />
            <meshStandardMaterial color="#2e7d32" roughness={0.9} />
          </mesh>
          <mesh position={[-0.08, 0.52, 0.08]} castShadow>
            <sphereGeometry args={[0.16, 16, 16]} />
            <meshStandardMaterial color="#4caf50" roughness={0.9} />
          </mesh>
          <mesh position={[0.08, 0.52, -0.08]} castShadow>
            <sphereGeometry args={[0.16, 16, 16]} />
            <meshStandardMaterial color="#4caf50" roughness={0.9} />
          </mesh>
        </group>
      );
    }
  }
}

export default function RoomFurniture({ item, roomW, roomD }) {
  const { state, dispatch } = useRoomDesigner();
  const isSelected = state.selectedFurnitureId === item.id;

  // Coordinates
  const x3 = (item.x / 100) - (roomW / 2);
  const z3 = (item.y / 100) - (roomD / 2);
  const rotationY = (item.rotation * Math.PI) / 180;
  
  const w3 = item.width / 100;
  const h3 = item.height / 100;
  const cutOutHeight = Math.max(w3, h3);
  
  const modelH = MODEL_HEIGHTS[item.category] || 0.7;

  return (
    <PivotControls
      activeAxes={[true, false, true]}
      translationLimits={[
        [-(roomW / 2) + w3 / 2, (roomW / 2) - w3 / 2],
        [0, 0],
        [-(roomD / 2) + h3 / 2, (roomD / 2) - h3 / 2]
      ]}
      onDrag={(local) => {
        const position = new THREE.Vector3();
        position.setFromMatrixPosition(local);
        
        const newX = (position.x + roomW / 2) * 100;
        const newY = (position.z + roomD / 2) * 100;

        dispatch({ type: 'MOVE_FURNITURE', payload: { id: item.id, x: newX, y: newY } });
      }}
      visible={isSelected}
      disableAxes={!isSelected}
      disableSliders={!isSelected}
      depthTest={false}
      lineWidth={2}
      axisColors={['#ff4b4b', '#4CAF50', '#2196F3']}
    >
      <group 
        position={[x3, cutOutHeight / 2, z3]} 
        rotation={[0, -rotationY, 0]}
        onClick={(e) => {
          e.stopPropagation();
          dispatch({ type: 'SELECT_FURNITURE', payload: item.id });
        }}
      >
        <group position={[0, -cutOutHeight / 2, 0]}>
          {/* Custom 3D Model */}
          <FurnitureModel category={item.category} w={w3} d={h3} color={item.color || '#d7ccc8'} />
          
          {isSelected && (
            <>
              {/* Outline Highlight Box */}
              <mesh position={[0, modelH / 2, 0]}>
                <boxGeometry args={[w3 + 0.04, modelH + 0.04, h3 + 0.04]} />
                <meshBasicMaterial color="#FFD700" wireframe transparent opacity={0.7} />
              </mesh>

              {/* Clean Minimal Floating Tooltip above the item */}
              <Html position={[0, modelH + 0.25, 0]} distanceFactor={4} style={{ pointerEvents: 'none' }}>
                <div style={styles.floatingTooltip}>
                  <span style={styles.floatingName}>{item.name.slice(0, 16)}</span>
                  <span style={styles.floatingPrice}>₹{item.price.toLocaleString('en-IN')}</span>
                </div>
              </Html>
            </>
          )}
        </group>
      </group>
    </PivotControls>
  );
}

const styles = {
  floatingTooltip: {
    background: 'rgba(30, 29, 27, 0.9)',
    color: '#fff',
    padding: '6px 12px',
    borderRadius: '16px',
    fontSize: '11px',
    fontWeight: '700',
    fontFamily: 'var(--font-body)',
    whiteSpace: 'nowrap',
    boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
    border: '1px solid rgba(255,255,255,0.15)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '2px',
    userSelect: 'none',
  },
  floatingName: {
    opacity: 0.9,
  },
  floatingPrice: {
    color: '#C5A880',
    fontWeight: '800',
  }
};
