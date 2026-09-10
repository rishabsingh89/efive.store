import React, { createContext, useContext, useReducer, useCallback } from 'react';
import {
  BHK_CONFIGS, ROOM_TYPE_DEFAULTS, FURNITURE_DEFAULTS,
  storage, STORAGE_KEY,
} from '../../data/roomDesignerData';

// ── Initial State ────────────────────────────────────────────────────────────
const initialState = {
  selectedBHK: null,        // '1bhk' | '2bhk' | ...
  activeRoomId: null,       // 'living' | 'bedroom1' | ...
  rooms: {},                // { [roomId]: { furniture: [], wallColor, floorType, ceilingColor, ... } }
  selectedFurnitureId: null, // id of currently selected furniture piece
  wizardMode: false,
  wizardStep: 1,
};

// ── Helpers ──────────────────────────────────────────────────────────────────
function buildRoomsForBHK(bhkId) {
  const config = BHK_CONFIGS.find((b) => b.id === bhkId);
  if (!config) return {};
  const rooms = {};
  config.rooms.forEach((room) => {
    const defaults = ROOM_TYPE_DEFAULTS[room.type] || ROOM_TYPE_DEFAULTS.living;
    
    const initialFurniture = [];

    rooms[room.id] = {
      label: room.label,
      type: room.type,
      furniture: initialFurniture,
      wallColor: defaults.wallColor,
      floorType: defaults.floorType,
      ceilingColor: defaults.ceilingColor,
      roomShape: 'rectangle',
    };
  });
  return rooms;
}

let furnitureCounter = Date.now();
function nextFurnitureId() {
  return `furn-${furnitureCounter++}`;
}

