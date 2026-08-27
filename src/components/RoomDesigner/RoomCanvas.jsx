import React, { Suspense, useState, useRef, useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls, Grid, Environment, Html, useTexture, ContactShadows } from '@react-three/drei';
import { Selection, EffectComposer, Outline } from '@react-three/postprocessing';
import { useRoomDesigner } from './RoomDesignerContext';
import { ROOM_TYPE_DEFAULTS, FLOOR_TYPES } from '../../data/roomDesignerData';
import { getProducts } from '../../data/products';
import RoomFurniture from './RoomFurniture';
import RoomShapeSelector from './RoomShapeSelector';
import { 
  ShoppingBag, RotateCw, Copy, Trash2, RefreshCw, 
  Plus, Minus, Paintbrush, Ruler, Eye, Video, X
} from 'lucide-react';

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

const WALL_H = 3.048;
const WALL_T = 0.1;



// Camera Controller inside Canvas
function CameraController({ mode, controlsRef }) {
  const { camera } = useThree();
  
  useEffect(() => {
    if (mode === 'top') {
      camera.position.set(0, 7.5, 0);
      camera.lookAt(0, 0, 0);
      if (controlsRef.current) {
        controlsRef.current.target.set(0, 0, 0);
        controlsRef.current.update();
      }
    } else if (mode === 'side') {
      camera.position.set(0, 1.8, 6.5);
      camera.lookAt(0, 0.4, 0);
      if (controlsRef.current) {
        controlsRef.current.target.set(0, 0.4, 0);
        controlsRef.current.update();
      }
    } else { // dollhouse
      camera.position.set(0, 4, 6);
      camera.lookAt(0, 0.4, 0);
      if (controlsRef.current) {
        controlsRef.current.target.set(0, 0.4, 0);
        controlsRef.current.update();
      }
    }
  }, [mode, camera, controlsRef]);

  return null;
}

// Interactive Wall Drag Handle
function DragHandle3D({ tag, w, d, onResize, setOrbitEnabled }) {
  const [active, setActive] = useState(false);
  const [hover, setHover] = useState(false);
  const meshRef = useRef();
  const { camera, pointer } = useThree();

  let position = [0, 0, 0];
  let rotation = [0, 0, 0];
  
  if (tag === 'top') {
    position = [0, WALL_H / 2, -d/2];
  } else if (tag === 'bottom') {
    position = [0, WALL_H / 2, d/2];
  } else if (tag === 'left') {
    position = [-w/2, WALL_H / 2, 0];
    rotation = [0, Math.PI/2, 0];
  } else if (tag === 'right') {
    position = [w/2, WALL_H / 2, 0];
    rotation = [0, Math.PI/2, 0];
  } else {
    return null;
  }

  const plane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 1, 0), 0), []);
  const raycaster = useMemo(() => new THREE.Raycaster(), []);

  return (
    <mesh
      ref={meshRef}
      position={position}
      rotation={rotation}
      onPointerOver={(e) => { e.stopPropagation(); setHover(true); }}
      onPointerOut={(e) => { e.stopPropagation(); setHover(false); }}
      onPointerDown={(e) => {
        e.stopPropagation();
        setActive(true);
        setOrbitEnabled(false);
        e.target.setPointerCapture(e.pointerId);
      }}
      onPointerMove={(e) => {
        if (active) {
          e.stopPropagation();
          raycaster.setFromCamera(pointer, camera);
          const target = new THREE.Vector3();
          raycaster.ray.intersectPlane(plane, target);
          if (target) {
            let newW = w;
            let newD = d;
            if (tag === 'top') newD = Math.max(1, -target.z * 2);
            if (tag === 'bottom') newD = Math.max(1, target.z * 2);
            if (tag === 'left') newW = Math.max(1, -target.x * 2);
            if (tag === 'right') newW = Math.max(1, target.x * 2);
            onResize(newW, newD);
          }
        }
      }}
      onPointerUp={(e) => {
        setActive(false);
        setOrbitEnabled(true);
        e.target.releasePointerCapture(e.pointerId);
      }}
    >
      <boxGeometry args={[3, WALL_H + 0.5, 0.4]} />
      <meshStandardMaterial color={active ? "#ffeb3b" : hover ? "#ffb300" : "#ff9800"} transparent opacity={0.4} />
      {/* Visual Arrows on the handle */}
      <mesh position={[0, WALL_H/2 + 0.3, 0]}>
         <boxGeometry args={[0.5, 0.1, 0.1]} />
         <meshBasicMaterial color="#ffffff" />
      </mesh>
    </mesh>
  );
}

