---
name: sitemap-creator
description: Generate a complete, SEO-optimized sitemap system for a Next.js marketplace app — including an HTML sitemap page (/sitemap), machine-readable XML sitemaps (/sitemap.xml with per-section sub-files), and programmatic SEO sub-sitemap pages that list every manufacturer→model combination to maximize Google indexability of filtered search pages. ALWAYS use this skill when the user asks about sitemaps, SEO page discovery, Google indexing of filtered or category pages, programmatic SEO for a marketplace, sitemap.xml generation, robots.txt sitemap registration, or Google Search Console sitemap submission. Use it even if the user only mentions "indexing" or "getting more pages into Google" without saying the word sitemap.
---

# Sitemap Creator

This skill builds three complementary layers of site discoverability:

1. **HTML sitemap page** (`/sitemap`) — human-readable, server-rendered, fully crawlable
2. **XML sitemaps** — machine-readable, sitemaps.org-compliant, submitted to Google Search Console
3. **Programmatic SEO sub-sitemap pages** — human-readable pages like `/sitemap/vehicles/cars/manufacturers` that list every manufacturer → model link to maximize Googlebot's coverage of filtered search pages

## Project Context (Sima Marketplace)

**App sections and their listing URL base paths:**

| Section | URL base | Filter params |
|---------|----------|---------------|
| Cars | `/vehicles/cars` | `manufacturer`, `model`, `yearFrom`, `yearTo`, `transmission`, `engineType`, `numberOfHand`, `district`, `city`, `priceFrom`, `priceTo`, `color` |
| Motorcycles | `/vehicles/motorcycles` | `manufacturer`, `model` |
| Off-road | `/vehicles/off-road` | `manufacturer`, `model` |
| Scooters | `/vehicles/scooters` | `manufacturer`, `model` |
| Commercial vehicles | `/vehicles/commercial-vehicles` | `manufacturer`, `model` |
| Special vehicles | `/vehicles/special-vehicles` | — |
| Vehicle accessories | `/vehicles/accessories` | — |
| Pets for sale | `/pets/for-sale` | `species`, `breed`, `district` |
| Pets for free | `/pets/for-free` | `species`, `breed` |
| Pet accessories | `/pets/accessories` | — |
| Real estate for sale | `/real-estate/for-sale` | `district`, `city`, `roomsFrom`, `roomsTo` |
| Real estate for rent | `/real-estate/for-rent` | `district`, `city` |
| Commercial real estate | `/real-estate/commercial-real-estate` | `district` |
| Professional services | `/professional-service` | — |
| Other | `/other` | — |

**Manufacturer/model data** (static TypeScript, not MongoDB):
- Cars: `import { getVehicleManufacturers } from '@/lib/vehicles/cars/vehicleManufacturers'`
- Motorcycles: `import { getMotorcycleManufacturers } from '@/lib/vehicles/motorcycles/motorcycleManufacturers'`
- Type: `VehicleManufacturer { id: string; russianName: string; models: VehicleModel[] }` where `VehicleModel { id: string; russianName: string }`

**URL filter pattern:** `/vehicles/cars?manufacturer=1&model=1784` (numeric string IDs)

---

## Part 1 — HTML Sitemap Page

**File:** `client/src/app/sitemap/page.tsx`

This is a standard Next.js Server Component. It must be fully server-rendered with no `"use client"` — Google must be able to crawl it without JS.

### Structure

```tsx
// app/sitemap/page.tsx
import { Flex, Heading, Text } from '@radix-ui/themes'
import Link from 'next/link'
import { getVehicleManufacturers } from '@/lib/vehicles/cars/vehicleManufacturers'

export const metadata = {
  title: 'Карта сайта | Sima',
  description: 'Все разделы и страницы сайта Sima',
}

export default function SitemapPage() {
  const manufacturers = getVehicleManufacturers()

  return (
    <main>
      <Heading>Карта сайта</Heading>

      <section>
        <Heading as="h2">Транспортные средства</Heading>
        <ul>
          <li><a href="/vehicles/cars">Легковые автомобили</a></li>
          <li><a href="/vehicles/motorcycles">Мотоциклы</a></li>
          {/* ... all vehicle sections */}
        </ul>
        {/* Link to programmatic sub-sitemaps */}
        <a href="/sitemap/vehicles/cars/manufacturers">
          Все марки и модели автомобилей →
        </a>
      </section>

      {/* repeat for pets, real estate, etc. */}
    </main>
  )
}
```

