FROM node:20-alpine

WORKDIR /app

# Dependencies needed by Prisma and healthchecks
RUN apk add --no-cache openssl curl wget

# Install backend dependencies first for better layer caching
COPY backend/package*.json ./
RUN npm ci --omit=dev

# Copy backend source
COPY backend/ ./

# Generate Prisma client
RUN npx prisma generate

# Prepare uploads directory
RUN mkdir -p src/uploads

# Run as non-root user
RUN addgroup -g 1001 -S nodejs && adduser -S nodejs -u 1001
RUN chown -R nodejs:nodejs /app
USER nodejs

EXPOSE 5000

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:5000/health || exit 1

CMD ["npm", "start"]
