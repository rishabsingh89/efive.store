// --- CATEGORIES DATA START ---
export const categories = [
  {
    "id": "beds",
    "name": "Beds",
    "image": "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=400&q=80"
  },
  {
    "id": "dining",
    "name": "Dining",
    "image": "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=400&q=80"
  },
  {
    "id": "shelves",
    "name": "Shelves",
    "image": "/shelve deck-1 (1).png"
  },
  {
    "id": "decor",
    "name": "Decor",
    "image": "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=400&q=80"
  },
  {
    "id": "tvunits",
    "name": "TV Units",
    "image": "/images/tvunits/view-1.png"
  },
  {
    "id": "study",
    "name": "Study Table",
    "image": "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=400&q=80"
  },
  {
    "id": "tables",
    "name": "Office Table",
    "image": "/View-1 (3).png"
  }
];
// --- CATEGORIES DATA END ---

// --- HERO DATA START ---
export const initialHeroCMS = {
  "headline": "We Curate Spaces, Not Just Furniture.",
  "subheadline": "Bespoke Luxury Collections Designed for Contemporary Living.",
  "badgeText": "FURNISHING FESTIVAL 2026",
  "offerText": "FLAT 30% OFF ON LUXURY COLLECTIONS",
  "slides": [
    {
      "title": "The Royal Velvet Wingback",
      "subtitle": "Handcrafted Elegance & Storage",
      "image": "/hero_bed_2.jpg",
      "category": "beds"
    },
    {
      "title": "Verona Italian Marble Dining",
      "subtitle": "Bespoke Marble & Gold Accents",
      "image": "/hero_slide2.jpg",
      "category": "dining"
    },
    {
      "title": "Somnus Sanctuary Bed",
      "subtitle": "German Gas-Lift Hydraulic Storage",
      "image": "/hero_slide3.jpg",
      "category": "beds"
    }
  ]
};
// --- HERO DATA END ---