// ── Reducer ──────────────────────────────────────────────────────────────────
function reducer(state, action) {
  switch (action.type) {
    case 'SELECT_BHK': {
      const bhkId = action.payload;
      // Try to load saved design
      const saved = storage.load(STORAGE_KEY);
      if (saved && saved.selectedBHK === bhkId) {
        const config = BHK_CONFIGS.find((b) => b.id === bhkId);
        return {
          ...state,
          selectedBHK: bhkId,
          activeRoomId: config?.rooms[0]?.id || null,
          rooms: saved.rooms || buildRoomsForBHK(bhkId),
          selectedFurnitureId: null,
          wizardMode: false, // if loading saved, skip wizard
        };
      }
      const rooms = buildRoomsForBHK(bhkId);
      const config = BHK_CONFIGS.find((b) => b.id === bhkId);
      return {
        ...state,
        selectedBHK: bhkId,
        activeRoomId: config?.rooms[0]?.id || null,
        rooms,
        selectedFurnitureId: null,
        wizardMode: true,
        wizardStep: 1,
      };
    }

    case 'SELECT_ROOM':
      return { ...state, activeRoomId: action.payload, selectedFurnitureId: null, wizardMode: false };

    case 'SET_WIZARD_MODE':
      return { ...state, wizardMode: action.payload };

    case 'SET_WIZARD_STEP':
      return { ...state, wizardStep: action.payload };

    case 'UPDATE_ROOM_DIMENSIONS': {
      const { roomId, width, height } = action.payload;
      const room = state.rooms[roomId];
      if (!room) return state;
      // Clamp furniture positions so they don't float outside when the room shrinks
      const clampedFurniture = room.furniture.map(f => {
         const halfW = f.width / 2;
         const halfH = f.height / 2;
         const clampedX = Math.max(halfW, Math.min(width - halfW, f.x));
         const clampedY = Math.max(halfH, Math.min(height - halfH, f.y));
         return { ...f, x: clampedX, y: clampedY };
      });

      return {
        ...state,
        rooms: {
          ...state.rooms,
          [roomId]: { ...room, width, height, furniture: clampedFurniture },
        },
      };
    }

    case 'ADD_FURNITURE': {
      const { roomId, product, dropX, dropY } = action.payload;
      const room = state.rooms[roomId];
      if (!room) return state;
      const defaults = FURNITURE_DEFAULTS[product.category] || FURNITURE_DEFAULTS.decor;
      const roomDefaults = ROOM_TYPE_DEFAULTS[room.type] || ROOM_TYPE_DEFAULTS.living;
      const roomW = roomDefaults.width;
      const roomH = roomDefaults.height;
      const halfW = defaults.w / 2;
      const halfH = defaults.h / 2;
      
      let dropXVal = dropX !== undefined ? dropX : 100 + Math.random() * 200;
      let dropYVal = dropY !== undefined ? dropY : 100 + Math.random() * 150;
      let clampedX = Math.max(halfW, Math.min(roomW - halfW, dropXVal));
      let clampedY = Math.max(halfH, Math.min(roomH - halfH, dropYVal));
      
      let rotation = 0;

      // If it's a fixture (door/window), snap it to the top wall by default
      if (product.category === 'doors' || product.category === 'windows') {
        clampedY = 0;
        rotation = 0; // flat against top wall
      }

      const newItem = {
        id: nextFurnitureId(),
        productId: product.id,
        name: product.name,
        category: product.category,
        price: product.price,
        images: product.images || [],
        x: clampedX,
        y: clampedY,
        width: defaults.w,
        height: defaults.h,
        rotation: rotation,
        roomId,
        color: product.colors?.[0]?.hex || '#d7ccc8',
        elevation: product.category === 'windows' ? 1.2 : undefined,
      };
      return {
        ...state,
        selectedFurnitureId: newItem.id,
        rooms: {
          ...state.rooms,
          [roomId]: { ...room, furniture: [...room.furniture, newItem] },
        },
      };
    }

    case 'MOVE_FURNITURE': {
      const { id, x, y, elevation } = action.payload;
      const roomId = state.activeRoomId;
      const room = state.rooms[roomId];
      if (!room) return state;
      const fItem = room.furniture.find((f) => f.id === id);
      if (!fItem) return state;
      
      const roomDefaults = ROOM_TYPE_DEFAULTS[room.type] || ROOM_TYPE_DEFAULTS.living;
      const roomW = roomDefaults.width;
      const roomH = roomDefaults.height;
      const halfW = fItem.width / 2;
      const halfH = fItem.height / 2;
      const clampedX = Math.max(halfW, Math.min(roomW - halfW, x));
      const clampedY = Math.max(halfH, Math.min(roomH - halfH, y));

      return {
        ...state,
        rooms: {
          ...state.rooms,
          [roomId]: {
            ...room,
            furniture: room.furniture.map((f) =>
              f.id === id ? { ...f, x: clampedX, y: clampedY, elevation: elevation !== undefined ? elevation : f.elevation } : f
            ),
          },
        },
      };
    }

    case 'ROTATE_FURNITURE': {
      const { id, rotation } = action.payload;
      const roomId = state.activeRoomId;
      const room = state.rooms[roomId];
      if (!room) return state;
      return {
        ...state,
        rooms: {
          ...state.rooms,
          [roomId]: {
            ...room,
            furniture: room.furniture.map((f) =>
              f.id === id ? { ...f, rotation } : f
            ),
          },
        },
      };
    }

    case 'RESIZE_FURNITURE': {
      const { id, width, height } = action.payload;
      const roomId = state.activeRoomId;
      const room = state.rooms[roomId];
      if (!room) return state;
      const fItem = room.furniture.find((f) => f.id === id);
      if (!fItem) return state;
      const defaults = FURNITURE_DEFAULTS[fItem.category] || FURNITURE_DEFAULTS.decor;
      const clampedW = Math.max(defaults.minW, Math.min(defaults.maxW, width));
      const clampedH = Math.max(defaults.minH, Math.min(defaults.maxH, height));
      return {
        ...state,
        rooms: {
          ...state.rooms,
          [roomId]: {
            ...room,
            furniture: room.furniture.map((f) =>
              f.id === id ? { ...f, width: clampedW, height: clampedH } : f
            ),
          },
        },
      };
    }

    case 'DELETE_FURNITURE': {
      const { id } = action.payload;
      const roomId = state.activeRoomId;
      const room = state.rooms[roomId];
      if (!room) return state;
      return {
        ...state,
        selectedFurnitureId: state.selectedFurnitureId === id ? null : state.selectedFurnitureId,
        rooms: {
          ...state.rooms,
          [roomId]: {
            ...room,
            furniture: room.furniture.filter((f) => f.id !== id),
          },
        },
      };
    }

    case 'DUPLICATE_FURNITURE': {
      const { id } = action.payload;
      const roomId = state.activeRoomId;
      const room = state.rooms[roomId];
      if (!room) return state;
      const target = room.furniture.find((f) => f.id === id);
      if (!target) return state;
      
      const roomDefaults = ROOM_TYPE_DEFAULTS[room.type] || ROOM_TYPE_DEFAULTS.living;
      const roomW = roomDefaults.width;
      const roomH = roomDefaults.height;
      const halfW = target.width / 2;
      const halfH = target.height / 2;
      const dupX = Math.max(halfW, Math.min(roomW - halfW, target.x + 40));
      const dupY = Math.max(halfH, Math.min(roomH - halfH, target.y + 40));

      const newId = nextFurnitureId();
      const duplicate = {
        ...target,
        id: newId,
        x: dupX,
        y: dupY,
      };
      
      return {
        ...state,
        selectedFurnitureId: newId,
        rooms: {
          ...state.rooms,
          [roomId]: {
            ...room,
            furniture: [...room.furniture, duplicate],
          },
        },
      };
    }

    case 'UPDATE_FURNITURE_PROPERTIES': {
      const { id, properties } = action.payload;
      const roomId = state.activeRoomId;
      const room = state.rooms[roomId];
      if (!room) return state;
      return {
        ...state,
        rooms: {
          ...state.rooms,
          [roomId]: {
            ...room,
            furniture: room.furniture.map((f) =>
              f.id === id ? { ...f, ...properties } : f
            ),
          },
        },
      };
    }

    case 'SWAP_FURNITURE': {
      const { id, product } = action.payload;
      const roomId = state.activeRoomId;
      const room = state.rooms[roomId];
      if (!room) return state;
      const target = room.furniture.find((f) => f.id === id);
      if (!target) return state;
      
      const defaults = FURNITURE_DEFAULTS[product.category] || FURNITURE_DEFAULTS.decor;
      const roomDefaults = ROOM_TYPE_DEFAULTS[room.type] || ROOM_TYPE_DEFAULTS.living;
      const roomW = roomDefaults.width;
      const roomH = roomDefaults.height;
      const halfW = defaults.w / 2;
      const halfH = defaults.h / 2;
      const swappedX = Math.max(halfW, Math.min(roomW - halfW, target.x));
      const swappedY = Math.max(halfH, Math.min(roomH - halfH, target.y));

      return {
        ...state,
        rooms: {
          ...state.rooms,
          [roomId]: {
            ...room,
            furniture: room.furniture.map((f) =>
              f.id === id
                ? {
                    ...f,
                    productId: product.id,
                    name: product.name,
                    price: product.price,
                    category: product.category,
                    width: defaults.w,
                    height: defaults.h,
                    color: product.colors?.[0]?.hex || f.color,
                    x: swappedX,
                    y: swappedY,
                  }
                : f
            ),
          },
        },
      };
    }

    case 'SELECT_FURNITURE':
      return { ...state, selectedFurnitureId: action.payload };

    case 'UPDATE_ROOM_STYLE': {
      const { roomId, key, value } = action.payload;
      const room = state.rooms[roomId];
      if (!room) return state;
      return {
        ...state,
        rooms: {
          ...state.rooms,
          [roomId]: { ...room, [key]: value },
        },
      };
    }

    case 'RESET_ROOM': {
      const { roomId } = action.payload;
      const room = state.rooms[roomId];
      if (!room) return state;
      const defaults = ROOM_TYPE_DEFAULTS[room.type] || ROOM_TYPE_DEFAULTS.living;
      return {
        ...state,
        selectedFurnitureId: null,
        rooms: {
          ...state.rooms,
          [roomId]: {
            ...room,
            furniture: [],
            wallColor: defaults.wallColor,
            floorType: defaults.floorType,
            ceilingColor: defaults.ceilingColor,
          },
        },
      };
    }

    case 'LOAD_DESIGN': {
      const data = action.payload;
      if (!data) return state;
      return { ...state, ...data, selectedFurnitureId: null };
    }

    case 'BACK_TO_BHK':
      return { ...initialState };

    default:
      return state;
  }
}

