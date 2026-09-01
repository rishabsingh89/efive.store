/**
 * roomDesignerData.js
 * ─────────────────────────────────────────────────────────────────────────────
 * All configuration for the interactive Room Designer feature.
 * BHK layouts, room types, furniture defaults, wall/floor palettes.
 * ─────────────────────────────────────────────────────────────────────────────
 */

// ── BHK Definitions ─────────────────────────────────────────────────────────
export const BHK_CONFIGS = [
  {
    id: '1bhk',
    label: '1 BHK',
    description: 'Perfect for singles & couples',
    rooms: [
      { id: 'living', type: 'living', label: 'Living Room' },
      { id: 'bedroom1', type: 'bedroom', label: 'Bedroom' },
      { id: 'kitchen', type: 'kitchen', label: 'Kitchen' },
      { id: 'bathroom1', type: 'bathroom', label: 'Bathroom' },
    ],
  },
  {
    id: '2bhk',
    label: '2 BHK',
    description: 'Ideal for small families',
    rooms: [
      { id: 'living', type: 'living', label: 'Living Room' },
      { id: 'bedroom1', type: 'bedroom', label: 'Bedroom 1' },
      { id: 'bedroom2', type: 'bedroom', label: 'Bedroom 2' },
      { id: 'kitchen', type: 'kitchen', label: 'Kitchen' },
      { id: 'bathroom1', type: 'bathroom', label: 'Bathroom' },
    ],
  },
  {
    id: '3bhk',
    label: '3 BHK',
    description: 'Spacious family living',
    rooms: [
      { id: 'living', type: 'living', label: 'Living Room' },
      { id: 'bedroom1', type: 'bedroom', label: 'Bedroom 1' },
      { id: 'bedroom2', type: 'bedroom', label: 'Bedroom 2' },
      { id: 'bedroom3', type: 'bedroom', label: 'Bedroom 3' },
      { id: 'kitchen', type: 'kitchen', label: 'Kitchen' },
      { id: 'dining', type: 'dining', label: 'Dining Room' },
      { id: 'bathroom1', type: 'bathroom', label: 'Bathroom 1' },
      { id: 'bathroom2', type: 'bathroom', label: 'Bathroom 2' },
    ],
  },
  {
    id: '4bhk',
    label: '4 BHK',
    description: 'Premium family home',
    rooms: [
      { id: 'living', type: 'living', label: 'Living Room' },
      { id: 'bedroom1', type: 'bedroom', label: 'Master Bedroom' },
      { id: 'bedroom2', type: 'bedroom', label: 'Bedroom 2' },
      { id: 'bedroom3', type: 'bedroom', label: 'Bedroom 3' },
      { id: 'bedroom4', type: 'bedroom', label: 'Bedroom 4' },
      { id: 'kitchen', type: 'kitchen', label: 'Kitchen' },
      { id: 'dining', type: 'dining', label: 'Dining Room' },
      { id: 'study', type: 'study', label: 'Study Room' },
      { id: 'bathroom1', type: 'bathroom', label: 'Bathroom 1' },
      { id: 'bathroom2', type: 'bathroom', label: 'Bathroom 2' },
    ],
  },
  {
    id: '5bhk',
    label: '5 BHK',
    description: 'Luxury villa experience',
    rooms: [
      { id: 'living', type: 'living', label: 'Living Room' },
      { id: 'bedroom1', type: 'bedroom', label: 'Master Bedroom' },
      { id: 'bedroom2', type: 'bedroom', label: 'Bedroom 2' },
      { id: 'bedroom3', type: 'bedroom', label: 'Bedroom 3' },
      { id: 'bedroom4', type: 'bedroom', label: 'Bedroom 4' },
      { id: 'bedroom5', type: 'bedroom', label: 'Bedroom 5' },
      { id: 'kitchen', type: 'kitchen', label: 'Kitchen' },
      { id: 'dining', type: 'dining', label: 'Dining Room' },
      { id: 'study', type: 'study', label: 'Study Room' },
      { id: 'lounge', type: 'lounge', label: 'Lounge' },
      { id: 'bathroom1', type: 'bathroom', label: 'Bathroom 1' },
      { id: 'bathroom2', type: 'bathroom', label: 'Bathroom 2' },
      { id: 'bathroom3', type: 'bathroom', label: 'Bathroom 3' },
    ],
  },
];

