# Testing Infrastructure

This directory contains the testing infrastructure for the application. All tests use unit testing with comprehensive mocking instead of MongoDB in-memory instances.

## Setup

1. **Install dependencies** (already added to package.json):
   ```bash
   npm install
   ```

2. **Run tests**:
   ```bash
   npm test              # Run all tests once
   npm run test:watch    # Run tests in watch mode
   npm run test:ui       # Run tests with UI
   npm run test:coverage # Generate coverage report
   npm run test:unit     # Run only unit tests
   ```

## Structure

```
__tests__/
├── setup.ts              # Global test setup
├── test-utils.tsx        # React Testing Library utilities
├── mocks/                # Mock implementations
│   ├── repository.ts    # Repository mock factory
│   ├── fileUpload.ts    # File upload mocks
│   ├── auth.ts          # Authentication mocks
│   ├── next.ts          # Next.js mocks
│   ├── handlers.ts      # MSW API handlers
│   └── server.ts        # MSW server setup
├── factories/            # Test data factories
│   ├── user.factory.ts
│   ├── car.factory.ts
│   ├── professionalService.factory.ts
│   ├── job.factory.ts
│   └── index.ts
└── utils/                # Test helper utilities
    ├── repository.helpers.ts
    ├── serverAction.helpers.ts
    └── component.helpers.ts
```

## Usage Examples

### Repository Testing (Unit Tests)

```typescript
import { describe, it, expect, beforeEach, vi } from "vitest";
import { carRepository } from "@/lib/vehicles/cars/repository/CarRepository";
import { Car } from "@/lib/vehicles/cars/models/Car";
import connectDB from "@/lib/mongo/mongodb";
import {
  createMockPaginatedResponse,
  createMockEntityData,
} from "@/__tests__/mocks/repository";

const mocks = vi.hoisted(() => ({
  mockConnectDB: vi.fn(),
}));

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
      limit: vi.fn().mockResolvedValue([]),
      exec: vi.fn().mockResolvedValue([]),
    };

    vi.spyOn(Car, "find").mockReturnValue(mockQueryChain as any);
    vi.spyOn(Car, "countDocuments").mockReturnValue({
      exec: vi.fn().mockResolvedValue(0),
    } as any);
  });

  it("should return paginated cars", async () => {
    const mockCars = createMockEntityData({ manufacturer: "Toyota" }, 25);
    const mockResponse = createMockPaginatedResponse(mockCars.slice(0, 10), 25, 1, 10);
    
    // Update mocks for this test
    vi.spyOn(Car, "find").mockReturnValue({
      populate: vi.fn().mockReturnThis(),
      sort: vi.fn().mockReturnThis(),
      skip: vi.fn().mockReturnThis(),
      limit: vi.fn().mockResolvedValue(mockCars.slice(0, 10)),
      exec: vi.fn().mockResolvedValue(mockCars.slice(0, 10)),
    } as any);
    vi.spyOn(Car, "countDocuments").mockReturnValue({
      exec: vi.fn().mockResolvedValue(25),
    } as any);

    const result = await carRepository.getAll({}, 1, 10);

    expect(result.data.length).toBe(10);
    expect(result.totalCount).toBe(25);
  });
});
```

### Server Action Testing (Unit Tests)

```typescript
import { describe, it, expect, beforeEach, vi } from "vitest";
import { publishCarAd } from "@/lib/vehicles/cars/actions/publishCarAd";
import { carRepository } from "@/lib/vehicles/cars/repository/CarRepository";
import { createCarAdFormData } from "@/__tests__/utils/serverAction.helpers";

const mocks = vi.hoisted(() => ({
  mockGetCurrentUser: vi.fn(),
  mockUploadFiles: vi.fn(),
  mockRedirect: vi.fn(),
  mockRevalidatePath: vi.fn(),
  mockCreate: vi.fn(),
}));

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

describe("publishCarAd [unit]", () => {
  const mockUser = { id: "user-id-123", email: "test@example.com" };

  beforeEach(() => {
    vi.clearAllMocks();
    mocks.mockCreate.mockResolvedValue(undefined);
    vi.spyOn(carRepository, "create").mockImplementation(mocks.mockCreate);
  });

  it("should create car ad", async () => {
    mocks.mockGetCurrentUser.mockResolvedValue(mockUser);
    mocks.mockUploadFiles.mockResolvedValue({
      success: true,
      files: [/* mock files */],
      metadata: {/* metadata */},
    });

    const formData = createCarAdFormData();
    const result = await publishCarAd(undefined, formData);

    expect(result?.status).not.toBe("error");
    expect(mocks.mockCreate).toHaveBeenCalled();
    expect(mocks.mockRedirect).toHaveBeenCalled();
  });
});
```