**Rules:**
- Use `<a>` tags (or `next/link`) directly — no JS-only navigation
- Group links by section with `<h2>` / `<h3>` headings
- Include links to programmatic sub-sitemap pages (see Part 3)
- Keep styling minimal — this page is for crawlers, not users

---

## Part 2 — XML Sitemaps

### Option A: Single `app/sitemap.ts` (≤50k URLs, simplest)

```typescript
// client/src/app/sitemap.ts
import { MetadataRoute } from 'next'
import { getVehicleManufacturers } from '@/lib/vehicles/cars/vehicleManufacturers'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://sima.co.il'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date().toISOString()

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: 'daily', priority: 1.0 },
    { url: `${BASE_URL}/vehicles/cars`, lastModified: now, changeFrequency: 'hourly', priority: 0.9 },
    { url: `${BASE_URL}/vehicles/motorcycles`, lastModified: now, changeFrequency: 'daily', priority: 0.8 },
    // ... all section index pages
    { url: `${BASE_URL}/sitemap`, lastModified: now, changeFrequency: 'monthly', priority: 0.3 },
  ]

  // Manufacturer + model filtered pages for cars
  const manufacturers = getVehicleManufacturers()
  const vehicleFilterPages: MetadataRoute.Sitemap = manufacturers.flatMap(mfr => [
    // Manufacturer-only page
    {
      url: `${BASE_URL}/vehicles/cars?manufacturer=${mfr.id}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    // Manufacturer + model pages
    ...mfr.models.map(model => ({
      url: `${BASE_URL}/vehicles/cars?manufacturer=${mfr.id}&model=${model.id}`,
      lastModified: now,
      changeFrequency: 'daily' as const,
      priority: 0.6,
    })),
  ])

  return [...staticPages, ...vehicleFilterPages]
}
```

Next.js automatically serves this at `/sitemap.xml`. No route file needed.

### Option B: Multiple sitemaps with `generateSitemaps()` (>50k URLs)

When total URLs exceed ~50k, split into a sitemap index:

```typescript
// client/src/app/sitemap.ts
import { MetadataRoute } from 'next'

const SECTIONS = ['static', 'cars', 'motorcycles', 'pets', 'real-estate'] as const
type Section = typeof SECTIONS[number]

export async function generateSitemaps() {
  return SECTIONS.map(id => ({ id }))
}

