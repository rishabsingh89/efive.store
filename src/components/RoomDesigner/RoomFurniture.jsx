import React, { Suspense } from 'react';
import * as THREE from 'three';
import { Html, PivotControls } from '@react-three/drei';
import { Select } from '@react-three/postprocessing';
import { useThree, useLoader } from '@react-three/fiber';
import { useRoomDesigner } from './RoomDesignerContext';

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

function ControlDot({ position }) {
  return (
    <Html position={position} center zIndexRange={[100, 0]}>
      <div style={{
        width: '14px',
        height: '14px',
        borderRadius: '50%',
        backgroundColor: '#ffffff',
        border: '3px solid rgba(136, 136, 136, 0.9)',
        boxShadow: '0 2px 6px rgba(0,0,0,0.5)',
        pointerEvents: 'none'
      }} />
    </Html>
  );
}

// 2D Image Billboard — renders product image as a textured plane in 3D space
function ImageBillboard({ url, modelH, w }) {
  const texture = useLoader(THREE.TextureLoader, url);
  // Compute aspect ratio from loaded texture
  const aspect = texture.image ? texture.image.width / texture.image.height : 1;
  const planeH = modelH;
  const planeW = planeH * aspect;
  // Clamp width so it doesn't exceed the footprint
  const finalW = Math.min(planeW, w * 1.2);
  const finalH = finalW / aspect;

  return (
    <mesh position={[0, finalH / 2, 0]} castShadow>
      <planeGeometry args={[finalW, finalH]} />
      <meshBasicMaterial map={texture} transparent side={THREE.DoubleSide} toneMapped={false} />
    </mesh>
  );
}

function FurnitureModel({ category, w, d, color, imageUrl }) {
  // If the product has an image and is NOT a structural element, render a billboard
  const isStructural = category === 'doors' || category === 'windows';
  const modelH = MODEL_HEIGHTS[category] || 0.7;

  if (imageUrl && !isStructural) {
    return (
      <Suspense fallback={
        <mesh position={[0, modelH / 2, 0]}>
          <boxGeometry args={[w, modelH, d]} />
          <meshStandardMaterial color="#e0e0e0" transparent opacity={0.3} />
        </mesh>
      }>
        <ImageBillboard url={imageUrl} modelH={modelH} w={w} />
      </Suspense>
    );
  }

  // Fallback to 3D primitive shapes for structural elements or products without images
  // w = width (X axis), d = depth (Z axis)
  switch (category) {
    case 'doors': {
      const doorH = 2.1336; // 7 feet in meters
      const doorD = 0.12;
      return (
        <group>
          {/* Frame */}
          <mesh position={[0, doorH / 2, 0]} castShadow receiveShadow>
            <boxGeometry args={[w, doorH, doorD]} />
            <meshStandardMaterial color="#ffffff" roughness={0.7} />
          </mesh>
          {/* Flush Panel */}
          <mesh position={[0, doorH / 2, 0]} castShadow receiveShadow>
            <boxGeometry args={[w - 0.04, doorH - 0.04, doorD + 0.02]} />
            <meshStandardMaterial color="#ffffff" roughness={0.6} />
          </mesh>
          {/* Subtle panel grooves/trim for depth */}
          <mesh position={[0, doorH / 2, 0]}>
            <boxGeometry args={[w - 0.1, doorH - 0.1, doorD + 0.025]} />
            <meshStandardMaterial color="#f5f5f5" roughness={0.7} />
          </mesh>
          
          {/* Modern Horizontal Lever Handle */}
          <group position={[w / 2 - 0.1, doorH / 2, doorD / 2 + 0.02]}>
            <mesh castShadow rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.02, 0.02, 0.01, 16]} />
              <meshStandardMaterial color="#b0bec5" metalness={0.8} roughness={0.2} />
            </mesh>
            <mesh position={[0, 0, 0.02]} castShadow rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.01, 0.01, 0.04, 8]} />
              <meshStandardMaterial color="#b0bec5" metalness={0.8} roughness={0.2} />
            </mesh>
            <mesh position={[-0.04, 0, 0.04]} castShadow>
              <boxGeometry args={[0.1, 0.015, 0.01]} />
              <meshStandardMaterial color="#b0bec5" metalness={0.8} roughness={0.2} />
            </mesh>
          </group>
        </group>
      );
    }
    case 'windows': {
      const winH = 1.0;
      const winD = 0.12;
      return (
        <group position={[0, Math.max(w, 0.1)/2 + winH/2, 0]}>
          {/* Main Frame */}
          <mesh castShadow receiveShadow>
            <boxGeometry args={[w, winH, winD]} />
            <meshStandardMaterial color="#ffffff" roughness={0.7} />
          </mesh>
          {/* Left Sliding Panel */}
          <group position={[-w / 4, 0, 0.02]}>
            <mesh>
              <boxGeometry args={[w / 2 - 0.02, winH - 0.08, 0.04]} />
              <meshStandardMaterial color="#ffffff" roughness={0.8} />
            </mesh>
            <mesh position={[0, 0, 0.01]}>
              <boxGeometry args={[w / 2 - 0.06, winH - 0.12, 0.04]} />
              <meshStandardMaterial color="#80deea" transparent opacity={0.35} roughness={0.1} metalness={0.9} />
            </mesh>
          </group>
          {/* Right Sliding Panel */}
          <group position={[w / 4, 0, -0.02]}>
            <mesh>
              <boxGeometry args={[w / 2 - 0.02, winH - 0.08, 0.04]} />
              <meshStandardMaterial color="#ffffff" roughness={0.8} />
            </mesh>
            <mesh position={[0, 0, 0.01]}>
              <boxGeometry args={[w / 2 - 0.06, winH - 0.12, 0.04]} />
              <meshStandardMaterial color="#80deea" transparent opacity={0.35} roughness={0.1} metalness={0.9} />
            </mesh>
          </group>
        </group>
      );
    }
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

