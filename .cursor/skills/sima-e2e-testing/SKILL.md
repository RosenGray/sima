# End-to-End Testing Skill

## Overview

This skill provides comprehensive guidelines for creating end-to-end (E2E) tests for entity flows in the Sima application. It covers entity creation/validation, editing, database mocking, filter testing, and pagination testing patterns.

## When to Use

Use this skill when:
- Creating E2E tests for a new entity flow (vehicles, pets, jobs, professional services, etc.)
- Testing form validation and submission
- Testing entity editing functionality
- Testing filters and search functionality
- Testing pagination with large datasets
- Setting up test data factories and helpers

## Test Structure

### Directory Organization

```
client/src/__tests__/lib/{category}/{entity}/e2e/
├── {entity}-creation.test.ts      # Entity creation & validation tests
├── {entity}-editing.test.ts       # Entity editing tests
├── {entity}-database.test.ts      # Database operations with large datasets
├── {entity}-filters.test.ts       # Filter testing
├── {entity}-pagination.test.ts    # Pagination testing
└── test-helpers.ts                # Shared test helpers
```

## 1. Entity Creation & Validation Tests

### File Pattern

`{entity}-creation.test.ts`

### Test Setup

```typescript
import { describe, it, expect, beforeAll, afterAll, beforeEach, vi } from "vitest";
import {
  setupMongoMemoryServer,
  teardownMongoMemoryServer,
  clearDatabase,
} from "@/__tests__/mocks/mongodb";
import { MongoMemoryServer } from "mongodb-memory-server";
import { publish{Entity}Ad } from "@/lib/{category}/{entity}/actions/publish{Entity}Ad";
import { {entity}Repository } from "@/lib/{category}/{entity}/repository/{Entity}Repository";
import { UserFactory } from "@/__tests__/factories";
import { mockGetCurrentUser } from "@/__tests__/mocks/auth";
import { mockUploadFiles } from "@/__tests__/mocks/fileUpload";
import { mockRedirect, mockRevalidatePath } from "@/__tests__/mocks/next";
import {
  create{Entity}FormData,
  assertServerActionSuccess,
  assertServerActionError,
} from "@/__tests__/utils/serverAction.helpers";

// Mock dependencies
vi.mock("@/lib/auth/utils/auth.utils", () => ({
  getCurrentUser: mockGetCurrentUser,
}));

vi.mock("@/lib/files/uploadFiles", () => ({
  uploadFiles: mockUploadFiles,
}));

vi.mock("next/navigation", () => ({
  redirect: mockRedirect,
}));

vi.mock("next/cache", () => ({
  revalidatePath: mockRevalidatePath,
}));
```

### Required Test Cases

1. **Create entity with valid data**
   - Setup user and mocks
   - Create FormData with valid data
   - Call publish action
   - Verify no errors
   - Verify entity in database
   - Verify redirect called

2. **Validate required fields**
   - Test each required field individually
   - Verify error returned when field missing

3. **Field-specific validations**
   - Email format validation
   - Phone number format validation
   - Number field validation (min/max)
   - Enum field validation
   - File upload validation (size, type, count)

4. **Error handling**
   - Unauthenticated user
   - Invalid data formats
   - File validation errors

### Example Test

```typescript
it("should create entity with valid data", async () => {
  const user = await UserFactory.create();
  mockGetCurrentUser.mockResolvedValue(user);

  mockUploadFiles.mockResolvedValue({
    success: true,
    message: "Files uploaded",
    files: [/* mock files */],
    metadata: {/* metadata */},
  });

  const formData = create{Entity}FormData({
    // valid data
  });

  const result = await publish{Entity}Ad(undefined, formData);

  expect(mockRedirect).toHaveBeenCalled();
  assertServerActionSuccess(result);

  const entities = await {entity}Repository.getAll({}, 1, 10);
  expect(entities.data.length).toBeGreaterThan(0);
});
```

## 2. Entity Editing Tests

### File Pattern

`{entity}-editing.test.ts`

### Test Setup

Similar to creation tests, but also mock `getFileManager` for image deletion:

```typescript
vi.mock("@/lib/common/actions/getFileManager", () => ({
  getFileManager: vi.fn(async () => ({
    deleteFiles: vi.fn(async () => ({ success: true })),
  })),
}));
```

### Required Test Cases

1. **Edit entity successfully**
   - Create entity
   - Setup edit context (imagesToDelete, allImagesShouldBeDeleted)
   - Create FormData with updated values
   - Call edit action
   - Verify updates in database

2. **Image handling**
   - Delete existing images
   - Replace images (delete old, add new)
   - Partial image update (keep some, delete some, add new)
   - Validation when all images deleted (requires at least 1 new image)

3. **Ownership verification**
   - Only owner can edit
   - Non-owner cannot edit

4. **Validation**
   - Same validations as create
   - Test with invalid data

### Example Test

