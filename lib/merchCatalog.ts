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
  /** The public Fourthwall page where the customer chooses and buys the item. */
  shopUrl?: string;
  /**
   * A marketing-page price copied from the verified live Fourthwall listing.
   *
   * Fourthwall remains the charge authority. This label must be updated if the
   * live listing changes, and the customer sees the final amount in checkout.
   */
  shopPrice?: string;
  variants: MerchVariantDefinition[];
}

const APPAREL_SIZES = ['S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', '5XL'] as const;

/**
 * Builds the repeated apparel choices while preserving distinct Stripe setup
 * names for each garment. A size must map to its own configured one-time price
 * before that choice can enter a cart.
 */
function buildApparelVariants(productEnvironmentPrefix: string): MerchVariantDefinition[] {
  return APPAREL_SIZES.map((size) => ({
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
    shopUrl:
      'https://sixsmith-games-shop.fourthwall.com/products/master-your-stories-hoodie',
    shopPrice: 'From $44.00',
    variants: buildApparelVariants('MASTER_YOUR_STORIES_HOODIE'),
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
    shopUrl:
      'https://sixsmith-games-shop.fourthwall.com/products/gateway-wyrm-desk-mat',
    shopPrice: '$34.00',
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
