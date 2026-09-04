export const categories = [
  { id: 'beds', name: 'Beds', image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=400&q=80' },
  { id: 'dining', name: 'Dining', image: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=400&q=80' },
  { id: 'chairs', name: 'Chairs', image: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=400&q=80' },
  { id: 'decor', name: 'Decor', image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=400&q=80' },
  { id: 'tvunits', name: 'TV Units', image: '/images/tvunits/view-1.png' },
  { id: 'study', name: 'Study Table', image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=400&q=80' },
  { id: 'tables', name: 'Office Table', image: '/View-1 (3).png' }
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
      { name: 'Luxury Bronze', hex: '#C5A880' }
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
    name: 'Handwoven Macrame Sun & Rainbow Wall Decor',
    images: ['/1778757701815.jpg.jpeg'],
    category: 'decor',
    price: 1299,
    originalPrice: 1999,
    rating: 4.9,
    reviews: 42,
    description: 'A beautiful handcrafted macrame rainbow wall hanging to add a bohemian and cheerful touch to any room. Made with natural cotton cords and pastel shades.',
    features: [
      '100% Natural Cotton Cords',
      'Handwoven by expert artisans',
      'Bohemian and cheerful pastel shades',
      'Ready to hang instantly'
    ],
    specifications: {
      material: 'Cotton, Wood',
      dimensions: 'W 25cm x H 20cm',
      warranty: 'No Warranty',
      assembly: 'Ready to Hang'
    },
    colors: [
      { name: 'Multicolor Pastel', hex: '#E5D3C8' }
    ]
  },
  {
    id: 'decor-2',
    name: 'Boho Macrame Rainbow Feather Wall Hanging',
    images: ['/InShot_20260613_145926359.jpg.jpeg'],
    category: 'decor',
    price: 1499,
    originalPrice: 2199,
    rating: 4.8,
    reviews: 29,
    description: 'Handcrafted bohemian macrame wall hanging featuring pastel feather accents and intricate knotting techniques.',
    features: [
      '100% Natural Cotton Cords',
      'Handwoven by expert artisans',
      'Feather and leaf accents',
      'Ready to hang instantly'
    ],
    specifications: {
      material: 'Cotton, Wood',
      dimensions: 'W 30cm x H 25cm',
      warranty: 'No Warranty',
      assembly: 'Ready to Hang'
    },
    colors: [
      { name: 'Warm Cream & Sage', hex: '#D8E2DC' }
    ]
  },
  {
    id: 'decor-3',
    name: 'Custom Name Macrame Nursery Wall Decor',
    images: ['/InShot_20260815_195530665.jpg.jpeg'],
    category: 'decor',
    price: 1599,
    originalPrice: 2399,
    rating: 5.0,
    reviews: 38,
    description: 'Personalized handcrafted macrame wall decor ideal for nursery and kids rooms, featuring custom nameplate integration.',
    features: [
      'Customizable Nameplate',
      '100% Eco-friendly Cotton Cords',
      'Delicate pastels and soft textures',
      'Ready to hang instantly'
    ],
    specifications: {
      material: 'Cotton, Birch Wood',
      dimensions: 'W 35cm x H 25cm',
      warranty: 'No Warranty',
      assembly: 'Ready to Hang'
    },
    colors: [
      { name: 'Dusty Pink & Gold', hex: '#F4ACB7' }
    ]
  },
  {
    id: 'decor-4',
    name: 'Pastel Dreams Macrame Rainbow Hanging',
    images: ['/InShot_20260815_195719426.jpg.jpeg'],
    category: 'decor',
    price: 1399,
    originalPrice: 1999,
    rating: 4.7,
    reviews: 19,
    description: 'Soothing pastel macrame arch with pom-pom detailing and soft fringes, perfect for modern cozy interiors.',
    features: [
      'Soft Pom-Pom Accents',
      'Hand-finished Cotton Tapestry',
      'Calming Pastel Tones',
      'Ready to hang instantly'
    ],
    specifications: {
      material: 'Cotton, Wood',
      dimensions: 'W 28cm x H 22cm',
      warranty: 'No Warranty',
      assembly: 'Ready to Hang'
    },
    colors: [
      { name: 'Sky Blue & Mustard', hex: '#A8DADC' }
    ]
  },
  {
    id: 'decor-5',
    name: 'Chic Macrame Leaf & Tassel Wall Art',
    images: ['/InShot_20260815_195735818.jpg (1).jpeg'],
    category: 'decor',
    price: 1699,
    originalPrice: 2499,
    rating: 4.9,
    reviews: 54,
    description: 'Statement macrame tapestry with layered leaf tassels and natural wooden ring focal point.',
    features: [
      'Layered Tassel Design',
      'Natural Wooden Ring Holder',
      'Artisanal Craftsmanship',
      'Ready to hang instantly'
    ],
    specifications: {
      material: 'Cotton, Natural Wood',
      dimensions: 'W 40cm x H 30cm',
      warranty: 'No Warranty',
      assembly: 'Ready to Hang'
    },
    colors: [
      { name: 'Terracotta & Ivory', hex: '#E07A5F' }
    ]
  },
  {
    id: 'decor-6',
    name: 'Artisan Woven Macrame Banner',
    images: ['/InShot_20260904_191033802.jpg.jpeg'],
    category: 'decor',
    price: 1199,
    originalPrice: 1799,
    rating: 4.8,
    reviews: 31,
    description: 'Minimalist macrame wall banner with clean geometric weave and elegant fringed bottom.',
    features: [
      'Minimalist Geometric Weave',
      'Compact & Lightweight',
      'Neutral Scandinavian Style',
      'Ready to hang instantly'
    ],
    specifications: {
      material: 'Cotton, Dowel Wood',
      dimensions: 'W 20cm x H 18cm',
      warranty: 'No Warranty',
      assembly: 'Ready to Hang'
    },
    colors: [
      { name: 'Natural Oatmeal', hex: '#F5EBE0' }
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
      { name: 'Crimson Red', hex: '#c62828', imageIdx: 0, price: 29499, originalPrice: 38999 },
      { name: 'Sage Green', hex: '#689f38', imageIdx: 1, price: 29499, originalPrice: 38999 },
      { name: 'Matte Black', hex: '#212121', imageIdx: 2, price: 27999, originalPrice: 36999 },
      { name: 'Pure White', hex: '#f5f5f5', imageIdx: 3, price: 27999, originalPrice: 36999 }
    ]
  },
  {
    id: 'tvunits-3',
    name: 'Modular Display TV Console',
    images: ['/view-1 (1).png', '/view-2 (1).png', '/view-3 (1).png', '/view-4 (2).png'],
    category: 'tvunits',
    price: 34999,
    originalPrice: 45999,
    rating: 4.8,
    reviews: 42,
    description: 'An elegant modular TV console featuring multiple distinct finish options, spacious shelving, and modern minimalist design.',
    features: [
      'Four elegant finish options to match any decor',
      'Integrated wire grommets for cable management',
      'Soft-closing hydraulic door hinges',
      'Scratch-resistant premium finish'
    ],
    specifications: {
      material: 'Premium MDF, Engineered Wood',
      dimensions: 'W 180cm x D 40cm x H 35cm',
      warranty: '3 Years Warranty',
      assembly: 'Wall Mounting & Installation Included'
    },
    colors: [
      { name: 'White Design', hex: '#f5f5f5', imageIdx: 0, price: 34999, originalPrice: 45999 },
      { name: 'Natural Design', hex: '#d7ccc8', imageIdx: 1, price: 34999, originalPrice: 45999 },
      { name: 'Grey Design', hex: '#616161', imageIdx: 2, price: 34999, originalPrice: 45999 },
      { name: 'Walnut Design', hex: '#5d4037', imageIdx: 3, price: 34999, originalPrice: 45999 }
    ]
  },
  {
    id: 'tvunits-2',
    name: 'Contemporary Color-Choice TV Console',
    images: ['/view-1 (4).png', '/view-2 (3).png', '/view-2 (4).png', '/view-3 (4).png'],
    category: 'tvunits',
    price: 31999,
    originalPrice: 41999,
    rating: 4.9,
    reviews: 56,
    description: 'Elevate your entertainment space with this contemporary TV console. Available in multiple bold colors, it features sleek lines and ample storage space for a modern living room.',
    features: [
      'Bold and vibrant color options',
      'Smooth sliding drawers for storage',
      'Cable management system',
      'Durable and easy-to-clean surface'
    ],
    specifications: {
      material: 'Engineered Wood, Premium Finish',
      dimensions: 'W 170cm x D 40cm x H 45cm',
      warranty: '3 Years Warranty',
      assembly: 'Professional Assembly Provided'
    },
    colors: [
      { name: 'Pure White', hex: '#f5f5f5', imageIdx: 0, price: 31999, originalPrice: 41999 },
      { name: 'Forest Green', hex: '#2e7d32', imageIdx: 1, price: 31999, originalPrice: 41999 },
      { name: 'Ruby Red', hex: '#c62828', imageIdx: 3, price: 31999, originalPrice: 41999 },
      { name: 'Matte Black', hex: '#212121', imageIdx: 2, price: 31999, originalPrice: 41999 }
    ]
  },
  
  // --- TABLES ---
  {
    id: 'tables-1',
    name: 'Modern Frame Table',
    images: ['/View-1 (3).png', '/view-3 (5).png', '/view-4 (1).png', '/view-5.png', '/view-2 (5).png'],
    category: 'tables',
    price: 15999,
    originalPrice: 22999,
    rating: 4.8,
    reviews: 42,
    description: 'A versatile and modern table perfect for any contemporary space. Features a sleek design with ample storage and customizable frame colors to match your interior styling.',
    features: [
      'Minimalist modern design with durable metal frame',
      'Spacious storage compartments with smooth sliders',
      'Scratch-resistant premium tabletop finish',
      'Integrated cable management system'
    ],
    specifications: {
      material: 'Engineered Wood, Carbon Steel Frame',
      dimensions: 'Check summary image for detailed dimensions',
      warranty: '2 Years Warranty',
      assembly: 'Quick Self-Assembly (Manual Included)'
    },
    colors: [
      { name: 'Black Frame', hex: '#212121', imageIdx: 0, price: 15999, originalPrice: 22999 },
      { name: 'Red Frame', hex: '#c62828', imageIdx: 1, price: 15999, originalPrice: 22999 },
      { name: 'White Frame', hex: '#f5f5f5', imageIdx: 2, price: 15999, originalPrice: 22999 },
      { name: 'Green Frame', hex: '#2e7d32', imageIdx: 3, price: 15999, originalPrice: 22999 }
    ]
  },
  {
    id: 'tables-2',
    name: 'Executive Office Desk',
    images: ['/view-1 (5).png', '/view-2 (6).png', '/view-3 (6).png', '/view-4 (4).png'],
    category: 'tables',
    price: 18999,
    originalPrice: 25999,
    rating: 4.9,
    reviews: 58,
    description: 'Elevate your workspace with the Executive Office Desk. Featuring a spacious surface, built-in cable management, and a durable colorful metal frame to suit your office aesthetics.',
    features: [
      'Sturdy colored metal frame with reinforced joints',
      'Wide desktop space for multiple monitors',
      'Anti-scratch, easy-to-clean premium surface',
      'Adjustable foot pads for uneven floors'
    ],
    specifications: {
      material: 'Engineered Wood, High-Strength Metal',
      dimensions: 'W 140cm x D 70cm x H 75cm',
      warranty: '2 Years Warranty',
      assembly: 'Quick Self-Assembly (Manual Included)'
    },
    colors: [
      { name: 'Red Frame', hex: '#c62828', imageIdx: 0, price: 18999, originalPrice: 25999 },
      { name: 'White Frame', hex: '#f5f5f5', imageIdx: 1, price: 18999, originalPrice: 25999 },
      { name: 'Green Frame', hex: '#2e7d32', imageIdx: 2, price: 18999, originalPrice: 25999 },
      { name: 'Black Frame', hex: '#212121', imageIdx: 3, price: 18999, originalPrice: 25999 }
    ]
  },
  {
    id: 'tables-3',
    name: 'Premium Wooden Office Desk',
    images: ['/view-1 (6).png', '/view-2 (7).png', '/view-3 (7).png'],
    category: 'tables',
    price: 19999,
    originalPrice: 28999,
    rating: 4.8,
    reviews: 42,
    description: 'A classic premium wooden office desk featuring sturdy legs, ample workspace, and a beautiful natural wood finish that complements any modern or classic office space.',
    features: [
      'Premium solid wood finish',
      'Sturdy industrial metal legs',
      'Wide desktop space for all your essentials',
      'Anti-scratch, easy-to-clean surface'
    ],
    specifications: {
      material: 'Engineered Wood, High-Strength Metal',
      dimensions: 'W 150cm x D 75cm x H 75cm',
      warranty: '3 Years Warranty',
      assembly: 'Quick Self-Assembly (Manual Included)'
    },
    colors: [
      { name: 'Natural Wood', hex: '#8d6e63', imageIdx: 0, price: 19999, originalPrice: 28999 }
    ]
  }
];

export const getProducts = () => {
  try {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('efive_products_v31');
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
      localStorage.setItem('efive_products_v31', JSON.stringify(combined));
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
      localStorage.setItem('efive_products_v31', JSON.stringify(updatedProducts));
    }
  } catch (e) {
    console.error('Could not save products', e);
  }
};
