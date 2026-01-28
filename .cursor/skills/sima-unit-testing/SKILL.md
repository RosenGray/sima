look # Unit Testing Skill

## Overview

This skill provides comprehensive guidelines for creating unit tests for entity flows in the Sima application. It covers entity creation/validation, editing, repository mocking, filter testing, and pagination testing patterns using mocks instead of MongoDB in-memory instances.

## When to Use

Use this skill when:
- Creating unit tests for a new entity flow (vehicles, pets, jobs, professional services, etc.)
- Testing form validation and submission
- Testing entity editing functionality
- Testing filters and search functionality
- Testing pagination with mock data
- Setting up test mocks and helpers

## Test Structure

### Directory Organization

```
client/src/__tests__/lib/{category}/{entity}/unit/
├── {entity}-creation.unit.test.ts      # Entity creation & validation tests
├── {entity}-editing.unit.test.ts       # Entity editing tests
├── {entity}-filters.unit.test.ts       # Filter testing
└── {entity}-pagination.unit.test.ts    # Pagination testing
```

## 1. Entity Creation & Validation Tests

### File Pattern

`{entity}-creation.unit.test.ts`

### Test Setup

```typescript
import { describe, it, expect, beforeEach, vi } from "vitest";
import { publish{Entity}Ad } from "@/lib/{category}/{entity}/actions/publish{Entity}Ad";
import { {entity}Repository } from "@/lib/{category}/{entity}/repository/{Entity}Repository";
import { {Entity} } from "@/lib/{category}/{entity}/models/{Entity}";
import connectDB from "@/lib/mongo/mongodb";
import {
  create{Entity}FormData,
  assertServerActionSuccess,
  assertServerActionError,
} from "@/__tests__/utils/serverAction.helpers";

// Mock dependencies - hoist mocks to avoid initialization issues
const mocks = vi.hoisted(() => {
  return {
    mockGetCurrentUser: vi.fn(),
    mockUploadFiles: vi.fn(),
    mockRedirect: vi.fn(),
    mockRevalidatePath: vi.fn(),
    mockConnectDB: vi.fn(),
    mockSave: vi.fn(),
  };
});

vi.mock("@/lib/auth/utils/auth.utils", () => ({
  getCurrentUser: mocks.mockGetCurrentUser,
}));

vi.mock("@/lib/files/uploadFiles", () => ({
  uploadFiles: mocks.mockUploadFiles,
}));

vi.mock("next/navigation", () => ({
  redirect: mocks.mockRedirect,
}));

vi.mock("next/cache", () => ({
  revalidatePath: mocks.mockRevalidatePath,
}));

vi.mock("@/lib/mongo/mongodb", () => ({
  default: mocks.mockConnectDB,
}));

describe("{Entity} Creation [unit]", () => {
  const mockUser = {
    id: "user-id-123",
    email: "test@example.com",
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mocks.mockConnectDB.mockResolvedValue(undefined);
    mocks.mockSave.mockResolvedValue(undefined);

    // Mock model save method
    vi.spyOn({Entity}.prototype, "save").mockImplementation(mocks.mockSave);
  });
});
```

### Required Test Cases

1. **Create entity with valid data**
   - Setup mocks for user, file upload, and database
   - Create FormData with valid data
   - Call publish action
   - Verify no errors
   - Verify repository/model methods called correctly
   - Verify redirect called

2. **Validate required fields**
   - Test each required field individually
   - Verify error returned when field missing
   - Verify repository methods NOT called on validation error

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
  mocks.mockGetCurrentUser.mockResolvedValue(mockUser);

  mocks.mockUploadFiles.mockResolvedValue({
    success: true,
    message: "Files uploaded",
    files: [/* mock files */],
    metadata: {/* metadata */},
  });

  const formData = create{Entity}FormData({
    // valid data
  });

  const result = await publish{Entity}Ad(undefined, formData);

  expect(mocks.mockRedirect).toHaveBeenCalled();
  assertServerActionSuccess(result);
  expect(mocks.mockSave).toHaveBeenCalled();
});
```

## 2. Entity Editing Tests

### File Pattern

`{entity}-editing.unit.test.ts`

### Test Setup

Similar to creation tests, but also mock repository `getByPublicId`:

```typescript
const mocks = vi.hoisted(() => {
  return {
    mockGetCurrentUser: vi.fn(),
    mockUploadFiles: vi.fn(),
    mockRedirect: vi.fn(),
    mockRevalidatePath: vi.fn(),
    mockGetFileManager: vi.fn(async () => ({
      deleteFiles: vi.fn(async () => ({ success: true })),
    })),
    mockConnectDB: vi.fn(),
    mockGetByPublicId: vi.fn(),
    mockSave: vi.fn(),
  };
});

vi.mock("@/lib/common/actions/getFileManager", () => ({
  getFileManager: mocks.mockGetFileManager,
}));