// --- PRODUCTS DATA START ---
export const products = [
  {
    "id": "beds-1",
    "name": "Somnus King Size Hydraulic Storage Bed",
    "images": [
      "/images/beds/Beds/WABY/view-1.jpg",
      "/images/beds/Beds/WABY/view-2.jpg",
      "/images/beds/Beds/WABY/view-3.jpg",
      "/images/beds/Beds/WABY/view-4.jpg"
    ],
    "category": "beds",
    "price": 14999,
    "originalPrice": 19999,
    "rating": 4.9,
    "reviews": 142,
    "description": "Maximize space and style with the Somnus Bed. Features an elegant tufted headboard upholstered in premium fabric, and an easy-lift German hydraulic mechanism for abundant under-bed storage.",
    "features": [
      "German gas-lift hydraulic storage mechanism",
      "High upholstered wingback headboard for lounging comfort",
      "Extra reinforced metal frame support for heavy mattresses",
      "Anti-dust shield floor lining inside the storage"
    ],
    "specifications": {
      "material": "Engineered Wood, Metal Support, Premium Fabric",
      "dimensions": "W 190cm x L 210cm x H 125cm",
      "warranty": "5 Years Warranty",
      "assembly": "Professional Assembly Provided"
    },
    "colors": [
      {
        "name": "Luxury Bronze",
        "hex": "#C5A880"
      }
    ]
  },
  {
    "id": "beds-2",
    "name": "Mesa Solid Teak Canopy Bed",
    "images": [
      "/images/beds/Beds/WABY/view-5.jpg",
      "/images/beds/Beds/WABY/view-1.jpg"
    ],
    "category": "beds",
    "price": 14999,
    "originalPrice": 19999,
    "rating": 4.7,
    "reviews": 43,
    "description": "Bring a dramatic architectural flair to your bedroom with the Mesa Canopy Bed. Masterfully crafted from 100% sustainably-sourced solid teak wood in a rich walnut finish.",
    "features": [
      "100% Solid Teak Wood structure",
      "Sleek canopy frame suitable for drapes or minimalist open look",
      "Traditional joinery craftsmanship for durability",
      "Solid wood slats included (no box spring needed)"
    ],
    "specifications": {
      "material": "Solid Teak Wood, Matte Walnut Finish",
      "dimensions": "W 188cm x L 208cm x H 210cm",
      "warranty": "10 Years Warranty",
      "assembly": "Professional Assembly Provided"
    },
    "colors": [
      {
        "name": "Dark Walnut",
        "hex": "#3e2723"
      },
      {
        "name": "Natural Teak",
        "hex": "#8d6e63"
      }
    ]
  },
  {
    "id": "beds-3",
    "name": "Saby",
    "images": [
      "/VIEW-1 (7).png",
      "/VIEW-3 (9).png",
      "/VIEW-4 (5).png",
      "/VIEW-2 (8).png"
    ],
    "category": "beds",
    "price": 14963,
    "originalPrice": 22968,
    "discount": 35,
    "rating": 4.8,
    "reviews": 120,
    "description": "The Saby bed brings a perfect blend of modern minimalism and robust construction. Crafted for lasting comfort with an elegant wooden frame.",
    "features": [
      "Sturdy minimalist wooden frame",
      "Contemporary design suitable for modern bedrooms",
      "Premium mattress support system",
      "Easy to maintain finish"
    ],
    "specifications": {
      "material": "Engineered Wood, Premium Finish",
      "dimensions": "Check mapping image for exact dimensions",
      "warranty": "3 Years Warranty",
      "assembly": "Professional Assembly Provided"
    },
    "colors": [
      {
        "name": "Natural Oak",
        "hex": "#d7ccc8"
      }
    ]
  },
  {
    "id": "decor-1",
    "name": "Handwoven Macrame Sun & Rainbow Wall Decor",
    "category": "decor",
    "price": 2499,
    "originalPrice": 3199,
    "discount": 22,
    "showDiscountBadge": true,
    "stockStatus": "available",
    "isOutOfStock": false,
    "isSoldOut": false,
    "rating": 4.9,
    "reviews": 42,
    "description": "A beautiful handcrafted macrame rainbow wall hanging to add a bohemian and cheerful touch to any room. Made with natural cotton cords and pastel shades.",
    "features": [
      "100% Natural Cotton Cords",
      "Handwoven by expert artisans",
      "Bohemian and cheerful pastel shades",
      "Ready to hang instantly"
    ],
    "specifications": {
      "material": "Cotton, Wood",
      "dimensions": "W 25cm x H 20cm",
      "warranty": "1 Years Warranty",
      "assembly": "Ready to Hang"
    },
    "colors": [
      {
        "name": "Multicolor Pastel",
        "hex": "#E5D3C8"
      }
    ],
    "image": "/1778757701815.jpg.jpeg",
    "images": [
      "/1778757701815.jpg.jpeg"
    ]
  },
  {
    "id": "decor-2",
    "name": "Boho Macrame Rainbow Feather Wall Hanging",
    "category": "decor",
    "price": 3399,
    "originalPrice": 4199,
    "discount": 19,
    "showDiscountBadge": true,
    "stockStatus": "available",
    "isOutOfStock": false,
    "isSoldOut": false,
    "rating": 4.8,
    "reviews": 29,
    "description": "Handcrafted bohemian macrame wall hanging featuring pastel feather accents and intricate knotting techniques.",
    "features": [
      "100% Natural Cotton Cords",
      "Handwoven by expert artisans",
      "Feather and leaf accents",
      "Ready to hang instantly"
    ],
    "specifications": {
      "material": "Cotton, Wood",
      "dimensions": "W 30cm x H 25cm",
      "warranty": "1 Years Warranty",
      "assembly": "Ready to Hang"
    },
    "colors": [
      {
        "name": "Warm Cream & Sage",
        "hex": "#D8E2DC"
      }
    ],
    "image": "/InShot_20260613_145926359.jpg.jpeg",
    "images": [
      "/InShot_20260613_145926359.jpg.jpeg"
    ]
  },
  {
    "id": "decor-3",
    "name": "Custom Name Macrame Nursery Wall Decor",
    "images": [
      "/InShot_20260815_195530665.jpg.jpeg"
    ],
    "category": "decor",
    "price": 1599,
    "originalPrice": 2399,
    "rating": 5,
    "reviews": 38,
    "description": "Personalized handcrafted macrame wall decor ideal for nursery and kids rooms, featuring custom nameplate integration.",
    "features": [
      "Customizable Nameplate",
      "100% Eco-friendly Cotton Cords",
      "Delicate pastels and soft textures",
      "Ready to hang instantly"
    ],
    "specifications": {
      "material": "Cotton, Birch Wood",
      "dimensions": "W 35cm x H 25cm",
      "warranty": "No Warranty",
      "assembly": "Ready to Hang"
    },
    "colors": [
      {
        "name": "Dusty Pink & Gold",
        "hex": "#F4ACB7"
      }
    ]
  },
  {
    "id": "decor-4",
    "name": "Pastel Dreams Macrame Rainbow Hanging",
    "images": [
      "/InShot_20260815_195719426.jpg.jpeg"
    ],
    "category": "decor",
    "price": 1399,
    "originalPrice": 1999,
    "rating": 4.7,
    "reviews": 19,
    "description": "Soothing pastel macrame arch with pom-pom detailing and soft fringes, perfect for modern cozy interiors.",
    "features": [
      "Soft Pom-Pom Accents",
      "Hand-finished Cotton Tapestry",
      "Calming Pastel Tones",
      "Ready to hang instantly"
    ],
    "specifications": {
      "material": "Cotton, Wood",
      "dimensions": "W 28cm x H 22cm",
      "warranty": "No Warranty",
      "assembly": "Ready to Hang"
    },
    "colors": [
      {
        "name": "Sky Blue & Mustard",
        "hex": "#A8DADC"
      }
    ]
  },
  {
    "id": "decor-6",
    "name": "Artisan Woven Macrame Banner",
    "images": [
      "/InShot_20260904_191033802.jpg.jpeg"
    ],
    "category": "decor",
    "price": 1199,
    "originalPrice": 1799,
    "rating": 4.8,
    "reviews": 31,
    "description": "Minimalist macrame wall banner with clean geometric weave and elegant fringed bottom.",
    "features": [
      "Minimalist Geometric Weave",
      "Compact & Lightweight",
      "Neutral Scandinavian Style",
      "Ready to hang instantly"
    ],
    "specifications": {
      "material": "Cotton, Dowel Wood",
      "dimensions": "W 20cm x H 18cm",
      "warranty": "No Warranty",
      "assembly": "Ready to Hang"
    },
    "colors": [
      {
        "name": "Natural Oatmeal",
        "hex": "#F5EBE0"
      }
    ]
  },
  {
    "id": "study-1",
    "name": "Athena Ergonomic Electric Standing Desk",
    "category": "study",
    "price": 28999,
    "originalPrice": 37999,
    "discount": 24,
    "showDiscountBadge": true,
    "stockStatus": "sold_out",
    "isOutOfStock": false,
    "isSoldOut": true,
    "rating": 4.9,
    "reviews": 145,
    "description": "Promote wellness and productivity. The Athena Standing Desk features dual electric motors, a digital memory control panel with 4 presets, and a premium solid wood desktop.",
    "features": [
      "Dual motors with silent operations (<45dB)",
      "Digital LED control panel with 4 height-memory presets",
      "Anti-collision safety sensor stops desk if obstructed",
      "Solid oak veneer table top with integrated cable management grommets"
    ],
    "specifications": {
      "material": "Solid Oak Veneer Top, Heavy Duty Steel Frame",
      "dimensions": "W 140cm x D 70cm x H 65cm to 125cm",
      "warranty": "5 Years Frame & Motor Warranty",
      "assembly": "Self Assembly (All tools & guide included)"
    },
    "colors": [
      {
        "name": "Oak Top & White Frame",
        "hex": "#ebd8c2"
      },
      {
        "name": "Walnut Top & Black Frame",
        "hex": "#4e342e"
      }
    ],
    "image": "",
    "images": []
  },
  {
    "id": "shelves-1",
    "name": "Nordic Oak Floating Wall Shelves",
    "category": "shelves",
    "price": 799,
    "originalPrice": 1299,
    "discount": 31,
    "showDiscountBadge": true,
    "stockStatus": "available",
    "isOutOfStock": false,
    "isSoldOut": false,
    "rating": 4.8,
    "reviews": 65,
    "description": "Elevate your interior wall space with modern solid oak floating shelves. Perfectly engineered for displaying books, plants, and luxury decor pieces.",
    "features": [
      "100% Solid European Oak wood structure",
      "Concealed heavy-duty steel mounting hardware included",
      "Protective natural matte lacquer finish",
      "Sturdy weight capacity up to 25kg"
    ],
    "specifications": {
      "material": "Solid European Oak Wood",
      "dimensions": "W 100cm x D 22cm x H 4cm",
      "warranty": "6Months Warranty",
      "assembly": "Wall Mounting Required"
    },
    "colors": [
      {
        "name": "Natural Oak",
        "hex": "#d4a373"
      },
      {
        "name": "Walnut Finish",
        "hex": "#6f4e37"
      }
    ],
    "image": "/shelve deck-1 (1).png",
    "images": [
      "/shelve deck-1 (1).png",
      "/shelve deck-1 (2).png",
      "/shelve deck-1 (1).jpg"
    ]
  },
  {
    "id": "tvunits-1",
    "name": "Milan Floating Walnut TV Console",
    "category": "tvunits",
    "price": 29499,
    "originalPrice": 38999,
    "discount": 24,
    "showDiscountBadge": true,
    "stockStatus": "out_of_stock",
    "isOutOfStock": true,
    "isSoldOut": false,
    "rating": 4.7,
    "reviews": 78,
    "description": "Clean up your living room floor space with the Milan Floating TV Console. Crafted with beautiful walnut veneer, soft-closing doors, and cable entry slots.",
    "features": [
      "Space-saving wall-mounted floating configuration",
      "Integrated wire grommets for cable management",
      "Soft-closing hydraulic door hinges",
      "Matte scratch-resistant walnut veneer"
    ],
    "specifications": {
      "material": "Premium MDF, Walnut Veneer",
      "dimensions": "W 160cm x D 35cm x H 30cm",
      "warranty": "3 Years Warranty",
      "assembly": "Wall Mounting & Installation Included"
    },
    "colors": [
      {
        "name": "Crimson Red",
        "hex": "#c62828",
        "imageIdx": 0,
        "price": 29499,
        "originalPrice": 38999
      },
      {
        "name": "Sage Green",
        "hex": "#689f38",
        "imageIdx": 1,
        "price": 29499,
        "originalPrice": 38999
      },
      {
        "name": "Matte Black",
        "hex": "#212121",
        "imageIdx": 2,
        "price": 27999,
        "originalPrice": 36999
      },
      {
        "name": "Pure White",
        "hex": "#f5f5f5",
        "imageIdx": 3,
        "price": 27999,
        "originalPrice": 36999
      }
    ],
    "image": "/images/tvunits/view-1.png",
    "images": [
      "/images/tvunits/view-1.png",
      "/images/tvunits/view-2.png",
      "/images/tvunits/view-3.png",
      "/images/tvunits/view-4.png"
    ]
  },
  {
    "id": "tvunits-3",
    "name": "Modular Display TV Console",
    "category": "tvunits",
    "price": 34999,
    "originalPrice": 45999,
    "discount": 24,
    "showDiscountBadge": true,
    "stockStatus": "out_of_stock",
    "isOutOfStock": true,
    "isSoldOut": false,
    "rating": 4.8,
    "reviews": 42,
    "description": "An elegant modular TV console featuring multiple distinct finish options, spacious shelving, and modern minimalist design.",
    "features": [
      "Four elegant finish options to match any decor",
      "Integrated wire grommets for cable management",
      "Soft-closing hydraulic door hinges",
      "Scratch-resistant premium finish"
    ],
    "specifications": {
      "material": "Premium MDF, Engineered Wood",
      "dimensions": "W 180cm x D 40cm x H 35cm",
      "warranty": "3 Years Warranty",
      "assembly": "Wall Mounting & Installation Included"
    },
    "colors": [
      {
        "name": "White Design",
        "hex": "#f5f5f5",
        "imageIdx": 0,
        "price": 34999,
        "originalPrice": 45999
      },
      {
        "name": "Natural Design",
        "hex": "#d7ccc8",
        "imageIdx": 1,
        "price": 34999,
        "originalPrice": 45999
      },
      {
        "name": "Grey Design",
        "hex": "#616161",
        "imageIdx": 2,
        "price": 34999,
        "originalPrice": 45999
      },
      {
        "name": "Walnut Design",
        "hex": "#5d4037",
        "imageIdx": 3,
        "price": 34999,
        "originalPrice": 45999
      }
    ],
    "image": "/view-1 (1).png",
    "images": [
      "/view-1 (1).png",
      "/view-2 (1).png",
      "/view-3 (1).png",
      "/view-4 (2).png"
    ]
  },
  {
    "id": "tvunits-2",
    "name": "Contemporary Color-Choice TV Console",
    "category": "tvunits",
    "price": 31999,
    "originalPrice": 41999,
    "discount": 24,
    "showDiscountBadge": true,
    "stockStatus": "out_of_stock",
    "isOutOfStock": true,
    "isSoldOut": false,
    "rating": 4.9,
    "reviews": 56,
    "description": "Elevate your entertainment space with this contemporary TV console. Available in multiple bold colors, it features sleek lines and ample storage space for a modern living room.",
    "features": [
      "Bold and vibrant color options",
      "Smooth sliding drawers for storage",
      "Cable management system",
      "Durable and easy-to-clean surface"
    ],
    "specifications": {
      "material": "Engineered Wood, Premium Finish",
      "dimensions": "W 170cm x D 40cm x H 45cm",
      "warranty": "3 Years Warranty",
      "assembly": "Professional Assembly Provided"
    },
    "colors": [
      {
        "name": "Pure White",
        "hex": "#f5f5f5",
        "imageIdx": 0,
        "price": 31999,
        "originalPrice": 41999
      },
      {
        "name": "Forest Green",
        "hex": "#2e7d32",
        "imageIdx": 1,
        "price": 31999,
        "originalPrice": 41999
      },
      {
        "name": "Ruby Red",
        "hex": "#c62828",
        "imageIdx": 3,
        "price": 31999,
        "originalPrice": 41999
      },
      {
        "name": "Matte Black",
        "hex": "#212121",
        "imageIdx": 2,
        "price": 31999,
        "originalPrice": 41999
      }
    ],
    "image": "/view-1 (4).png",
    "images": [
      "/view-1 (4).png",
      "/view-2 (3).png",
      "/view-2 (4).png",
      "/view-3 (4).png"
    ]
  },
  {
    "id": "tables-1",
    "name": "Modern Frame Table",
    "category": "tables",
    "price": 15999,
    "originalPrice": 22999,
    "discount": 30,
    "showDiscountBadge": true,
    "stockStatus": "out_of_stock",
    "isOutOfStock": true,
    "isSoldOut": false,
    "rating": 4.8,
    "reviews": 42,
    "description": "A versatile and modern table perfect for any contemporary space. Features a sleek design with ample storage and customizable frame colors to match your interior styling.",
    "features": [
      "Minimalist modern design with durable metal frame",
      "Spacious storage compartments with smooth sliders",
      "Scratch-resistant premium tabletop finish",
      "Integrated cable management system"
    ],
    "specifications": {
      "material": "Engineered Wood, Carbon Steel Frame",
      "dimensions": "Check summary image for detailed dimensions",
      "warranty": "2 Years Warranty",
      "assembly": "Quick Self-Assembly (Manual Included)"
    },
    "colors": [
      {
        "name": "Black Frame",
        "hex": "#212121",
        "imageIdx": 0,
        "price": 15999,
        "originalPrice": 22999
      },
      {
        "name": "Red Frame",
        "hex": "#c62828",
        "imageIdx": 1,
        "price": 15999,
        "originalPrice": 22999
      },
      {
        "name": "White Frame",
        "hex": "#f5f5f5",
        "imageIdx": 2,
        "price": 15999,
        "originalPrice": 22999
      },
      {
        "name": "Green Frame",
        "hex": "#2e7d32",
        "imageIdx": 3,
        "price": 15999,
        "originalPrice": 22999
      }
    ],
    "image": "/View-1 (3).png",
    "images": [
      "/View-1 (3).png",
      "/view-3 (5).png",
      "/view-4 (1).png",
      "/view-5.png",
      "/view-2 (5).png"
    ]
  },
  {
    "id": "tables-2",
    "name": "Executive Office Desk",
    "category": "tables",
    "price": 18999,
    "originalPrice": 25999,
    "discount": 27,
    "showDiscountBadge": true,
    "stockStatus": "out_of_stock",
    "isOutOfStock": true,
    "isSoldOut": false,
    "rating": 4.9,
    "reviews": 58,
    "description": "Elevate your workspace with the Executive Office Desk. Featuring a spacious surface, built-in cable management, and a durable colorful metal frame to suit your office aesthetics.",
    "features": [
      "Sturdy colored metal frame with reinforced joints",
      "Wide desktop space for multiple monitors",
      "Anti-scratch, easy-to-clean premium surface",
      "Adjustable foot pads for uneven floors"
    ],
    "specifications": {
      "material": "Engineered Wood, High-Strength Metal",
      "dimensions": "W 140cm x D 70cm x H 75cm",
      "warranty": "2 Years Warranty",
      "assembly": "Quick Self-Assembly (Manual Included)"
    },
    "colors": [
      {
        "name": "Red Frame",
        "hex": "#c62828",
        "imageIdx": 0,
        "price": 18999,
        "originalPrice": 25999
      },
      {
        "name": "White Frame",
        "hex": "#f5f5f5",
        "imageIdx": 1,
        "price": 18999,
        "originalPrice": 25999
      },
      {
        "name": "Green Frame",
        "hex": "#2e7d32",
        "imageIdx": 2,
        "price": 18999,
        "originalPrice": 25999
      },
      {
        "name": "Black Frame",
        "hex": "#212121",
        "imageIdx": 3,
        "price": 18999,
        "originalPrice": 25999
      }
    ],
    "image": "/view-1 (5).png",
    "images": [
      "/view-1 (5).png",
      "/view-2 (6).png",
      "/view-3 (6).png",
      "/view-4 (4).png"
    ]
  },
  {
    "id": "tables-3",
    "name": "Premium Wooden Office Desk",
    "category": "tables",
    "price": 19999,
    "originalPrice": 28999,
    "discount": 31,
    "showDiscountBadge": true,
    "stockStatus": "out_of_stock",
    "isOutOfStock": true,
    "isSoldOut": false,
    "rating": 4.8,
    "reviews": 42,
    "description": "A classic premium wooden office desk featuring sturdy legs, ample workspace, and a beautiful natural wood finish that complements any modern or classic office space.",
    "features": [
      "Premium solid wood finish",
      "Sturdy industrial metal legs",
      "Wide desktop space for all your essentials",
      "Anti-scratch, easy-to-clean surface"
    ],
    "specifications": {
      "material": "Engineered Wood, High-Strength Metal",
      "dimensions": "W 150cm x D 75cm x H 75cm",
      "warranty": "3 Years Warranty",
      "assembly": "Quick Self-Assembly (Manual Included)"
    },
    "colors": [
      {
        "name": "Natural Wood",
        "hex": "#8d6e63",
        "imageIdx": 0,
        "price": 19999,
        "originalPrice": 28999
      }
    ],
    "image": "/view-1 (6).png",
    "images": [
      "/view-1 (6).png",
      "/view-2 (7).png",
      "/view-3 (7).png"
    ]
  },
  {
    "id": "shelves-2",
    "name": "Luxury 2-Deck Wooden Wall Shelves Set",
    "category": "shelves",
    "price": 1499,
    "originalPrice": 2199,
    "discount": 33,
    "showDiscountBadge": true,
    "stockStatus": "out_of_stock",
    "isOutOfStock": true,
    "isSoldOut": false,
    "rating": 4.9,
    "reviews": 48,
    "description": "A premium multi-deck handcrafted wooden wall shelves set. Designed for contemporary living spaces, lounge rooms, and cozy reading nooks.",
    "features": [
      "Multi-level dual-deck floating wall mounting",
      "Hand-finished premium solid walnut timber",
      "Reinforced concealed wall mounting brackets",
      "Scratch & moisture resistant matte clear coat"
    ],
    "specifications": {
      "material": "Solid Walnut Timber & Carbon Steel Brackets",
      "dimensions": "W 120cm x D 25cm x H 60cm",
      "warranty": "3 Years Warranty",
      "assembly": "Wall Mounting & Installation Included"
    },
    "colors": [
      {
        "name": "Warm Walnut",
        "hex": "#5d4037"
      },
      {
        "name": "Natural Oak",
        "hex": "#d4a373"
      }
    ],
    "image": "/shelve 2 deck (3).png",
    "images": [
      "/shelve 2 deck (3).png",
      "/shelve 2 deck (2).png",
      "/shelve 2 deck (1).png",
      "/shelve 2 deck (1).jpg"
    ]
  }
];
// --- PRODUCTS DATA END ---