export default function RoomFurniture({ item, roomW, roomD, setOrbitEnabled }) {
  const { state, dispatch } = useRoomDesigner();
  const isSelected = state.selectedFurnitureId === item.id;
  const { camera, pointer } = useThree();
  const [active, setActive] = React.useState(false);
  const raycaster = React.useMemo(() => new THREE.Raycaster(), []);
  
  // Ref for stable drag plane
  const dragPlaneRef = React.useRef(new THREE.Plane());

  // Coordinates
  const x3 = (item.x / 100) - (roomW / 2);
  const z3 = (item.y / 100) - (roomD / 2);
  const rotationY = (item.rotation * Math.PI) / 180;
  
  const w3 = item.width / 100;
  const h3 = item.height / 100;
  const cutOutHeight = Math.max(w3, h3);
  
  const modelH = MODEL_HEIGHTS[item.category] || 0.7;

  const y3 = item.elevation !== undefined ? item.elevation : cutOutHeight / 2;

  // Helper to find intersection with the inside of the room box
  const getInteriorIntersection = (ray, boxMin, boxMax) => {
    let tmin = -Infinity;
    let tmax = Infinity;
    const invDir = new THREE.Vector3(1 / ray.direction.x, 1 / ray.direction.y, 1 / ray.direction.z);
    
    for (let i = 0; i < 3; i++) {
      const axis = i === 0 ? 'x' : i === 1 ? 'y' : 'z';
      let t1 = (boxMin[axis] - ray.origin[axis]) * invDir[axis];
      let t2 = (boxMax[axis] - ray.origin[axis]) * invDir[axis];
      if (t1 > t2) {
        const temp = t1; t1 = t2; t2 = temp;
      }
      tmin = Math.max(tmin, t1);
      tmax = Math.min(tmax, t2);
    }
    if (tmax >= Math.max(0, tmin)) {
      return ray.origin.clone().add(ray.direction.clone().multiplyScalar(tmax));
    }
    return null;
  };

  return (
    <group 
      position={[x3, y3, z3]} 
      rotation={[0, -rotationY, 0]}
      onClick={(e) => {
        e.stopPropagation();
        dispatch({ type: 'SELECT_FURNITURE', payload: item.id });
      }}
      onPointerDown={(e) => {
        e.stopPropagation();
        setActive(true);
        if (setOrbitEnabled) setOrbitEnabled(false);
        e.target.setPointerCapture(e.pointerId);
        dispatch({ type: 'SELECT_FURNITURE', payload: item.id });
      }}
      onPointerMove={(e) => {
        if (active) {
          e.stopPropagation();
          raycaster.setFromCamera(pointer, camera);
          
          const hw = roomW / 2;
          const hd = roomD / 2;
          const boxMin = new THREE.Vector3(-hw + w3 / 2, cutOutHeight / 2, -hd + h3 / 2);
          const boxMax = new THREE.Vector3(hw - w3 / 2, 3.048 - cutOutHeight / 2, hd - h3 / 2);
          
          const target = getInteriorIntersection(raycaster.ray, boxMin, boxMax);
          
          if (target) {
            const newX = target.x;
            const newY = target.y;
            const newZ = target.z;
            
            // Clamp X/Z/Y to bounds so the center never leaves the shrunk box
            const clampedX = Math.max(boxMin.x, Math.min(boxMax.x, newX));
            let clampedY = Math.max(boxMin.y, Math.min(boxMax.y, newY));
            const clampedZ = Math.max(boxMin.z, Math.min(boxMax.z, newZ));

            // Lock floor items to the floor
            const floorItems = ['doors', 'beds', 'sofa', 'recliners', 'tables', 'dining', 'study', 'chairs', 'wardrobes', 'dressers', 'kitchen'];
            if (floorItems.includes(item.category)) {
              clampedY = boxMin.y;
            }

            dispatch({ 
              type: 'MOVE_FURNITURE', 
              payload: { 
                id: item.id, 
                x: (clampedX + hw) * 100, 
                y: (clampedZ + hd) * 100,
                elevation: clampedY
              } 
            });
          }
        }
      }}
      onPointerUp={(e) => {
        setActive(false);
        if (setOrbitEnabled) setOrbitEnabled(true);
        e.target.releasePointerCapture(e.pointerId);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = active ? 'grabbing' : 'grab';
      }}
      onPointerOut={(e) => {
        if (!active) {
          document.body.style.cursor = 'auto';
        }
      }}
    >
      <group position={[0, -cutOutHeight / 2, 0]}>
        {/* Custom 3D Model */}
        <Select enabled={isSelected}>
          <FurnitureModel category={item.category} w={w3} d={h3} color={item.color || '#d7ccc8'} imageUrl={item.images?.[0]} />
        </Select>
        
        {isSelected && (
          <>
            {/* Control Dots directly on the model */}
            <ControlDot position={[0, modelH / 2, 0]} />
            <ControlDot position={[0, modelH / 2, h3 / 3]} />
            <ControlDot position={[0, modelH / 2, -h3 / 3]} />
            
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
