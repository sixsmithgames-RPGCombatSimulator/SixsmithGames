# Screenshot Management with Cloudinary

This project uses Cloudinary to host game screenshots and other large images without committing them to git.

## Setup

### 1. Add your Cloudinary API secret

Copy `.env.example` to `.env.local` and add your Cloudinary API secret:

```bash
cp .env.example .env.local
```

Then edit `.env.local` and update:

```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dxz6khmew
CLOUDINARY_API_KEY=485375942971756
CLOUDINARY_API_SECRET=your_actual_api_secret_here
```

**Important:** Never commit `.env.local` to git! It's already in `.gitignore`.

### 2. Organize your screenshots (SEO-Focused)

Create a local directory (not in git) with screenshots organized by app. **Use descriptive, SEO-friendly filenames:**

```
screenshots/
  vcs/
    vcs-character-sheet-editor-dnd-5e-combat-stats-weapons.png
    vcs-spellbook-page-spellcasting-slots-wizard.png
  contentcraft/
    contentcraft-ai-worldbuilding-npc-generator.png
  fourstargeneral/
    four-star-general-tactical-combat-wwii-hex-strategy-map.png
    four-star-general-supply-management-requisition-screen.png
  gravity/
    gravity-fleet-battle-space-combat.png
  mastertyping/
    mastertyping-typing-practice-speed-test.png
```

