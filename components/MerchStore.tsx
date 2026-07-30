/**
 * Interactive merchandise catalog and cart.
 *
 * Product truth and verified prices arrive from the server. Live launch items
 * go to Fourthwall, which owns their variants, cart, and final checkout amount.
 * The guarded local cart remains available for a future fulfillment path
 * without competing with Fourthwall today.
 */

'use client';

import { useEffect, useMemo, useState, useTransition } from 'react';

import { trackMarketingEvent } from '@/lib/analytics';
import type {
  MerchStorefront,
  StorefrontMerchProduct,
  StorefrontMerchVariant,
} from '@/lib/merchStorefront.server';
import MerchArtwork from './MerchArtwork';
import styles from './MerchStore.module.css';

const CART_STORAGE_KEY = 'sixsmith_merch_cart:v1';
const MAX_ITEM_QUANTITY = 10;

interface MerchStoreProps {
  storefront: MerchStorefront;
  checkoutStatus: 'confirmed' | 'unconfirmed' | 'cancelled' | null;
}

interface CartLine {
  productSlug: string;
  variantId: string;
  quantity: number;
}

/**
 * Locates one cart choice in the server-provided catalog.
 *
 * Returning null keeps stale local carts from displaying products or variants
 * that are no longer configured for sale.
 */
function findCartChoice(
  products: StorefrontMerchProduct[],
  line: CartLine,
): { product: StorefrontMerchProduct; variant: StorefrontMerchVariant } | null {
  const product = products.find((candidate) => candidate.slug === line.productSlug);
  const variant = product?.variants.find(
    (candidate) => candidate.id === line.variantId && candidate.purchasable,
  );

  return product && variant ? { product, variant } : null;
}

/**
 * Restores only well-formed, currently purchasable cart lines from the browser.
 *
 * The cart contains stable product choices and quantities only—never a name,
 * address, email, payment detail, or trusted price.
 */
function readSavedCart(products: StorefrontMerchProduct[]): CartLine[] {
  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];

    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed.flatMap((candidate) => {
      if (
        typeof candidate !== 'object'
        || candidate === null
        || !('productSlug' in candidate)
        || !('variantId' in candidate)
        || !('quantity' in candidate)
        || typeof candidate.productSlug !== 'string'
        || typeof candidate.variantId !== 'string'
        || typeof candidate.quantity !== 'number'
      ) {
        return [];
      }

      const line: CartLine = {
        productSlug: candidate.productSlug,
        variantId: candidate.variantId,
        quantity: Math.min(
          MAX_ITEM_QUANTITY,
          Math.max(1, Math.floor(candidate.quantity)),
        ),
      };

      return findCartChoice(products, line) ? [line] : [];
    });
  } catch (error) {
    console.warn('The saved merchandise cart could not be read and was ignored.', error);
    return [];
  }
}

/**
 * Displays the gamer-facing catalog and keeps all payment decisions on the server.
 */