// Mock repository
vi.spyOn({entity}Repository, "getByPublicId").mockImplementation(
  mocks.mockGetByPublicId
);
```

### Required Test Cases

1. **Edit entity successfully**
   - Mock existing entity via `getByPublicId`
   - Setup edit context (imagesToDelete, allImagesShouldBeDeleted)
   - Create FormData with updated values
   - Call edit action
   - Verify repository methods called correctly

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

## 3. Filter Testing

### File Pattern

`{entity}-filters.unit.test.ts`

### Approach

Filter testing uses two strategies:

1. **Extract filter building logic** - Test filter building in isolation
2. **Mock repository** - Test that filters are correctly passed to repository

### Extract Filter Building Logic

For each repository, extract filter building into a separate function:

```typescript
// buildSearchFilter.ts
export function build{Entity}SearchFilter(
  searchFilters: {Entity}SearchFilters
): FilterQuery<typeof {Entity}> {
  const searchFilter: FilterQuery<typeof {Entity}> = {};
  
  // Build filter logic
  if (searchFilters.categoryId) {
    const isValidObjectId = searchFilters.categoryId.every((id) =>
      mongoose.Types.ObjectId.isValid(id)
    );
    if (isValidObjectId) {
      searchFilter.category = { $in: searchFilters.categoryId };
    } else {
      searchFilter._id = new mongoose.Types.ObjectId();
    }
  }
  
  return searchFilter;
}
```

### Test Filter Building Logic

```typescript
describe("Filter Building Logic", () => {
  it("should build filter for categoryId", () => {
    const validObjectId = new mongoose.Types.ObjectId().toString();
    const filter = build{Entity}SearchFilter({
      categoryId: [validObjectId],
    });
    
    expect(filter.category).toEqual({ $in: [validObjectId] });
  });
  
  it("should handle invalid ObjectId", () => {
    const filter = build{Entity}SearchFilter({
      categoryId: ["invalid-id"],
    });
    
    expect(filter._id).toBeDefined();
  });
});
```

### Test Repository Filter Passing

```typescript
describe("Repository Filter Passing", () => {
  let mockGetAll: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockGetAll = vi.fn();
    vi.spyOn({entity}Repository, "getAll").mockImplementation(mockGetAll);
  });

  it("should pass filters to repository", async () => {
    const mockResponse = createMockPaginatedResponse([], 0, 1, 10);
    mockGetAll.mockResolvedValue(mockResponse);

    await {entity}Repository.getAll(
      { categoryId: ["id1"], district: [Districts.Center] },
      1,
      10
    );

    expect(mockGetAll).toHaveBeenCalledWith(
      { categoryId: ["id1"], district: [Districts.Center] },
      1,
      10
    );
  });
});
```

### Test Filter Integration with Mock Data

```typescript
import {
  createMockEntityData,
  createPaginatedResponseFromData,
  filterMockData,
} from "@/__tests__/mocks/repository";

it("should filter by categoryId using mock data", () => {
  const categoryId1 = new mongoose.Types.ObjectId().toString();
  
  const mockData = createMockEntityData(
    {
      category: { id: categoryId1 },
      district: Districts.Center,
    },
    5
  );

  const result = createPaginatedResponseFromData(
    mockData,
    { "category.id": [categoryId1] },
    1,
    10
  );

  expect(result.data.length).toBe(5);
  expect(result.totalCount).toBe(5);
});
```

## 4. Pagination Testing

### File Pattern

`{entity}-pagination.unit.test.ts`

### Approach

- Use mock data instead of creating 200 entities
- Test pagination calculations (totalPages, hasNextPage, etc.)
- Test edge cases (page 0, page beyond total, etc.)

### Example Test

```typescript
import {
  createMockPaginatedResponse,
  createMockEntityData,
  createPaginatedResponseFromData,
} from "@/__tests__/mocks/repository";

describe("Pagination [unit]", () => {
  const TOTAL_ITEMS = 200;
  const PAGE_SIZE = 10;
  const EXPECTED_TOTAL_PAGES = Math.ceil(TOTAL_ITEMS / PAGE_SIZE);

  let mockData: any[];

  beforeEach(() => {
    mockData = createMockEntityData(
      {
        id: "mock-id",
        publicId: "mock-public-id",
        // ... other fields
      },
      TOTAL_ITEMS
    );
  });

  it("should paginate 200 items correctly (10 per page)", () => {
    const allPublicIds = new Set<string>();

    for (let page = 1; page <= EXPECTED_TOTAL_PAGES; page++) {
      const result = createPaginatedResponseFromData(
        mockData,
        {},
        page,
        PAGE_SIZE
      );

      expect(result.data.length).toBeLessThanOrEqual(PAGE_SIZE);
      expect(result.currentPage).toBe(page);
      
      result.data.forEach((item) => {
        allPublicIds.add(item.publicId);
      });
    }

    expect(allPublicIds.size).toBe(TOTAL_ITEMS);
  });
});
```

## 5. Repository Testing

### File Pattern

`{Entity}Repository.unit.test.ts`

### Approach

- Mock `connectDB()`
- Mock Mongoose model methods (`find()`, `countDocuments()`, `create()`, etc.)
- Test repository logic without actual database
- Test filter building (extracted logic)
- Test pagination calculations

### Example Test

```typescript
import { Car } from "@/lib/vehicles/cars/models/Car";
import connectDB from "@/lib/mongo/mongodb";

