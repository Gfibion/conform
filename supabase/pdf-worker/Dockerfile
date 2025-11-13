# Debian-based Node image with LibreOffice and common PDF tools
FROM node:18-bullseye-slim

# Install LibreOffice and useful PDF tools
RUN apt-get update \
  && DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends \
    libreoffice \
    qpdf \
    ghostscript \
    poppler-utils \
    unzip \
    wget \
    ca-certificates \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

# Create app directory
WORKDIR /usr/src/app

# Copy package files and install deps
COPY package.json package-lock.json* ./
RUN npm ci --only=production

# Copy source
COPY ./dist ./dist

# Expose port
EXPOSE 3000

# Run the server
CMD ["node", "./dist/index.js"]
