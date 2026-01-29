---
name: sima-sorting
description: Sorting implementation guidelines for listing pages (UI, repository, URL-driven)
---

# Sorting Implementation Guidelines

## Overview

This guide covers implementing sorting functionality for listing pages, including UI components, repository queries, URL-driven state management, and integration with filters and pagination. Sorting is implemented as a reusable pattern that works across different sections with section-specific sort options.

## Architecture Overview

Sorting implementation consists of four main parts:

1. **UI Component** (`SortFilters`) - Reusable component that renders sort options
2. **Client Header Component** (e.g., `CarsHeaderClient`) - Wraps `SortFilters` in a dialog and manages URL state
3. **Repository Pattern** - Parses sort strings and builds MongoDB sort objects
4. **Page/Content Integration** - Passes sort param through the data flow

## Component Structure

### 1. SortFilters Component (`@/components/SortFilters/SortFilters.tsx`)

**Location**: `src/components/SortFilters/SortFilters.tsx`

**Type**: Client Component (reusable)

**Purpose**: Renders a list of sort options as clickable links

#### SortOption Interface

```typescript
export interface SortOption {
  field: string;        // Sort field identifier (e.g., "date", "price", "year")
  label: string;        // Base label for the field
  ascLabel?: string;    // Label for ascending sort (optional)
  descLabel?: string;   // Label for descending sort (optional)
}
```

**Key Points:**
- `field` is the identifier used in sort strings (e.g., `"date"`, `"price"`)
- `label` is the base label shown when no direction-specific label is provided
- `ascLabel` and `descLabel` are optional - if not provided, only one direction will be shown
- If both `ascLabel` and `descLabel` are provided, both directions are available
- If only one is provided, only that direction is shown

#### SortFilters Props

```typescript
interface SortFiltersProps {
  currentSort?: string;        // Current sort string (e.g., "date_desc")
  sortOptions: SortOption[];   // Array of sort options for this section
  onSortChange?: (nextSort: string) => void; // Optional callback for programmatic updates
}
```

**Key Points:**
- `currentSort` format: `${field}_${direction}` (e.g., `"date_desc"`, `"price_asc"`)
- `sortOptions` is section-specific - each section defines its own options
- `onSortChange` is optional - component also works with URL links (Next.js Link)

#### Usage Example

```typescript
<SortFilters
  currentSort={sort}
  sortOptions={sortOptions}
  onSortChange={handleSortChange}
/>
```

### 2. Client Header Component Pattern

**Location**: `app/(public)/{category}/{entity}/_components/{Entity}HeaderClient/{Entity}HeaderClient.tsx`

**Type**: Client Component

**Purpose**: Wraps `SortFilters` in a dialog and manages sort state/URL synchronization

#### Component Structure

```typescript
"use client";

import { FC, useCallback, useMemo, useState } from "react";
import { Box, Text } from "@radix-ui/themes";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Header, Title } from "../../page.styles";
import DialogPrimitiveOnMobileStickyButton from "@/components/modals/DialogPrimitiveOnMobileStickyButton/DialogPrimitiveOnMobileStickyButton";
import SortFilters, { SortOption } from "@/components/SortFilters/SortFilters";

interface EntityHeaderClientProps {
  totalCount: number;
  initialSort?: string;
  sortOptions: SortOption[];
}

// Helper function to get display title from sort string
const getSortTitle = (sort: string | undefined, sortOptions: SortOption[]) => {
  if (!sort) return "Сортировка";

  const [field, direction] = sort.split("_");
  const option = sortOptions.find((o) => o.field === field);

  if (!option) return "Сортировка";

  if (direction === "asc") {
    return option.ascLabel || option.label;
  }

  if (direction === "desc") {
    return option.descLabel || option.label;
  }

  return option.label;
};

const EntityHeaderClient: FC<EntityHeaderClientProps> = ({
  totalCount,
  initialSort,
  sortOptions,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Local state for instant UI updates inside dialog
  const [sort, setSort] = useState(initialSort ?? "date_desc");

  // Derive title from local state for instant UI updates
  const sortTitle = useMemo(
    () => getSortTitle(sort, sortOptions),
    [sort, sortOptions]
  );

  // Handle sort change - updates URL and resets page to 1
  const handleSortChange = useCallback(
    (nextSort: string) => {
      setSort(nextSort);
      const params = new URLSearchParams(searchParams);
      params.set("sort", nextSort);
      params.set("page", "1"); // Always reset to first page
      router.replace(`${pathname}?${params.toString()}`);
    },
    [pathname, router, searchParams]
  );

  return (
    <Header>
      <Box>
        <Title size="5">Entity Title</Title>
        <Text as="p" size="2" color="gray">
          {totalCount} результатов найдено
        </Text>
      </Box>

      <DialogPrimitiveOnMobileStickyButton
        buttonVariant="ghost"
        titleIsVisible={true}
        title={sortTitle}
        subtitle="Сортировка по"
        subtitleIsVisible={true}
        showOverlay={false}
      >
        <SortFilters
          currentSort={sort}
          sortOptions={sortOptions}
          onSortChange={handleSortChange}
        />
      </DialogPrimitiveOnMobileStickyButton>
    </Header>
  );
};

export default EntityHeaderClient;
```