export const getProducts = () => {
  try {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('efive_products_v37');
      const deletedIds = JSON.parse(localStorage.getItem('efive_deleted_products') || '[]');

      if (stored) {
        let parsedStored = JSON.parse(stored);
        
        // Build authoritative merged list:
        // 1. Add static base products from products.js FIRST
        // 2. OVERRIDE with parsedStored (Admin Dashboard edits) SECOND
        // This ensures user edits (custom price, uploaded image, description, warranty) are NEVER overwritten by hardcoded defaults!
        const map = new Map();
        
        parsedStored.forEach(p => {
          if (!deletedIds.includes(p.id)) {
            map.set(p.id, p);
          }
        });

        // Overlay products from products.js on disk so updated image assets (like /shelve deck-1 (1).png) take effect
        products.forEach(p => {
          if (!deletedIds.includes(p.id)) {
            const existing = map.get(p.id);
            if (existing) {
              const isUserUploadedImage = existing.image && existing.image.startsWith('data:image/');
              const hasStaticLocalImage = p.image && !p.image.includes('unsplash');
              
              const isUserUploadedImages = existing.images && existing.images.some(img => img.startsWith('data:image/'));
              const hasStaticLocalImages = p.images && p.images.some(img => !img.includes('unsplash'));
              
              map.set(p.id, { 
                ...existing, 
                image: isUserUploadedImage ? existing.image : ((hasStaticLocalImage || !existing.image || existing.image.includes('unsplash') || p.id.startsWith('shelves-')) ? p.image : existing.image),
                images: isUserUploadedImages ? existing.images : ((hasStaticLocalImages || !existing.images || existing.images.some(img => img.includes('unsplash')) || p.id.startsWith('shelves-')) ? p.images : existing.images)
              });
            } else {
              map.set(p.id, p);
            }
          }
        });

        const merged = Array.from(map.values());
        localStorage.setItem('efive_products_v37', JSON.stringify(merged));
        return merged;
      }
      
      const combined = products.filter(p => !deletedIds.includes(p.id));
      localStorage.setItem('efive_products_v37', JSON.stringify(combined));
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
      const stored = localStorage.getItem('efive_products_v37');
      if (stored) {
        const parsedStored = JSON.parse(stored);
        const updatedIds = updatedProducts.map(p => p.id);
        const deletedProducts = parsedStored.filter(p => !updatedIds.includes(p.id));
        
        if (deletedProducts.length > 0) {
          const deletedIds = JSON.parse(localStorage.getItem('efive_deleted_products') || '[]');
          deletedProducts.forEach(p => {
            if (!deletedIds.includes(p.id)) {
              deletedIds.push(p.id);
            }
          });
          localStorage.setItem('efive_deleted_products', JSON.stringify(deletedIds));
        }
      }

      localStorage.setItem('efive_products_v37', JSON.stringify(updatedProducts));
      
      window.dispatchEvent(new CustomEvent('efive_products_updated', { detail: updatedProducts }));
      window.dispatchEvent(new CustomEvent('efive_cms_updated', { detail: { products: updatedProducts } }));

      fetch('/api/save-cms-codebase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ products: updatedProducts })
      }).catch(err => {});
    }
  } catch (e) {
    console.error('Could not save products', e);
  }
};

