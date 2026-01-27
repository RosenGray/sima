/**
 * Example Integration Test
 * Tests full flow from server action to database
 */
import { describe, it, expect, beforeAll, afterAll, beforeEach, vi } from "vitest";
import {
  setupMongoMemoryServer,
  teardownMongoMemoryServer,
  clearDatabase,
} from "@/__tests__/mocks/mongodb";
import { MongoMemoryServer } from "mongodb-memory-server";
import { publishCarAd } from "@/lib/vehicles/cars/actions/publishCarAd";
import { carRepository } from "@/lib/vehicles/cars/repository/CarRepository";
import { UserFactory } from "@/__tests__/factories";
import { mockGetCurrentUser } from "@/__tests__/mocks/auth";
import { mockUploadFiles } from "@/__tests__/mocks/fileUpload";
import { mockRedirect } from "@/__tests__/mocks/next";
import { createCarAdFormData } from "@/__tests__/utils/serverAction.helpers";

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
  revalidatePath: vi.fn(),
}));

describe("Car Ad Publishing Flow [e2e]", () => {
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

  it("should create car ad end-to-end", async () => {
    // 1. Setup: Create user and mock authentication
    const user = await UserFactory.create();
    mockGetCurrentUser.mockResolvedValue(user);

    // 2. Setup: Mock file upload
    const mockFiles = [
      {
        id: "file-1",
        originalName: "car1.jpg",
        uniqueName: "unique-car1.jpg",
        url: "https://example.com/car1.jpg",
        fieldname: "files",
        versionId: "v1",
        folderName: "vehicles/cars",
      },
    ];

    mockUploadFiles.mockResolvedValue({
      success: true,
      message: "Files uploaded",
      files: mockFiles,
      metadata: {
        totalFiles: 1,
        folderName: "vehicles/cars",
        userId: user.id,
      },
    });

    // 3. Execute: Publish car ad
    const formData = createCarAdFormData({
      manufacturer: "Toyota",
      model: "Camry",
      yearOfManufacture: "2020",
      price: "150000",
    });

    const result = await publishCarAd(undefined, formData);

    // 4. Verify: No errors
    expect(result?.status).not.toBe("error");

    // 5. Verify: Car was created in database
    const cars = await carRepository.getAll({ manufacturer: ["Toyota"] }, 1, 10);
    expect(cars.data.length).toBeGreaterThan(0);
    expect(cars.data[0].manufacturer).toBe("Toyota");
    expect(cars.data[0].model).toBe("Camry");
    expect(cars.data[0].user.id).toBe(user.id);

    // 6. Verify: Redirect was called
    expect(mockRedirect).toHaveBeenCalledWith("/cars");
  });

  it("should handle large batch creation (200-500 items)", async () => {
    const user = await UserFactory.create();
    mockGetCurrentUser.mockResolvedValue(user);

    mockUploadFiles.mockResolvedValue({
      success: true,
      message: "Files uploaded",
      files: [
        {
          id: "file-1",
          originalName: "car.jpg",
          uniqueName: "unique-car.jpg",
          url: "https://example.com/car.jpg",
          fieldname: "files",
          versionId: "v1",
          folderName: "vehicles/cars",
        },
      ],
      metadata: {
        totalFiles: 1,
        folderName: "vehicles/cars",
        userId: user.id,
      },
    });

    // Create 200 cars
    const count = 200;
    for (let i = 0; i < count; i++) {
      const formData = createCarAdFormData({
        manufacturer: i % 2 === 0 ? "Toyota" : "Honda",
      });
      await publishCarAd(undefined, formData);
    }

    // Verify all were created
    const result = await carRepository.getAll({}, 1, count);
    expect(result.totalCount).toBe(count);
  });
});
