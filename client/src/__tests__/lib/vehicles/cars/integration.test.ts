/**
 * Car Ad Publishing Flow Unit Tests
 * Tests full flow from server action with all dependencies mocked
 */
import { describe, it, expect, beforeEach, vi } from "vitest";
import { publishCarAd } from "@/lib/vehicles/cars/actions/publishCarAd";
import { carRepository } from "@/lib/vehicles/cars/repository/CarRepository";
import { createCarAdFormData } from "@/__tests__/utils/serverAction.helpers";

// Mock dependencies - hoist mocks to avoid initialization issues
const mocks = vi.hoisted(() => {
  return {
    mockGetCurrentUser: vi.fn(),
    mockUploadFiles: vi.fn(),
    mockRedirect: vi.fn(),
    mockRevalidatePath: vi.fn(),
    mockCreate: vi.fn(),
    mockGetAll: vi.fn(),
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

describe("Car Ad Publishing Flow [unit]", () => {
  const mockUser = {
    id: "user-id-123",
    email: "test@example.com",
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mocks.mockCreate.mockResolvedValue(undefined);
    
    // Mock redirect to throw Next.js redirect error
    mocks.mockRedirect.mockImplementation(() => {
      const error = new Error("NEXT_REDIRECT");
      (error as any).digest = "NEXT_REDIRECT;redirect=/cars";
      throw error;
    });

    // Mock repository methods
    vi.spyOn(carRepository, "create").mockImplementation(mocks.mockCreate);
    vi.spyOn(carRepository, "getAll").mockImplementation(mocks.mockGetAll);
  });

  it("should create car ad end-to-end", async () => {
    // 1. Setup: Mock authentication
    mocks.mockGetCurrentUser.mockResolvedValue(mockUser);

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

    mocks.mockUploadFiles.mockResolvedValue({
      success: true,
      message: "Files uploaded",
      files: mockFiles,
      metadata: {
        totalFiles: 1,
        folderName: "vehicles/cars",
        userId: mockUser.id,
      },
    });

    // 3. Setup: Mock repository create
    const mockCreatedCar = {
      id: "car-id-123",
      publicId: "test-public-id",
      manufacturer: "Toyota",
      model: "Camry",
      yearOfManufacture: 2020,
      price: 150000,
      user: { id: mockUser.id },
    };
    mocks.mockCreate.mockResolvedValue(mockCreatedCar);

    // 4. Setup: Mock repository getAll
    mocks.mockGetAll.mockResolvedValue({
      data: [mockCreatedCar],
      totalCount: 1,
      currentPage: 1,
      totalPages: 1,
      hasNextPage: false,
      hasPreviousPage: false,
    });

    // 5. Execute: Publish car ad
    const formData = createCarAdFormData({
      manufacturer: "Toyota",
      model: "Camry",
      yearOfManufacture: "2020",
      price: "150000",
    });

    // Execute - redirect throws, so we catch it
    try {
      await publishCarAd(undefined, formData);
    } catch (error: any) {
      // Next.js redirect throws an error - this is expected
      if (error?.digest?.startsWith("NEXT_REDIRECT")) {
        // Redirect was called - success
      } else {
        throw error;
      }
    }

    // 7. Verify: Repository create was called with correct data
    expect(mocks.mockCreate).toHaveBeenCalled();
    const createCall = mocks.mockCreate.mock.calls[0][0];
    expect(createCall.manufacturer).toBe("Toyota");
    expect(createCall.model).toBe("Camry");
    expect(createCall.yearOfManufacture).toBe(2020);

    // 8. Verify: Redirect was called
    expect(mocks.mockRedirect).toHaveBeenCalledWith("/cars");
    expect(mocks.mockRevalidatePath).toHaveBeenCalledWith("/cars", "layout");
  });

  it("should handle batch creation flow", async () => {
    mocks.mockGetCurrentUser.mockResolvedValue(mockUser);

    mocks.mockUploadFiles.mockResolvedValue({
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
        userId: mockUser.id,
      },
    });

    // Mock repository create to return different cars
    mocks.mockCreate.mockResolvedValue({
      id: "car-id",
      manufacturer: "Toyota",
      user: { id: mockUser.id },
    });

    // Create multiple cars
    const count = 5; // Reduced from 200 for unit test
    for (let i = 0; i < count; i++) {
      const formData = createCarAdFormData({
        manufacturer: i % 2 === 0 ? "Toyota" : "Honda",
      });
      // Execute - redirect throws, so we catch it
      try {
        await publishCarAd(undefined, formData);
      } catch (error: any) {
        // Next.js redirect throws an error - this is expected
        if (!error?.digest?.startsWith("NEXT_REDIRECT")) {
          throw error;
        }
      }
    }

    // Verify: Repository create was called correct number of times
    expect(mocks.mockCreate).toHaveBeenCalledTimes(count);
    expect(mocks.mockRedirect).toHaveBeenCalledTimes(count);
  });
});