// ── Room Shapes ─────────────────────────────────────────────────────────────
export const ROOM_SHAPES = [
  { id: 'rectangle', label: 'Rectangle', default: true },
  { id: 'cut', label: 'Cut' },
  { id: 't_shape', label: 'T-Shape' },
  { id: 'u_shape', label: 'U-Shape' },
  { id: 'beveled', label: 'Beveled' },
];

// ── Room Type Defaults ───────────────────────────────────────────────────────
export const ROOM_TYPE_DEFAULTS = {
  living: {
    width: 450, height: 350,
    wallColor: '#D6BCA1', floorType: 'tiles', ceilingColor: '#FFFFFF',
    windows: [{ x: 225, y: 0, w: 120, side: 'top' }],
    doors: [{ x: 0, y: 175, w: 100, side: 'left' }],
  },
  bedroom: {
    width: 487, height: 470,
    wallColor: '#FFFFFF', floorType: 'wooden', ceilingColor: '#FFFFFF',
    windows: [{ x: 200, y: 0, w: 100, side: 'top' }],
    doors: [{ x: 0, y: 100, w: 100, side: 'left' }, { x: 0, y: 250, w: 100, side: 'left' }],
  },
  kitchen: {
    width: 350, height: 250,
    wallColor: '#F8F6F0', floorType: 'tiles', ceilingColor: '#FFFFFF',
    windows: [{ x: 175, y: 0, w: 100, side: 'top' }],
    doors: [{ x: 0, y: 125, w: 100, side: 'left' }],
  },
  bathroom: {
    width: 250, height: 200,
    wallColor: '#E8EDE8', floorType: 'marble', ceilingColor: '#FFFFFF',
    windows: [{ x: 125, y: 0, w: 70, side: 'top' }],
    doors: [{ x: 0, y: 100, w: 80, side: 'left' }],
  },
  dining: {
    width: 400, height: 300,
    wallColor: '#F0EBE0', floorType: 'wooden', ceilingColor: '#FFFFFF',
    windows: [{ x: 200, y: 0, w: 120, side: 'top' }],
    doors: [{ x: 0, y: 150, w: 100, side: 'left' }],
  },
  study: {
    width: 350, height: 300,
    wallColor: '#EAE6DC', floorType: 'wooden', ceilingColor: '#FFFFFF',
    windows: [{ x: 175, y: 0, w: 100, side: 'top' }],
    doors: [{ x: 0, y: 150, w: 90, side: 'left' }],
  },
  lounge: {
    width: 500, height: 350,
    wallColor: '#E8E3D8', floorType: 'carpet', ceilingColor: '#FFFFFF',
    windows: [{ x: 250, y: 0, w: 130, side: 'top' }],
    doors: [{ x: 0, y: 175, w: 100, side: 'left' }],
  },
};

// ── Category-to-Room mapping (which categories show for which room type) ────
export const ROOM_CATEGORY_MAP = {
  living:   ['sofa', 'tables', 'tvunits', 'decor', 'chairs', 'recliners', 'doors', 'windows'],
  bedroom:  ['beds', 'wardrobes', 'dressers', 'tables', 'decor', 'chairs', 'doors', 'windows'],
  kitchen:  ['kitchen', 'tables', 'chairs', 'decor', 'doors', 'windows'],
  bathroom: ['decor', 'doors', 'windows'],
  dining:   ['dining', 'chairs', 'tables', 'decor', 'doors', 'windows'],
  study:    ['study', 'chairs', 'tables', 'decor', 'doors', 'windows'],
  lounge:   ['sofa', 'recliners', 'tables', 'tvunits', 'decor', 'chairs', 'doors', 'windows'],
};