export default async function sitemap({
  id,
}: {
  id: Section
}): Promise<MetadataRoute.Sitemap> {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://sima.co.il'
  const now = new Date().toISOString()

  if (id === 'static') {
    return [
      { url: BASE_URL, lastModified: now, changeFrequency: 'daily', priority: 1.0 },
      { url: `${BASE_URL}/vehicles/cars`, lastModified: now, changeFrequency: 'hourly', priority: 0.9 },
      // ... rest of static pages
    ]
  }

  if (id === 'cars') {
    const { getVehicleManufacturers } = await import('@/lib/vehicles/cars/vehicleManufacturers')
    const manufacturers = getVehicleManufacturers()
    return manufacturers.flatMap(mfr => [
      { url: `${BASE_URL}/vehicles/cars?manufacturer=${mfr.id}`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
      ...mfr.models.map(model => ({
        url: `${BASE_URL}/vehicles/cars?manufacturer=${mfr.id}&model=${model.id}`,
        lastModified: now,
        changeFrequency: 'daily' as const,
        priority: 0.6,
      })),
    ])
  }

  // ... other sections
  return []
}
```

Next.js generates `/sitemap/0.xml`, `/sitemap/1.xml`, etc., and a `/sitemap.xml` index automatically.

### XML sitemap rules

- Always include `lastModified`, `changeFrequency`, and `priority`
- `priority` scale: homepage `1.0` → section index pages `0.8–0.9` → manufacturer-filtered `0.7` → manufacturer+model `0.6` → detail pages `0.4–0.5`
- `changeFrequency`: listing pages `'hourly'` or `'daily'`; detail pages `'weekly'`; static pages `'monthly'`
- Validate that `NEXT_PUBLIC_BASE_URL` is set in `.env` / Vercel env vars

---

## Part 3 — Programmatic SEO Sub-Sitemap Pages

These are **HTML pages** (not XML) that list every manufacturer → model combination as crawlable links. Their purpose is to give Googlebot a clear path to discover every filtered search page.

### Cars manufacturers sub-sitemap

**File:** `client/src/app/sitemap/vehicles/cars/manufacturers/page.tsx`

```tsx
import { getVehicleManufacturers } from '@/lib/vehicles/cars/vehicleManufacturers'
import Link from 'next/link'

export const metadata = {
  title: 'Все марки и модели автомобилей | Sima',
}

// Static generation — revalidate every 24h if data could change
export const revalidate = 86400

export default function CarsManufacturersPage() {
  const manufacturers = getVehicleManufacturers()

  return (
    <main>
      <h1>Марки и модели автомобилей</h1>
      {manufacturers.map(mfr => (
        <section key={mfr.id}>
          <h2>
            <a href={`/vehicles/cars?manufacturer=${mfr.id}`}>
              {mfr.russianName}
            </a>
          </h2>
          <ul>
            {mfr.models.map(model => (
              <li key={model.id}>
                <a href={`/vehicles/cars?manufacturer=${mfr.id}&model=${model.id}`}>
                  {mfr.russianName} {model.russianName}
                </a>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </main>
  )
}
```

Since manufacturer/model data is static TypeScript (not a DB query), this page is automatically statically generated at build time. No `generateStaticParams` needed here — it's a single page, not a dynamic route.

### Pattern for dynamic sub-sitemaps (e.g. per-manufacturer model list)

If you want a sub-sitemap per manufacturer (e.g. `/sitemap/vehicles/cars/[manufacturerId]`):

```tsx
// app/sitemap/vehicles/cars/[manufacturerId]/page.tsx
import { getVehicleManufacturers, getVehicleManufacturerById } from '@/lib/vehicles/cars/vehicleManufacturers'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const manufacturers = getVehicleManufacturers()
  return manufacturers.map(mfr => ({ manufacturerId: mfr.id }))
}

export const revalidate = 86400

export default function ManufacturerModelsPage({
  params,
}: {
  params: { manufacturerId: string }
}) {
  const mfr = getVehicleManufacturerById(params.manufacturerId)
  if (!mfr) notFound()

  return (
    <main>
      <h1>Модели {mfr.russianName}</h1>
      <ul>
        {mfr.models.map(model => (
          <li key={model.id}>
            <a href={`/vehicles/cars?manufacturer=${mfr.id}&model=${model.id}`}>
              {mfr.russianName} {model.russianName}
            </a>
          </li>
        ))}
      </ul>
    </main>
  )
}
```

`generateStaticParams()` ensures all pages are pre-rendered at build time — Googlebot can crawl them without JS.

---

## Part 4 — robots.txt and Google Search Console

### robots.txt

**File:** `client/src/app/robots.ts`

```typescript
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://sima.co.il'

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/auth/',
        '/(private)/',
      ],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  }
}
```

Next.js serves this at `/robots.txt` automatically.

### Google Search Console

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Select your property
3. Sidebar → **Sitemaps**
4. Enter `sitemap.xml` in the input and click **Submit**
5. For multi-file sitemaps (Option B), you only need to submit the index `/sitemap.xml` — GSC will discover all sub-files from it

### Verification checklist before submitting

```bash
# Confirm your sitemap renders correctly
curl https://your-domain.com/sitemap.xml | head -50

# Check URL count
curl -s https://your-domain.com/sitemap.xml | grep -c '<loc>'

# Validate against sitemaps.org schema
# Use https://www.xml-sitemaps.com/validate-xml-sitemap.html
```

---

## Implementation order

1. Set `NEXT_PUBLIC_BASE_URL` in `.env.local` and Vercel
2. Create `app/sitemap.ts` (Option A first; upgrade to B only if URLs > 50k)
3. Create `app/robots.ts`
4. Create `app/sitemap/page.tsx` (HTML sitemap)
5. Create `app/sitemap/vehicles/cars/manufacturers/page.tsx`
6. Add links from HTML sitemap to the sub-sitemap pages
7. Deploy and submit to GSC

## File conflict note

`app/sitemap.ts` (Next.js built-in, generates `/sitemap.xml`) and `app/sitemap/page.tsx` (your HTML page at `/sitemap`) do **not** conflict — they produce different routes.
