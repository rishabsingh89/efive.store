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
      { id: 'bedroom1', type: 'bedroom', label: 'Bedroom' },
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
  living:   ['sofa', 'tvunits', 'decor', 'recliners', 'doors', 'windows'],
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
  { id: 'white',      label: 'Pure White',      hex: '#FFFFFF' },
  { id: 'beige',      label: 'Light Beige',     hex: '#E6E0D5' },
  { id: 'blush',      label: 'Soft Blush',      hex: '#E8D5C8' },
  { id: 'terracotta', label: 'Terracotta',      hex: '#B95924' },
  { id: 'brown',      label: 'Dark Brown',      hex: '#854D3F' },
  { id: 'powder_blue',label: 'Powder Blue',     hex: '#B9CBD1' },
  { id: 'slate',      label: 'Slate Blue',      hex: '#5C808E' },
  { id: 'sage',       label: 'Sage Green',      hex: '#94A285' },
  { id: 'grey',       label: 'Neutral Grey',    hex: '#828685' },
  { id: 'taupe',      label: 'Taupe',           hex: '#927B75' },
  { id: 'plum',       label: 'Plum',            hex: '#684C5E' },
  { id: 'dark_green', label: 'Dark Green',      hex: '#45675A' },
];

// ── Floor Types ──────────────────────────────────────────────────────────────
export const FLOOR_TYPES = [
  // Row 1 (Woods)
  { id: 'wooden',       label: 'Natural oak',     color: '#C2A178', pattern: 'repeating-linear-gradient(90deg, #C2A178 0px, #C2A178 30px, #B6956C 30px, #B6956C 32px)' },
  { id: 'warm_oak',     label: 'Warm oak',        color: '#A3784A', pattern: 'repeating-linear-gradient(90deg, #A3784A 0px, #A3784A 30px, #956B3D 30px, #956B3D 32px)' },
  { id: 'dark_ash',     label: 'Ash grey',        color: '#54595B', pattern: 'repeating-linear-gradient(90deg, #54595B 0px, #54595B 30px, #484C4E 30px, #484C4E 32px)' },
  { id: 'walnut',       label: 'Walnut',          color: '#654536', pattern: 'repeating-linear-gradient(90deg, #654536 0px, #654536 30px, #573A2C 30px, #573A2C 32px)' },
  { id: 'cherry',       label: 'Cherry wood',     color: '#A84D2B', pattern: 'repeating-linear-gradient(90deg, #A84D2B 0px, #A84D2B 30px, #974222 30px, #974222 32px)' },
  { id: 'black_wood',   label: 'Black wood',      color: '#2C2B2A', pattern: 'repeating-linear-gradient(90deg, #2C2B2A 0px, #2C2B2A 30px, #201F1E 30px, #201F1E 32px)' },

  // Row 2 (Woods & Stones)
  { id: 'honey_oak',    label: 'Honey oak',       color: '#C69B56', pattern: 'repeating-linear-gradient(90deg, #C69B56 0px, #C69B56 30px, #B88E49 30px, #B88E49 32px)' },
  { id: 'golden_teak',  label: 'Golden teak',     color: '#B8863A', pattern: 'repeating-linear-gradient(90deg, #B8863A 0px, #B8863A 30px, #A9792E 30px, #A9792E 32px)' },
  { id: 'light_ash',    label: 'Light ash',       color: '#BEBDB8', pattern: 'repeating-linear-gradient(90deg, #BEBDB8 0px, #BEBDB8 30px, #B0AFAA 30px, #B0AFAA 32px)' },
  { id: 'greige_oak',   label: 'Greige oak',      color: '#99948D', pattern: 'repeating-linear-gradient(90deg, #99948D 0px, #99948D 30px, #8C8780 30px, #8C8780 32px)' },
  { id: 'dark_slate',   label: 'Dark slate',      color: '#484D50', pattern: 'none' },
  { id: 'smoked_oak',   label: 'Smoked oak',      color: '#52453B', pattern: 'repeating-linear-gradient(90deg, #52453B 0px, #52453B 30px, #453930 30px, #453930 32px)' },

  // Row 3 (Tiles, Marble, Special)
  { id: 'white_wash',   label: 'White wash',      color: '#E6E3DB', pattern: 'repeating-linear-gradient(90deg, #E6E3DB 0px, #E6E3DB 30px, #D9D6CE 30px, #D9D6CE 32px)' },
  { id: 'marble',       label: 'Cream marble',    color: '#FAF6EF', pattern: 'linear-gradient(135deg, #FAF6EF 25%, #F0ECD4 25%, #F0ECD4 50%, #FAF6EF 50%, #FAF6EF 75%, #F0ECD4 75%)' },
  { id: 'tiles',        label: 'White tile',      color: '#FFFFFF', pattern: 'repeating-conic-gradient(#FFFFFF 0% 25%, #F5F5F5 0% 50%) 0 0 / 40px 40px' },
  { id: 'carpet',       label: 'Carpet',          color: '#B8AFA0', pattern: 'none' },
  { id: 'slate_tile',   label: 'Slate tile',      color: '#606569', pattern: 'repeating-conic-gradient(#606569 0% 25%, #505559 0% 50%) 0 0 / 40px 40px' },
  { id: 'concrete',     label: 'Grey concrete',   color: '#A9AAAA', pattern: 'none' },
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
