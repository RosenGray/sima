/**
 * Example Server Action Test
 * Tests server actions with mocked dependencies
 */
import { describe, it, expect, beforeEach, vi } from "vitest";
import { publishCarAd } from "@/lib/vehicles/cars/actions/publishCarAd";
import {
  createCarAdFormData,
  assertServerActionSuccess,
} from "@/__tests__/utils/serverAction.helpers";
import { UserFactory } from "@/__tests__/factories";
import {
  setupMongoMemoryServer,
  teardownMongoMemoryServer,
  clearDatabase,
} from "@/__tests__/mocks/mongodb";
import { MongoMemoryServer } from "mongodb-memory-server";

// Mock dependencies - hoist mocks to avoid initialization issues
const mocks = vi.hoisted(() => {
  return {
    mockGetCurrentUser: vi.fn(),
    mockUploadFiles: vi.fn(),
    mockRedirect: vi.fn(),
    mockRevalidatePath: vi.fn(),
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

describe("publishCarAd [integration]", () => {
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

  it("should create car ad successfully", async () => {
    // Setup: Create authenticated user
    const user = await UserFactory.create();
    mocks.mockGetCurrentUser.mockResolvedValue(user);

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
        userId: user.id,
      },
    });

    // Create form data
    const formData = createCarAdFormData({
      manufacturer: "Toyota",
      model: "Camry",
      yearOfManufacture: "2020",
    });

    // Execute
    const result = await publishCarAd(undefined, formData);

    // Assert: Should redirect (no error returned)
    expect(mocks.mockRedirect).toHaveBeenCalledWith("/cars");
    expect(mocks.mockRevalidatePath).toHaveBeenCalledWith("/cars", "layout");
    assertServerActionSuccess(result);
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
  });

  it("should validate required fields", async () => {
    const user = await UserFactory.create();
    mocks.mockGetCurrentUser.mockResolvedValue(user);

    // Create form data with missing required fields
    const formData = createCarAdFormData({
      manufacturer: "", // Missing required field
    });

    const result = await publishCarAd(undefined, formData);

    // Assert: Should return validation error
    expect(result?.status).toBe("error");
    expect(result?.error).toBeDefined();
  });
});
