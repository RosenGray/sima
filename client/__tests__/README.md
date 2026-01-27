# Testing Infrastructure

This directory contains the testing infrastructure for the application.

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
   ```

## Structure

```
__tests__/
├── setup.ts              # Global test setup
├── test-utils.tsx        # React Testing Library utilities
├── mocks/                # Mock implementations
│   ├── mongodb.ts       # MongoDB Memory Server
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

### Repository Testing

```typescript
import { describe, it, expect, beforeAll, afterAll, beforeEach } from "vitest";
import { setupMongoMemoryServer, teardownMongoMemoryServer, clearDatabase } from "@/__tests__/mocks/mongodb";
import { CarFactory } from "@/__tests__/factories";

describe("CarRepository", () => {
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
  });

  it("should get all cars", async () => {
    await CarFactory.createMany(10);
    const result = await carRepository.getAll({}, 1, 10);
    expect(result.data.length).toBe(10);
  });
});
```

### Server Action Testing

```typescript
import { mockGetCurrentUser } from "@/__tests__/mocks/auth";
import { mockUploadFiles } from "@/__tests__/mocks/fileUpload";
import { createCarAdFormData } from "@/__tests__/utils/serverAction.helpers";

describe("publishCarAd", () => {
  beforeEach(() => {
    mockGetCurrentUser.mockResolvedValue(mockUser);
    mockUploadFiles.mockResolvedValue(mockUploadResponse);
  });

  it("should create car ad", async () => {
    const formData = createCarAdFormData();
    const result = await publishCarAd(undefined, formData);
    expect(result?.status).not.toBe("error");
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

## Factories

Factories support creating 200-500 items efficiently:

```typescript
// Create single item
const user = await UserFactory.create();

// Create multiple items (batched for performance)
const cars = await CarFactory.createMany(300);

// Build without saving (faster for large datasets)
const carData = CarFactory.build();
const manyCars = CarFactory.buildMany(500);
```

## MongoDB Memory Server

Tests use MongoDB Memory Server for isolated, in-memory database testing. Each test suite gets its own database instance that is automatically cleaned up.

## Mocking

- **File Uploads**: Mocked via `mockUploadFiles`
- **Authentication**: Mocked via `mockGetCurrentUser`
- **Next.js Functions**: Mocked via `mockRedirect`, `mockRevalidatePath`
- **API Routes**: Mocked via MSW (Mock Service Worker)

## Best Practices

1. Always clean up database between tests using `clearDatabase()`
2. Use factories for test data generation
3. Mock external dependencies (file uploads, auth, etc.)
4. Test in isolation - each test should be independent
5. Use descriptive test names that explain what is being tested