**Filename guidelines:**
- Include product name and key feature
- Use descriptive keywords (what's shown, what it does)
- Use lowercase with dashes (kebab-case)
- Avoid spaces, underscores, or generic names like `screenshot-01.png`
- Target 3-6 descriptive words

### 3. Upload screenshots

Run the upload script:

```bash
node scripts/upload-screenshots.js ./screenshots
```

The script will:
- Upload all images to Cloudinary
- Organize them by app name
- Automatically optimize file sizes
- Print out the URLs you can use in your code

## 4. Register screenshots (SEO-Optimized)

After uploading, register each screenshot in `lib/screenshots.ts` with SEO metadata:

```ts
export const productScreenshots = {
  fourStarGeneral: [
    {
      src: 'https://res.cloudinary.com/dxz6khmew/image/upload/f_auto,q_auto,w_1400/sixsmith-games/fourstargeneral/four-star-general-tactical-combat-wwii-hex-strategy-map.jpg',
      alt: 'Four Star General tactical combat screen showing infantry, armor, artillery, and supply units on a WWII hex battlefield',
      caption: 'Command combined arms forces across a readable WWII hex battlefield.',
      width: 1400,
      height: 900,
    },
  ],
};
```

**Registry requirements:**
- Use consistent URL pattern with `f_auto,q_auto,w_1400` transformations
- Write descriptive alt text (10-15 words minimum)
- Include captions for context near the image
- Match screenshot to relevant page copy
- Keep one canonical Cloudinary URL per screenshot across the site so crawlers see stable image references
- Configure Cloudinary in `next.config.ts` `images.remotePatterns` before using remote screenshots with `next/image`

## Using Screenshots in Your App

### Option 1: Direct URL (Simple)

Use the secure URL provided by the upload script:

```tsx
<img
  src="https://res.cloudinary.com/dxz6khmew/image/upload/sixsmith-games/vcs/battle-view-1.png"
  alt="Battle view screenshot"
  width={1200}
  height={800}
/>
```

### Option 2: Screenshot Registry (Recommended for SEO)

Use the centralized registry for consistent URLs, alt text, and captions:

```tsx
import Image from 'next/image';
import { productScreenshots } from '@/lib/screenshots';

// In your page component
const screenshots = productScreenshots.fourStarGeneral;

<section>
  {screenshots.map((shot) => (
    <figure key={shot.src}>
      <Image
        src={shot.src}
        alt={shot.alt}
        width={shot.width}
        height={shot.height}
      />
      <figcaption>{shot.caption}</figcaption>
    </figure>
  ))}
</section>
```

**Benefits:**
- Single source of truth for all screenshots
- SEO metadata (alt, caption) co-located with URLs
- Prevents random hardcoded URLs in components
- Easy to update across the site

### Option 3: Next.js Image Component (Manual)

For one-off images not in the registry:

```tsx
import Image from 'next/image';

<Image
  src="https://res.cloudinary.com/dxz6khmew/image/upload/f_auto,q_auto,w_1400/sixsmith-games/vcs/battle-view-1.jpg"
  alt="Battle view screenshot showing initiative tracker and combat grid"
  width={1400}
  height={900}
/>
```

For normal product-page screenshots, prefer Cloudinary `q_auto` in the URL instead of passing a fixed `quality` prop. Newer Next.js versions validate image quality values, and Cloudinary is already doing the delivery optimization here.

### Option 4: next-cloudinary (Advanced)

For automatic format optimization and transformations:

```bash
npm install next-cloudinary
```

```tsx
import { CldImage } from 'next-cloudinary';

<CldImage
  src="sixsmith-games/vcs/battle-view-1"
  width="1200"
  height="800"
  alt="Battle view screenshot"
  format="auto"
  quality="auto"
/>
```

## On-the-Fly Transformations

Cloudinary can transform images on-the-fly via URL parameters:

```
# Original
https://res.cloudinary.com/dxz6khmew/image/upload/sixsmith-games/vcs/battle.png

# Auto-optimized
https://res.cloudinary.com/dxz6khmew/image/upload/f_auto,q_auto/sixsmith-games/vcs/battle.png

# Resized to 800px wide
https://res.cloudinary.com/dxz6khmew/image/upload/w_800,f_auto,q_auto/sixsmith-games/vcs/battle.png

# Thumbnail (400x300, cropped)
https://res.cloudinary.com/dxz6khmew/image/upload/w_400,h_300,c_fill,f_auto,q_auto/sixsmith-games/vcs/battle.png
```

Common transformations:
- `f_auto` - Auto format (WebP on supported browsers)
- `q_auto` - Auto quality
- `w_800` - Width 800px
- `h_600` - Height 600px
- `c_fill` - Crop to fill dimensions
- `c_fit` - Fit within dimensions

## Benefits

✓ **No git bloat** - Large images stay out of your repository
✓ **Fast delivery** - Cloudinary's global CDN
✓ **Auto optimization** - Automatic WebP, quality tuning
✓ **Responsive images** - Generate any size on demand
✓ **Free tier** - 25GB storage, 25GB bandwidth/month

## Example: Adding Screenshots to Four Star General Page

1. Upload screenshots:
   ```bash
   node scripts/upload-screenshots.js ./screenshots
   ```

2. Copy the URLs from the output

3. Add to your page component:
   ```tsx
   <section style={{padding: '80px 0', background: 'white'}}>
     <div style={{maxWidth: '1280px', margin: '0 auto', padding: '0 2rem'}}>
       <h2 style={{fontSize: '2rem', marginBottom: '2rem'}}>
         See It In Action
       </h2>
       <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem'}}>
         <Image
           src="https://res.cloudinary.com/dxz6khmew/image/upload/f_auto,q_auto/sixsmith-games/fourstargeneral/strategic-map.png"
           alt="Strategic campaign map"
           width={1200}
           height={800}
           style={{borderRadius: '12px', width: '100%', height: 'auto'}}
         />
         <Image
           src="https://res.cloudinary.com/dxz6khmew/image/upload/f_auto,q_auto/sixsmith-games/fourstargeneral/tactical-combat.png"
           alt="Tactical combat view"
           width={1200}
           height={800}
           style={{borderRadius: '12px', width: '100%', height: 'auto'}}
         />
       </div>
     </div>
   </section>
   ```

## Cloudinary Dashboard

View all your uploaded images at:
https://console.cloudinary.com/console/c-dxz6khmew/media_library/folders/sixsmith-games

## Updating Screenshots

To replace a screenshot, just run the upload script again. It will overwrite the existing file with the same name.
