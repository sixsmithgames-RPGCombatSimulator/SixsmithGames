/**
 * Generates the revised high-resolution artwork used for Fourthwall mockups.
 *
 * Mike rejected the first geometric-die hoodie marks and utility-grid desk
 * mat. This revision uses the real Sixsmith Games logo on the hoodie and an
 * original cinematic dungeon panorama on the mat. Source files and placement
 * values remain explicit so every supplier upload can be reproduced without
 * relying on undocumented editor state.
 *
 * The third-round hoodie artwork also creates and verifies a permanent QR code
 * for SixsmithGames.com. The QR is generated locally, has no paid or expiring
 * redirect, and is decoded during every build so a broken destination cannot
 * silently reach the print file.
 */

import { readFileSync } from 'node:fs';
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

import jsQR from 'jsqr';
import opentype from 'opentype.js';
import QRCode from 'qrcode';
import sharp from 'sharp';

const SCRIPT_DIRECTORY = path.dirname(fileURLToPath(import.meta.url));
const REPOSITORY_ROOT = path.resolve(SCRIPT_DIRECTORY, '..');
const OUTPUT_DIRECTORY = path.join(
  REPOSITORY_ROOT,
  'assets',
  'merch',
  'fourthwall',
);
const LOGO_PATH = path.join(
  REPOSITORY_ROOT,
  'public',
  'icons',
  'sixsmith-logo.png',
);
const FANTASY_FONT_PATH = path.join(
  REPOSITORY_ROOT,
  'assets',
  'merch',
  'fonts',
  'cinzel-decorative',
  'CinzelDecorative-Black.ttf',
);
const DUNGEON_PANORAMA_PATH = path.join(
  OUTPUT_DIRECTORY,
  'source',
  'initiative-desk-mat-dungeon-panorama-v3-limbless-wyrm.png',
);
const WEBSITE_DISPLAY_TEXT = 'SIXSMITHGAMES.COM';
const WEBSITE_QR_URL = 'https://sixsmithgames.com/';

const fantasyFontBuffer = readFileSync(FANTASY_FONT_PATH);
const fantasyFont = opentype.parse(
  fantasyFontBuffer.buffer.slice(
    fantasyFontBuffer.byteOffset,
    fantasyFontBuffer.byteOffset + fantasyFontBuffer.byteLength,
  ),
);

/**
 * Hoodie colors mirror the parchment, brass, and blue-light palette used by
 * GameMaster Studio. The desk-mat palette lives in its approved source image.
 */
const COLORS = {
  white: '#ffffff',
  parchment: '#f5ead2',
  mutedParchment: '#c9bda7',
  brass: '#d7a548',
  warmBrass: '#f0c56a',
  blue: '#4a9cdb',
};

/**
 * Escapes text before placing it inside SVG markup.
 *
 * The current phrases are controlled source strings. Keeping this helper makes
 * future revisions safe if approved copy contains SVG-sensitive characters.
 */
