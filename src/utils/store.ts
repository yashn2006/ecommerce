export type FragranceFamily = 'Woody' | 'Floral' | 'Amber' | 'Fresh';
export type BottleSize = 30 | 50 | 100;
export type SortOption = 'featured' | 'price-asc' | 'price-desc';
export type PaymentMethod = 'card' | 'cod';

export interface OlfactoryPyramid {
  top: string[];
  heart: string[];
  base: string[];
}

export interface PerfumeProduct {
  id: string;
  name: string;
  family: FragranceFamily;
  concentration: string;
  oilPercentage: string;
  basePrice50ml: number;
  accordSummary: string;
  description: string;
  longevity: string;
  sillage: string;
  editionNote?: string;
  image: string;
  pyramid: OlfactoryPyramid;
  featuredRank: number;
}

export interface CartItem {
  productId: string;
  name: string;
  family: FragranceFamily;
  concentration: string;
  image: string;
  size: BottleSize;
  unitPrice: number;
  quantity: number;
}

export interface CartTotals {
  itemCount: number;
  subtotal: number;
  shippingFee: number;
  freeShippingRemaining: number;
  total: number;
}

export interface CheckoutForm {
  fullName: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  paymentMethod: PaymentMethod;
}

export type ValidationErrors = Partial<Record<keyof CheckoutForm, string>>;

export interface OrderReceipt {
  orderNumber: string;
  createdAt: string;
  status: string;
  customer: CheckoutForm;
  items: CartItem[];
  totals: CartTotals;
}

export const FREE_SHIPPING_THRESHOLD = 200;
export const STANDARD_SHIPPING_FEE = 15;

export const BOTTLE_SIZES: BottleSize[] = [30, 50, 100];

export const FRAGRANCE_FAMILIES: Array<'All' | FragranceFamily> = [
  'All',
  'Woody',
  'Floral',
  'Amber',
  'Fresh',
];

export const HERO_IMAGE_PATH = '/src/assets/images/hero_perfume_atelier_1795590584027.jpg';