**Key Points:**
- Uses local state (`sort`) for instant UI updates inside dialog
- `initialSort` comes from URL/searchParams (passed from server component)
- `handleSortChange` updates URL and **always resets page to 1**
- Preserves all existing filter params when changing sort
- Uses `DialogPrimitiveOnMobileStickyButton` for mobile-friendly dialog
- `getSortTitle` helper derives display title from sort string

### 3. Repository Pattern

**Location**: `lib/{category}/{entity}/repository/{Entity}Repository.ts`

**Purpose**: Parse sort strings and build MongoDB sort objects safely

#### Type Definitions

```typescript
export type SortField = 'date' | 'price' | 'year' | 'mileage'; // Section-specific
export type SortDirection = 'asc' | 'desc';
export interface SortOptions {
  field: SortField;
  direction: SortDirection;
}
```

**Key Points:**
- `SortField` is section-specific - define valid fields for each section
- Common fields: `'date'`, `'price'`, `'year'`, `'mileage'`, `'age'`, etc.
- Each section should define its own `SortField` type

#### Parse Sort String Function

```typescript
/**
 * Parse sort string (e.g., "date_desc") into SortOptions object
 * Returns null for invalid values (will use default sort)
 */
function parseSortString(sort?: string): SortOptions | null {
  if (!sort || typeof sort !== 'string') {
    return null;
  }

  const parts = sort.split('_');
  if (parts.length !== 2) {
    return null;
  }

  const [field, direction] = parts;
  
  // Section-specific valid fields
  const validFields: SortField[] = ['date', 'year', 'price', 'mileage'];
  const validDirections: SortDirection[] = ['asc', 'desc'];

  // Validate against allowlist
  if (!validFields.includes(field as SortField) || !validDirections.includes(direction as SortDirection)) {
    return null;
  }

  return {
    field: field as SortField,
    direction: direction as SortDirection,
  };
}
```

**Key Points:**
- **Always validate** against an allowlist of valid fields
- **Never pass raw user input** directly to MongoDB
- Return `null` for invalid values (will use default sort)
- Format: `${field}_${direction}` (e.g., `"date_desc"`, `"price_asc"`)

#### Build Sort Object Function

```typescript
/**
 * Build MongoDB sort object from SortOptions
 * Maps user-friendly field names to MongoDB field names.
 * Always includes _id as tiebreaker for deterministic pagination when primary field has ties.
 */
function buildSortObject(sortOptions: SortOptions | null): Record<string, 1 | -1> {
  // Default sort: newest first (date_desc)
  if (!sortOptions) {
    return { createdAt: -1, _id: -1 };
  }

  // Map sort fields to MongoDB field names
  const fieldMap: Record<SortField, string> = {
    date: 'createdAt',
    year: 'yearOfManufacture',
    price: 'price',
    mileage: 'mileage',
    // Add section-specific mappings
  };

  const mongoField = fieldMap[sortOptions.field];
  const dir = sortOptions.direction === 'asc' ? 1 : -1;

  return {
    [mongoField]: dir,
    _id: dir,
  };
}
```

