#!/bin/bash

# Production Docker Build Script
# This script builds the Docker image with all required NEXT_PUBLIC_* environment variables

# Color output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}Building production Docker image with environment variables...${NC}"

docker build \
  --build-arg NEXT_PUBLIC_API_URL=https://www.sima-board.com \
  --build-arg NEXT_PUBLIC_RECAPTCHA_FRONTNED_SITE_KEY=6LeXDtMqAAAAAMaIbBjfVOvvn-LSDq0Pf7lj9tHZ \
  --build-arg NEXT_PUBLIC_BACKBLAZEB_PUBLIC_BUCKET_NAME=sima-board-public \
  --build-arg NEXT_PUBLIC_BACKBLAZEB_ENDPOINT=https://s3.eu-central-003.backblazeb2.com \
  --build-arg NEXT_PUBLIC_BACKBLAZEB_REGION=eu-central-003 \
  --build-arg NEXT_PUBLIC_BACKBLAZEB_PUBLIC_BUCKET_ACCESS_KEY=0034fe6951b6db40000000001 \
  --build-arg NEXT_PUBLIC_BACKBLAZEB_PUBLIC_BUCKET_SECRET_KEY=K003AJsZXPlQTgmQfXz2KEQJXeCXcvs \
  --build-arg NEXT_PUBLIC_BACKBLAZEB_BASE_URL=https://f003.backblazeb2.com/file \
  -t rosengray/sima-client:latest \
  -f Dockerfile.prod \
  .

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Docker image built successfully!${NC}"
    echo -e "${BLUE}To push to registry, run:${NC}"
    echo "  docker push rosengray/sima-client:latest"
    echo -e "${BLUE}To deploy to Kubernetes, run:${NC}"
    echo "  kubectl rollout restart deployment/client-depl"
else
    echo -e "${RED}✗ Docker build failed${NC}"
    exit 1
fi