// Dynamic Wall Component
function DynamicWall({ p1, p2, tag, color, defaults, doorStyle, windowStyle }) {
  const meshRef = useRef();
  
  const dx = p2[0] - p1[0];
  const dz = p2[1] - p1[1];
  const length = Math.sqrt(dx * dx + dz * dz);
  const cx = (p1[0] + p2[0]) / 2;
  const cz = (p1[1] + p2[1]) / 2;
  const angle = Math.atan2(-dz, dx); 

  useFrame(({ camera }) => {
    if (!meshRef.current) return;
    const normal = new THREE.Vector3(0, 0, 1).applyEuler(meshRef.current.rotation);
    const toCamera = camera.position.clone().sub(meshRef.current.position);
    const dot = normal.dot(toCamera);
    meshRef.current.visible = dot > -0.15; 
  });
  return (
    <group ref={meshRef} position={[cx, WALL_H / 2, cz]} rotation={[0, angle, 0]}>
      <mesh receiveShadow>
        <boxGeometry args={[length + WALL_T, WALL_H, WALL_T]} />
        <meshStandardMaterial color={color} roughness={1.0} />
      </mesh>
    </group>
  );
}

function getRoomShapeSegments(shapeId, w, d) {
  const hw = w / 2;
  const hd = d / 2;
  let pts, tags;
  
  switch (shapeId) {
    case 'cut':
      const c = Math.min(w, d) * 0.3;
      pts = [[-hw, -hd], [hw - c, -hd], [hw, -hd + c], [hw, hd], [-hw, hd]];
      tags = ['top', 'top-cut', 'right', 'bottom', 'left'];
      break;
    case 't_shape':
      const stemW = w * 0.5;
      const topBarD = d * 0.45;
      pts = [[-hw, -hd], [hw, -hd], [hw, -hd + topBarD], [stemW / 2, -hd + topBarD], [stemW / 2, hd], [-stemW / 2, hd], [-stemW / 2, -hd + topBarD], [-hw, -hd + topBarD]];
      tags = ['top', 'right-top', 'right-inner', 'right', 'bottom', 'left', 'left-inner', 'left-top'];
      break;
    case 'u_shape':
      const nw = w * 0.4;
      const nd = d * 0.4;
      pts = [[-hw, -hd], [-nw / 2, -hd], [-nw / 2, -hd + nd], [nw / 2, -hd + nd], [nw / 2, -hd], [hw, -hd], [hw, hd], [-hw, hd]];
      tags = ['top', 'notch-left', 'notch-bottom', 'notch-right', 'top-right', 'right', 'bottom', 'left'];
      break;
    case 'beveled':
      const bc = Math.min(w, d) * 0.25;
      pts = [[-hw + bc, -hd], [hw - bc, -hd], [hw, -hd + bc], [hw, hd], [-hw, hd], [-hw, -hd + bc]];
      tags = ['top', 'bevel-right', 'right', 'bottom', 'left', 'bevel-left'];
      break;
    case 'rectangle':
    default:
      pts = [[-hw, -hd], [hw, -hd], [hw, hd], [-hw, hd]];
      tags = ['top', 'right', 'bottom', 'left'];
      break;
  }
  
  const segments = [];
  for (let i = 0; i < pts.length; i++) {
    segments.push({ p1: pts[i], p2: pts[(i + 1) % pts.length], tag: tags[i] });
  }
  return segments;
}