export const PERFUME_CATALOG: PerfumeProduct[] = [
  {
    id: 'cedar-and-smoke',
    name: 'Cedar & Smoke',
    family: 'Woody',
    concentration: 'Eau de Parfum',
    oilPercentage: '24%',
    basePrice50ml: 185,
    accordSummary: 'Calabrian Bergamot, Smoked Atlas Cedar, Haitian Vetiver',
    description:
      'Dry hearth smoke balanced by crisp bergamot rind and resinous Atlas cedarwood. Macerated for 42 days in stoneware vats for an enduring skin-close trail.',
    longevity: '10–12 hours on skin',
    sillage: 'Moderate to intimate',
    editionNote: 'Signature',
    image: '/src/assets/images/perfume_bois_noir_1795590585542.jpg',
    pyramid: {
      top: ['Calabrian Bergamot', 'Black Pepper', 'Juniper Berry'],
      heart: ['Smoked Atlas Cedar', 'Cypriol', 'Dry Birch'],
      base: ['Haitian Vetiver', 'Guaiac Wood', 'White Oakmoss'],
    },
    featuredRank: 1,
  },
  {
    id: 'champagne-blush',
    name: 'Champagne Blush',
    family: 'Floral',
    concentration: 'Eau de Parfum',
    oilPercentage: '22%',
    basePrice50ml: 170,
    accordSummary: 'White Peony, Pink Peppercorn, Ambrette Musk',
    description:
      'Luminous morning petals softened with sparkling pink pepper and botanical ambrette seed. Crisp, airy, and poised from first mist through dusk.',
    longevity: '8–10 hours on skin',
    sillage: 'Radiant',
    image: '/src/assets/images/perfume_fleur_sel_1795590585444.jpg',
    pyramid: {
      top: ['Pink Peppercorn', 'White Pear', 'Mandarin Zest'],
      heart: ['White Peony', 'Centifolia Rose', 'Magnolia Leaf'],
      base: ['Ambrette Seed', 'Blonde Cedar', 'Clean Musk'],
    },
    featuredRank: 2,
  },
  {
    id: 'ambre-noir',
    name: 'Ambre Noir',
    family: 'Amber',
    concentration: 'Eau de Parfum',
    oilPercentage: '28%',
    basePrice50ml: 210,
    accordSummary: 'Saffron Thread, Spanish Labdanum, Madagascar Vanilla',
    description:
      'Warm golden resin steeped with crushed cardamom, labdanum tears, and unsweetened dark vanilla pod. Deeply enveloping without heaviness.',
    longevity: '12+ hours on skin',
    sillage: 'Pronounced',
    editionNote: 'Limited Batch',
    image: '/src/assets/images/perfume_ambre_sacre_1795590586518.jpg',
    pyramid: {
      top: ['Saffron Thread', 'Green Cardamom', 'Bitter Orange'],
      heart: ['Spanish Labdanum', 'Myrrh Resin', 'Cinnamon Bark'],
      base: ['Madagascar Vanilla', 'Benzoin Siam', 'Aged Patchouli'],
    },
    featuredRank: 3,
  },
  {
    id: 'lumina-aurore',
    name: 'Lumina Aurore',
    family: 'Fresh',
    concentration: 'Eau de Parfum',
    oilPercentage: '20%',
    basePrice50ml: 165,
    accordSummary: 'Tunisian Neroli, Crushed Petitgrain, Mineral Fig',
    description:
      'Sunlit citrus blossom and crisp green fig leaf over cool river stone. Designed for effortless clarity in warm weather and tailored linen.',
    longevity: '7–9 hours on skin',
    sillage: 'Light to moderate',
    image: '/src/assets/images/perfume_neroli_blanc_1795590585922.jpg',
    pyramid: {
      top: ['Tunisian Neroli', 'Crushed Petitgrain', 'Citron'],
      heart: ['Green Fig Leaf', 'Orange Blossom Water', 'White Tea'],
      base: ['Mineral Driftwood', 'White Ambergris', 'Vetiver Root'],
    },
    featuredRank: 4,
  },
  {
    id: 'olive-amber',
    name: 'Olive Amber',
    family: 'Woody',
    concentration: 'Eau de Parfum',
    oilPercentage: '25%',
    basePrice50ml: 195,
    accordSummary: 'Wild Cypress, Olive Wood, Warm Frankincense',
    description:
      'Mediterranean grove at late afternoon: sun-warmed olive bark, aromatic cypress needles, and dry olibanum smoke anchored in earthy vetiver.',
    longevity: '10–12 hours on skin',
    sillage: 'Moderate',
    image: '/src/assets/images/perfume_vetiver_fume_1795590586372.jpg',
    pyramid: {
      top: ['Wild Cypress', 'Crushed Rosemary', 'Bergamot'],
      heart: ['Olive Wood', 'Somali Frankincense', 'Clary Sage'],
      base: ['Dry Amber', 'Roasted Tonka', 'Java Vetiver'],
    },
    featuredRank: 5,
  },
  {
    id: 'leau-rosee',
    name: "L'Eau Rosée",
    family: 'Floral',
    concentration: 'Parfum',
    oilPercentage: '30%',
    basePrice50ml: 225,
    accordSummary: 'Florentine Iris Butter, Damask Rose, Suede Accord',
    description:
      'Our highest concentration extract featuring aged iris pallida rhizome, dewy Damask rose petals, and supple pale suede.',
    longevity: '12+ hours on skin',
    sillage: 'Intimate velvet trail',
    editionNote: 'Extrait 30%',
    image: '/src/assets/images/perfume_iris_poudre_1795590586993.jpg',
    pyramid: {
      top: ['Aldehydes', 'White Violet', 'Bergamot Mist'],
      heart: ['Florentine Iris Butter', 'Damask Rose', 'Heliotrope'],
      base: ['Pale Suede', 'Sandalwood Mysore', 'Ambrette'],
    },
    featuredRank: 6,
  },
];

export function getPriceForSize(basePrice50ml: number, size: BottleSize): number {
  if (size === 30) {
    return Math.round((basePrice50ml * 0.72) / 5) * 5;
  }
  if (size === 100) {
    return Math.round((basePrice50ml * 1.48) / 5) * 5;
  }
  return basePrice50ml;
}

export function formatCurrency(amount: number): string {
  return `$${amount.toLocaleString('en-US')}`;
}