```typescript
it("should edit entity successfully", async () => {
  const service = await {Entity}Factory.create({ user: ownerUser.id });
  mockGetCurrentUser.mockResolvedValue(ownerUser);

  const formData = create{Entity}FormData({
    // updated values
  });

  const context = {
    {entity}PublicId: service.publicId,
    imagesToDelete: [],
    allImagesShouldBeDeleted: false,
  };

  const result = await edit{Entity}Ad(context, undefined, formData);

  expect(mockRedirect).toHaveBeenCalled();
  assertServerActionSuccess(result);

  const updated = await {entity}Repository.getByPublicId(service.publicId);
  expect(updated?.description).toBe("Updated description");
});
```

## 3. Database Mocking with Large Datasets

### File Pattern

`{entity}-database.test.ts`

### Required Test Cases

1. **Create 200 unique entities**
   - Use factory to create 200 items
   - Verify all created
   - Verify uniqueness (publicId, etc.)

2. **Batch creation performance**
   - Measure creation time
   - Verify batch size optimization
   - Log performance metrics

3. **Data diversity**
   - Verify different categories, districts, cities
   - Verify data distribution
   - Test with realistic data variety

4. **Database query performance**
   - Test query time with 200 items
   - Verify performance is acceptable

### Example Test

```typescript
it("should create 200 unique entities", async () => {
  const user = await UserFactory.create();

  const startTime = Date.now();
  const entities = await {Entity}Factory.createMany(200, {
    user: user.id,
  });
  const endTime = Date.now();

  expect(entities.length).toBe(200);

  const publicIds = entities.map((e) => e.publicId);
  const uniquePublicIds = new Set(publicIds);
  expect(uniquePublicIds.size).toBe(200);

  const result = await {entity}Repository.getAll({}, 1, 200);
  expect(result.totalCount).toBe(200);
});
```

## 4. Filter Testing

### File Pattern

`{entity}-filters.test.ts`

### Test Structure

Organize tests by filter type:

```typescript
describe("{Entity} Filters [e2e]", () => {
  beforeEach(async () => {
    await clearDatabase();
    // Setup diverse test data with 200 items
    testData = await setupDiverseTestData(200);
  });

  describe("Filter Type 1", () => {
    it("should filter by single value", async () => {
      // Test single filter
    });

    it("should filter by multiple values", async () => {
      // Test array filter
    });

    it("should handle invalid values", async () => {
      // Test validation
    });
  });

  describe("Combined Filters", () => {
    it("should filter by all filters simultaneously", async () => {
      // Test complex combinations
    });
  });
});
```

### Required Test Cases for Each Filter

1. **Single value filter**
   - Filter by single value
   - Verify all results match filter

2. **Multiple values filter**
   - Filter by array of values
   - Verify all results match any value in array

3. **Invalid values**
   - Invalid ObjectId (for ObjectId filters)
   - Non-existent values
   - Invalid format

4. **Combined filters**
   - Filter by multiple filter types
   - Verify all conditions met
   - Test with 200 items

### Filter Types

#### String Array Filters
```typescript
it("should filter by multiple values", async () => {
  const result = await repository.getAll(
    { filterParam: ["value1", "value2"] },
    1,
    10
  );

  expect(result.data.every((item) => 
    ["value1", "value2"].includes(item.filterParam)
  )).toBe(true);
});
```

#### ObjectId Array Filters
```typescript
it("should filter by ObjectId array", async () => {
  const categoryIds = [category1.id, category2.id];
  
  const result = await repository.getAll(
    { categoryId: categoryIds },
    1,
    10
  );

  expect(result.data.every((item) => 
    categoryIds.includes(item.category.id)
  )).toBe(true);
});

it("should handle invalid ObjectId", async () => {
  const result = await repository.getAll(
    { categoryId: ["invalid-id"] },
    1,
    10
  );

  expect(result.data.length).toBe(0);
});
```

#### Enum Filters
```typescript
it("should filter by enum values", async () => {
  const result = await repository.getAll(
    { district: [Districts.Center, Districts.North] },
    1,
    10
  );

  expect(result.data.every((item) => 
    [Districts.Center, Districts.North].includes(item.district)
  )).toBe(true);
});
```

## 5. Pagination Testing

### File Pattern

`{entity}-pagination.test.ts`

### Test Constants

```typescript
const TOTAL_ITEMS = 200;
const PAGE_SIZE = 10;
const EXPECTED_TOTAL_PAGES = Math.ceil(TOTAL_ITEMS / PAGE_SIZE); // 20 pages
```

### Required Test Cases

1. **Pagination with 200 items**
   - Test all pages
   - Verify each page has correct items
   - Verify no duplicates

2. **Pagination metadata**
   - totalCount (should be 200)
   - currentPage (should match request)
   - totalPages (should be 20)
   - hasNextPage (true for pages 1-19, false for page 20)
   - hasPreviousPage (false for page 1, true for pages 2-20)

3. **Edge cases**
   - Page beyond total pages (should return empty)
   - Page 0 or negative (should default to page 1)
   - Exactly divisible page count

4. **Pagination with filters**
   - Apply filters, verify pagination still works
   - Verify filtered results paginate correctly

5. **Sorting**
   - Verify sort order maintained across pages
   - Test default sort (usually createdAt descending)

### Example Test