// Ceiling Spotlight & Ambient downlight Component
function Ceiling({ w, d, color, lightsEnabled, shape }) {
  const meshRef = useRef();
  
  useFrame(({ camera }) => {
    if (!meshRef.current) return;
    // Auto-hide when high above ceiling looking down
    let visible = true;
    if (camera.position.y > WALL_H + 0.4) visible = false;
    meshRef.current.visible = visible;
  });

  // Create a 3x3 grid of lights
  const spots = [];
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      spots.push([i * (w / 3.5), j * (d / 3.5)]);
    }
  }

  return (
    <group ref={meshRef}>
      {/* Ceiling Slab (faces down) */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, WALL_H, 0]} receiveShadow>
        {shape ? <shapeGeometry args={[shape]} /> : <planeGeometry args={[w, d]} />}
        <meshStandardMaterial color={color} roughness={0.8} side={THREE.FrontSide} />
      </mesh>

      {/* Spotlight fixtures & point light rays */}
      {lightsEnabled && spots.map(([x, z], idx) => {
        // Alternate between square and circle housings as per drawing
        const isSquare = idx % 2 === 0;
        
        return (
          <group key={`spot-${idx}`} position={[x, WALL_H - 0.03, z]}>
            {/* Downlight housing */}
            <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
              {isSquare ? (
                <boxGeometry args={[0.15, 0.15, 0.02]} />
              ) : (
                <cylinderGeometry args={[0.08, 0.08, 0.02, 16]} />
              )}
              <meshStandardMaterial color="#e0e0e0" roughness={0.3} metalness={0.5} />
            </mesh>
            {/* Light emitter surface */}
            <mesh position={[0, -0.01, 0]} rotation={[Math.PI / 2, 0, 0]}>
              {isSquare ? (
                <planeGeometry args={[0.12, 0.12]} />
              ) : (
                <circleGeometry args={[0.06, 16]} />
              )}
              <meshBasicMaterial color="#ffffff" />
            </mesh>
            {/* Light emission source */}
            <pointLight 
              position={[0, -0.1, 0]} 
              intensity={0.4} 
              distance={3.5} 
              decay={2} 
              color="#fff4e6" 
            />
          </group>
        );
      })}
    </group>
  );
}

const mToFtIn = (m) => {
  const totalInches = Math.round(m * 39.3701);
  return { ft: Math.floor(totalInches / 12), in: totalInches % 12 };
};

const ftInToM = (ft, inc) => {
  const totalInches = (ft * 12) + inc;
  return totalInches / 39.3701;
};

function Floor3D({ shape, floorInfo, roomW, roomD }) {
  const texture = useTexture(floorInfo.textureUrl);
  
  useMemo(() => {
    if (texture) {
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      const repeatX = (roomW || 1) / (floorInfo.textureScale[0] || 1);
      const repeatY = (roomD || 1) / (floorInfo.textureScale[1] || 1);
      texture.repeat.set(repeatX, repeatY);
      texture.needsUpdate = true;
    }
  }, [texture, floorInfo.textureScale, roomW, roomD]);

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.005, 0]} receiveShadow>
      <shapeGeometry args={[shape]} />
      <meshStandardMaterial 
        color={floorInfo.color} 
        roughness={0.7}
        map={texture}
      />
    </mesh>
  );
}

function FloorWrapper({ shape, floorInfo, roomW, roomD }) {
  return (
    <Suspense fallback={
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.005, 0]} receiveShadow>
        <shapeGeometry args={[shape]} />
        <meshStandardMaterial color={floorInfo.color} roughness={0.5} />
      </mesh>
    }>
      {floorInfo.textureUrl ? (
        <Floor3D shape={shape} floorInfo={floorInfo} roomW={roomW} roomD={roomD} />
      ) : (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.005, 0]} receiveShadow>
          <shapeGeometry args={[shape]} />
          <meshStandardMaterial color={floorInfo.color} roughness={0.5} />
        </mesh>
      )}
    </Suspense>
  );
}

function DimInput({ value, onChange, min, max, style }) {
  const [localVal, setLocalVal] = useState(value.toString());
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (!isFocused) {
      setLocalVal(value.toString());
    }
  }, [value, isFocused]);

  const handleChange = (e) => {
    setLocalVal(e.target.value);
    let parsed = parseInt(e.target.value, 10);
    if (!isNaN(parsed)) {
      onChange(parsed);
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    let parsed = parseInt(localVal, 10);
    if (isNaN(parsed)) parsed = 0;
    onChange(parsed);
  };

  return (
    <input
      type="number"
      min={min}
      max={max}
      value={localVal}
      onChange={handleChange}
      onFocus={() => setIsFocused(true)}
      onBlur={handleBlur}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          e.target.blur();
        }
      }}
      style={style}
    />
  );
}