const mocks = vi.hoisted(() => {
  return {
    mockConnectDB: vi.fn(),
  };
});

vi.mock("@/lib/mongo/mongodb", () => ({
  default: mocks.mockConnectDB,
}));

describe("CarRepository [unit]", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.mockConnectDB.mockResolvedValue(undefined);

    // Mock Mongoose query chain
    const mockQueryChain = {
      populate: vi.fn().mockReturnThis(),
      sort: vi.fn().mockReturnThis(),
      skip: vi.fn().mockReturnThis(),
      limit: vi.fn().mockReturnThis(),
      exec: vi.fn(),
    };

    vi.spyOn(Car, "find").mockReturnValue(mockQueryChain as any);
    vi.spyOn(Car, "countDocuments").mockReturnValue(mockQueryChain as any);
  });
});
```

## Mock Infrastructure

### Repository Mocks

Use `@/__tests__/mocks/repository.ts` for repository mocking:

```typescript
import {
  createMockRepository,
  createMockPaginatedResponse,
  createMockEntityData,
  createPaginatedResponseFromData,
} from "@/__tests__/mocks/repository";

const mockRepository = createMockRepository();
mockRepository.getAll.mockResolvedValue(
  createMockPaginatedResponse(mockData, totalCount, page, pageSize)
);
```

### Filter Testing Helpers

Use `@/__tests__/utils/repository.helpers.ts`:

```typescript
import {
  verifyPaginationResponse,
  verifyPaginationMetadata,
  verifyFilterResults,
  verifyArrayFilter,
} from "@/__tests__/utils/repository.helpers";
```

## Common Patterns

### Mock Setup Pattern

```typescript
const mocks = vi.hoisted(() => {
  return {
    mockGetCurrentUser: vi.fn(),
    mockUploadFiles: vi.fn(),
    mockRedirect: vi.fn(),
    mockRevalidatePath: vi.fn(),
    mockConnectDB: vi.fn(),
    mockSave: vi.fn(),
  };
});

beforeEach(() => {
  vi.clearAllMocks();
  // Setup default mock implementations
});
```

### Repository Mock Pattern

```typescript
let mockGetAll: ReturnType<typeof vi.fn>;

beforeEach(() => {
  mockGetAll = vi.fn();
  vi.spyOn({entity}Repository, "getAll").mockImplementation(mockGetAll);
});

it("should pass filters correctly", async () => {
  const mockResponse = createMockPaginatedResponse([], 0, 1, 10);
  mockGetAll.mockResolvedValue(mockResponse);

  await {entity}Repository.getAll(filters, 1, 10);

  expect(mockGetAll).toHaveBeenCalledWith(filters, 1, 10);
});
```

### Model Mock Pattern

```typescript
beforeEach(() => {
  mocks.mockSave.mockResolvedValue(undefined);
  vi.spyOn({Entity}.prototype, "save").mockImplementation(mocks.mockSave);
});
```

## Best Practices

1. **Isolation**: Each test is independent, no shared state
2. **Mocking**: Always mock external dependencies (database, file uploads, auth)
3. **Comprehensive Coverage**: Test all validation rules, edge cases, and error paths
4. **Filter Logic**: Extract and test filter building logic separately
5. **Reusability**: Create helpers and patterns that can be reused
6. **Mock External Dependencies**: Always mock file uploads, auth, and Next.js functions
7. **Verify Mock Calls**: Verify correct repository methods called with correct data
8. **Test Error Paths**: Don't just test happy paths, test error scenarios
9. **Use Helpers**: Use `verifyPaginationResponse`, `assertServerActionSuccess`, etc.
10. **Fast Execution**: Unit tests should run quickly without database startup/teardown

## Benefits Over E2E Tests

1. **Faster tests**: No MongoDB startup/teardown
2. **More reliable**: No flaky database issues
3. **Better isolation**: Each test is truly independent
4. **Easier debugging**: Clear mock expectations
5. **Comprehensive coverage**: Test filter logic separately from database

## References

- Professional Service Unit Tests: `client/src/__tests__/lib/professionals/professional-service/unit/`
- Test Infrastructure: `client/__tests__/`
- Factories: `client/__tests__/factories/`
- Test Helpers: `client/__tests__/utils/`
- Mocks: `client/__tests__/mocks/`
- Filter Building: `client/src/lib/{category}/{entity}/repository/buildSearchFilter.ts`
