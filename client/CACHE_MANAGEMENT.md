# Cache Management Guide

This document explains how caching works in the application and how to manage it in different environments.

## Overview

The application uses Next.js `unstable_cache` API to cache data from MongoDB, specifically:
- **Service Categories** (cached with tag: `service-categories`)
- **Service Subcategories** (cached with tag: `service-subcategories`)

## Caching Behavior by Environment

### Development (`NODE_ENV=development`)
- ✅ **No caching** - Data is fetched fresh from the database on every request
- ✅ **Automatic initialization** - If database is empty, data is seeded from JSON files
- ✅ **No authorization required** for cache revalidation endpoint

### Production (`NODE_ENV=production`)
- ✅ **Caching enabled** - Data is cached for 1 hour (3600 seconds)
- ✅ **Tag-based revalidation** - Can be manually cleared via API
- ✅ **Authorization required** for cache revalidation endpoint

---

## Production Cache Management

### Setup

1. **Generate a secure token:**
   ```bash
   openssl rand -base64 32
   ```

2. **Add to your production environment variables:**
   ```bash
   REVALIDATE_SECRET_TOKEN=your-generated-secure-token
   ```

3. **Deploy the application** with the new environment variable

### Manual Cache Clearing

When you need to clear the cache in production (e.g., after manually updating the database):

#### Option 1: Clear All Service Caches (Recommended)
```bash
curl -X GET https://your-domain.com/api/revalidate-cache \
  -H "Authorization: Bearer YOUR_SECRET_TOKEN"
```

Response:
```json
{
  "revalidated": true,
  "tags": ["service-categories", "service-subcategories"],
  "message": "All service caches cleared",
  "now": 1234567890,
  "environment": "production"
}
```

#### Option 2: Clear Specific Tags
```bash
curl -X POST https://your-domain.com/api/revalidate-cache \
  -H "Authorization: Bearer YOUR_SECRET_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"tags": ["service-categories"]}'
```

Response:
```json
{
  "revalidated": true,
  "tags": ["service-categories"],
  "now": 1234567890,
  "environment": "production"
}
```

### When to Clear Cache in Production

Clear the cache when:
- ✅ You manually add/update categories or subcategories in the database
- ✅ You fix data inconsistencies
- ✅ You want to force fresh data immediately (instead of waiting for 1-hour TTL)
- ✅ After running database migrations that affect service categories

### Automatic Cache Revalidation

The cache automatically revalidates every **1 hour (3600 seconds)** in production, so you don't need to manually clear it unless you need immediate updates.

---

## Security

### Development
- No authentication required
- API endpoint is open for easy testing

### Production
- **Authorization required** via Bearer token
- Token must be set in `REVALIDATE_SECRET_TOKEN` environment variable
- Unauthorized requests return 401 status

### Security Best Practices
- ✅ Keep `REVALIDATE_SECRET_TOKEN` secret (never commit to git)
- ✅ Use a long, random token (32+ characters)
- ✅ Rotate the token periodically
- ✅ Monitor cache revalidation requests in production logs

---

## Troubleshooting

### Problem: Seeing cached data in development
**Solution:** Check that `NODE_ENV=development` is set correctly

### Problem: Cache not clearing in production
**Solution:** 
1. Verify `REVALIDATE_SECRET_TOKEN` is set in production environment
2. Check you're using the correct token in Authorization header
3. Check application logs for errors

### Problem: Data not updating after 1 hour
**Solution:** 
1. Manually clear cache using the API endpoint
2. Check if database connection is working
3. Review application logs for errors

### Problem: Getting 401 Unauthorized in production
**Solution:**
1. Ensure `REVALIDATE_SECRET_TOKEN` is set in production environment
2. Verify you're sending the correct token: `Authorization: Bearer YOUR_TOKEN`
3. Check the token matches exactly (no extra spaces)

---

## Alternative: On-Demand Revalidation from Admin Panel

You can integrate this API into an admin panel:

```typescript
// Example: Admin button to clear cache
async function clearServiceCache() {
  const response = await fetch('/api/revalidate-cache', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${process.env.REVALIDATE_SECRET_TOKEN}`
    }
  });
  
  const data = await response.json();
  console.log('Cache cleared:', data);
}
```

---

## Technical Details

### Cache Storage
- Next.js stores cache in filesystem (`.next/cache/fetch-cache/`)
- Cache persists between server restarts
- To fully clear: delete `.next` folder and restart

### Cache Keys
- `service-categories` - All service categories
- `service-subcategories` - All service subcategories

### Revalidation Methods
1. **Time-based** - Automatic after 1 hour in production
2. **Tag-based** - Manual via API endpoint
3. **Full clear** - Delete `.next` folder (not recommended in production)

---

## Development Tips

### Quick Development Commands

```bash
# Clear all cache in development (just visit in browser)
curl http://localhost:3000/api/revalidate-cache

# Or delete .next folder
rm -rf .next && npm run dev
```

### Testing Cache in Development

To test caching behavior in development:

1. Temporarily comment out the development bypass in repositories
2. Test cache revalidation
3. Don't forget to uncomment before committing!

---

## Summary

| Environment | Caching | Revalidation | Auth Required |
|-------------|---------|--------------|---------------|
| Development | Disabled | N/A | No |
| Production | 1 hour | Manual via API | Yes |

**Key Takeaway:** In production, cache revalidates automatically every hour, but you can force immediate updates using the protected API endpoint.