**Key Points:**
- Maps user-friendly field names to actual MongoDB field names
- **Always include `_id` as tiebreaker** (same direction as primary field). Without it, documents with identical sort values (e.g. same `createdAt`) have undefined order, causing duplicate/missing results across paginated pages.
- Default sort when `sortOptions` is null: `{ createdAt: -1, _id: -1 }` (newest first)
- MongoDB uses `1` for ascending, `-1` for descending
- Field mapping is section-specific

#### Repository Method Integration

```typescript
async getAll(
  searchFilters: EntitySearchFilters = {},
  currentPage: number = 1,
  pageSize: number = 10,
  sort?: string  // Sort string from URL (e.g., "date_desc")
): Promise<PaginatedResponse> {
  try {
    await connectDB();

    // ... filter building logic ...

    // Parse and build sort object
    const sortOptions = parseSortString(sort);
    const sortObject = buildSortObject(sortOptions);

    // Use in query
    const results = await Entity.find(searchFilter)
      .populate("user")
      .sort(sortObject)  // Apply sort
      .skip(skip)
      .limit(pageSize);

    // ... rest of implementation ...
  } catch (error) {
    // ... error handling ...
  }
}
```

**Key Points:**
- Add `sort?: string` parameter to `getAll` method
- Parse sort string before using in query
- Apply sort object to MongoDB query with `.sort(sortObject)`
- Sort is applied after filters but before pagination

### 4. Page/Content Component Integration

#### Page Component (`page.tsx`)

**Location**: `app/(public)/{category}/{entity}/page.tsx`

```typescript
interface EntityPageProps {
  searchParams?: Promise<{
    page?: string;
    sort?: string;  // Add sort param
    // ... other filter params ...
  }>;
}

const EntityPage: FC<EntityPageProps> = async (props) => {
  const searchParams = (await props.searchParams) || {};
  
  // Extract sort param
  const sort = typeof searchParams?.sort === "string" ? searchParams.sort : undefined;
  
  // ... filter processing ...

  // Include sort in Suspense key to trigger re-fetch on sort change
  const contentKey = JSON.stringify({ ...filters, page: currentPage, sort });

  return (
    <PageContainer>
      <Suspense key={contentKey} fallback={<Loading />}>
        <EntityContent
          filters={filters}
          currentPage={currentPage}
          sort={sort}  // Pass sort to content component
        />
      </Suspense>
    </PageContainer>
  );
};
```

**Key Points:**
- Extract `sort` from `searchParams`
- **Always include `sort` in Suspense key** to trigger re-fetch on sort change
- Pass `sort` to content component

#### Content Component (`{Entity}Content.tsx`)

**Location**: `app/(public)/{category}/{entity}/_components/{Entity}Content/{Entity}Content.tsx`

```typescript
import { SortOption } from "@/components/SortFilters/SortFilters";
import EntityHeaderClient from "../EntityHeaderClient/EntityHeaderClient";

interface EntityContentProps {
  filters: EntitySearchFilters;
  currentPage: number;
  sort?: string;
}

// Define section-specific sort options
const entitySortOptions: SortOption[] = [
  {
    field: "date",
    label: "Дата",
    ascLabel: "Дата (старые → новые)",
    descLabel: "Дата (новые → старые)",
  },
  {
    field: "price",
    label: "Цена",
    ascLabel: "Цена (низкая → высокая)",
    descLabel: "Цена (высокая → низкая)",
  },
  // Add section-specific options
];

const EntityContent: FC<EntityContentProps> = async ({
  filters,
  currentPage,
  sort,
}) => {
  // Fetch data with sort
  const entityResponse = await entityRepository.getAll(
    filters,
    currentPage,
    10,
    sort
  );

  return (
    <>
      <EntityHeaderClient
        totalCount={entityResponse.totalCount}
        initialSort={sort}
        sortOptions={entitySortOptions}
      />

      {/* ... rest of content ... */}
    </>
  );
};

export default EntityContent;
```

