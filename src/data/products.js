export const categories = [
  { id: 'beds', name: 'Beds', image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=400&q=80' },
  { id: 'dining', name: 'Dining', image: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=400&q=80' },
  { id: 'chairs', name: 'Chairs', image: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=400&q=80' },
  { id: 'decor', name: 'Decor', image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=400&q=80' },
  { id: 'tvunits', name: 'TV Units', image: '/images/tvunits/view-1.png' },
  { id: 'study', name: 'Study Table', image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=400&q=80' }
];

export const products = [
  // --- BEDS ---
  {
    id: 'beds-1',
    name: 'Somnus King Size Hydraulic Storage Bed',
    images: ['/images/beds/Beds/WABY/view-1.jpg', '/images/beds/Beds/WABY/view-2.jpg', '/images/beds/Beds/WABY/view-3.jpg', '/images/beds/Beds/WABY/view-4.jpg'],
    category: 'beds',
    price: 14999,
    originalPrice: 19999,
    rating: 4.9,
    reviews: 142,
    description: 'Maximize space and style with the Somnus Bed. Features an elegant tufted headboard upholstered in premium fabric, and an easy-lift German hydraulic mechanism for abundant under-bed storage.',
    features: [
      'German gas-lift hydraulic storage mechanism',
      'High upholstered wingback headboard for lounging comfort',
      'Extra reinforced metal frame support for heavy mattresses',
      'Anti-dust shield floor lining inside the storage'
    ],
    specifications: {
      material: 'Engineered Wood, Metal Support, Premium Fabric',
      dimensions: 'W 190cm x L 210cm x H 125cm',
      warranty: '5 Years Warranty',
      assembly: 'Professional Assembly Provided'
    },
    colors: [
      { name: 'Luxury Bronze', hex: '#C5A880' },
      { name: 'Champagne Gold', hex: '#E8DCC4' }
    ]
  },
  {
    id: 'beds-2',
    name: 'Mesa Solid Teak Canopy Bed',
    images: ['/images/beds/Beds/WABY/view-5.jpg', '/images/beds/Beds/WABY/view-1.jpg'],
    category: 'beds',
    price: 79999,
    originalPrice: 99999,
    rating: 4.7,
    reviews: 43,
    description: 'Bring a dramatic architectural flair to your bedroom with the Mesa Canopy Bed. Masterfully crafted from 100% sustainably-sourced solid teak wood in a rich walnut finish.',
    features: [
      '100% Solid Teak Wood structure',
      'Sleek canopy frame suitable for drapes or minimalist open look',
      'Traditional joinery craftsmanship for durability',
      'Solid wood slats included (no box spring needed)'
    ],
    specifications: {
      material: 'Solid Teak Wood, Matte Walnut Finish',
      dimensions: 'W 188cm x L 208cm x H 210cm',
      warranty: '10 Years Warranty',
      assembly: 'Professional Assembly Provided'
    },
    colors: [
      { name: 'Dark Walnut', hex: '#3e2723' },
      { name: 'Natural Teak', hex: '#8d6e63' }
    ]
  },

  // --- DINING ---
  {
    id: 'dining-1',
    name: 'Verona 6-Seater Marble Dining Set',
    category: 'dining',
    price: 94999,
    originalPrice: 129999,
    rating: 4.9,
    reviews: 95,
    description: 'Elevate your dinner parties with the Verona Dining Set. Features a stunning composite white marble table top with golden metal inlay, supported by carbon steel legs. Comes with 6 upholstered chairs.',
    features: [
      'Heat, scratch, and stain-resistant faux marble top',
      'Luxurious brushed brass accents and inlay patterns',
      'Ergonomically designed chairs with micro-leather upholstery',
      'Ultra-stable double-arch base design'
    ],
    specifications: {
      material: 'Composite Marble, Stainless Steel, Micro-leather',
      dimensions: 'Table: L 180cm x W 90cm x H 76cm',
      warranty: '5 Years Warranty',
      assembly: 'Professional Assembly Provided'
    },
    colors: [
      { name: 'Calacatta White & Gold', hex: '#eceff1' },
      { name: 'Laurent Gold Black & Gold', hex: '#212121' }
    ]
  },
  {
    id: 'dining-2',
    name: 'Nordic Extendable Dining Table',
    category: 'dining',
    price: 38999,
    originalPrice: 49999,
    rating: 4.8,
    reviews: 62,
    description: 'Versatility meets Scandinavian elegance. This table easily expands from a cozy 4-seater to a generous 8-seater using a smooth, concealed leaf mechanism.',
    features: [
      'Smooth internal butterfly extension leaf',
      'Tapered solid wood legs for classic mid-century look',
      'Scratch-resistant oak veneer tabletop',
      'Perfect for modern, multipurpose spaces'
    ],
    specifications: {
      material: 'Oak Veneer, Solid Oak Wood Frame',
      dimensions: 'Closed: 140cm x 90cm, Opened: 200cm x 90cm',
      warranty: '3 Years Warranty',
      assembly: 'Easy Self Assembly'
    },
    colors: [
      { name: 'Light Oak', hex: '#e0c097' },
      { name: 'Espresso Black', hex: '#1c1c1c' }
    ]
  },

  // --- DECOR ---
  {
    id: 'decor-1',
    name: 'Antara Hand-Knotted Woolen Rug',
    category: 'decor',
    price: 18999,
    originalPrice: 24999,
    rating: 4.8,
    reviews: 79,
    description: 'Add warmth and texture underfoot. The Antara Rug is meticulously hand-knotted by artisans in India using premium New Zealand wool in a modern abstract design.',
    features: [
      '100% Premium New Zealand Wool',
      'Plush, dense pile (12mm thickness) for ultimate comfort',
      'Shed-resistant and highly durable weave',
      'Eco-friendly and natural dyes'
    ],
    specifications: {
      material: 'New Zealand Wool, Cotton Backing',
      dimensions: 'W 150cm x L 240cm (5ft x 8ft)',
      warranty: '1 Year Warranty',
      assembly: 'No Assembly Required'
    },
    colors: [
      { name: 'Ivory & Grey Abstract', hex: '#eceff1' },
      { name: 'Terracotta Rust Abstract', hex: '#bf360c' }
    ]
  },
  {
    id: 'decor-2',
    name: 'Aurelius Ribbed Ceramic Vase Set (3-Piece)',
    category: 'decor',
    price: 4999,
    originalPrice: 6999,
    rating: 4.5,
    reviews: 110,
    description: 'A curated set of three hand-finished ribbed ceramic vases in graduating sizes. Their matte textured finish brings an organic, modern feel to shelves, consoles, or mantels.',
    features: [
      'High-fired stoneware ceramic',
      'Ribbed modern textures and earth-toned matte glazes',
      'Waterproof interiors for fresh floral arrangements',
      'Packaged in a secure gift box'
    ],
    specifications: {
      material: 'Glazed Stoneware Ceramic',
      dimensions: 'Small: 15cm H, Medium: 22cm H, Large: 30cm H',
      warranty: 'Damaged Transit Replacement',
      assembly: 'No Assembly Required'
    },
    colors: [
      { name: 'Earthy Matte Tones', hex: '#d7ccc8' }
    ]
  },
  {
    id: 'decor-3',
    name: 'Helios Brass Sunburst Wall Mirror',
    category: 'decor',
    price: 8999,
    originalPrice: 11999,
    rating: 4.7,
    reviews: 64,
    description: 'Make a statement on your wall with the Helios Mirror. Hand-welded metal spikes finished in antique gold finish radiate from a high-clarity central bevelled mirror.',
    features: [
      'High-definition reflection with bevelled edge',
      'Intricate, hand-welded iron sunburst frame',
      'Antique gold powder coat finish resists rust',
      'Pre-installed heavy duty mounting brackets'
    ],
    specifications: {
      material: 'Iron, High-Definition Mirror Glass',
      dimensions: 'Outer Diameter: 90cm, Mirror: 35cm',
      warranty: '2 Years Warranty',
      assembly: 'Wall Hanging (Hardware Included)'
    },
    colors: [
      { name: 'Brushed Antique Gold', hex: '#dfb15b' },
      { name: 'Sleek Obsidian Black', hex: '#212121' }
    ]
  },

  // --- STUDY TABLE ---
  {
    id: 'study-1',
    name: 'Athena Ergonomic Electric Standing Desk',
    category: 'study',
    price: 28999,
    originalPrice: 37999,
    rating: 4.9,
    reviews: 145,
    description: 'Promote wellness and productivity. The Athena Standing Desk features dual electric motors, a digital memory control panel with 4 presets, and a premium solid wood desktop.',
    features: [
      'Dual motors with silent operations (<45dB)',
      'Digital LED control panel with 4 height-memory presets',
      'Anti-collision safety sensor stops desk if obstructed',
      'Solid oak veneer table top with integrated cable management grommets'
    ],
    specifications: {
      material: 'Solid Oak Veneer Top, Heavy Duty Steel Frame',
      dimensions: 'W 140cm x D 70cm x H 65cm to 125cm',
      warranty: '5 Years Frame & Motor Warranty',
      assembly: 'Self Assembly (All tools & guide included)'
    },
    colors: [
      { name: 'Oak Top & White Frame', hex: '#ebd8c2' },
      { name: 'Walnut Top & Black Frame', hex: '#4e342e' }
    ]
  },
  {
    id: 'study-2',
    name: 'Kensington Solid Sheesham Study Desk',
    category: 'study',
    price: 19999,
    originalPrice: 25999,
    rating: 4.8,
    reviews: 73,
    description: 'A classic, timeless design. The Kensington desk is handmade from solid Sheesham wood (Indian Rosewood) showing rich grain patterns, equipped with 3 spacious utility drawers.',
    features: [
      '100% Solid Indian Sheesham Wood (Rosewood)',
      '3 utility drawers with traditional dovetail joinery',
      'Beautiful natural wood polish highlights rich grain patterns',
      'Solid stout legs for maximum stability'
    ],
    specifications: {
      material: 'Solid Sheesham Wood, Honey Finish',
      dimensions: 'W 120cm x D 60cm x H 76cm',
      warranty: '3 Years Warranty',
      assembly: 'Only Leg Attachment Required'
    },
    colors: [
      { name: 'Honey Sheesham', hex: '#c48b4f' },
      { name: 'Teak Sheesham', hex: '#8a5c37' }
    ]
  },
  
  // --- CHAIRS ---
  {
    id: 'chairs-1',
    name: 'Bespoke Mid-Century Accent Chair',
    category: 'chairs',
    price: 12999,
    originalPrice: 17999,
    rating: 4.8,
    reviews: 65,
    description: 'Add a touch of elegance to any room with this stunning accent chair. Featuring premium boucle fabric upholstery, high density foam, and sleek matte black metal legs.',
    features: [
      'Ergonomically curved backrest support',
      'Ultra-soft high quality boucle weave fabric',
      'Anti-scratch floor protectors on legs',
      'Sturdy carbon steel leg structure'
    ],
    specifications: {
      material: 'Boucle Fabric, Carbon Steel Legs',
      dimensions: 'W 65cm x D 70cm x H 80cm',
      warranty: '2 Years Warranty',
      assembly: 'No Assembly Required'
    },
    colors: [
      { name: 'Ivory Boucle', hex: '#f3e5f5' },
      { name: 'Sage Boucle', hex: '#e8f5e9' }
    ]
  },

  // --- TV UNITS ---
  {
    id: 'tvunits-1',
    name: 'Milan Floating Walnut TV Console',
    images: ['/images/tvunits/view-1.png', '/images/tvunits/view-2.png', '/images/tvunits/view-3.png', '/images/tvunits/view-4.png'],
    category: 'tvunits',
    price: 29499,
    originalPrice: 38999,
    rating: 4.7,
    reviews: 78,
    description: 'Clean up your living room floor space with the Milan Floating TV Console. Crafted with beautiful walnut veneer, soft-closing doors, and cable entry slots.',
    features: [
      'Space-saving wall-mounted floating configuration',
      'Integrated wire grommets for cable management',
      'Soft-closing hydraulic door hinges',
      'Matte scratch-resistant walnut veneer'
    ],
    specifications: {
      material: 'Premium MDF, Walnut Veneer',
      dimensions: 'W 160cm x D 35cm x H 30cm',
      warranty: '3 Years Warranty',
      assembly: 'Wall Mounting & Installation Included'
    },
    colors: [
      { name: 'Natural Walnut', hex: '#5d4037' },
      { name: 'Ebony Ash', hex: '#212121' }
    ]
  },
  {
    id: 'tvunits-2',
    name: 'Oslo Minimalist Media Unit',
    images: ['/images/tvunits/view-2.png', '/images/tvunits/view-3.png', '/images/tvunits/view-4.png', '/images/tvunits/view-1.png'],
    category: 'tvunits',
    price: 29499,
    originalPrice: 38999,
    rating: 4.8,
    reviews: 42,
    description: 'A sleek and modern media console that perfectly balances open shelving with closed storage. Designed for modern entertainment systems.',
    features: [
      'Sturdy industrial metal framing',
      'Cable management system',
      'Adjustable shelving',
      'Scratch-resistant finish'
    ],
    specifications: {
      material: 'Engineered Wood, Powder Coated Steel',
      dimensions: 'W 180cm x D 40cm x H 45cm',
      warranty: '3 Years Warranty',
      assembly: 'Professional Assembly Provided'
    },
    colors: [
      { name: 'Matte Black', hex: '#212121' }
    ]
  },
  {
    id: 'tvunits-3',
    name: 'Stockholm Entertainment Center',
    images: ['/images/tvunits/view-3.png', '/images/tvunits/view-4.png', '/images/tvunits/view-1.png', '/images/tvunits/view-2.png'],
    category: 'tvunits',
    price: 27999,
    originalPrice: 36999,
    rating: 4.9,
    reviews: 115,
    description: 'Transform your living space with this comprehensive entertainment center. Features extensive storage options and a bold, architectural design.',
    features: [
      'Full-wall modular configuration',
      'Integrated LED backlighting support',
      'Push-to-open cabinet doors',
      'Heavy-duty load bearing capacity'
    ],
    specifications: {
      material: 'Solid Wood Veneer, Metal Frame',
      dimensions: 'W 240cm x D 45cm x H 200cm',
      warranty: '5 Years Warranty',
      assembly: 'Professional Installation Included'
    },
    colors: [
      { name: 'Crimson Iron', hex: '#c62828' }
    ]
  },
  {
    id: 'tvunits-4',
    name: 'Copenhagen Low Profile Console',
    images: ['/images/tvunits/view-4.png', '/images/tvunits/view-1.png', '/images/tvunits/view-2.png', '/images/tvunits/view-3.png'],
    category: 'tvunits',
    price: 27999,
    originalPrice: 36999,
    rating: 4.6,
    reviews: 38,
    description: 'Keep your sightlines clean with this ultra-low profile TV console. Perfect for modern, minimalist interiors and large screen setups.',
    features: [
      'Ultra-low profile design',
      'Seamless drawer fronts',
      'Vibration dampening feet',
      'Matte easy-clean surface'
    ],
    specifications: {
      material: 'High-Density MDF, Steel Base',
      dimensions: 'W 150cm x D 40cm x H 35cm',
      warranty: '2 Years Warranty',
      assembly: 'Minimal Assembly Required'
    },
    colors: [
      { name: 'Warm Oak', hex: '#8d6e63' }
    ]
  }
];

export const getProducts = () => {
  try {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('efive_products_v7');
      if (stored) {
        return JSON.parse(stored);
      }
      
      // Migration/initialization: combine original products with any old admin products
      let oldLocalProducts = [];
      const oldStored = localStorage.getItem('efive_admin_products');
      if (oldStored) {
        oldLocalProducts = JSON.parse(oldStored);
      }
      
      const combined = [...products, ...oldLocalProducts];
      localStorage.setItem('efive_products_v7', JSON.stringify(combined));
      return combined;
    }
  } catch (e) {
    console.error('Could not load products', e);
  }
  return products;
};

export const saveProducts = (updatedProducts) => {
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem('efive_products_v7', JSON.stringify(updatedProducts));
    }
  } catch (e) {
    console.error('Could not save products', e);
  }
};
