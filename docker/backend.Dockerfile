FROM node:20-alpine

# Security: run as non-root
RUN addgroup -S carelink && adduser -S carelink -G carelink

WORKDIR /app

# Install dependencies first (layer cache)
COPY package*.json ./
RUN npm ci --only=production

# Copy source
COPY --chown=carelink:carelink . .

# Switch to non-root user
USER carelink

EXPOSE 5000

HEALTHCHECK --interval=30s --timeout=5s --start-period=15s \
  CMD wget -q --spider http://localhost:5000/health || exit 1

CMD ["node", "server.js"]
