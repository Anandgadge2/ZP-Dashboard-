# Deployment & Setup Guide

Complete guide for deploying the ZP Dashboard to production and setting up development environments.

## 🚀 Quick Start (Development)

### Prerequisites
- Node.js 18.17+ ([Download](https://nodejs.org/))
- npm 9+ or yarn 3+
- Git
- Code editor (VS Code recommended)

### Local Setup

```bash
# Clone repository
git clone <repository-url>
cd dashboard

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Start development server
npm run dev
```

Visit `http://localhost:3000` in your browser.

## 📦 Production Deployment

### 1. Vercel (Recommended)

**Advantages:**
- Zero-config Next.js deployment
- Automatic HTTPS
- Global CDN
- Built-in CI/CD

**Steps:**

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project" and import repository
4. Add environment variables:
   - `NEXT_PUBLIC_API_URL`: Your backend API URL
   - `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`: Cloudinary cloud name
   - `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET`: Upload preset

5. Click "Deploy"

**Update DNS:**
- Point your domain to Vercel
- Follow [Vercel DNS Documentation](https://vercel.com/docs/concepts/projects/domains)

### 2. Docker Deployment

**Dockerfile:**

```dockerfile
# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine
WORKDIR /app
RUN npm install -g next
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

ENV NODE_ENV production
EXPOSE 3000

CMD ["node", "server.js"]
```

**Build and Run:**

```bash
# Build image
docker build -t zp-dashboard:latest .

# Run container
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_API_URL=https://api.yourdomain.com \
  zp-dashboard:latest
```

### 3. AWS Deployment

#### Using Elastic Beanstalk

```bash
# Install EB CLI
pip install awsebcli

# Initialize
eb init -p node.js-18 zp-dashboard

# Create environment
eb create zp-dashboard-prod

# Deploy
npm run build
eb deploy

# Open application
eb open
```

#### Using EC2 + PM2

```bash
# SSH into EC2 instance
ssh -i key.pem ec2-user@your-instance-ip

# Install Node.js
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install -y nodejs

# Clone repository
git clone <repo-url>
cd dashboard

# Install dependencies
npm install

# Build
npm run build

# Install PM2
sudo npm install -g pm2

# Start application
pm2 start "npm start" --name "zp-dashboard"
pm2 save
pm2 startup

# Setup reverse proxy (Nginx)
sudo yum install -y nginx
# Create nginx config...

# Start Nginx
sudo systemctl start nginx
```

### 4. DigitalOcean App Platform

1. Push code to GitHub
2. Go to DigitalOcean App Platform
3. Create new app from GitHub
4. Select repository
5. Configure environment variables
6. Deploy

### 5. Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Initialize
netlify init

# Deploy
netlify deploy --prod
```

## 🔐 Environment Variables

### Development (.env.local)

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5000/api

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_preset

# Optional
NEXT_DEBUG_PERFORMANCE=true
```

### Production (.env.production)

```env
# API Configuration
NEXT_PUBLIC_API_URL=https://api.production.com/api

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_preset_name

# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

## 📊 Performance Optimization

### Build Optimization

```bash
# Analyze bundle size
npm run build
npm install -g @next/bundle-analyzer

# Generate report
npm run analyze
```

### Image Optimization

```typescript
// Use Next.js Image component
import Image from "next/image";

<Image
  src="/image.jpg"
  alt="Description"
  width={400}
  height={300}
  quality={75}
  priority // For above-fold images
/>
```

### Code Splitting

Already handled by Next.js with dynamic imports:

```typescript
import dynamic from "next/dynamic";

const Modal = dynamic(() => import("@/components/Modal"), {
  loading: () => <div>Loading...</div>,
});
```

## 🧪 Testing

### Unit Tests

```bash
# Install testing dependencies
npm install --save-dev jest @testing-library/react

# Run tests
npm test

# Coverage report
npm test -- --coverage
```

### E2E Tests

```bash
# Install Cypress
npm install --save-dev cypress

# Open Cypress
npx cypress open

# Run tests
npm run test:e2e
```

## 📋 CI/CD Pipeline

### GitHub Actions (.github/workflows/deploy.yml)

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2

      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: "18"

      - name: Install dependencies
        run: npm ci

      - name: Lint
        run: npm run lint

      - name: Build
        run: npm run build

      - name: Deploy to Vercel
        uses: vercel/action@master
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

## 🔒 Security Checklist

- [ ] Enable HTTPS/TLS
- [ ] Set secure headers:
  ```
  Strict-Transport-Security: max-age=31536000; includeSubDomains
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  X-XSS-Protection: 1; mode=block
  Referrer-Policy: no-referrer
  ```
- [ ] Configure CORS properly
- [ ] Implement rate limiting
- [ ] Use environment variables for secrets
- [ ] Enable authentication/authorization
- [ ] Regular security audits: `npm audit`
- [ ] Keep dependencies updated: `npm update`
- [ ] Use HTTPS for API calls
- [ ] Implement CSP (Content Security Policy)
- [ ] Monitor error logs
- [ ] Setup backup strategy

## 📈 Monitoring & Analytics

### Application Monitoring

```bash
# Install Sentry
npm install @sentry/nextjs

# Configure in next.config.ts
```

### Performance Monitoring

- Use Lighthouse CI
- Monitor Core Web Vitals
- Setup alerts for performance degradation

### Error Tracking

- Sentry for error logging
- LogRocket for session replay
- Custom error boundary

## 🆘 Troubleshooting

### Build Errors

```bash
# Clear cache
rm -rf .next node_modules
npm install
npm run build
```

### Port Already in Use

```bash
# macOS/Linux
lsof -i :3000
kill -9 <PID>

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### API Connection Issues

1. Check `NEXT_PUBLIC_API_URL` in environment
2. Verify backend is running
3. Check CORS configuration
4. Review browser console for errors

### Memory Issues

```bash
# Increase Node.js memory
NODE_OPTIONS=--max-old-space-size=4096 npm run build
```

## 📚 Resources

- [Next.js Deployment](https://nextjs.org/learn/basics/deploying-nextjs-app)
- [Vercel Documentation](https://vercel.com/docs)
- [Docker Documentation](https://docs.docker.com/)
- [AWS EC2 Guide](https://aws.amazon.com/ec2/getting-started/)
- [DigitalOcean App Platform](https://docs.digitalocean.com/products/app-platform/)

## 🤝 Support

For deployment issues:
1. Check application logs
2. Review error messages
3. Consult documentation
4. Contact support team

---

**Last Updated**: January 2025