export default function RoomCanvas({ wizardMode, wizardStep }) {
  const { state, dispatch } = useRoomDesigner();
  const [internalViewMode, setInternalViewMode] = useState('dollhouse');
  const controlsRef = useRef();
  const canvasRef = useRef();

  const viewMode = wizardMode 
    ? (wizardStep <= 2 ? 'top' : 'dollhouse') 
    : internalViewMode;

  const [isDimensionEditing, setIsDimensionEditing] = useState(false);
  const [orbitEnabled, setOrbitEnabled] = useState(true);

  const roomId = state.activeRoomId;
  const room = state.rooms[roomId];

  if (!room) return <div style={styles.empty}>Select a room to start designing</div>;

  const roomType = room.type || 'living';
  const defaults = ROOM_TYPE_DEFAULTS[roomType] || ROOM_TYPE_DEFAULTS.living;
  const floorInfo = FLOOR_TYPES.find((f) => f.id === room.floorType) || FLOOR_TYPES[0];

  const ROOM_W = (room.width || defaults.width) / 100;
  const ROOM_D = (room.height || defaults.height) / 100;

  const roomShapeId = room.roomShape || 'rectangle';
  const segments = useMemo(() => getRoomShapeSegments(roomShapeId, ROOM_W, ROOM_D), [roomShapeId, ROOM_W, ROOM_D]);

  const floorShape = useMemo(() => {
    const shape = new THREE.Shape();
    if (segments.length === 0) return shape;
    shape.moveTo(segments[0].p1[0], -segments[0].p1[1]);
    for (let i = 1; i < segments.length; i++) {
      shape.lineTo(segments[i].p1[0], -segments[i].p1[1]);
    }
    shape.lineTo(segments[0].p1[0], -segments[0].p1[1]);
    return shape;
  }, [segments]);

  const handlePointerMissed = () => {
    dispatch({ type: 'SELECT_FURNITURE', payload: null });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('application/json');
    if (!data) return;
    try {
      const product = JSON.parse(data);
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const dropX = Math.max(0, Math.min(defaults.width, (x / rect.width) * defaults.width));
      const dropY = Math.max(0, Math.min(defaults.height, (y / rect.height) * defaults.height));

      dispatch({ 
        type: 'ADD_FURNITURE', 
        payload: { roomId, product, dropX, dropY } 
      });
    } catch(err) {
      console.error('Drop error', err);
    }
  };

  const activeItem = room.furniture.find(f => f.id === state.selectedFurnitureId);
  const products = getProducts();
  const productInfo = activeItem ? products.find(p => p.id === activeItem.productId) : null;
  const productColors = productInfo?.colors || [];

  const handleRotateActive = (e) => {
    e.stopPropagation();
    if (!activeItem) return;
    const next = (activeItem.rotation + 45) % 360;
    dispatch({ type: 'ROTATE_FURNITURE', payload: { id: activeItem.id, rotation: next } });
  };

  const handleDuplicateActive = (e) => {
    e.stopPropagation();
    if (!activeItem) return;
    dispatch({ type: 'DUPLICATE_FURNITURE', payload: { id: activeItem.id } });
  };

  const handleRemoveActive = (e) => {
    e.stopPropagation();
    if (!activeItem) return;
    dispatch({ type: 'DELETE_FURNITURE', payload: { id: activeItem.id } });
  };

  const handleReplaceActive = (e) => {
    e.stopPropagation();
    if (!activeItem) return;
    alert(`Choose a new item from the shop catalog on the left to swap the current ${activeItem.category}!`);
  };

  const handleZoom = (direction) => {
    if (!controlsRef.current) return;
    const camera = controlsRef.current.object;
    const factor = direction === 'in' ? 0.85 : 1.15;
    camera.position.multiplyScalar(factor);
    controlsRef.current.update();
  };

  const handleResize = (newW, newD) => {
    const wCm = Math.round(newW * 100);
    const dCm = Math.round(newD * 100);
    const clampW = Math.max(200, Math.min(2000, wCm));
    const clampH = Math.max(200, Math.min(2000, dCm));
    dispatch({ type: 'UPDATE_ROOM_DIMENSIONS', payload: { roomId, width: clampW, height: clampH } });
  };

  const x3 = activeItem ? (activeItem.x / 100) - (ROOM_W / 2) : 0;
  const z3 = activeItem ? (activeItem.y / 100) - (ROOM_D / 2) : 0;
  const modelH = activeItem ? (MODEL_HEIGHTS[activeItem.category] || 0.7) : 0;
  const toolbarPos = [x3, modelH + 0.3, z3];

  const spotlightsEnabled = room.ceilingLights !== 'none';
  const doorStyle = room.doorStyle || 'white';
  const windowStyle = room.windowStyle || 'sliding';



  return (
    <div style={styles.canvasOuter} onDragOver={handleDragOver} onDrop={handleDrop} ref={canvasRef}>
      <Canvas shadows camera={{ position: [0, 4, 6], fov: 45 }} onPointerMissed={handlePointerMissed}>
        <ambientLight intensity={spotlightsEnabled ? 0.4 : 0.8} />
        <directionalLight position={[10, 15, 10]} intensity={spotlightsEnabled ? 0.6 : 1.2} castShadow shadow-mapSize={[2048, 2048]} shadow-bias={-0.0005} />
        <Environment preset="apartment" />
        <ContactShadows resolution={1024} scale={20} blur={2} opacity={0.4} far={10} color="#000000" />

        <Selection>
          <EffectComposer autoClear={false}>
            <Outline blur visibleEdgeColor="#FFD700" edgeStrength={10} width={1000} />
          </EffectComposer>

          {/* Camera management */}
          <CameraController mode={viewMode} controlsRef={controlsRef} />

          {/* Floor */}
          <FloorWrapper shape={floorShape} floorInfo={floorInfo} roomW={ROOM_W} roomD={ROOM_D} />

          {/* Floor Grid (Removed for seamless background) */}
          {/* Dimension Lines (only show in top view) */}
          {viewMode === 'top' && (
            <group position={[0, 0.02, 0]}>
            {segments.map((seg, i) => {
              const dx = seg.p2[0] - seg.p1[0];
              const dz = seg.p2[1] - seg.p1[1];
              const length = Math.sqrt(dx * dx + dz * dz);
              const cx = (seg.p1[0] + seg.p2[0]) / 2;
              const cz = (seg.p1[1] + seg.p2[1]) / 2;
              const angle = Math.atan2(-dz, dx);
              
              const totalInches = length * 39.3701;
              const feet = Math.floor(totalInches / 12);
              const inches = Math.round(totalInches % 12);
              const dimText = `${feet}' ${inches}"`;

              // Outward normal
              const nx = dz / length;
              const nz = -dx / length;
              const offset = (WALL_T / 2) + 0.15; // slightly outside the wall
              
              const lx = cx + nx * offset;
              const lz = cz + nz * offset;

              return (
                <group key={`dim-${i}`} position={[lx, 0, lz]} rotation={[0, angle, 0]}>
                  <mesh receiveShadow>
                    <boxGeometry args={[length, 0.01, 0.01]} />
                    <meshBasicMaterial color="#555" />
                  </mesh>
                  <mesh position={[-length/2, 0, 0]} receiveShadow>
                    <boxGeometry args={[0.01, 0.01, 0.1]} />
                    <meshBasicMaterial color="#555" />
                  </mesh>
                  <mesh position={[length/2, 0, 0]} receiveShadow>
                    <boxGeometry args={[0.01, 0.01, 0.1]} />
                    <meshBasicMaterial color="#555" />
                  </mesh>
                  <Html center>
                    <div style={{
                      color: '#555',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      backgroundColor: 'rgba(245,242,236,0.85)',
                      padding: '2px 4px',
                      borderRadius: '4px',
                      pointerEvents: 'none',
                      whiteSpace: 'nowrap'
                    }}>
                      {dimText}
                    </div>
                  </Html>
                </group>
              )
            })}
          </group>
          )}

          {/* Dynamic Ceiling with Spotlights */}
          <Ceiling w={ROOM_W} d={ROOM_D} color={room.ceilingColor} lightsEnabled={spotlightsEnabled} shape={floorShape} />

          {/* Dynamic Auto-hiding walls containing doors/windows */}
          <group>
            {segments.map((seg, i) => (
              <DynamicWall 
                key={i}
                p1={seg.p1}
                p2={seg.p2}
                tag={seg.tag}
                color={room.wallColor}
                defaults={defaults}
                doorStyle={doorStyle}
                windowStyle={windowStyle}
              />
            ))}
          </group>

          {/* Drag handles for dimension editing */}
          {isDimensionEditing && segments.map((seg, i) => (
            <DragHandle3D 
              key={`handle-${i}`} 
              tag={seg.tag} 
              w={ROOM_W} 
              d={ROOM_D} 
              onResize={handleResize}
              setOrbitEnabled={setOrbitEnabled}
            />
          ))}

          {/* Furniture objects */}
          <Suspense fallback={null}>
            {room.furniture.map((item) => (
              <RoomFurniture
                key={item.id}
                item={item}
                roomW={ROOM_W}
                roomD={ROOM_D}
                setOrbitEnabled={setOrbitEnabled}
              />
            ))}
          </Suspense>

          {/* 3D Floating Popup controls above selected item */}
          {activeItem && (
            <Html position={toolbarPos} center distanceFactor={4.5}>
              <div style={styles.popupToolbar}>
                {productColors.length > 0 && (
                  <div style={styles.colorRow}>
                    {productColors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => dispatch({
                          type: 'UPDATE_FURNITURE_PROPERTIES',
                          payload: { id: activeItem.id, properties: { color: c.hex } }
                        })}
                        style={{
                          ...styles.colorCircle,
                          backgroundColor: c.hex,
                          outline: activeItem.color === c.hex ? '2px solid #fff' : 'none',
                          boxShadow: activeItem.color === c.hex ? '0 0 4px #000' : 'none',
                        }}
                        title={c.name}
                      />
                      
                    ))}
                  </div>
                )}
                <div style={styles.actionBar}>
                  <button onClick={() => alert(`${activeItem.name} added to cart!`)} style={styles.actionBtn}>
                    <ShoppingBag size={14} />
                    <span style={styles.btnLabel}>Add to Bag</span>
                  </button>
                  <button onClick={handleRotateActive} style={styles.actionBtn}>
                    <RotateCw size={14} />
                    <span style={styles.btnLabel}>Rotate</span>
                  </button>
                  <button onClick={handleReplaceActive} style={styles.actionBtn}>
                    <RefreshCw size={14} />
                    <span style={styles.btnLabel}>Replace</span>
                  </button>
                  <button onClick={handleDuplicateActive} style={styles.actionBtn}>
                    <Copy size={14} />
                    <span style={styles.btnLabel}>Make copy</span>
                  </button>
                  <button onClick={handleRemoveActive} style={{ ...styles.actionBtn, color: '#ff5252' }}>
                    <Trash2 size={14} />
                    <span style={styles.btnLabel}>Remove</span>
                  </button>
                </div>
              </div>
            </Html>
          )}
        </Selection>

        <OrbitControls 
          ref={controlsRef}
          makeDefault 
          enabled={orbitEnabled}
          minPolarAngle={0} 
          maxPolarAngle={Math.PI / 2 - 0.05} 
          maxDistance={12}
          minDistance={1.5}
        />
      </Canvas>

      <RoomShapeSelector />

      {/* Toolbar overlay (only show if not in wizard mode) */}
      {!wizardMode && (
        <div style={styles.toolbar}>
          <button 
            style={{ ...styles.toolBtn, backgroundColor: viewMode === 'dollhouse' ? '#C5A880' : '#fff', color: viewMode === 'dollhouse' ? '#fff' : '#333' }}
            onClick={() => setInternalViewMode('dollhouse')}
            title="3D View"
          >
            <Video size={16} /> 3D View
          </button>
          <button 
            style={{ ...styles.toolBtn, backgroundColor: viewMode === 'top' ? '#C5A880' : '#fff', color: viewMode === 'top' ? '#fff' : '#333' }}
            onClick={() => setInternalViewMode('top')}
            title="Top View"
          >
            <Eye size={16} /> Top View
          </button>
          <div style={styles.divider} />
          <button style={styles.toolBtn} onClick={() => handleZoom('in')} title="Zoom In"><Plus size={16} /></button>
          <button style={styles.toolBtn} onClick={() => handleZoom('out')} title="Zoom Out"><Minus size={16} /></button>
        </div>
      )}

      {/* Bottom Navigation Capsule (only in normal mode) */}
      {!wizardMode && (
        <div style={styles.navCapsule}>
          <button 
            onClick={() => setInternalViewMode('dollhouse')} 
            style={{ ...styles.navBtn, ...(viewMode === 'dollhouse' ? styles.navBtnActive : {}) }}
          >
            <Video size={14} />
            <span>Dollhouse</span>
          </button>
          <button 
            onClick={() => setInternalViewMode('top')} 
            style={{ ...styles.navBtn, ...(viewMode === 'top' ? styles.navBtnActive : {}) }}
          >
            <Eye size={14} />
            <span>Top view</span>
          </button>
          <button 
            onClick={() => setInternalViewMode('side')} 
            style={{ ...styles.navBtn, ...(viewMode === 'side' ? styles.navBtnActive : {}) }}
          >
            <Video size={14} style={{ transform: 'rotate(-90deg)' }} />
            <span>Side views</span>
          </button>
          <div style={styles.navDivider} />
          
          <button 
            onClick={() => {
              const customBtn = document.querySelector('.rd-cust-toggle');
              if (customBtn) customBtn.click();
            }} 
            style={styles.navIconBtn} 
            title="Paint Walls/Floor"
          >
            <Paintbrush size={14} />
          </button>
          
          {/* Dimension Editor Popover */}
          <div style={{ position: 'relative' }}>
            <button 
              onClick={() => setIsDimensionEditing(!isDimensionEditing)} 
              style={{ 
                ...styles.navIconBtn, 
                backgroundColor: isDimensionEditing ? '#111' : '#C5A880',
                color: isDimensionEditing ? '#fff' : '#fff',
                boxShadow: isDimensionEditing ? 'none' : '0 4px 12px rgba(197, 168, 128, 0.4)',
                transform: isDimensionEditing ? 'scale(0.95)' : 'scale(1.05)',
                transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
              }}
              title="Edit Dimensions"
              onMouseEnter={(e) => { if(!isDimensionEditing) e.currentTarget.style.transform = 'scale(1.15)'; }}
              onMouseLeave={(e) => { if(!isDimensionEditing) e.currentTarget.style.transform = 'scale(1.05)'; }}
            >
              <Ruler size={16} />
            </button>
            
            {isDimensionEditing && (
              <div style={styles.dimensionEditor}>
                <div style={styles.dimHeader}>
                  <h4>Room Dimensions</h4>
                  <button onClick={() => setIsDimensionEditing(false)} style={styles.closeBtn}><X size={14} /></button>
                </div>
                <div style={styles.dimBody}>
                  <p style={styles.dimHelp}>Drag the orange handles in 3D to resize, or enter values below.</p>
                  
                  <div style={styles.dimInputContainer}>
                    <div style={styles.dimInputRow}>
                      <label style={styles.dimLabel}>Length</label>
                      <div style={styles.ftInGroup}>
                        <div style={styles.inputWrapper}>
                          <DimInput 
                            min="0"
                            value={mToFtIn(ROOM_W).ft} 
                            onChange={(val) => handleResize(ftInToM(val, mToFtIn(ROOM_W).in), ROOM_D)}
                            style={styles.dimInputSmall}
                          />
                          <span style={styles.unitText}>ft</span>
                        </div>
                        <div style={styles.inputWrapper}>
                          <DimInput 
                            min="0"
                            max="11"
                            value={mToFtIn(ROOM_W).in} 
                            onChange={(val) => handleResize(ftInToM(mToFtIn(ROOM_W).ft, val), ROOM_D)}
                            style={styles.dimInputSmall}
                          />
                          <span style={styles.unitText}>in</span>
                        </div>
                      </div>
                    </div>
                    
                    <div style={styles.dimInputRow}>
                      <label style={styles.dimLabel}>Width</label>
                      <div style={styles.ftInGroup}>
                        <div style={styles.inputWrapper}>
                          <DimInput 
                            min="0"
                            value={mToFtIn(ROOM_D).ft} 
                            onChange={(val) => handleResize(ROOM_W, ftInToM(val, mToFtIn(ROOM_D).in))}
                            style={styles.dimInputSmall}
                          />
                          <span style={styles.unitText}>ft</span>
                        </div>
                        <div style={styles.inputWrapper}>
                          <DimInput 
                            min="0"
                            max="11"
                            value={mToFtIn(ROOM_D).in} 
                            onChange={(val) => handleResize(ROOM_W, ftInToM(mToFtIn(ROOM_D).ft, val))}
                            style={styles.dimInputSmall}
                          />
                          <span style={styles.unitText}>in</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  canvasOuter: {
    flex: 1,
    backgroundColor: '#e0e0e0',
    display: 'flex',
    overflow: 'hidden',
    position: 'relative',
    minHeight: 0,
  },
  empty: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'hsl(40,4%,43%)',
    fontFamily: 'var(--font-body)',
    fontSize: '1rem',
  },
  zoomControls: {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    backgroundColor: '#fff',
    borderRadius: '24px',
    boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
    border: '1px solid rgba(0,0,0,0.05)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    zIndex: 10,
  },
  zoomBtn: {
    background: 'none',
    border: 'none',
    width: '36px',
    height: '36px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: '#444',
    transition: 'background 0.2s',
    outline: 'none',
  },
  zoomDivider: {
    height: '1px',
    backgroundColor: '#eee',
    width: '80%',
    margin: '0 auto',
  },
  navCapsule: {
    position: 'absolute',
    bottom: '1.25rem',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: '#ffffff',
    borderRadius: '28px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
    border: '1px solid rgba(0,0,0,0.06)',
    display: 'flex',
    alignItems: 'center',
    padding: '4px 8px',
    gap: '4px',
    zIndex: 10,
    userSelect: 'none',
  },
  navBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 16px',
    borderRadius: '20px',
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    fontSize: '0.78rem',
    fontWeight: 600,
    color: '#555',
    fontFamily: 'var(--font-body)',
    transition: 'all 0.2s ease',
  },
  navBtnActive: {
    backgroundColor: '#1E1D1B',
    color: '#fff',
  },
  navDivider: {
    width: '1px',
    height: '20px',
    backgroundColor: '#ddd',
    margin: '0 4px',
  },
  navBtnSide: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '6px 12px',
    borderRadius: '16px',
    color: '#333',
    fontFamily: 'var(--font-body)',
  },
  navIconBtn: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    color: '#555',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s',
  },
  dimensionEditor: {
    position: 'absolute',
    bottom: '40px',
    right: '0',
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
    border: '1px solid #eee',
    width: '240px',
    overflow: 'hidden',
    zIndex: 20,
    cursor: 'default',
  },
  dimHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 16px',
    borderBottom: '1px solid #eee',
    backgroundColor: '#fafafa',
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#888',
    display: 'flex',
    alignItems: 'center',
  },
  dimBody: {
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  dimHelp: {
    fontSize: '0.75rem',
    color: '#666',
    margin: 0,
    lineHeight: 1.4,
  },
  dimInputContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    backgroundColor: '#f9f9f9',
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #eee',
  },
  dimInputRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dimLabel: {
    fontSize: '0.85rem',
    fontWeight: 600,
    color: '#333',
    flex: 1,
  },
  ftInGroup: {
    display: 'flex',
    gap: '6px',
  },
  inputWrapper: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: '6px',
    padding: '2px 8px 2px 4px',
    transition: 'border-color 0.2s',
  },
  dimInputSmall: {
    width: '48px',
    border: 'none',
    background: 'transparent',
    fontSize: '0.95rem',
    fontWeight: 600,
    color: '#111',
    textAlign: 'center',
    outline: 'none',
    padding: '6px',
  },
  unitText: {
    fontSize: '0.75rem',
    color: '#888',
    fontWeight: 500,
    marginLeft: '2px',
  },
  popupToolbar: {
    background: 'rgba(30, 29, 27, 0.96)',
    border: '1px solid rgba(255,255,255,0.15)',
    borderRadius: '14px',
    padding: '10px',
    boxShadow: '0 12px 36px rgba(0,0,0,0.3)',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    alignItems: 'center',
    width: '270px',
  },
  colorRow: {
    display: 'flex',
    gap: '8px',
    justifyContent: 'center',
    paddingBottom: '6px',
    borderBottom: '1px solid rgba(255,255,255,0.15)',
    width: '100%',
  },
  colorCircle: {
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    border: '1px solid rgba(255,255,255,0.4)',
    cursor: 'pointer',
    padding: 0,
    transition: 'transform 0.15s ease',
  },
  actionBar: {
    display: 'flex',
    gap: '2px',
    justifyContent: 'space-between',
    width: '100%',
  },
  actionBtn: {
    background: 'none',
    border: 'none',
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
    cursor: 'pointer',
    padding: '4px 6px',
    borderRadius: '6px',
    transition: 'background 0.2s',
    flex: 1,
    outline: 'none',
  },
  btnLabel: {
    fontSize: '8px',
    fontWeight: '700',
    textTransform: 'uppercase',
    opacity: 0.8,
    whiteSpace: 'nowrap',
    fontFamily: 'var(--font-body)',
  }
};