export const getCategories = () => {
  try {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('efive_categories_v37');
      if (stored) {
        return JSON.parse(stored);
      }
      localStorage.setItem('efive_categories_v37', JSON.stringify(categories));
    }
  } catch (e) {
    console.error('Could not load categories', e);
  }
  return categories;
};

export const saveCategories = (updatedCategories) => {
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem('efive_categories_v37', JSON.stringify(updatedCategories));
      window.dispatchEvent(new CustomEvent('efive_categories_updated', { detail: updatedCategories }));
      window.dispatchEvent(new CustomEvent('efive_cms_updated', { detail: { categories: updatedCategories } }));

      fetch('/api/save-cms-codebase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ categories: updatedCategories })
      }).catch(() => {});
    }
  } catch (e) {
    console.error('Could not save categories', e);
  }
};

export const getHeroCMS = () => {
  try {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('efive_hero_cms_v37');
      if (stored) {
        return JSON.parse(stored);
      }
      localStorage.setItem('efive_hero_cms_v37', JSON.stringify(initialHeroCMS));
    }
  } catch (e) {
    console.error('Could not load hero CMS', e);
  }
  return initialHeroCMS;
};

export const saveHeroCMS = (updatedHero) => {
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem('efive_hero_cms_v37', JSON.stringify(updatedHero));
      window.dispatchEvent(new CustomEvent('efive_hero_updated', { detail: updatedHero }));
      window.dispatchEvent(new CustomEvent('efive_cms_updated', { detail: { heroCMS: updatedHero } }));

      fetch('/api/save-cms-codebase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ heroCMS: updatedHero })
      }).catch(() => {});
    }
  } catch (e) {
    console.error('Could not save hero CMS', e);
  }
};

export const syncAllCMS = async (prods, cats, hero) => {
  if (prods) saveProducts(prods);
  if (cats) saveCategories(cats);
  if (hero) saveHeroCMS(hero);

  try {
    const res = await fetch('/api/save-cms-codebase', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ products: prods, categories: cats, heroCMS: hero })
    });
    return await res.json();
  } catch (err) {
    return { success: false, error: err.message };
  }
};