```typescript
it("should paginate 200 items correctly (10 per page)", async () => {
  const allPublicIds = new Set<string>();

  for (let page = 1; page <= EXPECTED_TOTAL_PAGES; page++) {
    const result = await repository.getAll({}, page, PAGE_SIZE);

    expect(result.data.length).toBeLessThanOrEqual(PAGE_SIZE);
    expect(result.currentPage).toBe(page);

    result.data.forEach((item) => {
      expect(allPublicIds.has(item.publicId)).toBe(false);
      allPublicIds.add(item.publicId);
    });
  }

  expect(allPublicIds.size).toBe(TOTAL_ITEMS);
});

it("should return correct pagination metadata", async () => {
  const result = await repository.getAll({}, 1, PAGE_SIZE);

  verifyPaginationResponse(result);
  verifyPaginationCalculations(result, PAGE_SIZE);

  expect(result.totalCount).toBe(TOTAL_ITEMS);
  expect(result.currentPage).toBe(1);
  expect(result.totalPages).toBe(EXPECTED_TOTAL_PAGES);
  expect(result.hasNextPage).toBe(true);
  expect(result.hasPreviousPage).toBe(false);
});
```

## Helper Functions

### FormData Helper

Add to `client/__tests__/utils/serverAction.helpers.ts`:

```typescript
export function create{Entity}FormData(
  overrides?: Record<string, any>
): FormData {
  const defaultData = {
    // Default values for all required fields
    field1: "default-value",
    field2: "default-value",
    images: createMockFiles(1),
  };

  return createFormData({ ...defaultData, ...overrides });
}
```

### Test Data Setup Helper

Create `test-helpers.ts`:

```typescript
export async function setupDiverseTestData(count: number = 200) {
  // Create diverse test data with:
  // - Different categories
  // - Different districts
  // - Different cities
  // - Different timestamps (for sorting)
  
  return {
    entities,
    categories,
    districts,
  };
}
```

## Factory Pattern

### Factory Structure

Factories should support:

```typescript
export const {Entity}Factory = {
  build: build{Entity},              // Build without saving
  buildMany: buildMany{Entity},      // Build many without saving
  create: create{Entity},            // Create and save single
  createMany: createMany{Entity},    // Create and save many (batched)
};
```

### Factory Usage

```typescript
// Single entity
const entity = await {Entity}Factory.create({
  user: user.id,
  category: category.id,
});

// Multiple entities (batched for performance)
const entities = await {Entity}Factory.createMany(200, {
  user: user.id,
  category: category.id,
});

// Build without saving (faster for large datasets)
const entityData = {Entity}Factory.build();
const manyEntities = {Entity}Factory.buildMany(500);
```

## Test Execution

### Run All E2E Tests

```bash
npm run test:e2e -- {entity-name}
```

### Run Specific Test Suite

```bash
npm test -- {entity}-creation
npm test -- {entity}-editing
npm test -- {entity}-filters
npm test -- {entity}-pagination
```

## Best Practices

1. **Isolation**: Each test is independent, database cleared between tests
2. **Realistic Data**: Use factories to create realistic, diverse test data
3. **Comprehensive Coverage**: Test all validation rules, edge cases, and error paths
4. **Performance**: Test with realistic data volumes (200 items)
5. **Reusability**: Create helpers and patterns that can be reused for other flows
6. **Mock External Dependencies**: Always mock file uploads, auth, and Next.js functions
7. **Verify Database State**: After actions, verify entities in database
8. **Test Error Paths**: Don't just test happy paths, test error scenarios
9. **Use Helpers**: Use `verifyPaginationResponse`, `assertServerActionSuccess`, etc.
10. **Performance Logging**: Log performance metrics for large dataset tests

## Common Patterns

### MongoDB Memory Server Setup

```typescript
let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  const result = await setupMongoMemoryServer();
  mongoServer = result.mongoServer;
});

afterAll(async () => {
  await teardownMongoMemoryServer(mongoServer);
});

beforeEach(async () => {
  await clearDatabase();
  vi.clearAllMocks();
});
```

### Mock Setup

```typescript
// Mock auth
vi.mock("@/lib/auth/utils/auth.utils", () => ({
  getCurrentUser: mockGetCurrentUser,
}));

// Mock file upload
vi.mock("@/lib/files/uploadFiles", () => ({
  uploadFiles: mockUploadFiles,
}));

// Mock Next.js
vi.mock("next/navigation", () => ({
  redirect: mockRedirect,
}));

vi.mock("next/cache", () => ({
  revalidatePath: mockRevalidatePath,
}));
```

### Test Data Creation

```typescript
// Create test entities with specific properties
const entities = await {Entity}Factory.createMany(200, {
  user: user.id,
  category: category.id,
  district: Districts.Center,
});
```

## References

- Professional Service E2E Tests: `client/src/__tests__/lib/professionals/professional-service/e2e/`
- Test Infrastructure: `client/__tests__/`
- Factories: `client/__tests__/factories/`
- Test Helpers: `client/__tests__/utils/`
- Mocks: `client/__tests__/mocks/`