export function filterAndSortPerfumes(
  products: PerfumeProduct[],
  options: {
    category: 'All' | FragranceFamily;
    query: string;
    sort: SortOption;
  }
): PerfumeProduct[] {
  const normalizedQuery = options.query.trim().toLowerCase();

  const filtered = products.filter((product) => {
    const matchesCategory =
      options.category === 'All' || product.family === options.category;

    if (!matchesCategory) {
      return false;
    }

    if (!normalizedQuery) {
      return true;
    }

    const searchableText = [
      product.name,
      product.family,
      product.concentration,
      product.accordSummary,
      ...product.pyramid.top,
      ...product.pyramid.heart,
      ...product.pyramid.base,
    ]
      .join(' ')
      .toLowerCase();

    return searchableText.includes(normalizedQuery);
  });

  const sorted = [...filtered];
  if (options.sort === 'price-asc') {
    sorted.sort((a, b) => a.basePrice50ml - b.basePrice50ml);
  } else if (options.sort === 'price-desc') {
    sorted.sort((a, b) => b.basePrice50ml - a.basePrice50ml);
  } else {
    sorted.sort((a, b) => a.featuredRank - b.featuredRank);
  }

  return sorted;
}

export function addToCart(
  items: CartItem[],
  product: PerfumeProduct,
  size: BottleSize,
  quantity = 1
): CartItem[] {
  if (quantity <= 0) {
    return items;
  }

  const unitPrice = getPriceForSize(product.basePrice50ml, size);
  const existingIndex = items.findIndex(
    (item) => item.productId === product.id && item.size === size
  );

  if (existingIndex >= 0) {
    return items.map((item, idx) =>
      idx === existingIndex
        ? { ...item, quantity: item.quantity + quantity }
        : item
    );
  }

  return [
    ...items,
    {
      productId: product.id,
      name: product.name,
      family: product.family,
      concentration: product.concentration,
      image: product.image,
      size,
      unitPrice,
      quantity,
    },
  ];
}

export function updateCartItemQty(
  items: CartItem[],
  productId: string,
  size: BottleSize,
  delta: number
): CartItem[] {
  return items
    .map((item) => {
      if (item.productId === productId && item.size === size) {
        return { ...item, quantity: item.quantity + delta };
      }
      return item;
    })
    .filter((item) => item.quantity > 0);
}

export function removeCartItem(
  items: CartItem[],
  productId: string,
  size: BottleSize
): CartItem[] {
  return items.filter(
    (item) => !(item.productId === productId && item.size === size)
  );
}

export function calculateCartTotals(items: CartItem[]): CartTotals {
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0
  );

  if (itemCount === 0) {
    return {
      itemCount: 0,
      subtotal: 0,
      shippingFee: 0,
      freeShippingRemaining: FREE_SHIPPING_THRESHOLD,
      total: 0,
    };
  }

  const qualifiesForFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const shippingFee = qualifiesForFreeShipping ? 0 : STANDARD_SHIPPING_FEE;
  const freeShippingRemaining = qualifiesForFreeShipping
    ? 0
    : FREE_SHIPPING_THRESHOLD - subtotal;

  return {
    itemCount,
    subtotal,
    shippingFee,
    freeShippingRemaining,
    total: subtotal + shippingFee,
  };
}

export function validateCheckoutForm(form: CheckoutForm): {
  valid: boolean;
  errors: ValidationErrors;
} {
  const errors: ValidationErrors = {};

  if (form.fullName.trim().length < 2) {
    errors.fullName = 'Please enter your full name.';
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(form.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }

  if (form.address.trim().length < 5) {
    errors.address = 'Please enter a complete street address.';
  }

  if (form.city.trim().length < 2) {
    errors.city = 'Please enter your city.';
  }

  if (form.postalCode.trim().length < 3) {
    errors.postalCode = 'Please enter a valid postal code.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function createOrderReceipt(
  items: CartItem[],
  form: CheckoutForm,
  existingOrdersCount = 0
): OrderReceipt {
  const sequence = 1042 + existingOrdersCount;
  const totals = calculateCartTotals(items);

  return {
    orderNumber: `ML-${sequence}`,
    createdAt: new Date().toISOString(),
    status: 'Confirmed — Preparing Shipment',
    customer: {
      ...form,
      fullName: form.fullName.trim(),
      email: form.email.trim(),
      address: form.address.trim(),
      city: form.city.trim(),
      postalCode: form.postalCode.trim(),
    },
    items: items.map((item) => ({ ...item })),
    totals,
  };
}
