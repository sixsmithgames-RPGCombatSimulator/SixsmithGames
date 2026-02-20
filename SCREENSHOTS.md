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

### 2. Organize your screenshots

Create a local directory (not in git) with your screenshots organized by app:

```
screenshots/
  vcs/
    battle-view-1.png
    initiative-tracker.png
  contentcraft/
    ai-generation.png
    world-map.png
  fourstargeneral/
    strategic-map.png
    tactical-combat.png
  gravity/
    fleet-battle.png
  mastertyping/
    gameplay.png
```

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

### Option 2: Next.js Image Component (Recommended)

For better performance, use Next.js Image component:

```tsx
import Image from 'next/image';

<Image
  src="https://res.cloudinary.com/dxz6khmew/image/upload/sixsmith-games/vcs/battle-view-1.png"
  alt="Battle view screenshot"
  width={1200}
  height={800}
  quality={90}
  priority={false}
/>
```

### Option 3: next-cloudinary (Advanced)

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