### Filter Testing (Unit Tests)

```typescript
import { describe, it, expect } from "vitest";
import { buildCarSearchFilter } from "@/lib/vehicles/cars/repository/buildSearchFilter";
import {
  createMockEntityData,
  createPaginatedResponseFromData,
} from "@/__tests__/mocks/repository";
import { verifyFilterResults } from "@/__tests__/utils/repository.helpers";

describe("Car Filters [unit]", () => {
  describe("Filter Building Logic", () => {
    it("should build filter for manufacturer", () => {
      const filter = buildCarSearchFilter({
        manufacturer: ["Toyota"],
      });
      
      expect(filter.manufacturer).toEqual({ $in: ["Toyota"] });
    });
  });

  describe("Filter Integration with Mock Data", () => {
    it("should filter by manufacturer using mock data", () => {
      const mockData = createMockEntityData(
        { manufacturer: "Toyota", model: "Camry" },
        5
      );

      const result = createPaginatedResponseFromData(
        mockData,
        { manufacturer: ["Toyota"] },
        1,
        10
      );

      expect(result.data.length).toBe(5);
      verifyFilterResults(result, "manufacturer", ["Toyota"]);
    });
  });
});
```

### Component Testing

```typescript
import { render, screen } from "@/__tests__/test-utils";

describe("MyComponent", () => {
  it("should render", () => {
    render(<MyComponent />);
    expect(screen.getByText("Hello")).toBeInTheDocument();
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

// Create mock repository
const mockRepository = createMockRepository();
mockRepository.getAll.mockResolvedValue(
  createMockPaginatedResponse(mockData, totalCount, page, pageSize)
);

// Create mock data
const mockData = createMockEntityData(
  { manufacturer: "Toyota", model: "Camry" },
  10
);

// Create paginated response from filtered data
const result = createPaginatedResponseFromData(
  mockData,
  { manufacturer: ["Toyota"] },
  1,
  10
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

## Mocking

- **File Uploads**: Mocked via `mockUploadFiles`
- **Authentication**: Mocked via `mockGetCurrentUser`
- **Next.js Functions**: Mocked via `mockRedirect`, `mockRevalidatePath`
- **Database**: Mocked via Mongoose model method mocks
- **Repositories**: Mocked via `vi.spyOn(repository, "method")`
- **API Routes**: Mocked via MSW (Mock Service Worker)

## Best Practices

1. **Always mock external dependencies** - Database, file uploads, auth, Next.js functions
2. **Use hoisted mocks** - Use `vi.hoisted()` for mock setup to avoid initialization issues
3. **Clear mocks between tests** - Use `vi.clearAllMocks()` in `beforeEach`
4. **Test in isolation** - Each test should be independent with no shared state
5. **Extract filter logic** - Test filter building logic separately from database
6. **Use mock data** - Use `createMockEntityData` instead of creating real entities
7. **Verify mock calls** - Always verify that mocked methods were called with correct parameters
8. **Use descriptive test names** - Test names should explain what is being tested
9. **Test error paths** - Don't just test happy paths, test error scenarios
10. **Fast execution** - Unit tests should run quickly without database startup/teardown

## Benefits of Unit Testing

1. **Faster tests**: No MongoDB startup/teardown overhead
2. **More reliable**: No flaky database issues
3. **Better isolation**: Each test is truly independent
4. **Easier debugging**: Clear mock expectations
5. **Comprehensive coverage**: Test filter logic separately from database
6. **CI/CD friendly**: Tests run consistently in any environment
