export const categories = [
  { id: 'sofa', name: 'Sofa', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=400&q=80' },
  { id: 'beds', name: 'Beds', image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=400&q=80' },
  { id: 'dining', name: 'Dining', image: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=400&q=80' },
  { id: 'chairs', name: 'Chairs', image: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=400&q=80' },
  { id: 'decor', name: 'Decor', image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=400&q=80' },
  { id: 'kitchen', name: 'Kitchen & Appliances', image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=400&q=80' },
  { id: 'wardrobes', name: 'Wardrobes', image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=400&q=80' },
  { id: 'dressers', name: 'Dressers', image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=400&q=80' },
  { id: 'tvunits', name: 'TV Units', image: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=400&q=80' },
  { id: 'recliners', name: 'Recliners', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=400&q=80' },
  { id: 'study', name: 'Study Table', image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=400&q=80' },
  { id: 'tables', name: 'Tables', image: 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&w=400&q=80' },
  { id: 'doors', name: 'Doors', image: '/Door-1.webp' },
  { id: 'windows', name: 'Windows', image: '/window-1.webp' }
];

export const products = [
  // --- SOFA ---
  {
    id: 'sofa-1',
    name: 'Aurelia 3-Seater Velvet Sofa',
    category: 'sofa',
    price: 45999,
    originalPrice: 59999,
    rating: 4.8,
    reviews: 124,
    description: 'Immerse yourself in pure luxury with the Aurelia Velvet Sofa. Upholstered in premium, high-density velvet with elegant deep button tufting and solid wood legs with gold metal caps.',
    features: [
      'Sturdy solid birchwood inner frame',
      'High-resilience foam padding for lasting shape',
      'Stain-resistant luxury velvet upholstery',
      'Gold-tipped tapered wooden legs'
    ],
    specifications: {
      material: 'Velvet, Solid Wood, High-Density Foam',
      dimensions: 'W 210cm x D 90cm x H 85cm',
      warranty: '3 Years Warranty',
      assembly: 'Professional Assembly Provided'
    },
    colors: [
      { name: 'Emerald Green', hex: '#0f5257' },
      { name: 'Royal Blue', hex: '#1d3557' },
      { name: 'Charcoal Grey', hex: '#2b2d42' }
    ]
  },
  {
    id: 'sofa-2',
    name: 'Bespoke Chesterfield L-Shape Sectional',
    category: 'sofa',
    price: 89999,
    originalPrice: 119999,
    rating: 4.9,
    reviews: 86,
    description: 'A classic design reimagined for modern spaces. The Bespoke Chesterfield features premium top-grain leatherette, rolled arms, and deep-tufted backrest to create a stunning focal point in your living room.',
    features: [
      'Generous seating capacity for up to 6 people',
      'Durable zig-zag spring suspension system',
      'Premium leatherette upholstery that is easy to clean',
      'Classic English Chesterfield tufted details'
    ],
    specifications: {
      material: 'Premium Leatherette, Meranti Wood Frame',
      dimensions: 'W 280cm x L 180cm x H 78cm',
      warranty: '5 Years Warranty',
      assembly: 'Professional Assembly Provided'
    },
    colors: [
      { name: 'Tan Brown', hex: '#a0522d' },
      { name: 'Chocolate Brown', hex: '#4a2c2a' },
      { name: 'Classic Black', hex: '#121212' }
    ]
  },
  {
    id: 'sofa-3',
    name: 'Hygge Fabric Loveseat',
    category: 'sofa',
    price: 24999,
    originalPrice: 32999,
    rating: 4.6,
    reviews: 57,
    description: 'Perfect for cozy corners or compact living spaces, the Hygge Loveseat blends Scandinavian minimalism with premium fabric comfort.',
    features: [
      'Removable and washable cushion covers',
      'Soft weave linen-blend fabric',
      'Light natural oak wood frame and legs',
      'Comfortable dual-cushion design'
    ],
    specifications: {
      material: 'Linen Blend, Natural Oak Wood',
      dimensions: 'W 150cm x D 85cm x H 82cm',
      warranty: '2 Years Warranty',
      assembly: 'Easy Self Assembly (Manual Included)'
    },
    colors: [
      { name: 'Oatmeal Beige', hex: '#d7ccc8' },
      { name: 'Mist Grey', hex: '#cfd8dc' },
      { name: 'Blush Pink', hex: '#f8bbd0' }
    ]
  },

  // --- BEDS ---
  {
    id: 'beds-1',
    name: 'Somnus King Size Hydraulic Storage Bed',
    category: 'beds',
    price: 64999,
    originalPrice: 84999,
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
      { name: 'Charcoal Tweed', hex: '#455a64' },
      { name: 'Ivory Bouclé', hex: '#f5f5f4' },
      { name: 'Sage Green Velvet', hex: '#6b7a67' }
    ]
  },
  {
    id: 'beds-2',
    name: 'Mesa Solid Teak Canopy Bed',
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

  // --- KITCHEN & APPLIANCES ---
  {
    id: 'kitchen-1',
    name: 'Osteria Cast Iron Cookware Set',
    category: 'kitchen',
    price: 12999,
    originalPrice: 16999,
    rating: 4.9,
    reviews: 215,
    description: 'Experience professional-grade heat distribution. The Osteria set features a 5-quart Dutch Oven, a 10-inch Skillet, and a Grill Pan, all pre-seasoned with organic vegetable oil.',
    features: [
      'Superior heat retention and even cooking surface',
      'Pre-seasoned and ready to use out of the box',
      'Induction, oven, gas, and campfire safe',
      'Sturdy loop handles for easy grip'
    ],
    specifications: {
      material: '100% Cast Iron, Pre-seasoned',
      dimensions: 'Skillet: 10 in, Dutch Oven: 5 Qt',
      warranty: 'Lifetime Warranty',
      assembly: 'No Assembly Required'
    },
    colors: [
      { name: 'Classic Black', hex: '#212121' }
    ]
  },
  {
    id: 'kitchen-2',
    name: 'Barista Pro Grind & Brew Coffee Station',
    category: 'kitchen',
    price: 29999,
    originalPrice: 39999,
    rating: 4.8,
    reviews: 93,
    description: 'Transform your mornings with Efive Studio\'s signature espresso machine. Features a built-in conical burr grinder, precise PID digital temperature control, and a commercial-grade steam wand.',
    features: [
      'Built-in grinder with 30 grind size settings',
      '15-bar Italian pressure pump for rich crema',
      'Powerful steam wand for silky microfoam latte art',
      'Thermo-jet heating system (heats up in 3 seconds)'
    ],
    specifications: {
      material: 'Stainless Steel, Food-grade ABS',
      dimensions: 'W 32cm x D 30cm x H 40cm',
      warranty: '2 Years Warranty',
      assembly: 'No Assembly Required (Plug & Play)'
    },
    colors: [
      { name: 'Brushed Steel', hex: '#b0bec5' },
      { name: 'Matte Obsidian Black', hex: '#1a1a1a' }
    ]
  },

  // --- WARDROBES ---
  {
    id: 'wardrobes-1',
    name: 'Vogue 3-Door Sliding Mirror Wardrobe',
    category: 'wardrobes',
    price: 54999,
    originalPrice: 69999,
    rating: 4.7,
    reviews: 81,
    description: 'Optimize your dressing area with the Vogue Sliding Wardrobe. Features premium German sliding tracks, ample interior storage configurations, and integrated full-length high-clarity mirror panels.',
    features: [
      'Space-saving sliding doors with smooth-gliding tracks',
      'Built-in full-length mirrors on double doors',
      'Configurable shelf systems and 2 clothing hanging rods',
      'Soft-closing mechanism prevents slamming'
    ],
    specifications: {
      material: 'High-Grade Engineered Wood, Mirror Glass',
      dimensions: 'W 200cm x D 62cm x H 220cm',
      warranty: '5 Years Warranty',
      assembly: 'Professional Assembly Provided'
    },
    colors: [
      { name: 'Crisp White & Mirror', hex: '#fafafa' },
      { name: 'Smoked Oak & Mirror', hex: '#4e342e' },
      { name: 'Graphite Grey & Mirror', hex: '#37474f' }
    ]
  },
  {
    id: 'wardrobes-2',
    name: 'Hampton Classic 4-Door Hinged Armoire',
    category: 'wardrobes',
    price: 49999,
    originalPrice: 62999,
    rating: 4.8,
    reviews: 53,
    description: 'Perfect for transitional and traditional homes. The Hampton features elegant shaker-style panel doors, solid brass handles, and rich internal drawers for jewelry and accessories.',
    features: [
      'Classic 4-Door hinged design with shaker panels',
      'High-quality solid brass hardware pulls',
      '4 internal soft-close drawers and 6 storage compartments',
      'Ventilation vents on the back board'
    ],
    specifications: {
      material: 'Premium MDF, Hettich Hinges, Brass Handles',
      dimensions: 'W 180cm x D 58cm x H 210cm',
      warranty: '3 Years Warranty',
      assembly: 'Professional Assembly Provided'
    },
    colors: [
      { name: 'Warm Off-White', hex: '#f5f5f0' },
      { name: 'Navy Blue & Brass', hex: '#1a237e' }
    ]
  },

  // --- RECLINERS ---
  {
    id: 'recliners-1',
    name: 'CloudNine Motorized Leather Recliner',
    category: 'recliners',
    price: 34999,
    originalPrice: 44999,
    rating: 4.9,
    reviews: 167,
    description: 'Unwind at the touch of a button. Featuring a German OKIN motor for smooth, infinite reclining positions, integrated USB charging port, and full-grain leather contact areas.',
    features: [
      'Smooth, silent motorized recline mechanism',
      'Infinite reclining angles up to 160 degrees',
      'Built-in USB charging port inside the armrest',
      'Overstuffed armrests and lumbar cushion support'
    ],
    specifications: {
      material: 'Top-grain Leather Contact, Metal Frame',
      dimensions: 'W 95cm x D 98cm x H 102cm',
      warranty: '5 Years Motor Warranty, 3 Years Frame',
      assembly: 'Easy 2-part click assembly'
    },
    colors: [
      { name: 'Cappuccino Latte', hex: '#d7ccc8' },
      { name: 'Dark Espresso', hex: '#3e2723' },
      { name: 'Charcoal Grey', hex: '#37474f' }
    ]
  },
  {
    id: 'recliners-2',
    name: 'Zenith Rocker & Swivel Recliner',
    category: 'recliners',
    price: 26999,
    originalPrice: 34999,
    rating: 4.6,
    reviews: 82,
    description: 'The ultimate reading chair. Zenith offers 360-degree swivel, a soothing rocking motion, and a manual pull-tab recliner mechanism covered in cloud-soft breathable fabric.',
    features: [
      'Full 360-degree swivel and gentle rocking motion',
      'Easy manual pull-tab recline trigger',
      'Breathable, wear-resistant chenille fabric',
      'Ergonomic headrest and pocket-spring seating comfort'
    ],
    specifications: {
      material: 'Chenille Fabric, Alloy Steel Base',
      dimensions: 'W 90cm x D 95cm x H 100cm',
      warranty: '2 Years Warranty',
      assembly: 'Easy 2-part click assembly'
    },
    colors: [
      { name: 'Mist Grey Chenille', hex: '#cfd8dc' },
      { name: 'Olive Green Chenille', hex: '#556b2f' }
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

  // --- DRESSERS ---
  {
    id: 'dressers-1',
    name: 'Aurelia Dressing Vanity with Mirror',
    category: 'dressers',
    price: 28999,
    originalPrice: 38999,
    rating: 4.9,
    reviews: 42,
    description: 'Simplify your morning routine with this luxury dressing table. Equipped with a high-definition circular mirror, two spacious drawers with gold handles, and matching stool.',
    features: [
      'High-definition round dressing mirror',
      'Two drawers with soft-close slide guides',
      'Upholstered vanity stool included',
      'Sleek faux-marble top layer'
    ],
    specifications: {
      material: 'Engineered Wood, Metal, Marble Laminate',
      dimensions: 'W 100cm x D 45cm x H 135cm',
      warranty: '3 Years Warranty',
      assembly: 'Professional Assembly Provided'
    },
    colors: [
      { name: 'Warm White & Gold', hex: '#ffffff' },
      { name: 'Charcoal & Gold', hex: '#424242' }
    ]
  },

  // --- TV UNITS ---
  {
    id: 'tvunits-1',
    name: 'Milan Floating Walnut TV Console',
    category: 'tvunits',
    price: 16999,
    originalPrice: 22999,
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

  // --- TABLES ---
  {
    id: 'tables-1',
    name: 'Verona Solid Marble Coffee Table',
    category: 'tables',
    price: 19999,
    originalPrice: 26999,
    rating: 4.9,
    reviews: 110,
    description: 'The centerpiece your living room deserves. The Verona Coffee Table features a stunning natural Calacatta marble slab top on a sculptural metal frame.',
    features: [
      '100% genuine Calacatta polished marble top',
      'Brushed stainless steel sculptural base',
      'Eco-friendly protective sealant layer',
      'Rounded safe edges for family comfort'
    ],
    specifications: {
      material: 'Natural Marble, Stainless Steel',
      dimensions: 'L 110cm x W 60cm x H 42cm',
      warranty: '5 Years Warranty',
      assembly: 'No Assembly Required'
    },
    colors: [
      { name: 'Calacatta Gold', hex: '#fafafa' }
    ]
  },

  // --- DOORS ---
  {
    id: 'door-1',
    name: 'Premium Wooden Door 1',
    category: 'doors',
    price: 15999,
    originalPrice: 19999,
    rating: 4.8,
    reviews: 45,
    image: '/Door-1.webp',
    description: 'High-quality wooden door with elegant design.',
    features: ['Solid wood construction', 'Weather resistant', 'Includes hardware'],
    specifications: { material: 'Wood', dimensions: 'W 90cm x H 210cm', warranty: '5 Years', assembly: 'Installation required' },
    colors: [{ name: 'Brown', hex: '#654321' }]
  },
  // --- WINDOWS ---
  {
    id: 'window-1',
    name: 'Modern Sliding Window',
    category: 'windows',
    price: 8999,
    originalPrice: 11999,
    rating: 4.7,
    reviews: 28,
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=400&q=80',
    description: 'Sleek sliding window with tempered glass.',
    features: ['Tempered glass', 'Smooth sliding track', 'Soundproof'],
    specifications: { material: 'Aluminum', dimensions: 'W 120cm x H 100cm', warranty: '2 Years', assembly: 'Installation required' },
    colors: [{ name: 'White', hex: '#FFFFFF' }]
  },
  {
    id: 'window-2',
    name: 'Classic Grid Window',
    category: 'windows',
    price: 9599,
    originalPrice: 12999,
    rating: 4.5,
    reviews: 15,
    image: 'https://images.unsplash.com/photo-1542385151-efd9000785a0?w=400&q=80',
    description: 'Traditional grid window for a classic look.',
    features: ['Classic grid design', 'Energy efficient', 'Easy clean'],
    specifications: { material: 'UPVC', dimensions: 'W 100cm x H 120cm', warranty: '2 Years', assembly: 'Installation required' },
    colors: [{ name: 'Brown', hex: '#3e2723' }]
  },
  {
    id: 'door-2',
    name: 'Classic Wooden Door 2',
    category: 'doors',
    price: 12499,
    originalPrice: 15999,
    rating: 4.6,
    reviews: 32,
    image: '/door-2.webp',
    description: 'Classic interior wooden door.',
    features: ['Durable finish', 'Noise reduction', 'Standard size'],
    specifications: { material: 'Engineered Wood', dimensions: 'W 80cm x H 200cm', warranty: '3 Years', assembly: 'Installation required' },
    colors: [{ name: 'Dark Oak', hex: '#3b2f2f' }]
  },
  {
    id: 'door-3',
    name: 'Modern Panel Door 3',
    category: 'doors',
    price: 18500,
    originalPrice: 22000,
    rating: 4.9,
    reviews: 67,
    image: '/door-3.webp',
    description: 'Modern panel door suitable for main entrances.',
    features: ['High security', 'Modern aesthetic', 'Premium polish'],
    specifications: { material: 'Solid Wood', dimensions: 'W 100cm x H 220cm', warranty: '5 Years', assembly: 'Installation required' },
    colors: [{ name: 'Walnut', hex: '#5c4033' }]
  },
  {
    id: 'door-4',
    name: 'Contemporary Door 4',
    category: 'doors',
    price: 14200,
    originalPrice: 17500,
    rating: 4.7,
    reviews: 28,
    image: '/door-4.webp',
    description: 'Contemporary style door for modern homes.',
    features: ['Sleek design', 'Easy maintenance', 'Lightweight'],
    specifications: { material: 'Wood & Glass', dimensions: 'W 90cm x H 210cm', warranty: '3 Years', assembly: 'Installation required' },
    colors: [{ name: 'Natural', hex: '#d2b48c' }]
  },

  // --- WINDOWS ---
  {
    id: 'window-1',
    name: 'Sliding Glass Window 1',
    category: 'windows',
    price: 8999,
    originalPrice: 11999,
    rating: 4.5,
    reviews: 89,
    image: '/window-1.webp',
    description: 'Smooth sliding glass window for optimal ventilation.',
    features: ['Toughened glass', 'Smooth sliding mechanism', 'Weatherproof'],
    specifications: { material: 'Aluminum & Glass', dimensions: 'W 120cm x H 120cm', warranty: '5 Years', assembly: 'Installation required' },
    colors: [{ name: 'White Frame', hex: '#ffffff' }]
  },
  {
    id: 'window-2',
    name: 'Casement Window 2',
    category: 'windows',
    price: 10500,
    originalPrice: 13000,
    rating: 4.8,
    reviews: 54,
    image: '/window-2.webp',
    description: 'Elegant casement window offering a full breeze.',
    features: ['Hinged design', 'Energy efficient', 'Secure locking'],
    specifications: { material: 'UPVC & Glass', dimensions: 'W 100cm x H 140cm', warranty: '5 Years', assembly: 'Installation required' },
    colors: [{ name: 'Wood Finish', hex: '#8b5a2b' }]
  }
];

export const getProducts = () => {
  try {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('efive_products_v2');
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
      localStorage.setItem('efive_products_v2', JSON.stringify(combined));
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
      localStorage.setItem('efive_products_v2', JSON.stringify(updatedProducts));
    }
  } catch (e) {
    console.error('Could not save products', e);
  }
};
