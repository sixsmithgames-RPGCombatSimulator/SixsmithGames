/**
 * Human-readable merchandise catalog.
 *
 * Product names and design copy live here so the public page, analytics, tests,
 * and any future fulfillment work all refer to the same items. Fourthwall is
 * the live merchandise checkout and remains the final authority for prices,
 * variants, shipping, tax, and payment.
 */

/** The small set of visual treatments used by the storefront mockups. */
export type MerchArtworkKind =
  | 'tee'
  | 'hoodie'
  | 'zip-hoodie'
  | 'mug'
  | 'journal'
  | 'stickers'
  | 'desk-mat';

/** A broad shop section written in language any tabletop player will know. */
export type MerchCategory = 'Wearables' | 'At the table' | 'Campaign desk';

/**
 * One customer choice for a product.
 *
 * The environment-variable name is stored instead of a Stripe Price ID so no
 * unsupported or made-up price can be committed to source control.
 */
export interface MerchVariantDefinition {
  id: string;
  label: string;
  priceEnvironmentVariable: string;
}

/**
 * Stable product copy and design notes shared across the entire shop.
 *
 * Planned choices are deliberately labeled as planned on the page until a
 * supplier, price, and fulfillment owner have confirmed them.
 */
export interface MerchProductDefinition {
  slug: string;
  name: string;
  category: MerchCategory;
  artwork: MerchArtworkKind;
  badge: string;
  tableLine: string;
  description: string;
  design: string;
  plannedChoices: string[];
  accent: string;
  /** One owner-reviewed product photograph shown on the Sixsmith Games site. */
  imageUrl?: string;
  /** Literal description of that photograph for people using assistive technology. */
  imageAlt?: string;
  /** The public Fourthwall page where the customer chooses and buys the item. */
  shopUrl?: string;
  /** Product-specific purchase wording; similar garments must remain distinguishable. */
  shopCta: string;
  /**
   * A marketing-page price copied from the verified live Fourthwall listing.
   *
   * Fourthwall remains the charge authority. This label must be updated if the
   * live listing changes, and the customer sees the final amount in checkout.
   */
  shopPrice?: string;
  /** GameMaster Studio months earned by one paid unit of this product. */
  freeStudioMonths: number;
  variants: MerchVariantDefinition[];
}

const APPAREL_SIZES = ['S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', '5XL'] as const;
const FULL_ZIP_HOODIE_SIZES = ['S', 'M', 'L', 'XL', '2XL'] as const;

/**
 * Builds the repeated apparel choices while preserving distinct Stripe setup
 * names for each garment. A size must map to its own configured one-time price
 * before that choice can enter a cart.
 */
function buildApparelVariants(
  productEnvironmentPrefix: string,
  sizes: readonly string[] = APPAREL_SIZES,
): MerchVariantDefinition[] {
  return sizes.map((size) => ({
    id: size.toLowerCase(),
    label: size,
    priceEnvironmentVariable: `MERCH_PRICE_${productEnvironmentPrefix}_${size}`,
  }));
}

/**
 * The approved Sixsmith Games launch collection.
 *
 * Only products that have approved artwork, a public Fourthwall listing, and a
 * verified checkout path belong in this array. Unapproved concepts remain in
 * the artwork manifest and never appear beside products a customer can buy.
 */
