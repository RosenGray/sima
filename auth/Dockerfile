# Build stage
FROM node:alpine AS builder
WORKDIR /app
COPY package*.json .
# Install ALL dependencies for building
RUN npm install
COPY . .
# Add a build script and run it
RUN npm run build

# Production stage
FROM node:alpine
WORKDIR /app
COPY package*.json .
# Install only production dependencies
RUN npm install --omit=dev
# Copy built JavaScript files from builder stage
COPY --from=builder /app/dist ./dist
# Copy any other necessary files (like package.json)
CMD ["npm", "run", "start:prod"]