# Production Docker Build Guide

## Overview

Next.js `NEXT_PUBLIC_*` environment variables are **inlined at BUILD TIME** into the client JavaScript bundle. This means they must be provided as Docker build arguments, not as runtime environment variables in Kubernetes.

## Quick Start

### Option 1: Using the Build Script (Recommended)

```bash
cd client
./build-prod.sh
```

This script automatically passes all required environment variables to the Docker build.

### Option 2: Manual Build Command

```bash
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
```

## Deployment Steps

1. **Build the Docker image** (using one of the options above)
2. **Push to Docker registry:**
   ```bash
   docker push rosengray/sima-client:latest
   ```
3. **Deploy to Kubernetes:**
   ```bash
   kubectl rollout restart deployment/client-depl
   ```

## Required Environment Variables

All `NEXT_PUBLIC_*` variables must be provided at **build time**:

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | API base URL | `https://www.sima-board.com` |
| `NEXT_PUBLIC_RECAPTCHA_FRONTNED_SITE_KEY` | Google ReCAPTCHA site key | `6LeXDt...` |
| `NEXT_PUBLIC_BACKBLAZEB_PUBLIC_BUCKET_NAME` | B2 bucket name | `sima-board-public` |
| `NEXT_PUBLIC_BACKBLAZEB_ENDPOINT` | B2 S3 endpoint | `https://s3.eu-central-003...` |
| `NEXT_PUBLIC_BACKBLAZEB_REGION` | B2 region | `eu-central-003` |
| `NEXT_PUBLIC_BACKBLAZEB_PUBLIC_BUCKET_ACCESS_KEY` | B2 access key | `0034fe...` |
| `NEXT_PUBLIC_BACKBLAZEB_PUBLIC_BUCKET_SECRET_KEY` | B2 secret key | `K003AJ...` |
| `NEXT_PUBLIC_BACKBLAZEB_BASE_URL` | B2 file base URL | `https://f003.backblazeb2.com/file` |

## Important Notes

### ⚠️ Security Warning

Variables prefixed with `NEXT_PUBLIC_` are **exposed in the client browser bundle** and can be viewed by anyone. Consider moving sensitive credentials to server-only environment variables if they should not be publicly visible.

### Build Time vs Runtime

- **Build Time** (Docker build args): `NEXT_PUBLIC_*` variables - inlined into JS bundle
- **Runtime** (Kubernetes env vars): Server-only variables like `JWT_KEY`, `DB_PASSWORD`, etc.

### Verifying Environment Variables

After deployment, you can verify that the variables are set by:

1. Checking the browser console in your app
2. Visiting `https://www.sima-board.com/api/settings/env` to see what's available at runtime (server-side)

## Troubleshooting

### Variables are `undefined` in browser
- **Cause**: Build args were not passed during `docker build`
- **Solution**: Use the `build-prod.sh` script or ensure all `--build-arg` flags are included

### Variables are empty strings `""`
- **Cause**: Build args were declared but no values were provided
- **Solution**: Check that values are correctly set in `build-prod.sh` or your build command

### Changes not reflected after deployment
- **Cause**: Old Docker image is still cached
- **Solution**: 
  ```bash
  docker build --no-cache ...
  docker push rosengray/sima-client:latest
  kubectl rollout restart deployment/client-depl
  ```