export const MERCH_PRODUCTS: MerchProductDefinition[] = [
  {
    slug: 'master-your-stories-hoodie',
    name: 'Master Your Stories Hoodie',
    category: 'Wearables',
    artwork: 'hoodie',
    badge: 'For late sessions',
    tableLine: 'For cold convention halls, late sessions, and one more scene than anyone planned.',
    description:
      'A black, regular-fit GameMaster Studio hoodie for the Game Master who keeps the table moving.',
    design:
      'The back carries MASTER YOUR STORIES, the GameMaster Studio name, the full-color Sixsmith Games crest, SIXSMITHGAMES.COM, and a scannable website QR. The front is intentionally clean.',
    plannedChoices: [
      'Black, regular-fit unisex hoodie',
      'Midweight 50/50 pre-shrunk cotton-polyester fleece',
      'Sizes S through 5XL',
    ],
    accent: '#a45535',
    imageUrl:
      'https://res.cloudinary.com/dxz6khmew/image/upload/e_trim:10/f_auto,q_auto,w_1400/v1785444317/sixsmith-games/merch/master-your-stories-hoodie-back-black-fourthwall.jpg',
    imageAlt:
      'Back of the black Master Your Stories pullover hoodie with the Sixsmith Games crest',
    shopUrl:
      'https://sixsmith-games-shop.fourthwall.com/products/master-your-stories-hoodie',
    shopCta: 'Shop the hoodie',
    shopPrice: '$44.00',
    freeStudioMonths: 3,
    variants: buildApparelVariants('MASTER_YOUR_STORIES_HOODIE'),
  },
  {
    slug: 'master-your-stories-full-zip-hoodie',
    name: 'Master Your Stories Zippered Hoodie',
    category: 'Wearables',
    artwork: 'zip-hoodie',
    badge: 'Zip it your way',
    tableLine: 'Wear it open behind the screen or zip up when the game room gets cold.',
    description:
      'A black, regular-fit fleece zippered hoodie with the Sixsmith Games crest in front and the full Master Your Stories design across the back.',
    design:
      'The back carries MASTER YOUR STORIES, GameMaster Studio, the full-color Sixsmith Games crest, SIXSMITHGAMES.COM, and the website QR code.',
    plannedChoices: [
      'Black, regular-fit unisex zippered hoodie',
      'Midweight 80/20 cotton-polyester blend fleece',
      'Sizes S through 2XL',
    ],
    accent: '#446f9f',
    imageUrl:
      'https://res.cloudinary.com/dxz6khmew/image/upload/e_trim:10/f_auto,q_auto,w_1400/v1785499541/sixsmith-games/merch/master-your-stories-full-zip-hoodie-back-fourthwall.avif',
    imageAlt:
      'Back of the black Master Your Stories zippered hoodie with the Sixsmith Games crest',
    shopUrl:
      'https://sixsmith-games-shop.fourthwall.com/products/master-your-stories-full-zip-hoodie',
    shopCta: 'Shop the zippered hoodie',
    shopPrice: 'From $59.99',
    freeStudioMonths: 3,
    variants: buildApparelVariants(
      'MASTER_YOUR_STORIES_FULL_ZIP_HOODIE',
      FULL_ZIP_HOODIE_SIZES,
    ),
  },
  {
    slug: 'gateway-wyrm-desk-mat',
    name: 'Gateway Wyrm Desk Mat',
    category: 'At the table',
    artwork: 'desk-mat',
    badge: 'For crowded tables',
    tableLine: 'Set the scene before initiative is even rolled.',
    description:
      'A limbless stone wyrm coils around a blue-lit dungeon gateway while four adventurers stand at the threshold.',
    design:
      'A full-edge fantasy panorama with room for dice, maps, notes, a keyboard, and the usual table chaos.',
    plannedChoices: [
      '31.5 × 15.5 inches',
      '3 mm neoprene',
      'Anti-slip backing',
      'Spot clean and air dry',
    ],
    accent: '#b7853f',
    imageUrl:
      'https://res.cloudinary.com/dxz6khmew/image/upload/e_trim:10/f_auto,q_auto,w_1400/v1785444314/sixsmith-games/merch/gateway-wyrm-desk-mat-dungeon-portal-fourthwall.jpg',
    imageAlt:
      'Gateway Wyrm Desk Mat with adventurers facing a blue-lit dungeon portal',
    shopUrl:
      'https://sixsmith-games-shop.fourthwall.com/products/gateway-wyrm-desk-mat',
    shopCta: 'Shop the desk mat',
    shopPrice: '$34.00',
    freeStudioMonths: 1,
    variants: [
      {
        id: 'standard',
        label: 'Standard',
        priceEnvironmentVariable: 'MERCH_PRICE_GATEWAY_WYRM_DESK_MAT',
      },
    ],
  },
];

/** Finds a product by the stable slug used in links, analytics, and checkout. */
export function getMerchProduct(slug: string): MerchProductDefinition | undefined {
  return MERCH_PRODUCTS.find((product) => product.slug === slug);
}

/**
 * Totals the Studio time earned by a paid merchandise order.
 *
 * Unknown or non-positive quantities earn nothing. This lets the signed
 * Fourthwall webhook reject altered or future product data without inventing a
 * benefit for an item that Mike has not approved.
 */
export function calculateFreeStudioMonths(
  offers: Array<{ slug: string; quantity: number }>,
): number {
  return offers.reduce((total, offer) => {
    if (!Number.isInteger(offer.quantity) || offer.quantity <= 0) return total;

    const product = getMerchProduct(offer.slug);
    return total + (product?.freeStudioMonths ?? 0) * offer.quantity;
  }, 0);
}