**Key Points:**
- Define `entitySortOptions` array with section-specific options
- Pass `sort` to repository `getAll` method
- Pass `initialSort` and `sortOptions` to header client component
- Sort options are defined per section (can vary: dates only, prices, years, etc.)

## Section-Specific Sort Options Examples

### Example 1: Cars (Date, Year, Price, Mileage)

```typescript
const carSortOptions: SortOption[] = [
  {
    field: "date",
    label: "Дата",
    ascLabel: "Дата (старые → новые)",
    // descLabel not provided - only ascending shown
  },
  {
    field: "year",
    label: "Год",
    ascLabel: "Год (младшие → старшие)",
  },
  {
    field: "price",
    label: "Цена",
    ascLabel: "Цена (низкая → высокая)",
    descLabel: "Цена (высокая → низкая)",
  },
  {
    field: "mileage",
    label: "Пробег",
    ascLabel: "Пробег (низкий → высокий)",
  },
];
```

**Repository SortField:**
```typescript
export type SortField = 'date' | 'year' | 'price' | 'mileage';
```

**Field Mapping:**
```typescript
const fieldMap: Record<SortField, string> = {
  date: 'createdAt',
  year: 'yearOfManufacture',
  price: 'price',
  mileage: 'mileage',
};
```

### Example 2: Pets (Date, Price, Age)

```typescript
const petSortOptions: SortOption[] = [
  {
    field: "date",
    label: "Дата",
    ascLabel: "Дата (старые → новые)",
  },
  {
    field: "price",
    label: "Цена",
    ascLabel: "Цена (низкая → высокая)",
    descLabel: "Цена (высокая → низкая)",
  },
  {
    field: "age",
    label: "Возраст",
    ascLabel: "Возраст (младшие → старшие)",
  },
];
```

**Repository SortField:**
```typescript
export type SortField = 'date' | 'price' | 'age';
```

**Field Mapping:**
```typescript
const fieldMap: Record<SortField, string> = {
  date: 'createdAt',
  price: 'price',
  age: 'age',
};
```

### Example 3: Date Only

```typescript
const dateOnlySortOptions: SortOption[] = [
  {
    field: "date",
    label: "Дата",
    ascLabel: "Дата (старые → новые)",
    descLabel: "Дата (новые → старые)",
  },
];
```

**Repository SortField:**
```typescript
export type SortField = 'date';
```

## URL-Driven Sorting

### Sort String Format

- **Format**: `${field}_${direction}`
- **Examples**: `"date_desc"`, `"price_asc"`, `"year_desc"`

### URL Parameter

- **Param name**: `sort` (recommended, but can be section-specific)
- **Location**: Query string (e.g., `?sort=date_desc&page=1`)

### Key Behaviors

1. **Always reset page to 1** when sort changes
2. **Preserve all filter params** when changing sort
3. **Include sort in Suspense key** to trigger re-fetch
4. **URL-driven** - users can share/bookmark sorted results

### Client-Side Sort Change Pattern

```typescript
const handleSortChange = useCallback(
  (nextSort: string) => {
    setSort(nextSort);
    const params = new URLSearchParams(searchParams);
    params.set("sort", nextSort);
    params.set("page", "1"); // Always reset to first page
    router.replace(`${pathname}?${params.toString()}`);
  },
  [pathname, router, searchParams]
);
```

## Security Best Practices

### 1. Always Validate Sort Input

**❌ Never do this:**
```typescript
// DANGEROUS - never pass raw user input to MongoDB
const results = await Entity.find({}).sort({ [field]: direction });
```

**✅ Always do this:**
```typescript
// SAFE - validate against allowlist
const sortOptions = parseSortString(sort);
const sortObject = buildSortObject(sortOptions);
const results = await Entity.find({}).sort(sortObject);
```

### 2. Use Allowlist Validation

- Define valid `SortField` types per section
- Validate field and direction against allowlists
- Return `null` for invalid values (use default sort)

### 3. Map User-Friendly Names to DB Fields

