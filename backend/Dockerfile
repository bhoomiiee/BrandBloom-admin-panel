# Production Dockerfile for BrandBloom Backend
FROM node:20-alpine AS runner

WORKDIR /app

# Install curl/wget for health checks
RUN apk add --no-cache wget

# Copy package descriptors
COPY package*.json ./

# Install production dependencies only
RUN npm ci --omit=dev --ignore-scripts || npm install --omit=dev

# Copy application source code
COPY src ./src

# Set production environment
ENV NODE_ENV=production
ENV PORT=5000

# Use unprivileged node user
USER node

EXPOSE 5000

# Health check against live health endpoint
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:5000/api/health || exit 1

CMD ["node", "src/server.js"]
