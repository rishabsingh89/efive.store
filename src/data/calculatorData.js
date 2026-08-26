/**
 * calculatorData.js
 * ─────────────────────────────────────────────────────────────────────────────
 * All pricing rates, multipliers, add-ons, and quality specifications for the
 * Interior Cost Calculator. Update values here to change estimations globally.
 * ─────────────────────────────────────────────────────────────────────────────
 */

// ── Tax & Fee Rates ──────────────────────────────────────────────────────────
export const TAX_RATES = {
  gst: 0.18,              // 18% GST
  designFee: 0.08,        // 8% Design & Consultation Fee
};

// ── Category Definitions ─────────────────────────────────────────────────────
export const CATEGORIES = [
  {
    id: 'apartment',
    label: 'Apartment',
    icon: 'Home',
    description: 'Living spaces designed for modern comfort',
    areaRange: { min: 400, max: 5000, step: 50, default: 1200 },
    areaUnit: 'sq ft',
    image: '/images/apartment.jpg',
  },
  {
    id: 'office',
    label: 'Office',
    icon: 'Building2',
    description: 'Professional workspaces that inspire productivity',
    areaRange: { min: 300, max: 10000, step: 100, default: 2000 },
    areaUnit: 'sq ft',
    image: '/images/office.jpg',
  },
  {
    id: 'cafe',
    label: 'Café / Restaurant',
    icon: 'Coffee',
    description: 'Hospitality spaces with character & charm',
    areaRange: { min: 200, max: 6000, step: 50, default: 1000 },
    areaUnit: 'sq ft',
    image: '/images/cafe.jpg',
  },
];

// ── Quality Levels (per category) ────────────────────────────────────────────
// ratePerSqft = base material + labor cost per square foot
export const QUALITY_LEVELS = {
  apartment: [
    {
      id: 'standard',
      label: 'Standard',
      ratePerSqft: 1200,
      color: '#6B8E6B',
      specs: [
        'Laminate finish cabinetry',
        'Ceramic tile flooring',
        'Standard hardware fittings',
        'Basic lighting fixtures',
      ],
    },
    {
      id: 'premium',
      label: 'Premium',
      ratePerSqft: 1800,
      color: '#C5A880',
      specs: [
        'Veneer & lacquer cabinetry',
        'Vitrified / porcelain flooring',
        'Hettich / Hafele hardware',
        'Designer pendant lighting',
      ],
    },
    {
      id: 'luxury',
      label: 'Luxury',
      ratePerSqft: 2500,
      color: '#8B6F47',
      specs: [
        'Solid wood & Italian marble',
        'Engineered hardwood flooring',
        'Blum / Grass premium hardware',
        'Chandelier & recessed lighting',
      ],
    },
  ],
  office: [
    {
      id: 'standard',
      label: 'Standard',
      ratePerSqft: 1500,
      color: '#6B8E6B',
      specs: [
        'Modular workstation partitions',
        'Vinyl / carpet tile flooring',
        'Standard LED panel lights',
        'Basic cable management',
      ],
    },
    {
      id: 'premium',
      label: 'Premium',
      ratePerSqft: 2200,
      color: '#C5A880',
      specs: [
        'Glass cabin partitions',
        'Engineered wood flooring',
        'Track & accent lighting',
        'Integrated AV systems',
      ],
    },
    {
      id: 'luxury',
      label: 'Luxury',
      ratePerSqft: 3200,
      color: '#8B6F47',
      specs: [
        'Bespoke executive cabins',
        'Italian marble lobby flooring',
        'Smart lighting automation',
        'Premium acoustic panels',
      ],
    },
  ],
  cafe: [
    {
      id: 'standard',
      label: 'Standard',
      ratePerSqft: 1800,
      color: '#6B8E6B',
      specs: [
        'MDF counter & shelving',
        'Ceramic / vinyl flooring',
        'Basic pendant & downlights',
        'Standard kitchen setup',
      ],
    },
    {
      id: 'premium',
      label: 'Premium',
      ratePerSqft: 2600,
      color: '#C5A880',
      specs: [
        'Custom bar & display counter',
        'Wooden plank flooring',
        'Neon signage & mood lighting',
        'Semi-commercial kitchen',
      ],
    },
    {
      id: 'luxury',
      label: 'Luxury',
      ratePerSqft: 3800,
      color: '#8B6F47',
      specs: [
        'Bespoke thematic interiors',
        'Terrazzo / Italian tile floors',
        'Designer statement lighting',
        'Full commercial-grade kitchen',
      ],
    },
  ],
};

// ── Room / Configuration Options (per category) ──────────────────────────────
export const CONFIG_OPTIONS = {
  apartment: {
    label: 'Configuration',
    options: [
      { id: '1bhk', label: '1 BHK', overhead: 50000 },
      { id: '2bhk', label: '2 BHK', overhead: 120000 },
      { id: '3bhk', label: '3 BHK', overhead: 200000 },
      { id: '4bhk', label: '4 BHK', overhead: 320000 },
      { id: '5bhk', label: '5 BHK', overhead: 450000 },
    ],
  },
  office: {
    label: 'Layout',
    options: [
      { id: 'small', label: '5–10 Seats', overhead: 80000 },
      { id: 'medium', label: '10–25 Seats', overhead: 180000 },
      { id: 'large', label: '25–50 Seats', overhead: 350000 },
      { id: 'enterprise', label: '50+ Seats', overhead: 600000 },
    ],
  },
  cafe: {
    label: 'Seating Style',
    options: [
      { id: 'compact', label: 'Compact (15–25)', overhead: 100000 },
      { id: 'mid', label: 'Mid-size (25–50)', overhead: 220000 },
      { id: 'large', label: 'Large (50–80)', overhead: 400000 },
      { id: 'flagship', label: 'Flagship (80+)', overhead: 650000 },
    ],
  },
};

