/**
 * Brand-safe merchandise product artwork.
 *
 * Approved launch products use the same Fourthwall mockups that the owner
 * reviewed. The vector fallback remains available for future concepts, but a
 * concept must never be labeled as a finished product.
 */

import Image from 'next/image';
import type { CSSProperties, ReactNode } from 'react';

import type { MerchArtworkKind } from '@/lib/merchCatalog';
import styles from './MerchArtwork.module.css';

interface MerchArtworkProps {
  kind: MerchArtworkKind;
  name: string;
  accent: string;
  priority?: boolean;
}

/**
 * Maps a product shape to its owner-approved Cloudinary listing mockup.
 *
 * The stable public IDs keep large image files out of Git while Cloudinary
 * handles responsive format and quality selection for the visitor's browser.
 */
const APPROVED_PRODUCT_MOCKUPS: Partial<Record<MerchArtworkKind, string>> = {
  hoodie:
    'https://res.cloudinary.com/dxz6khmew/image/upload/e_trim:10/f_auto,q_auto,w_1400/v1785444317/sixsmith-games/merch/master-your-stories-hoodie-back-black-fourthwall.jpg',
  'desk-mat':
    'https://res.cloudinary.com/dxz6khmew/image/upload/e_trim:10/f_auto,q_auto,w_1400/v1785444314/sixsmith-games/merch/gateway-wyrm-desk-mat-dungeon-portal-fourthwall.jpg',
};

/**
 * Draws a familiar product outline without depending on unfinished photography.
 * Every shape is decorative because the product name is written beside it.
 */
function ProductSilhouette({ kind }: { kind: MerchArtworkKind }): ReactNode {
  if (kind === 'tee') {
    return (
      <path d="M116 72 81 91 44 75 18 116l35 21v125h126V137l35-21-26-41-37 16-35-19Z" />
    );
  }

  if (kind === 'hoodie') {
    return (
      <>
        <path d="M116 50c-33 0-55 21-55 52v11L31 133l26 40v89h118v-89l26-40-30-20v-11c0-31-22-52-55-52Z" />
        <path className={styles.line} d="M80 103c20 16 52 16 72 0M116 118v144" />
      </>
    );
  }

  if (kind === 'mug') {
    return (
      <>
        <path d="M46 91h121v132c0 25-20 45-45 45H91c-25 0-45-20-45-45V91Z" />
        <path className={styles.handle} d="M166 118h19c29 0 40 22 40 45s-13 43-42 43h-16" />
      </>
    );
  }

  if (kind === 'journal') {
    return (
      <>
        <rect x="47" y="49" width="140" height="218" rx="10" />
        <path className={styles.line} d="M72 49v218M82 86h75M82 103h58" />
      </>
    );
  }

  if (kind === 'stickers') {
    return (
      <>
        <rect x="34" y="40" width="164" height="228" rx="14" />
        <circle cx="88" cy="103" r="34" />
        <path d="m152 71 30 18-6 35-35 6-18-30 29-29Z" />
        <circle cx="151" cy="196" r="37" />
        <path d="m67 166 31 31-31 31-31-31 31-31Z" />
      </>
    );
  }

  return (
    <>
      <rect x="18" y="63" width="198" height="174" rx="14" />
      <path
        className={styles.grid}
        d="M51 63v174M84 63v174M117 63v174M150 63v174M183 63v174M18 98h198M18 133h198M18 168h198M18 203h198"
      />
    </>
  );
}

/**
 * Renders one polished design-preview panel with a real brand mark.
 *
 * The priority flag is used only for artwork that appears near the top of the
 * store, preventing every catalog image from competing for first paint.
 */
export default function MerchArtwork({
  kind,
  name,
  accent,
  priority = false,
}: MerchArtworkProps) {
  const artworkStyle = {
    '--merch-accent': accent,
  } as CSSProperties;
  const approvedMockup = APPROVED_PRODUCT_MOCKUPS[kind];
  const productAlt =
    kind === 'hoodie'
      ? 'Back of the black Master Your Stories Hoodie with the Sixsmith Games crest'
      : 'Gateway Wyrm Desk Mat with adventurers facing a blue-lit dungeon portal';

  return (
    <div
      className={`${styles.artwork} ${
        approvedMockup ? styles.approvedArtwork : ''
      }`}
      style={artworkStyle}
      role={approvedMockup ? undefined : 'img'}
      aria-label={approvedMockup ? undefined : `${name} design preview`}
    >
      {!approvedMockup && (
        <div className={styles.previewLabel}>Design preview</div>
      )}
      {approvedMockup ? (
        <Image
          className={styles.approvedMockup}
          src={approvedMockup}
          alt={productAlt}
          fill
          priority={priority}
          sizes="(max-width: 800px) 100vw, 50vw"
        />
      ) : (
        <>
          <div className={styles.glow} aria-hidden="true" />
          <div
            className={`${styles.silhouetteWrap} ${styles[kind]}`}
            aria-hidden="true"
          >
            <svg
              className={styles.silhouette}
              viewBox="0 0 234 300"
            >
              <ProductSilhouette kind={kind} />
            </svg>
          </div>
          <div className={styles.brandMark} aria-hidden="true">
            <Image
              src="/icons/sixsmith-logo.png"
              alt=""
              width={78}
              height={78}
              priority={priority}
              sizes="78px"
            />
          </div>
          <p aria-hidden="true">{name}</p>
        </>
      )}
    </div>
  );
}