- Never expose MongoDB field names in URL
- Use user-friendly field names (e.g., `"date"`, `"price"`)
- Map to actual DB fields internally (e.g., `"createdAt"`, `"price"`)

## Integration with Filters

Sorting works alongside filters:

1. **Filters and sort are independent** - users can apply both
2. **Sort preserves filters** - changing sort doesn't clear filters
3. **Filters preserve sort** - changing filters doesn't clear sort
4. **Both reset page to 1** - when either changes, reset pagination

### Combined URL Example

```
/vehicles/cars?manufacturer=Toyota&model=Camry&sort=price_asc&page=1
```

## Default Sort Behavior

- **Default sort**: `{ createdAt: -1, _id: -1 }` (newest first; `_id` tiebreaker for stable pagination)
- **Applied when**: No sort param, invalid sort param, or `parseSortString` returns `null`
- **Override**: Each section can define its own default in `buildSortObject`
- **Tiebreaker**: Always include `_id` in sort (same direction as primary field) so pagination is deterministic when primary field has ties

## Best Practices

### 1. Section-Specific Configuration

- Define `SortOption[]` per section in content component
- Define `SortField` type per section in repository
- Define field mapping per section in `buildSortObject`

### 2. Consistent Naming

- Use consistent field names across sections when possible (e.g., `"date"`, `"price"`)
- Use descriptive labels in user's language
- Provide both `ascLabel` and `descLabel` when both directions make sense

### 3. Mobile-Friendly UI

- Use `DialogPrimitiveOnMobileStickyButton` for mobile dialog
- Show current sort in button title
- Make sort options easily accessible on mobile

### 4. Performance

- Include `sort` in Suspense key to trigger re-fetch
- Use `router.replace` (not `push`) to avoid history pollution
- Parse sort string once in repository (not multiple times)

### 5. Error Handling

- Handle invalid sort strings gracefully (use default sort)
- Validate sort input in repository (not just UI)
- Provide fallback to default sort when validation fails

## Common Patterns

### Pattern 1: Full Implementation (Cars Example)

1. **Content Component**: Define `carSortOptions`
2. **Header Client**: Use `CarsHeaderClient` with `sortOptions`
3. **Repository**: Define `SortField`, `parseSortString`, `buildSortObject`
4. **Page**: Extract `sort` from `searchParams`, include in Suspense key

### Pattern 2: Date Only

1. **Content Component**: Define single `date` option
2. **Header Client**: Same pattern, fewer options
3. **Repository**: `SortField = 'date'`, map to `'createdAt'`
4. **Page**: Same pattern

### Pattern 3: Adding Sort to Existing Page

1. Add `sort?: string` to page `searchParams` interface
2. Extract `sort` in page component
3. Pass `sort` to content component
4. Add `sort?: string` to repository `getAll` method
5. Implement `parseSortString` and `buildSortObject` in repository
6. Define `sortOptions` in content component
7. Create header client component (or update existing)
8. Include `sort` in Suspense key

## File Structure

```
app/(public)/{category}/{entity}/
├── page.tsx                                    # Extract sort from searchParams
└── _components/
    ├── {Entity}Content/
    │   └── {Entity}Content.tsx                # Define sortOptions, pass to header
    └── {Entity}HeaderClient/
        └── {Entity}HeaderClient.tsx            # SortFilters wrapper

lib/{category}/{entity}/repository/
└── {Entity}Repository.ts                       # parseSortString, buildSortObject

components/
└── SortFilters/
    └── SortFilters.tsx                         # Reusable sort UI component
```

## References

- **Cars Implementation**:
  - `app/(public)/vehicles/cars/_components/CarsHeaderClient/CarsHeaderClient.tsx`
  - `app/(public)/vehicles/cars/_components/CarsContent/CarsContent.tsx`
  - `lib/vehicles/cars/repository/CarRepository.ts`
- **SortFilters Component**:
  - `components/SortFilters/SortFilters.tsx`
- **Filter Integration**:
  - `.cursor/rules/sima-filters.mdc` (Step 2a: Sorting Params)