// ── Context ──────────────────────────────────────────────────────────────────
const RoomDesignerContext = createContext(null);

function init(initialBhkId) {
  if (initialBhkId) {
    const saved = storage.load(STORAGE_KEY);
    if (saved && saved.selectedBHK === initialBhkId) {
      const config = BHK_CONFIGS.find((b) => b.id === initialBhkId);
      const cleanRooms = { ...saved.rooms };
      Object.keys(cleanRooms).forEach((rId) => {
        if (cleanRooms[rId]?.furniture) {
          cleanRooms[rId].furniture = cleanRooms[rId].furniture.filter(
            (item) => item.category !== 'doors' && item.category !== 'windows'
          );
        }
      });
      return {
        ...initialState,
        selectedBHK: initialBhkId,
        activeRoomId: config?.rooms[0]?.id || null,
        rooms: cleanRooms,
      };
    }
    const config = BHK_CONFIGS.find((b) => b.id === initialBhkId);
    return {
      ...initialState,
      selectedBHK: initialBhkId,
      activeRoomId: config?.rooms[0]?.id || null,
      rooms: buildRoomsForBHK(initialBhkId),
    };
  }
  return initialState;
}

export function RoomDesignerProvider({ children, initialBhkId }) {
  const [state, dispatch] = useReducer(reducer, initialBhkId, init);

  const saveDesign = useCallback(() => {
    storage.save(STORAGE_KEY, {
      selectedBHK: state.selectedBHK,
      rooms: state.rooms,
    });
  }, [state.selectedBHK, state.rooms]);

  return (
    <RoomDesignerContext.Provider value={{ state, dispatch, saveDesign }}>
      {children}
    </RoomDesignerContext.Provider>
  );
}

export function useRoomDesigner() {
  const ctx = useContext(RoomDesignerContext);
  if (!ctx) throw new Error('useRoomDesigner must be inside RoomDesignerProvider');
  return ctx;
}