// ── Furniture canvas defaults per product category ──────────────────────────
export const FURNITURE_DEFAULTS = {
  sofa:      { w: 180, h: 70,  minW: 100, maxW: 260, minH: 40, maxH: 100, emoji: '🛋️' },
  beds:      { w: 160, h: 200, minW: 100, maxW: 220, minH: 140, maxH: 260, emoji: '🛏️' },
  dining:    { w: 140, h: 80,  minW: 80,  maxW: 200, minH: 50, maxH: 120, emoji: '🍽️' },
  chairs:    { w: 50,  h: 50,  minW: 30,  maxW: 70,  minH: 30, maxH: 70,  emoji: '🪑' },
  tables:    { w: 100, h: 60,  minW: 60,  maxW: 160, minH: 40, maxH: 100, emoji: '🟫' },
  wardrobes: { w: 140, h: 50,  minW: 80,  maxW: 200, minH: 30, maxH: 70,  emoji: '🗄️' },
  dressers:  { w: 80,  h: 40,  minW: 50,  maxW: 120, minH: 25, maxH: 60,  emoji: '💄' },
  tvunits:   { w: 160, h: 35,  minW: 100, maxW: 220, minH: 20, maxH: 50,  emoji: '📺' },
  recliners: { w: 70,  h: 70,  minW: 50,  maxW: 100, minH: 50, maxH: 100, emoji: '💺' },
  study:     { w: 100, h: 60,  minW: 60,  maxW: 140, minH: 40, maxH: 80,  emoji: '📚' },
  kitchen:   { w: 60,  h: 60,  minW: 30,  maxW: 100, minH: 30, maxH: 100, emoji: '🍳' },
  decor:     { w: 40,  h: 40,  minW: 20,  maxW: 80,  minH: 20, maxH: 80,  emoji: '🖼️' },
  doors:     { w: 100,  h: 20,  minW: 80,  maxW: 150, minH: 10, maxH: 30,  emoji: '🚪' },
  windows:   { w: 100, h: 10,  minW: 50,  maxW: 150, minH: 5,  maxH: 20,  emoji: '🪟' },
};

// ── Wall Color Palette ───────────────────────────────────────────────────────
export const WALL_COLORS = [
  { id: 'ivory',    label: 'Ivory Cream',    hex: '#F5F0E8' },
  { id: 'white',    label: 'Pure White',     hex: '#FFFFFF' },
  { id: 'warm',     label: 'Warm Beige',     hex: '#EDE8DC' },
  { id: 'sage',     label: 'Sage Green',     hex: '#D4DDD4' },
  { id: 'sky',      label: 'Sky Blue',       hex: '#D6E4EE' },
  { id: 'blush',    label: 'Blush Pink',     hex: '#F0E0E0' },
  { id: 'charcoal', label: 'Charcoal',       hex: '#4A4A4A' },
  { id: 'navy',     label: 'Navy Blue',      hex: '#2C3E50' },
  { id: 'terracotta', label: 'Terracotta',   hex: '#C67A5C' },
  { id: 'lavender', label: 'Lavender',       hex: '#E0D8E8' },
];

// ── Floor Types ──────────────────────────────────────────────────────────────
export const FLOOR_TYPES = [
  { id: 'wooden',  label: 'Wooden',     color: '#C4A882', pattern: 'repeating-linear-gradient(90deg, #C4A882 0px, #C4A882 30px, #B89970 30px, #B89970 32px)', textureUrl: '/textures/wood.jpg', textureScale: [3.0, 3.0] },
  { id: 'marble',  label: 'Marble',     color: '#E8E4DE', pattern: 'linear-gradient(135deg, #E8E4DE 25%, #D8D4CE 25%, #D8D4CE 50%, #E8E4DE 50%, #E8E4DE 75%, #D8D4CE 75%)', textureUrl: '/textures/marble.jpg', textureScale: [3.0, 3.0] },
  { id: 'tiles',   label: 'Tiles',      color: '#E0DDD5', pattern: 'repeating-conic-gradient(#E0DDD5 0% 25%, #D5D2CA 0% 50%) 0 0 / 40px 40px', textureUrl: '/textures/tiles.jpg', textureScale: [3.0, 3.0] },
  { id: 'carpet',  label: 'Carpet',     color: '#B8AFA0', pattern: 'none', textureUrl: '/textures/carpet.jpg', textureScale: [3.0, 3.0] },
  { id: 'concrete', label: 'Concrete',  color: '#CFCBC3', pattern: 'none', textureUrl: '/textures/concrete.jpg', textureScale: [3.0, 3.0] },
];

// ── Ceiling Colors ───────────────────────────────────────────────────────────
export const CEILING_COLORS = [
  { id: 'white',     label: 'White',        hex: '#FFFFFF' },
  { id: 'offwhite',  label: 'Off-White',    hex: '#F8F6F0' },
  { id: 'cream',     label: 'Cream',        hex: '#F5F0E0' },
  { id: 'lightgrey', label: 'Light Grey',   hex: '#EAEAEA' },
];

// ── Storage abstraction (localStorage now, API later) ────────────────────────
export const storage = {
  save: (key, data) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.error('Storage save failed:', e);
    }
  },
  load: (key) => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      console.error('Storage load failed:', e);
      return null;
    }
  },
  clear: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error('Storage clear failed:', e);
    }
  },
};

export const STORAGE_KEY = 'efive_room_designs';
