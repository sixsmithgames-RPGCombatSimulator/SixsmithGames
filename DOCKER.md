# Docker Deployment Guide

## Quick Reference

### Local Development with Docker

```bash
# Build and run
docker-compose up -d

# View logs
docker-compose logs -f

# Stop
docker-compose down

# Rebuild after code changes
docker-compose up -d --build
```

### Production Deployment

#### Railway

1. Install Railway CLI:
```bash
npm install -g railway
```

2. Login and deploy:
```bash
railway login
railway init
railway up
```

3. Set environment variables in Railway dashboard:
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - `STRIPE_SECRET_KEY`
   - `STRIPE_PRICE_ID`
   - `NEXT_PUBLIC_URL`

#### Render

1. Connect your GitHub repository
2. Select "Docker" as deployment type
3. Render will auto-detect the Dockerfile
4. Set environment variables in Render dashboard

#### Google Cloud Run

```bash
# Build and push to Google Container Registry
gcloud builds submit --tag gcr.io/PROJECT-ID/sixsmith-games

# Deploy
gcloud run deploy sixsmith-games \
  --image gcr.io/PROJECT-ID/sixsmith-games \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

#### AWS ECS/Fargate

1. Build and tag image:
```bash
docker build -t sixsmith-games .
docker tag sixsmith-games:latest AWS_ACCOUNT.dkr.ecr.REGION.amazonaws.com/sixsmith-games:latest
```

2. Push to ECR:
```bash
aws ecr get-login-password --region REGION | docker login --username AWS --password-stdin AWS_ACCOUNT.dkr.ecr.REGION.amazonaws.com
docker push AWS_ACCOUNT.dkr.ecr.REGION.amazonaws.com/sixsmith-games:latest
```

3. Create ECS task definition and service in AWS Console

#### DigitalOcean App Platform

1. Connect your GitHub repository
2. Select "Docker Hub" or "GitHub Container Registry"
3. DigitalOcean will detect Dockerfile automatically
4. Configure environment variables

#### Fly.io

```bash
# Install Fly CLI
curl -L https://fly.io/install.sh | sh

# Login
fly auth login

# Launch app
fly launch

# Deploy
fly deploy
```

## Docker Image Details

### Base Image
- `node:18-alpine` - Minimal Alpine Linux with Node.js 18

### Multi-Stage Build
1. **deps** - Install dependencies
2. **builder** - Build Next.js application
3. **runner** - Production runtime (minimal footprint)

### Image Size
- Approximate size: ~150-200 MB (compressed)
- Optimized with standalone output

### Security Features
- Non-root user (`nextjs:nodejs`)
- Minimal attack surface (Alpine Linux)
- No unnecessary packages

## Environment Variables

### Required for Stripe Integration
```bash
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxx
STRIPE_SECRET_KEY=sk_live_xxx
STRIPE_PRICE_ID=price_xxx
NEXT_PUBLIC_URL=https://www.sixsmithgames.com
```

### Optional
```bash
# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Backend APIs (for future integration)
NEXT_PUBLIC_VCS_API_URL=https://vcs-api.railway.app
NEXT_PUBLIC_CONTENTCRAFT_API_URL=https://cc-api.railway.app
```

## Health Checks

The Docker Compose configuration includes health checks:

```yaml
healthcheck:
  test: ["CMD", "wget", "--quiet", "--tries=1", "--spider", "http://localhost:3000"]
  interval: 30s
  timeout: 10s
  retries: 3
  start_period: 40s
```

Monitor health:
```bash
docker inspect --format='{{.State.Health.Status}}' sixsmith-games-website
```

## Troubleshooting

### Container won't start
```bash
# Check logs
docker-compose logs web

# Inspect container
docker inspect sixsmith-games-website
```

### Port already in use
```bash
# Change port in docker-compose.yml
ports:
  - "8080:3000"  # Use port 8080 instead
```

### Build fails
```bash
# Clean build
docker-compose down -v
docker system prune -a
docker-compose build --no-cache
```

### Out of memory during build
```bash
# Increase Docker memory limit in Docker Desktop settings
# Or use cloud build services
```

## Performance Optimization

### Resource Limits

Add to `docker-compose.yml`:

```yaml
deploy:
  resources:
    limits:
      cpus: '1'
      memory: 512M
    reservations:
      cpus: '0.5'
      memory: 256M
```

### Caching

The Dockerfile uses multi-stage builds and layer caching for optimal rebuild times.

### Network Optimization

For reverse proxy setup (nginx, Caddy):

```yaml
services:
  web:
    networks:
      - internal
    # Don't expose port publicly

  nginx:
    ports:
      - "80:80"
      - "443:443"
    networks:
      - internal
```

## Monitoring

### Logs
```bash
# Real-time logs
docker-compose logs -f web

# Last 100 lines
docker-compose logs --tail=100 web

# Export logs
docker-compose logs > logs.txt
```

### Metrics
```bash
# Resource usage
docker stats sixsmith-games-website

# Detailed info
docker inspect sixsmith-games-website
```

## Backup and Recovery

### Export Container
```bash
docker save sixsmith-games-website > sixsmith-games-backup.tar
```

### Import Container
```bash
docker load < sixsmith-games-backup.tar
```

### Data Persistence

Currently, the app is stateless. For future data persistence:

```yaml
volumes:
  - app-data:/app/data

volumes:
  app-data:
```

## CI/CD Integration

### GitHub Actions

```yaml
name: Build and Deploy

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Build Docker image
        run: docker build -t sixsmith-games .
      - name: Deploy to Railway
        run: railway up
```

### GitLab CI

```yaml
build:
  image: docker:latest
  services:
    - docker:dind
  script:
    - docker build -t sixsmith-games .
    - docker push $CI_REGISTRY_IMAGE
```

## Security Best Practices

1. **Never commit secrets** - Use environment variables
2. **Use specific tags** - Avoid `:latest` in production
3. **Scan for vulnerabilities**:
   ```bash
   docker scan sixsmith-games-website
   ```
4. **Keep base image updated**:
   ```bash
   docker pull node:18-alpine
   docker-compose build --no-cache
   ```
5. **Use read-only filesystem** (optional):
   ```yaml
   read_only: true
   tmpfs:
     - /tmp
     - /app/.next/cache
   ```

## Support

For issues with Docker deployment, check:
1. Docker logs: `docker-compose logs -f`
2. Container status: `docker ps -a`
3. Resource usage: `docker stats`
4. Network connectivity: `docker network inspect sixsmith-games-website_default`

---

Copyright (c) 2025 Sixsmith Games. All rights reserved.
