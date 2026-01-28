/**
 * Car Ad Publishing Unit Tests
 * Tests server actions with mocked dependencies
 */
import { describe, it, expect, beforeEach, vi } from "vitest";
import { publishCarAd } from "@/lib/vehicles/cars/actions/publishCarAd";
import {
  createCarAdFormData,
  assertServerActionSuccess,
} from "@/__tests__/utils/serverAction.helpers";
import { carRepository } from "@/lib/vehicles/cars/repository/CarRepository";

// Mock dependencies - hoist mocks to avoid initialization issues
const mocks = vi.hoisted(() => {
  return {
    mockGetCurrentUser: vi.fn(),
    mockUploadFiles: vi.fn(),
    mockRedirect: vi.fn(),
    mockRevalidatePath: vi.fn(),
    mockCreate: vi.fn(),
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

describe("publishCarAd [unit]", () => {
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

    // Mock carRepository.create
    vi.spyOn(carRepository, "create").mockImplementation(mocks.mockCreate);
  });

  it("should create car ad successfully", async () => {
    // Setup: Mock authenticated user
    mocks.mockGetCurrentUser.mockResolvedValue(mockUser);

    // Setup: Mock file upload
    mocks.mockUploadFiles.mockResolvedValue({
      success: true,
      message: "Files uploaded",
      files: [
        {
          id: "test-id",
          originalName: "test.jpg",
          uniqueName: "test-unique.jpg",
          url: "https://example.com/test.jpg",
          fieldname: "files",
          versionId: "version-id",
          folderName: "vehicles/cars",
        },
      ],
      metadata: {
        totalFiles: 1,
        folderName: "vehicles/cars",
        userId: mockUser.id,
      },
    });

    // Create form data
    const formData = createCarAdFormData({
      manufacturer: "Toyota",
      model: "Camry",
      yearOfManufacture: "2020",
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

    // Assert: Should redirect (no error returned)
    expect(mocks.mockRedirect).toHaveBeenCalledWith("/cars");
    expect(mocks.mockRevalidatePath).toHaveBeenCalledWith("/cars", "layout");

    // Verify: Car repository create was called
    expect(mocks.mockCreate).toHaveBeenCalled();
    expect(mocks.mockUploadFiles).toHaveBeenCalled();
  });

  it("should return error for unauthenticated user", async () => {
    // Setup: No authenticated user
    mocks.mockGetCurrentUser.mockResolvedValue(null);

    const formData = createCarAdFormData();

    // Execute
    const result = await publishCarAd(undefined, formData);

    // Assert: Should return error
    expect(result?.status).toBe("error");
    expect(result?.error?.formErrors).toBeDefined();
    expect(mocks.mockRedirect).not.toHaveBeenCalled();
    expect(mocks.mockCreate).not.toHaveBeenCalled();
  });

  it("should validate required fields", async () => {
    mocks.mockGetCurrentUser.mockResolvedValue(mockUser);

    // Create form data with missing required fields
    const formData = createCarAdFormData({
      manufacturer: "", // Missing required field
    });

    const result = await publishCarAd(undefined, formData);

    // Assert: Should return validation error
    expect(result?.status).toBe("error");
    expect(result?.error).toBeDefined();
    expect(mocks.mockCreate).not.toHaveBeenCalled();
  });
});