function escapeSvgText(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

/**
 * Converts one centered line of lettering into SVG path geometry.
 *
 * Fourthwall still receives a high-resolution transparent PNG, but the source
 * lockup is built from glyph outlines rather than a live SVG text element.
 * This keeps the decorative lettering deterministic on every machine and
 * prevents a supplier renderer from substituting a plain fallback font.
 */
function centeredLetterPath(text, { centerX, baseline, fontSize }) {
  const unpositionedPath = fantasyFont.getPath(text, 0, baseline, fontSize, {
    kerning: true,
  });
  const bounds = unpositionedPath.getBoundingBox();
  const left = centerX - (bounds.x1 + bounds.x2) / 2;
  const positionedPath = fantasyFont.getPath(text, left, baseline, fontSize, {
    kerning: true,
  });

  return positionedPath.toPathData(2);
}

/**
 * Builds the transparent typography layer for the hoodie front.
 *
 * The real Sixsmith Games logo is added separately so it remains faithful to
 * the owner-controlled raster source. The corrected `GAMEMASTER` spelling is
 * used here as well as on the back. The former horizontal rule is removed so
 * the compact chest mark does not contain an unnecessary visual divider.
 */
function hoodieFrontSvg() {
  const width = 2400;
  const height = 1800;

  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <text x="1200" y="1170" text-anchor="middle"
            fill="${COLORS.parchment}"
            font-family="Arial, Helvetica, sans-serif"
            font-size="185"
            font-weight="800"
            letter-spacing="18">GAMEMASTER</text>
      <text x="1200" y="1515" text-anchor="middle"
            fill="${COLORS.warmBrass}"
            font-family="Georgia, 'Times New Roman', serif"
            font-size="300"
            font-weight="700"
            letter-spacing="38">STUDIO</text>
    </svg>
  `;
}

/**
 * Builds the transparent vector-art layer for the hoodie back.
 *
 * The current back layout follows Mike's message-first hierarchy:
 *
 * 1. `MASTER YOUR STORIES` is an outlined decorative wordmark rather than a
 *    live text element. Brass, blue, and parchment echo the crest without
 *    sacrificing distance readability.
 * 2. `GAMEMASTER STUDIO` is also converted to paths and sits immediately
 *    below the wordmark.
 * 3. The real Sixsmith Games logo occupies the middle of the composition.
 * 4. The old horizontal rule and spelled-out publisher line are absent.
 * 5. The permanent website address anchors the bottom of the print.
 *
 * The two lettering lines sit as one compact lockup just above the crest.
 * Small symmetrical star and rune strokes provide the magical character; they
 * remain supporting details so the phrase still reads at storefront size.
 *
 * The verified QR is composited separately below the website address so it
 * remains pixel-perfect rather than being approximated inside SVG markup.
 * This bottom placement keeps the QR in a supporting utility role instead of
 * interrupting the primary logo, tagline, and product-name hierarchy.
 */
function hoodieBackSvg() {
  const width = 4200;
  const height = 5000;
  const titlePaths = [
    centeredLetterPath('MASTER', {
      centerX: 935,
      baseline: 1260,
      fontSize: 245,
    }),
    centeredLetterPath('YOUR', {
      centerX: 2112,
      baseline: 1260,
      fontSize: 245,
    }),
    centeredLetterPath('STORIES', {
      centerX: 3278,
      baseline: 1260,
      fontSize: 245,
    }),
  ];
  const productPaths = [
    centeredLetterPath('GAMEMASTER', {
      centerX: 1687,
      baseline: 1515,
      fontSize: 155,
    }),
    centeredLetterPath('STUDIO', {
      centerX: 2804,
      baseline: 1515,
      fontSize: 155,
    }),
  ];

  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <defs>
        <linearGradient id="wordmark-gold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="${COLORS.white}" />
          <stop offset="0.48" stop-color="${COLORS.parchment}" />
          <stop offset="1" stop-color="${COLORS.warmBrass}" />
        </linearGradient>
      </defs>

      <g fill="none"
         stroke="${COLORS.blue}"
         stroke-opacity="0.82"
         stroke-width="34"
         stroke-linejoin="round">
        ${titlePaths.map((titlePath) => `<path d="${titlePath}" />`).join('\n')}
      </g>
      <g fill="url(#wordmark-gold)"
         stroke="${COLORS.brass}"
         stroke-width="13"
         stroke-linejoin="round"
         paint-order="stroke fill">
        ${titlePaths.map((titlePath) => `<path d="${titlePath}" />`).join('\n')}
      </g>

      <g fill="none" stroke="${COLORS.warmBrass}" stroke-linecap="round" stroke-linejoin="round">
        <path d="M155 1165 C225 1088 292 1050 382 1038 M155 1165 C225 1242 292 1280 382 1292" stroke-width="16" />
        <path d="M4045 1165 C3975 1088 3908 1050 3818 1038 M4045 1165 C3975 1242 3908 1280 3818 1292" stroke-width="16" />
        <path d="M126 1165 L155 1136 L184 1165 L155 1194 Z" fill="${COLORS.blue}" stroke-width="10" />
        <path d="M4074 1165 L4045 1136 L4016 1165 L4045 1194 Z" fill="${COLORS.blue}" stroke-width="10" />
      </g>

      <g fill="${COLORS.warmBrass}">
        <path d="M2100 900 L2120 947 L2167 967 L2120 987 L2100 1034 L2080 987 L2033 967 L2080 947 Z" />
        <circle cx="1984" cy="967" r="12" fill="${COLORS.blue}" />
        <circle cx="2216" cy="967" r="12" fill="${COLORS.blue}" />
      </g>

      <g fill="${COLORS.parchment}"
         stroke="#162d46"
         stroke-width="10"
         stroke-linejoin="round"
         paint-order="stroke fill">
        ${productPaths.map((productPath) => `<path d="${productPath}" />`).join('\n')}
      </g>
      <path d="M1180 1582 C1505 1548 1750 1550 1920 1584 L2100 1618 L2280 1584 C2450 1550 2695 1548 3020 1582"
            fill="none"
            stroke="${COLORS.warmBrass}"
            stroke-width="12"
            stroke-linecap="round" />
      <path d="M2072 1618 L2100 1590 L2128 1618 L2100 1646 Z"
            fill="${COLORS.blue}"
            stroke="${COLORS.warmBrass}"
            stroke-width="8" />

      <text x="2100" y="4075" text-anchor="middle"
            fill="${COLORS.white}"
            font-family="Arial, Helvetica, sans-serif"
            font-size="180"
            font-weight="800"
            letter-spacing="18">${escapeSvgText(WEBSITE_DISPLAY_TEXT)}</text>
    </svg>
  `;
}

/**
 * Creates a conventional, high-contrast QR code and proves that it scans.
 *
 * Error-correction level H gives the code the strongest standard recovery
 * margin. The four-module quiet zone and light parchment field are retained
 * because a transparent or inverted code on a black hoodie is less reliably
 * recognized by phone cameras. The owner-approved 480-pixel size represents
 * 1.6 inches at the file's 300-DPI production density.
 *
 * The rendered PNG is decoded immediately with jsQR. Generation stops with a
 * readable error if the decoder cannot recover the exact secure destination.
 */
async function createVerifiedWebsiteQrCode() {
  const qrCode = await QRCode.toBuffer(WEBSITE_QR_URL, {
    type: 'png',
    errorCorrectionLevel: 'H',
    margin: 4,
    width: 480,
    color: {
      dark: '#101010',
      light: COLORS.parchment,
    },
  });

  const {
    data: rawPixels,
    info: { width, height },
  } = await sharp(qrCode)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const decodedQrCode = jsQR(
    new Uint8ClampedArray(rawPixels),
    width,
    height,
  );

  if (decodedQrCode?.data !== WEBSITE_QR_URL) {
    throw new Error(
      `QR verification failed: expected ${WEBSITE_QR_URL} but decoded ${
        decodedQrCode?.data ?? 'nothing'
      }.`,
    );
  }

  return qrCode;
}

/**
 * Renders one transparent hoodie print while compositing the real logo.
 *
 * Keeping logo dimensions and coordinates here makes the supplier placement
 * deterministic. The output remains transparent so black comes from the
 * garment itself rather than a visible rectangular ink panel. Optional
 * additional layers make the verified back QR explicit without changing the
 * simpler front artwork.
 */
async function renderHoodieArtwork({
  svg,
  outputName,
  logoWidth,
  logoHeight,
  logoLeft,
  logoTop,
  additionalLayers = [],
}) {
  const logo = await sharp(LOGO_PATH)
    .resize({ width: logoWidth, height: logoHeight, fit: 'contain' })
    .png()
    .toBuffer();
  const outputPath = path.join(OUTPUT_DIRECTORY, outputName);

  await sharp(Buffer.from(svg))
    .composite([
      {
        input: logo,
        left: logoLeft,
        top: logoTop,
      },
      ...additionalLayers,
    ])
    .png({ compressionLevel: 9 })
    .withMetadata({ density: 300 })
    .toFile(outputPath);

  return outputPath;
}

/**
 * Renders the cinematic dungeon panorama on Fourthwall's full bleed canvas.
 *
 * Fourthwall's advertised 31.5 by 15.5-inch mat uses a larger 33.07 by
 * 17.32-inch supplier canvas. The 9,921 by 5,196-pixel output covers that
 * entire canvas at 300 DPI. Important figures were composed away from the
 * outside trim, and the logo sits inside the finished-product safe area.
 *
 * The source illustration is an original OpenAI-generated asset created for
 * Sixsmith Games. Version three removes the earlier ambiguous right-side
 * forelimb so the central creature reads as one limbless serpentine wyrm.
 * It contains no named game system, licensed character, setting, logo, rules
 * table, grid, or readable fantasy text.
 */
async function renderDeskMatArtwork() {
  const canvasWidth = 9921;
  const canvasHeight = 5196;
  const finishedWidth = 9450;
  const finishedHeight = 4650;
  const finishedLeft = Math.round((canvasWidth - finishedWidth) / 2);
  const finishedTop = Math.round((canvasHeight - finishedHeight) / 2);
  const logoWidth = 900;
  const logoHeight = 875;
  const logoInsetRight = 180;
  const logoInsetBottom = 150;

  /*
   * The source is enlarged with a high-quality Lanczos resample. Brightness and
   * saturation receive a restrained eight-percent lift because dye sublimation
   * can darken already-shadowy artwork. A finishing sharpen then restores edge
   * definition. None of these steps replaces physical sample inspection.
   */
  const panorama = await sharp(DUNGEON_PANORAMA_PATH)
    .resize({
      width: canvasWidth,
      height: canvasHeight,
      fit: 'cover',
      position: 'centre',
      kernel: sharp.kernel.lanczos3,
    })
    .modulate({ brightness: 1.08, saturation: 1.08 })
    .sharpen()
    .png()
    .toBuffer();

  const logo = await sharp(LOGO_PATH)
    .resize({ width: logoWidth, height: logoHeight, fit: 'contain' })
    .png()
    .toBuffer();

  const outputPath = path.join(
    OUTPUT_DIRECTORY,
    'dungeon-screen-desk-mat-fourthwall-v3-limbless-wyrm-print-lift-9921x5196.png',
  );

  await sharp(panorama)
    .composite([
      {
        input: logo,
        left:
          finishedLeft +
          finishedWidth -
          logoWidth -
          logoInsetRight,
        top:
          finishedTop +
          finishedHeight -
          logoHeight -
          logoInsetBottom,
      },
    ])
    .png({ compressionLevel: 9 })
    .withMetadata({ density: 300 })
    .toFile(outputPath);

  return outputPath;
}

/**
 * Generates the complete second-round approval set.
 */
async function main() {
  await mkdir(OUTPUT_DIRECTORY, { recursive: true });
  await mkdir(path.join(OUTPUT_DIRECTORY, 'source'), { recursive: true });
  const websiteQrCode = await createVerifiedWebsiteQrCode();
  const hoodieBackVector = hoodieBackSvg();
  const hoodieBackVectorPath = path.join(
    OUTPUT_DIRECTORY,
    'source',
    'master-your-stories-hoodie-back-vector-lockup-v8.svg',
  );
  await writeFile(hoodieBackVectorPath, hoodieBackVector.trim(), 'utf8');

  const generatedFiles = await Promise.all([
    renderHoodieArtwork({
      svg: hoodieFrontSvg(),
      outputName: 'session-zero-hoodie-front-logo-v3-2400x1800.png',
      logoWidth: 700,
      logoHeight: 681,
      logoLeft: 850,
      logoTop: 70,
    }),
    renderHoodieArtwork({
      svg: hoodieBackVector,
      outputName: 'master-your-stories-hoodie-back-vector-lockup-v8-4200x5000.png',
      logoWidth: 2300,
      logoHeight: 2238,
      logoLeft: 950,
      // Pull the wordmark, product line, and crest into one compact lockup.
      logoTop: 1640,
      additionalLayers: [
        {
          input: websiteQrCode,
          // Center the 480-pixel code and leave a 170-pixel bottom margin.
          left: 1860,
          top: 4350,
        },
      ],
    }),
    renderDeskMatArtwork(),
  ]);

  for (const generatedFile of generatedFiles) {
    console.log(generatedFile);
  }
  console.log(hoodieBackVectorPath);
}

await main();