export default function MerchStore({ storefront, checkoutStatus }: MerchStoreProps) {
  const categories = useMemo(
    () => ['All gear', ...new Set(storefront.products.map((product) => product.category))],
    [storefront.products],
  );
  const initialSelections = useMemo(
    () =>
      Object.fromEntries(
        storefront.products.map((product) => [
          product.slug,
          product.variants.find((variant) => variant.purchasable)?.id
            ?? product.variants[0]?.id
            ?? '',
        ]),
      ),
    [storefront.products],
  );
  const [activeCategory, setActiveCategory] = useState('All gear');
  const [selectedVariants, setSelectedVariants] =
    useState<Record<string, string>>(initialSelections);
  const [cart, setCart] = useState<CartLine[]>([]);
  const [cartLoaded, setCartLoaded] = useState(false);
  const [checkoutStarting, startCheckoutTransition] = useTransition();
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  useEffect(() => {
    if (!storefront.checkoutReady) {
      // Preserve an existing saved cart during a temporary store closure. It
      // can be validated again when ordering reopens, but it must not appear
      // actionable while fulfillment is paused.
      setCart([]);
      setCartLoaded(false);
      return;
    }

    setCart(readSavedCart(storefront.products));
    setCartLoaded(true);
  }, [storefront.checkoutReady, storefront.products]);

  useEffect(() => {
    if (checkoutStatus !== 'confirmed') return;

    // A completed Checkout return starts a fresh cart. Stripe remains the
    // payment authority; this only prevents an accidental duplicate order from
    // a stale browser cart.
    setCart([]);
    try {
      window.localStorage.removeItem(CART_STORAGE_KEY);
    } catch (error) {
      console.warn('The completed merchandise cart could not be cleared.', error);
    }
  }, [checkoutStatus]);

  useEffect(() => {
    if (!cartLoaded) return;

    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (error) {
      console.warn('The merchandise cart could not be saved in this browser.', error);
    }
  }, [cart, cartLoaded]);

  const visibleProducts = storefront.products.filter(
    (product) => activeCategory === 'All gear' || product.category === activeCategory,
  );
  const cartDetails = cart.flatMap((line) => {
    const choice = findCartChoice(storefront.products, line);
    return choice ? [{ ...line, ...choice }] : [];
  });
  const cartCount = cartDetails.reduce((total, line) => total + line.quantity, 0);
  const cartTotal = cartDetails.reduce(
    (total, line) => total + (line.variant.unitAmount ?? 0) * line.quantity,
    0,
  );
  const cartCurrency = cartDetails[0]?.variant.currency ?? 'usd';
  const formattedCartTotal = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: cartCurrency.toUpperCase(),
  }).format(cartTotal / 100);

  /** Records the visible category choice without attaching visitor identity. */
  function chooseCategory(category: string) {
    setActiveCategory(category);
    trackMarketingEvent('merch_category_selected', {
      category: category.toLowerCase().replaceAll(' ', '_'),
    });
  }

  /** Adds or increments one verified product choice, capped at a practical amount. */
  function addToCart(product: StorefrontMerchProduct) {
    const variantId = selectedVariants[product.slug];
    const variant = product.variants.find(
      (candidate) => candidate.id === variantId && candidate.purchasable,
    );
    if (!variant) return;

    setCart((current) => {
      const existing = current.find(
        (line) => line.productSlug === product.slug && line.variantId === variant.id,
      );
      if (existing) {
        return current.map((line) =>
          line === existing
            ? { ...line, quantity: Math.min(MAX_ITEM_QUANTITY, line.quantity + 1) }
            : line,
        );
      }

      return [
        ...current,
        {
          productSlug: product.slug,
          variantId: variant.id,
          quantity: 1,
        },
      ];
    });
    setCheckoutError(null);
    trackMarketingEvent('merch_item_added', {
      product: product.slug,
      variant: variant.id,
    });
  }

  /** Changes a cart quantity or removes the line when the requested count is zero. */
  function updateQuantity(line: CartLine, nextQuantity: number) {
    if (nextQuantity <= 0) {
      setCart((current) =>
        current.filter(
          (candidate) =>
            candidate.productSlug !== line.productSlug
            || candidate.variantId !== line.variantId,
        ),
      );
      trackMarketingEvent('merch_item_removed', {
        product: line.productSlug,
        variant: line.variantId,
      });
      return;
    }

    setCart((current) =>
      current.map((candidate) =>
        candidate.productSlug === line.productSlug
        && candidate.variantId === line.variantId
          ? {
              ...candidate,
              quantity: Math.min(MAX_ITEM_QUANTITY, nextQuantity),
            }
          : candidate,
      ),
    );
  }

  /** Starts server-validated Stripe Checkout for the current local cart. */
  async function beginCheckout() {
    if (!storefront.checkoutReady || cartDetails.length === 0 || checkoutStarting) return;

    setCheckoutError(null);
    trackMarketingEvent('merch_checkout_started', {
      item_count: cartCount,
      distinct_item_count: cartDetails.length,
    });

    try {
      const response = await fetch('/api/merch-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cartDetails.map((line) => ({
            productSlug: line.productSlug,
            variantId: line.variantId,
            quantity: line.quantity,
          })),
        }),
      });
      const data: unknown = await response.json();
      const checkoutUrl =
        typeof data === 'object'
        && data !== null
        && 'url' in data
        && typeof data.url === 'string'
          ? data.url
          : null;

      if (!response.ok || !checkoutUrl) {
        throw new Error('The shop could not open secure checkout.');
      }

      window.location.assign(checkoutUrl);
    } catch (error) {
      console.error('Merchandise checkout could not start.', error);
      setCheckoutError(
        'Secure checkout did not open. Your cart is still here, so you can try again.',
      );
      trackMarketingEvent('merch_checkout_failed', {
        item_count: cartCount,
      });
    }
  }

  return (
    <div className={styles.store}>
      {checkoutStatus === 'confirmed' && (
        <div className={styles.successBanner} role="status">
          <strong>Order confirmed.</strong>
          <span>Keep the Stripe confirmation with your order details.</span>
        </div>
      )}
      {checkoutStatus === 'unconfirmed' && (
        <div className={styles.reviewBanner} role="alert">
          <strong>We could not confirm an order from this link.</strong>
          <span>Check for a Stripe confirmation before trying again. Your saved cart was not cleared.</span>
        </div>
      )}
      {checkoutStatus === 'cancelled' && (
        <div className={styles.cancelBanner} role="status">
          <strong>Checkout closed without an order.</strong>
          <span>Nothing was charged, and your cart is still here.</span>
        </div>
      )}

      <div className={styles.storeToolbar}>
        <div className={styles.filters} role="group" aria-label="Filter merchandise">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={activeCategory === category ? styles.activeFilter : undefined}
              aria-pressed={activeCategory === category}
              onClick={() => chooseCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
        {storefront.checkoutReady ? (
          <a href="#merch-cart" className={styles.cartJump}>
            Cart <span aria-label={`${cartCount} items`}>{cartCount}</span>
          </a>
        ) : (
          <p className={styles.previewCount} role="status">
            {visibleProducts.length}{' '}
            {storefront.ordersOpen
              ? visibleProducts.length === 1
                ? 'product ready'
                : 'products ready'
              : visibleProducts.length === 1
                ? 'design in view'
                : 'designs in view'}
          </p>
        )}
      </div>

      <div
        className={`${styles.shopLayout} ${
          storefront.checkoutReady ? '' : styles.previewLayout
        }`}
      >
        <div className={styles.productGrid}>
          {visibleProducts.map((product, index) => {
            const purchasableVariants = product.variants.filter(
              (variant) => variant.purchasable,
            );
            const selectedVariant = selectedVariants[product.slug];
            const voteSubject = encodeURIComponent(`Merch pick: ${product.name}`);
            const voteBody = encodeURIComponent(
              `My pick for the first Sixsmith Games merchandise batch is the ${product.name}.`,
            );

            return (
              <article key={product.slug} id={product.slug} className={styles.productCard}>
                <MerchArtwork
                  kind={product.artwork}
                  name={product.name}
                  accent={product.accent}
                  priority={index === 0}
                />
                <div className={styles.productCopy}>
                  <div className={styles.cardTopline}>
                    <span>{product.category}</span>
                    <strong>{product.badge}</strong>
                  </div>
                  <h2>{product.name}</h2>
                  <p className={styles.tableLine}>{product.tableLine}</p>
                  <p>{product.description}</p>

                  <div className={styles.designNote}>
                    <strong>{product.shopUrl ? 'What you get' : 'The planned design'}</strong>
                    <span>{product.design}</span>
                  </div>

                  <ul className={styles.plannedChoices}>
                    {product.plannedChoices.map((choice) => (
                      <li key={choice}>{choice}</li>
                    ))}
                  </ul>

                  <div className={styles.priceRow}>
                    <strong>
                      {product.shopPrice
                        ?? product.startingPrice
                        ?? 'Final price comes before orders open'}
                    </strong>
                    {product.shopUrl ? (
                      <span>Final total in Fourthwall checkout</span>
                    ) : (
                      !product.purchasable && <span>Preview only</span>
                    )}
                  </div>

                  {product.shopUrl ? (
                    <a
                      className={styles.shopLink}
                      href={product.shopUrl}
                      onClick={() =>
                        trackMarketingEvent('merch_shop_opened', {
                          product: product.slug,
                          provider: 'fourthwall',
                        })
                      }
                    >
                      Choose your options in the shop
                    </a>
                  ) : product.purchasable ? (
                    <div className={styles.purchaseRow}>
                      <label>
                        <span>Choose an option</span>
                        <select
                          value={selectedVariant}
                          onChange={(event) =>
                            setSelectedVariants((current) => ({
                              ...current,
                              [product.slug]: event.target.value,
                            }))
                          }
                        >
                          {purchasableVariants.map((variant) => (
                            <option key={variant.id} value={variant.id}>
                              {variant.label}
                              {variant.formattedPrice ? ` — ${variant.formattedPrice}` : ''}
                            </option>
                          ))}
                        </select>
                      </label>
                      <button type="button" onClick={() => addToCart(product)}>
                        Add to cart
                      </button>
                    </div>
                  ) : (
                    <a
                      className={styles.voteLink}
                      href={`mailto:info@sixsmithgames.com?subject=${voteSubject}&body=${voteBody}`}
                      onClick={() =>
                        trackMarketingEvent('merch_interest_shared', {
                          product: product.slug,
                        })
                      }
                    >
                      Tell us to make this one first
                    </a>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        {storefront.checkoutReady && (
          <aside id="merch-cart" className={styles.cart} aria-labelledby="cart-heading">
            <div className={styles.cartHeading}>
              <div>
                <p>Your game-night gear</p>
                <h2 id="cart-heading">Cart</h2>
              </div>
              <span>{cartCount}</span>
            </div>

            {cartDetails.length === 0 ? (
            <div className={styles.emptyCart}>
              <strong>Your cart is waiting.</strong>
              <p>Add the game-night gear you want to take home.</p>
            </div>
          ) : (
            <>
              <ul className={styles.cartLines}>
                {cartDetails.map((line) => (
                  <li key={`${line.productSlug}:${line.variantId}`}>
                    <div>
                      <strong>{line.product.name}</strong>
                      <span>
                        {line.variant.label}
                        {line.variant.formattedPrice
                          ? ` · ${line.variant.formattedPrice}`
                          : ''}
                      </span>
                    </div>
                    <div className={styles.quantity}>
                      <button
                        type="button"
                        aria-label={`Remove one ${line.product.name}`}
                        onClick={() => updateQuantity(line, line.quantity - 1)}
                      >
                        −
                      </button>
                      <span aria-label={`Quantity ${line.quantity}`}>{line.quantity}</span>
                      <button
                        type="button"
                        aria-label={`Add one ${line.product.name}`}
                        onClick={() => updateQuantity(line, line.quantity + 1)}
                        disabled={line.quantity >= MAX_ITEM_QUANTITY}
                      >
                        +
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <div className={styles.cartTotal}>
                <span>Items</span>
                <strong>{formattedCartTotal}</strong>
              </div>
              <p className={styles.shippingNote}>
                Shipping and any tax are shown in secure checkout before you pay.
              </p>
              {checkoutError && (
                <p className={styles.checkoutError} role="alert">{checkoutError}</p>
              )}
              <button
                type="button"
                className={styles.checkoutButton}
                disabled={checkoutStarting}
                onClick={() => {
                  startCheckoutTransition(async () => {
                    await beginCheckout();
                  });
                }}
              >
                {checkoutStarting ? 'Opening secure checkout…' : 'Go to secure checkout'}
              </button>
            </>
            )}
          </aside>
        )}
      </div>
    </div>
  );
}
