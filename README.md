# Sixsmith Games Website

A professional marketing and subscription website for the Sixsmith Games suite of applications.

[![License](https://img.shields.io/badge/license-Proprietary-red.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue)](https://www.docker.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)

## Quick Start with Docker

```bash
# Clone the repository
git clone https://github.com/sixsmithgames-RPGCombatSimulator/SixsmithGames.git
cd SixsmithGames

# Run with Docker Compose
docker-compose up -d

# Visit http://localhost:3000
```

## Overview

This website showcases five innovative applications:
- **VirtualCombatSimulator** - D&D battle management system
- **ContentCraft** - AI-powered content creation platform
- **MasterTyping** - Game-based typing practice
- **Gravity** - Asynchronous multiplayer strategy board game
- **FourStarGeneral** - WWII strategic war game

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Deployment**: Vercel (recommended)
- **Payment Processing**: Stripe (ready for integration)

## Project Structure

```
sixsmith-games-website/
├── app/
│   ├── apps/
│   │   ├── virtual-combat-simulator/
│   │   ├── contentcraft/
│   │   ├── mastertyping/
│   │   ├── gravity/
│   │   └── fourstargeneral/
│   ├── pricing/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── Navigation.tsx
│   └── Footer.tsx
└── public/
```

## Getting Started

### Prerequisites

**Option 1: Local Development**
- Node.js 18+ installed
- npm or yarn package manager

**Option 2: Docker (Recommended for Production)**
- Docker installed
- Docker Compose (optional, but recommended)

### Installation

#### Option 1: Local Development

1. Navigate to the project directory:
```bash
cd sixsmith-games-website
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

#### Option 2: Docker Deployment

**Using Docker Compose (Recommended):**

1. Navigate to the project directory:
```bash
cd sixsmith-games-website
```

2. Build and run the container:
```bash
docker-compose up -d
```

3. The application will be available at [http://localhost:3000](http://localhost:3000)

4. To stop the container:
```bash
docker-compose down
```

5. To view logs:
```bash
docker-compose logs -f
```

**Using Docker directly:**

1. Build the Docker image:
```bash
docker build -t sixsmith-games-website .
```

2. Run the container:
```bash
docker run -d -p 3000:3000 --name sixsmith-games-website sixsmith-games-website
```

3. Stop the container:
```bash
docker stop sixsmith-games-website
docker rm sixsmith-games-website
```

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### Key Features

- **Responsive Design**: Mobile-first design that works on all devices
- **Professional UI**: Elegant, modern design with gradient accents
- **SEO Optimized**: Proper metadata and semantic HTML
- **Fast Performance**: Next.js optimization and static generation
- **Type Safe**: Full TypeScript implementation

## Docker Production Deployment

### Deploy to Railway with Docker

1. Install Railway CLI:
```bash
npm install -g railway
```

2. Login to Railway:
```bash
railway login
```

3. Initialize project:
```bash
railway init
```

4. Deploy:
```bash
railway up
```

Railway will automatically detect the Dockerfile and deploy your application.

### Deploy to Other Container Platforms

The Dockerfile is compatible with:
- **Railway** - Automatic deployment from Dockerfile
- **Render** - Docker-based deployment
- **Google Cloud Run** - Serverless container platform
- **AWS ECS/Fargate** - Container orchestration
- **DigitalOcean App Platform** - Container deployment
- **Azure Container Instances** - Serverless containers
- **Fly.io** - Edge container platform

### Environment Variables for Docker

Create a `.env.local` file for local development or set these in your container platform:

```bash
# Stripe Integration (when ready)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_xxx
STRIPE_SECRET_KEY=sk_xxx
STRIPE_PRICE_ID=price_xxx

# Optional: Custom domain
NEXT_PUBLIC_URL=https://www.sixsmithgames.com

# Optional: Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

**Important:** Never commit `.env.local` to version control. It's already in `.gitignore`.

## Deployment to Vercel

### Step 1: Prepare Your Repository

1. Initialize git repository (if not already done):
```bash
git init
git add .
git commit -m "Initial commit"
```

2. Push to GitHub/GitLab/Bitbucket:
```bash
git remote add origin <your-repo-url>
git push -u origin main
```

### Step 2: Deploy to Vercel

**Option A: Using Vercel Dashboard**

1. Go to [vercel.com](https://vercel.com)
2. Sign in with your GitHub/GitLab/Bitbucket account
3. Click "New Project"
4. Import your repository
5. Configure project:
   - Framework Preset: Next.js
   - Root Directory: `./` (or `sixsmith-games-website` if not at root)
   - Build Command: `npm run build`
   - Output Directory: `.next`
6. Click "Deploy"

**Option B: Using Vercel CLI**

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

4. Follow the prompts to configure and deploy

### Step 3: Configure Custom Domain

1. In Vercel dashboard, go to your project
2. Navigate to "Settings" → "Domains"
3. Add `www.sixsmithgames.com`
4. Follow Vercel's instructions to update DNS records
5. Wait for DNS propagation (usually 24-48 hours)

### Environment Variables (For Stripe Integration)

When ready to integrate Stripe, add these environment variables in Vercel:

```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_xxx
STRIPE_SECRET_KEY=sk_xxx
STRIPE_PRICE_ID=price_xxx
```

## Stripe Integration Guide

### Setting Up Stripe

1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Create a product and price in Stripe Dashboard
3. Note your API keys and price ID
4. Install Stripe SDK:
```bash
npm install @stripe/stripe-js stripe
```

5. Create API routes in `app/api/`:
   - `app/api/create-checkout-session/route.ts` - Create checkout session
   - `app/api/webhooks/route.ts` - Handle Stripe webhooks

6. Update the "Subscribe Now" buttons to redirect to Stripe Checkout

### Example Checkout Session Handler

```typescript
// app/api/create-checkout-session/route.ts
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export async function POST() {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/pricing`,
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (err) {
    return NextResponse.json({ error: 'Error creating checkout session' }, { status: 500 });
  }
}
```

## Customization

### Updating Content

- **Home Page**: Edit `app/page.tsx`
- **Product Pages**: Edit files in `app/apps/[app-name]/page.tsx`
- **Pricing**: Edit `app/pricing/page.tsx`
- **Navigation**: Edit `components/Navigation.tsx`
- **Footer**: Edit `components/Footer.tsx`

### Styling

- Global styles: `app/globals.css`
- Tailwind config: `tailwind.config.ts`
- Component-level: Tailwind classes in TSX files

### Adding New Apps

1. Create new directory: `app/apps/[new-app-name]/`
2. Create `page.tsx` following existing patterns
3. Add to navigation in `components/Navigation.tsx`
4. Add to home page showcase in `app/page.tsx`
5. Add to pricing page in `app/pricing/page.tsx`

## Performance Optimization

- Images: Use Next.js `<Image>` component for optimization
- Fonts: Consider using `next/font` for font optimization
- Analytics: Add Vercel Analytics or Google Analytics
- Monitoring: Set up error tracking (Sentry, etc.)

## Backend Integration

The website is currently frontend-only. To integrate with your backends:

1. **VirtualCombatSimulator** (Railway):
   - Add environment variable for backend URL
   - Create API client in `lib/` directory
   - Add authentication flow

2. **ContentCraft** (Railway):
   - Similar to above
   - Handle AI provider API keys securely

3. **Other Apps**:
   - Follow similar patterns
   - Keep API keys in environment variables
   - Never expose secrets to client-side

## Security Best Practices

- Keep all API keys in environment variables
- Never commit `.env.local` to git
- Use Vercel's environment variable encryption
- Implement proper authentication
- Validate all user inputs
- Use HTTPS only (Vercel provides this)

## Support & Maintenance

- Monitor Vercel deployment logs
- Set up error tracking
- Keep dependencies updated:
  ```bash
  npm outdated
  npm update
  ```
- Regular security audits:
  ```bash
  npm audit
  npm audit fix
  ```

## Docker Best Practices

### Health Checks

The Docker Compose configuration includes health checks. Monitor container health:

```bash
docker-compose ps
```

### Logs and Monitoring

View real-time logs:
```bash
docker-compose logs -f web
```

View specific number of log lines:
```bash
docker-compose logs --tail=100 web
```

### Updating the Container

1. Pull latest code changes
2. Rebuild the image:
```bash
docker-compose build
```
3. Restart the container:
```bash
docker-compose up -d
```

### Resource Limits

For production, add resource limits to `docker-compose.yml`:

```yaml
services:
  web:
    # ... other config
    deploy:
      resources:
        limits:
          cpus: '1'
          memory: 512M
        reservations:
          cpus: '0.5'
          memory: 256M
```

### Multi-Container Deployment

If you need to add backend services later:

```yaml
version: '3.8'

services:
  web:
    # ... existing config
    depends_on:
      - api
      - db

  api:
    # Your Railway backend service

  db:
    # Your database service
```

## License

Copyright (c) 2025 Sixsmith Games. All rights reserved.

See the [LICENSE](LICENSE) file for details.

All product names, logos, and brands are property of Sixsmith Games and are protected by applicable trademark and copyright laws.

Trademarks: VirtualCombatSimulator™, ContentCraft™, MasterTyping™, Gravity™, FourStarGeneral™

## Contact

For questions or support, contact the Sixsmith Games team.

---

Built with ❤️ using Next.js and deployed on Vercel