// ── Luxury Add-ons (shared across categories, with per-category pricing) ─────
export const ADDONS = {
  apartment: [
    { id: 'modular_kitchen', label: 'Modular Kitchen', price: 250000, icon: 'ChefHat' },
    { id: 'wardrobe', label: 'Walk-in Wardrobe', price: 180000, icon: 'ShirtIcon' },
    { id: 'false_ceiling', label: 'False Ceiling & Cove Lighting', price: 95000, icon: 'Lamp' },
    { id: 'smart_home', label: 'Smart Home Automation', price: 150000, icon: 'Smartphone' },
    { id: 'premium_paint', label: 'Premium Wall Textures', price: 65000, icon: 'Paintbrush' },
    { id: 'bathroom', label: 'Bathroom Renovation', price: 120000, icon: 'Bath' },
  ],
  office: [
    { id: 'reception', label: 'Reception / Lobby Design', price: 200000, icon: 'DoorOpen' },
    { id: 'conference', label: 'Conference Room Setup', price: 180000, icon: 'Users' },
    { id: 'pantry', label: 'Office Pantry / Cafeteria', price: 150000, icon: 'Coffee' },
    { id: 'server_room', label: 'Server Room Build-out', price: 120000, icon: 'Server' },
    { id: 'acoustic', label: 'Acoustic Treatment', price: 95000, icon: 'Volume2' },
    { id: 'branding', label: 'Wall Branding & Graphics', price: 75000, icon: 'Palette' },
  ],
  cafe: [
    { id: 'bar_counter', label: 'Custom Bar Counter', price: 220000, icon: 'Wine' },
    { id: 'outdoor', label: 'Outdoor Seating Setup', price: 180000, icon: 'TreePine' },
    { id: 'exhaust', label: 'Kitchen Exhaust System', price: 130000, icon: 'Wind' },
    { id: 'signage', label: 'Neon / LED Signage', price: 85000, icon: 'Lightbulb' },
    { id: 'music', label: 'Sound System Install', price: 110000, icon: 'Music' },
    { id: 'washroom', label: 'Premium Washroom Design', price: 100000, icon: 'Bath' },
  ],
};

// ── Room Decoration Options (Apartment only — IKEA inspired) ─────────────────
export const ROOM_DECOR_OPTIONS = [
  {
    id: 'bed',
    label: 'Bed & Bedroom',
    icon: 'BedDouble',
    description: 'King/queen bed, side tables & headboard',
    price: 85000,
    image: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'modular_kitchen',
    label: 'Modular Kitchen',
    icon: 'CookingPot',
    description: 'Cabinets, countertop, chimney & accessories',
    price: 250000,
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'dining',
    label: 'Dining Table Set',
    icon: 'UtensilsCrossed',
    description: '4/6 seater dining table with chairs',
    price: 65000,
    image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'tv_unit',
    label: 'TV Unit & Console',
    icon: 'Tv',
    description: 'Wall-mounted or floor TV unit with storage',
    price: 45000,
    image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'sofa',
    label: 'Sofa & Living Room',
    icon: 'Sofa',
    description: '3-seater sofa, coffee table & accent chairs',
    price: 95000,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'wardrobe',
    label: 'Wardrobe',
    icon: 'DoorOpen',
    description: 'Sliding or hinged wardrobe with organiser',
    price: 120000,
    image: 'https://images.unsplash.com/photo-1558997519-83ea9252edf8?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'paint_work',
    label: 'Paint Work',
    icon: 'Paintbrush',
    description: 'Full interior painting, textures & accent walls',
    price: 75000,
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=400&q=80',
  },
];

// ── Helper: Calculate Estimate ───────────────────────────────────────────────
export function calculateEstimate({
  categoryId,
  area,
  qualityId,
  configId,
  selectedAddonIds = [],
  selectedDecorIds = [],
}) {
  const qualityLevels = QUALITY_LEVELS[categoryId] || [];
  const quality = qualityLevels.find((q) => q.id === qualityId);
  const configOptions = CONFIG_OPTIONS[categoryId]?.options || [];
  const config = configOptions.find((c) => c.id === configId);
  const addons = ADDONS[categoryId] || [];

  if (!quality || !config) {
    return null;
  }

  const materialAndLabor = quality.ratePerSqft * area;
  const configOverhead = config.overhead;
  const addonsTotal = addons
    .filter((a) => selectedAddonIds.includes(a.id))
    .reduce((sum, a) => sum + a.price, 0);

  // Room decoration options (apartment only)
  const decorTotal = categoryId === 'apartment'
    ? ROOM_DECOR_OPTIONS
        .filter((d) => selectedDecorIds.includes(d.id))
        .reduce((sum, d) => sum + d.price, 0)
    : 0;

  const subtotal = materialAndLabor + configOverhead + addonsTotal + decorTotal;
  const designFee = subtotal * TAX_RATES.designFee;
  const gst = (subtotal + designFee) * TAX_RATES.gst;
  const grandTotal = subtotal + designFee + gst;

  return {
    materialAndLabor,
    configOverhead,
    addonsTotal,
    decorTotal,
    subtotal,
    designFee,
    gst,
    grandTotal,
    ratePerSqft: quality.ratePerSqft,
    qualityLabel: quality.label,
    configLabel: config.label,
  };
}
